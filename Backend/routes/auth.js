const express = require('express') //importing express
const User = require('../Models/User')
const router = express.Router()//creating a new router using express
const { body, validationResult } = require('express-validator')
const fetchuser=require('../middleware/fetchuser')
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
const JWT_SECRET='raj is a good boy'



// router.post('/',(req,res)=>{
//       console.log(req.body) ;
//       const user =User(req.body);
//       user.save(); 
//       res.send(req.body);
// })
//1.create a USER using "/api/auth/createuser ,doesnt require auth
router.post('/createuser', [
     body('name','enter a valid name').isLength({ min: 3 }), 
     body('email','enter a valid email').isEmail(),
     body('password','passwordmust be atleast 5 characters').isLength({ min: 5 }),
    ], async (req, res) => {
        let success=false;

        //if there are errors return bad request and errors
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success,errors:errors.array()})
        } 
    try{
         //check whether email exists already
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error:'sorry a user with this email already exists'})
        }
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt)

       //create a new user
         user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);

        success=true
         res.json({success, authtoken:authtoken});
        //res.json(user)

    }catch(error){
        console.error(error.message);
        res.status(500).send('some error occured')

    }
    
       // console.log(req.body)  we can see whatever we write in request body of thunderclient,o/p can seen in terminal 
       // const user = User(req.body);it will send the data which we gave in request body to mongodatabase
       // user.save()
        // res.send(req.body)sends the request body back as response

        //    res.send('hello')  //we can see the response with hello in thunderclient
    })

  // 2. authenticate a a USER using "/api/auth/createuser ,doesnt require auth

  router.post('/login', [
    body('email','enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
   ], async (req, res) => {   
    //if there are errors,return bad request and errors;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    } 
    const {email,password}=req.body;
    try{
     let user=await User.findOne({email});
     if(!user){
        return res.status(400).json({error:"please try to login with correct credentials"})
     }
     const  passwordCompare=await bcrypt.compare(password,user.password);//it will compare with the password u given in request body and the password stored in mongodb with email(User.findOne({email})).
     if(!passwordCompare){
       let success=false;
        return res.status(400).json({success,error:"please try to login with correct credentials"})
     }

     const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
     res.json({success,authtoken});

    }catch(error){
        console.error(error.message);
        res.status(500).send('some internal server error occured')

    }
   }


);

     // 2. get loggedin user details using USER post: "/api/auth/getuser, login required ;
    //  router.post('/getuser',fetchuser,async(req,res)=>{
    //     try{
    //     userId=req.user.id;
    //     const user=await user.findById(userId).select("-password")
    //     }catch(error){
    //         console.log(error.message);
    //         res.status(500).send('internal server error')
    //     }
    // })

     // 2. get loggedin user details using USER post: "/api/auth/getuser, login required ;
// in this when u enter authtoken in request header ,it will show the existing details of user with that token
    router.post('/getuser', fetchuser, async(req, res) => {
        try {
          const userId = req.user.id;
          const user = await User.findById(userId).select('-password');
          res.json(user);
        } catch (error) { 
          console.error(error.message);
          res.status(500).send('Internal server error');
        }
      });

module.exports = router