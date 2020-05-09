import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import EnquiryForm from "./EnquiryForm";
import LoginSignUp from "./loginSignUp";
import { createBrowserHistory } from 'history';


import {BrowserRouter as Router,Link,Switch,Route} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function App() {
    // const [loginStatus,updateLoginStatus]=useState("login");
  return (
      <Router>
          <div className="App">
              <AppBar position="static">
                  <Toolbar>
                      <IconButton edge="start"  color="inherit" aria-label="menu">
                          <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" >
                          CRM APP
                      </Typography>
                      <Button color="inherit">Login</Button>
                  </Toolbar>
              </AppBar>
              <Switch>
                  <Route path='/customers' component={EnquiryForm}  />
                  <Route  exact path='/' render={() => <LoginSignUp  />}/>

              </Switch>
          </div>
      </Router>
  );
}


export default App;
