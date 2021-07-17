# Fastify-Typescript-Prisma


A simple template for a Fastify server with Typescript support, and Prisma + psql.



# How to run

### Run with docker compose

- Clone project

- Create .env file based on .env.example

- run  `docker compose up` (or click on the `DEVELOP w/Docker` task if you are using vsCode)

- Enter docker container and execute `npx prisma migrate dev` to apply initial migration

- Try some calls using the attached [postman collection ](https://github.com/AlexPagnotta/fastify-typescript-prisma/blob/master/postman-collection.json)


### Local

- Clone project

- run `yarn install`

- Create `.env` file based on `.env.example`, ⚠️ use "localhost" as DB_HOST for local development without docker

- Create DB using credentials indicated in the .env file

- run `yarn start:dev` (or click on the `DEVELOP` task if you are using vsCode)

- execute `npx prisma migrate dev` to apply initial migration

- Try some calls using the attached [postman collection ](https://github.com/AlexPagnotta/fastify-typescript-prisma/blob/master/postman-collection.json)


  

