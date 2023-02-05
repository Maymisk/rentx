FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn

EXPOSE 3333

COPY . .

CMD yarn prisma db push;yarn dev
