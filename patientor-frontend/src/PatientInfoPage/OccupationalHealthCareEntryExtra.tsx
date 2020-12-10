import React from "react";
import {OccupationalHealthCareEntry} from "../types";
import { Icon } from "semantic-ui-react";


const OccupationalHealthCareEntryExtra: React.FC<{entry: OccupationalHealthCareEntry}> = ({entry})=>{

  return (
    <section>
      <h1><Icon name="stethoscope"></Icon>{" "}{entry.employerName}</h1>
      { entry.sickLeave &&
      <div>
        <h4>Sick Leave:</h4>
      <div><span>Start Date: <strong>{entry.sickLeave?.startDate}</strong></span></div>
      <div><span>End Date: <strong>{entry.sickLeave?.endDate}</strong></span></div>
      </div>
      } 
  </section>
  );
};

export default OccupationalHealthCareEntryExtra;