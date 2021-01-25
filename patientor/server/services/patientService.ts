import { v4 as uuidv4 } from "uuid";
import patients from "../data/patients";
import { NonSSNPatientEntry, PatientEntry, NewPatientEntry } from "../types";

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getEntry = (id: string): PatientEntry | undefined => {
    return patients.find((patient) => patient.id === id);
};

const getNonSSNPatientEntry = (): NonSSNPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: []
  }));
};

const addPatientEntry =  (entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntry,
  getEntries,
  getNonSSNPatientEntry,
  addPatientEntry,
};
