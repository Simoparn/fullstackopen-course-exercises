import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
import diaryService from '../services/diaryService';
import { NewEntrySchema, /*toNewDiaryEntry*/ } from '../utils'
import { z } from 'zod'

const router = express.Router();

//Middleware for validating requests before handling in endpoint
const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => { 
  console.log('newDiaryParser, req.body:', req.body)
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

//Middleware for handling errors
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 

  console.log('errorMiddleware:', error)
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};



router.get('/', (_req, res:Response<NonSensitiveDiaryEntry[]>) => {
  //res.send('Fetching all diaries!');
  res.send(diaryService.getNonSensitiveEntries());
  
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});




router.post('/', newDiaryParser, (req:Request<unknown, unknown, NewDiaryEntry>, res:Response<DiaryEntry>) => {
  
  //Checking unreliable requests as required by TypeScript/ESlint rules
  
  //try-catch block without error middleware
  //try {

    //Parsing request without zod schema
    //const newDiaryEntry = toNewDiaryEntry(req.body);

    //Parsing request using zod schema
    //const newDiaryEntry = NewEntrySchema.parse(req.body);
    //const addedEntry = diaryService.addDiary(newDiaryEntry);

    //Parsing request with zod schema and a middleware function
    const addedEntry = diaryService.addDiary(req.body);

    res.json(addedEntry);
  
  //try-catch block without error middleware
  /*}
   catch (error: unknown) {  
    let errorMessage = 'Something went wrong.';


      if(error instanceof Error){
        errorMessage += ' Error: ' + error.message;
        res.status(400).send({ error: errorMessage });  
      }
      else{
        res.status(400).send({error: 'unknown error'})
      }  
    }
  }*/

  //Without checking unreliable requests (remember disabling no-unsafe-assignment rule on the first line of the file)
  /*const { date, weather, visibility, comment } = req.body;
  const addedEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(addedEntry);*/
});

router.use(errorMiddleware);


export default router;
