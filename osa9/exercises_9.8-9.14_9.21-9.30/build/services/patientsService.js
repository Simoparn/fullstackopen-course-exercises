"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatientData = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (newPatient) => {
    const newId = (0, uuid_1.v1)();
    return Object.assign({ id: newId }, newPatient);
    //return null;
};
const addEntry = (newEntry) => {
    const newId = (0, uuid_1.v1)();
    return Object.assign({ id: newId }, newEntry);
};
const findById = (id) => {
    const patient = patients_1.default.find(p => p.id === id);
    return patient;
};
exports.default = {
    getPatients,
    getNonSensitivePatientData,
    addPatient,
    addEntry,
    findById
};
