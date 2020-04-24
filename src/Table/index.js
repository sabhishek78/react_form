import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    table: {
        margin:"auto",
        maxWidth:500,
    },
});



export default function SimpleTable(props) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
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
                    {props.data.map((item,index) => (
                        <TableRow key={index}>
                            <TableCell align="right">{item.customerID}</TableCell>
                            <TableCell align="right">{item.customerName}</TableCell>
                            <TableCell align="right">{item.gender}</TableCell>
                            <TableCell align="right">{item.phoneNumber}</TableCell>
                            <TableCell align="right"><button name='Delete'onClick={()=>props.deleteUser(item.customerID)}> <DeleteIcon /> </button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
