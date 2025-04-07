import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import { EntryFormValues, Diagnosis } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  allDiagnoses:Diagnosis[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, allDiagnoses }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry for the patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} allDiagnoses={allDiagnoses}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
