"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = exports.NewEntrySchema = exports.OccupationalHealthCareEntryWithoutIdSchema = exports.HealthCheckEntryWithoutIdSchema = exports.HospitalEntryWithoutIdSchema = exports.NewPatientEntrySchema = exports.OccupationalHealthCareEntrySchema = exports.HealthCheckEntrySchema = exports.HospitalEntrySchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
//import { v1 as uuid } from 'uuid'
//export const EntrySchema = z.object({id:z.string(),description:z.string(),date:z.string(),specialist:z.string(), diagnosisCodes:z.array(z.string()).optional(), type:z.string().optional(), healthCheckRating:z.nativeEnum(HealthCheckRating).optional()})
exports.HospitalEntrySchema = zod_1.z.object({ id: zod_1.z.string(), description: zod_1.z.string().max(200), date: zod_1.z.string().date(), specialist: zod_1.z.string().max(100), diagnosisCodes: zod_1.z.array(zod_1.z.string()).max(10).optional(), type: zod_1.z.string().transform(value => value), discharge: zod_1.z.object({ date: zod_1.z.string().date(), criteria: zod_1.z.string().max(80) }) });
exports.HealthCheckEntrySchema = zod_1.z.object({ id: zod_1.z.string(), description: zod_1.z.string().max(200), date: zod_1.z.string().date(), specialist: zod_1.z.string().max(100), diagnosisCodes: zod_1.z.array(zod_1.z.string()).max(10).optional(), type: zod_1.z.string().transform(value => value), healthCheckRating: zod_1.z.nativeEnum(types_1.HealthCheckRating) });
exports.OccupationalHealthCareEntrySchema = zod_1.z.object({ id: zod_1.z.string(), description: zod_1.z.string().max(200), date: zod_1.z.string().date(), specialist: zod_1.z.string().max(100), diagnosisCodes: zod_1.z.array(zod_1.z.string()).max(10).optional(), type: zod_1.z.string().transform(value => value), employerName: zod_1.z.string().max(100), sickLeave: zod_1.z.object({ startDate: zod_1.z.string().date(), endDate: zod_1.z.string().date() }) });
exports.NewPatientEntrySchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
    //entries: z.array(EntrySchema)
    entries: zod_1.z.array(zod_1.z.union([exports.HospitalEntrySchema, exports.HealthCheckEntrySchema, exports.OccupationalHealthCareEntrySchema]))
});
exports.HospitalEntryWithoutIdSchema = zod_1.z.object({ description: zod_1.z.string().max(200), date: zod_1.z.string().date(), specialist: zod_1.z.string().max(100), diagnosisCodes: zod_1.z.array(zod_1.z.string()).max(10).optional(), type: zod_1.z.string().transform(value => value), discharge: zod_1.z.object({ date: zod_1.z.string().date(), criteria: zod_1.z.string().max(80) }) });
exports.HealthCheckEntryWithoutIdSchema = zod_1.z.object({ description: zod_1.z.string().max(200), date: zod_1.z.string().date(), specialist: zod_1.z.string().max(100), diagnosisCodes: zod_1.z.array(zod_1.z.string()).max(10).optional(), type: zod_1.z.string().transform(value => value), healthCheckRating: zod_1.z.nativeEnum(types_1.HealthCheckRating) });
exports.OccupationalHealthCareEntryWithoutIdSchema = zod_1.z.object({ description: zod_1.z.string().max(200), date: zod_1.z.string().date(), specialist: zod_1.z.string().max(100), diagnosisCodes: zod_1.z.array(zod_1.z.string()).max(10).optional(), type: zod_1.z.string().transform(value => value), employerName: zod_1.z.string().max(100), sickLeave: zod_1.z.object({ startDate: zod_1.z.string().date(), endDate: zod_1.z.string().date() }) });
exports.NewEntrySchema = zod_1.z.union([exports.HospitalEntryWithoutIdSchema, exports.HealthCheckEntryWithoutIdSchema, exports.OccupationalHealthCareEntryWithoutIdSchema]);
//Probably unnecessary when using infer and library objects 
const toNewPatientEntry = (object) => {
    return exports.NewPatientEntrySchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
//Type validation without zod library objects
/*
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
 
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),

    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};*/
//Type validation without zod library
/*
export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
};*/
//Type validation without zod library
/*
export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};*/
//Type validation without zod library
/*
export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
};*/
//Type validation without zod library
/*
export const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);

};

export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender');
    }
  
    return gender;
};*/
//Type validation without zod library
/*
export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
};*/
