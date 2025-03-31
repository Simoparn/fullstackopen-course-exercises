import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Gender } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from './components/PatientPage';





const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  //const [currentPatient, setCurrentPatient] = useState<string>(''); 
  const [patientData, setPatientData] = useState<Patient>({id:'', name:'', gender:Gender.Other, dateOfBirth:'', occupation:'', ssn:'',  });
  //const navigateFunction=useNavigate()
  const location=useLocation()

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

  useEffect(()=> {
    console.log('Current location is:', location.pathname)



    const fetchSinglePatientData = async () => { 
      const id=location.pathname.substring(10)
      try{
        const patient = await patientService.findById(id);
        console.log('fetched patient:', patient)
        if(!(typeof patient === "undefined")){
          setPatientData(patient)
        }
      
      }catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            //setError(message);
          } else {
            console.log('unrecognized axios error:', e)
            setPatientData({id:'', name:'', gender:Gender.Other, dateOfBirth:'', occupation:'', ssn:'',  })
            //setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setPatientData({id:'', name:'', gender:Gender.Other, dateOfBirth:'', occupation:'', ssn:'',  })
          //setError("Unknown error");
        }
      }
    }
    if(location.pathname.includes('/patients')){
      console.log('Link is in correct format, attempting to fetch single patient data')
      fetchSinglePatientData();
    }
    
  }, [location])
  

  
  console.log('all patients state:', patients)
  //console.log('current patient state:', currentPatient)
  console.log('current patient data:', patientData)

  return (
    <div className="App">
      
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
      
    </div>
  );
};

export default App;
