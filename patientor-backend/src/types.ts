export enum Gender {
  Male= 'male',
  Female = 'female',
  Other = 'other'
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string;
  sickLeave?: SickLeave
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: Discharge
}

export interface SickLeave {
  startDate: string;
  endDate: string
}

export interface Discharge {
  date: string;
  criteria: string
}

export type Entry = HospitalEntry |
OccupationalHealthCareEntry | HealthCheckEntry;

export type NewEntry = Omit<HospitalEntry, 'id'> |
Omit<OccupationalHealthCareEntry, 'id'> | Omit<HealthCheckEntry,'id'>;