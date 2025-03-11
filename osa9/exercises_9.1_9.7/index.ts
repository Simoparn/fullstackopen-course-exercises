import express from 'express'
import { calculateBmi } from './bmiCalculator';

const app = express()

app.get('/', (_req, res) => {
  res.send('Backend for exercises 9.1-9.7')
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
  });

app.get('/bmi', (req, res) => {
    const params = req.query
    
    console.log('bmi endpoint, query parameters:', params)

    if(params.height && params.weight) {

      if(!isNaN(Number(params.height)) && !isNaN(Number(params.weight))){
        const bmiData = calculateBmi(Number(params.height), Number(params.weight))
        res.json(JSON.stringify(bmiData))
      }
      else{
        res.send('malformatted parameters, height or weight are in wrong format, please use numbers only')
      }
    }
    else {
      res.send('malformatted parameters, height or weight have not been given')
    }
  });

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
