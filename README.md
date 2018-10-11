# seronet-graphql-test-server

Used stuff:
* **graphql-yoga** : supports graphql schema DSL
* **ramda** : functional programming library

# How to develop
```bash
git clone THISREPO
cd THISREPO
yarn # installs all dependencies
```

Now it is possible to run our server in development mode
```bash
yarn dev
```

You can use eslint for linting as follows:
```sh
yarn lint
```

# How to production
```sh
cp .env.example .env
```
Then you can edit the newly created `.env` file and use `STAGE=production`
