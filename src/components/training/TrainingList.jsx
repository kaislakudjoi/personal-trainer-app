import React from 'react';
import { Button, Box, Stack, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useState, useEffect } from 'react';
import { getTrainings, deleteTraining } from '../../api/trainingApi';
import dayjs from 'dayjs';
import DeleteTrainingDialog from './DeleteTrainingDialog';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// TrainingList component
export function TrainingList() {
    // State to hold the training data
    const [trainings, setTrainings] = useState([]);
    // State to manage the delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // State to hold the training to be deleted
    const [trainingToDelete, setTrainingToDelete] = useState(null);

    // Fetch trainings from the API
    useEffect(() => {
        getTrainings().then(trainingArray => setTrainings(trainingArray));
    }, []);

    // Opens the delete dialog
    const handleDeleteClick = (training) => {
        setTrainingToDelete(training);
        setDeleteDialogOpen(true);
    };

    // Handles the confirmation of deletion
    const handleDeleteConfirm = async (training) => {
        try {
            await deleteTraining(training._links.self.href);  
            setTrainings(await getTrainings());                   
        } catch (error) {
            console.error("Error deleting training:", error);
        } finally {
            setDeleteDialogOpen(false);
            setTrainingToDelete(null);
        }
    };
    
    // Handles the cancellation of deletion
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setTrainingToDelete(null);
    };


    // Column definitions for the AgGrid
    const  columDefs = [
        { field: 'customerName', headerName: 'Customer Name' },
        {
            field: 'date',
            valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY')
        },
        { field: 'duration', headerName: 'Duration (min)' },
        { field: 'activity' },
        {
            headerName: '',
            field: 'actions',
            filter: false,
            sortable: false,
            cellRenderer: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(params.data)}
                >
                    Delete
                </Button>
            )
        }
    ];


    return (
        <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>

            <Stack>
                <Typography variant="h6" >Training list</Typography>
            </Stack>

            {/* AG Grid for displaying the training data */}
            <Box sx={{ width: "80%", height: 700 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columDefs}
                    defaultColDef={{
                        filter: true,
                        floatingFilter: true,
                    }}></AgGridReact>
            </Box>

            {/* Render delete dialog only if a training is selected for deletion */}
            {deleteDialogOpen && (
                <DeleteTrainingDialog
                    training={trainingToDelete}
                    ok={handleDeleteConfirm}
                    cancel={handleDeleteCancel}
                />
            )}
        </Stack>

    );

}