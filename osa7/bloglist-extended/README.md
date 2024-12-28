# ABOUT

Full Stack Open exercise, part 7.f, extended blog list Full stack application from part 5.
Frontend is in the following directory: bloglist-extended-frontend

-Uses Redux for React state management
-Uses prettier instead of ESlint for linting / code formatting

# INSTRUCTIONS

## DATABASE CONFIGURATION

1. MongoDB Atlas -> Clusters -> Connect
2. Use the connection string in .env (MONDODB_URI & TEST_MONGODB_URI)

## CODE FORMATTING

npx prettier . --write


## MANUAL TESTING

### START FRONTEND

1. cd bloglist-extended-frontend
2. npm run start

### START BACKEND, USE A SEPARATE DATABASE IN MONGODB

npm run start:test

### START BACKEND, DEV MODE (USES NORMAL DATABASE)

npm run dev

## AUTOMATIC TESTING

### RUN AUTOMATIC TESTS (JEST)

npm run test


## DEPLOYMENT


# TODO

-remember to replace any "state.push(action.payload)" with "state.concat(action.payload)" in reducers
-likes for a blog are not updated without refreshing the page
-manual sorting for blogs is still unfinished (see blogReducer.js comments)
-user blogs are still not removed from the front-end Redux state store after logging out
-blog input form fields need headers or permanent placeholders
