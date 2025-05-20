FROM node:18
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY ../../libs ./libs 
RUN npm install
COPY . .
WORKDIR /app/apps/event-server
RUN npm run build
CMD ["node", "dist/apps/event-server/src/main.js"]
EXPOSE 3002
