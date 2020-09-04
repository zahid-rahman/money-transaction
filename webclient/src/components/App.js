import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  
  );
}

export default App;
