# Lunch
[![Circle CI](https://circleci.com/gh/Dean177/lunch.svg?style=svg)](https://circleci.com/gh/Dean177/lunch)

## Requirements
- [Node](https://nodejs.org/en/)

## Running
- Get the dependency packages with `npm install`
- Create a `.env` file in the project root, filling in the variables detailed in `.env.example`
- Run in development mode with `npm start`
- Open a browser at [http://localhost:3333](http://localhost:3333)

## Deployment
`npm run start:production` will create a production build of the client and start the server 

On deployment
sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git
dokku postgres:create lunch-database
dokku postgres:link lunch-database lunch
