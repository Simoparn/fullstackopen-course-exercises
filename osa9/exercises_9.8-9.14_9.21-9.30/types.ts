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

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][];
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}


export interface dischargeDetails {
    date: string;
    criteria: string;

}

export interface sickLeaveDetails {
    startDate:string;
    endDate:string;
}


export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: dischargeDetails;
    
}


export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    employerName: string;
    sickLeave?: sickLeaveDetails;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;

}






export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
/*export interface Entry {

}*/


export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;


//Without zod library type inference
//export type NewPatientEntry = Omit<Patient, 'id'>;

// infer the type from schema
export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>; 


