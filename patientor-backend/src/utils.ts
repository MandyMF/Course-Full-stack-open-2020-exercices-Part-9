import {NewPatient, Gender, Entry} from './types';

const toNewPatient = (object: Record<string, unknown>) : NewPatient =>{
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOcupation(object.occupation),
    entries: parseEntry(object.entries)
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

const parseGender = (gender: any): Gender => {
  if( !gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender: '+ JSON.stringify(gender));
  }
  return gender;
};

const parseOcupation = (occupation: any): string => {
  if( !occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation: '+ JSON.stringify(occupation));
  }
  return occupation;
};

const parseEntry = (entries: any): Entry[] => {
  if(!entries) return [];
  return (entries as any[]).map((entry: any)=>{
    if(!isEntryByType(entry)){
      throw new Error(`Error on entries ${JSON.stringify(entries)}`);
    }
    return entry;
  });
};

const isString = (text: any): text is string => {
  return typeof text ==='string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isEntryByType = (entry: Record<string, any>): entry is Entry =>{
  return entry.type === "HealthCheck" || entry.type === "OccupationalHealthcare" || entry.type === "Hospital";
};

export default toNewPatient;