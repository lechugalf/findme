import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import NavBar from './components/NavBar';
import HomeView from './components/HomeView';

import './styles/base.scss';


function App(props) {

  const [pets, setPets] = useState([]);
  const [persons, setPersons] = useState([]);

  //didMount
  useEffect(() => {
    props.fetchPets();
    props.fetchPersons();
  }, [])

  //didUpdate
  useEffect(() => {
    setPets(props.pets);
    setPersons(props.persons);
  }, [props.pets, props.persons])

  return (
    <div className="App">
      <NavBar />
      <HomeView pets={pets}/>
      <BrowserRouter>
        <Redirect
          from='/'
          to='/home'
        />
        <Switch>
          <Route
            path='/home'
            exact 
          />
          <Route
            path='/add'
          />
          <Route
            path='/update'
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = ({ pets, persons }) => {
  return {
    pets,
    persons
  };
};

export default connect(mapStateToProps, actions)(App);
