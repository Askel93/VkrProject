# build environment
FROM node:12.4.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:alpine as prod
COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]