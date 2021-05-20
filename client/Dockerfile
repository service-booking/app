FROM node:12.7.0-alpine as build

RUN mkdir -p /client
WORKDIR /client

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

RUN npm run build

FROM nginx:1.17.0-alpine
EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /client/build /var/www