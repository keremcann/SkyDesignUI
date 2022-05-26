FROM node:12.14.1
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm i
# RUN npm i intl-messageformat-parser 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]
