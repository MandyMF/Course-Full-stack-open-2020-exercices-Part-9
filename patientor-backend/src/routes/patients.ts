import express  from 'express';
import patientsServices from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res)=>{
  res.send(patientsServices.getPatients());
});

export default router;