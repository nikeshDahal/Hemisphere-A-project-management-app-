import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { PROJECTS } from 'gqloperations/queries';
import { useEffect, useState } from 'react';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import DescriptionIcon from '@mui/icons-material/Description';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading }) => {
    const theme = useTheme();
    const [rows, setRows] = useState();
    const { data, loading, error } = useQuery(PROJECTS, { context: { headers: { authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } }})

    useEffect(() => {
        const projectList = data?.list_projects.map((items) => items);
        setRows(projectList);
    }, [data]);

    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                rows && (
                    <CardWrapper border={false} content={false}>
                        <Box sx={{ p: 2 }}>
                            <List sx={{ py: 0 }}>
                                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                                                color:
                                                    theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.warning.dark
                                            }}
                                        >
                                            <DescriptionIcon fontSize="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            py: 0,
                                            mt: 0.45,
                                            mb: 0.45
                                        }}
                                        primary={<Typography variant="h4">{rows.length}</Typography>}
                                        secondary={
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: theme.palette.grey[500],
                                                    mt: 0.5
                                                }}
                                            >
                                                Total Projects
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </CardWrapper>
                )
            )}
        </>
    );
};

TotalIncomeLightCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeLightCard;
