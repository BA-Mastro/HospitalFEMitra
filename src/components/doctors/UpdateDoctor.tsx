import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Doctor from "../../types/Doctor";
import * as yup from 'yup';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

const fetchDepartments = async () => {
    const response = await axios.get("http://localhost:8080/api/department/all");
    return response.data;
};
const UpdateDoctor=()=> {
    const doctor=useLocation().state;
    const {doctor_id,first_name, last_name, phone_number, email,specialization,department_id}= doctor;

     // Fetch departments using React Query
    const { data: departments, error, isLoading } = useQuery({
        queryKey: ["departments"],
        queryFn: fetchDepartments
    });

    const validationRules = yup.object({
        first_name: yup.string()
            .min(2, "First name must be at least 2 characters.")
            .max(20, "First name must not exceed 20 characters.")
            .required("First name is required."),
        last_name: yup.string()
            .min(2, "Last name must be at least 2 characters.")
            .max(20, "Last name must not exceed 20 characters.")
            .required("Last name is required."),
        phone_number: yup.string()
            .matches(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits. Only numbers are accepted")
            .required("Phone number is required."),
        email: yup.string()
            .email("Invalid email format.")
            .required("Email is required."),
        specialization: yup.string()
            .required("Specialization is required."),
        department_id: yup.string()
            .required("Department is required.") // Ensure department selection
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (data: Doctor) => {
            const response = await axios.put("http://localhost:8080/api/doctor/"+doctor_id, data,{
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`
                }
            });
            return response.data;
        },
        onSuccess: () => {
            alert("Doctor has been successfully updated.");
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
            navigate("/doctor-index");
        },
        onError: (error) => {
            if (error.response?.status === 403) {
                alert("Unauthorized to delete. Only Department users have acces.")
                navigate("/doctor-index");
                throw new Error("Unauthorized access. You do not have permission to delete this car.");
            }
            console.error("Error:", error);
            alert("Something went wrong: " + (error.response?.data?.message || error.message));
        }
    });

    const formik = useFormik({
        initialValues: {
            doctor_id:doctor_id,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email: email,
            specialization: specialization,
            department_id: department_id // Default empty selection
        },
        validationSchema: validationRules,
        onSubmit: (data) => mutate(data)
        
    });

    return(
        <>
             <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
                <h2>Update Doctor</h2>

                <TextField
                    label="First Name"
                    name="first_name"
                    fullWidth
                    variant="outlined"
                    value={formik.values.first_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                    helperText={formik.touched.first_name && formik.errors.first_name}
                    margin="normal"
                />

                <TextField
                    label="Last Name"
                    name="last_name"
                    fullWidth
                    variant="outlined"
                    value={formik.values.last_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    helperText={formik.touched.last_name && formik.errors.last_name}
                    margin="normal"
                />

                <TextField
                    label="Phone Number"
                    name="phone_number"
                    fullWidth
                    variant="outlined"
                    value={formik.values.phone_number}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                    margin="normal"
                />

                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                />

                <TextField
                    label="Specialization"
                    name="specialization"
                    fullWidth
                    variant="outlined"
                    value={formik.values.specialization}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                    helperText={formik.touched.specialization && formik.errors.specialization}
                    margin="normal"
                />

                {/* Department Dropdown with Loading/Error Handling */}
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Department</InputLabel>
                    <Select
                        name="department_id"
                        value={formik.values.department_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.department_id && Boolean(formik.errors.department_id)}
                    >
                        {isLoading ? (
                            <MenuItem disabled>Loading...</MenuItem>
                        ) : error ? (
                            <MenuItem disabled>Error loading departments</MenuItem>
                        ) : (
                            departments?.map((dept) => (
                                <MenuItem key={dept.departmentId} value={dept.departmentId}>
                                    {dept.departmentName} (Floor {dept.floorNumber})
                                </MenuItem>
                            ))
                        )}
                    </Select>
                    {formik.touched.department_id && formik.errors.department_id && (
                        <p style={{ color: "red", fontSize: "0.8rem" }}>{formik.errors.department_id}</p>
                    )}
                </FormControl>

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
export default UpdateDoctor;