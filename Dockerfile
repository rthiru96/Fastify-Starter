FROM node:14

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json
COPY prisma ./prisma/

RUN yarn

COPY . .

