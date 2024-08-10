import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:"" });
    const navigate = useNavigate(); // Use useNavigate instead of useHistory



    const handleSubmit = async (e) => {
        const {name,email,password}=credentials
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name,email,password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert('account created successfully','success')

            navigate("/"); //it will redirect to home page after successful signup

        }else{
         props.showAlert('invalid credentials','danger')
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
      <div className='mt-2'>
      <h2 className='my-2'>Create an account to use iNotebook</h2>
      <form  onSubmit={handleSubmit}>
  <div className='my-3'>
    <label htmlFor="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
  </div>
 < div class="mb-3">
    <label htmlFor="name" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" name="password" onChange={onChange} id="exampleInputPassword1" minLength={5} required/>
  </div>
  <div class="mb-3">
    <label htmlFor="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" name="cpassword" id="cpassword"  onChange={onChange} minLength={5} required/>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
