import { useState, SyntheticEvent } from "react";

import {  Input, TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { Entry, Diagnosis, EntryFormValues, Gender, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  allDiagnoses: Diagnosis[]
}

interface EntryTypeFieldsProps {
  entryType: Entry["type"];
  onHealthCheckRatingChange: (event: SelectChangeEvent<string>) => void;
  discharge: DischargeFields;
  employerName: string;
  sickLeave: sickLeaveFields;
  healthCheckRating: string;
  setDischarge:React.Dispatch<React.SetStateAction<DischargeFields>>;
  setEmployerName:React.Dispatch<React.SetStateAction<string>>;
  setSickLeave:React.Dispatch<React.SetStateAction<sickLeaveFields>>;
}

interface DischargeFields {
  date:string;
  criteria:string;
}

interface sickLeaveFields{
  startDate:string;
  endDate:string;
}

interface EntryTypeOption{
  value:Entry["type"];
  label:string;
}

interface HealthCheckOption{
  value:HealthCheckRating;
  label:string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values({type1:"Hospital", type2:"OccupationalHealthcare", type3:"HealthCheck"})
.filter((v)=> typeof v === 'string').map(v => ({
  value: v as unknown as Entry["type"], label: v.toString()
}));

const healthCheckOptions: HealthCheckOption[] = Object.values(HealthCheckRating)
.filter((v)=> typeof v === 'string').map(v => ({
  value: v as unknown as HealthCheckRating, label: v.toString()
}));






const EntryTypeFields = ({entryType, onHealthCheckRatingChange, discharge, employerName, sickLeave, healthCheckRating, setDischarge, setEmployerName, setSickLeave}:EntryTypeFieldsProps) => {


  
   
    console.log("EntryTypeFields, entry type:", entryType)

    switch(entryType){

      case "Hospital":
        return(
          <>
            <InputLabel style={{ marginTop: 50 }}>Entry details, Hospital</InputLabel>
            <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
            <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
            <Input type="date"
            value={discharge.date} 
            onChange={({ target}) => setDischarge({...discharge, date:target.value})}/>
            {/*<TextField
            label="Date"
            fullWidth 
            value={discharge.date}
            placeholder="YYYY-MM-DD"
            onChange={({ target }) => setDischarge({...discharge, date:target.value})}
            />*/}


            <InputLabel style={{ marginTop: 20 }}>Discharge criteria ({discharge.criteria.length}/80 characters)</InputLabel>
            <TextField
            label="Criteria"
            fullWidth 
            value={discharge.criteria}
            onChange={({ target }) => setDischarge({...discharge, criteria:target.value})}
            />



          </>
        )
      case "OccupationalHealthcare":

      return(
        <>
          <InputLabel style={{ marginTop: 50 }}>Entry details, Occupational health care</InputLabel>
          <InputLabel style={{ marginTop: 20 }}>Employer name ({employerName.length}/100 characters)</InputLabel>
          <TextField
          label="Employer Name here"
          fullWidth 
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Sick leave</InputLabel>
          <InputLabel style={{ marginTop: 20 }}>Sick leave, start date</InputLabel>
          <Input type="date"
          value={sickLeave.startDate} 
          onChange={({ target}) => setSickLeave({...sickLeave, startDate:target.value})}/>


          {/*<TextField
          label="Start Date"
          fullWidth 
          value={sickLeave.startDate}
          placeholder="YYYY-MM-DD"
          onChange={({ target }) => setSickLeave({...sickLeave, startDate:target.value})}
          />*/}

          <InputLabel style={{ marginTop: 20 }}>Sick leave, end date</InputLabel>
          <Input type="date"
          value={sickLeave.endDate} 
          onChange={({ target}) => setSickLeave({...sickLeave, endDate:target.value})}/>
          {/*<TextField
            label="End Date"
            fullWidth 
            value={sickLeave.endDate}
            placeholder="YYYY-MM-DD"
            onChange={({ target }) => setSickLeave({...sickLeave, endDate:target.value})}
            />*/}

        </>

      )
      case "HealthCheck":
        return (
          <>
          <InputLabel style={{ marginTop: 50 }}>Entry details, Health check</InputLabel>
          <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
          <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating.toString()}
              onChange={onHealthCheckRatingChange}
            >
            {healthCheckOptions.map(option => 
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            )}
            </Select>
          </>
          
        )

    }
  }




const AddEntryForm = ({ onCancel, onSubmit, allDiagnoses }: Props) => {

    //const [entryTypeSelected, setEntryTypeSelected] = useState(false)
    const [entryType, setEntryType] = useState<Entry["type"]>("Hospital");
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('')
    const [specialist, setSpecialist] = useState('')
    //const [diagnosisCode, setDiagnosisCode] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
    const [discharge, setDischarge] = useState({date:'', criteria:''})
    const [employerName, setEmployerName] = useState('')
    const [sickLeave, setSickLeave] = useState({startDate:'', endDate:''})
    const [healthCheckRating, setHealthCheckRating] = useState<string>("Healthy")
  
  
    
  
    const handleDiagnosisSelection = (event: SelectChangeEvent<string[]>) => {
      event.preventDefault();
      console.log("Handling diagnosis selection. updated list of diagnoses:", event.target.value)
      if(Array.isArray(event.target.value) && event.target.value.every(diagnosis => typeof diagnosis === "string")){
        setDiagnosisCodes(event.target.value)
      }
        
      
    }


  const handleEntryTypeSelection = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    console.log("Handling entry type selection. Inputs can be rendered now, chosen type:", event.target.value)
    //setEntryTypeSelected(true);
    switch(event.target.value){
      case "Hospital":
        setEntryType(event.target.value);
        break;
      case "OccupationalHealthcare":
        setEntryType(event.target.value);
        break;
        case "HealthCheck":
          setEntryType(event.target.value);
          break;
        default:
          assertNever(event.target.value as never)
    };
  }


  //Helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(

      `type checking error, assertNever: ${JSON.stringify(value)}`
    );
  };



  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    
    switch(entryType){
      case "Hospital":
        onSubmit({
          type:entryType,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type:entryType,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave
          
        });
        break;
      case "HealthCheck":
        switch(healthCheckRating){
          case "Healthy":
            onSubmit({
              type:entryType,
              description,
              date,
              specialist,
              diagnosisCodes,
              healthCheckRating:HealthCheckRating[healthCheckRating],
            });
            break;
            case "LowRisk":
              onSubmit({
                type:entryType,
                description,
                date,
                specialist,
                diagnosisCodes,
                healthCheckRating:HealthCheckRating[healthCheckRating],       
              });
            break;
              case "HighRisk":
                onSubmit({
                  type:entryType,
                  description,
                  date,
                  specialist,
                  diagnosisCodes,
                  healthCheckRating:HealthCheckRating[healthCheckRating],     
                });
              break;
                case "CriticalRisk":
                  onSubmit({
                    type:entryType,
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    healthCheckRating:HealthCheckRating[healthCheckRating],     
                  });
        }
        break;
      default:
        assertNever(entryType)
    };

    setDescription('')
    setDate('')
    setSpecialist('')
    //setDiagnosisCode('')
    setDiagnosisCodes([])
    setDischarge({date:'', criteria:''})
    setEmployerName('')
    setSickLeave({startDate:'', endDate:''})
    setHealthCheckRating("Healthy")

  }


  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      console.log('onHealthCheckRatingChange, target value:', value);
      const selectedHealthCheckRating = Object.values(HealthCheckRating).find(h => h.toString() === value);
      console.log('healthCheckRating:', selectedHealthCheckRating);
      
      switch(selectedHealthCheckRating) {
        case "Healthy":
          console.log('setting healthCheckRating:', selectedHealthCheckRating);
          setHealthCheckRating(selectedHealthCheckRating);
          break;
        case "LowRisk":
          console.log('setting healthCheckRating:', selectedHealthCheckRating);
          setHealthCheckRating(selectedHealthCheckRating);
          break;
        case "HighRisk":
          console.log('setting healthCheckRating:', selectedHealthCheckRating);
          setHealthCheckRating(selectedHealthCheckRating);
          break;
        case "CriticalRisk":
          console.log('setting healthCheckRating:', selectedHealthCheckRating);
          setHealthCheckRating(selectedHealthCheckRating);
          break;
        default:
          assertNever(selectedHealthCheckRating as never);
      }
    }
  };

  /*if(diagnosisCode.length > 20){
    console.log("diagnosis code input too long, preventing longer input")
    setDiagnosisCode(diagnosisCode.substring(0, 20))
  }*/
  
  console.log("Entry input state: Entry type: ", entryType, "Description: ", description, "Date:", date, "Specialist:", specialist, "diagnosisCodes:", diagnosisCodes, "discharge: ", discharge, "employerName:", employerName, "sickLeave:", sickLeave, "healthCheckRating:", healthCheckRating)
  console.log('Entry type input options state:', entryTypeOptions)
  console.log("Health check input options state:", healthCheckOptions)
  
  return (
    <div>
      Select entry type
      <Select
        label="Select"
        fullWidth
        value={entryType}
        onChange={handleEntryTypeSelection}
      >
        {entryTypeOptions.map(option =>
        <MenuItem
          key={option.label}
          value={option.value}
        >
          {option.label}
        </MenuItem>)}
      </Select>

   

      <form onSubmit={addEntry}>
      <InputLabel style={{ marginTop: 20 }}>Entry date</InputLabel>
      <Input type="date"
       value={date} 
       onChange={({ target}) => setDate(target.value)}/>
      {/*<TextField
          label="Date here"
          fullWidth 
          value={date}
          placeholder="YYYY-MM-DD"
          onChange={({ target }) => setDate(target.value)}
        />*/}
        <InputLabel style={{ marginTop: 20 }}>Description ({description.length}/200 characters)</InputLabel>
        <TextField
          label="Description here"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Specialist ({specialist.length}/100 characters)</InputLabel>
        <TextField
          label="Specialist here"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes ({diagnosisCodes.length}/10 codes)</InputLabel>
        {diagnosisCodes.map(diagnosisCode =>(
          <>{diagnosisCode} </>
        ))}
        <br/>
        
        <Select
        label="Select"
        fullWidth
        value={diagnosisCodes}
        multiple
        onChange={handleDiagnosisSelection/*{setDiagnosisCode(target.value)}*/}

        >
          {allDiagnoses.map(diagnosisCode =>(
            
         
            <MenuItem
            key={diagnosisCode.code}
            value={diagnosisCode.code}>
            
            {diagnosisCode.code}
            </MenuItem>
            
          ))}
        </Select>

        {/*<TextField
          label="Write a new diagnosis code here and press (maximum length 20 characters)"
          fullWidth
          value={diagnosisCode}
          onChange={({ target}) => setDiagnosisCode(target.value)}
          
        />

        <Button color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={() => setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode))}>Add a new diagnosis code</Button>*/}
        
      <EntryTypeFields entryType={entryType} onHealthCheckRatingChange={onHealthCheckRatingChange} discharge={discharge} employerName={employerName} sickLeave={sickLeave} healthCheckRating={healthCheckRating}  setDischarge={setDischarge} setEmployerName={setEmployerName} setSickLeave={setSickLeave}/>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      : 
      <></>
    </div>
  );
};

export default AddEntryForm;