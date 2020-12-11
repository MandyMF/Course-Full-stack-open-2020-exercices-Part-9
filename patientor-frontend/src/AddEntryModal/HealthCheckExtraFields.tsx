import React from "react";
import { Field} from "formik";

import { NumberField } from "../AddPatientModal/FormField";


const HealthCheckExtraFields: React.FC = () => {
  return (
    <div>
        <Field
            label="HealthCheck Rating"
            name="healthCheckRating"
            component={NumberField}
            min={-1}
            max={3}
          />
    </div>
  );
};

export default HealthCheckExtraFields;