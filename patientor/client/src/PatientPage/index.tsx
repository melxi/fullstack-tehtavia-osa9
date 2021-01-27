import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon, List } from "semantic-ui-react";

import { useStateValue } from "../state";
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
                dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
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
        </div>
    )
}

export default PatientPage;