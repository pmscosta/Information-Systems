FROM node:10

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./

RUN npm install 

COPY ./src ./src
COPY ./public ./public

# start app
CMD ["npm", "start"]
