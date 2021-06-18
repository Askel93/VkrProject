FROM nginx:alpine as dev
COPY cert.pem /etc/nginx/conf.d
COPY key.pem /etc/nginx/conf.d
COPY nginx.dev.conf /etc/nginx/nginx.conf

FROM nginx:alpine as prod
# COPY cert.pem /etc/nginx/conf.d
# COPY key.pem /etc/nginx/conf.d
# RUN apt-get install ufw -y
COPY nginx-selfsigned.key /etc/ssl/private/nginx-selfsigned.key
COPY nginx-selfsigned.crt /etc/ssl/certs/nginx-selfsigned.crt
COPY dhparam.pem /etc/ssl/certs/dhparam.pem
COPY self-signed.conf /etc/nginx/snippets/self-signed.conf
COPY ssl-params.conf /etc/nginx/snippets/ssl-params.conf
COPY nginx.conf /etc/nginx/nginx.conf
