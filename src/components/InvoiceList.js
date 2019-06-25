import React from 'react';
import { loadInvoiceList } from '../store/actions/invoices';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class InvoiceList extends React.Component {
    
    componentWillMount() {
        this.props.loadInvoiceList()
    }

    render() {
        if (!this.props.invoices)
            return <Typography>Loading...</Typography>

        return <React.Fragment>
            Hi
            <Grid item sm xs={4} style={{ marginTop: '1em', textAlign: "right" }}>
                    <Link to="/invoices/create">
                        <Button>Create</Button></Link>
                </Grid>
        </React.Fragment>
    
    }
}

const mapStateToProps = (state) => ({
    invoices: state.invoices.data
});

const mapDispatchToProps = (dispatch) => ({
    loadInvoiceList: () => dispatch(loadInvoiceList())
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);