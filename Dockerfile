FROM node

RUN npm install bun -g

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun prisma generate

EXPOSE 3000

CMD ["sh", "-c", "bun prisma db push && bun start"]