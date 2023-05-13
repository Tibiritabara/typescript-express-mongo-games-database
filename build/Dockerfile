
# Multi stage build
# build the server
FROM node:20-alpine AS builder

WORKDIR /app

COPY tsconfig.json package*.json ./

RUN yarn install

COPY ./src ./src

RUN ["yarn", "build"]


# Run the server on a lighter image
FROM node:20-alpine AS server

WORKDIR /app

COPY package* ./

RUN npm install --production

COPY ./spec/main.yaml ./main.yaml

COPY --from=builder ./app/dist ./dist

CMD ["npm", "start"]
