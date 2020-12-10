import {PublicPatient, NewPatient, Patient} from '../types';
import patientsData from '../../data/patients';

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

export default {
  getPatients,
  addPatient,
  getPatientById
};

