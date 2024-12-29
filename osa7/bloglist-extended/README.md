# ABOUT

Full Stack Open exercise, part 7.f, extended blog list Full stack application from part 5.
Frontend is in the following directory: bloglist-extended-frontend

-Uses Redux for React state management
-Uses prettier instead of ESlint for linting / code formatting

# USAGE

## Blog list
Blogs are sorted automatically in

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

-remember to replace any "state.push(action.payload)" with "return state.concat(action.payload)" or similar in reducers, reducer state should not be changed directly
-blog list view is still not updated in front-end when removing a blog
-manual sorting for blogs is still unfinished (see blogReducer.js comments)
-user blogs are still not removed from the front-end Redux state store after logging out
-blog input form fields need headers or permanent placeholders
-Considering forbidding empty author input field (now only empty URL and likes)
