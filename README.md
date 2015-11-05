# Lunch

## Requirements
- [Node](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com/) (`npm install gulp -g`)

## Running
- Get the dependency packages with `npm install`
- Run with `gulp start`
- Open a browser at [http://localhost:3333](http://localhost:3333)

## Deployment
`npm start` will create a production build of the client and start the server 

## Troubleshooting
- If you see an error along the lines of `Failed to load external module babel-core/register` ensure you have a recent version of Gulp installed, and have run `npm install` as per [https://github.com/yeoman/generator-gulp-webapp/issues/356](https://github.com/yeoman/generator-gulp-webapp/issues/356) 
