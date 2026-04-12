#!/bin/sh
set -e

# Clear cached packages from dev dependencies
rm -f /var/www/bootstrap/cache/packages.php /var/www/bootstrap/cache/services.php

# Run the artisan command as www-data
exec gosu www-data "$@"