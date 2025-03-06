import React, { useState } from 'react'
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Doctor from '../../types/Doctor';
import { Container, Typography, Paper, Box, Button, IconButton, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { Edit, Delete } from '@mui/icons-material';

const DoctorIndex = () => {
    const paginationModel = {page:0, pageSize:25}
    const [deleteDialog, setDeleteDialog]=useState(false)
    const [selectedDoctor, setSelectedDoctor]= useState<Doctor | null>(null)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const token = sessionStorage.getItem("Authorization");
    
    const deleteDoctorById = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/doctor/${id}`,{
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`
                }
            });
            return response.status; // Return status on success
        } catch (error: any) {
            if (error.response?.status === 403) {
                alert("Unauthorized to delete. Only Department users have access.")
                throw new Error("Unauthorized access. You do not have permission to delete this car.");
            }
            
        }
    }
    const deleteMutation = useMutation({
        mutationFn: deleteDoctorById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"] }); // ✅ Ensure correct queryKey
            setDeleteDialog(false);
        }
     })

    const handleDelete = (doc: Doctor) => {
        setSelectedDoctor(doc)
        setDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        if (selectedDoctor) {
            deleteMutation.mutate(selectedDoctor.doctor_id)
        }
    }
    
    const columns: GridColDef[] =[
        {
            field:'doctor_id',
            headerName:"ID",
            minWidth:70,
            flex:1
        },
        {
            field:'first_name',
            headerName:"First Name",
            minWidth:100,
            flex:1
        },
        {
            field:'last_name',
            headerName:"Last Name",
            minWidth:100,
            flex:1
        },
        {
            field:'phone_number',
            headerName:"Phone Number",
            minWidth:100,
            flex:1
        },
        {
            field:'email',
            headerName:"Email",
            minWidth:100,
            flex:1
        },
        {
            field:'specialization',
            headerName:"Specialization",
            minWidth:100,
            flex:1
        }
    ];
    if(token!=null){
        columns.push(
            {
                field: 'actions',
                headerName: "Actions",
                minWidth: 120,
                flex: 1,
                renderCell:(param) => (
                    <Stack direction ="row" spacing ={1}>
                        <IconButton
                            size ="small"
                            onClick={() => navigate ("/update-doctor/"+param.row.id, {state:param.row})}
                            color = "inherit"
                            >
                                <Edit fontSize = "small"/>
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(param.row)}
                            color="error"
                            >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Stack>
                )
            }
        )
    }
    
    const getAllDoctors = async() =>{
        const request = await axios.get("http://localhost:8080/api/doctor/all")
        const response= await request.data
        console.table(response)
        return response
    }
    const{data, error, isLoading} = useQuery<Doctor[],Error>({
        queryKey:['doctors'],
        queryFn: getAllDoctors
    });
     // Handling loading state
    if (isLoading) {
        return <p>Loading Doctors Information...</p>;
    }

    // Handling error state
    if (error) {
        return <p>Error fetching Doctors list: {error.message}</p>;
    };
    
  return (
    <>
        <Container>
            <Typography variant="h5" className="page-title">
                 Doctors Index
            </Typography>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row.doctor_id} // 🔹 This tells DataGrid to use doctor_id as the row ID
                    initialState={{ pagination: { paginationModel } }}
                    sx={{ border: 0 }}
                    />
                </Paper>
                { token?.length > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%", mb: 2 }}>
                            <Button
                                component={Link}
                                to="/create-doctor"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#009688", // Teal button
                                    color: "white",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    margin:"20px",
                                    borderRadius: "8px",
                                    "&:hover": {
                                        backgroundColor: "white" // white on hover
                                    }
                                }}
                            >
                                Register a new Doctor
                            </Button>
                    </Box> 
                )}
                <Dialog open={deleteDialog} onClose= {() => setDeleteDialog(false)}>
                       <DialogTitle>
                            Confirm Delete
                       </DialogTitle>
                       <DialogContent>
                            Are you sure you want to delete this doctor?
                       </DialogContent>
                       <DialogActions>
                            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
                            <Button
                                    onClick={handleDeleteConfirm}
                                    color="error"
                                    variant="contained"
                                    disabled={deleteMutation.isPending}
                                    >
                                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </Button>
                       </DialogActions>
                </Dialog>   
        </Container>
    </>
  )
}
export default DoctorIndex;