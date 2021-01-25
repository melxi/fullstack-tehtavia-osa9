/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry } from "./types";

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

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString("name", object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString("occupation", object.occupation),
    entries: []
  };
};

export default toNewPatientEntry;
