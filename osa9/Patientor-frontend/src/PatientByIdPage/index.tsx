import React from "react";
import { useStateValue } from "../state";
import axios from "axios";
import { useParams } from "react-router";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Button } from "semantic-ui-react";


import { addPatientAlldata } from "../state";
import Entries from "./Entries";

const PatientByIdPage = () => {
  const [{ patientsAlldata }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
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

  const submitNewModel = async (values: EntryFormValues) => {
    try {
      const response = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}`, values);
      dispatch(addPatientAlldata(response.data));
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewModel}
        error={error}
        onClose={closeModal}
      />
      <br/>
      <Button onClick={() => openModal()}>Add new healthcheck entry</Button>
    </div>
  );
};

export default PatientByIdPage;