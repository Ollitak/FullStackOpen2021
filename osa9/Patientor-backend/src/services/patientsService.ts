import patientsData from '../../data/patients';
import { PatientEntry, NewPatientEntry, NonSensitiveEntry, EntryWithoutId } from '../types/patient';
import {v1 as uuid} from 'uuid';

const patients: Array<PatientEntry> = patientsData;

// get all entries
const getEntries = (): Array<PatientEntry> => {
  return patients;
};

// get limited entries (excluding the field named 'ssn')
const getNonSensitiveEntries = (): NonSensitiveEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getEntry = (id: string): PatientEntry | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const id: string = uuid();
  const newPatientEntry: PatientEntry = {
    id: id,
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: EntryWithoutId, patientID: string): PatientEntry => {
  const id: string = uuid();
  
  const newEntry = {
    ...entry,
    id: id
  };

  const patient = <PatientEntry> patients.find(p => p.id === patientID);

  if(!patient) {
    throw new Error("given id not corresponding any patient");
  }
  
  console.log(patient);
  patient.entries.push(newEntry);
  console.log(patient);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getEntry,
  addEntry
};