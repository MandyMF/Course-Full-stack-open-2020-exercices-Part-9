import React from "react";
import { Field} from "formik";

import { TextField } from "../AddPatientModal/FormField";


const HospitalExtraFields: React.FC = () => {
  return (
    <div>
        <Field
            label="Discharge Date"
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
    </div>
  );
};

export default HospitalExtraFields;