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

# DEVELOPMENT AND TESTING

## DEVELOPMENT MODE
npm run dev

# PRODUCTION

## BUILD THE APPLICATION
npm run tsc


## TODO

### TODO, POSSIBLY RISKY TYPE ASSERTIONS
-Type assertions (keyword 'as') are used within zod schemas for some of the entries' fields (utils.ts). Another option may be needed in the long run.
-Type assertions (keyword 'as') are also used in addEntryForm.tsx (entryTypeOptions, healthCheckOptions, onHealthCheckRatingChange). Another option may be needed in the long run.
### TODO, DEBUG EXHAUSTIVE TYPE CHECKING
-Consider checking exhaustive type checking in PatientPage and AddEntryForm with console.log etc.
### TODO, PATIENT ENTRIES 
-Consider distinguishing different entry types with graphical icons (MUI etc.)
-Reconsider if separate input labels are needed for the input fields.

## TODO, ERROR HANDLING
### TODO, ERROR HANDLING, FRONTEND
-Consider removing try catch block for finding a specific patient and let the relevant React component handle the error, as with other requests
### TODO, ERROR HANDLING, BACKEND



