import { Patient } from '../types'

interface Props {
  patient:Patient;
}



const PatientPage = ({patient}:Props) => {

    if(!(patient.id.length === 0 )){
        return (
            <div>
                Patient data not found
            </div>
        )
    }
    else{
        return (
            <div>
                Showing data for a single patient
                {patient.name}
                {patient.gender}
                {patient.dateOfBirth}
                {patient.occupation}
            </div>
        )
    }

}

export default PatientPage