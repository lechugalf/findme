import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'; 
import { createStore, combineReducers, compose } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';
import App from './App';
import FirebaseConfig from './config/firebaseConfig';
import * as serviceWorker from './serviceWorker';

const rrfConfig = {
    userProfile: 'users',
    presence: 'presence',
    sessions: 'sessions',
}

firebase.initializeApp(FirebaseConfig);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
});

const initialState = {}
const store = createStore(rootReducer, initialState);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
