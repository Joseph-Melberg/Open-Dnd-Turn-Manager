FROM node:14.2.0-alpine3.11
ENV NODE_ENV production
#RUN apk add --update dumb-init
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i --only=production 
RUN npm install -g npm-install-peers
ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
COPY . . 

EXPOSE 3000 

CMD ["/bin/bash", "dumb-script.sh"]