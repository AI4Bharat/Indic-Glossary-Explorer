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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import headerStyle from "../../../styles/header";
import { useSelector } from 'react-redux';
import { translate } from "../../../../config/localisation";
import CustomButton from './Button';
import { Grid, Icon } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Header = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const classes = headerStyle();

    const { publicHeader } = props;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const userData = useSelector((state) => state.userLoginDetails.data);

    React.useEffect(() => {
        console.log("userData --- ", userData);
    }, [userData])

    const getActiveRoute = (id) => {
        return location.pathname === id
    }

    const pages = publicHeader ? [
        // {
        //     name: "View Glossary",
        //     onClick: () => onHeaderMenuClick("/"),
        //     id: "/",
        //     isActive: () => getActiveRoute("/")
        // }
    ] : [
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

    const onLogoutClick = () => {
        localStorage.clear();
        handleCloseUserMenu();
        navigate("/user/login");
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

    const renderAuthLinkButton = () => {
        console.log("publicHeader --- ", publicHeader);
        if (!publicHeader) {
            // return <Tooltip title="Log out">
            //     <IconButton onClick={onLogoutClick} sx={{ p: 0 }}>
            //         <ExitToAppIcon />
            //     </IconButton>
            // </Tooltip>
            return (
                <>
                    <IconButton
                        onClick={handleOpenUserMenu}
                        size="large"
                        sx={{ borderRadius: 2, padding: 1 }}
                        aria-controls={anchorElUser ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorElUser ? 'true' : undefined}
                    >
                        <Avatar sx={{}}>{JSON.parse(localStorage.getItem("userDetails"))?.username?.split("")[0]}</Avatar>
                        <Typography variant='body1' sx={{ marginLeft: 1, marginRight: 1, color: "rgb(39, 30, 79)" }}>
                            {JSON.parse(localStorage.getItem("userDetails"))?.username}
                        </Typography>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        sx={{
                            // display: { xs: 'block', md: 'block' },
                        }}
                    >
                        <Grid
                            sx={{ padding: 0.5 }}
                        >
                            <IconButton onClick={onLogoutClick} sx={{ p: 1, width: '100%', justifyContent: 'start' }}>
                                {/* <ExitToAppIcon /> */}
                                <Typography variant='button' sx={{ marginLeft: 1 }}>Logout</Typography>
                            </IconButton>
                        </Grid>
                    </Menu>
                </>
            )
        } else {
            return <CustomButton
                label={"Login"}
                onClick={() => navigate('/user/login')}
                sx={{ borderRadius: 2, padding: 3.5, fontSize: '1rem' }}
                size="large"
            />
        }
    }

    return (
        <AppBar position="fixed"
            sx={{
                backgroundImage: "linear-gradient(to right, rgb(241, 241, 241), rgb(255, 255, 255))",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar className={classes.toolbar}>
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
                        <Typography variant='h5' sx={{ color: "#000000", marginLeft: 2 }}>{translate("label.appName")}</Typography>
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
                        <img
                            src={"ai4bharat1.png"}
                            width={"50rem"}
                            height={"50rem"}
                        />
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
                            {pages?.map((page) => (
                                <MenuItem key={page.name} onClick={() => page.onClick()}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                    </Typography> */}
                    <Box sx={{ flexGrow: 1, placeContent: "center", display: { xs: 'none', md: 'flex' } }}>
                        {pages?.map((page) => (

                            <NavLink
                                hidden={page.hidden}
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
                        {renderAuthLinkButton()}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
