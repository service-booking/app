FROM nginx:1.17.0-alpine

EXPOSE 80

RUN rm /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx","-g","daemon off;"]