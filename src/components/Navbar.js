import React from 'react'
import { Link,useLocation} from 'react-router-dom'
import '../App.css';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }

   let location = useLocation()
  // useEffect(() => {
  //   console.log(location.pathname)
  // })
  return (
    <div>
      <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">iNotebook</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} aria-current="page" to="/home">Home</Link>
              </li>
              <li class="nav-item">
                <Link class={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
              </li>
              
            </ul>
            {!localStorage.getItem('token')  ? <form class="d-flex" role="search">
             <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form>:<button onClick={handleLogout} className='btn btn-primary'>Log out</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar

