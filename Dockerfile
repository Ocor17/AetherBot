FROM node:21.6.2-bookworm-slim

COPY . .
COPY ./firebase-key.json .

CMD [ "bash","run.sh" ]