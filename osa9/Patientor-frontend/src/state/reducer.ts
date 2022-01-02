import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_ALLDATA";
      payload: Patient;
    }
  |
    {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_ALLDATA":
      return {
        ...state,
        patientsAlldata: {
          ...state.patientsAlldata,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.patients
        }
      };
    default:
      return state;
  }
};


// action creator functions
export const setPatientList = (payload: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: payload };
};

export const addPatient = (payload: Patient): Action => {
  return {type: "ADD_PATIENT", payload: payload};
};

export const addPatientAlldata = (payload: Patient): Action => {
  return {type: "ADD_PATIENT_ALLDATA", payload: payload};
};

export const setDiagnosesList = (payload: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES_LIST", payload: payload };
};
