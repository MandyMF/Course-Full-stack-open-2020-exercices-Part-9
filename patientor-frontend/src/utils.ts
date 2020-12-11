import {HealthCheckRating} from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Not found case value on union member: ${JSON.stringify(value)}`
  );
};

export const isHealthCheckRating = (healthCheckRating: number): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};