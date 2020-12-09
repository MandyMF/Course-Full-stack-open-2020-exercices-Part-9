import express  from 'express';
import patientsServices from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/:id', (req, res)=>{
  const patient = patientsServices.getPatientById( req.params.id);
  if(!patient){
    res.send().status(404);
  }
  res.send(patient);
});

router.get('/', (_req, res)=>{
  res.send(patientsServices.getPatients());
});

router.post('/', (req, res)=>{
  try{
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientsServices.addPatient(newPatient);
  res.json(addedPatient);
  }
  catch(e){
    res.status(400).send((e as Record<string, string>)?.message);
  }
});

export default router;