import React from "react";
import { Card, Icon } from "semantic-ui-react";
import HealthRatingBar from "../components/HealthRatingBar";
import { HealthCheckEntry as HealthCheck } from "../types";
import DiagnosisList from "./DiagnosisList";

const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date} <Icon name="user doctor" />
                </Card.Header>
                <Card.Meta>{entry.specialist}</Card.Meta>
                <Card.Description><em>{entry.description}</em></Card.Description>
                {entry.diagnosisCodes && (
                    <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
                )}
            </Card.Content>
            <Card.Content extra>
                <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
            </Card.Content>
        </Card>
    )
}

export default HealthCheckEntry;