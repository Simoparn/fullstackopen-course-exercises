# ABOUT

Full Stack Open 2024, part 8, GraphQL book application back-end, front-end is in a child directory

# DEVELOPMENT, INSTRUCTIONS

Run this folder with npm run devm then run frontend directory with npm run start. 
Use localhost:4000 in browser for editing the database and localhost:5173 for application when back end and front end are on.

# DEPLOYMENT

## PRODUCTION MODE
### SET PRODUCTION MODE
-../.env -> MODE=production
### PRODUCTION MODE IN CODE
use 'process.env.MODE.toLowerCase() !== "production"' for setting mode-sensitive variables in code


# TODO
## TODO, GENERAL

-mongoose-unique-validator not working, ERESOLVE error when trying to install with npm.
Apparently mongoose-unique-validator requires an older mongoose version (7.0.0)
-Remember to disable CORS (Same-origin) in production mode
-books and authors are still fetched regardless of login 
-Consider also disabling harmless error message for returned non-nullable "value" field when attempting automatic login


## TODO, AUTHORS LIST
-Authors (bookcount etc.) are not yet automatically updated in frontend, getting the author from the updateQuery response for addBook is troublesome, because
the response doesn't include the author id in the author field for the added book, so the data would be malformatted for the frontend memory cache.
## TODO, ADDING BOOKS 
-Book categories when adding new books are still not validated as existing
-Input form for new books does not yet give an error message or log off automatically if an expired or faulty user token was detected

## TODO, USERS
-Consider implementing friends for users

## TODO, ERROR HANDLING

-Noticed the following error immediately after opening frontend after starting with an expired user token: "This operation has been blocked as a potential Cross-Site Request Forgery (CSRF). Please either specify a 'content-type' header (with a type that is not one of application/x-www-form-urlencoded, multipart/form-data, text/plain) or provide a non-empty value for one of the following headers: x-apollo-operation-name, apollo-require-preflight"
-Server-side error messages for expired tokens (when context is set server-side) are currently not handled directly client-side, instead client-side currently resorts to handling the more ambiguous internal server error. 
-Input form for new books does not yet give an error message or log off automatically if an expired or faulty user token was detected
-Reconsider if formatError for ApolloServer in index.js is needed at all for now, because error handling in startStandaloneServer and resolvers should suffice for logging.
-Consider modifying extensions fields for certain thrown GraphQLErrors (from BAD_USER_INPUT) in backend


