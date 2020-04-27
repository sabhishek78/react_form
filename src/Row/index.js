import React from "react";
import {Button, CircularProgress, Input, MenuItem, Select, TextField} from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
class Row extends React.Component {
    state = {
        deletePressed: false
    };

    render() {
        return (
            <TableRow >
                <TableCell align="right">{this.props.rowData.customerID}</TableCell>
                <TableCell align="right">{this.props.rowData.customerName}</TableCell>
                <TableCell align="right">{this.props.rowData.gender}</TableCell>
                <TableCell align="right">{this.props.rowData.phoneNumber}</TableCell>
                <TableCell align="right"><button name='Delete'onClick={()=>{
                    this.setState({deletePressed:true})
                    setTimeout(() => {
                        this.props.deleteUser(this.props.rowData.customerID);
                        // this.setState({deletePressed:false});
                        }, 3000);


                }}> {this.state.deletePressed?<CircularProgress/>: <DeleteIcon/>} </button></TableCell>
            </TableRow>
        );
    }
}

export default Row;