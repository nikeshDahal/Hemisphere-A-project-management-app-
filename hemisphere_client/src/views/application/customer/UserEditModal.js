import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Grid, Modal, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import { useQuery } from '@apollo/client';
import { USER_BY_ID } from 'gqloperations/queries';
import AddUser from 'views/pages/authentication/auth-forms/AddUser';
import AuthCardWrapper from 'views/pages/authentication/AuthCardWrapper';
import EditUser from 'views/pages/authentication/auth-forms/EditUser';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const UserEdit = ({ open, handleCloseModal, selectedId, edit, setEdit }) => {
    
    const theme = useTheme();
    const { data, loading, error } = useQuery(USER_BY_ID, {
        variables: {
            id: selectedId
        }
    },
    );
    console.log("data from userByID=>",data)
    if (loading) return 'Loading...';
    

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            sx={{
                '&>div:nth-of-type(3)': {
                    '&>div': {
                        maxWidth: 400
                    }
                }
            }}
        >
            {open && (
                <>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                                <Grid item>
                                    <Stack alignItems="center" justifyContent="center">
                                        <Typography color={theme.palette.secondary.main} gutterBottom>
                                            Edit User
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <AuthCardWrapper sx={style}>
                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                            <Grid item xs={12}>
                                                <EditUser edit={edit} editData={data} handleCloseModal={handleCloseModal} />
                                            </Grid>
                                        </Grid>
                                    </AuthCardWrapper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </Modal>
    );
};

UserEdit.propTypes = {
    open: PropTypes.bool,
    handleCloseModal: PropTypes.func,
    selectedId: PropTypes.string
};

export default UserEdit;
