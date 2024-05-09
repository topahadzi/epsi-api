FROM node:20

WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build

CMD ["npm","run","start-server"]