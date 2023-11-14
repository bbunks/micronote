# Install dependencies only when needed
FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile

# Build the react
FROM node:16-alpine AS react

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY frontend .

RUN npm run build

# Build the spring app
FROM eclipse-temurin:17-jdk-focal
 
WORKDIR /app
 
COPY backend/.mvn/ .mvn
COPY backend/mvnw backend/pom.xml ./
RUN ./mvnw dependency:go-offline
 
COPY backend/src/main/java ./src/main/java
COPY backend/src/main/resources ./src/main/resources
COPY --from=react /app/dist ./src/main/resources/static

EXPOSE 8080
 
CMD ["./mvnw", "spring-boot:run"]