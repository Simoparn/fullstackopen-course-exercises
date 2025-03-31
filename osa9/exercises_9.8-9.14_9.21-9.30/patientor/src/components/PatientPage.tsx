import { Patient, Entry } from '../types'

interface Props {
  patient:Patient;
  entries: Entry[];
}



const PatientPage = ({patient}:Props) => {

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
                <br/><b>Showing data for a single patient:</b><br/>
                <h2>{patient.name}</h2> 
                <b>ssn:</b> {patient.ssn}<br/>
                <b>Gender:</b> {patient.gender}<br/>
                <b>Date of birth:</b> {patient.dateOfBirth}<br/>
                <b>Occupation:</b> {patient.occupation}<br/>
                <h3>Entries</h3>
                
                
                    {patient.entries && patient.entries.length > 0 ? 
                        patient.entries.map((entry:Entry)=>(
                            <div style={{marginLeft:"1em"}}>
                                <b>entry date</b><br/>
                                {entry.date}<br/>
                                <b>description</b><br/>
                                {entry.description}<br/>
                                <br/><b>diagnosis codes</b><br/>
                                <ul>
                                    {entry.diagnosisCodes ? entry.diagnosisCodes.map((diagnosisCode)=>(
                                        <li>{diagnosisCode}</li>
                                        )
                                    ) : <></>}
                                
                                </ul>
                            </div>
                        )) 
                    : <div style={{marginLeft:"1em"}}>
                        <b>No entries</b></div>
                        }
                    
            
            </div>
        )
    }

}

export default PatientPage