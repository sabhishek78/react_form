import React from "react";


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';
import { BrowserRouter, Route, Link ,Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';





import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';
import SimpleTable from "../Table";
const baseURL='http://localhost:8000';

const loginURL = baseURL + '/users/login';
const signUpURL = baseURL + '/users/signUp';

class LoginSignUp extends React.Component {
    state = {
        customerName: '',
        password:'',
        value:0,
        confirmPassword:'',
        openSnackBar:false,
        data:[],
        status:'',

    };
    constructor(props) {
        super(props);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        this.setState({
            status:'',
            [event.target.name]:event.target.value
        })

    }
   handleChange = (event, newValue) => {
        // console.log("inside handle change");
       this.setState({
           value:newValue,
           status:''
       })
    };
    async signUp(){
        console.log(this.state.customerName);
        console.log(this.state.password);
        console.log(this.state.confirmPassword);
        if(this.state.password!==this.state.confirmPassword){
            this.setState({
                // openSnackBar:true,
                status:'Passwords do not match. Please retry',
            })
        }
        else{
            console.log("making request");
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials:"include",
                body: JSON.stringify(this.state)
            };
            const response = await fetch(signUpURL, requestOptions);
            const responseJSON = await response.json();
            console.log("response is =" + responseJSON);
            this.setState({
                isLoading: false,
            });

            if(responseJSON.status!=="exists"){
                let currentUserData = {
                    "customerName": this.state.customerName,
                    "password": this.state.password,
                    "_id": responseJSON,

                };
                console.log("current user data=" + currentUserData);
                let dataCopy = this.state.data.slice();
                // console.log(" previous data local storage=" + dataCopy);
                dataCopy.push(currentUserData);
                // console.log(" updated data local storage=" + dataCopy);
                // localStorage.setItem('userData', JSON.stringify(dataCopy));
                this.setState({
                    data: dataCopy,
                    status:"Sign Up Successful. Please Login ",
                });
            }
            else{
                console.log("User Already Exists!! Please try Again!!");
                this.setState({
                    status: "User Already Exists!! Please try Again!!"
                });
            }
        }

    }
    async login(){
        console.log("making request");
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:"include",
            body: JSON.stringify(this.state)
        };
        const response = await fetch(loginURL, requestOptions);
        const responseJSON = await response.json();
        console.log("response is =");
        console.log(responseJSON);
        this.setState({
            isLoading: false,
        });
        if(responseJSON.status==="userDoesNotExist"){
            this.setState({
                status:"User Does Not Exist. Please Sign Up ",
            });
        }
        else if(responseJSON.status==="passwordsMatch"){
            this.setState({
                status:"Login Successful ",
            });
             this.props.changeLoginStatus();
            this.props.history.push('/customers');
        }
        else if(responseJSON.status==="passwordsDoNotMatch"){
            this.setState({
                status:"Invalid Password",
            });
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openSnackBar:false,
        })
    }

    render() {
        return (
            <div className={"form"}>
                    <Paper >
                        <Tabs value={this.state.value} onChange={this.handleChange}

                              indicatorColor="primary"
                              textColor="primary"
                              centered
                        >
                            <Tab label="Login" />
                            <Tab label="SignUp" />

                        </Tabs>
                        <div  hidden={this.state.value!==0} className={"panel"}>
                            <h1>Login</h1>
                            <text style={{margin:'10px'}}>Already have an account</text>
                            <TextField style={{margin:'10px'}} label="Name" variant="outlined" type="text" name="customerName" variant="outlined" value={this.state.customerName}
                                       onChange={this.handleInputChange}/>
                            <TextField style={{margin:'10px'}} label="Password" variant="outlined" type="password" name="password" variant="outlined" value={this.state.password}
                                       onChange={this.handleInputChange}/>
                            <Button style={{margin:'10px'}} variant="contained" color="grey" onClick={()=>{this.login()}}>Login</Button>

                        </div>
                        <div  hidden={this.state.value!==1} className={"panel"}>
                            <h1>Signup</h1>
                            <text style={{margin:'10px'}}>Create a new account</text>
                            <TextField style={{margin:'10px'}} label="Name" variant="outlined" type="text" name="customerName" variant="outlined" value={this.state.customerName}
                                       onChange={this.handleInputChange}/>
                            <TextField style={{margin:'10px'}} label="Password" variant="outlined" type="password" name="password" variant="outlined" value={this.state.password}
                                       onChange={this.handleInputChange}/>
                            <TextField style={{margin:'10px'}} label="Confirm Password" variant="outlined" type="password" name="confirmPassword" variant="outlined" value={this.state.confirmPassword}
                                       onChange={this.handleInputChange}/>
                            <Button style={{margin:'10px'}} variant="contained" color="grey" onClick={()=>{this.signUp()}}>Sign Up</Button>
                        </div>
                        <div>{this.state.status}</div>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.state.openSnackBar}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            message="Passwords do not match "
                            action={
                                <React.Fragment>
                                    <Button color="secondary" size="small" onClick={this.undoDelete}>
                                        UNDO
                                    </Button>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                            }
                        />
                    </Paper>
                </div>
        );
    }
}

export default withRouter(LoginSignUp);