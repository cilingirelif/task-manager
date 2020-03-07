import React from 'react';
import './App.css';
import { Router, Route } from "react-router-dom";
import history from "./history.js";

import Login from "./screens/Login";
import Home from "./screens/Home";
import AddProject from "./screens/AddProject";
import Project from "./screens/Project";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" component={Login} exact={true} />
        <Route path="/home"  render={props => <Home {...props} />} exact={true} />
        <Route path="/add-project"  render={props => <AddProject {...props} />} exact={true} />
        <Route path="/project/:id"  render={props => <Project {...props} />} exact={true} />
      </Router>
    </div>
  );
}

export default App;
