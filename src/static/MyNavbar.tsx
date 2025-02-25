import { useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const pages = [
    { name: "Doctor Index", path: "/doctor-index" }, // Changed from "/cars" to "/car-index"
    { name: "Department Index", path: "/department-index" }, // Changed from "/dealers" to "/dealer-index"
    { name: "Register ", path: "/register" }, 
    { name: "Login", path:"/login"}
];

const settings = ["Dashboard", "Logout"];

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path?: string) => {
        setAnchorElNav(null);
        if (path) navigate(path);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <LocalHospitalIcon className="logo"
                    sx={{
                    display: { xs: "none", md: "flex" },
                    mr: 1,
                    fontSize: 40, // Increases size
                    color: "white", // Default color
                    transition: "all 0.3s ease-in-out", // Smooth transition
                    "&:hover": {
                        color: "black", // Change color on hover
                        transform: "scale(1.2)" // Slightly enlarge on hover
                    }
                    }}
                />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            "&:hover": {
                                color: "black", // Change color on hover
                                transform: "scale(1.2)" // Slightly enlarge on hover
                            }
                        }}
                    >
                        Home
                    </Typography>

                    {/* not sure yet */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu()}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                                    <Typography >{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Car, Dealer, Register index */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => navigate(page.path)}
                                sx={{ 
                                    my: 2, 
                                    color: "white", 
                                    display: "white",
                                    fontWeight: "bold", // Makes the text bold
                                    transition: "all 0.3s ease-in-out", // Smooth transition
                                    "&:hover": {
                                        backgroundColor: "white !important", // Changes background color of the button
                                        color: "black", // Changes text color on hover
                                        transform: "scale(1.1)" // Slight zoom effect
                                    }
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: "pink.main" }}>Mitra</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;