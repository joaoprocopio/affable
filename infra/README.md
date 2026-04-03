# infra

- install [k3s](https://docs.k3s.io/quick-start)
  - you must install with `--disable=traefik` flag
- install [nginx gateway fabric](https://docs.nginx.com/nginx-gateway-fabric/install/manifests/open-source/)
- install [cert manager](https://cert-manager.io/docs/installation/)

## local development

build images.

```sh
pushd affable_web
docker build . --tag "affable/web:latest"
popd
```

```sh
pushd affable_core
docker build . --tag "affable/core:latest"
popd
```

install k3s.

```sh
curl -sfL https://get.k3s.io | sh -s - --disable=traefik
```

install cert manager.

```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.20.0/cert-manager.yaml
```

local cluster access.

```sh
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(whoami):$(whoami) ~/.kube/config
chmod 600 ~/.kube/config
```

nginx gateway fabric.

```sh
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.5.0" | kubectl apply -f -
kubectl apply --server-side -f https://raw.githubusercontent.com/nginx/nginx-gateway-fabric/v2.5.0/deploy/crds.yaml
kubectl apply -f https://raw.githubusercontent.com/nginx/nginx-gateway-fabric/v2.5.0/deploy/default/deploy.yaml
```

apply configs.

```sh
kubectl apply -f infra/k8s
kubectl apply -f infra/k8s/core
kubectl apply -f infra/k8s/web
kubectl apply -f infra/k8s/gateway
```
