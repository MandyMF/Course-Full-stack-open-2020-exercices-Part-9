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
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Patient;
    };

export const setPatientList = (payload: Patient[]): Action=>{
  return {
    type: "SET_PATIENT_LIST",
    payload
  };
};

export const setDiagnosesList = (payload: Diagnosis[]): Action=>{
  return {
    type: "SET_DIAGNOSES_LIST",
    payload
  };
};

export const addPatient = (payload: Patient): Action=>{
  return {
    type: "ADD_PATIENT",
    payload
  };
};

export const setPatient = (payload: Patient): Action=>{
  return {
    type: "SET_PATIENT",
    payload
  };
};

export const addEntry = (payload: Patient): Action=>{
  return {
    type: "ADD_ENTRY",
    payload
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      {
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
    }
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":{
      return {
        ...state,
        patient: action.payload
      };
    }
    case "ADD_ENTRY":{
      return {
        ...state,
        patient: action.payload
      };
    }
    default:
      return state;
  }
};
