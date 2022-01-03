import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, NumberField, DiagnosisSelection } from "./FormField";
import { useStateValue } from "../state";

import { HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";

const validateDateFormat = (date: string) => {
  const datePattern = /^([0-9]{4}-[0-9]{2}-[0-9]{2})$/;
  return datePattern.test(date);
};

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;
export type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface HealthCheckProps {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

interface OccupationalProps {
  onSubmit: (values: OccupationalEntryFormValues) => void;
  onCancel: () => void;
}

interface HospitalProps {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export const AddHealthCheckEntryForm = ({ onSubmit, onCancel } : HealthCheckProps ) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 1
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!validateDateFormat(values.date)){
          errors.date = "Invalid date format";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched}) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="HealthCheck rating"
              min={1}
              max={3}
              name="healthCheckRating"
              component={NumberField}
            />
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
};

export const AddOccupationalEntryForm = ({ onSubmit, onCancel } : OccupationalProps ) => {

  const [{ diagnoses },] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {startDate: "", endDate: ""}
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: { [field: string]: any } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!validateDateFormat(values.date)){
          errors.date = "Invalid date format";
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave && !validateDateFormat(values.sickLeave.startDate)){
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.sickLeave = {
            ...errors.sickLeave,
            startDate: "Invalid date format",
          };
        }
        if (values.sickLeave && !validateDateFormat(values.sickLeave.endDate)){
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.sickLeave = {
            ...errors.sickLeave,
            endDate: "Invalid date format",
          };        
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched}) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Employer name"
              placeholder="employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Start of sick leave"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="End of sick leave"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />

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
};


export const AddHospitalEntryForm = ({ onSubmit, onCancel } : HospitalProps ) => {

  const [{ diagnoses },] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {date:"", criteria:""}
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: { [field: string]: any } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!validateDateFormat(values.date)){
          errors.date = "Invalid date format";
        }
        if (!values.discharge.criteria) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.discharge = {...errors.discharge, criteria: "required field"};
        } 
        if (!values.discharge.date) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.discharge = {...errors.discharge, date: "required field"};        
        } else if (!validateDateFormat(values.discharge.date)){
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.discharge = {...errors.discharge, date: "invalid date format"};        
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched}) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
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
};

export default {AddHealthCheckEntryForm, AddOccupationalEntryForm, AddHospitalEntryForm};