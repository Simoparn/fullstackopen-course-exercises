"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
//import axios from 'axios';
require("./App.css");
const types_1 = require("./types");
const diaryService_1 = require("./services/diaryService");
/*interface ValidationError {
 message: string;
 errors: Record<string, string[]>
}*/
function App() {
    const [diaries, setDiaries] = (0, react_1.useState)([]);
    const [newDate, setNewDate] = (0, react_1.useState)('2000-01-01');
    const [newWeather, setNewWeather] = (0, react_1.useState)(types_1.Weather.Sunny);
    const [newVisibility, setNewVisibility] = (0, react_1.useState)(types_1.Visibility.Good);
    const [newComment, setNewComment] = (0, react_1.useState)('');
    const [notification, setNotification] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        (0, diaryService_1.getAllDiaries)().then(data => {
            console.log('fetched diaries:', data);
            // response.body is of type any
            setDiaries(data);
        });
    }, []);
    const handleWeatherChange = (event) => {
        event.preventDefault();
        //console.log('handleWeatherChange, event:', event)
        if (event.target.value) {
            setNewWeather(event.target.value);
        }
    };
    const handleVisibilityChange = (event) => {
        event.preventDefault();
        //console.log('handleVisibilityChange, event:', event)
        setNewVisibility(event.target.value);
    };
    const diaryCreation = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        (0, diaryService_1.createDiary)({ date: newDate, weather: newWeather, visibility: newVisibility, comment: newComment })
            .then(data => {
            console.log('Response from backend after adding a diary:', data);
            setDiaries(diaries.concat(data));
        })
            .catch(error => {
            //if(axios.isAxiosError<ValidationError, Record<string, unknown>>(error)){
            console.log('Diary creation, error:', error);
            setNotification(error.response.data.error[0].message);
            setTimeout(() => {
                setNotification(null);
            }, 4000);
            //}
        });
        setNewDate('2000-01-01');
    });
    console.log('state of all diaries:', diaries);
    console.log('diary date input state:', newDate);
    console.log('diary weather input state:', newWeather);
    console.log('diary visibility input state:', newVisibility);
    console.log('diary comment input state:', newComment);
    return (<>
    <p style={{ color: 'red' }}>
      <b>
        {notification}
      </b>
    </p>
      <form onSubmit={diaryCreation}>
      <input type="date" value={newDate} onChange={({ target }) => setNewDate(target.value)}></input>
      <select value={newWeather} onChange={handleWeatherChange}>
        <option value={types_1.Weather.Sunny}>sunny</option>
        <option value={types_1.Weather.Rainy}>rainy</option>
        <option value={types_1.Weather.Cloudy}>cloudy</option>
        <option value={types_1.Weather.Stormy}>stormy</option>
        <option value={types_1.Weather.Windy}>windy</option>
      </select>
      <select value={newVisibility} onChange={handleVisibilityChange}>
        <option value={types_1.Visibility.Great}>great</option>
        <option value={types_1.Visibility.Good}>good</option>
        <option value={types_1.Visibility.Ok}>ok</option>
        <option value={types_1.Visibility.Poor}>poor</option>
      </select>
      <input type="text" value={newComment} onChange={({ target }) => setNewComment(target.value)}></input>
      {newComment.length} / 200
      <button type="submit">Create a new diary</button>
      </form>
    
    <h2>Diaries</h2>
    <table style={{ border: '1px solid' }}>
    <tbody>
      <tr>
        <td style={{ border: '1px solid' }}><b>Date</b></td>
        <td style={{ border: '1px solid' }}><b>Weather</b></td>
        <td style={{ border: '1px solid' }}><b>Visibility</b></td>
        <td style={{ border: '1px solid' }}><b>Comment</b></td>
      </tr>

    {diaries.map((diary) => (<tr key={diary.id}>
      <td style={{ border: '1px solid' }}>{diary.date}</td>
      <td style={{ border: '1px solid' }}>{diary.weather}</td> 
      <td style={{ border: '1px solid' }}>{diary.visibility}</td> 
      <td style={{ border: '1px solid' }}>{diary.comment}</td> 
      </tr>))} 
       </tbody>
       </table>
      
    
    </>);
}
exports.default = App;
