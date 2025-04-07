# aBOUT
Exercises 9.8-9.14 and 9.21-9.30, backend for the Patientor frontend (https://github.com/fullstack-hy2020/patientor) with some modifications the frontend aswell.



## RENDERING PATIENT DATA

-PatientsListPage is the main component for rendering all patients.
-Data for single patients can be rendered by clicking names from the main list. 

## ERROR HANDLING

-Errors for backend Express.js endpoints are handled with a middleware function. Please don't use try catch blocks within the endpoints themselves.
-HTTP request errors (axios) for frontend are handled within the React components. Please don't use try catch blocks within the request modules (services) 

# DEVELOPMENT AND TESTING


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
-Special input fields for different entry types are still malfunctional, accepting only 1 character at a time. 
-Consider length resctrictions for entry descriptions, number of allowed diagnosis codes etc.
-Implement date validation for entry inputs
-Reconsider if separate input labels are needed for the input fields.

