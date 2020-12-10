import {NewPatient, Gender, Entry, NewEntry, Diagnosis, HealthCheckRating, Discharge, SickLeave} from './types';

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

export const toNewEntry = (object: Record<string, unknown>) : NewEntry =>{
  const entryTypeValidation = parseNewEntry(object);
  if(!entryTypeValidation){
    throw new Error(`Entry not valid ${JSON.stringify(entryTypeValidation)}`);
  }

  const entryEnsamble = {
    description: parseDescription(entryTypeValidation.description),
    date: parseDate(entryTypeValidation.date),
    specialist: parseSpecialist(entryTypeValidation.specialist),
    diagnosisCodes: parseDiagnosisCodes(entryTypeValidation.diagnosisCodes)
  };

  switch(entryTypeValidation.type){
    case 'HealthCheck':
      {
        return {
          ...entryEnsamble,
          type: entryTypeValidation.type,
          healthCheckRating: parseHealthCheckRating(entryTypeValidation.healthCheckRating)
        }; 
      }
    case 'Hospital':
      {
        return {
          ...entryEnsamble,
          type: entryTypeValidation.type,
          discharge: parseDischarge(entryTypeValidation.discharge)
        };
      }
    case 'OccupationalHealthcare':
      {
        return {
          ...entryEnsamble,
          type: entryTypeValidation.type,
          sickLeave: parseSickLeave(entryTypeValidation?.sickLeave),
          employerName: parseEmployerName(entryTypeValidation.employerName)
        };
      }
    default:
      {
        return assertNever(entryTypeValidation);
      }
  }
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

const parseNewEntry = (entry: any): NewEntry => {
    if(!isNewEntryByType(entry)){
      throw new Error(`Error is not NewEntry ${JSON.stringify(entry)}`);
    }
    return entry;
};


const parseDescription = (description: any): string => {
  if( !description || !isString(description)){
    throw new Error('Incorrect or missing description: '+ JSON.stringify(description));
  }
  return description;
};

const parseDate = (date: any): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: ' + JSON.stringify(date));
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if( !specialist || !isString(specialist)){
    throw new Error('Incorrect or missing specialist: '+ JSON.stringify(specialist));
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if(!diagnosisCodes) return diagnosisCodes;

  if(!isDiagnosisCodes(diagnosisCodes)){
    throw new Error('Incorrect diagnosisCodes: '+ JSON.stringify(diagnosisCodes));
  }
  
  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if( (!healthCheckRating && (healthCheckRating !== 0)) || !isHealthCheckRating(healthCheckRating)){
    throw new Error('Incorrect or missing healthCheckRating: '+ JSON.stringify(healthCheckRating));
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: Record<string, any>): Discharge => {
  if(!discharge || !isDischarge(discharge)){
    throw new Error('Incorrect or missing discharge: '+ JSON.stringify(discharge));
  } 
  return discharge;
};

const parseEmployerName = (employerName: any): string => {
  if(!employerName || !isString(employerName)){
    throw new Error('Incorrect or missing employerName: '+ JSON.stringify(employerName));
  } 
  return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if(!sickLeave) return sickLeave;
  if(!isSickLeave(sickLeave)){
    throw new Error('Incorrect sickLeave: '+ JSON.stringify(sickLeave));
  } 
  return sickLeave;
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

const isNewEntryByType = (entry: Record<string, any>): entry is NewEntry =>{
  return entry.type === "HealthCheck" || entry.type === "OccupationalHealthcare" || entry.type === "Hospital";
};

const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const isDiagnosisCodes = (diagnosisCodes: Record<string, any>): diagnosisCodes is Array<Diagnosis['code']> => {

  if(!Array.isArray(diagnosisCodes)) 
  {
    throw new Error('Error, diagnosisCodes is not an Array: '+ JSON.stringify(diagnosisCodes));
  }

  if(diagnosisCodes.every((code)=> isString(code)))
  {
    return true;  
  }
  else{
    throw new Error('Error, diagnosisCodes, code with wrong type: ' + JSON.stringify(diagnosisCodes));
  }

};

const isDischarge = (discharge: Record<string, any>): discharge is Discharge => {
  if (!discharge.date || !discharge.criteria || !isDate(discharge.date) || !isString(discharge.criteria)){
    return false;
  }
  return true;
};

const isSickLeave = (sickLeave: Record<string, any>): sickLeave is SickLeave => {
  if (!sickLeave.startDate || !sickLeave.endDate || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)){
    return false;
  }
  return true;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default toNewPatient;