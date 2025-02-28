import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#009688",  // teal primary color
            light: "#FF80AB",
            dark: "#C60055"
        },
        secondary: {
            main: "#2196F3", // Blue secondary color
            light: "#6EC6FF",
            dark: "#0069C0"
        },
        background: {
            default: "black" , // Light Gray background, for the user icon text 
            paper: "#F5F5F5" // Slightly lighter gray for containers
        }
    }
});

export default theme;