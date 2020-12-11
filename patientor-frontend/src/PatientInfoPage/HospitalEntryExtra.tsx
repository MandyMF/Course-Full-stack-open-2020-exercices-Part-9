import React from "react";
import {HospitalEntry} from "../types";
import { Icon } from "semantic-ui-react";


const HospitalEntryExtra: React.FC<{entry: HospitalEntry}> = ({entry})=>{

  return (
  <section>
    <h1><Icon name="plus square" color="red"></Icon></h1>
    { entry.discharge &&
    <div>
    <strong>Discharge Date: {entry.discharge?.date}</strong>
    <p><strong>Criteria:</strong> {entry.discharge?.criteria}</p>
    </div>
    } 
  </section>
  );
};

export default HospitalEntryExtra;