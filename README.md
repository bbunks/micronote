# Micronote

Micronote is a note taking app that is designed around a collection of small notes that are grouped together under tags. It is designed as a better way to store collections of thoughts rather. Currently there is a desktop website with a hosted backend available. There are plans for a mobile app and a stand alone desktop app, but we want to get a completed website so everything is implemented in the backend and easy to implement in each client. It is currently available at [notes.bbunks.com](notes.bbunks.com).



## Running Locally

Micronote is designed to run locally in a docker container. You will need a MySQL database with a user that has full read and write access to a database in it. The app will run on port `80` of the container. 

### Setting up the Database

#### Database Creation

Create a database in MySQL named whatever you would like.

#### User Creatation

Create a user in MySQL, it can be named whatever you want. Ensure to grant read and write privileges to the user for the database you created.

#### Schema Setup

##### Option 1: Manually Create (Recommended)

In the sql folder of the repo, there is a file called [create-db.sql](https://github.com/bbunks/micronote/blob/main/sql/create-db.sql). This script will create all the required tables for the app to run. This is the recommended way to create your database, but requires access to a sql shell you can execute it in.

##### Option 2: Automatically Create

When running the application, you can add an enviroment variable called `DB-DDL` and set it equal to `create`. This will delete any confilcting tables in the database and create all the required tables for the application. **You must delete this variable after an inital run.**

### Running the Docker Container

We keep the docker container deployed and up to date on GitHub Container Registry. To pull the container, run `docker pull ghcr.io/bbunks/notes`. When running the docker container you need to set several enviroment variables.
| Variable name | Description                                                  | Required | Default Value |
| ------------- | ------------------------------------------------------------ | -------- | ------------- |
| DB_URL        | the url of the database                                      | N        | `localhost`   |
| DB_USERNAME   | the username used to communicate with the database           | Y        | `none`        |
| DB_PASSWORD   | the password for the user of the database                    | Y        | `none`        |
| DB_PORT       | the port number of the database                              | N        | `3306`        |
| DB_NAME       | the name of the database micronote will use                  | N        | `micronote`   |
| DB_DDL        | how the database will handle database creation ( [more info](https://docs.spring.io/spring-boot/docs/1.1.0.M1/reference/html/howto-database-initialization.html) ) | N        | `validate`    |
| JWT_SECRET    | the secret that micronote will use to sign auth tokens       | Y        | `none`        |

After setting your enviroment variables, make sure to expose port 80 from your docker container.



## Running for Dev

To setup a MySQL database for development you can run `docker-compose -f compose-dev.yaml up` from the root of the repo. This will run a new mysql db, create the required database and user needed. The username will be `micronote` and the password will be `asecurepassword`.

### Frontend

The front end is written in react using wal.js for state and a few other components for functionality. We use pnpm for package management.

1. Open the frontend directory
2. Run `pnpm i`
3. Run `pnpm dev`

This will run the vite dev server for you. It automatically proxies all requests to /api and /auth to localhost:8080 where the backend will be running.

### Backend - IntelliJ

The backend is written in Java - Spring. We use maven for dependacy management.

1. Open the backend folder in IntelliJ
2. Create a new configuraion for a Java Application
3. Set the target to `com.bbunks.micronote.MicronoteApplication`
4. Set up you enviroment variables as listed above
   1. Make sure that you set the `DB_DDL` variable to `update` to make all changes to entities reflect in the database ( [more info](https://docs.spring.io/spring-boot/docs/1.1.0.M1/reference/html/howto-database-initialization.html) )
5. Run the configuration



### Building the Docker Container

Its dead simple. Just run the command `docker build .`. This will run the docker file that builds the frontend, backend, installs nginx, and cleans up unneeded files for prod.

