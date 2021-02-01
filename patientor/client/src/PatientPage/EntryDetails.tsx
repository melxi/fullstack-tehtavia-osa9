import React from "react";
import { Entry, EntryType } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (entry.type) {
        case EntryType.Hospital:
            return <HospitalEntry entry={entry} />;
        case EntryType.OccupationalHealthcare:
            return <OccupationalHealthcareEntry entry={entry} />;
        case EntryType.HealthCheck:
            return <HealthCheckEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
}

export default EntryDetails;
