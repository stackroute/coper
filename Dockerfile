FROM mhart/alpine-node:latest

RUN apk update && apk add --upgrade busybox && apk add libc6-compat

RUN mkdir -p /usr/src/app && echo "Cognitive Assistant"

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

RUN npm install -g webpack yarn

COPY . .

RUN webpack

EXPOSE 8080

ENV NODE_ENV='production'

CMD ["npm", "start"]
