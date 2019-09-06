import React from 'react';
import { connect } from 'react-redux';
import { loadInvoiceDetail, editInvoice, archiveInvoice, unarchiveInvoice } from '../store/actions/invoices';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import palette from '../theme/palette'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';


let StatusCard = ({ invoice, publishNow }) => {
    if (invoice.delivery == 'email' && invoice.status == 'new')
        return <Card style={{ background: palette.orange, padding: '1em', textAlign: 'center' }}>
            <h2 style={{ color: 'white' }}>
                DRAFT
            </h2>

            <h4 style={{ display: 'inline-block', color: 'white' }}>
                Not yet delivered to {invoice.recipient_email}
            </h4>
            <Button
                style={{ marginTop: "1em" }}
                type="submit"
                variant="contained"
                color="primary"
                onClick={publishNow}>
                
                    Send Now
                
            </Button>
        </Card>

    if (invoice.delivery == 'email' && invoice.status == 'published')
        return <Card style={{ background: palette.blue, padding: '1em', textAlign: 'center' }}>
            <h2 style={{ color: 'white' }}>SENT</h2>
            <h4 style={{ display: 'inline-block', color: 'white' }}>
                Your invoice has been sent to {invoice.recipient_email}
            </h4>
            <h4 style={{ display: 'inline-block', color: 'white' }}>
                Copy link here: <br />https://PayWei.co/pay/{invoice.id}
            </h4>
            <CopyToClipboard
                text={'https://PayWei.co/pay/' + invoice.id}
                onCopy={() => this.setState({ copied: true })}>
                <Button color='primary' variant='contained' style={{ margin: '1.5em' }}>
                    <FileCopyIcon />
                </Button>
            </CopyToClipboard>
        </Card>

    if (invoice.delivery == 'link' && invoice.status != 'paid')
        return <Card style={{ background: palette.blue, padding: '1em', textAlign: 'center' }}>
            <h2 style={{ color: 'white' }}>
                Copy the link & Send your invoice!
            </h2>
            <h4 style={{ display: 'inline-block', color: 'white' }}>
                https://PayWei.co/pay/{invoice.id}
            </h4>
            <br />
            <CopyToClipboard
                text={'https://PayWei.co/pay/' + invoice.id}
                onCopy={() => this.setState({ copied: true })}>
                <Button color='primary' variant='contained' style={{ margin: '1.5em' }}>
                    <FileCopyIcon />
                </Button>
            </CopyToClipboard>
        </Card>

    if (invoice.status == 'agreed')
        return <Card style={{ background: palette.blue, padding: '1em', textAlign: 'center' }}>
            <h2 style={{ color: 'white' }}>
                AGREED
            </h2>
            <h4 style={{ display: 'inline-block', color: 'white' }}>
                Cannot make changes to this invoice.
            </h4>
            <h4 style={{ display: 'inline-block', color: 'white' }}>
                Copy link here: <br />https://PayWei.co/pay/{invoice.id}
            </h4>
            <CopyToClipboard
                text={'https://PayWei.co/pay/' + invoice.id}
                onCopy={() => this.setState({ copied: true })}>
                <Button color='primary' variant='contained' style={{ margin: '1.5em' }}>
                    <FileCopyIcon />
                </Button>
            </CopyToClipboard>
        </Card>

    return null

}

class InvoiceDetail extends React.Component {

    componentWillMount() {
        this.props.loadInvoiceDetail(this.props.match.params.id)
    }

    publishNow() {
        this.props.editInvoice(this.props.match.params.id, { ...this.props.invoice, status: 'published' })
    }

    render() {
        if (!this.props.invoice || !this.props.invoice.id)
            return <React.Fragment>Loading...</React.Fragment>
        return <React.Fragment>
            <Grid container>

                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/invoices'}><Button>Back to Invoices</Button></Link>
                </Grid>

                <Grid item sm={6} xs={8} style={{ marginBottom: '0.5em', textAlign: "center" }}>

                </Grid>

                <Grid item sm xs={4} style={{ marginTop: '1em', textAlign: "right" }}>
                    {this.props.invoice.status != 'agreed' ?
                        <Link to={'/invoices/' + this.props.invoice.id + '/edit'}>
                            <Button color="primary">Edit Invoice</Button>
                        </Link> : null
                    }

                </Grid>
            </Grid>
            <Grid container justify="center" alignItems='center' >
                <Grid item xs={12} md={6} lg={4} style={{ textAlign: 'center', padding: '2em' }}>
                    <Card>
                        <h2>{this.props.invoice.title} Details</h2>
                        <Grid container style={{ textAlign: 'center', paddingTop: '2em' }}>
                            <Grid item xs={4}>
                                {this.props.invoice.invoice_amount_wei}
                            </Grid>
                            <Grid item xs={4}>
                                12
                            </Grid>
                            <Grid item xs={4}>
                                1000
                            </Grid>
                        </Grid>
                        <Grid container style={{ textAlign: 'center', paddingTop: '0.5em', paddingBottom: '2em' }}>
                            <Grid item xs={4}>
                                Total (USD)
                            </Grid>
                            <Grid item xs={4}>
                                Total (COIN)
                            </Grid>
                            <Grid item xs={4}>
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
                <Grid item xs={12} md={6} lg={3} >
                    <StatusCard invoice={this.props.invoice} publishNow={() => this.publishNow()} />


                    {this.props.invoice ?
                        !this.props.invoice.archived_at ?
                            <Button
                                color="secondary"
                                style={{ marginTop: "1em" }}
                                onClick={(e) => this.props.archive(this.props.invoice.id)} >
                                <ArchiveIcon />Archive
                            </Button>
                            :
                            <Button
                                color="secondary"
                                onClick={(e) => this.props.unarchive(this.props.invoice.id)} >
                                <UnarchiveIcon />Unarchive
                            </Button>

                        : null}
                </Grid>
            </Grid>

        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    invoice: state.invoices.detail,
});

const mapDispatchToProps = (dispatch) => ({
    loadInvoiceDetail: (id) => dispatch(loadInvoiceDetail(id)),
    editInvoice: (id, data) => dispatch(editInvoice(id, data)),
    archive: (id) => dispatch(archiveInvoice(id)),
    unarchive: (id) => dispatch(unarchiveInvoice(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);