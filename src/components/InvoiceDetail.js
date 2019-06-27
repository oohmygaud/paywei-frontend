import React from 'react';
import { connect } from 'react-redux';
import { loadInvoiceDetail } from '../store/actions/invoices';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class InvoiceDetail extends React.Component {

    componentWillMount() {
        this.props.loadInvoiceDetail(this.props.match.params.id)
    }

    render() {
        if (!this.props.invoice || !this.props.invoice.id)
            return <React.Fragment>Loading...</React.Fragment>
        return <React.Fragment>
            <Grid container>

                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/invoices'}><Button>Back to Invoices</Button></Link>
                </Grid>

                <Grid item sm={6} xs={8} style={{ marginBottom: '0.5em', textAlign: "center" }} >

                </Grid>

                <Grid item sm xs={4} style={{ marginTop: '1em', textAlign: "right" }}>
                    <Link to={'/invoices/' + this.props.invoice.id + '/edit'}>
                        <Button color="primary">Edit Invoice</Button>
                    </Link>
                </Grid>
            </Grid>
            <Grid container justify="center"  >
                <Grid item xs={12} md={6} lg={4} style={{ textAlign: 'center', padding: '2em' }}>
                    <Card>
                        <h2>{this.props.invoice.title} Details</h2>
                        <Grid container style={{ textAlign: 'center', paddingTop: '2em' }}>
                            <Grid item xs={4} >
                                {this.props.invoice.total_wei_due}
                            </Grid>
                            <Grid item xs={4} >
                                12
                            </Grid>
                            <Grid item xs={4} >
                                1000
                            </Grid>
                        </Grid>
                        <Grid container style={{ textAlign: 'center', paddingTop: '0.5em', paddingBottom: '2em' }}>
                            <Grid item xs={4} >
                                Total (USD)
                            </Grid>
                            <Grid item xs={4} >
                                Total (COIN)
                            </Grid>
                            <Grid item xs={4} >
                                Paid
                            </Grid>
                        </Grid>
                        <Grid container style={{ padding: '2em' }}>
                            <Table> 
                                <TableBody>
                                        <TableRow>
                                            <TableCell>Status</TableCell>
                                            <TableCell>{this.props.invoice.status}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Confirmations</TableCell>
                                            <TableCell>1</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Currency</TableCell>
                                            <TableCell>ETH</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>{this.props.invoice.created_at}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Notes</TableCell>
                                            <TableCell>{this.props.invoice.notes}</TableCell>
                                        </TableRow>      
                                </TableBody>
                            </Table>
                        </Grid>

                    </Card>
                </Grid>
            </Grid>

        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    invoice: state.invoices.detail,
});

const mapDispatchToProps = (dispatch) => ({
    loadInvoiceDetail: (id) => dispatch(loadInvoiceDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);