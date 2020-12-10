import {PublicPatient, NewPatient, Patient, NewEntry, Entry} from '../types';
import patientsData from '../../data/patients';
import uniqid from 'uniqid';

const getPatients = (): PublicPatient[] =>{
  return patientsData.map(
    ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
    }) => {
    return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    };
  });
};

const getPatientById = (patientId: string): Patient | undefined =>{
  let patient = patientsData.find(({id})=> id === patientId);

  if(patient && !patient?.entries){
    patient = {...patient, entries:[]};
  }

  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: (patientsData.length + 1).toString(),
    ...patient
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntryForPatient = (patient: Patient ,entry: NewEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newId = uniqid() as string;
  const toAddEntry: Entry = {
    id: newId,
    ...entry
  };

  patient.entries.push(toAddEntry);
  return patient;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntryForPatient
};

