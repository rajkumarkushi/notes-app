import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("deleted notes successfully",'success')} } ></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem


// import React,{useContext} from 'react';
// import NoteContext from '../context/notes/noteContext'



// const NoteItem = (props) => {
//   const context =useContext(NoteContext)
//     const {deleteNote}=context
//     const { note,updateNote } = props;
//     return (
//         <div className='col-md-3'>
//             <div className="card my-3">
//                 <div className="card-body">
//                   <div className="d-flex align-items-center">
//                   <h5 className="card-title">{note.title}</h5>
//                     <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
//                     <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
//                   </div>     
//                     <p className="card-text">{note.description} lorem ipsum nofds doctenet nohf htfds</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NoteItem;

// // import React from 'react'

// // const NoteItem = (props) => {
// //     const {note}=props
// //   return (
// //     <div className='col-md-3'>
// //       <div classname="card my-3">
// //   <div classname="card-body">
// //     <h5 classname="card-title">{note.title }  </h5>
// //     <i classname="fa-solid fa-trash mx-2"></i>
// //     <i classname="fa-regular fa-pen-to-square mx-2"></i>

  
// //     <p classname="card-text">{note.description}  lorem ipsum nofds doctenet nohf htfds
// //     </p>
   
// //   </div>
// // </div>
// //     </div>
// //   )
// // }

// // export default NoteItem
