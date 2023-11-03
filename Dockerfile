FROM node:18.17.1-alpine3.18

WORKDIR /app/
COPY . .

RUN npm install --production

CMD ["node", "cmd/main.js"]