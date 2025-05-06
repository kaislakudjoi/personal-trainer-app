
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// DeleteTrainingDialog component
export default function DeleteTrainingDialog({training, ok, cancel}) {
    
    return (
    // Dialog for confirming deletion of training
    <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
            Delete training?
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete training {training.activity} {training.duration}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {/* Cancel button */}
            <Button
                onClick={() => cancel()}
                variant="outlined">
                Cancel
            </Button>
            {/* Delete button */}
            <Button
                onClick={() => ok(training)}
                autoFocus
                color="error"
                variant="outlined"
            >
                Delete
            </Button>
        </DialogActions>
    </Dialog>
    );}