"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const AddEntryForm_1 = __importDefault(require("./AddEntryForm"));
const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, allDiagnoses }) => (<material_1.Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <material_1.DialogTitle>Add a new entry for the patient</material_1.DialogTitle>
    <material_1.Divider />
    <material_1.DialogContent>
      {error && <material_1.Alert severity="error">{error}</material_1.Alert>}
      <AddEntryForm_1.default onSubmit={onSubmit} onCancel={onClose} allDiagnoses={allDiagnoses}/>
    </material_1.DialogContent>
  </material_1.Dialog>);
exports.default = AddEntryModal;
