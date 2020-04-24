import React, {useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';






class SimpleTable extends React.Component {
    state = {
        deletePressed:false,
    };
    render() {
        return (
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">CustomerID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">PhoneNumber</TableCell>
                            <TableCell align="right">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data.map((item,index) => (
                            <TableRow key={index}>
                                <TableCell align="right">{item.customerID}</TableCell>
                                <TableCell align="right">{item.customerName}</TableCell>
                                <TableCell align="right">{item.gender}</TableCell>
                                <TableCell align="right">{item.phoneNumber}</TableCell>
                                <TableCell align="right"><button name='Delete'onClick={()=>{
                                    this.setState({deletePressed:true})
                                    setTimeout(() => {
                                        this.props.deleteUser(item.customerID);
                                    }, 5000);
                                }}> {this.state.deletePressed?<CircularProgress/>: <DeleteIcon/>} </button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }


}
export default SimpleTable;
