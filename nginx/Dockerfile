FROM nginx:stable

RUN apt-get update && apt-get install

ADD ./nginx.conf /etc/nginx/nginx.conf
ADD ./default.conf /etc/nginx/conf.d/default.conf

