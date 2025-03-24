import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Diary, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaryService'






  
  
  
 
  
  





function App() {
  
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('2000-01-01')
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny)
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Good)
  const [newComment, setNewComment] = useState('')
  



  

  useEffect(() => {
    getAllDiaries().then(data => {
      console.log('fetched diaries:', data)
      // response.body is of type any
      setDiaries(data as Diary[])
        })
  }, [])





 const handleWeatherChange = (event: React.SyntheticEvent) => {
  event.preventDefault()
  setNewWeather(event.target.value as Weather)
 }



 const handleVisibilityChange = (event: React.SyntheticEvent) => {
  event.preventDefault()
  setNewVisibility(event.target.value as Visibility)
 }

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({ date: newDate, weather:newWeather, visibility:newVisibility, comment:newComment } as Diary)      
    .then(data =>
      {        
        console.log('Response from backend after adding a diary:', data)
        setDiaries(diaries.concat(data))      

      })
    setNewDate('2000-01-01')
  };

  console.log('state of all diaries:', diaries)
  console.log('diary date input state:', newDate)
  console.log('diary weather input state:', newWeather)
  console.log('diary visibility input state:', newVisibility)
  console.log('diary comment input state:', newComment)

  return (
    <>
      <form onSubmit={diaryCreation}>
      <input type="text" value={newDate} onChange={({target}) => setNewDate(target.value)}></input>
      <select value={newWeather} onChange={handleWeatherChange}>
        <option value={Weather.Sunny}>sunny</option>
        <option value={Weather.Rainy}>rainy</option>
        <option value={Weather.Cloudy}>cloudy</option>
        <option value={Weather.Stormy}>stormy</option>
        <option value={Weather.Windy}>windy</option>
      </select>
      <select value={newVisibility} onChange={handleVisibilityChange}>
        <option value={Visibility.Great}>great</option>
        <option value={Visibility.Good}>good</option>
        <option value={Visibility.Ok}>ok</option>
        <option value={Visibility.Poor}>poor</option>
      </select>
      <input type="text" value={newComment} onChange={({target}) => setNewComment(target.value)}></input>
      <button type="submit">Create a new diary</button>
      </form>
    
    <h2>Diaries</h2>
    <table style={{border:'1px solid'}}>
    <tbody>
      <tr>
        <td style={{border:'1px solid'}}><b>Date</b></td>
        <td style={{border:'1px solid'}}><b>Weather</b></td>
        <td style={{border:'1px solid'}}><b>Visibility</b></td>
        <td style={{border:'1px solid'}}><b>Comment</b></td>
      </tr>

    {diaries.map((diary)=>(
      <tr key={diary.id}>
      <td style={{border:'1px solid'}}>{diary.date}</td>
      <td style={{border:'1px solid'}}>{diary.weather}</td> 
      <td style={{border:'1px solid'}}>{diary.visibility}</td> 
      <td style={{border:'1px solid'}}>{diary.comment}</td> 
      </tr>
      
    ))} 
       </tbody>
       </table>
      
    
    </>

  )
  
}

export default App
