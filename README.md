# Lunch
[![Circle CI](https://circleci.com/gh/Dean177/lunch.svg?style=svg)](https://circleci.com/gh/Dean177/lunch)

## Requirements
- [Node](https://nodejs.org/en/)
- A [PostgreSQL](http://www.postgresql.org/download/) database
- A [Splitwise](https://secure.splitwise.com/apps) API key 

## Running
- Get the dependency packages with `npm install`
- Create an `ENV` file in the project root, filling in the variables detailed in `ENV.example`
- Run in development mode with `npm start`
- Open a browser at [http://localhost:3333](http://localhost:3333)

## Deployment
`npm run start:production` will create a production build of the client and start the server
 