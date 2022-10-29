import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Card, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import Avatar from '../extended/Avatar';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';

const avatarImage = require.context('assets/images/profile', true);

// ==============================|| USER DETAILS CARD ||============================== //

const UserDetailsCard = ({  avatar,firstName, lastName, mobileNumber, email, location, language, dateOfBirth }) => {
    const theme = useTheme();
    const avatarProfile = avatar && avatarImage(`./${avatar}`).default;

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            sx={{
                p: 2,
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`,
                '&:hover': {
                    borderColor: theme.palette.primary.main
                }
            }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Avatar alt={firstName + lastName} size="lg" src={avatarProfile} />
                        </Grid>
                        <Grid item>
                            <IconButton size="small" sx={{ mt: -0.75, mr: -0.75 }} onClick={handleClick}>
                                <MoreHorizOutlinedIcon
                                    fontSize="small"
                                    color="inherit"
                                    aria-controls="menu-friend-card"
                                    aria-haspopup="true"
                                    sx={{ opacity: 0.6 }}
                                />
                            </IconButton>
                            <Menu
                                id="menu-user-details-card"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                                <MenuItem onClick={handleClose}>Delete</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" component="div">
                    {firstName + lastName}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Date-Of-Birth</Typography>
                            <Typography variant="h6">{dateOfBirth}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Language</Typography>
                            <Typography variant="h6">{language}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Email</Typography>
                    <Typography variant="h6">{email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Phone</Typography>
                            <Typography variant="h6">{mobileNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Location</Typography>
                            <Typography variant="h6">{location}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button variant="outlined" fullWidth startIcon={<ChatBubbleTwoToneIcon />}>
                                Message
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="error" fullWidth startIcon={<NotInterestedTwoToneIcon />}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

UserDetailsCard.propTypes = {
    firstName: PropTypes.string,
    avatar: PropTypes.string,
    mobileNumber: PropTypes.number,
    email: PropTypes.string,
    location: PropTypes.string,
    lastName: PropTypes.string,
    language: PropTypes.string,
    dateOfBirth: PropTypes.string,
};

export default UserDetailsCard;
