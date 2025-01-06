import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography, alpha, styled, InputBase } from "@mui/material";
import { useState } from "react";
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/Mail';
import NotificationsNoneIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from "react-router-dom";


const menuItems = ['Movies', 'TV Shows',]

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  

export default function Header() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const navigate = useNavigate(); 

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
      );
    
      const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{  vertical: 'top',  horizontal: 'left', }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{  vertical: 'top',  horizontal: 'left', }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
              {menuItems.map((page) => (
                <MenuItem key={page} onClick={handleMenuClose}>
                  <Typography sx={{ textAlign: 'center', color: 'white' }}>{page}</Typography>
                </MenuItem>
              ))}
            <MenuItem>
                <IconButton size="large" aria-label={`show ${0} new mails`} color="inherit">
                    <Badge badgeContent={0} color="error">
                        <MailOutlineIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label={`show ${0} new notifications`} color="inherit">
                    <Badge badgeContent={0} color="error">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleIcon />
                    {/* <MdAccountCircle /> */}
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className="sticky top-0 z-50">
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />

                    </IconButton> */}
                    <Link to='/'>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ fontWeight: 1000, letterSpacing: 1, display: { xs: 'none', sm: 'block' } }}
                            className="text-teal-400"
                        >
                            Flicktionary
                        </Typography>
                    </Link>
                    <div className="flex-1 md:hidden" />
                    <div className="hidden md:flex flex-1">
                        {menuItems.map((page) => (
                            <Typography key={page} sx={{ textAlign: 'center', color: 'white', padding: '12px', }}>{page}</Typography>
                        ))}
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{marginLeft: 'auto',}}>
                            <Badge badgeContent={4} color="error">
                                {/* <MailIcon /> */}
                                <MailOutlineIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                {/* <NotificationsIcon /> */}
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {/* <AccountCircle /> */}
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                    <form onSubmit={(e) => {e.preventDefault(); e.target.search.value.trim() ? navigate(`/search/${e.target.search.value}`) : navigate('/')} }>
                        <Search onChange={(e) => e.target.value.trim() ? null : navigate('/')}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search', 'name': 'search' }}
                                />
                        </Search>
                    </form>
                    <div className="flex md:hidden">
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar> 
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}