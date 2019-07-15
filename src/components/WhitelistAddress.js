import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { loadWhitelist, addWhitelistAddress } from '../store/actions/auth';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TimeAgo from 'timeago-react';

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

            <Grid item >
                <Card style={{ padding: '1em' }}>
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <h1>
                            Whitelist Addresses
                        </h1>

                        <Table>
                            <TableBody>
                                {this.props.addresses.results.map(address => (
                                    <TableRow key={address.id}>
                                        <TableCell>
                                            <TimeAgo datetime={address.created_at} />
                                        </TableCell>
                                        <TableCell>
                                            {address.nickname}
                                        </TableCell>
                                        <TableCell>
                                            {address.address}
                                        </TableCell>
                                        <TableCell>
                                            {address.status}
                                        </TableCell>
                                    </TableRow>
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
    addWhitelistAddress: (form_data) => dispatch(addWhitelistAddress(form_data))
});

export default connect(mapStateToProps, mapDispatchToProps)(WhitelistAddress);