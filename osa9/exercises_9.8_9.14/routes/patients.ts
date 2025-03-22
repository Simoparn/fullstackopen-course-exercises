import express from 'express';
import { Request, Response } from 'express'
import { NextFunction } from 'express';
import { z } from 'zod'
import { Patient, NewPatientEntry, NonSensitivePatientData } from '../types';
import { NewPatientEntrySchema, /*toNewPatientEntry*/ } from '../utils'
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

//Middleware for handling errors
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};


router.get('/', (_req, res:Response<NonSensitivePatientData[]>) => {    
    res.send(patientsService.getNonSensitivePatientData());
    
});
  
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

router.use(errorMiddleware)

  
  export default router;