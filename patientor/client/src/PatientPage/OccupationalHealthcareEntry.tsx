import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry as OccupationalHealthcare } from "../types";
import DiagnosisList from "./DiagnosisList";

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcare }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date} <Icon name="stethoscope" /> {entry.employerName}
                </Card.Header>
                <Card.Meta>{entry.specialist}</Card.Meta>
                <Card.Description><em>{entry.description}</em></Card.Description>
                {entry.diagnosisCodes && (
                    <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
                )}
            </Card.Content>
            {entry.sickLeave && (
                <Card.Content extra>
                    <Card.Header>sick leave</Card.Header>
                    <Card.Meta>
                        <strong>from: {entry.sickLeave && entry.sickLeave.startDate}</strong>
                    </Card.Meta>
                    <Card.Meta>
                        <strong>to: {entry.sickLeave && entry.sickLeave.endDate}</strong>
                    </Card.Meta>
                </Card.Content>
            )}
        </Card>
    )
}

export default OccupationalHealthcareEntry;