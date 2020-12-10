import express  from 'express';
import patientsServices from '../services/patientsService';
import toNewPatient, {toNewEntry} from '../utils';

const router = express.Router();

router.get('/:id', (req, res)=>{
  const patient = patientsServices.getPatientById( req.params.id);
  if(!patient){
    return res.send().status(404);
  }
  return res.send(patient);
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
    res.status(400).send((e as Record<string, string>).message);
  }
});


router.post('/:id/entries', (req, res)=>{
  const patient = patientsServices.getPatientById(req.params.id);
  if(!patient){
    return res.status(404).send();
  }
  try {
    const newEntry = toNewEntry(req.body);
    const addedPatientWithNewEntry = patientsServices.addEntryForPatient(patient, newEntry);
    
    return res.json(addedPatientWithNewEntry);
  }
  catch(e){
    console.log(e);
    return res.status(400).send((e as Record<string, string>).message);
  }
});
export default router;