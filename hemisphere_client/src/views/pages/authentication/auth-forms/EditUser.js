// material-ui

/* eslint no-underscore-dangle: 0 */
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Select,
    MenuItem,
    Grid,
    InputAdornment,
    IconButton
} from '@mui/material';
import React, { useState } from 'react';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { concat,ApolloLink,useMutation, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { CREATE_USER, UPDATE_USER } from 'gqloperations/mutations';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const EditUser = ({ edit, editData, handleCloseModal }) => {
    
    console.log("editData=>",editData)
    const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });

    const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                authorization:`Bearer ${localStorage.getItem('AUTH_TOKEN')}`|| null
            }
        }));

        return forward(operation);
    });

    const client = new ApolloClient({
        link: concat(authMiddleware, httpLink),
        cache: new InMemoryCache()
    });


    const [showPassword, setShowPassword] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const { loading, error } = useMutation(UPDATE_USER);
    // tokens
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    return (
        <>
            <Formik
                initialValues={{
                    companyName: editData?.findUserById.companyName,
                    email: editData?.findUserById.email,
                    name: editData?.findUserById.name,
                    phone: editData?.findUserById.phone,
                    username: editData?.findUserById.username,
                    userType: editData?.findUserById.userType,
                    password: 'password',
                    submit: null
                }}
                // initialValues={{
                //     companyName:'',
                //     email: '',
                //     name: '',
                //     phone: null,
                //     username: '',
                //     userType: '',
                //     password: '',
                //     submit: null
                // }}
                validationSchema={Yup.object().shape({
                    companyName: Yup.string().required('Company Name is required'),
                    email: Yup.string().required('Email is required'),
                    name: Yup.string().required('Name is required'),
                    phone: Yup.number().required('Phone Number is required'),
                    username: Yup.string().required('Username is required'),
                    userType: Yup.string().required('User Type is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const _id = editData.findUserById._id;
                      
                        const value = { ...values, _id };
                        const companyName = value.companyName;
                        const email = value.email;
                        const name = value.name;
                        const username = value.username;
                        const phone = parseInt(value.phone, 10);
                        const userType = value.userType;
                        
                        const password = value.password;
                        console.log("selected ID=>",editData)

                        await client
                            .mutate({
                                variables: {
                                    _id,
                                    name,
                                    username,
                                    companyName,
                                    email,
                                    phone,
                                    userType,
                                    password
                                },
                                mutation: UPDATE_USER
                            })
                            .then(
                                () => {
                                    window.location.href = '/users/users-list';
                                },
                                (err) => {
                                    if (scriptedRef.current) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                }
                            );
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-user-name">Name</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-user-name"
                                type="text"
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.name}
                            />
                            {touched.name && errors.name && (
                                <FormHelperText error id="standard-weight-helper-text--name">
                                    {errors.name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-username">Username (Unique)</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-username"
                                type="text"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.username}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text--username">
                                    {errors.username}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email">Email Address</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-email"
                                type="text"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.email}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--email">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.companyName && errors.companyName)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-user-companyName">Company Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-user-companyName"
                                type="text"
                                name="companyName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.companyName}
                            />
                            {touched.companyName && errors.companyName && (
                                <FormHelperText error id="standard-weight-helper-text--compnayName">
                                    {errors.companyName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-phone">Phone Number</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-phone"
                                type="text"
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.phone}
                            />
                            {touched.phone && errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text--phone">
                                    {errors.phone}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <InputLabel htmlFor="outlined-adornment-usertype">Select User Type</InputLabel>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.userType && errors.userType)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <Select
                                labelId="outlined-adornment-usertype"
                                id="outlined-adornment-usertype"
                                value={values.userType}
                                label="User Type"
                                onChange={(event) => {
                                    const {
                                        target: { value }
                                    } = event;
                                    setFieldValue('userType', value);
                                }}
                            >
                                <MenuItem value="PROJECT_MANAGER">PROJECT_MANAGER</MenuItem>
                                <MenuItem value="CLIENT">CLIENT</MenuItem>
                                <MenuItem value="TRADIES">TRADIES</MenuItem>
                                <MenuItem value="NORMAL_STAFF">NORMAL_STAFF</MenuItem>
                            </Select>

                            {touched.userType && errors.userType && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.userType}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Edit User
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth size="large" variant="contained" color="primary" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <Item>3</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>4</Item>
                                </Grid> */}
                            </Grid>
                        </Box>

                        {/* <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Edit User
                                </Button>
                                <Button fullWidth size="large" variant="contained" color="primary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </AnimateButton>
                        </Box> */}
                    </form>
                )}
            </Formik>
        </>
    );
};

EditUser.propTypes = {
    edit: PropTypes.bool,
    editData: PropTypes.object,
    handleCloseModal: PropTypes.func,
};

export default EditUser;
