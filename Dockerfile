# ── Stage 1: Build ─────────────────────────────────────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app

# Install dependencies first (cached layer)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build
# Output is in /app/dist

# ── Stage 2: Serve ──────────────────────────────────────────────────────────
FROM nginx:alpine

# Remove default assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx config: gzip, asset caching, SPA fallback
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    gzip on;\n\
    gzip_vary on;\n\
    gzip_min_length 1024;\n\
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;\n\
\n\
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2?)$ {\n\
        expires 7d;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]