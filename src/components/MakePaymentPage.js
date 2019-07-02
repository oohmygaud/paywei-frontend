import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { loadInvoiceDetail } from '../store/actions/invoices';
import getWeb3 from "../utils/getWeb3";
import PaymentContract from "../utils/Payment.json";

class MakePaymentPage extends React.Component {
    state = {
        web3: null,
        accounts: null,
        contract: null,
        error: null
    }

    componentDidMount() {
        if (this.props.match.params.id)
            this.props.loadInvoiceDetail(this.props.match.params.id)
        this.setState({ web3: null, accounts: null, contract: null })
        this.connectWeb3();
    }

    onSubmit = async (e) => {
        e.preventDefault();
        console.log('onSubmit')
        const BN = this.state.web3.utils.BN;
        const bill = new BN(this.props.invoice.total_wei_due);
        const fee = new BN("10000000000000000"); // fill this in
        const total = bill.add(fee);

        await this.state.contract.methods.makePayment(
            bill.toString(10),
            '0xC2C255932A77F4831566822c1f01d9F735CC152E',
            fee.toString(10),
            '0xC2C255932A77F4831566822c1f01d9F735CC152E',
            this.props.invoice.id
        ).send({from: this.state.accounts[0], value: total})
    }

    connectWeb3 = async () => {
        console.log('connecting')
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = PaymentContract.networks[networkId];
            const deployedAddress = deployedNetwork && deployedNetwork.address
            console.log('Connected to web3:', networkId, accounts, deployedNetwork)
            const instance = new web3.eth.Contract(
                PaymentContract.abi, deployedAddress
            );
            if (web3 && accounts && instance)
                this.setState({ web3, accounts, contract: instance })
            else
                this.setState({ error: 'Metamask is not connected to Mainnet' })
        } catch (e) {
            console.log('error', e)
            this.setState({ error: 'Metamask is not connected to Mainnet' })
        }
    }

    render() {
        if (!this.props.invoice && this.props.match.params.id)
            return <Typography>Loading...</Typography>
        if (this.state.error)
            return <Typography>{this.state.error}</Typography>
        if (!this.state.web3)
            return <Typography>Web3 Not Mounted, is Metamask installed?</Typography>
        
        return <React.Fragment>
            <Grid container justify="center">
                <Grid item xs={10} md={6} lg={3} >
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <Card style={{ padding: '1em' }}>
                            <FormGroup>
                                <TextField
                                    id="invoice_id"
                                    label="Invoice Id"
                                    defaultValue={this.props.invoice.id}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                        <TextField
                                            id="total_wei_due"
                                            label="Total WEI Due"
                                            defaultValue={this.props.invoice.total_wei_due}
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            id="total_eth_due"
                                            label="Total ETH Due"
                                            defaultValue={window.web3.fromWei(this.props.invoice.total_wei_due)}
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>

                                </Grid>
                                <TextField
                                    id="amount"
                                    label="Payment Amount"
                                    defaultValue={this.props.invoice.total_wei_due}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />

                            </FormGroup>

                            <Button
                                style={{ marginTop: "1em" }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={(e) => this.onSubmit(e)}>
                                    Make Payment
    
                            </Button>

                        </Card>
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    invoice: state.invoices.detail
});

const mapDispatchToProps = (dispatch) => ({
    loadInvoiceDetail: (id) => dispatch(loadInvoiceDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MakePaymentPage);
