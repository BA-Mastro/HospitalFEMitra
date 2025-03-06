import * as yup from 'yup';
import Department from '../../types/Department';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { TextField, Button } from '@mui/material';

const CreateDepartment =() => {
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
            const response = await axios.post("http://localhost:8080/api/department/create", data,{
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`
                }
            });
            return response.data;
        },
        onSuccess: () => {
            alert("Department has been successfully added.");
            queryClient.invalidateQueries({ queryKey: ["departments"] });
            navigate("/department-index");
        },
        onError: (error) => {
            if (error.response?.status === 403) {
                alert("Unauthorized to delete. Only Department users have access")
                navigate("/department-index");
                throw new Error("Unauthorized access. You do not have permission to delete this car.");
            }
            else{
                console.error("Error:", error);
                alert("Something went wrong: " + (error.response?.data?.message || error.message));
                return <p>Error fetching Departments list: {error.message}</p>;
            }
        }
    });
    const formik = useFormik({
        initialValues: {
            departmentName: "",
            floorNumber: 0
        },
        validationSchema:validationRules,
        onSubmit: data => mutate(data)
    });

    return(
        <>
            <div className="form-container">
                <form onSubmit={formik.handleSubmit}>
                    <h2>Register New Department</h2>

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
                            color: "white",
                            textTransform: "none",
                            fontSize: "1rem",
                            margin: "20px",
                            borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: "white"
                            }
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </>
    )
}
export default CreateDepartment;