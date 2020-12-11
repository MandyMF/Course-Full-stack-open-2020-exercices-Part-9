import React from 'react';
import {useParams} from 'react-router-dom';
import {useStateValue, setPatient, addEntry} from '../state'; 
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Icon, Table, Header, Button } from "semantic-ui-react";
import HospitalEntryExtra from './HospitalEntryExtra';
import OccupationalHealthCareEntryExtra from './OccupationalHealthCareEntryExtra';
import HealthCheckEntryExtra from './HealthCheckEntryExtra';
import { Entry, Patient, EntryType } from '../types';
import {assertNever} from "../utils";
import {EntryFormValues} from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";


const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (newEntryValues: EntryFormValues) => {

    let entryToSubmit =  Object.assign(newEntryValues);

    if(newEntryValues.type === EntryType.OccupationalHealthcare){    
      if(entryToSubmit.sickLeave.startDate==="" && entryToSubmit.sickLeave.endDate==="")
      {
        entryToSubmit = {...entryToSubmit, sickLeave: undefined};
      }
    }

    try{
      const {data: newEntry} = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entryToSubmit);
      dispatch(addEntry(newEntry));
      closeModal();
    }
    catch(error){
      console.error(error.response.data);
      setError(error.response.data.error);
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
        <div><span><strong>Description:</strong> {entry.description}</span></div>
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

    <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    <Button onClick={() => openModal()}>Add New Entry</Button>
    </section>
  );
};

export default PatientInfoPage;