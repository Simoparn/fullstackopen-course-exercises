import { useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { Patient, Diagnosis, Entry, EntryFormValues } from '../types'
import AddEntryModal from './AddEntrymodal'
import patientService from '../services/patients'

interface Props {
  patient:Patient;
  allDiagnoses: Diagnosis[];
  setPatientData: React.Dispatch<React.SetStateAction<Patient>>;
  
  
}

/*interface DiagnosisProps {
    allDiagnoses: Diagnosis[];
}*/


  //Helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(

      `type checking error, assertNever: ${JSON.stringify(value)}`
    );
  };


const EntryDetails:React.FC<{entry:Entry}> = ({entry}) => {
    switch(entry.type){
        case "Hospital":
            return(
                <div style ={{marginLeft:"1em"}}>
                <b>Specialist</b><br/>
                <span style={{marginLeft:"1em"}}>
                    {entry.specialist}
                </span><br/>
                </div>
            )
        case "OccupationalHealthcare":
            return(
                <div style ={{marginLeft:"1em"}}>

                    <b>Employer name</b><br/>
                    <span style={{marginLeft:"1em"}}>
                    {entry.employerName}
                    </span><br/>
                <b>Sick leave</b><br/>
                {entry.sickLeave ? <>
                    <div style={{marginLeft:"1em"}}>
                        <b>Start date</b><br/>
                        <span style={{marginLeft:"1em"}}>
                            {entry.sickLeave.startDate}
                        </span><br/>
                    </div> 
                    <div style={{marginLeft:"1em"}}>
                        <b>End date</b><br/>
                        <span style={{marginLeft:"1em"}}>
                            {entry.sickLeave.endDate}
                        </span> <br/>
                    </div> 
                    </>
                    : <></>            
                }
                </div>
            )
        case "HealthCheck":
            return(
                <div style ={{marginLeft:"1em"}}>
                <b>Health check rating</b><br/>
                <span style={{marginLeft:"1em"}}>
                    {entry.healthCheckRating}
                </span><br/>
                </div>
            )
        default:
            assertNever(entry)
    }
}



const PatientPage = ({patient, allDiagnoses, setPatientData}:Props, /*{allDiagnoses}:DiagnosisProps*/) => {


    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    


    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        console.log('Attempting to submit a new entry:', values)
        console.log('Attempting to submit a new entry, patient data:', patient.id)
        try {
            const entry = await patientService.createEntry(patient.id, values);
            console.log('created entry after handling in backend:', entry)
            setPatientData({...patient, entries:patient.entries.concat(entry)});
            setModalOpen(false);    
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setError(message);
            } else {
                setError("Unrecognized axios error");
            }
            } else {
            console.error("Unknown error", e);
            setError("Unknown error");
            }
        }
    };
    


    console.log('PatientPage, current patient data:', patient )
    console.log('PatientPage, allDiagnoses:', allDiagnoses)
    
    if((patient.id.length === 0 )){
        return (
            <div>
                Patient data not found
            </div>
        )
    }
    else{
        return (
            <div>
                <br/><h2>Showing data for a single patient</h2><br/>
                <h2>{patient.name}</h2> 
                <b>ssn:</b> {patient.ssn}<br/>
                <b>Gender:</b> {patient.gender}<br/>
                <b>Date of birth:</b> {patient.dateOfBirth}<br/>
                <b>Occupation:</b> {patient.occupation}<br/>
                <Button variant="contained" onClick={() => openModal()}>
                    Add new entry for patient
                </Button>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <h3>Entries </h3>
                <h4>{patient.entries && patient.entries.length > 0 ? 
                    <>{patient.entries.length} in total</>
                    :<></>}                  
                </h4>
                
                
                    {patient.entries && patient.entries.length > 0 ? 
                        patient.entries.map((entry:Entry)=>(
                            <div key={entry.id} style={{marginLeft:"1em", marginBottom:"3em", paddingTop:"0.5em", paddingBottom:"0.5em", borderStyle:"solid", borderRadius:"0.25em"}}>
                                <div style={{marginLeft:"0.5em"}}>
                                    <b>Entry date</b><br/>
                                    <span style={{marginLeft:"1em"}}>{entry.date}</span><br/>
                                    <b>Description</b><br/>
                                    <span style={{marginLeft:"1em"}}>{entry.description}</span><br/>
                                    <b>Diagnoses</b><br/>
                                    <ul>
                                        {entry.diagnosisCodes ? entry.diagnosisCodes.map((diagnosisCode)=>(
                                            <li key={diagnosisCode}>{diagnosisCode} {allDiagnoses && allDiagnoses.length > 0 ? 
                                                allDiagnoses.map((diagnosis) =>(
                                                    
                                                    diagnosis.code === diagnosisCode ? 
                                                        diagnosis.name 
                                                        : <></>
                                                    )
                                                ): <></>}
                                            </li>
                                            )
                                        ) : <>No diagnoses for this entry</>}
                                    
                                    </ul>
                                    <b>Entry details</b><br/>
                                    <EntryDetails entry={entry}/>
                                </div>
                            </div>
                        )) 
                    : <div style={{marginLeft:"1em"}}>
                        <b>No entries for the patient</b></div>
                        }
                    
            
            </div>
        )
    }

}

export default PatientPage