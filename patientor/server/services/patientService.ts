import patients from '../data/patients';
import { NonSSNPatientEntry, PatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
    return patients;
};

const getNonSSNPatientEntry = (): NonSSNPatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntries,
    getNonSSNPatientEntry
};