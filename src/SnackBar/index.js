import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
class ShowSnackBar extends React.Component {
    state = {
        showSnackBar:false,
    };
    handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }

       this.setState({
           showSnackBar:false,
       })
    };
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.showSnackBar}
                autoHideDuration={6000}
                onClose={this.handleClose}
                message="Note archived"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={this.handleClose}>
                            UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        );
    }
}

export default ShowSnackBar;