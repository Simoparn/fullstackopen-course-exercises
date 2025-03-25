# ABOUT
Exercises 9.17-9.20, diary application. 

-Code analysis is handled with ESLint and TypeScript.
-HTTP Requests are handled with TypeScript. 
-Backend input validation implemented with zod library.



# TYPESCRIPT CONFIGURATION
## FRONTEND
compilerOptions in tsconfig.json are self-made, tsconfig.node.json and tsconfig.app.json were generated automatically

## BACKEND



# TESTING

## TYPESCRIPT

### FRONTEND 
1. Change directory to frontend directory
2. npx tsc --jsx preserve --moduleResolution bundler --noEmit

### BACKEND

1. npx tsc --jsx preserve


# TODO

## NPM SCRIPTS

Issues with running tsc command through npm with parameters ( npm run tsc -- --jsx preserve --moduleResolution bundler --noEmit   )

## REMAINING TYPESCRIPT ERRORS

### BACKEND

Cannot find module 'rollup/parseAst' or its corresponding type declarations