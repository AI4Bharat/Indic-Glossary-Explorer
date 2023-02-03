import * as React from 'react';
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
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
import { Divider, Drawer, Grid, Icon } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";


const Header = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const classes = headerStyle();

    const { publicHeader, screenTitle } = props;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElHelp, setAnchorElHelp] = React.useState(null);

    const userData = useSelector((state) => state.userLoginDetails.data);

    React.useEffect(() => {
        console.log("userData --- ", userData);
    }, [userData])

    const getActiveRoute = (id) => {
        return location.pathname === id
    }

    const pages = publicHeader ? [
        {
            name: "View Glossary",
            onClick: () => onHeaderMenuClick("/"),
            id: "/",
            isActive: () => getActiveRoute("/")
        },
        {
            name: "Analytics",
            onClick: () => onHeaderMenuClick("/public-analytics"),
            id: "/public-analytics",
            isActive: () => getActiveRoute("/public-analytics")
        }
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
        },
        {
            name: "Analytics",
            onClick: () => onHeaderMenuClick("/analytics"),
            id: "/analytics",
            isActive: () => getActiveRoute("/analytics")
        }
    ];

    const helpMenuArr = [
        {
            id: "Codebase",
            name: "Codebase",
            onclick: () => window.open("https://github.com/AI4Bharat/Indic-Glossary-Explorer")
        },
        {
            id: "Tutorial",
            name: "Tutorial",
            onclick: () => window.open("https://github.com/AI4Bharat/Indic-Glossary-Explorer/wiki")
        },
        {
            id: "Introduction Video",
            name: "Introduction Video",
            onclick: () => window.open("https://www.youtube.com/watch?v=MPtezE6KDvk")
        },
        {
            id: "API Specs",
            name: "API Specs",
            onclick: () => window.open("https://app.swaggerhub.com/apis/ai4bharat-iitm/indic-glossary-explorer/1.0.0")
        },
    ]

    const onHeaderMenuClick = (id) => {
        handleCloseNavMenu();
        navigate(id);
    }

    const onLogoutClick = () => {
        localStorage.clear();
        handleCloseUserMenu();
        navigate("/user/login");
    }

    const handleOpenHelpMenu = (event) => {
        setAnchorElHelp(event.currentTarget);
    }

    const handleCloseHelpMenu = () => {
        setAnchorElHelp(null);
    };

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

    const onHelpMenuClick = (callback) => {
        callback();
        handleCloseHelpMenu();
    }

    const renderHelpButton = () => {
        return (
            <>
                <Tooltip title={"Help"}>
                    <IconButton
                        onClick={handleOpenHelpMenu}
                        sx={{ borderRadius: 2, padding: 1, fontSize: '1rem', marginRight: 2 }}
                    >
                    <HelpOutlineIcon fontSize='large' />
                </IconButton>
                </Tooltip>
                
                {/* <CustomButton
                    
                    onClick={handleOpenHelpMenu}
                    
                    size="large"
                    aria-controls={anchorElHelp ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorElHelp ? 'true' : undefined}
                /> */}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElHelp}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={Boolean(anchorElHelp)}
                    onClose={handleCloseHelpMenu}
                    sx={{
                        // display: { xs: 'block', md: 'block' },
                    }}
                >
                    <Grid
                        sx={{ padding: 0.5 }}
                    >
                        {
                            helpMenuArr.map((menu, index) => {
                                return (
                                    <IconButton key={menu.id} onClick={() => onHelpMenuClick(menu.onclick)} sx={{ p: 1, width: '100%', justifyContent: 'start' }}>
                                        {/* <ExitToAppIcon /> */}
                                        <Typography variant='button' sx={{ marginLeft: 1 }}>{menu.name}</Typography>
                                    </IconButton>
                                )
                            })
                        }
                    </Grid>
                </Menu>
            </>
        )
    }

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
                        <Typography variant='body1' sx={{ display: { md: "inline", xs: "none" }, marginLeft: 1, marginRight: 1, color: "rgb(39, 30, 79)" }}>
                            {JSON.parse(localStorage.getItem("userDetails"))?.user?.split(" ")[0]}
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
                sx={{ borderRadius: 2, padding: 3, fontSize: '1rem' }}
                size="large"
            />
        }
    }

    const MobileHeader = (props) => {
        return (
            <>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: "space-between" }} alignItems={"center"}>
                    <Link to={pages[0].id}>
                        <img
                            src={"transparent-glossary-explorer-logo.png"}
                            style={{ cursor: "pointer" }}
                            width={"50rem"}
                            height={"50rem"}
                        />
                    </Link>

                    <Typography variant="inherit" sx={{ color: "#000000" }}>{screenTitle}</Typography>
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
                    <Drawer
                        anchor={"right"}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        <Grid
                            container
                            direction={"row"}
                            alignItems={"start"}
                            sx={{ padding: 2 }}
                            height={"100%"}
                            overflow={"auto"}
                        >
                            <Grid
                                container
                                alignItems={"center"}
                                direction={"row"}
                                justifyContent={"space-between"}
                                marginBottom={2}
                            >
                                <Grid>
                                    <IconButton onClick={handleCloseNavMenu}>
                                        <ChevronLeftIcon fontSize='large' />{!publicHeader ? <Typography variant='h5'>
                                            {JSON.parse(localStorage.getItem("userDetails"))?.user?.split(" ")[0]}
                                        </Typography>
                                            : null
                                        }
                                    </IconButton>
                                </Grid>
                                <Link to={pages[0].id}>
                                    <img
                                        src={"transparent-glossary-explorer-logo.png"}
                                        style={{ cursor: "pointer" }}
                                        width={"50rem"}
                                        height={"50rem"}
                                    />
                                </Link>

                            </Grid>

                            <Divider sx={{ width: "100%" }} />
                            {pages?.map((page) => (
                                <MenuItem key={page.name} onClick={() => page.onClick()} sx={{ p: 1, width: '100%', justifyContent: 'start', marginLeft: 2 }}>
                                    <Typography variant='button'>{page.name}</Typography>
                                </MenuItem>
                            ))}
                            <Divider sx={{ width: "100%" }} />
                            {helpMenuArr.map((menu, index) => {
                                return (
                                    <MenuItem key={menu.id} onClick={() => onHelpMenuClick(menu.onclick)} sx={{ p: 1, width: '100%', justifyContent: 'start', marginLeft: 2 }}>
                                        <Typography variant='button'>{menu.name}</Typography>
                                    </MenuItem>
                                )
                            })}
                            <Divider sx={{ width: "100%" }} />
                            {!publicHeader ?
                                <MenuItem onClick={onLogoutClick} sx={{ p: 1, width: '100%', justifyContent: 'start', marginLeft: 2 }}>
                                    <Typography variant='button'>Logout</Typography>
                                </MenuItem> : <MenuItem onClick={() => navigate('/user/login')} sx={{ p: 1, width: '100%', justifyContent: 'start', marginLeft: 2 }}>
                                    <Typography variant='button'>Login</Typography>
                                </MenuItem>}
                        </Grid>
                    </Drawer>
                </Box>
            </>
        )
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
                        <Link to={pages[0].id}>
                            <img
                                src={"transparent-glossary-explorer-logo.png"}
                                style={{ cursor: "pointer" }}
                                width={"70rem"}
                                height={"70rem"}
                            />
                        </Link>

                    </Box>
                    {MobileHeader()}
                    <Box sx={{ flexGrow: 1, placeContent: "center", display: { xs: 'none', md: 'flex' } }}>
                        {pages?.map((page) => (

                            <NavLink
                                end
                                hidden={page.hidden}
                                key={page.name}
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

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {renderHelpButton()}
                        {renderAuthLinkButton()}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
