FROM node:6.9.4-alpine
MAINTAINER sizzlorox
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install --production
ENTRYPOINT ["node", "account-service"]