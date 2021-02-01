import React from "react";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

interface DiagnosesDetailsProps {
    diagnosisCodes: Array<Diagnosis["code"]>;
}

const DiagnosisList: React.FC<DiagnosesDetailsProps> = ({ diagnosisCodes }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <List>
            {diagnosisCodes && diagnosisCodes.map(code => (
                <List.Item key={code}>
                    {code} {diagnoses[code] && diagnoses[code].name}
                </List.Item>
            ))}
        </List>
    )
}

export default DiagnosisList;
