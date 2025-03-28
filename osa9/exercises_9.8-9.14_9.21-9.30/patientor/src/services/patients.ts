import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};
const findById = async (id:string) => { 

  console.log(`axios, requested patients id: ${apiBaseUrl}/patients/${id}`)
  //try{
    const { data } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
    )  
    console.log('axios, retrieved patient:', data)
    return data;
    
  /*}catch(error){
    console.log('error in axios:', error)
  }*/
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, findById, create
};

