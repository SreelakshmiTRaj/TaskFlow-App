import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import './Navbar.css'
const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login')
  }
  return (
    // <div className="navbar">
    <nav className='flex items-center text-2xl font-bold text-white bg-blue-400'>
      <h1 className="text-white font-normal"><img src="/images/note.png" alt="logo" className="lw-8 h-8 mr-2" />Taskflow</h1>
        <ul className='hover:text-white transition-colors font-normal'>
          <li><Link to="/">Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'></Link>Contact us</li>
        </ul>
        <button onClick={handleLoginClick} className="bg-white text-blue-400 px-4 py-2 rounded-lg cursor-pointer transition-colors font-medium">Sign in</button>
    </nav>
    // </div>
  )
}

export default Navbar

