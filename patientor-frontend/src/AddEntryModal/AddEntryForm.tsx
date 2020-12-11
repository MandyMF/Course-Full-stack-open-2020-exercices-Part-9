import React from "react";
import { Grid, Button, Divider, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Entry, EntryType } from "../types";
import HospitalExtraFields from "./HospitalExtraFields";
import HealthCheckExtraFields from "./HealthCheckExtraFields";
import OccupationalHealthCareExtraFields from "./OccupationalHealthCareExtraFields";
import {isDate, isHealthCheckRating} from "../utils";

import {useStateValue} from '../state';


export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const specificFormData = (type: string) => {   
    switch(type){
      case EntryType.Hospital:
        return <HospitalExtraFields />;
      case EntryType.HealthCheck:
        return <HealthCheckExtraFields />;
      case EntryType.OccupationalHealthcare:
        return <OccupationalHealthCareExtraFields />;
      default:
        return <Header>NON IMPLEMENTED COMPONENT FOR THIS ENTRY TYPE</Header>;
    }
  };

  return (
    <Formik
    initialValues={{
      type: EntryType.Hospital,
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      healthCheckRating: -1,
      employerName: "",
      sickLeave: { startDate: "", endDate: "" },
      discharge: { date: "", criteria: "" },
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const incorrectError = "Field has incorrect value";
      //const twoErrors = "Field is required or have incorrect value";
      let errors: { [field: string]: string } | { [id: string]: { [id: string]: string } }= {};
      
      if (!values.description) {
        errors.description = requiredError;
      }

      if(!values.date){
        errors.date = requiredError;
      }
      else if(!isDate(values.date)){
        errors.date = incorrectError;
      }

      if (!values.specialist) {
        errors.specialist = requiredError;
      }

      if(values.type === EntryType.Hospital)
      {   
        let dateError = 0;

        if (!values.discharge.date){
          errors = { ...errors, discharge:{ date: requiredError}};
          dateError = 1;
        }
        else if (!isDate(values.discharge.date)){
          errors = { ...errors, discharge:{ date: incorrectError}};
          dateError = 2;
        }

        if(!values.discharge.criteria){
          if(dateError === 0)
            errors = { ...errors, discharge:{criteria: requiredError}};
          else if(dateError === 1)
            errors = { ...errors, discharge:{date: requiredError ,criteria: requiredError}};
          else
            errors = { ...errors, discharge:{date: incorrectError ,criteria: requiredError}};
        }
      }

      else if(values.type === EntryType.HealthCheck){
        if(values.healthCheckRating === -1)
          errors.healthCheckRating = "Please set HealthCheck Rating to a value between 0 and 3";
        if ((values.healthCheckRating !== -1) && !isHealthCheckRating(values.healthCheckRating))
          errors.healthCheckRating = "Please set HealthCheck Rating to a value between 0 and 3";
      }

      else if(values.type === EntryType.OccupationalHealthcare){
        if (!values.employerName) {
          errors.employerName = requiredError;
        }

        if(!values.sickLeave.startDate && values.sickLeave.endDate){
          if(!isDate(values.sickLeave.endDate))
            errors = {...errors, sickLeave:{startDate: requiredError, endDate: incorrectError}};
          else
            errors = {...errors, sickLeave:{startDate: requiredError}};
        }

        else if(values.sickLeave.startDate && !values.sickLeave.endDate){
          if(!isDate(values.sickLeave.startDate))
            errors = {...errors, sickLeave:{startDate: incorrectError, endDate: requiredError}};
          else
            errors = {...errors, sickLeave:{endDate: requiredError}};
        }

        else if(values.sickLeave.startDate && values.sickLeave.endDate){
          if(!isDate(values.sickLeave.startDate) && !isDate(values.sickLeave.endDate))
            errors = {...errors, sickLeave:{startDate: incorrectError,endDate: incorrectError}};
          else if(!isDate(values.sickLeave.startDate))
            errors = {...errors, sickLeave:{startDate: incorrectError}};
          else if(!isDate(values.sickLeave.endDate))
            errors = {...errors, sickLeave:{endDate: incorrectError}};
        }
      }
      return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
      return (
        <Form className="form ui">
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />

          <Field
              label="Date"
              placeholder="YYYY-MM-DD"
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

          <br />
          <Grid>
            <Grid.Column floated="right" width={8}>
              <Header style={{paddingTop: "8px"}}>Specific Data Needed for Selected Entry Type:</Header>
            </Grid.Column>
            <Grid.Column floated="left" width={8}>
            <Field as="select" name="type">
                <option value={EntryType.Hospital}>{EntryType.Hospital}</option>
                <option value={EntryType.HealthCheck}>{EntryType.HealthCheck}</option>
                <option value={EntryType.OccupationalHealthcare}>{EntryType.OccupationalHealthcare}</option>
            </Field>
            </Grid.Column>
          </Grid>
          <Divider/>
          
          {specificFormData(values.type)}
          
          <br />
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

export default AddEntryForm;