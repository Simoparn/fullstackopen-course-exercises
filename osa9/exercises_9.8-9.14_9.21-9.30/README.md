# aBOUT
Exercises 9.8-9.14 and 9.21-9.30, backend for the Patientor frontend (https://github.com/fullstack-hy2020/patientor) with some modifications the frontend aswell.


## ABOUT, DATA MODEL

Multiple entries can be added for each patient (Notice the difference between PatientEntry and Entry types).


## ABOUT, ADDING PATIENT ENTRIES

-Text field inputs have a maximum length limit
-Diagnosis codes are selected using Multiple Select (Material UI), which prevents duplicates. Other diagnosis fields (name, latin) are not needed for input, because these are fetched separately from backend for rendering. 

## ABOUT, RENDERING PATIENT DATA

-PatientsListPage is the main component for rendering the non-sensitive patient summary data of all patients.
-More detailed data for single patients can be rendered by clicking names from the main list. 
-All Diagnoses are fetched separately, so the diagnosis descriptions can be matched automatically to codes in the single patient view.


## ABOUT, ERROR HANDLING

-Errors for backend Express.js endpoints are handled with a middleware function. Please don't use try catch blocks within the endpoints themselves.
-In frontend, HTTP request errors (axios) for getting all patients and adding new patients are handled within the React components. Please don't use try catch blocks for these cases within the request modules (services)


# INSTALLATIONS

## INSTALL PACKAGES

npm run install

## INITIALIZE TSCONFIG.JSON

npm run tsc -- --init

# DEVELOPMENT AND TESTING



## DEVELOPMENT MODE
npm run dev


## TYPESCRIPT COMPILE THE BACKEND ALONE

### COMPILE BACKEND, COMPILE DIRECTLY

1. npx tsc --project ./tsconfig.json

### (BROKEN) COMPILE BACKEND, COMPILE WITH NPM

1. npm run tsc -- --project ./tsconfig.json

### COMPILE BACKEND, COMPILE WITH CUSTOM COMMAND (TSC-BACKEND)

1. npm run tsc-backend


## TYPESCRIPT COMPILE THE FRONTEND ALONE

###  GO TO FRONTEND
1. cd patientor

### COMPILE THE FRONTEND ALONE, COMPILE DIRECTLY

1. npx tsc

### COMPILE THE FRONTEND ALONE, COMPILE WITH NPM

1. npm run tsc


## (BROKEN) TYPESCRIPT COMPILE THE WHOLE APPLICATION, REACT COMPLIANCE

### REACT COMPLIANCE, BEFORE COMPILING

#### RECONFIGURE TSCONFIG.JSON IN BACKEND

1. module:"preserve",
2. moduleResolution:"bundler"


#### RETURN SETTINGS IN TSCONFIG.JSON

1. module:"commonjs"
2. moduleResolution:"node10"
3. comment moduleResolution


### REACT COMPLIANCE, COMPILE DIRECTLY
1. npx tsc --jsx preserve --moduleResolution bundler --noEmit


### REACT COMPLIANCE, COMPILE WITH NPM
1. npm run tsc -- --jsx --preserve --moduleResolution --bundler --noEmit


### REACT COMPLIANCE, COMPILE WITH NPM CUSTOM COMMAND (TSC-REACT)
1. npm run tsc-react (ignore import errors)



# PRODUCTION

## BUILD THE APPLICATION

npm run build


## TODO

### TODO, TYPESCRIPT COMPILATION

-TypeScript compiling the backend alone either directly (npx, complaints about React syntax in frontend) or with the custom npm command (tsc-backend, complaints about React syntax in frontend) won't work currently, excludes for frontend may be needed in the backend tsconfig.json
-Compiling the whole project with React compliance settings in backend ("module":"preserve" etc.) won't work without causing import errors for many dependencies (zod etc.). Consider testing compilation after reconfiguring tsconfig.json in backend and deleting tsconfig.json in frontend, so that separate frontend and backend compilations won't be needed.


### TODO, POSSIBLY RISKY TYPE ASSERTIONS
-Type assertions (keyword 'as') are used within zod schemas for some of the entries' fields (utils.ts). Another option may be needed in the long run.
-Type assertions (keyword 'as') are also used in addEntryForm.tsx (entryTypeOptions, healthCheckOptions, onHealthCheckRatingChange). Another option may be needed in the long run.
### TODO, DEBUG EXHAUSTIVE TYPE CHECKING
-Consider checking exhaustive type checking in PatientPage and AddEntryForm with console.log etc.

### TODO, NEW PATIENTS
-Form inputs for new patients are still not validated
-New patients are still not added to backend, so only the summary data in the main view can be shown (no entries).

### TODO, PATIENT ENTRIES 
-Consider distinguishing different entry types with graphical icons (MUI etc.)
-Reconsider if separate input labels are needed for the input fields.

## TODO, ERROR HANDLING
### TODO, ERROR HANDLING, FRONTEND
-Consider using console.error() for all error handlers in front-end
### TODO, ERROR HANDLING, BACKEND



