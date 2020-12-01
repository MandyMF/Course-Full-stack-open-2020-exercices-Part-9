import express from 'express';
import calculateBmi from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
import { isUndefined } from 'util';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res)=>{
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res)=>{

  if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)))
    return res.json({
      error: 'malformatted parameters'
    });

  return res.json(
  {
    weight: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: calculateBmi( Number(req.query.height),Number(req.query.weight))
  }
  );
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target}: any = req.body;

  if(isUndefined(daily_exercises) || isUndefined(target)){
    return res.json({
      error: 'parameter missing'
    });
  }

  if(isNaN(Number(target)) || !Array.isArray(daily_exercises) || (daily_exercises as []).find(
    (n) => isNaN(Number(n))
  )){
    return res.json({
      error: "malformatted parameters"
    });
  }

  return res.json(
    calculateExercises((daily_exercises as []).map(n => Number(n)), Number(target))
    );
});

const PORT = 3002;

app.listen(PORT, ()=> {
  console.log(`Server running at Port: ${PORT}`);
});
