import React from "react";
import { Field } from "formik";
import { Header } from "semantic-ui-react";

import { EntryType } from "../types";
import { TextField } from "../AddPatientModal/FormField";

interface Props {
    entryType: EntryType;
}


export const EntryFormField: React.FC<Props> = ({ entryType }) => {
    switch (entryType) {
        case "Hospital":
            return (
                <>
                    <Header>Discharge</Header>
                    <Field
                        label="Date"
                        placeholder="YYYY-MM-DD"
                        name="discharge.date"
                        component={TextField}
                    />
                    <Field
                        label="Criteria"
                        placeholder="Criteria"
                        name="discharge.criteria"
                        component={TextField}
                    />
                </>
            )
        default:
            return null;
    }
}