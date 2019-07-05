import React from 'react';
import { editInvoice, createInvoice } from '../store/actions/invoices';
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
import Slider from '@material-ui/lab/Slider';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import palette from '../theme/palette'

class CreateEditInvoice extends React.Component {
    state = {
        title: "",
        recipient_email: "",
        pay_to: "",
        notes: "",
        due_date: null,
        total_wei_due: "",
        min_payment_threshold: 100,
        delivery: "email"
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

    OnSubmit(e) {
        e.preventDefault();
        const form_data = { ...this.state, user: this.props.user_id };

        if (this.props.match.params.id) {
            console.log('Editing', form_data)
            this.props.editInvoice(this.props.match.params.id, form_data);
        } else {
            console.log('Creating', form_data)
            this.props.createInvoice(form_data);
        }


    };

    static getDerivedStateFromProps(nextProps, state) {
        const defaultState = { id: nextProps.invoice && nextProps.invoice.id }

        // If this is an edit page, we'll have props.subscription
        // so fill in all the state values from the props.subscription
        if (nextProps.invoice && nextProps.invoice.id != state.id
            && nextProps.invoice.id == nextProps.match.params.id) {
            return {
                ...nextProps.invoice,
                due_date: new Date(nextProps.invoice.due_date)
            };
        }
        else {
            return defaultState;
        }
    }


    componentDidMount() {
        this.props.clearDetails()
        this.props.loadWhitelist()
        if (this.props.match.params.id)
            this.props.loadInvoiceDetail(this.props.match.params.id)
        
    }

    render() {
        if (!this.props.whitelist || (!this.props.invoice && this.props.match.params.id))
            return <Typography>Loading...</Typography>
        let exists = this.props.created || this.props.invoice;

        return <React.Fragment>
            <Grid container justify="center" spacing={4} alignItems='center' style={{ margin: '0.5em'}}>
                <Grid item xs={12} md={6} lg={3} >
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

                            <FormGroup >
                                <TextField
                                    id="title"
                                    defaultValue={this.state.title}
                                    variant="outlined"
                                    margin="normal"
                                    label="Title"
                                    onChange={(e) => this.setState({ title: e.target.value })}
                                />
                            </FormGroup>

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

                            <FormGroup >
                                <TextField
                                    id="recipient_email"
                                    variant="outlined"
                                    margin="normal"
                                    defaultValue={this.state.recipient_email}
                                    label="Recipient Email"
                                    onChange={(e) => this.setState({ recipient_email: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup>
                                <TextField
                                    id="total_wei_due"
                                    defaultValue={this.state.total_wei_due}
                                    type="number"
                                    variant="outlined"
                                    margin="normal"
                                    label="Total Wei Due"
                                    onChange={(e) => this.setState({ total_wei_due: e.target.value })}
                                />
                            </FormGroup>

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
                            <FormGroup>
                                <TextField
                                    id="notes"
                                    defaultValue={this.state.notes}
                                    label="Notes"
                                    variant="outlined"
                                    margin="normal"
                                    onChange={(e) => this.setState({ notes: e.target.value })}
                                />
                            </FormGroup>


                            <Button
                                style={{ marginTop: "1em" }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={(e) => this.OnSubmit(e)}>
                                <Typography variant="button" gutterBottom className="logintypography">
                                    {!this.props.invoice ? "Create Invoice" : "Edit Invoice"}
                                </Typography>
                            </Button>

                        </Card>
                    </form>
                </Grid>
                {exists && exists.delivery == 'link' ?
                    <Grid item xs={12} md={6} lg={3} >
                        <Card style={{ padding: '1em' }} style={{ background: palette.blue, padding: '1em', textAlign: 'center' }}>
                            <h2 style={{ color: 'white' }}>Copy the link & Send your invoice!</h2>
                            <h4 style={{ display: 'inline-block', color: 'white' }}>https://PayWei.co/pay/{exists.id}</h4>
                            <br />
                            <Button color='primary' variant='contained' style={{ margin: '1.5em' }}>
                                <FileCopyIcon />
                            </Button>
                        </Card>
                    </Grid>

                    : null}
            </Grid>
        </React.Fragment >


    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    user_id: state.auth.user_id,
    invoice: state.invoices.detail,
    created: state.invoices.created,
    whitelist: state.auth.whitelist
});

const mapDispatchToProps = (dispatch) => ({
    createInvoice: (data) => dispatch(createInvoice(data)),
    editInvoice: (id, data) => dispatch(editInvoice(id, data)),
    archive: (id) => dispatch(archiveInvoice(id)),
    unarchive: (id) => dispatch(unarchiveInvoice(id)),
    loadInvoiceDetail: (id) => dispatch(loadInvoiceDetail(id)),
    clearDetails: () => dispatch({ type: 'CLEAR_INVOICE_DETAILS' }),
    loadWhitelist: () => dispatch(loadWhitelist())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditInvoice);
