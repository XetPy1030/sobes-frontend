FROM node:21

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]