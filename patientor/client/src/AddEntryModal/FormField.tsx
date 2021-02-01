import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, EntryType } from "../types";

// structure of a single option
export type EntryTypeOption = {
    key: EntryType;
    value: EntryType;
    label: string;
}

// props for select field component
type SelectFieldProps = {
    name: string;
    label: string;
    options: EntryTypeOption[];
    onChange: (
        _event: React.ChangeEvent<HTMLInputElement>,
        data: HTMLSelectElement
    ) => void;
};

export const SelectField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options,
    onChange
}: SelectFieldProps) => (
    <Form.Field>
        <label>{label}</label>
        <Field as="select" name={name} className="ui dropdown" onChange={onChange}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label || option.value}
                </option>
            ))}
        </Field>
    </Form.Field>
);

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
    field,
    label,
    placeholder
}) => (
    <Form.Field>
        <label>{label}</label>
        <Field placeholder={placeholder} {...field} />
        <div style={{ color: "red" }}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
    label: string;
    errorMessage?: string;
    min: number;
    max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
    <Form.Field>
        <label>{label}</label>
        <Field {...field} type="number" min={min} max={max} />

        <div style={{ color: "red" }}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
);

export const DiagnosisSelection = ({
    diagnoses,
    setFieldValue,
    setFieldTouched,
}: {
    diagnoses: Diagnosis[];
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
    const field = "diagnosisCodes";
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setFieldTouched(field, true);
        setFieldValue(field, data.value);
    };

    const stateOptions = diagnoses.map(diagnosis => ({
        key: diagnosis.code,
        text: `${diagnosis.name} (${diagnosis.code})`,
        value: diagnosis.code
    }));

    return (
        <Form.Field>
            <label>Diagnoses</label>
            <Dropdown
                fluid
                multiple
                search
                selection
                options={stateOptions}
                onChange={onChange}
            />
            <ErrorMessage name={field} />
        </Form.Field>
    );
};


export const EntryTypeSelection = ({
    entryTypes,
    setEntryType,
    setFieldValue,
    setFieldTouched
}: {
    entryTypes: EntryTypeOption[];
    setEntryType: React.Dispatch<React.SetStateAction<EntryType>>;
    setFieldValue: FormikProps<{ type: string }>["setFieldValue"];
    setFieldTouched: FormikProps<{ type: string }>["setFieldTouched"];
}) => {
    const field = "type";
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setFieldTouched(field, true);
        setFieldValue(field, data.value);
        setEntryType(EntryType[data.value as EntryType]);
    };

    const stateOptions = entryTypes.map(type => ({
        key: type.key,
        text: type.label,
        value: type.value
    }));

    return (
        <Form.Field>
            <label>Entry type</label>
            <Dropdown
                defaultValue="Hospital"
                fluid
                selection
                options={stateOptions}
                onChange={onChange}
            />
            <ErrorMessage name={field} />
        </Form.Field>
    );
};