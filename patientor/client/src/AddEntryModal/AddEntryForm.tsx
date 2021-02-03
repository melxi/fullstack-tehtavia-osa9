import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";

import { DiagnosisSelection, EntryTypeOption, EntryTypeSelection, TextField } from "./FormField";
import { EntryFormField } from "./EntryFormField";
import { BaseEntry, EntryType } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<BaseEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const entryTypeOptions: EntryTypeOption[] = [
    {
        key: EntryType.Hospital,
        value: EntryType.Hospital,
        label: "Hospital"
    },
    {
        key: EntryType.OccupationalHealthcare,
        value: EntryType.OccupationalHealthcare,
        label: "Occupational Healthcare"
    },
    {
        key: EntryType.HealthCheck,
        value: EntryType.HealthCheck,
        label: "Health Check"
    }
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [entryType, setEntryType] = useState<EntryType>(EntryType.Hospital);
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: EntryType.Hospital,
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: []
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <EntryTypeSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            setEntryType={setEntryType}
                            entryTypes={entryTypeOptions}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <EntryFormField entryType={entryType} />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );

}

export default AddEntryForm;