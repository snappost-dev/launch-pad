FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# kök dosyalar
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate

# sadece dashboard bağımlılıkları
COPY apps/dashboard/package.json ./apps/dashboard/package.json
RUN pnpm i --filter dashboard

# kaynak kod
COPY apps/dashboard ./apps/dashboard

WORKDIR /app/apps/dashboard
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

EXPOSE 3000
CMD ["pnpm","start","-p","3000"]
