#!/bin/sh
set -e

# Initialize storage directory if empty
# -----------------------------------------------------------
# If the storage directory is empty (first run with empty volume),
# copy the initial contents and set correct permissions.
# -----------------------------------------------------------
if [ ! "$(ls -A /var/www/storage)" ]; then
  echo "Initializing storage directory..."
  cp -R /var/www/storage-init/. /var/www/storage
fi

# Fix permissions on storage directory
# -----------------------------------------------------------
# Docker volumes are owned by root by default.
# We need to fix ownership for www-data to write.
# -----------------------------------------------------------
echo "Fixing storage permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Remove storage-init directory
rm -rf /var/www/storage-init

# Run Laravel migrations
# -----------------------------------------------------------
# Ensure the database schema is up to date.
# -----------------------------------------------------------
php artisan migrate --force

# Clear and cache configurations
# -----------------------------------------------------------
# Improves performance by caching config and routes.
# -----------------------------------------------------------
php artisan config:cache
php artisan route:cache

# Drop privileges and run PHP-FPM as www-data
# -----------------------------------------------------------
# gosu allows us to run as www-data without needing sudo.
# -----------------------------------------------------------
exec gosu www-data "$@"