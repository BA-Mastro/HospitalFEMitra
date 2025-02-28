import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Department from '../../types/Department';
import { TextField, Button } from '@mui/material';


const UpdateDepartment=() => {
    const department=useLocation().state;
    const {departmentId, departmentName, floorNumber}= department;
   

    const validationRules = yup.object({
        departmentName: yup.string()
            .min(2, "Department name must be at least 2 characters.")
            .max(30, "Department name must not exceed 20 characters.")
            .required("Department name is required."),
        floorNumber: yup.number()
            .min(1, "Floor number must be at least 2 characters.")
            .max(20, "Floor number must not exceed 20 characters.")
            .required("Floor number is required.")

    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: async (data: Department) => {
            const response = await axios.put("http://localhost:8080/api/department/"+departmentId, data);
            return response.data;
        },
        onSuccess: () => {
            alert("Department has been successfully added.");
            queryClient.invalidateQueries({ queryKey: ["departments"] });
            navigate("/department-index");
        },
        onError: (error) => {
            console.error("Error:", error);
            alert("Something went wrong: " + (error.response?.data?.message || error.message));
        }
    });
    const formik = useFormik({
        initialValues: {
            departmentId:departmentId,
            departmentName: departmentName,
            floorNumber: floorNumber
        },
        validationSchema:validationRules,
        onSubmit: data => mutate(data)
    });


    return(
        <>
            <div className="form-container">
                <form onSubmit={formik.handleSubmit}>
                    <h2>Update Department</h2>

                    <TextField
                        label="Department Name"
                        name="departmentName"
                        fullWidth
                        variant="outlined"
                        value={formik.values.departmentName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.departmentName && Boolean(formik.errors.departmentName)}
                        helperText={formik.touched.departmentName && formik.errors.departmentName}
                        margin="normal"
                    />
                    <TextField
                        label="Floor Number"
                        name="floorNumber"
                        fullWidth
                        variant="outlined"
                        value={formik.values.floorNumber}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.floorNumber && Boolean(formik.errors.floorNumber)}
                        helperText={formik.touched.floorNumber && formik.errors.floorNumber}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#009688",
                            color: "black",
                            textTransform: "none",
                            fontSize: "1rem",
                            margin: "20px",
                            borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: "white"
                            }
                        }}
                    >
                        Update
                    </Button>
                </form>
            </div>
        </>
    )

}
export default UpdateDepartment;