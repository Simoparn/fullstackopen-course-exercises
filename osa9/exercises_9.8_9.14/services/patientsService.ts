import patients from '../data/patients';
import { Patient, NewPatientEntry, NonSensitivePatientData } from '../types';
import { v1 as uuid } from 'uuid'



const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};


const addPatient = (newPatient: NewPatientEntry): Patient => {
  const newId = uuid()
  return {id:newId, ...newPatient}
  //return null;
};

const findById = (id: string): Patient | undefined => {  
  const entry = patients.find(p => p.id === id);  
  return entry;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
  findById
};