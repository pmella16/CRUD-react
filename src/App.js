import logo from './logo.svg';
import React, { Fragment } from 'react';
import './App.css';

import ListTasks from './components/ListTasks';
import EditTask from './components/EditTask';



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Router>

        <Provider store={store}>

      <div className="container mt-5">

              <Switch>
                  <Route exact path="/" component={ListTasks} />
                  <Route exact path="/tasks/edit/:id" component={EditTask} />
              </Switch>
          </div>

        </Provider>

    </Router>
  );
}

export default App;
