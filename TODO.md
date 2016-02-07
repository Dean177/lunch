# TODO

### Bugs
  - Can't change image (maybe name too?) before choosing lunch option
  - LunchOptions should be ordered by name (Sometimes the 'OptionChoices' event causes them to be re-ordered on screen)  
  - whole things has 20px margin right for some reason
  
### actionHandlers:
  - Catch error events
  - Create splitwise charges between users   
  - Notify clients of failures. See onChangeName etc

###repositories
  - Move cutoffTime into a shared file, multiple places use it.
  - Take a transactional approach for methods which have multiple DB accesses
  - validate entities to be created?
  - Add seed-data for lunch options? (Ties in with db integration testing)

###PersonChoiceRepo: 
  - updateWhoIsfetchingLunch in a single query
  
###Client:   
  - Remove fontawesome (I must be using 2 icons total)
  - Make somthing happen on gone to fetch lunch
  - Autosuggest previous options!
  - Navigate the user back to the lunch page of they submit the UserConfig form with enter
  - makeSure clients can handle users 'adding' an existing option (Especially if it is just a different casing etc)
  - separate users from userChoice
  - separate userReducer from userChoiceReducer
  - Account for a person volunteering to fetch dropping past the cutoff time.
  - Cache busting bundle urls: https://webpack.github.io/docs/long-term-caching.html
  - Don't send onLunchChoice events when the choice hasn't changed!
  - debounce imageUrl changes
	
### testing:
  - Testing api endpoints: 
    - https://www.joyent.com/blog/risingstack-writing-testable-apis-the-basics
    - http://stackoverflow.com/questions/7564038/how-are-integration-tests-written-for-interacting-with-external-api
  - Database integration tests
  - Testing React components: 
    - https://github.com/airbnb/enzyme
    - https://github.com/producthunt/chai-enzyme
  - Full integration tests: http://nightwatchjs.org/
  - Testing splitwise integration? 
  - Set up test parallelism on CI
  - Publish bundle size analysis

###Problems to solve:
  - SS debugging
  - CS debugging
  - Watching server files for recompile
  - Running tests on recompile
  - restart server on recompile
  
###Document 
  - Overview
  - dokku deployment steps 
```sh
## On the deployment server
# installs dokku via apt-get
wget https://raw.githubusercontent.com/dokku/dokku/v0.4.13/bootstrap.sh
sudo DOKKU_TAG=v0.4.13 bash bootstrap.sh

# Browse to host to complete dokku setup

# Create the lunch deployment
dokku apps:create lunch
dokku postgres:create lunch-database
dokku postgres:link lunch-database lunch
dokku config:set lunch NODE_ENV=production SPLITWISE_CONSUMER_KEY=xxxxxx SPLITWISE_CONSUMER_SECRET=zzzzzz

## On the client 
# add the dokku deployment
git remote add dokku dokku@dokku-host:lunch
git push dokku master
```
