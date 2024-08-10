import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context; 
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            navigate("/"); //it will redirect to home page after successful signup
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert('updated successfully','success')

    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert}  updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes



// import React, { useEffect, useRef, useState } from 'react'
// import { useContext } from 'react'
// import Noteitem from './Noteitem';
// import Addnote from './AddNote'
// import NoteContext from '../context/notes/noteContext'


// const Notes = () => {
//   const context = useContext(NoteContext)
//   const { notes, getNotes } = context

//   const ref = useRef(null)
//   const [note, setNote,editNote] = useState({ etitle: "", edescription: "", etag: "" });



//   useEffect(() => {
//     getNotes();
//   }, [])

//   const updateNote = (currentNote) => {
//     ref.current.click()
//     setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
//   }

//   // const handleClick = (e) => {
//   //   e.preventDefault()

//   //   console.log('updating note' ,note)
//   // }

//   const handleClick = (e) => {
//     e.preventDefault();
//     // Add your update logic here
//     console.log('Updating note:', note);
// };

//   const onChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value })
//     console.log(note)
//   }
//   return (
//     <>
//       <Addnote />
//       <button type="button" ref={ref} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
//   Launch demo modal
// </button>
//       <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
//               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//               <form>
//                 <div class="mb-3">
//                   <label htmlFor="title" class="form-label">Title</label>
//                   <input type="text" id="etitle" name="etitle" value={note.etitle} class="form-control" aria-description="emailHelp" onChange={onChange} />
//                 </div>
//                 <div class="mb-3">
//                   <label htmlFor="description" class="form-label">Description</label>
//                   <input type="text" class="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} />
//                 </div>
//                 <div class="mb-3">
//                   <label htmlFor="tag" class="form-label">tag</label>
//                   <input type="text" class="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
//                 </div>
//               </form>
//             </div>
//             <div class="modal-footer">
//               <button type="button" ref={ref} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class='row my-3'>
//         <h2>Your Notes</h2>
//         {notes.map((note) => {
//           return <Noteitem key={note._id} updateNote={updateNote} note={note} />
//         })}
//       </div>
//     </>
//   )
// }

// export default Notes
