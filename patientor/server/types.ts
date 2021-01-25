export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
}

// export interface PatientEntry {
//     id: string;
//     name: string;
//     dateOfBirth: string;
//     ssn?: string;
//     gender: Gender;
//     occupation: string;
// }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientEntry {
  id: string;
  name: string;
  ssn?: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;
export type NewPatientEntry = Omit<PatientEntry, 'id' >;
export type NonSSNPatientEntry = Omit<PatientEntry, 'ssn'>;

