import React from "react";
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { useStateValue } from "../state";



const HospitalEntryComponent = ({ hospitalEntry }: { hospitalEntry: HospitalEntry}) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <p>
      <b>{hospitalEntry.date}</b> <br/>
      <i>{hospitalEntry.description}</i> <br/>
      discharge on {hospitalEntry.discharge.date}: {hospitalEntry.discharge.criteria}
      {hospitalEntry.diagnosisCodes?.map((diagCode: string, id: number) =>
        <li key={id}>{diagCode} {diagnoses[diagCode].name}</li>
      )}
  </p>
  );

};

const OcculationalHealthcareEntryComponent = ({ occupEntry }: { occupEntry: OccupationalHealthcareEntry }) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <p>
      <b>{occupEntry.date}</b> <br/>
      <i>{occupEntry.description}</i> <br/>
      Employer {occupEntry.employerName}
      {
        !occupEntry.sickLeave 
        ? null
        : <p> Sickleave from {occupEntry.sickLeave.startDate} to {occupEntry.sickLeave.endDate}</p>
      }
      {occupEntry.diagnosisCodes?.map((diagCode: string, id: number) =>
        <li key={id}>{diagCode} {diagnoses[diagCode].name}</li>
      )}
    </p>
  );
};

const HealthCheckEntryComponent = ({ healthcheckEntry }: { healthcheckEntry: HealthCheckEntry }) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <p>
      <b>{healthcheckEntry.date}</b> <br/>
      <i>{healthcheckEntry.description}</i> <br/>     
      Healcheck rating: {healthcheckEntry.healthCheckRating}
      {healthcheckEntry.diagnosisCodes?.map((diagCode: string, id: number) =>
        <li key={id}>{diagCode} {diagnoses[diagCode].name}</li>
      )}
    </p>
  );
};


const EntryInfo = ({ entry }: {entry: Entry}) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntryComponent hospitalEntry={entry}></HospitalEntryComponent>;
    case "OccupationalHealthcare":
      return <OcculationalHealthcareEntryComponent occupEntry={entry}></OcculationalHealthcareEntryComponent>;
    case "HealthCheck":
      return <HealthCheckEntryComponent healthcheckEntry={entry}></HealthCheckEntryComponent>;
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryInfo;

