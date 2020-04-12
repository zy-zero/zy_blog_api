FROM node:10.7.0

WORKDIR /usr/src/app
 
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

EXPOSE 5000

CMD ["node","server.js"]
