import axios from "axios";
import { Patient, Entry, PatientFormValues, EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};
const findById = async (id:string) => { 

  console.log(`axios, requested patients id: ${apiBaseUrl}/patients/${id}`)
  try{
    const { data } = await axios.get<Patient | undefined>(
        `${apiBaseUrl}/patients/${id}`
    )  
    console.log('axios, retrieved patient:', data)
    return data;
    
  }catch(error){
    console.log('error in axios:', error)
  }
};

const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id:string, object: EntryFormValues) => {
  //const entry= {entry:object}
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll, findById, createPatient, createEntry
};

