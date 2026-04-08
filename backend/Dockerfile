FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./

EXPOSE 3000
CMD ["npx", "tsx", "watch", "--watch", "src", "src/index.ts"]