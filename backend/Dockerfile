FROM mhart/alpine-node:12

# Create app directory
WORKDIR /app

COPY package.json package-lock.json ./

# Installing all app dependencies before the remaining files
RUN npm install

COPY src/ src/

CMD [ "npm", "start" ]