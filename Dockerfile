FROM node

COPY . .
COPY ./firebase-key.json .

CMD [ "bash","run.sh" ]