import React from 'react';
import { loadInvoiceList } from '../store/actions/invoices';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';

class InvoiceList extends React.Component {


    componentWillMount() {
        this.props.loadInvoiceList()
    }

    render() {
        if (!this.props.invoices)
            return <Typography>Loading...</Typography>

        return <React.Fragment>
            <Grid container>
                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/'}><Button>Back to Dashboard</Button></Link>
                </Grid>
                <Grid item sm={6} xs={12} style={{ marginTop: '1em', textAlign: 'center' }}>
                    <h2>Invoices</h2>
                </Grid>
                <Grid item sm xs={4} style={{ marginTop: '1em', textAlign: "right" }}>
                    <Link to="/invoices/create">
                        <Button>Create</Button></Link>
                </Grid>
            </Grid>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nickname</TableCell>
                            <TableCell>Recipient Email</TableCell>
                            <TableCell>Total Due</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.invoices.results.map(invoice => (
                            <TableRow key={invoice.id}>
                                <TableCell>
                                    <Link
                                        style={{ color: 'blue' }}
                                        to={'/invoices/' + invoice.id}
                                    >
                                        {invoice.nickname}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {invoice.recipient_email}
                                </TableCell>
                                <TableCell>
                                    {invoice.total_wei_due} WEI
                                </TableCell>
                                <TableCell>
                                    {invoice.due_date}
                                </TableCell>
                                <TableCell>
                                    {invoice.status}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </React.Fragment>

    }
}

const mapStateToProps = (state) => ({
    invoices: state.invoices.data
});

const mapDispatchToProps = (dispatch) => ({
    loadInvoiceList: () => dispatch(loadInvoiceList())
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);