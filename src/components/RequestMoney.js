import React from 'react';
import { createInvoice, loadCurrencies } from '../store/actions/invoices';
import { getProfile, loadWhitelist } from '../store/actions/auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';

class RequestMoney extends React.Component {
    state = {
        title: "",
        send_to_email: false,
        recipient_email: "",
        pay_to: "",
        notes: "",
        invoice_amount: "",
        delivery: "email",
        show_advanced: false,
        currency: ""
    }

    handleSendOption(event) {
        this.setState({ delivery: event.target.value })

    }

    handleAddressChange(event) {
        console.log(event)
        this.setState({ pay_to: event.target.value })
    }

    valueText(value) {
        return `${value}%`;
    }

    OnSubmitSend(e) {
        e.preventDefault();
        const form_data = { ...this.state, user: this.props.user_id, status: 'published' };
        console.log('Creating', form_data);
        this.props.createInvoice(form_data);
    };

    OnSubmitSave(e) {
        e.preventDefault();
        const form_data = { ...this.state, user: this.props.user_id, invoice_amount: this.state.invoice_amount };
        console.log('Creating', form_data)
        this.props.createInvoice(form_data);
    };

    componentWillMount() {
        this.props.loadCurrencies()
        this.props.getProfile()
        this.props.loadWhitelist()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            console.log('Setting values', nextProps.user)
            this.setState({
                pay_to: nextProps.user.default_address || "",
                currency: nextProps.user.default_pricing_currency || ""
            });
        }
    }


    render() {
        if (!this.props.currencies || !this.props.user || !this.props.whitelist) {
            return <Typography>Loading...</Typography>
        }
        return <React.Fragment>
            <Grid container>
                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/invoices'}><Button>Back to Invoice List</Button></Link>
                </Grid>
            </Grid>
            <Grid container justify="center" alignItems='center'>
                <Grid item xs={12} md={6} lg={3} >
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <Card style={{ padding: '1em' }}>
                            <TextField
                                id="title"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                defaultValue={this.state.title}
                                label="Title"
                                onChange={(e) => this.setState({ title: e.target.value })}
                            />
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="invoice_amount"
                                        fullWidth
                                        value={this.state.invoice_amount}
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        label="Total Due"
                                        onChange={(e) => this.setState({ invoice_amount: e.target.value })} 
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'>{this.state.currency == 'd79406c9' ? 'Ξ' : '$'}</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl margin='normal' fullWidth>
                                        <InputLabel>Currency</InputLabel>
                                            <Select
                                                value={this.state.currency}
                                                onChange={(e) => this.setState({ currency: e.target.value })}
                                            >
                                            {this.props.currencies.results.map(currency => (
                                                <MenuItem value={currency.id} key={currency.id}>
                                                    {currency.title} ({currency.symbol})
                                                </MenuItem>
                                            ))}
                                        
                                            </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Switch
                                    onChange={(e) => this.setState({ show_advanced: e.target.checked })}
                                    value="show_advanced"
                                    color="primary"
                                    checked={this.state.show_advanced}
                                    />
                                }
                                label="Show advanced options..."
                            />
                        </Card>
                        { this.state.show_advanced ? 
                            <Card style={{marginTop: '1em', padding: '1em'}}>
                                <h4>Advanced Options</h4>

                                    <TextField
                                    id="notes"
                                    defaultValue={this.state.notes}
                                    label="Notes"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) => this.setState({ notes: e.target.value })}
                                    />
                                <FormControl margin="normal" variant="outlined" style={{ display: 'flex' }}>
                                    <InputLabel>
                                        Pay To
                                    </InputLabel>
                                    <Select
                                        value={this.state.pay_to}
                                        onChange={(e) => this.handleAddressChange(e)}
                                        input={<OutlinedInput labelWidth={50} name="pay_to" id="pay_to" />}
                                    >
                                        {this.props.whitelist.results.map(entry => (
                                            <MenuItem key={entry.id} value={entry.id}>{entry.nickname} - {entry.address}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            
                                <FormGroup row>
                                    <FormControlLabel
                                    control={
                                        <Switch
                                        onChange={(e) => this.setState({ send_to_email: e.target.checked })}
                                        value="send_to_email"
                                        color="primary"
                                        checked={this.state.send_to_email}
                                        />
                                    }
                                    label="Send as an Email"
                                    />
                                        {this.state.send_to_email ?
                                    <TextField
                                        id="recipient_email"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        defaultValue={this.state.recipient_email}
                                        label="Recipient Email"
                                        onChange={(e) => this.setState({ recipient_email: e.target.value })}
                                    /> : null
                                        }

                                </FormGroup>
                            </Card> : null }
                                
                            <Button
                                style={{ marginTop: "1em", marginRight: "1em" }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={(e) => this.OnSubmitSave(e)}>
                                
                                    {!this.props.invoice ? "Save" : "Edit Invoice"}
                                
                            </Button>
                            <Button
                                style={{ marginTop: "1em" }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={(e) => this.OnSubmitSend(e)}>
                                
                                    Send Now
                                
                            </Button>
                    </form>
                </Grid>

            </Grid>
        </React.Fragment >


    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    user_id: state.auth.user_id,
    invoice: state.invoices.detail,
    created: state.invoices.created,
    currencies: state.invoices.currencies,
    whitelist: state.auth.whitelist
});

const mapDispatchToProps = (dispatch) => ({
    createInvoice: (data) => dispatch(createInvoice(data)),
    loadCurrencies: () => dispatch(loadCurrencies()),
    getProfile: () => dispatch(getProfile()),
    loadWhitelist: () => dispatch(loadWhitelist('verified'))
    
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestMoney);
