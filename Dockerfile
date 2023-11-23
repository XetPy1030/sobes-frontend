FROM node:21

COPY . /app

WORKDIR /app

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]