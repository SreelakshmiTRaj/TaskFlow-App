import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    // <div className="navbar">
    <nav className='navbar'>
      <h1 className="title"><img src="/images/note.png" alt="logo" className="logo" />Taskflow</h1>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
        <button className="login">Sign in</button>
    </nav>
      
    // </div>
  )
}

export default Navbar