import React from 'react';
import {useParams} from 'react-router-dom';
import {useStateValue, setPatient} from '../state'; 
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const getPatientById = async () =>{
      try {
        const {data} = await axios.get(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatient(data));
      } 
      catch (error) {
        console.error(error);
      }
    };

    if(!patient || patient?.id !== id){
      getPatientById();
    }
  },[id, patient, dispatch]);

  const IconByGender = () =>{
    if(patient?.gender === "male"){
      return <Icon name="mars"></Icon>;
    }
    else if(patient?.gender === "female"){
      return <Icon name="venus"></Icon>;
    }
    else{
      return <Icon name="genderless"></Icon>;
    }
  };

  return (
  <section>
    <h2>
      {patient?.name} {IconByGender()}
    </h2>
    {patient?.ssn ? <div><span>ssn: {patient?.ssn}</span></div>: <></>}
    <div><span>occupation: {patient?.occupation}</span></div>

    <h3>entries</h3>
    {patient?.entries.map( entry => (
      <div key={entry.id}>
        <div><span>{entry.date}{" "}{entry.description}</span></div>
        <ul>
    {entry.diagnosisCodes?.map(code => 
    <li key={code}>{code}{" "}
      {diagnoses.find(dignosis=> dignosis.code === code)?.name}
    </li>)}
        </ul>
      </div>)
    )}
  </section>
  );
};

export default PatientInfoPage;