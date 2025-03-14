import patients from '../data/patients';
import { Patient, NonSensitivePatientData } from '../types';



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


const addPatients = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatients
};