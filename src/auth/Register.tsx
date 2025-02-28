import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Register() {
    const validationRules = yup.object({
        username: yup.string().min(2, "The username must be 2 or more characters")
        .max(50, "The username must not go past 50 characters")
        .matches(/^[a-zA-Z0-9]+$/, "Only Alphanumeric characters")
        .required("Username must be filled out"),
        password:yup.string()
        .min(8, "Password must be 8 characters long")
        .max(100, "Password should not be more then 100 characters you nerd")
        .required(),
        role:yup.string()
        .required()
    })
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username:"",
            password:"",
            role:"USER"
        },
        validationSchema: validationRules,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axios.post("http://localhost:8080/api/users/", values);
    
                if (response.status !== 201) {
                    throw new Error("Something went wrong with the register, please try again later!");
                }
                navigate("/");
            } catch (error: any) {
                console.error("Error during registration.", error); // ✅ Logs error to console
                alert(error.message+". Username has been taken. Try again."); // ✅ Displays error message
            } finally {
                setSubmitting(false); // ✅ Ensures submit button resets after request
            }
        }
    });


  return (
    <div className='form-container'>
        <form onSubmit={formik.handleSubmit}>
            <h2>Register to gain access to add and edit operations </h2>
            <br />
            <TextField
                id='username'
                label='Username'
                type='text'
                style={{ width: "120px", margin: "5px 0"}}
                value={formik.values.username}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <br />
            <TextField
                id='password'
                label='Password'
                type='text'
                style={{ width: "120px", margin: "5px 0"}}
                value={formik.values.password}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <br />
            <InputLabel id="role-label">
                Role:
            </InputLabel>
            <Select
                labelId='role-label'
                id='role'
                name ="role" //add this to correctly bind the role to the Formik’s state
                value={formik.values.role}
                label="Role"
                onChange={formik.handleChange}
                >
                    <MenuItem value={"USER"}>User</MenuItem>
                    <MenuItem value={"DEPARTMENT"}>DEPARTMENT</MenuItem>
            </Select>
            <br />
            <Button type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#009688",
                        color: "black",
                        textTransform: "none",
                        fontSize: "1rem",
                        marginTop:"10px",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "white"
                        }
                    }}
            >
                Register
            </Button>
        </form>
    </div>
  )
}