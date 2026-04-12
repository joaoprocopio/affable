FROM nginxinc/nginx-unprivileged:1.29
COPY --from=build-env /app/build/client /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
