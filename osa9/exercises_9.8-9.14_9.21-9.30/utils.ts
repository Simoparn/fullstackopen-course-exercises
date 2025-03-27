import { NewPatientEntry, Gender } from './types';
import { z } from 'zod'
//import { v1 as uuid } from 'uuid'



export const EntrySchema = z.object({})

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema)

});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};


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





