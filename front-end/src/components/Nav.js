import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMenu, AiFillCloseCircle } from "react-icons/ai"

const Nav = () => {

  const [menu, setMenu] = useState(false)




  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup")
  }
  return (

    <div className='nav'>

      <div className="nam">
        E-Comm
      </div>

      {auth ? <ul id='nav-ul' className={menu ? "#nav-ul active" : "#nav-ul"}>
        <li onClick={() => setMenu(false)}><Link to="/">Products</Link></li>
        <li onClick={() => setMenu(false)}><Link to="/add">Add Product</Link></li>
        <li onClick={() => setMenu(false)}><Link to="/profile">Profile</Link></li>
        <li onClick={() => setMenu(false)}><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
        <div className="mobile" onClick={() => setMenu(!menu)}  >
          {menu ? <AiFillCloseCircle /> : <AiOutlineMenu />}
        </div>
      </ul >
        : <ul className='nav-ul nav-right'>
          <li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div >
  )
}

export default Nav