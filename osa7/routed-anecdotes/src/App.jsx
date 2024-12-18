import { useState, useEffect } from 'react'
import {
Routes, Route, Link, Navigate, useNavigate, useParams, useLocation
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>


      
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/createnew">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>List of all anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Link to={"/anecdotes/"+anecdote.id}><li key={anecdote.id} >{anecdote.content}</li></Link>)}
    </ul>
  </div>
)

const Anecdote = ({anecdote}) => {
  
  console.log('current anecdote:',anecdote)
  return(
  <div>
    <h2>Selected anecdote</h2>
      <ul>
        <li>{anecdote.content}</li>
      </ul>
  </div>
  )

}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    <br /><br /><br /><br />
    Anecdote app,  exercise 7 for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    <br/>Simo P.
    <br/>See <a href='https://github.com/fullstack-hy2020/routed-anecdotes'>https://github.com/fullstack-hy2020/routed-anecdotes</a> for the template code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    console.log('handleSbumit, props:', props)

    e.preventDefault()
    
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    setContent('')
    setAuthor('')
    setInfo('')
    navigate('/anecdotes')

    
    
    props.setNotification('New anecdote: \''+content+'\' added')
    setTimeout(()=>{props.setNotification('')},5000)
  }


  

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}




const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [currentanecdote, setCurrentAnecdote] = useState('')
  const [notification, setNotification] = useState('')
  const {pathname}=useLocation()
  

  
  useEffect(()=>{
    console.log("current path:",pathname)
    if(pathname.includes("anecdotes/")){
      console.log(pathname.lastIndexOf("/")," ",pathname.length-1)
      console.log("anecdote by id:",parseInt(pathname.substring(pathname.lastIndexOf("/")+1)), " ", typeof parseInt(pathname.substring(pathname.lastIndexOf("/")+1)))
      setCurrentAnecdote(anecdoteById(parseInt(pathname.substring(pathname.lastIndexOf("/")+1))))
    }
  })  

  
  /*useEffect(()=>{
    
    setNotification('New anecdote,', anecdotes[anecdotes.length-1].content ,'added')
    setTimeout(()=>{setNotification('')},5000)
  },[anecdotes])*/


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => 
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }



  console.log('notification:',notification)


  return (
    <div>

      <h1>Software anecdotes</h1>
            
      <Routes>   
        <Route path="/" element={<About />} />  
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />   
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={currentanecdote} />} />  
        <Route path="/createnew" element={<CreateNew addNew={addNew} anecdotes={anecdotes} notification={notification} setNotification={setNotification}/>} />
        <Route path="/about" element={<About />} />       
      </Routes>
        
      <Menu />
      <p><b>{notification}</b></p>
      <Footer />
    </div>
  )
}

export default App
