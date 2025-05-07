
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { addTraining } from '../../api/trainingApi';
 
// AddTrainingToCustomer component
export default function AddTrainingToCustomer ({customer, onClose, onTrainingAdded}) {
    // State to hold the training data
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
    });
 
    // State to manage snackbar visibility
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value });
    };
 
    // Handle save action
    const handleSave = async () => {
        try {
            // Calls the API to add the new training, including a reference to the customer
            await addTraining({
                ...training,
                customer: customer._links.customer.href
            });

            setSnackbarOpen(true);
            onTrainingAdded();
        } catch (error) {
            console.error("Error adding training:", error);
        }
    };
 
    return (
        <>
            <Dialog open={true} onClose={onClose}>
                <DialogTitle>Add Training to {customer.firstname} {customer.lastname}</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={training.date}
                        type="date"
                        onChange={handleChange}
                    ></TextField>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={handleChange}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={handleChange}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={onClose}
                    sx={{
                        color: '#FFB6C1'
                    }}
                    >Cancel</Button>
                    <Button 
                    onClick={handleSave}
                    sx={{
                        color: '#8B0000'
                    }}
                    >Add</Button>
                </DialogActions>
            </Dialog>
 
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                    Training added successfully!
                </Alert>
            </Snackbar>
        </>
    );
 
}