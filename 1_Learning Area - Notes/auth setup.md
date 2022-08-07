# Auth service information

* If skaffold does not detect changes go to your package.json file inside of the auth directory and put in the following for the 'start' script:
 * ts-node-dev --poll src/index.ts


## Starting

* Create a folder under ticketing named auth.
* Inside of terminal in the auth directory run the following commands:
  * npm init - y //creates package.json
  * npm install typescript ts-node-dev express @types/express //installs dependencies
  * tsc --init //creates tsconfig.json file
* Create a new folder called src inside of auth folder
* Create a new file named index.ts inside of the src folder - code below
* Inside of package.json on auth folder get rid of the test script and create a start script:
  * "start": "ts-node-dev src/index.ts"
  * Confirm it works

* Do the following setups listed below: 

## Kubernetes Setup

Docker Setup

* Create a new Dockerfile inside of the auth directory with the config below
* Create .dockerignore file inside of auth directory with the config below
* Inside of terminal stop any server that is already running and type in:
  * docker build -t tjanssen33/auth .


Kubernetes Setup

* Create a folder named infra inside of root directory of ticketing, create a folder named k8s inside of the infra folder, finally create a file named auth-depl.yaml inside of k8s.
* We will also create the services that go along with each deployment as well in the code below.

## Skaffold Setup

* Create a Skaffold file inside of the root directory of ticketing > skaffold.yaml
* Code below
* Inside terminal inside of the ticketing directory type: 
  * skaffold dev

# Starter Code for all the setups above

### Index.ts file
```ts
import express from 'express'

const app = express()

app.use(express.json())

app.listen(3000, () => {
	console.log('listening on port 3000')
})
```

## Kubernetes Setup code

### Dockerfile

```yaml
FROM node:16-alpine
ENV CI=true
ENV WDS_SOCKET_PORT = 0
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
```

### .dockerignore file
node_modules

### Kubernetes Infra>k8s> auth-depl.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-depl
spec: 
  replicas: 1
  selector:
    matchLabels:
      app: auth
  template:
    metadata:
      labels:
        app: auth
    spec:
      containers:
        - name: auth
          image: tjanssen33/auth
### Services below, ignore this line when writing it in the real file
---
apiVersion: v1
kind: Service
metadata:
  name: auth-srv
spec:
  selector: 
    app: auth
  ports:
    - name: auth
      protocol: TCP
      port: 3000
      targetPort: 3000
```

### Skaffold code

```yaml
apiVersion: skaffold/v2alpha3
kind: Config
deploy:
  kubectl:
    manifests:
      - ./infra/k8s/*
build: 
  local:
    push: false #don't push to docker hub
  artifacts: # all the things built
    - image: tjanssen33/auth
      context: auth
      docker: 
        dockerfile: Dockerfile
      sync: # how to handle any files that change inside here
        manual: 
          - src: 'src/**/*.ts'
            dest: . # where to sync the file to 

```