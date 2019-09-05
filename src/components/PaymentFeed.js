import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { loadPaymentList } from '../store/actions/invoices';
import { connect } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TimeAgo from 'timeago-react';
import _ from 'lodash';

class PaymentFeed extends React.Component {
  componentWillMount() {
    this.props.loadPaymentList()
  }

  render() {
    if(!this.props.payment)
      return null;
    return <Grid container>
      <Grid item xs={12}>
        {_.slice(this.props.payment.results, 0, 5).map(payment => (
          <Card key={payment.id} style={{ margin: '1em' }}>
            <CardContent>
              <CheckCircleIcon />
              <TimeAgo datetime={payment.created_at} />
              <br /> {payment.amount_in_wei/10E18} ETH {payment.status} 
              <br /> FROM {payment.from_address} <br />
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  }
}

const mapStateToProps = (state) => ({
  payment: state.invoices.payments,
});

const mapDispatchToProps = (dispatch) => ({
  loadPaymentList: () => dispatch(loadPaymentList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentFeed);