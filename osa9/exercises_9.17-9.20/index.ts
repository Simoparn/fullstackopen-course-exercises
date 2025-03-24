import express from 'express';
//import { Request, Response } from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors'
//import jsonServer from 'json-server'


const app = express();

//////////////////////JSON-SERVER EXPERIMENT//////////////////////////////////
/*const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()*/
//////////////////////JSON-SERVER EXPERIMENT//////////////////////////////////

app.use(express.json());
app.use(cors());


//////////////////////JSON-SERVER EXPERIMENT//////////////////////////////////
/*app.use(middlewares)
app.use(jsonServer.bodyParser)
app.use(router)*/
//////////////////////JSON-SERVER EXPERIMENT//////////////////////////////////

const PORT = 3000;



app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









