import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Box, Stack, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { getCustomers, addCustomer, updateCustomer } from '../../api/customerApi';
import AddCustomer from './AddCustomer';
import DeleteCustomerDialog from './DeleteCustomerDialog';
import EditCustomer from './EditCustomer';
import AddTrainingToCustomer from '../training/AddTrainingToCustomer';
import { deleteCustomer } from '../../api/customerApi';


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// CustomerList component
export function CustomerList() {
    // State to hold the customer data
    const [customers, setCustomers] = useState([]);
    // State to manage the delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // State to hold the customer to be deleted
    const [customerToDelete, setCustomerToDelete] = useState(null);
    // State to manage the edit dialog
    const [editCustomer, setEditCustomer] = useState(null);
    // State to manage the training dialog
    const [trainingCustomer, setTrainingCustomer] = useState(null);

    // Fetch customers from the API
    useEffect(() => {
        getCustomers().then(customerArray => setCustomers(customerArray));
    }, []);

    // Function to save a new customer
    async function saveCustomer(newCustomer) {
        try {
            await addCustomer(newCustomer);               // Save the new customer
            setCustomers(await getCustomers());           // Get the updated customer list from the server
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    }

    // Function to save edited customer
    async function saveEditedCustomer(customer) {
        try {
            await updateCustomer(customer); // Updates the customer§
            setEditCustomer(null);          // Close the edit dialog
            setCustomers(await getCustomers()); // Update the customer list
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    }

    // Opens the delete dialog
    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setDeleteDialogOpen(true);
    };

    // Handles the confirmation of deletion
    const handleDeleteConfirm = async (customer) => {
        try {
            await deleteCustomer(customer._links.self.href);
            setCustomers(await getCustomers());             
        } catch (error) {
            console.error("Error deleting customer:", error);
        } finally {
            setDeleteDialogOpen(false);
            setCustomerToDelete(null);
        }
    };


    // Handles the cancellation of deletion
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
    };

    // Column definitions for the AgGrid
    const columDefs = [
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress' },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' },
        {
            headerName: '',
            field: 'actions',
            filter: false,
            sortable: false,
            cellRenderer: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(params.data)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => setEditCustomer(params.data)}
                    >
                        Edit
                    </Button>

                </Stack>
            )
        },
        {
            headerName: '',
            field: 'action',
            filter: false,
            sortable: false,
            cellRenderer: (params) => (
                <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => setTrainingCustomer(params.data)}
                >
                    Add Training
                </Button>
            )
        }



    ];

    // Export customers to CSV function
    const exportToCSV = () => {
        const filteredCols = columDefs
            .filter(col => col.field && !['actions', 'action'].includes(col.field))
            .map(col => col.field);

        const csvRows = customers.map(cust =>
            filteredCols.map(field => `"${cust[field] || ''}"`).join(',')
        );

        const header = filteredCols.map(field => `"${field}"`).join(',');
        const csvContent = [header, ...csvRows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute('download', 'customers.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    return (
        <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
            <Typography variant="h6">Customers</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 3
                }}
            >

                {/* Add new customer button and form */}
                <AddCustomer saveCustomer={saveCustomer} />

                {/* Export to CSV button */}
                <Button
                    variant="outlined"
                    onClick={exportToCSV}
                    sx={{
                        color: '#FFB6C1',
                        borderColor: '#FFB6C1',
                        '&:hover': {
                            backgroundColor: '#FFB6C1',
                            color: 'white',
                        },
                    }}
                >
                    Export CSV
                </Button>
            </Box>

            {/* Customer table */}
            <Box sx={{ width: "100%", height: 700 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columDefs}
                    defaultColDef={{
                        filter: true,
                        floatingFilter: true,
                    }}></AgGridReact>
            </Box>

            {/* Delete confirmation dialog */}
            {deleteDialogOpen && (
                <DeleteCustomerDialog
                    customer={customerToDelete}
                    ok={handleDeleteConfirm}
                    cancel={handleDeleteCancel}
                />
            )}
            {/* Edit customer dialog */}
            {editCustomer && (
                <EditCustomer
                    customer={editCustomer}
                    saveCustomer={saveEditedCustomer}
                    open={!!editCustomer}
                    onClose={() => setEditCustomer(null)}
                />
            )}

            {/* Add training to customer dialog */}
            {trainingCustomer && (
                <AddTrainingToCustomer
                    customer={trainingCustomer}
                    onClose={() => setTrainingCustomer(null)}
                    onTrainingAdded={() => setTrainingCustomer(null)}
                />
            )}
        </Stack>

    );

}