FROM node:21.7.2-bookworm-slim

COPY . .
COPY ./firebase-key.json .

CMD [ "bash","run.sh" ]