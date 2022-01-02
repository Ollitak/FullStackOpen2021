import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientsRouter.get('/:id', (req, res) => {
  const patient = patientsService.getEntry(req.params.id);
  if(patient) res.send(patient);
  else res.send(404);
});

patientsRouter.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if(error instanceof Error){
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post('/:id', (req, res) => {
  // 1) validate new entry (function name toNewEntry)
  // 2) add entry to the patients list (functio name addEntry)
  // 3) response with the newEntry
  try {
    console.log(req.body);
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientsService.addEntry(newEntry, req.params.id);
    res.json(updatedPatient);
    
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if(error instanceof Error){
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;