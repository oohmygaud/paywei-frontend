import React from 'react';
import { editInvoice, createInvoice, loadCurrencies } from '../store/actions/invoices';
import { loadWhitelist } from '../store/actions/auth';
import { loadInvoiceDetail, archiveInvoice, unarchiveInvoice } from '../store/actions/invoices';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Divider from '@material-ui/core/Divider';
import {renderMicroValue} from '../utils/formatting'

const ETH_PRICE = 303

class CreateEditInvoice extends React.Component {
    state = {
        title: "",
        recipient_email: "",
        pay_to: "",
        notes: "",
        due_date: null,
        invoice_amount: "",
        min_payment_threshold: 100,
        delivery: "email",
        line_items: [],
        copied: false,
        currency: ""
    }

    handleDateChange(date) {
        this.setState({ due_date: date })
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
        this.OnSubmitSave(e, {status: 'published'})
    };

    OnSubmitSave(e, extra_data) {
        e.preventDefault();
        const selected_currency = this.props.currencies.by_id[this.state.currency];

        const form_data = { ...this.state, user: this.props.user_id, invoice_amount: this.state.invoice_amount * (10**selected_currency.decimal_places), ...extra_data};
        if (this.props.match.params.id) {
            console.log('Editing', form_data)
            this.props.editInvoice(this.props.match.params.id, form_data);
        } else {
            console.log('Creating', form_data)
            this.props.createInvoice(form_data);
        }

    };

    addItem(e) {
        e.preventDefault();
        const line_items = this.state.line_items;
        const order = line_items.length ? line_items[line_items.length - 1].order + 1 : 1
        line_items.push({order, key: Math.random(), title:'', quantity:1, price:0})
        this.setState({line_items})
    }

    removeItem(e, idx) {
        e.preventDefault();
        const line_items = this.state.line_items;
        line_items.splice(idx, 1);
        line_items.map((item, idx) => {
            item.order = idx+1;
        })
        this.setState({line_items})
    }

    onChangeLineItem(idx, field, value) {
        const line_items = this.state.line_items;
        line_items[idx][field] = value;
        this.setState({line_items})
    }

    static getDerivedStateFromProps(nextProps, state) {
        const defaultState = { id: nextProps.invoice && nextProps.invoice.id }

        // If this is an edit page, we'll have props.subscription
        // so fill in all the state values from the props.subscription
        if (nextProps.invoice && nextProps.currencies && nextProps.invoice.id != state.id
            && nextProps.invoice.id == nextProps.match.params.id) {
            const selected_currency = nextProps.currencies.by_id[nextProps.invoice.currency];
            const invoice_amount = renderMicroValue(nextProps.invoice.invoice_amount, selected_currency.decimal_places);
            return {
                ...nextProps.invoice,
                due_date: new Date(nextProps.invoice.due_date),
                invoice_amount
            };
        }
        else {
            return defaultState;
        }
    }

    componentDidMount() {
        this.props.clearDetails()
        this.props.loadWhitelist()
        this.props.loadCurrencies()
        if (this.props.match.params.id)
            this.props.loadInvoiceDetail(this.props.match.params.id)

    }

