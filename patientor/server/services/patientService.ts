import { v4 as uuidv4 } from "uuid";
import patients from "../data/patients";
import { NonSSNPatientEntry, PatientEntry, NewPatientEntry } from "../types";

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSSNPatientEntry = (): NonSSNPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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
  getEntries,
  getNonSSNPatientEntry,
  addPatientEntry,
};
