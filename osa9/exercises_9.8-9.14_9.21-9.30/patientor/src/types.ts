export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
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


interface dischargeDetails {
  date: string;
  criteria: string;

}

interface sickLeaveDetails {
  startDate:string;
  endDate:string;
}


interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: dischargeDetails;
  
}


interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string;
  sickLeave?: sickLeaveDetails;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;

}






export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;


export type PatientFormValues = Omit<Patient, "id" | "entries">;