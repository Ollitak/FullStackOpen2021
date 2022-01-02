import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";



const EntryInfo = ({ entry }: {entry: Entry}) => {
  const [{ diagnoses },] = useStateValue();
  console.log(diagnoses);

  return (
  <div>
    {entry.date} {entry.description}
    {entry.diagnosisCodes?.map((diagCode: string, id: number) =>
      <li key={id}>{diagCode} {diagnoses[diagCode].name}</li>
    )}
  </div>
  );};

export default EntryInfo;