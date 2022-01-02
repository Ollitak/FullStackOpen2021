import React from "react";
import { Entry } from "../types";
import EntryInfo from "./EntryInfo";

const Entries = ({ entry }: {entry: Entry[]}) => {
  return (
    <div>
      <h2>entries</h2>
      {entry.map((e: Entry) => <EntryInfo entry={e} key={e.id}/>)}
    </div>
  );
};

export default Entries;