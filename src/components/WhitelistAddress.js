import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { loadWhitelist, addWhitelistAddress, archiveAddress } from '../store/actions/auth';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TimeAgo from 'timeago-react';
import ArchiveIcon from '@material-ui/icons/Archive';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

class AddressRowBase extends React.Component {
    state = {
        dialog: false,
    }
    openDialog() {
        this.setState({ dialog: true })
    }

    handleClose() {
        this.setState({ dialog: false })
    }
    renderStatus(status) {
        if(status == 'pending') {
            return <Tooltip title='Pending'>
                <AccessTimeIcon color='secondary'/>
                </Tooltip>
        }
        if(status == 'verified') {
            return <Tooltip title='Verified'>
                <CheckCircleIcon color='primary' />
                </Tooltip>
        }
        if(status == 'archived') {
            return <Tooltip title='Archived'>
                <BookmarkIcon color='sand' />
                </Tooltip>
        }
    }

    render() {
        const address = this.props.address;
        return <TableRow key={address.id}>
            <TableCell>
                <TimeAgo datetime={address.created_at} />
            </TableCell>
            <TableCell>
                <b>{address.nickname}</b>
                <br />
                {address.address}
            </TableCell>
            <TableCell>
                {this.renderStatus(address.status)}
            </TableCell>
            <TableCell>
                {address.status != 'archived' ?
                    <React.Fragment>
                        <Button
                            color="secondary"
                            style={{ marginTop: "1em" }}
                            onClick={() => this.openDialog()} >
                            <ArchiveIcon />Archive
                        </Button>
                        <Dialog
                            open={this.state.dialog}
                            onClose={(e) => this.handleClose(e)}
                        >
                            <DialogTitle>{"Are you sure you want to archive this whitelist address?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    If you archive this address, it can no longer be used to receive funds. You can re-verify at any time.
                        </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={(e) => this.handleClose(e)} color="primary">
                                    Disagree
                        </Button>
                                <Button onClick={(e) => {
                                    this.props.archiveAddress(address.id);
                                    this.handleClose(e);
                                }} color="primary" autoFocus>
                                    Agree
                        </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    : null}
            </TableCell>
        </TableRow>
    }
}
const AddressRow = connect(null, (dispatch) => ({
    archiveAddress: (id) => dispatch(archiveAddress(id))
}))(AddressRowBase)

class WhitelistAddress extends React.Component {

    state = {
        nickname: '',
        address: ''
    }

    componentWillMount() {
        this.props.loadWhitelist()
    }

    onSubmit = (e) => {
        e.preventDefault();
        const form_data = { ...this.state, user: this.props.user.id };

        console.log('Adding address', form_data)
        this.props.addWhitelistAddress(form_data);
    };

    render() {
        if (!this.props.addresses)
            return <React.Fragment>Loading....</React.Fragment>
        return <React.Fragment>

            <Grid item xs={12} lg={6}>
                <Card style={{ padding: '1em', overflow: 'auto' }} >
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <h3>
                            My Addresses
                        </h3>

                        <Table>
                            <TableBody>
                                {this.props.addresses.results.map(address => (
                                    <AddressRow key={address.id} address={address} />
                                ))}

                            </TableBody>
                        </Table>
                        <Grid container spacing={2} >
                            <Grid item >

                                <TextField
                                    id="nickname"
                                    variant="outlined"
                                    margin="normal"
                                    label="Nickname"
                                    onChange={(e) => this.setState({ nickname: e.target.value })}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="address"
                                    variant="outlined"
                                    margin="normal"
                                    label="Address"
                                    onChange={(e) => this.setState({ address: e.target.value })}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{ marginTop: '1.7em' }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => this.onSubmit(e)}>

                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>

        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    addresses: state.auth.whitelist,
    new_address: state.auth.address
});

const mapDispatchToProps = (dispatch) => ({
    loadWhitelist: () => dispatch(loadWhitelist()),
    addWhitelistAddress: (form_data) => dispatch(addWhitelistAddress(form_data)),
    archiveAddress: (id) => dispatch(archiveAddress(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WhitelistAddress);