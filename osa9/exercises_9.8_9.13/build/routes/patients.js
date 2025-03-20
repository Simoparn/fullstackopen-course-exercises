"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitivePatientData());
});
router.post('/', (req, res) => {
    try {
        //const newId=uuid()
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req.body);
        patientsService_1.default.addPatient(newPatientEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong while adding a new patient.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    //res.send('Saving a diagnose!');
});
exports.default = router;
