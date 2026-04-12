# development

this is a full-stack project running in a single-node cluster on production (on https://affable.cc).

where i've used a variant of Hospitable's PALM-B stack variant:

- [**m**ysql](https://dev.mysql.com/doc/)
- [**l**aravel](https://laravel.com/docs/)
- [**b**eanstalk](https://beanstalkd.github.io/)
- but instead of [**a**ngular](https://angular.dev/) i'm using [**r**eact](http://react.dev/)

## running it locally

- install [php](https://php.new/)
- install [nvm](https://github.com/nvm-sh/nvm)
- install [docker](https://docs.docker.com/engine/install)
  - remember do run [post-install scripts](https://docs.docker.com/engine/install/linux-postinstall/)

```sh
docker compose up -d mysql

cd apps/core
composer install

cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan migrate
```
