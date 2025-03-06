import React, { useState } from 'react'
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Typography, Paper, Box, Button, IconButton, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Department from '../../types/Department';
import { Link, useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';


const DoctorIndex = () => {
    // dialog/selectedCar is for deleting
    // pagination is for the grid
    const [deleteDialog, setDeleteDialog]=useState(false);
    const [selectedDepartment, setSelectedDepartment]= useState<Department | null>(null);
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const paginationModel = {page:0, pageSize:25}
    const token = sessionStorage.getItem("Authorization");
    // if (!token) {
    //     throw new Error("No authentication token found. Please log in.");
    // }

    const deleteDepartmentById = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/department/${id}`,{
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`
                }
            });
            return response.status; // Return status on success
        } catch (error: any) {
            if (error.response?.status === 403) {
                alert("Unauthorized to delete")
                throw new Error("Unauthorized access. You do not have permission to delete this car.");
            }
            
        }
    }
    const deleteMutation = useMutation({
        mutationFn: deleteDepartmentById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["department"] }); // ✅ Ensure correct queryKey
            setDeleteDialog(false);
        }
     })

    const handleDelete = (depart: Department) => {
        setSelectedDepartment(depart)
        setDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        if (selectedDepartment) {
            deleteMutation.mutate(selectedDepartment.departmentId)
        }
    }
    const columns: GridColDef[] =[
        {
            field:'departmentId',
            headerName:"ID",
            minWidth:70,
            flex:1
        },
        {
            field:'departmentName',
            headerName:"Department Name",
            minWidth:100,
            flex:1
        },
        {
            field:'floorNumber',
            headerName:"Floor Number",
            minWidth:100,
            flex:1
        }
    ];
    if(token != null){
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
                            onClick={() => navigate ("/update-department/"+param.row.id, {state:param.row})}
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
    const getAllDepartment = async() =>{
        const request = await axios.get("http://localhost:8080/api/department/all")
        const response= await request.data
        console.table(response)
        return response
    }
    const{data, error, isLoading} = useQuery<Department[],Error>({
        queryKey:['department'],
        queryFn: getAllDepartment
    });
     // Handling loading state
    if (isLoading) {
        return <p>Loading Departments Information...</p>;
    }

    // Handling error state
    if (error) {
        return <p>Error fetching Departments list: {error.message}</p>;
    }

    
  return (
    <>
        <Container>
            <Typography variant="h5" className="page-title">
                 Department Index
            </Typography>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.departmentId} // 🔹 This tells DataGrid to use doctor_id as the row ID
                initialState={{ pagination: { paginationModel } }}
                sx={{ border: 0 }}
                />
            </Paper>
            { token?.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%", mb: 2 }}>
                    <Button
                        component={Link}
                        to="/create-department"
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
                        Register a new Department
                    </Button>
                </Box> 
            )}
            <Dialog open={deleteDialog} onClose= {() => setDeleteDialog(false)}>
                       <DialogTitle>
                            Confirm Delete
                       </DialogTitle>
                       <DialogContent>
                            Are you sure you want to delete this department?
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