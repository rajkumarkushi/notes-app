const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../Models/Notes')
const { body, validationResult } = require('express-validator')



//route:1 Get all the notes using:GET "api/notes/fetchallnotes".login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('some internal server error occured')

    }

    // obj={
    //     a:'this',
    //     numbewr:344
    // }
    // res.json(obj)
})

//route:2 add a new notes  using:POST  "api/notes/fetchallnotes".login required
//we have to enter authtoken in request header,and we have to add title,desc,and tag in request body and that notes will add to corresponding user with that auth-token
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid name').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //if there are errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('some internal server error occured')

    }

})

//route:3 update an existing note using:POST  "api/notes/updatenote".login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create an empty object for new notes
    const newNote = {};
    if (title) {
        newNote.title = title
    } if (description) {
        newNote.description = description
    } if (tag) {
        newNote.tag = tag
    }
    //find note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send('not found')
    }

    if (note.user.toString() != req.user.id) {
        return res.status(401).send('not allowed');
    };
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
})

//route:4 delete an existing note using:Delete "api/notes/updatenote".login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    //find a note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send('not found')
    }
    if (note.user.toString() != req.user.id) {
        return res.status(401).send('not allowed');
    };
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ 'success':"note has been deleted",note:note })
})

module.exports = router