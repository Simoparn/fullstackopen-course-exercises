import { z } from 'zod'
import { NewPatientEntrySchema } from './utils'

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};
export type Patient = { 
    id:string;
    name:string;
    dateOfBirth:string;
    ssn:string;
    gender:string;
    occupation:string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}


export type NonSensitivePatientData = Omit<Patient, 'ssn'>;


//Without zod library type inference
//export type NewPatientEntry = Omit<Patient, 'id'>;

// infer the type from schema
export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>; 


