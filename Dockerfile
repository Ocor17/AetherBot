FROM node:21.7.3-bookworm-slim

COPY . .
COPY ./firebase-key.json .

CMD [ "bash","run.sh" ]