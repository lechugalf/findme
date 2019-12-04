import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from './components/NavBar';
import HomeView from './components/HomeView';
import PetViewForm from './components/PetViewForm';
import PetView from './components/PetView';

import './styles/base.scss';

function App() {

  const pets = useSelector(state => state.pets);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomeView} />
          <Route path='/pet/:id' component={PetView} />
          <Route path='/add' render={() => <PetViewForm action="add" />} />
          <Route path='/edit/:id' render={
            (props) => <PetViewForm action="edit" pet={pets[props.match.params.id]} petId={props.match.params.id}/>
          } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
