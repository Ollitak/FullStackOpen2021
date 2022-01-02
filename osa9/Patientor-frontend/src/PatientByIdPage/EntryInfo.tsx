import React from "react";
import { Entry } from "../types";

const EntryInfo = ({ entry }: {entry: Entry}) => {
  return (
  <div>
    {entry.date} {entry.description}
    {entry.diagnosisCodes?.map((diag: string, id: number) =>
      <li key={id}>{diag}</li>
    )}
  </div>
  );};

export default EntryInfo;