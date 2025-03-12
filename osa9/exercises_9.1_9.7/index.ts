import express from 'express';
import { Request } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';



interface RequestBody {
  daily_exercises: number[];
  target: number;
}

/*interface QueryParams {
  
}*/



const app = express();

app.use(express.json());

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
            res.status(400).send(`Error: ${error.message}`);
          }
          else{
            res.status(400).send('Unknown error, please try again.');
          }
        }
        
      }
      else{
        res.status(400).send('malformatted parameters, height or weight are in wrong format, please use numbers only');
      }
    }
    else {
      res.status(400).send('malformatted parameters, height or weight have not been given');
    }
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req:Request<any,any,RequestBody, qs.ParsedQs>, res) => {
  console.log('/exercises, req.body:', req.body);
  if(req.body.daily_exercises && req.body.target){
    const daily_exercises = req.body.daily_exercises;
    const target = req.body.target;
    
      if(daily_exercises instanceof Array && daily_exercises.every(item => typeof item === 'number')){
        if(typeof target === 'number'){
          try{
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
          }catch(error){
            if(error instanceof Error){
              res.status(400).send(`Error: ${error.message}`);
            }
          }
        }
        else{
          console.log('malformatted request, given target value was not a number');
          res.status(400).json({error:"malformatted request, please ensure that the target value is a number"});
        }
      }
      else{
        console.log('malformatted request, given daily_exercise field was not an array of pure numbers');
        res.status(400).json({error:"malformatted request, please ensure that the daily_exercise field is an array of numbers ([1,4,2.5] etc.)"});
      }

  }else{
    console.log('malformatted request, target or daily_exercise array field missing');
    res.status(400).json({error:'malformatted request, target or daily_exercise array field missing'});
  }


});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
