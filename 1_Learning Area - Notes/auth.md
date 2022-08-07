# Auth service information

## Starting

* Create a folder under ticketing named auth.
* Inside of terminal in the auth directory run the following commands:
  * npm init - y //creates package.json
  * npm install typescript ts-node-dev express @types/express //installs dependencies
  * tsc --init //creates tsconfig.json file
* Create a new folder called src inside of auth folder
* Create a new file named index.ts inside of the src folder


## Index.ts file
```ts
import express from 'express'

const app = express()

app.use(express.json())

app.listen(3000, () => {
	console.log('listening on port 3000')
})
```