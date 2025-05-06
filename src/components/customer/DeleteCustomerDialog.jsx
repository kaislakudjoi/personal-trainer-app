
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// DeleteCustomerDialog component
export default function DeleteCustomerDialog({customer, ok, cancel}) {
    
    return (
    <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
            Delete customer?
        </DialogTitle>
         {/* Confirmation message */}
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete customer {customer.firstname} {customer.lastname}?
            </DialogContentText>
        </DialogContent>
        {/* Action buttons */}
        <DialogActions>
            {/* Cancel button */}
            <Button
                onClick={() => cancel()}
                variant="outlined">
                Cancel
            </Button>
            {/* Delete button */}
            <Button
                onClick={() => ok(customer)}
                autoFocus
                color="error"
                variant="outlined"
            >
                Delete
            </Button>
        </DialogActions>
    </Dialog>
    );}