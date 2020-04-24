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
import Row from "../Row";

class SimpleTable extends React.Component {

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
                           <Row rowData={this.props.data[index]} deleteUser={this.props.deleteUser}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }


}
export default SimpleTable;
