import React from "react";
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SimpleTable from "../Table";
// const baseURL = 'https://cors-anywhere.herokuapp.com/';
 const baseURL='http://localhost:8000';
// const saveURL = baseURL + 'https://us-central1-form-manager-7234f.cloudfunctions.net/saveCustomer';
const saveURL = baseURL + '/customers/add';
// const deleteURL = baseURL + 'https://us-central1-form-manager-7234f.cloudfunctions.net/deleteCustomer';
const deleteURL = baseURL + '/customers/delete'
// const undoDeleteURL = baseURL + 'https://us-central1-form-manager-7234f.cloudfunctions.net/undoDeleteCustomer';
const undoDeleteURL = baseURL + '/customers/undoDelete';
class EnquiryForm extends React.Component {
    state = {
        customerName: '',
        gender:"Male",
        phoneNumber:'',
        isLoading:false,
        customerID:'',
        postRequestMade:false,
        data:[],
        openSnackBar:false,
        deletedCustomer:[],
        deletedCustomerID:'',
        deletedCustomerIDIndex:'',
    };
    componentDidMount() {
         // let data=JSON.parse(localStorage.getItem('userData'));
        //
        //  if(data!==null){
        //     this.setState({
        //         data:data
        //     });
        // }
        this.fetchCustomerData();
    }
    fetchCustomerData=async()=>{
        let resp= await fetch("http://localhost:8000/customers");
        let dataList= await resp.json();
        console.log(dataList);
        this.setState({
            data:dataList??[]
        })
    }

    constructor(props) {
        super(props);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })


    }
     allLetter(inputtxt)
    {   console.log(inputtxt);
        var lettersArray = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ ").split("");
        console.log(lettersArray);
        for(let i=0;i<inputtxt.length;i++){
            if(lettersArray.indexOf(inputtxt[i].toUpperCase())===-1){
                console.log('Not Found='+inputtxt[i]);
                return false;
            }
        }
        console.log("valid name");
        return true;
    }
     phonenumber(inputtxt)
    {
        var numbersArray = ("0123456789").split("");
        for(let i=0;i<inputtxt.length;i++){
            if(numbersArray.indexOf(inputtxt[i])===-1){
                return false;
            }
        }
        return true;
    }
    async makePostRequest() {
        if(!(this.allLetter(this.state.customerName))){
            console.log("invalid name");

            return;
        }
        if(!(this.phonenumber(this.state.phoneNumber))){
            console.log("invalid phone number")
            return;
        }

        this.setState({
            isLoading:true,
            postRequestMade:true,
        });
       console.log("making request");
       const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        const response = await fetch(saveURL, requestOptions);
        const responseJSON = await response.json();
        console.log(responseJSON);
        this.setState({
            isLoading:false,
        });
        let currentUserData={"customerName":this.state.customerName,"gender":this.state.gender,"phoneNumber":this.state.phoneNumber
            ,"customerID":responseJSON['customerID']};
        console.log("current user data="+currentUserData);
       let dataCopy=this.state.data.slice();
        console.log(" previous data local storage="+dataCopy);
        dataCopy.push(currentUserData);
        console.log(" updated data local storage="+dataCopy);
        localStorage.setItem('userData',JSON.stringify(dataCopy));
        this.setState({
            data:dataCopy
        });

    }
      deleteUser=async (customerID)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({customerID: customerID})
        };
        const response = await fetch(deleteURL, requestOptions);
        const responseJSON = await response.json();
        console.log('delete response=');
        console.log(responseJSON);
        this.setState({
            openSnackBar:true,
            deletedCustomerID:customerID,

        })
        console.log("deleting user...");
        console.log(customerID);
       let  dataCopy=this.state.data.slice();
       console.log(dataCopy);
       let newData=[];
       for(let i=0;i<dataCopy.length;i++){
           if(dataCopy[i]['customerID']!==customerID){
             newData.push(dataCopy[i]);
           }
           else if(dataCopy[i]['customerID']===customerID){
               let deletedData=dataCopy[i];
               this.setState({
                   deletedCustomerIDIndex:i,
                   deletedCustomer:deletedData,
               })
           }

       }
          localStorage.setItem('userData',JSON.stringify(newData));
       console.log(newData);
        this.setState({
            data:newData
        });
    }
    undoDelete=async()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({customerID: this.state.deletedCustomerID})
        };
        const response = await fetch(undoDeleteURL, requestOptions);
        const responseJSON = await response.json();
        console.log('Undodelete response=');
        console.log(responseJSON);
        let  dataCopy=this.state.data.slice();
        console.log("data before undo="+dataCopy);
        dataCopy.splice(this.state.deletedCustomerIDIndex,0,this.state.deletedCustomer);
        console.log("data after undo="+dataCopy);
        // localStorage.setItem('userData',JSON.stringify(dataCopy));
        this.setState({
            data:dataCopy,
        });
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
            <div>
                <form>
                    <div>
                        <TextField  label="Name" variant="outlined" type="text" name="customerName" value={this.state.customerName}
                                   onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <Select value={this.state.gender} onChange={this.handleInputChange} name="gender">
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <Input placeholder="Phone Number"  type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange}/>
                    </div>
                </form>
                <Button onClick={()=>{this.makePostRequest()}}>Save Info</Button>
                <div>
                    { this.state.isLoading?<CircularProgress />:<div></div>}
                </div>
                <div>
                    {(this.state.data.length!==0)&&<SimpleTable data={this.state.data} deleteUser={this.deleteUser}/>}
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackBar}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message="User Deleted "
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
            </div>
        );
    }
}

export default EnquiryForm;