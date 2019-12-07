import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import AuthPage from './components/AuthPage';
import HomeView from './components/HomeView';
import PetView from './components/PetView';
import PetViewForm from './components/PetViewForm';

import './styles/base.scss';

function App() {

  const pets = useSelector(state => state.pets);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/login' component={AuthPage} />
          <Route exact path='/' component={HomeView} />
          <Route path='/pet/:id' component={PetView} />
          <Route path='/add' render={() => <PetViewForm action="add" />} />
          <Route path='/edit/:petId' render={ () => <PetViewForm action="edit" />
          } />
          {/* 
          <ProtectedRoute exact path='/'>
            <HomeView></HomeView>
          </ProtectedRoute>
           */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
