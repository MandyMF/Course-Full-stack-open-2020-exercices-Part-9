import React from "react";
import {HealthCheckEntry, HealthCheckRating} from "../types";
import { Icon } from "semantic-ui-react";
import {assertNever} from "../utils";


const HealthCheckEntryExtra: React.FC<{entry: HealthCheckEntry}> = ({entry})=>{
  
  const healt = () => {
    switch(entry.healthCheckRating){
      case HealthCheckRating.LowRisk:
        return <Icon name="heart" color="green"></Icon>;
      case HealthCheckRating.Healthy:
        return <Icon name="heart" color="yellow"></Icon>;
      case HealthCheckRating.HighRisk:
        return <Icon name="heart" color="red"></Icon>;
      case HealthCheckRating.CriticalRisk:
        return <Icon name="heart outline" color="red"></Icon>;
      default:
        return assertNever(entry.healthCheckRating);
    }
  };

  return (
  <section>
    <h1><Icon name="user md"></Icon>{" "}{healt()}</h1>
  </section>
  );
};

export default HealthCheckEntryExtra;