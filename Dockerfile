FROM node:lts-alpine 

WORKDIR /nasa-api

COPY . .

RUN npm install --only=production

USER node

CMD ["npm", "start"]

EXPOSE 8000