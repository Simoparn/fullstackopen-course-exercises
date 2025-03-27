import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, /*Navigate, useNavigate, To*/ } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Gender } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from './components/PatientPage';




/*interface NavigateOptions {
  to:To;

}*/


const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  //const [currentPatient, setCurrentPatient] = useState<string>(''); 
  const [patientData, setPatientData] = useState<Patient>({id:'', name:'', gender:Gender.Other, dateOfBirth:'', occupation:'', ssn:'',  });
  //const navigateFunction=useNavigate() 
  

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    //setCurrentPatient('')
    setPatientData({id:'', name:'', gender:Gender.Other, dateOfBirth:'', occupation:'', ssn:'',  })

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      console.log('useEffect, all fetched patients:', patients)
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  /*useEffect(()=>{


    const fetchPatient = async () => {
      try{
        const patient = await patientService.findById(currentPatient);
        console.log('fetched patient:', patient)
        
        setPatientData(patient)
      
      }catch(error){
        console.log('fetchPatient, error:', error)
        if(error instanceof Error){
          console.log('error message while fetching patient:', error.message)
        }
      }
    

    }
    void fetchPatient();
  }, [currentPatient])*/

  useEffect(()=>{
    if(patientData.id){
      if(patientData.id.length > 0){
        console.log('useEffect, id for patient is not empty, navigating to URL')
        
        window.location.href=window.location.href+`/api/patients/${patientData.id}`
        //const navigateprops:object={to:`${apiBaseUrl}/patients/${patientData.id}`}
        //navigateFunction(navigateprops)

      }
    }
  }, [patientData]);
  
  console.log('all patients state:', patients)
  //console.log('current patient state:', currentPatient)
  console.log('current patient data:', patientData)

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} /*setCurrentPatient={setCurrentPatient}*/ setPatientData={setPatientData} />} />
            <Route path="/patients/:id" element={<PatientPage patient={patientData} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
