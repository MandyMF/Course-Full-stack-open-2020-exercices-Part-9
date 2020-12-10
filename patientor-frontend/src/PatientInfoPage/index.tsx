import React from 'react';
import {useParams} from 'react-router-dom';
import {useStateValue, setPatient} from '../state'; 
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Icon, Table, Header } from "semantic-ui-react";
import HospitalEntryExtra from './HospitalEntryExtra';
import OccupationalHealthCareEntryExtra from './OccupationalHealthCareEntryExtra';
import HealthCheckEntryExtra from './HealthCheckEntryExtra';
import { Entry } from '../types';
import {assertNever} from "../utils";

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

  const entryExtraData = (entry: Entry) =>{
    switch(entry.type){
      case "HealthCheck":
        return <HealthCheckEntryExtra entry={entry} />;
      case "Hospital":
        return <HospitalEntryExtra entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthCareEntryExtra entry={entry} />;
      default: 
        return assertNever(entry);
    }
  };

  return (
  <section>
    <h2>
      {patient?.name} {IconByGender()}
    </h2>
    {patient?.ssn ? <div><span>ssn: {patient?.ssn}</span></div>: <></>}
    <div><span>occupation: {patient?.occupation}</span></div>

    <h3>entries:</h3>
    <Table>
      <Table.Body>
    {patient?.entries.map( entry => (
      <Table.Row key={entry.id}>
        <Table.Cell key={entry.id + "cell"}>
        <Header>{entry.date}</Header>
        {entryExtraData(entry)}
        <div><span>{entry.description}</span></div>
        <ul>
    {entry.diagnosisCodes?.map(code => 
    <li key={code}>{code}{" "}
      {diagnoses.find(dignosis=> dignosis.code === code)?.name}
    </li>)}
        </ul>   
        </Table.Cell>
      </Table.Row>)
    )}
    </Table.Body>
    </Table>
    </section>
  );
};

export default PatientInfoPage;