import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { getProfile, editProfile, loadWhitelist } from '../store/actions/auth';
import { loadCurrencies } from '../store/actions/invoices';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import WhitelistAddress from '../components/WhitelistAddress';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class ProfilePage extends React.Component {
    state = {
        default_pricing_currency: '',
        accepted_currencies: {},
        default_address: ''
    }

    componentWillMount() {
        this.props.getProfile(this.props.match.params.id)
        this.props.loadCurrencies()
        this.props.loadWhitelist()
    }

    onSubmit = (e) => {
        e.preventDefault();
        const form_data = { ...this.props.user, ...this.state };

        console.log('Editing', form_data)
        this.props.editProfile(form_data);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            console.log('Setting values', nextProps.user)
            this.setState({
                email: nextProps.user.email,
                first_name: nextProps.user.first_name,
                last_name: nextProps.user.last_name,
                default_address: nextProps.user.default_address,
                default_pricing_currency: nextProps.user.default_pricing_currency
            });
        }
    }

    render() {
        console.log("rendering", this.state)
        if (!this.props.user || !this.props.currencies || !this.props.whitelist)
            return <Typography>Loading...</Typography>


        return <React.Fragment>
            <h1 style={{ textAlign: 'center' }}>
                User Settings
            </h1>
            <Grid
                container
                justify="center"
                spacing={4}
            >
                <Grid item xs={12} md={6} lg={3}>


                    <Card style={{ padding: '1em' }}>
                        <h3 style={{ marginBottom: '1.5em' }}>User Info</h3>

                        <form onSubmit={(e) => this.onSubmit(e)}>

                            <FormGroup row>
                                <TextField id="username"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={this.props.user.username}
                                    disabled />
                            </FormGroup>
                            <FormGroup row>
                                <TextField id="email"
                                    label="Email"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={this.props.user.email}
                                    disabled
                                    onChange={(e) => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup row>
                                <TextField id="first_name"
                                    label="First Name"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={this.props.user.first_name}
                                    onChange={(e) => this.setState({ first_name: e.target.value })} />
                            </FormGroup>
                            <FormGroup row>
                                <TextField id="last_name"
                                    label="Last Name"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={this.props.user.last_name}
                                    onChange={(e) => this.setState({ last_name: e.target.value })} />
                            </FormGroup>



                            <Button
                                style={{ marginRight: '1em', marginTop: '1em' }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={this.OnSubmit}>

                                Update
                            </Button>
                        </form>
                    </Card>
                </Grid>
                <Grid item lg={2}>
                    <Grid container direction='column' spacing={3}>
                        <Grid item>
                            <Card style={{ padding: '1em'}}>
                                <FormControl fullWidth>
                                    <h4>Default Address</h4>
                                    <FormGroup>
                                        <Select
                                            value={this.state.default_address}
                                            onChange={(e) => this.setState({ default_address: e.target.value })}
                                        >
                                            {this.props.whitelist.results.map(address => (
                                                <MenuItem value={address.id} key={address.id}>
                                                    {address.nickname}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormGroup>
                                </FormControl>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card style={{ padding: '1em' }}>
                                <FormControl>
                                    <h4>Accepted Currencies</h4>
                                    <FormGroup>
                                        {this.props.currencies.results.map(currency => (
                                            <FormControlLabel
                                                key={currency.id}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.accepted_currencies[currency.symbol] || false}
                                                        onChange={(e) => this.setState({ accepted_currencies: { ...this.state.accepted_currencies, [currency.symbol]: e.target.checked } })}
                                                        value={currency.id}
                                                    />
                                                }
                                                label={currency.symbol}
                                            />
                                        ))}

                                    </FormGroup>
                                </FormControl>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card style={{ padding: '1em' }}>
                                <FormControl>
                                    <h4>Default Pricing Currency</h4>
                                    <FormGroup>
                                        <Select
                                            value={this.state.default_pricing_currency}
                                            onChange={(e) => this.setState({ default_pricing_currency: e.target.value })}
                                        >
                                            {this.props.currencies.results.map(currency => (
                                                <MenuItem value={currency.id} key={currency.id}>
                                                    {currency.symbol}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormGroup>
                                </FormControl>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>

                <WhitelistAddress />

            </Grid>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    currencies: state.invoices.currencies,
    whitelist: state.auth.whitelist
});

const mapDispatchToProps = (dispatch) => ({
    getProfile: () => dispatch(getProfile()),
    editProfile: (data) => dispatch(editProfile(data)),
    loadCurrencies: () => dispatch(loadCurrencies()),
    loadWhitelist: () => dispatch(loadWhitelist('verified')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);