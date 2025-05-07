import { Dialog, TextField, DialogContent, DialogActions, DialogTitle, Button } from "@mui/material";
import React from "react";
 
// EditCustomer component
export default function EditCustomer({ customer, saveCustomer, onClose}){
    // State to hold customer data
    const [customerState, setCustomerState] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });
 
    // Effect to set the customer data 
    React.useEffect(() => {
        if (customer) {
           setCustomerState({
                firstname: customer.firstname || '',
                lastname: customer.lastname || '',
                streetaddress: customer.streetaddress || '',
                postcode: customer.postcode || '',
                city: customer.city || '',
                email: customer.email || '',
                phone: customer.phone || ''
            });
           }
        
    }, [customer]);
 
    // Function to handle input changes
    const handleInputChange = (e) => {
        setCustomerState({
            ...customerState,
            [e.target.name]: e.target.value
        });
    };
 
    // Function to handle saving the customer
    const handleSave = () => {
        const updatedCustomer = { ...customer, ...customerState };
        saveCustomer(updatedCustomer);
        onClose();
    };
 
    return (
        // Dialog to edit customer
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Edit customer</DialogTitle>
            <DialogContent>
                {/* Individual text fields for each customer property */}

                <TextField
                    autoFocus
                    margin="dense"
                    name='firstname'
                    value={customerState.firstname}
                    onChange={e => handleInputChange(e)}
                    label="Firstname"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='lastname'
                    value={customerState.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Lastname"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='streetaddress'
                    value={customerState.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Street Address"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='postcode'
                    value={customerState.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Postcode"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='city'
                    value={customerState.city}
                    onChange={e => handleInputChange(e)}
                    label="City"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='email'
                    value={customerState.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='phone'
                    value={customerState.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                {/* Cancel and Save buttons */}
                <Button 
                onClick={onClose} 
                color="primary"
                sx={{
                    color: '#FFB6C1'
                }}
                >Cancel
                </Button>
                <Button 
                onClick={() => handleSave()} 
                color="primary"
                sx={{
                    color: '#8B0000'
                }}
                >Save
                </Button>
            </DialogActions>
        </Dialog>
    );
 
}