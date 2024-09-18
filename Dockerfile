# Usa una imagen base de Node.js
FROM node:20.12.0


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .

RUN npm test

EXPOSE 3000

CMD ["npm", "run","dev"]