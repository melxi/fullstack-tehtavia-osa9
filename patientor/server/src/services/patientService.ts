import { v4 as uuidv4 } from "uuid";
import patients from '../../data/patients';
import { NonSSNPatient, Patient, NewPatient } from "../types";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find((patient) => patient.id === id);
};

const getNonSSNPatient = (): NonSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: []
  }));
};

const addPatient =  (entry: NewPatient ): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatient,
  getPatients,
  getNonSSNPatient,
  addPatient,
};
