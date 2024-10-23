# Install dependencies only when needed
FROM node:18-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile

# Build the react
FROM node:18-alpine AS react

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY frontend .

ENV NODE_ENV=production

RUN npm run build

# Build the spring app
FROM eclipse-temurin:17-jdk-alpine as api

WORKDIR /app

COPY backend/.mvn/ .mvn
COPY backend/mvnw backend/pom.xml ./

COPY backend/src/main/java ./src/main/java
COPY backend/src/main/resources ./src/main/resources

RUN ./mvnw -B dependency:go-offline

RUN apk update
RUN apk add nginx

COPY nginx/templates /etc/nginx/templates
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=react /app/dist /static
COPY entrypoint.sh /app/entrypoint.sh

EXPOSE 80

RUN nginx

CMD ["./entrypoint.sh"]