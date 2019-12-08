import React from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../styles/_NavBar.scss';
const logo = '/corgi.jpg';

function NavBar() {

  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);

  let rightButton, leftButton = null;

  if (history.location.pathname === '/') {
    rightButton = <i
      className="material-icons"
      onClick={() => history.push('/add')}
    > add </i>;
    leftButton = <i className="material-icons">menu</i>;
  }

  if (history.location.pathname === '/add') {
    rightButton = <i
      className="material-icons"
      onClick={() => history.push('/')}
    > close </i>;
    leftButton = <i className="material-icons">menu</i>;
  }

  if (history.location.pathname.includes('/edit')) {
    rightButton = <i
      className="material-icons"
      onClick={() => history.push('/')}
    > close </i>;
    leftButton = <i className="material-icons">menu</i>;
  }

  if (history.location.pathname.includes('/pet/')) {
    rightButton = <i
      className="material-icons"
      onClick={() => history.push('/')}
    > share </i>;
    leftButton = <i
      className="material-icons"
      onClick={() => history.push('/')}
    > arrow_back</i>;
  }

  return (
    <nav className="NavBar">
      {leftButton}
      <span onClick={() => { history.push('/') }}>
        <p>FindMe</p>
        <img alt='logo' src={logo} />
      </span>
      {rightButton}
    </nav>
  )
}

export default NavBar;