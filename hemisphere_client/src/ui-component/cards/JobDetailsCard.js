import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Card, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';


// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';



// ==============================|| USER DETAILS CARD ||============================== //

const UserDetailsCard = ({ title, position, description, placeName, industry, companyName, companyEmail}) => {
    const theme = useTheme();

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
                    {companyName} 
                    </Typography>
                    <Typography variant="h6">{placeName}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Job Title</Typography>
                            <Typography variant="h6">{title}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Job position</Typography>
                            <Typography variant="h6">{position}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Job Description</Typography>
                    <Typography variant="h6">{description}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Industry</Typography>
                            <Typography variant="h6">{industry}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Comapny Email</Typography>
                            <Typography variant="h6">{companyEmail}</Typography>
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
    title: PropTypes.string,
    position: PropTypes.string,
    description: PropTypes.string,
    placeName: PropTypes.string,
    industry: PropTypes.string,
    companyName: PropTypes.string,
    companyEmail: PropTypes.string,
};

export default UserDetailsCard;
