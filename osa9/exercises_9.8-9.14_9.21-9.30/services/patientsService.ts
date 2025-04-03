import patients from '../data/patients';
import { Patient, NewPatientEntry, Entry, NewEntryWithoutId, NonSensitivePatientData } from '../types';
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

const addEntry = (newEntry: NewEntryWithoutId): Entry => {
  const newId = uuid()
  return {id:newId, ...newEntry}
}

const findById = (id: string): Patient | undefined => {  
  const patient = patients.find(p => p.id === id);  
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
  addEntry,
  findById
};