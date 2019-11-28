import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './actions';

import NavBar from './components/NavBar';
import HomeView from './components/HomeView';
import PetForm from './components/PetForm';
import PetView from './components/PetView';

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
      <Router>
        <NavBar />
        <Switch>
          <Route 
            path='/'
            exact
            render={()=> <HomeView pets={pets} onClickMap={onClickMap} />}
          />
          <Route
            path='/pet/:id'
            render={()=> <PetView pets={pets}/>}
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
        </Switch>
      </Router>
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
