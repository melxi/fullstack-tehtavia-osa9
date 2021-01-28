import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon, List } from "semantic-ui-react";

import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from '../types';

const cache: string[] = [];

const genderIconProps = {
    male: { name: "mars" as "mars" },
    female: { name: "venus" as "venus" },
    other: { name: "genderless" as "genderless" }
}

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient = patients[id];

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(updatePatient(patientFromApi));
                cache.push(id);
            } catch (e) {
                console.error(e);
            }
        }

        if (!cache.includes(id)) {
            fetchPatient();
        }
    }, [id, dispatch]);

    if (!patient) {
        return null;
    }

    return (
        <div className="App">
            <Header as='h2'>
                {patient.name}
                <Icon {...genderIconProps[patient.gender]} />
            </Header>
            <List>
                <List.Item>ssn: {patient.ssn}</List.Item>
                <List.Item>occupation: {patient.occupation}</List.Item>
            </List>
            <Header as='h3'>
                entries
            </Header>
            <List>
                {patient.entries.map(entry => (
                    <div key={entry.id}>
                        <List.Item>
                            {entry.date} <em>{entry.description}</em>
                        </List.Item>
                        <List bulleted>
                            {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                                <List.Item key={code}>
                                    {code}
                                </List.Item>
                            ))}
                        </List>
                    </div>
                ))}
            </List>
        </div>
    )
}

export default PatientPage;