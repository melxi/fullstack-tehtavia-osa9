import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HospitalEntry as Hospital } from '../types';
import DiagnosisList from './DiagnosisList';

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date} <Icon name="hospital" />
                </Card.Header>
                <Card.Meta>{entry.specialist}</Card.Meta>
                <Card.Description><em>{entry.description}</em></Card.Description>
                {entry.diagnosisCodes && (
                    <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
                )}
            </Card.Content>
            <Card.Content extra>
                <Card.Header>{entry.discharge.date}</Card.Header>
                <p>{entry.discharge.criteria}</p>
            </Card.Content>
        </Card>
    )
}

export default HospitalEntry;
