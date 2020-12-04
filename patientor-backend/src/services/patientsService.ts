import {NonSensitivePatient, NewPatient, Patient} from '../types';
import patientsData from '../../data/patients';

const getPatients = (): NonSensitivePatient[] =>{
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
  addPatient
};