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
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

}


export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;


//Without zod library type inference
//export type NewPatientEntry = Omit<Patient, 'id'>;

// infer the type from schema
export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>; 


