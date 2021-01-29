import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import { Patient, NonSSNPatient, NewPatient, NewEntry } from "../types";

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
    entries: [],
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry = {
      id: uuidv4(),
      ...entry
  };

  const updatedPatient = {
      ...patient,
      entries: patient.entries.concat(newEntry)
  };

  patients.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient);
  return updatedPatient;
};

export default {
  getPatient,
  getPatients,
  getNonSSNPatient,
  addPatient,
  addEntry,
};
