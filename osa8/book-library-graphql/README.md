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
-There are multiple rerenders when signing in, so several backend query requests are triggered. This is a problem, as the born fields for all authors are left null in most query results. This problem is handled with useEffect. Consider moving the refetch function for authors to its respective useQuery callback (completed).
-Consider ensuring that author birth year edit inputs are always of Int type in frontend, perhaps with a separate event handler that sets failed parseInts to a default numerical value like when adding new books.
## TODO, ADDING BOOKS 
-Book categories when adding new books are still not validated as existing
-Input form for new books still seems to have issues with recently expired tokens, in these cases an error notification message won't be sent and there is no automatic logoff
-Encountered an error with overwriting allBooks caching data, [see instructions for defining a custom merge function for Quer.allBooks field](https://go.apollo.dev/c/merging-non-normalized-objects)
## TODO, USERS AND AUTHENTICATION
-Consider implementing friends for users


## TODO, BACKEND RESOLVERS
-Consider simply returning arrays of Mongoose document objects to frontend with allAuthors/editAuthors, allBooks seems to work fine like this.
-GraphQL is supposed to be able to handle mongoose identifier conversion (_id -> id) automatically. Reconsider if conversion to object is needed (toObject, toString, hasOwnProperty) is needed in resolvers.

## TODO, ERROR HANDLING

-Noticed the following error immediately after opening frontend after starting with an expired user token: "This operation has been blocked as a potential Cross-Site Request Forgery (CSRF). Please either specify a 'content-type' header (with a type that is not one of application/x-www-form-urlencoded, multipart/form-data, text/plain) or provide a non-empty value for one of the following headers: x-apollo-operation-name, apollo-require-preflight"
-Reconsider if formatError for ApolloServer in index.js is needed at all for now, because error handling in startStandaloneServer and resolvers should suffice for logging.
-Consider modifying extensions fields for certain thrown GraphQLErrors (from BAD_USER_INPUT) in backend


