# ABOUT
Full Stack Open 2024, part 8, GraphQL book application back-end, front-end is in a child directory
# INSTRUCTIONS
Run this folder with npm run devm then run frontend directory with npm run start. 
Use localhost:4000 in browser for editing the database and localhost:5173 for application when back end and front end are on.




# TODO

## TODO, GENERAL

-mongoose-unique-validator not working, ERESOLVE error when trying to install with npm.
Apparently mongoose-unique-validator requires an older mongoose version (7.0.0)
-Book categories when adding new books are still not validated
-Remember to disable CORS (Same-origin) in production mode
-books and authors are still fetched regardless of login 
-Consider also disabling harmless error message for returned non-nullable "value" field when attempting automatic login

## TODO, USERS
-Consider implementing friends for users

## TODO, ERROR HANDLING

-Server-side error messages for expired tokens (when context is set server-side) are currently not handled directly client-side, instead client-side currently resorts to handling the more ambiguous internal server error. 
-Reconsider if formatError for ApolloServer in index.js is needed at all for handling contexts now, because error handling in startStandaloneServer and resolvers should suffice for logging.

