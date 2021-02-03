import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, Header, Icon, List } from "semantic-ui-react";

import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import EntryDetails from "./EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

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
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: patientFromApi } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(updatePatient(patientFromApi));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data);
        }
    };

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
            <Header as="h2">
                {patient.name}
                <Icon {...genderIconProps[patient.gender]} />
            </Header>
            <List>
                <List.Item>ssn: {patient.ssn}</List.Item>
                <List.Item>occupation: {patient.occupation}</List.Item>
            </List>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                onClose={closeModal}
                error={error}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
            {patient.entries.length > 0 && <Header as="h3">entries</Header>}
            <Card.Group>
                {patient.entries.map(entry => (
                    <EntryDetails key={entry.id} entry={entry} />
                ))}
            </Card.Group>
        </div>
    )
}

export default PatientPage;