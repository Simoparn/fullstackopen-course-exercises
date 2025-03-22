"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const utils_1 = require("../utils");
const patientsService_1 = __importDefault(require("../services/patientsService"));
//import { v1 as uuid } from 'uuid'
const router = express_1.default.Router();
//Middleware for validating requests before handling in endpoint
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
//Middleware for handling errors
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitivePatientData());
});
router.post('/', newPatientParser, (req, res) => {
    //With middleware for zod library validation and errors
    const addedPatient = patientsService_1.default.addPatient(req.body);
    console.log('new patient after adding:', addedPatient);
    res.json(addedPatient);
    //Without middleware for zod library validation and errors
    /*try{
    const newPatientEntry = toNewPatientEntry(req.body)
    console.log('data for new patient from HTTP request:', newPatientEntry)
    const addedPatient = patientsService.addPatient(newPatientEntry)
    console.log('new patient after adding:', addedPatient)
    res.json(addedPatient)
    }catch (error: unknown) {
      let errorMessage = 'Something went wrong while adding a new patient.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
    //res.send('Saving a patient!');
  */
});
router.use(errorMiddleware);
exports.default = router;
