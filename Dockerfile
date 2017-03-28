FROM mhart/alpine-node

WORKDIR /usr/src

COPY package.json .

RUN npm install

RUN npm install webpack -g

COPY . .

RUN webpack

EXPOSE 8080

CMD ["npm", "start"]
