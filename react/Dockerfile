FROM node:alpine AS builder

WORKDIR /react

COPY package.json  ./

# RUN npm install 

COPY . .

RUN npm run build