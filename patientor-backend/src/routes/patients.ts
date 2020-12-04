import express  from 'express';
import patientsServices from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res)=>{
  res.send(patientsServices.getPatients());
});

router.post('/', (req, res)=>{
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientsServices.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;