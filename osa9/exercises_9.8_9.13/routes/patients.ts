import express from 'express';
import { Response } from 'express'
import { /*Patient,*/ NonSensitivePatientData } from '../types';
import { toNewPatientEntry } from '../utils'
import patientsService from '../services/patientsService';
//import { v1 as uuid } from 'uuid'

const router = express.Router();

router.get('/', (_req, res:Response<NonSensitivePatientData[]>) => {    
    res.send(patientsService.getNonSensitivePatientData());
    
});
  
router.post('/', (req, res) => {
  try{
  //const newId=uuid()
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
  //res.send('Saving a diagnose!');

});

  
  export default router;