    render() {
        if (!this.props.whitelist || !this.props.currencies || (!this.props.invoice && this.props.match.params.id))
            return <Typography>Loading...</Typography>
        let exists = this.props.created || this.props.invoice;
        const selected_currency = this.props.currencies.by_id[this.state.currency];


        return <React.Fragment>
            <Grid container>
                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/invoices'}><Button>Back to Invoice List</Button></Link>
                </Grid>
                
            </Grid>
            <Grid container justify="center" alignItems='center'>
                <Grid item xs={12} md={6} lg={4} >
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <Card style={{ padding: '1em' }}>

                            <FormControl variant="outlined">
                                <Select
                                    value={this.state.delivery}
                                    onChange={(e) => this.handleSendOption(e)}
                                    input={<OutlinedInput name="delivery" />}
                                >

                                    <MenuItem value={'email'}>Send as an Email</MenuItem>
                                    <MenuItem value={'link'}>Send as a Link</MenuItem>
                                </Select>
                            </FormControl>
                            
                                <TextField
                                    id="title"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={this.state.title}
                                    label="Title"
                                    onChange={(e) => this.setState({ title: e.target.value })}
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
                                <TextField
                                    id="recipient_email"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={this.state.recipient_email}
                                    label="Recipient Email"
                                    onChange={(e) => this.setState({ recipient_email: e.target.value })}
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
                                                startAdornment: <InputAdornment position="start">{selected_currency && selected_currency.symbol == 'ETH' ? 'Ξ' : '$'}</InputAdornment>,
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
                            <FormGroup>
                                <Typography id="discrete-slider" gutterBottom>
                                    Minimum Payment Threshold: {this.state.min_payment_threshold}%
                                </Typography>
                                <Slider
                                    defaultValue={100}
                                    getAriaValueText={this.valueText}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={5}
                                    marks
                                    min={5}
                                    max={100}
                                    margin="normal"
                                    onChange={(e, value) => this.setState({ min_payment_threshold: value })}
                                />

                            </FormGroup>
                            <FormGroup row>
                                <DatePicker
                                    selected={this.state.due_date}
                                    onChange={(e) => this.handleDateChange(e)}
                                    minDate={new Date()}
                                    placeholderText="Due Date"
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    customInput={<TextField
                                        label="Due Date"
                                        variant="outlined"
                                        margin="normal" />}
                                    showTimeInput
                                    showMonthDropdown
                                />
                            </FormGroup>
                            
                                <TextField
                                    id="notes"
                                    defaultValue={this.state.notes}
                                    label="Notes"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) => this.setState({ notes: e.target.value })}
                                />
                            
                        </Card>
                        <Card style={{ marginTop: '1em', padding: '1em' }}>
                            <h3>Invoice Line Items</h3>
                            {this.state.line_items.map((item, idx) => {
                                return <div key={item.key}>
                                    <div>
                                    <Grid container spacing={1}>
                                        <Grid item xs={2} sm={1} md={2} lg={1}>
                                            <TextField
                                                id="order"
                                                value={item.order}
                                                variant="outlined"
                                                margin="normal"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={10} sm={4}>
                                            <TextField
                                                id="title"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                value={item.title}
                                                onChange={(e) => this.onChangeLineItem(idx, 'title', e.target.value)}
                                                label="Title"
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={2}>
                                            <TextField
                                                    id="quantity"
                                                    value={item.quantity === undefined ? 1 : item.quantity}
                                                    variant="outlined"
                                                    margin="normal"
                                                    onChange={(e) => this.onChangeLineItem(idx, 'quantity', e.target.value)}
                                                    label="#"     
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                    id="price"
                                                    value={item.price}
                                                    variant="outlined"
                                                    margin="normal"
                                                    onChange={(e) => this.onChangeLineItem(idx, 'price', e.target.value)}
                                                    label="Price"
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position='start'>{this.state.currency == 'd79406c9' ? 'Ξ' : '$'}</InputAdornment>
                                                    }}
                                            />
                                        </Grid>
                                        
                                        
                                            <Button
                                                color="secondary"
                                                style={{ marginTop: "0.5em", marginRight: '0.5em' }}
                                                onClick={(e) => this.removeItem(e, idx)}
                                            >
                                                <RemoveCircle />
                                            </Button>
                                            <Divider variant="middle" />
                                    </Grid>
                                    </div>
                                    <div>
                                    <Divider light />
                                    </div>

                                    </div>
                                        
                            })}
                            
                            <Button
                                color="primary"
                                onClick={(e) => this.addItem(e)}
                            >
                                <AddCircleOutline />
                            </Button>
                        
                        </Card>
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
    whitelist: state.auth.whitelist,
    currencies: state.invoices.currencies,
});

const mapDispatchToProps = (dispatch) => ({
    createInvoice: (data) => dispatch(createInvoice(data)),
    editInvoice: (id, data) => dispatch(editInvoice(id, data)),
    archive: (id) => dispatch(archiveInvoice(id)),
    unarchive: (id) => dispatch(unarchiveInvoice(id)),
    loadInvoiceDetail: (id) => dispatch(loadInvoiceDetail(id)),
    clearDetails: () => dispatch({ type: 'CLEAR_INVOICE_DETAILS' }),
    loadWhitelist: () => dispatch(loadWhitelist('verified')),
    loadCurrencies: () => dispatch(loadCurrencies()),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditInvoice);
