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
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const constants_1 = require("./constants");
const types_1 = require("./types");
const patients_1 = __importDefault(require("./services/patients"));
const diagnoses_1 = __importDefault(require("./services/diagnoses"));
const PatientListPage_1 = __importDefault(require("./components/PatientListPage"));
const PatientPage_1 = __importDefault(require("./components/PatientPage"));
const App = () => {
    const [patients, setPatients] = (0, react_1.useState)([]);
    const [allDiagnoses, setAllDiagnoses] = (0, react_1.useState)([]);
    //const [currentPatient, setCurrentPatient] = useState<string>(''); 
    const [patientData, setPatientData] = (0, react_1.useState)({ id: '', name: '', gender: types_1.Gender.Other, dateOfBirth: '', occupation: '', ssn: '', entries: [] });
    //const [diagnoseData, setDiagnoseData] = useState<Diagnosis>({code:'', name:'', latin:''});
    const location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(() => {
        void axios_1.default.get(`${constants_1.apiBaseUrl}/ping`);
        //setCurrentPatient('')
        setPatientData({ id: '', name: '', gender: types_1.Gender.Other, dateOfBirth: '', occupation: '', ssn: '', entries: [] });
        const fetchPatientList = () => __awaiter(void 0, void 0, void 0, function* () {
            const patients = yield patients_1.default.getAll();
            console.log('useEffect, all fetched patients:', patients);
            setPatients(patients);
        });
        const fetchAllDiagnoses = () => __awaiter(void 0, void 0, void 0, function* () {
            const diagnoses = yield diagnoses_1.default.getAll();
            console.log('useEffect, all fetched diagnoses:', diagnoses);
            setAllDiagnoses(diagnoses);
        });
        void fetchPatientList();
        void fetchAllDiagnoses();
    }, []);
    (0, react_1.useEffect)(() => {
        console.log('Current location is:', location.pathname);
        const fetchSinglePatientData = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const id = location.pathname.substring(10);
            try {
                const patient = yield patients_1.default.findById(id);
                console.log('fetched patient:', patient);
                if (!(typeof patient === "undefined")) {
                    setPatientData(patient);
                }
            }
            catch (e) {
                if (axios_1.default.isAxiosError(e)) {
                    if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) && typeof ((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data) === "string") {
                        const message = e.response.data.replace('Something went wrong. Error: ', '');
                        console.error(message);
                        //setError(message);
                    }
                    else {
                        console.log('unrecognized axios error:', e);
                        setPatientData({ id: '', name: '', gender: types_1.Gender.Other, dateOfBirth: '', occupation: '', ssn: '', entries: [] });
                        //setError("Unrecognized axios error");
                    }
                }
                else {
                    console.error("Unknown error", e);
                    setPatientData({ id: '', name: '', gender: types_1.Gender.Other, dateOfBirth: '', occupation: '', ssn: '', entries: [] });
                    //setError("Unknown error");
                }
            }
        });
        /*const setDiagnosesForThePatient() = () => {
          const diagnoses = allDiagnoses.filter((diagnose) => diagnose.code === patientData)
          setDiagnoseData();
        }*/
        if (location.pathname.includes('/patients')) {
            console.log('Link is in correct format, attempting to fetch single patient and diagnoses for the patient data');
            fetchSinglePatientData();
        }
    }, [location]);
    console.log('all patients state:', patients);
    //console.log('current patient state:', currentPatient)
    console.log('current patient data:', patientData);
    return (<div className="App">
      
        <material_1.Container>
          <material_1.Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </material_1.Typography>
          <material_1.Button component={react_router_dom_1.Link} to="/" variant="contained" color="primary">
            Home
          </material_1.Button>
          <material_1.Divider hidden/>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<PatientListPage_1.default patients={patients} /*allDiagnoses={allDiagnoses}*/ setPatients={setPatients} /*setCurrentPatient={setCurrentPatient}*/ setPatientData={setPatientData}/>}/>
            <react_router_dom_1.Route path="/patients/:id" element={<PatientPage_1.default patient={patientData} allDiagnoses={allDiagnoses} setPatientData={setPatientData}/>}/>
          </react_router_dom_1.Routes>
        </material_1.Container>
      
    </div>);
};
exports.default = App;
