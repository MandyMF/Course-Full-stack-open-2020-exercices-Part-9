import React from "react";
import {HospitalEntry} from "../types";
import { Icon } from "semantic-ui-react";


const HospitalEntryExtra: React.FC<{entry: HospitalEntry}> = ({entry})=>{

  return (
  <section>
    <h1><Icon name="plus square" color="red"></Icon></h1>
    { entry.discharge &&
    <div>
    Discharge Date: <strong>{entry.discharge?.date}</strong>
    <p>{entry.discharge?.criteria}</p>
    </div>
    } 
  </section>
  );
};

export default HospitalEntryExtra;