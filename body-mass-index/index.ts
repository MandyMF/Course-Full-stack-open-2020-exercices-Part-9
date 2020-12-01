import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res)=>{
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res)=>{

  if(!Number(req.query.height) || !Number(req.query.weight))
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

const PORT = 3002;

app.listen(PORT, ()=> {
  console.log(`Server running at Port: ${PORT}`);
});
