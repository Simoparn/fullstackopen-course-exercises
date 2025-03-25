import { useState, useEffect } from 'react';
//import axios from 'axios';
import './App.css';
import { Diary, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaryService'






  
  
  
 /*interface ValidationError {
  message: string;
  errors: Record<string, string[]>
 }*/
  
  





function App() {
  
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('2000-01-01')
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny)
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Good)
  const [newComment, setNewComment] = useState('')
  const [notification, setNotification] = useState<string | null>(null)



  

  useEffect(() => {
    getAllDiaries().then(data => {
      console.log('fetched diaries:', data)
      // response.body is of type any
      setDiaries(data as Diary[])
        })
  }, [])




//Alternative implementation with select
 /*const handleWeatherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  event.preventDefault()
  //console.log('handleWeatherChange, event:', event)

  setNewWeather(event.target.value as Weather)
  
 }*/


 const handleWeatherChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value)
  setNewWeather(event.target.value as Weather)
 }

//Alternative implementation with select
 /*const handleVisibilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  event.preventDefault()
  setNewVisibility(event.target.value as Visibility)
 }*/

  

 const handleVisibilityChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value)
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
      .catch(error => {
        //if(axios.isAxiosError<ValidationError, Record<string, unknown>>(error)){
          console.log('Diary creation, error:', error)
          setNotification(error.response.data.error[0].message)
          setTimeout(()=>{ 
            setNotification(null)
          }, 4000)
        //}
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
    <p style={{color:'red'}}>
      <b>
        {notification}
      </b>
    </p>
      <form onSubmit={diaryCreation}>
        <b>Date</b>
      <input type="date" value={newDate} onChange={({target}) => setNewDate(target.value)}/>
      <fieldset style={{marginLeft:'10px'}}>
        <legend><b>Visibility</b></legend>
        <span>
            <input type="radio" name="selectedvisibility" value={Visibility.Great} onChange={handleVisibilityChangeRadio}/>
            Great

          <input type="radio" name="selectedvisibility" value={Visibility.Good} onChange={handleVisibilityChangeRadio}/>
          Good

          <input type="radio" name="selectedvisibility" value={Visibility.Ok} onChange={handleVisibilityChangeRadio}/>
          Ok

          <input type="radio" name="selectedvisibility" value={Visibility.Poor} onChange={handleVisibilityChangeRadio}/>
          Poor
        </span>
      </fieldset>
      <fieldset style={{marginLeft:'20px', marginRight: '10px'}}>
      <legend><b>Weather</b></legend>
        <span>
          <input type="radio" name="selectedweather" value={Weather.Sunny} onChange={handleWeatherChangeRadio}/>
          Sunny
        </span> 
        <span>
          <input type="radio" name="selectedweather" value={Weather.Rainy} onChange={handleWeatherChangeRadio}/>
          Rainy
        </span> 
        <span>
          <input type="radio" name="selectedweather" value={Weather.Cloudy} onChange={handleWeatherChangeRadio}/>
          Cloudy
        </span> 
        <span>
          <input type="radio" name="selectedweather" value={Weather.Stormy} onChange={handleWeatherChangeRadio}/>
          Stormy
        </span> 
        <span>
          <input type="radio" name="selectedweather" value={Weather.Windy} onChange={handleWeatherChangeRadio}/>
          Windy
        </span> 
      </fieldset>
      
      {//Alternative implementation with select
      /*<select value={newWeather} onChange={handleWeatherChange}>
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
      </select>*/}
      <b>Comment</b>
      <input type="text" value={newComment} onChange={({target}) => setNewComment(target.value)}></input>
      {newComment.length} / 200
      <br/>
      <button type="submit" style={{backgroundColor:"lightgrey"}}>Create a new diary</button>
      </form>
    
    <h2>All diaries</h2>
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
