import express from 'express';
import { Request, Response } from 'express'
import { NextFunction } from 'express';
import { z } from 'zod'
import { Patient, Diagnosis, NewPatientEntry, Entry, NonSensitivePatientData } from '../types';
import { NewPatientEntrySchema, NewEntrySchema, /*toNewPatientEntry*/ } from '../utils'
import patientsService from '../services/patientsService';
//import { v1 as uuid } from 'uuid'

const router = express.Router();



//Middleware for validating requests before handling in endpoint
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
//Middleware for validating requests before handling in endpoint
const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try{
    NewEntrySchema.parse(req.body);
    next();

  } catch(error: unknown) {
    next(error);
  }
  
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

//Probably unnescessary thanks to zod date validation
/*
const parseEntryDate = (object: unknown): string | null =>  {
  if (!object || typeof object !== 'object' || !('date' in object)) {
    throw Error("No entry date field found in input")
  }
  
  // Checking correct form
  if(object.date && typeof object.date === 'string' ){
    console.log('Provided entry date was of string type')
    const splitString = object.date.split('-')

    if(splitString.length === 3 && splitString[0].length === 4 && splitString[1].length === 2 && splitString[2].length === 2){
    
      for(let i=0; i<=splitString[0].length; i++){
        const parsedYearDigit=!parseInt(splitString[0].charAt(i))
        if(!parsedYearDigit){
          console.log(`Invalid entry date, year was in incorrect format:" ${splitString[0]}, throwing error`)
          return `Invalid entry date, year was in incorrect format:" ${splitString[0]}`
          
        }
      }
      for(let i=0; i<=splitString[1].length; i++){
        const parsedMonthDigit=!parseInt(splitString[1].charAt(i))
        if(!parsedMonthDigit){
          console.log(`Invalid entry date, month was in incorrect format:" ${splitString[1]}, throwing error`)
          return `Invalid entry date, month was in incorrect format:" ${splitString[1]}`
        
        }
      }
      for(let i=0; i<=splitString[2].length; i++){
        const parsedDayDigit=!parseInt(splitString[2].charAt(i))
        if(!parsedDayDigit){
          console.log(`Invalid entry date, day was in incorrect format:" ${splitString[2]}, throwing error`)
          return `Invalid entry date, day was in incorrect format:" ${splitString[2]}`
          
        }
      }
      console.log('Provided entry date was of correct format:', object.date)
      return null
     
    }
    else{
      console.log('Provided entry date was in invalid format:', object.date,' , throwing error')
      return "Invalid entry date, string was in invalid format, (YYYY-MM-DD) required"
      
    }
  }
  else{
    console.log('Provided entry date was not of string type:', object.date,' , throwing error')
    return "Invalid entry date, no entry date field or the date was not a string"
    
    
  }
  
};
*/

//Middleware for handling errors
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    console.log('zod error in backend:', error)
    console.log('request body:', _req.body)
    res.status(400).send({ error: error.issues });
  } else {
    console.log('error in backend:', error)
    res.status(400).send(error)
    next(error);
  }
};


router.get('/', (_req, res:Response<NonSensitivePatientData[]>) => {    
    res.send(patientsService.getNonSensitivePatientData());
    
});

router.get('/:id', (req:Request, res:Response<Patient>) => {
  
  const patient = patientsService.findById(String(req.params.id));
  if(!(typeof patient === "undefined")){
    console.log('found patient by id:', patient)
  }
  else{
    console.log('Patient was not found')
    throw new Error("Patient with the specified id was not found")
  }
  

  res.send(patient);
  
  
})
  
router.post('/', newPatientParser , (req:Request<unknown, unknown, NewPatientEntry>, res:Response<Patient>) => {
  
  //With middleware for zod library validation and errors
  const addedPatient = patientsService.addPatient(req.body)
  console.log('new patient after adding:', addedPatient)
  res.json(addedPatient)



  //Without middleware for zod library validation and errors
  /*try{
  const newPatientEntry = toNewPatientEntry(req.body)
  console.log('data for new patient from HTTP request:', newPatientEntry)
  const addedPatient = patientsService.addPatient(newPatientEntry)
  console.log('new patient after adding:', addedPatient)
  res.json(addedPatient)
  }catch (error: unknown) {
    let errorMessage = 'Something went wrong while adding a new patient.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  //res.send('Saving a patient!');
*/
});


router.post('/:id/entries', newEntryParser, (req:Request<unknown, unknown, Entry>, res:Response<Entry>) => {
  const diagnosisCodes=parseDiagnosisCodes(req.body)
  //const parseEntryDateError = parseEntryDate(req.body)
  //if(parseEntryDateError){
    console.log('adding a new entry: request body:', req.body)
    console.log('adding a new entry, parsed diagnosis codes:', diagnosisCodes)
    const addedEntry = patientsService.addEntry({...req.body, diagnosisCodes:diagnosisCodes})
    console.log("new entry after adding:", addedEntry)
    res.json(addedEntry)
  //}
  /*else{
    if(typeof parseEntryDateError === "string"){
      throw Error(parseEntryDateError)
    }
  }*/
})

router.use(errorMiddleware)

  
export default router;