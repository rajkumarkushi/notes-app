// import NoteContext from "./noteContext";
// import { useState } from "react";

// const NoteState = (props) => {
//   const host = "http://localhost:5000"
//   const notesInitial = []
//   const [notes, setNotes] = useState(notesInitial)

//   // Get all Notes
//   const getNotes = async () => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//       }
//     });
//     const json = await response.json() 
//     setNotes(json)
//   }

//   // Add a Note
//   const addNote = async (title, description, tag) => {
//     // TODO: API Call
//     // API Call 
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//       },
//       body: JSON.stringify({title, description, tag})
//     });

//     const note = await response.json();
//     setNotes(notes.concat(note))
//   }

//   // Delete a Note
//   const deleteNote = async (id) => {
//     // API Call
//     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//       }
//     });
//     const json = response.json(); 
//     const newNotes = notes.filter((note) => { return note._id !== id })
//     setNotes(newNotes)
//   }

//   // Edit a Note
//   const editNote = async (id, title, description, tag) => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//       },
//       body: JSON.stringify({title, description, tag})
//     });
//     const json = await response.json(); 

//      let newNotes = JSON.parse(JSON.stringify(notes))
//     // Logic to edit in client
//     for (let index = 0; index < newNotes.length; index++) {
//       const element = newNotes[index];
//       if (element._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag; 
//         break; 
//       }
//     }  
//     setNotes(newNotes);
//   }

//   return (
//     <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//       {props.children}
//     </NoteContext.Provider>
//   )

// }
// export default NoteState;

import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
 const host="http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Get all notes
const getNotes =async () => {
  //API call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      "Content-Type": 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YThhNDQ3N2M3ZGI2NmQ0YWI2ZmYyIn0sImlhdCI6MTcyMDM1NTM5Nn0.rdNRI5VSmUro_-WlJakSCP2Rqor_bCcpxusaodennfU"
    },
    }) ;
       const json=await response.json()
       console.log(json)
       setNotes(json)//by this only we can see the fetched notes in  Ui
    }
  
// // Add a note
//     const addNote = async (title, description, tag) => {
//         try {
//             const response = await fetch(`${host}/api/notes/addnote`, {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": 'application/json',
//                     "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YThhNDQ3N2M3ZGI2NmQ0YWI2ZmYyIn0sImlhdCI6MTcyMDM1NTM5Nn0.rdNRI5VSmUro_-WlJakSCP2Rqor_bCcpxusaodennfU"
//                   },
//                 body: JSON.stringify({ title, description, tag })
//             });

//             const json = await response.json();
//             if (response.ok) {
//                 setNotes(notes.concat(json)); // Assuming the backend returns the newly created note
//             } else {
//                 console.error("Failed to add note:", json);
//             }
//         } catch (error) {
//             console.error("Error adding note:", error);
//         }
//     };

   

  //Add a note 
const addNote =async (title, description, tag) => {
//API call
const response = await fetch(`${host}/api/notes/addnote`, {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json',
    "auth-token":localStorage.getItem('token')
    // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YThhNDQ3N2M3ZGI2NmQ0YWI2ZmYyIn0sImlhdCI6MTcyMDM1NTM5Nn0.rdNRI5VSmUro_-WlJakSCP2Rqor_bCcpxusaodennfU"
  },
   body: JSON.stringify({title, description, tag})
  }) ;
      // const json= response.json();
    const note=await response.json();
    setNotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote = async(id) => {
 //API call
 const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: 'DELETE',
  headers: {
    "Content-Type": 'application/json',
    "auth-token":localStorage.getItem('token')
    // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YThhNDQ3N2M3ZGI2NmQ0YWI2ZmYyIn0sImlhdCI6MTcyMDM1NTM5Nn0.rdNRI5VSmUro_-WlJakSCP2Rqor_bCcpxusaodennfU"
  },
  }) ;
      const json= response.json();
      console.log(json)


    console.log("deleting note with id" + id);
    const newNotes = notes.filter((note) => { return note._id != id });
    setNotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "auth-token":localStorage.getItem('token')

        // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YThhNDQ3N2M3ZGI2NmQ0YWI2ZmYyIn0sImlhdCI6MTcyMDM1NTM5Nn0.rdNRI5VSmUro_-WlJakSCP2Rqor_bCcpxusaodennfU"
      },
       body: JSON.stringify({title, description, tag})
      }) ;
          const json= response.json();

          let newNotes = JSON.parse(JSON.stringify(notes))
  //logic to edit in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag; 
      break; 
    }
  }
  setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {
        props.children
      }
    </NoteContext.Provider>
  )
}

export default NoteState;