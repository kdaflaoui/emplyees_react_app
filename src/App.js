import React from 'react';
import './App.css';
import Home from './components/Home';
import Department from './components/Department';
import Employee from './components/Employee';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Menu from './components/Menu';


function App() {
  return (
    <BrowserRouter>
        <div className="container">
          <Menu />

          <h3 className="m-3 d-flex justify-content-center">React JS with web api as source of data</h3>
          <h5 className="m-3 d-flex justify-content-center">Employee Management Portal</h5>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/department" component={Department} />
            <Route path="/employee" component={Employee} />
          </Switch>

        {/*
                <Home />
        <Department />
        <Employee />
        */}

    </div>
    </BrowserRouter>

  );
}

export default App;
