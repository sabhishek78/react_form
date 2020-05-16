import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import EnquiryForm from "./EnquiryForm";
import LoginSignUp from "./loginSignUp";



import {BrowserRouter as Router,Link,Switch,Route,useHistory} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


function App() {
     const [loginStatus,updateLoginStatus]=useState("");
   let history=useHistory();
    async function logOutUser() {
         console.log("logging out");
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:"include",

        };
        const response = await fetch("http://localhost:8000/logout", requestOptions);
        console.log(response.status);
        if (response.status === 200) {
            history.push("/")
        }
        updateLoginStatus("");
    }
  return (

          <div className="App">
              <AppBar position="static">
                  <Toolbar className="toolBar">
                      <div className="title">
                          <IconButton edge="start"  color="inherit" aria-label="menu">
                              <MenuIcon />
                          </IconButton>
                          <h1>
                              CRM APP
                          </h1>
                      </div>
                      <div>
                          <Button color="inherit" onClick={()=>logOutUser()}>{loginStatus}</Button>
                      </div>

                  </Toolbar>
              </AppBar>
              <Switch>
                  <Route path='/customers' component={EnquiryForm}  />
                  <Route  exact path='/' render={() => <LoginSignUp changeLoginStatus={() => updateLoginStatus("Logout")} />}/>

              </Switch>
          </div>

  );
}



export default App;
