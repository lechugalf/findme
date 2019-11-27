import React from 'react'
import { withRouter } from "react-router-dom";

import '../styles/_NavBar.scss';
const logo = 'corgi.jpg';

function NavBar({ history }) {

  let rightButton = null

  if (history.location.pathname === '/home')
    rightButton = <i
      className="material-icons"
      onClick={() => { history.push('/add') }}
    > add </i>;

  if (history.location.pathname === '/add')
    rightButton = <i
      className="material-icons"
      onClick={() => { history.push('/home') }}
    > close </i>;

  return (
    <nav className="NavBar">
      <i className="material-icons">menu</i>
      <span onClick={() => { history.push('/home') }}>
        <p>FindMe</p>
        <img alt='logo' src={logo} />

      </span>
      {rightButton}
    </nav>

  )
}

export default withRouter(NavBar);