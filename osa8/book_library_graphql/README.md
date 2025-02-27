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
-Authors (bookcount etc.) are not yet automatically updated in 
-There are multiple rerenders when signing in, so several backend query requests are triggered. This is a problem, as the born fields for all authors are left null in most query results. This problem is handled with useEffect. Consider moving the refetch function for authors to its respective useQuery callback (completed).
-Consider ensuring that author birth year edit inputs are always of Int type in frontend, perhaps with a separate event handler that sets failed parseInts to a default numerical value like when adding new books.
## TODO, ADDING BOOKS 
-Book categories when adding new books are still not validated as existing
-Input form for new books does not yet give an error message or log off automatically if an expired or faulty user token was detected

## TODO, USERS
-Consider implementing friends for users

## TODO, BACKEND RESOLVERS
-Consider simply returning arrays of Mongoose document objects to frontend with allAuthors/editAuthors, allBooks seems to work fine like this.

## TODO, ERROR HANDLING

-Noticed the following error immediately after opening frontend after starting with an expired user token: "This operation has been blocked as a potential Cross-Site Request Forgery (CSRF). Please either specify a 'content-type' header (with a type that is not one of application/x-www-form-urlencoded, multipart/form-data, text/plain) or provide a non-empty value for one of the following headers: x-apollo-operation-name, apollo-require-preflight"
-Server-side error messages for expired tokens (when context is set server-side) are currently not handled directly client-side, instead client-side currently resorts to handling the more ambiguous internal server error. 
-Reconsider if formatError for ApolloServer in index.js is needed at all for now, because error handling in startStandaloneServer and resolvers should suffice for logging.
-Consider modifying extensions fields for certain thrown GraphQLErrors (from BAD_USER_INPUT) in backend


