import patientsData from '../../data/patients.json';
import { PatientEntry, NewPatientEntry, NonSensitiveEntry } from '../types/patient';
import {v1 as uuid} from 'uuid';
import toNewPatientEntry from '../utils';

const patients: Array<PatientEntry> = patientsData.map(o => {
  const object = toNewPatientEntry(o) as PatientEntry;
  object.id = o.id;
  return object;
});

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


export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getEntry
};