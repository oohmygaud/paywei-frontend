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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import {renderMicroValue} from '../utils/formatting';

class InvoiceList extends React.Component {
    state = {
        show_archived: false,
        page: 1
    }

    searchOptions() {
        return {
            show_archived: this.state.show_archived,
            page: this.state.page
        }
    }

    loadPage(page) {
        this.props.loadInvoiceList({
            ...this.searchOptions(),
            page: page
        })
        this.setState({ page: page })
    }

    componentWillMount() {
        this.props.loadInvoiceList(this.searchOptions())
    }

    toggleArchived() {
        this.setState({show_archived: !this.state.show_archived});
        this.props.loadInvoiceList({
            ...this.searchOptions(),
            show_archived: !this.state.show_archived
        })
    }

    

    render() {
        if (!this.props.invoices)
            return <Typography>Loading...</Typography>

        return <React.Fragment>
            <Grid container>
                <Grid item xs={6} sm={4} style={{ marginTop: '1em' }}>
                    <Link to={'/dashboard'}><Button>Back to Dashboard</Button></Link>
                </Grid>
                <Grid item xs={6} sm={4} style={{ marginTop: '1em', textAlign: 'center' }}>
                    <h2>Invoices</h2>
                </Grid>
                <Grid item xs={6} sm={4} style={{ marginTop: '1em', textAlign: "right" }}>
                    <Link to="/send_invoice">
                        <Button>Send an Invoice</Button></Link>
                </Grid>
            </Grid>
            <Grid container>
                    <FormControlLabel control={
                        <Switch
                            onChange={(e) => this.toggleArchived()}
                            value="show_archived"
                            color="secondary"
                            checked={this.state.show_archived}
                        />
                    }
                    label="Show Archived"
                    />
                </Grid>
            <Card style={{ overflow: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Total Due</TableCell>
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
                                        {invoice.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {moment(invoice.due_date).calendar()}
                                </TableCell>
                                <TableCell>
                                    {invoice.status}
                                </TableCell>
                                <TableCell>
                                    {renderMicroValue(invoice.invoice_amount, 18)} {invoice.currency_data.symbol}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <Grid container justify="space-between">
                <Grid item>
                    <Button color="secondary" disabled={this.props.invoices.previous == null}
                        onClick={(e) => this.loadPage(this.state.page - 1)}>Previous Page</Button>
                </Grid>


                <Grid item><Button disabled>Page {this.state.page}</Button></Grid>

                <Grid item>
                    <Button color="secondary" disabled={this.props.invoices.next == null}
                        onClick={(e) => this.loadPage(this.state.page + 1)}>Next Page</Button>
                </Grid>
            </Grid>
        </React.Fragment>

    }
}

const mapStateToProps = (state) => ({
    invoices: state.invoices.data
});

const mapDispatchToProps = (dispatch) => ({
    loadInvoiceList: (options) => dispatch(loadInvoiceList(options))
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);