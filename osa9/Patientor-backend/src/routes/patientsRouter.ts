import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientsRouter.post('/', (req, res) => {
  try {
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

export default patientsRouter;