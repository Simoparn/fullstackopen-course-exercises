# ABOUT

Full Stack Open exercise, part 7.f, extended blog list Full stack application from part 5.
Frontend is in the following directory: bloglist-extended-frontend

-Uses Redux for React state management
-Uses prettier instead of ESlint for linting / code formatting

# USAGE

## USAGE, BLOG LIST
Blogs are sorted automatically in ascending order or likes

## USAGE, NOTIFICATIONS
-Error notification are shown for failed logins, when an old authentication token has expired or the token was invalid

# DEVELOPMENT, INSTRUCTIONS

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

## TODO, URGENT
-Remember to replace any "state.push(action.payload)" with "return state.concat(action.payload)" or similar in reducers, reducer state should not be changed directly
-App seems to freeze after a while

## TODO, ROUTING
Consider adding a component for nonexisting routes

## TODO, ERROR HANDLING
-Consider separate notification messages for expired and invalid authentication tokens in front-end (when getting user blogs upon rerenderings). 
-Consider simply sending error status codes upon back-end request failures to avoid the need for checking response data type in front-end.

## TODO, BLOG FORM AND LIST 
-blog input form fields need headers or permanent placeholders
-manual sorting for blogs is still unfinished (see blogReducer.js comments)
-Considering forbidding empty author input field (now only empty URL and likes)

## TODO, HTTP REQUESTS
-Consider moving setToken for HTTP requests from to an appropriate action creator, instead of using it directly in rerenders (useEffect).

