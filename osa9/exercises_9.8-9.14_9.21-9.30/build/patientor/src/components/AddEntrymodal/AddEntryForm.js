"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const types_1 = require("../../types");
const entryTypeOptions = Object.values({ type1: "Hospital", type2: "OccupationalHealthcare", type3: "HealthCheck" })
    .filter((v) => typeof v === 'string').map(v => ({
    value: v, label: v.toString()
}));
const healthCheckOptions = Object.values(types_1.HealthCheckRating)
    .filter((v) => typeof v === 'string').map(v => ({
    value: v, label: v.toString()
}));
const EntryTypeFields = ({ entryType, onHealthCheckRatingChange, discharge, employerName, sickLeave, healthCheckRating, setDischarge, setEmployerName, setSickLeave }) => {
    console.log("EntryTypeFields, entry type:", entryType);
    switch (entryType) {
        case "Hospital":
            return (<>
            <material_1.InputLabel style={{ marginTop: 50 }}>Entry details, Hospital</material_1.InputLabel>
            <material_1.InputLabel style={{ marginTop: 20 }}>Discharge</material_1.InputLabel>
            <material_1.InputLabel style={{ marginTop: 20 }}>Discharge date</material_1.InputLabel>
            <material_1.Input type="date" value={discharge.date} onChange={({ target }) => setDischarge(Object.assign(Object.assign({}, discharge), { date: target.value }))}/>
            {/*<TextField
                label="Date"
                fullWidth
                value={discharge.date}
                placeholder="YYYY-MM-DD"
                placeholder="YYYY-MM-DD"
                onChange={({ target }) => setDischarge({...discharge, date:target.value})}
                />*/}


            <material_1.InputLabel style={{ marginTop: 20 }}>Discharge criteria ({discharge.criteria.length}/80 characters)</material_1.InputLabel>
            <material_1.TextField label="Criteria" fullWidth value={discharge.criteria} onChange={({ target }) => setDischarge(Object.assign(Object.assign({}, discharge), { criteria: target.value }))}/>



          </>);
        case "OccupationalHealthcare":
            return (<>
          <material_1.InputLabel style={{ marginTop: 50 }}>Entry details, Occupational health care</material_1.InputLabel>
          <material_1.InputLabel style={{ marginTop: 20 }}>Employer name ({employerName.length}/100 characters)</material_1.InputLabel>
          <material_1.TextField label="Employer Name here" fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)}/>
          <material_1.InputLabel style={{ marginTop: 20 }}>Sick leave</material_1.InputLabel>
          <material_1.InputLabel style={{ marginTop: 20 }}>Sick leave, start date</material_1.InputLabel>
          <material_1.Input type="date" value={sickLeave.startDate} onChange={({ target }) => setSickLeave(Object.assign(Object.assign({}, sickLeave), { startDate: target.value }))}/>


          {/*<TextField
                label="Start Date"
                fullWidth
                value={sickLeave.startDate}
                placeholder="YYYY-MM-DD"
                onChange={({ target }) => setSickLeave({...sickLeave, startDate:target.value})}
                />*/}

          <material_1.InputLabel style={{ marginTop: 20 }}>Sick leave, end date</material_1.InputLabel>
          <material_1.Input type="date" value={sickLeave.endDate} onChange={({ target }) => setSickLeave(Object.assign(Object.assign({}, sickLeave), { endDate: target.value }))}/>
          {/*<TextField
                  label="End Date"
                  fullWidth
                  value={sickLeave.endDate}
                  placeholder="YYYY-MM-DD"
                  onChange={({ target }) => setSickLeave({...sickLeave, endDate:target.value})}
                  />*/}

        </>);
        case "HealthCheck":
            return (<>
          <material_1.InputLabel style={{ marginTop: 50 }}>Entry details, Health check</material_1.InputLabel>
          <material_1.InputLabel style={{ marginTop: 20 }}>Health check rating</material_1.InputLabel>
          <material_1.Select label="Health Check Rating" fullWidth value={healthCheckRating.toString()} onChange={onHealthCheckRatingChange}>
            {healthCheckOptions.map(option => <material_1.MenuItem key={option.label} value={option.value}>
                {option.label}
              </material_1.MenuItem>)}
            </material_1.Select>
          </>);
    }
};
const AddEntryForm = ({ onCancel, onSubmit, allDiagnoses }) => {
    //const [entryTypeSelected, setEntryTypeSelected] = useState(false)
    const [entryType, setEntryType] = (0, react_1.useState)("Hospital");
    const [description, setDescription] = (0, react_1.useState)('');
    const [date, setDate] = (0, react_1.useState)('');
    const [specialist, setSpecialist] = (0, react_1.useState)('');
    //const [diagnosisCode, setDiagnosisCode] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = (0, react_1.useState)([]);
    const [discharge, setDischarge] = (0, react_1.useState)({ date: '', criteria: '' });
    const [employerName, setEmployerName] = (0, react_1.useState)('');
    const [sickLeave, setSickLeave] = (0, react_1.useState)({ startDate: '', endDate: '' });
    const [healthCheckRating, setHealthCheckRating] = (0, react_1.useState)("Healthy");
    const handleDiagnosisSelection = (event) => {
        event.preventDefault();
        console.log("Handling diagnosis selection. updated list of diagnoses:", event.target.value);
        if (Array.isArray(event.target.value) && event.target.value.every(diagnosis => typeof diagnosis === "string")) {
            setDiagnosisCodes(event.target.value);
        }
    };
    const handleEntryTypeSelection = (event) => {
        event.preventDefault();
        console.log("Handling entry type selection. Inputs can be rendered now, chosen type:", event.target.value);
        //setEntryTypeSelected(true);
        switch (event.target.value) {
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
                assertNever(event.target.value);
        }
        ;
    };
    //Helper function for exhaustive type checking
    const assertNever = (value) => {
        throw new Error(`type checking error, assertNever: ${JSON.stringify(value)}`);
    };
    const addEntry = (event) => {
        event.preventDefault();
        switch (entryType) {
            case "Hospital":
                onSubmit({
                    type: entryType,
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    discharge,
                });
                break;
            case "OccupationalHealthcare":
                onSubmit({
                    type: entryType,
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    employerName,
                    sickLeave
                });
                break;
            case "HealthCheck":
                switch (healthCheckRating) {
                    case "Healthy":
                        onSubmit({
                            type: entryType,
                            description,
                            date,
                            specialist,
                            diagnosisCodes,
                            healthCheckRating: types_1.HealthCheckRating[healthCheckRating],
                        });
                        break;
                    case "LowRisk":
                        onSubmit({
                            type: entryType,
                            description,
                            date,
                            specialist,
                            diagnosisCodes,
                            healthCheckRating: types_1.HealthCheckRating[healthCheckRating],
                        });
                        break;
                    case "HighRisk":
                        onSubmit({
                            type: entryType,
                            description,
                            date,
                            specialist,
                            diagnosisCodes,
                            healthCheckRating: types_1.HealthCheckRating[healthCheckRating],
                        });
                        break;
                    case "CriticalRisk":
                        onSubmit({
                            type: entryType,
                            description,
                            date,
                            specialist,
                            diagnosisCodes,
                            healthCheckRating: types_1.HealthCheckRating[healthCheckRating],
                        });
                }
                break;
            default:
                assertNever(entryType);
        }
        ;
        setDescription('');
        setDate('');
        setSpecialist('');
        //setDiagnosisCode('')
        setDiagnosisCodes([]);
        setDischarge({ date: '', criteria: '' });
        setEmployerName('');
        setSickLeave({ startDate: '', endDate: '' });
        setHealthCheckRating("Healthy");
    };
    const onHealthCheckRatingChange = (event) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            const value = event.target.value;
            console.log('onHealthCheckRatingChange, target value:', value);
            const selectedHealthCheckRating = Object.values(types_1.HealthCheckRating).find(h => h.toString() === value);
            console.log('healthCheckRating:', selectedHealthCheckRating);
            switch (selectedHealthCheckRating) {
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
                    assertNever(selectedHealthCheckRating);
            }
        }
    };
    //console.log("Entry input state: Entry type: ", entryType, "Description: ", description, "Date:", date, "Specialist:", specialist, "diagnosisCodes:", diagnosisCodes, "discharge: ", discharge, "employerName:", employerName, "sickLeave:", sickLeave, "healthCheckRating:", healthCheckRating)
    //console.log('Entry type input options state:', entryTypeOptions)
    //console.log("Health check input options state:", healthCheckOptions)
    return (<div>
      Select entry type
      <material_1.Select label="Select" fullWidth value={entryType} onChange={handleEntryTypeSelection}>
        {entryTypeOptions.map(option => <material_1.MenuItem key={option.label} value={option.value}>
          {option.label}
        </material_1.MenuItem>)}
      </material_1.Select>

   

      <form onSubmit={addEntry}>
      <material_1.InputLabel style={{ marginTop: 20 }}>Entry date</material_1.InputLabel>
      <material_1.Input type="date" value={date} onChange={({ target }) => setDate(target.value)}/>
      {/*<TextField
            label="Date here"
            fullWidth
            value={date}
            placeholder="YYYY-MM-DD"
            onChange={({ target }) => setDate(target.value)}
          />*/}
        <material_1.InputLabel style={{ marginTop: 20 }}>Description ({description.length}/200 characters)</material_1.InputLabel>
        <material_1.TextField label="Description here" fullWidth value={description} onChange={({ target }) => setDescription(target.value)}/>
        <material_1.InputLabel style={{ marginTop: 20 }}>Specialist ({specialist.length}/100 characters)</material_1.InputLabel>
        <material_1.TextField label="Specialist here" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)}/>

        <material_1.InputLabel style={{ marginTop: 20 }}>Diagnosis codes ({diagnosisCodes.length}/10 codes)</material_1.InputLabel>
        {diagnosisCodes.map(diagnosisCode => (<>{diagnosisCode} </>))}
        <br />
        
        <material_1.Select label="Select" fullWidth value={diagnosisCodes} multiple onChange={handleDiagnosisSelection /*{setDiagnosisCode(target.value)}*/}>
          {allDiagnoses.map(diagnosisCode => (<material_1.MenuItem key={diagnosisCode.code} value={diagnosisCode.code}>
            
            {diagnosisCode.code}
            </material_1.MenuItem>))}
        </material_1.Select>

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
        
      <EntryTypeFields entryType={entryType} onHealthCheckRatingChange={onHealthCheckRatingChange} discharge={discharge} employerName={employerName} sickLeave={sickLeave} healthCheckRating={healthCheckRating} setDischarge={setDischarge} setEmployerName={setEmployerName} setSickLeave={setSickLeave}/>
  

        <material_1.Grid>
          <material_1.Grid item>
            <material_1.Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
              Cancel
            </material_1.Button>
          </material_1.Grid>
          <material_1.Grid item>
            <material_1.Button style={{
            float: "right",
        }} type="submit" variant="contained">
              Add
            </material_1.Button>
          </material_1.Grid>
        </material_1.Grid>
      </form>
      : 
      <></>
    </div>);
};
exports.default = AddEntryForm;
