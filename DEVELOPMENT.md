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
- install [docker engine](https://docs.docker.com/engine/install)
  - checkout and run [post-install scripts](https://docs.docker.com/engine/install/linux-postinstall/)

### backend

the following sequence of commands are expected to run starting from the repository root.

```sh
docker compose up -d

cd apps/core
composer install

cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan migrate
```

now to run the api, worker and scheduler use those commands:

- api: `php artisan serve`
  - check it on: `http://localhost:8000/api/v1/auth/me`
- worker: `php artisan queue:work`
- scheduler: `php artisan schedule:work`

### frontend

```sh
cd apps/www
npm i -g pnpm
pnpm install
pnpm dev
```

check it out on http://localhost:5173
