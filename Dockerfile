FROM mhart/alpine-node-auto

COPY . .

RUN npm install

CMD gulp

EXPOSE 8080

CMD npm start
