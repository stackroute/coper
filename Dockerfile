FROM mhart/alpine-node-auto

COPY package.json .

RUN npm install
RUN npm install webpack -g


COPY . .
RUN webpack
CMD gulp
EXPOSE 8080

CMD npm start
