import React from "react";
import { useStateValue } from "../state";
import axios from "axios";
import { useParams } from "react-router";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import EntryModal from "../AddEntryModal";
import { HealthCheckEntryFormValues, OccupationalEntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Button } from "semantic-ui-react";


import { addPatientAlldata } from "../state";
import Entries from "./Entries";

const PatientByIdPage = () => {
  const [{ patientsAlldata }, dispatch] = useStateValue();
  const [healthCheckModalOpen, setHealthCheckModalOpen] = React.useState<boolean>(false);
  const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();

  const currentPatient = patientsAlldata[id];

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

  const submitNewHealthCheckModel = async (values: HealthCheckEntryFormValues) => {
    try {
      const response = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}`, values);
      dispatch(addPatientAlldata(response.data));
      closeHealthCheckModal();
    } catch (e) {
      console.error(e);
    }
  };

  const submitOccupationalModel = async (values: OccupationalEntryFormValues) => {
    try {
      const response = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}`, values);
      dispatch(addPatientAlldata(response.data));
      closeOccupationalModal();
    } catch (e) {
      console.error(e);
    }
  };

  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);

  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false);
    setError(undefined);
  };

  const openOccupationalModal = (): void => setOccupationalModalOpen(true);

  const closeOccupationalModal = (): void => {
    setOccupationalModalOpen(false);
    setError(undefined);
  };

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
      <Entries entry={currentPatient.entries}/>
      <EntryModal.AddHealthCheckEntryModal
        modalOpen={healthCheckModalOpen}
        onSubmit={submitNewHealthCheckModel}
        error={error}
        onClose={closeHealthCheckModal}
      />
      <EntryModal.AddOccupationalEntryModal
        modalOpen={occupationalModalOpen}
        onSubmit={submitOccupationalModel}
        error={error}
        onClose={closeOccupationalModal}
      />
      <br/>
      <Button onClick={() => openHealthCheckModal()}>Add a new healthcheck entry</Button>
      <Button onClick={() => openOccupationalModal()}>Add a new occupational healthcare entry</Button>
    </div>
  );
};

export default PatientByIdPage;