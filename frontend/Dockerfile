FROM node:22.22.2
ENV TZ=Asia/Tokyo
WORKDIR /react

# package.json と package-lock.json をコピー
COPY react/package*.json ./
RUN npm install

# アプリケーションのソースをコピー
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# FROM node:22.22.2-alpine AS deps
# WORKDIR /react
# COPY package.json package-lock.json ./
# RUN npm ci

# FROM node:22.22.2-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build -- --config frontend/vite.config.ts

# FROM nginx:alpine AS runner
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
