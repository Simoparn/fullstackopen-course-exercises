"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewDiaryEntry = exports.NewEntrySchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
exports.NewEntrySchema = zod_1.z.object({
    weather: zod_1.z.nativeEnum(types_1.Weather),
    visibility: zod_1.z.nativeEnum(types_1.Visibility),
    date: zod_1.z.string().date(),
    comment: zod_1.z.string().max(200).optional().default('')
});
const toNewDiaryEntry = (object) => {
    return exports.NewEntrySchema.parse(object);
};
exports.toNewDiaryEntry = toNewDiaryEntry;
//Type validation without zod library objects
/*export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
    const newEntry: NewDiaryEntry = {
      //type validation without zod library
      //weather: parseWeather(object.weather),
      //visibility: parseVisibility(object.visibility),
      //date: parseDate(object.date),
      //comment: parseComment(object.comment)
      //Type validation with zod library
      weather: z.nativeEnum(Weather).parse(object.weather),
      visibility: z.nativeEnum(Visibility).parse(object.visibility),
      date: z.string().date().parse(object.date),
      comment: z.string().optional().parse(object.comment),

      
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};*/
//Type validation without zod library
/*const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};*/
//Type validation without zod library
/*const parseComment = (comment: unknown): string => {
    
    /*if (!comment || !isString(comment)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return comment;

};*/
//Type validation without zod library
/*
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};*/
//Type validation without zod library
/*
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};*/
//Type validation without zod library
/*
const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};*/
//Type validation without zod library
/*
const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
      throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};*/
exports.default = {
/*toNewDiaryEntry,
isString,
parseComment,
parseDate,
parseWeather,
parseVisibility*/
};
