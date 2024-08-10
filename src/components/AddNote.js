import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'


const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
     e.preventDefault()
     addNote(note.title,note.description,note.tag)  ;
     setNote({ title: "", description: "", tag: "" });
     props.showAlert('added successfully','success')

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        console.log(note)
    }
    return (
        <div>
            <h1>Add a Note</h1>
            <div className='container my-3'>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" id="title" name="title" className="form-control" value={note.title} aria-descriptionriptionribedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
