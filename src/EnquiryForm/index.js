import React from "react";
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';
import SimpleTable from "../Table";
import ShowSnackBar from "../SnackBar";
class EnquiryForm extends React.Component {
    state = {
        customerName: '',
        gender:"Male",
        phoneNumber:'',
        isLoading:false,
        customerID:'',
        postRequestMade:false,
        data:[],
    };
    componentDidMount() {
        let data=JSON.parse(localStorage.getItem('userData'));
        if(data!==null){
            this.setState({
                data:data
            });
        }
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
    async makePostRequest() {
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
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://us-central1-form-manager-7234f.cloudfunctions.net/saveCustomer', requestOptions);
        const responseJSON = await response.json();
        console.log('responseJSON='+responseJSON);
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
    deleteUser=(customerID)=>{
        console.log("deleting user...");
        console.log(customerID);
       let  dataCopy=this.state.data.slice();
       console.log(dataCopy);
       let newData=[];
       for(let i=0;i<dataCopy.length;i++){
           if(dataCopy[i]['customerID']!==customerID){
             newData.push(dataCopy[i]);
           }
       }
       console.log(newData);
        this.setState({
            data:newData
        });
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
                <div>
                    <ShowSnackBar/>
                </div>
            </div>
        );
    }
}

export default EnquiryForm;