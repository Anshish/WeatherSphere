import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="navbar-left">
            <div className="navbar-logo">
                <img src="../../images/sun.png" alt="logo" />
            </div>
            <h2 className='navbar-title'>Weather Sphere</h2>
            
        </div>
        <div className="navbar-right">
            <ul>
                <a href="">
                    <li>Home</li>
                </a>
                <a href="">
                    <li>About</li>
                </a>
                <a href="">
                    <li>Contact</li>
                </a>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar