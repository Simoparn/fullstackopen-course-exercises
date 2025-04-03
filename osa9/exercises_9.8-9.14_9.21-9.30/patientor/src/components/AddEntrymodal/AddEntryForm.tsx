import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { Entry, EntryFormValues, Gender, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface HealthCheckOption{
  value:HealthCheckRating;
  label:string;
}

const healthCheckOptions: HealthCheckOption[] = Object.values(HealthCheckRating).map(v => ({
  value: v as HealthCheckRating, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {

  const [entryTypeSelected, setEntryTypeSelected] = useState(false)
  const [entryType, setEntryType] = useState<Entry["type"]>("Hospital");
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCode, setDiagnosisCode] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [discharge, setDischarge] = useState({date:'', criteria:''})
  const [employerName, setEmployerName] = useState('')
  const [sickLeave, setSickLeave] = useState({startDate:'', endDate:''})
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0)



  const EntryTypeFields = (entryType:{entryType: Entry["type"]}) => {

    switch(entryType.entryType){

      case "Hospital":
        return(
          <>
            <br/>Entry details, Hospital
            <TextField
            label="Date"
            fullWidth 
            value={discharge.date}
            onChange={({ target }) => setDischarge({...discharge, date:target.value})}
            />
            <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>

            <TextField
            label="Criteria"
            fullWidth 
            value={discharge.criteria}
            onChange={({ target }) => setDischarge({...discharge, criteria:target.value})}
            />
            <InputLabel style={{ marginTop: 20 }}>Criteria</InputLabel>


          </>
        )
      case "OccupationalHealthcare":

      return(
        <>
          <br/><b>Entry details, Occupational health care</b>
          <TextField
          label="EmployerName"
          fullWidth 
          value={name}
          onChange={({ target }) => setEmployerName(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Employer name</InputLabel>

          <TextField
          label="StartDate"
          fullWidth 
          value={sickLeave.startDate}
          placeholder="YYYY-MM-DD"
          onChange={({ target }) => setSickLeave({...sickLeave, startDate:target.value})}
          />
          <InputLabel style={{ marginTop: 20 }}>Start date</InputLabel>

          <TextField
            label="EndDate"
            fullWidth 
            value={sickLeave.endDate}
            placeholder="YYYY-MM-DD"
            onChange={({ target }) => setSickLeave({...sickLeave, endDate:target.value})}
            />
            <InputLabel style={{ marginTop: 20 }}>End date</InputLabel>
        </>

      )
      case "HealthCheck":
        return (
          <>
          <br/>Entry details, Health check
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
                {option.label
              }</MenuItem>
            )}
            </Select>
          </>
          
        )

    }
  }





  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setEntryTypeSelected(true);
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const healthCheckRating = Object.keys(HealthCheckRating).find(h => h.toString() === value);
      if (healthCheckRating === 0 || healthCheckRating === 1 || healthCheckRating === 2 || healthCheckRating === 3) {
        setHealthCheckRating(healthCheckRating);
      }
    }
  };

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
          case 0:
            onSubmit({
              type:entryType,
              description,
              date,
              specialist,
              diagnosisCodes,
              healthCheckRating,
            });
            break;
            case 1:
              onSubmit({
                type:entryType,
                description,
                date,
                specialist,
                diagnosisCodes,
                healthCheckRating,       
              });
            break;
              case 2:
                onSubmit({
                  type:entryType,
                  description,
                  date,
                  specialist,
                  diagnosisCodes,
                  healthCheckRating,     
                });
              break;
                case 3:
                  onSubmit({
                    type:entryType,
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    healthCheckRating,     
                  });
        }
        break;
      default:
        assertNever(entryType)
    };

  }

  console.log("Entry input state: Entry type: ", entryType, "Description: ", description, "Date:", date, "Specialist:", specialist, "diagnosisCodes:", diagnosisCodes, "discharge: ", discharge, "employerName:", employerName, "sickLeave:", sickLeave, "healthCheckRating:", healthCheckRating)
  console.log("Health check input options state:", healthCheckOptions)
  return (
    <div>
      Select entry type
      <Select
        label="Select"
        fullWidth
        value={entryType}
        onChange={({target})=> setEntryType(target.value)}
      >
        {healthCheckOptions.map(option =>
        <MenuItem
          key={option.label}
          value={option.value}
        >
          {option.label}
        </MenuItem>)}
      </Select>

      {entryTypeSelected ?

      <form onSubmit={addEntry}>
      <TextField
          label="Date"
          fullWidth 
          value={date}
          placeholder="YYYY-MM-DD"
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        
        {diagnosisCodes.map(diagnosisCode =>(
          <>{diagnosisCode}</>
        ))}
         <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <TextField
          label="Write a new diagnosis code here and press"
          fullWidth 
          value={diagnosisCode}
          
        />
        <Button  color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={() => setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode))}></Button>
        <InputLabel style={{ marginTop: 20 }}>Add a new diagnosis code</InputLabel>
      <EntryTypeFields entryType={entryType}/>

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
      <></>}
    </div>
  );
};

export default AddEntryForm;