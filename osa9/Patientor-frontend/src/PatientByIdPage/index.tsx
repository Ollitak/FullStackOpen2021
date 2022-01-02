import React from "react";
import { useStateValue } from "../state";
import axios from "axios";
import { useParams } from "react-router";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

import { addPatientAlldata } from "../state";
import Entries from "./Entries";



const PatientByIdPage = () => {
  const [{ patientsAlldata }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const currentPatient = patientsAlldata[id];
  console.log(currentPatient);

  React.useEffect(() => {
    // retreive data only if not found in the current state
    if(currentPatient) return;

    const fetchPatientById = async () => {
      try {
        console.log(`fetching data for id ${id}`);
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatientAlldata(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientById();
  }, [id]);

  if(!currentPatient){
    return (
      <div>
        data loading...
      </div>
    );
  }

  return (
    <div>
    <h2>{currentPatient.name}</h2>
    <p>gender: {currentPatient.gender}</p>
    <p>ssn: {currentPatient.ssn}</p>
    <p>occupation: {currentPatient.occupation}</p>
    <p><Entries entry={currentPatient.entries}/></p>
    </div>
  );
};

export default PatientByIdPage;