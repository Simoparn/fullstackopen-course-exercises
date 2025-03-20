"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOccupation = exports.parseGender = exports.isGender = exports.parseSsn = exports.parseDate = exports.isDate = exports.parseName = exports.isString = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
//import { v1 as uuid } from 'uuid'
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry = {
            name: (0, exports.parseName)(object.name),
            dateOfBirth: (0, exports.parseDate)(object.dateOfBirth),
            ssn: (0, exports.parseSsn)(object.ssn),
            gender: (0, exports.parseGender)(object.gender),
            occupation: (0, exports.parseOccupation)(object.occupation),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatientEntry = toNewPatientEntry;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const parseName = (name) => {
    if (!name || !(0, exports.isString)(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
exports.parseName = parseName;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
const parseDate = (date) => {
    if (!date || !(0, exports.isString)(date) || !(0, exports.isDate)(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
exports.parseDate = parseDate;
const parseSsn = (ssn) => {
    if (!ssn || !(0, exports.isString)(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
exports.parseSsn = parseSsn;
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
exports.isGender = isGender;
const parseGender = (gender) => {
    if (!gender || !(0, exports.isString)(gender) || !(0, exports.isGender)(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
exports.parseGender = parseGender;
const parseOccupation = (occupation) => {
    if (!occupation || !(0, exports.isString)(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
exports.parseOccupation = parseOccupation;
