import {NewPatient} from './types';

const toNewPatient = (object: Record<string, unknown>) : NewPatient =>{
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOcupation(object.occupation)
  };
};

const parseName = (name: any): string => {
  if( !name || !isString(name)){
    throw new Error('Incorrect or missing name: '+ JSON.stringify(name));
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
    throw new Error('Incorrect or missing dateOfBirth: ' + JSON.stringify(dateOfBirth));
  }
  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if( !ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn: '+ JSON.stringify(ssn));
  }
  return ssn;
};

const parseGender = (gender: any): string => {
  if( !gender || !isString(gender)){
    throw new Error('Incorrect or missing occupation: '+ JSON.stringify(gender));
  }
  return gender;
};

const parseOcupation = (occupation: any): string => {
  if( !occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation: '+ JSON.stringify(occupation));
  }
  return occupation;
};

const isString = (text: any): text is string => {
  return typeof text ==='string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default toNewPatient;