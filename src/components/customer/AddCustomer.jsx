import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';

// AddCustomer component
export default function AddCustomer({ saveCustomer }) {
    // State to manage the dialog open/close state and customer data
    const [open, setOpen] = useState(false);
    // State to hold customer data
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    // State to control snackbar visibility
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Function to handle opening the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };

    // Function to handle adding a new customer
    const addCustomer = () => {
        // Basic form validation
        if (!customer.firstname || !customer.lastname || !customer.streetaddress || !customer.postcode || !customer.city || !customer.email || !customer.phone) {
            alert("Please fill in all fields");
            return;
        }
        // Save the customer data
        saveCustomer(customer);
        // Show snackbar notification
        setSnackbarOpen(true);
        // Close the dialog
        handleClose();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            {/* Button to open customer dialog */}
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{
                    color: '#FFB6C1',
                    borderColor: '#FFB6C1',
                    '&:hover': {
                        backgroundColor: '#FFB6C1',
                        color: 'white',
                    },
                }}
            >
                Add customer
            </Button>
            {/* Dialog containing form fields */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    {/* Each TextField handles a specific customer property */}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        label="First Name"
                        value={customer.firstname}
                        type="text"
                        onChange={handleInputChange}
                    ></TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lastname"
                        label="Last Name"
                        value={customer.lastname}
                        type="text"
                        onChange={handleInputChange}
                    ></TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="streetaddress"
                        label="Street Address"
                        value={customer.streetaddress}
                        type="text"
                        onChange={handleInputChange}
                    ></TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="postcode"
                        label="Postcode"
                        value={customer.postcode}
                        type="text"
                        onChange={handleInputChange}
                    ></TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        label="City"
                        value={customer.city}
                        type="text"
                        onChange={handleInputChange}
                        ></TextField>
                        <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email"
                        value={customer.email}
                        type="email"
                        onChange={handleInputChange}
                        ></TextField>
                        <TextField
                        autoFocus 
                        margin="dense"
                        name="phone"
                        label="Phone"
                        value={customer.phone}
                        type="number"
                        onChange={handleInputChange}
                        ></TextField>
                </DialogContent>

                {/* Dialog action buttons */}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCustomer}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar notification after successful add */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Customer added successfully!
                </Alert>
            </Snackbar>


        </div>
    )
}