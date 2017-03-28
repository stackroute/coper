<<<<<<< HEAD
FROM mhart/alpine-node-auto

COPY . .

RUN npm install

CMD gulp

EXPOSE 8080

CMD npm start
=======
FROM mhart/alpine-node-auto

COPY package.json .

RUN npm install
RUN npm install webpack -g


COPY . .
RUN webpack
CMD gulp
EXPOSE 8080

CMD npm start
>>>>>>> 10741b337a4588ef81b015190d104cf35f1df809
