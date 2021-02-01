/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Diagnosis,
  Discharge,
  EntryType,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatient,
  SickLeave,
} from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (key: string, str: any): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${key}: ${str as string}`);
  }

  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing  date: ${date as string}`);
  }

  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender as string}`);
  }

  return gender;
};

const isSSN = (ssn: any): boolean => {
  const SSN_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[012]\dA)\d{2}|\d{3}[\dA-Z]$/;

  return SSN_REGEX.test(ssn);
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn as string}`);
  }

  return ssn;
};

const isDiagnosisCodes = (
  diagnosisCodes: any[]
): diagnosisCodes is string[] => {    
  return diagnosisCodes.every((code) => typeof code === "string");
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
  if (
    !diagnosisCodes ||
    !Array.isArray(diagnosisCodes) ||
    !isDiagnosisCodes(diagnosisCodes)
  ) {
    throw new Error(`Incorrect or missing diagnosis codes`);
  }

  return diagnosisCodes;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      `Incorrect or missing healthcheck rating: ${healthCheckRating as string}`
    );
  }

  return healthCheckRating as HealthCheckRating;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseEntryType = (entryType: any): EntryType => {
  if (!entryType || isEntryType(entryType)) {
    throw new Error(`Incorrert or missing type: ${entryType as string}`);
  }

  return entryType as EntryType;
};

const isSickLeave = (param: any): param is SickLeave => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseSickLeave = (object: any): SickLeave => {
  if (!object || isSickLeave(object)) {
    throw new Error(`Incorrert or missing sickleave: ${object as string}`);
  }

  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

const isDischarge = (param: any): param is Discharge => {
    return Object.keys(param).includes("date" && "criteria");
};

const parseDischarge = (object: any): Discharge => {
  if (!object || !isDischarge(object)) {
    throw new Error(`Incorrert or missing discharge: ${object as string}`);
  }

  return {
    date: parseDate(object.date),
    criteria: parseString("criteria", object.criteria),
  };
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString("description", object.description),
    date: parseDate(object.date),
    specialist: parseString("specialist", object.specialist),
    type: parseEntryType(object.type),
  };

  if (object.diagnosisCodes.length > 0) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString("name", object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString("occupation", object.occupation),
    entries: [],
  };
};

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const toNewEntry = (object: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        discharge: parseDischarge(object.discharge),
      };
    case EntryType.OccupationalHealthcare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseString("employer name", object.employerName),
      };

      if (object.SickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newEntry;
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    default:
      return assertNever(newBaseEntry);
  }
};
