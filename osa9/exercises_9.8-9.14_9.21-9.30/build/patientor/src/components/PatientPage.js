"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const AddEntrymodal_1 = __importDefault(require("./AddEntrymodal"));
const patients_1 = __importDefault(require("../services/patients"));
/*interface DiagnosisProps {
    allDiagnoses: Diagnosis[];
}*/
//Helper function for exhaustive type checking
const assertNever = (value) => {
    throw new Error(`type checking error, assertNever: ${JSON.stringify(value)}`);
};
const EntryDetails = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return (<div style={{ marginLeft: "1em" }}>
                <b>Discharge date</b><br />
                <span style={{ marginLeft: "1em" }}>
                    {entry.discharge.date}
                </span><br />
                <b>Discharge criteria</b><br />
                <span style={{ marginLeft: "1em" }}>
                    {entry.discharge.criteria}
                </span><br />
                
                </div>);
        case "OccupationalHealthcare":
            return (<div style={{ marginLeft: "1em" }}>

                    <b>Employer name</b><br />
                    <span style={{ marginLeft: "1em" }}>
                    {entry.employerName}
                    </span><br />
                <b>Sick leave</b><br />
                {entry.sickLeave ? <>
                    <div style={{ marginLeft: "1em" }}>
                        <b>Start date</b><br />
                        <span style={{ marginLeft: "1em" }}>
                            {entry.sickLeave.startDate}
                        </span><br />
                    </div> 
                    <div style={{ marginLeft: "1em" }}>
                        <b>End date</b><br />
                        <span style={{ marginLeft: "1em" }}>
                            {entry.sickLeave.endDate}
                        </span> <br />
                    </div> 
                    </>
                    : <></>}
                </div>);
        case "HealthCheck":
            return (<div style={{ marginLeft: "1em" }}>
                <b>Health check rating</b><br />
                <span style={{ marginLeft: "1em" }}>
                    {entry.healthCheckRating} ({Object.values(types_1.HealthCheckRating).find(hcr => types_1.HealthCheckRating[entry.healthCheckRating] === hcr)})
                </span><br />
                </div>);
        default:
            assertNever(entry);
    }
};
const PatientPage = ({ patient, allDiagnoses, setPatientData }) => {
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)();
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewEntry = (values) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        console.log('Attempting to submit a new entry:', values);
        console.log('Attempting to submit a new entry, patient data:', patient.id);
        try {
            const entry = yield patients_1.default.createEntry(patient.id, values);
            console.log('created entry after handling in backend:', entry);
            setPatientData(Object.assign(Object.assign({}, patient), { entries: patient.entries.concat([entry]) }));
            setModalOpen(false);
        }
        catch (e) {
            console.log('whole error:', e);
            if (axios_1.default.isAxiosError(e)) {
                if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) && typeof ((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data) === "string") {
                    //const message = e.response.data.replace('Something went wrong. Error: ', '');
                    const message = e.message;
                    console.error("shorter axios error:", message);
                    setError(message);
                }
                else {
                    if (((_d = (_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error[0].message) && typeof ((_f = (_e = e === null || e === void 0 ? void 0 : e.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.error[0].message) === "string") {
                        const message = e.response.data.error[0].message;
                        console.error("longer axios error with error as a separate field:", message);
                        setError(message);
                    }
                    else {
                        const message = "Unrecognized axios error: ";
                        console.error("unrecognized axios error:", message);
                        setError(message);
                    }
                }
            }
            else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    });
    //console.log('PatientPage, current patient data:', patient )
    //console.log('PatientPage, allDiagnoses:', allDiagnoses)
    if ((patient.id.length === 0)) {
        return (<div>
                Patient data not found
            </div>);
    }
    else {
        return (<div>
                <br /><h2>Showing data for a single patient</h2><br />
                <h2>{patient.name}</h2> 
                <b>ssn:</b> {patient.ssn}<br />
                <b>Gender:</b> {patient.gender}<br />
                <b>Date of birth:</b> {patient.dateOfBirth}<br />
                <b>Occupation:</b> {patient.occupation}<br />
                <material_1.Button variant="contained" onClick={() => openModal()}>
                    Add new entry for patient
                </material_1.Button>
                <AddEntrymodal_1.default modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} allDiagnoses={allDiagnoses}/>
                <h3>Entries </h3>
                <h4>{patient.entries && patient.entries.length > 0 ?
                <>{patient.entries.length} in total</>
                : <></>}                  
                </h4>
                
                
                    {patient.entries && patient.entries.length > 0 ?
                patient.entries.map((entry) => (<div key={entry.id} style={{ marginLeft: "1em", marginBottom: "3em", paddingTop: "0.5em", paddingBottom: "0.5em", borderStyle: "solid", borderRadius: "0.25em" }}>
                                <div style={{ marginLeft: "0.5em" }}>
                                    <b>Entry date</b><br />
                                    <span style={{ marginLeft: "1em" }}>{entry.date}</span><br />
                                    <b>Description</b><br />
                                    <span style={{ marginLeft: "1em" }}>{entry.description}</span><br />
                                    <b>Specialist</b><br />
                                        <span style={{ marginLeft: "1em" }}>{entry.specialist}</span><br />
                                    <b>Diagnoses</b><br />
                                    <ul>
                                        {entry.diagnosisCodes ? entry.diagnosisCodes.map((diagnosisCode) => (<li key={diagnosisCode}>{diagnosisCode} {allDiagnoses && allDiagnoses.length > 0 ?
                            allDiagnoses.map((diagnosis) => (diagnosis.code === diagnosisCode ?
                                diagnosis.name
                                : <></>)) : <></>}
                                            </li>)) : <>No diagnoses for this entry</>}
                                    
                                    </ul>
                                    <b>Entry details</b><br />
                                    <EntryDetails entry={entry}/>
                                </div>
                            </div>))
                : <div style={{ marginLeft: "1em" }}>
                        <b>No entries for the patient</b></div>}
                    
            
            </div>);
    }
};
exports.default = PatientPage;
