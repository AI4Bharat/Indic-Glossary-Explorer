import * as React from 'react';
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PersonIcon from '@mui/icons-material/Person';
import headerStyle from "../../../styles/header";


const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const classes = headerStyle();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const getActiveRoute = (id) => {
        return location.pathname === id
    }

    const pages = [
        {
            name: "View Glossary",
            onClick: () => onHeaderMenuClick("/view-glossary"),
            id: "/view-glossary",
            isActive: () => getActiveRoute("/view-glossary")
        },
        {
            name: "Add Glossary",
            onClick: () => onHeaderMenuClick("/add-glossary"),
            id: "/add-glossary",
            isActive: () => getActiveRoute("/add-glossary")
        }
    ];

    const onHeaderMenuClick = (id) => {
        handleCloseNavMenu();
        navigate(id);
    }

    const settings = [{
        name: "Logout",
        onClick: () => { onLogoutClick() }
    }];

    const onLogoutClick = () => {
        handleCloseUserMenu();
        navigate("/"); 
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed"
            sx={{
                backgroundImage: "linear-gradient(to right, rgb(241, 241, 241), rgb(255, 255, 255))",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={"ai4bharat1.png"}
                            width={"50rem"}
                            height={"50rem"}
                        />
                        <Typography variant='h5' sx={{color: "#000000", marginLeft: 2}}>Glossary Service</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{
                                color: "#000000"
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => page.onClick()}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, placeContent: "center", display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <NavLink
                                to={page.id}
                                className={({ isActive }) =>
                                    isActive ? classes.highlightedMenu : classes.headerMenu
                                }
                                activeClassName={classes.highlightedMenu}
                            >
                                {page.name}
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={setting.onClick}>
                                    <Typography 
                                        textAlign="center" 
                                        variant='subtitle2' 
                                        sx={{
                                            fontFamily: "Roboto",
                                            fontSize: "0.827rem",
                                            fontWeight: "600"
                                        }}
                                    >{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
