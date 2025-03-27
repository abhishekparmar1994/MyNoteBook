import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const About = (props) => {
  const a = useContext(NoteContext);
  return (
    <div className='container my-3'>
      <h1>{a.name}</h1>
    </div>
  )
}

export default About
