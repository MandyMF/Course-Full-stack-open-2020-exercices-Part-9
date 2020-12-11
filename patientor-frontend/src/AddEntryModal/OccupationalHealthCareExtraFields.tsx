import React from "react";
import { Field} from "formik";

import { TextField } from "../AddPatientModal/FormField";
import { Divider } from "semantic-ui-react";


const OccupationalHealthCareExtraFields: React.FC = () => {
  return (
    <div>
        <Field
          label="Employer Name"
          placeholder="Employer Name"
          name="employerName"
          component={TextField}
        />
        <Divider />
        <Field
            label="SickLeave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="SickLeave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
    </div>
  );
};

export default OccupationalHealthCareExtraFields;