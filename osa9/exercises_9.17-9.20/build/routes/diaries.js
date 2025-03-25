"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = __importDefault(require("../services/diaryService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
//Middleware for validating requests before handling in endpoint
const newDiaryParser = (req, _res, next) => {
    console.log('newDiaryParser, req.body:', req.body);
    try {
        utils_1.NewEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
//Middleware for handling errors
const errorMiddleware = (error, _req, res, next) => {
    console.log('errorMiddleware:', error);
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.get('/', (_req, res) => {
    //res.send('Fetching all diaries!');
    res.send(diaryService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const diary = diaryService_1.default.findById(Number(req.params.id));
    if (diary) {
        res.send(diary);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', newDiaryParser, (req, res) => {
    //Checking unreliable requests as required by TypeScript/ESlint rules
    //try-catch block without error middleware
    //try {
    //Parsing request without zod schema
    //const newDiaryEntry = toNewDiaryEntry(req.body);
    //Parsing request using zod schema
    //const newDiaryEntry = NewEntrySchema.parse(req.body);
    //const addedEntry = diaryService.addDiary(newDiaryEntry);
    //Parsing request with zod schema and a middleware function
    const addedEntry = diaryService_1.default.addDiary(req.body);
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
exports.default = router;
