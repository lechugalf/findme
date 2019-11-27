import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import NavBar from './components/NavBar';
import HomeView from './components/HomeView';
import PetForm from './components/PetForm';

import './styles/base.scss';


function App(props) {

  const [pets, setPets] = useState([]);
  const [persons, setPersons] = useState([]);
  const [selLocation, setSelLocation] = useState([0, 0]);

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

  //getMapLocation
  const onClickMap = (e) => {
    setSelLocation(e.latLng);
    console.log(selLocation);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Redirect
          from='/'
          to='/home'
        />
        <Switch>
          <Route
            path='/home'
            exact
            render={() => <HomeView pets={pets} onClickMap={onClickMap} />}
          />
          <Route
            path='/add'
            render={() => 
              <PetForm 
                selectLoc={selLocation}
                action={'add'}
                onClickMap={onClickMap} 
              />
            }
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
