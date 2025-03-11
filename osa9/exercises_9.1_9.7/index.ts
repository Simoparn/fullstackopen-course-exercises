import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/', (_req, res) => {
  res.send('Backend for exercises 9.1-9.7');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  });

app.get('/bmi', (req, res) => {
    const params = req.query;
    
    console.log('bmi endpoint, query parameters:', params);

    if(params.height && params.weight) {

      if(!isNaN(Number(params.height)) && !isNaN(Number(params.weight))){
        try{
          const bmiData = calculateBmi(Number(params.height), Number(params.weight));
          res.json(JSON.stringify(bmiData));
        }catch(error){
          if(error instanceof Error){
            res.send(`Error: ${error.message}`);
          }
          else{
            res.send('Unknown error, please try again.');
          }
        }
        
      }
      else{
        res.send('malformatted parameters, height or weight are in wrong format, please use numbers only');
      }
    }
    else {
      res.send('malformatted parameters, height or weight have not been given');
    }
  });

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if(req.body.daily_exercises && req.body.target){
    const daily_exercises = req.body.daily_exercises;
    const target = req.body.target;
    try{
      if(daily_exercises instanceof Array && daily_exercises.every(item => typeof item === 'number')){
        if(typeof target === 'number'){
          const exercisesData = calculateExercises(daily_exercises, target);
          const dataToSend = { 
            periodLength: exercisesData.periodLength, 
            trainingDays: exercisesData.trainingDays, 
            success:exercisesData.targetWasReached, 
            rating: exercisesData.rating, 
            ratingDescription: exercisesData.ratingDescription,
            target: exercisesData.target,
            average: exercisesData.averageTime 
          };
          res.json(dataToSend);
        }
        else{
          res.send("malformatted request, please ensure that the target value is a number");
        }
      }
      else{
        res.send("malformatted request, please ensure that the daily_exercise field is an array of numbers ([1,4,2.5] etc.)");
      }
    }catch(error){
      if(error instanceof Error){
        res.send(`Error: ${error.message}`);
      }
    }
  }


});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
