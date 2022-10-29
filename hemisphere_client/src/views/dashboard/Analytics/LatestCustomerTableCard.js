import PropTypes from 'prop-types';

// material-ui
import { Button, CardActions, CardMedia, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import Flag1 from 'assets/images/widget/AUSTRALIA.jpg';
import Flag2 from 'assets/images/widget/BRAZIL.jpg';
import Flag3 from 'assets/images/widget/GERMANY.jpg';
import Flag4 from 'assets/images/widget/UK.jpg';
import Flag5 from 'assets/images/widget/USA.jpg';

// table data
function createData(image, subject, dept, date) {
    return { image, subject, dept, date };
}
const rows = [
    createData(Flag1, 'Germany', 'Angelina Jolly', '56.23%'),
    createData(Flag2, 'USA', 'John Deo', '25.23%'),
    createData(Flag3, 'Australia', 'Jenifer Vintage', '12.45%'),
    createData(Flag4, 'United Kingdom', 'Lori Moore', '8.65%'),
    createData(Flag5, 'Brazil', 'Allianz Dacron', '3.56%'),
    createData(Flag1, 'Australia', 'Jenifer Vintage', '12.45%'),
    createData(Flag3, 'USA', 'John Deo', '25.23%'),
    createData(Flag5, 'Australia', 'Jenifer Vintage', '12.45%'),
    createData(Flag2, 'United Kingdom', 'Lori Moore', '8.65%')
];

// =========================|| DASHBOARD ANALYTICS - LATEST CUSTOMERS TABLE CARD ||========================= //

const LatestCustomerTableCard = ({ title }) => (
    <MainCard title={title} content={false}>
        <PerfectScrollbar style={{ height: 345, padding: 0 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>#</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right" sx={{ pr: 3 }}>
                                Average
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell sx={{ pl: 3 }}>
                                    <CardMedia component="img" image={row.image} title="image" sx={{ width: 30, height: 'auto' }} />
                                </TableCell>
                                <TableCell>{row.subject}</TableCell>
                                <TableCell>{row.dept}</TableCell>
                                <TableCell align="right" sx={{ pr: 3 }}>
                                    {row.date}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </PerfectScrollbar>

        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text" size="small">
                View all Latest Customers
            </Button>
        </CardActions>
    </MainCard>
);

LatestCustomerTableCard.propTypes = {
    title: PropTypes.string
};

export default LatestCustomerTableCard;
