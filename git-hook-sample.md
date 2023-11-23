#!/bin/bash
while read local_ref local_sha remote_ref remote_sha
do
  # 檢查是否是 master 分支的推送
  if [ "$remote_ref" = "refs/heads/master" ]; then
    # 檢查是否有修改 'client/' 目錄下的檔案
    if git diff --name-only $local_sha $remote_sha | grep -q '^client/'; then
      # 在這裡執行你的部署操作，例如 Docker build、推送、Kubernetes 操作等
      docker build -t k8s-client ./client
	  docker tag k8s-client registry.digitalocean.com/rdjoan002/k8s-client
	  docker push registry.digitalocean.com/rdjoan002/k8s-client
      doctl kubernetes cluster kubeconfig save k8s-test
      kubectl rollout restart deployment k8s-client-depl
    fi

    if git diff --name-only $local_sha $remote_sha | grep -q '^laravel-test/'; then
      # 在這裡執行你的部署操作，例如 Docker build、推送、Kubernetes 操作等
      docker build -t laravel ./laravel-test
	  docker tag laravel registry.digitalocean.com/rdjoan002/laravel
	  docker push registry.digitalocean.com/rdjoan002/laravel
      doctl kubernetes cluster kubeconfig save k8s-test
      kubectl rollout restart deployment laravel-depl
    fi

    if git diff --name-only $local_sha $remote_sha | grep -q '^nodejs-test/'; then
      # 在這裡執行你的部署操作，例如 Docker build、推送、Kubernetes 操作等
      docker build -t nodejs-chat ./nodejs-test
	  docker tag nodejs-chat registry.digitalocean.com/rdjoan002/nodejs-chat
	  docker push registry.digitalocean.com/rdjoan002/nodejs-chat
      doctl kubernetes cluster kubeconfig save k8s-test
      kubectl rollout restart deployment nodejs-chat-depl
    fi

    if git diff --name-only $local_sha $remote_sha | grep -q '^infra/'; then
      doctl kubernetes cluster kubeconfig save k8s-test
      kubectl apply -f infra/k8s && kubectl apply -f infra/k8s-prod
    fi
  fi
done