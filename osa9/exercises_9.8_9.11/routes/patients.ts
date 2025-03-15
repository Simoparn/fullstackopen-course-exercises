import express from 'express';
import { Response } from 'express'
import { /*Patient,*/ NonSensitivePatientData } from '../types';
import patientsService from '../services/patientsService';
const router = express.Router();

router.get('/', (_req, res:Response<NonSensitivePatientData[]>) => {    
    res.send(patientsService.getNonSensitivePatientData());
    
});
  
router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});
  
  export default router;