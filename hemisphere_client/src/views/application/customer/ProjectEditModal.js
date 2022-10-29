import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Modal,
    Rating,
    TextField,
    Typography
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useQuery } from '@apollo/client';
import { PROJECT_BY_ID } from 'gqloperations/queries';
import AuthCardWrapper from 'views/pages/authentication/AuthCardWrapper';
import EditProject from 'views/pages/authentication/auth-forms/EditProject';

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

const ProjectEdit = ({ open, handleCloseModal, selectedId, edit, setEdit }) => {
    const { data, loading, error } = useQuery(PROJECT_BY_ID, {
        variables: {
            id: selectedId
        }
    });
    console.log("selectedid=>",selectedId)
    console.log("datas from project edit=>",data)
    if (loading) return 'Loading...';
    // if (error) return <pre>{error.message}</pre>;
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
                                    <AuthCardWrapper sx={style}>
                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                            <Grid item xs={12}>
                                                <EditProject edit={edit} editData={data} handleCloseModal={handleCloseModal} />
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

ProjectEdit.propTypes = {
    open: PropTypes.bool,
    handleCloseModal: PropTypes.func,
    selectedId: PropTypes.string
};

export default ProjectEdit;
