import { useEffect, useState } from 'react'
import axios from "axios"


function App() {
    const [notes, setnotes] = useState([])

    console.log("hello integration")

    function fetchNotes(){
      axios.get("https://sheryians-backend-1-vdj5.onrender.com//api/notes")
      .then((res)=>{
        setnotes(res.data.notes)
      })
    }

    useEffect(()=>{
        fetchNotes()
    },[])

    function handleSubmit(e){
      e.preventDefault()
      const {title,description} = e.target.elements

      axios.post("https://sheryians-backend-1-vdj5.onrender.com//api/notes",{
        title: title.value,
        description : description.value
      })
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })
    }

    function handleDelete(noteId){

      axios.delete("https://sheryians-backend-1-vdj5.onrender.com//api/notes/"+noteId)
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })

    }

    return (
      <>
        
        <form className='note-create-form' onSubmit={handleSubmit}>
          <input name="title" type="text" placeholder='Enter title'/>
          <input name="description" type="text" placeholder='Enter description'/>
          <button >Create note </button>
        </form>
         
        <div className="notes">
          {
            notes.map(note =>{
              return <div className="note">
                        <h1>{note.title}</h1>
                        <p>{note.description}</p>
                        <button onClick={()=>{handleDelete(note._id)}}>delete</button>
                     </div>
            })
          }
          
        </div>
      </>
    )
}

export default App
