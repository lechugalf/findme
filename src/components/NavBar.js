import React from 'react'
import '../styles/_NavBar.scss';

const logo = 'corgi.jpg';

function NavBar() {

  return (
    <nav className="NavBar">
      <i className="material-icons">menu</i>
      <span>
        <p>FindMe</p>
        <img alt='logo' src={logo}/>
      </span>
      <i className="material-icons">my_location</i>
    </nav>

  )
}

export default NavBar;