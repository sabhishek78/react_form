import React from "react";
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { CircularProgress} from '@material-ui/core';
class EnquiryForm extends React.Component {
    state = {
        customerName: '',
        gender:"Male",
        phoneNumber:'',
        isLoading:false,
    };

    constructor(props) {
        super(props);
        // this.handelNameChange = this.handelNameChange.bind(this);
        // this.handleGenderChange = this.handleGenderChange.bind(this);
        // this.handlephoneNumber = this.handlephoneNumber.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);

    }


    // handelNameChange(event) {
    //     this.setState({
    //         customerName: event.target.value
    //     });
    // }
    // handleGenderChange(event){
    //     this.setState({
    //         gender: event.target.value
    //     });
    // }
    // handlePhoneNumber(event) {
    //     const value = event.target.value.replace(/\+|-/ig, '');
    //     this.setState({phoneNumber: value});
    // }
    handleInputChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    async makePostRequest() {
        this.setState({
            isLoading:true,
        });
       console.log("making request");
       const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', requestOptions);
        const data = await response.json();
        console.log(data);
        this.setState({
            isLoading:false,
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


            </div>
        );
    }
}

export default EnquiryForm;