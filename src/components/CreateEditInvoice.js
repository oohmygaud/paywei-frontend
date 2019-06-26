import React from 'react';
import { editInvoice, createInvoice } from '../store/actions/invoices';
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

export class CreateEditInvoice extends React.Component {
    state = {
        nickname: "",
        recipient_address: "",
        payee: "",
        description: "",
        due_date: null,
        total_wei_due: "",
        min_payment_threshold: 100
    }



    handleDateChange(date) {
        this.setState({ due_date: date })
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
                ...nextProps.invoice
            };
        }
        else {
            return defaultState;
        }
    }


    componentDidMount() {
        this.props.clearDetails()
        if (this.props.match.params.id)
            this.props.loadInvoiceDetail(this.props.match.params.id)
    }

    render() {
        if (!this.props.invoice && this.props.match.params.id)
            return <Typography>Loading...</Typography>

        return <React.Fragment>
            <Grid container justify="center">
                <Grid item xs={12} md={6} lg={3} >
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <Card style={{ padding: '1em' }}>

                            <FormGroup >
                                <TextField
                                    id="nickname"
                                    defaultValue={this.state.nickname}
                                    variant="outlined"
                                    margin="normal"
                                    label="Nickname"
                                    onChange={(e) => this.setState({ nickname: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup >
                                <TextField
                                    id="recipient_address"
                                    variant="outlined"
                                    margin="normal"
                                    defaultValue={this.state.recipient_address}
                                    label="Recipient Address"
                                    onChange={(e) => this.setState({ recipient_address: e.target.value })}
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
                                    id="description"
                                    defaultValue={this.state.description}
                                    label="Description"
                                    variant="outlined"
                                    margin="normal"
                                    onChange={(e) => this.setState({ description: e.target.value })}
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
            </Grid>
        </React.Fragment >


    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    user_id: state.auth.user_id,
    invoice: state.invoices.detail
});

const mapDispatchToProps = (dispatch) => ({
    createInvoice: (data) => dispatch(createInvoice(data)),
    editInvoice: (id, data) => dispatch(editInvoice(id, data)),
    archive: (id) => dispatch(archiveInvoice(id)),
    unarchive: (id) => dispatch(unarchiveInvoice(id)),
    loadInvoiceDetail: (id) => dispatch(loadInvoiceDetail(id)),
    clearDetails: () => dispatch({ type: 'CLEAR_INVOICE_DETAILS' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditInvoice);
