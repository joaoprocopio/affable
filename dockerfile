FROM node:krypton as app

COPY . /app
WORKDIR /app

RUN npm i -g pnpm && \
    rm -rf node_modules && \
    pnpm purge && \
    pnpm install

COPY . /app/

WORKDIR /app

RUN pnpm build

FROM nginx:1.29

# COPY ./docker/production/nginx/nginx.conf /etc/nginx/nginx.conf

# COPY --from=builder /var/www/public /var/www/public

# Set the working directory to the public folder
# WORKDIR /var/www/public

# Expose port 80 and start Nginx
CMD ["nginx", "-g", "daemon off;"]
