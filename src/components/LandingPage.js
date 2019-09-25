import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
require('prismjs');
require('prismjs/components/prism-bash')
require('prismjs/themes/prism-okaidia.css');
import { Link } from 'react-router-dom';
import WebIcon from '@material-ui/icons/Web';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

class LandingPage extends React.Component {
  state = {
    tab: 0
  }
  render() {

    let heroStyle = {
      background: 'url(/gplaypattern.png)'
    }

    return <React.Fragment>
      <div style={{ background: 'url(/gplaypattern.png)'}}>
    <Grid container justify='center' spacing={2} alignItems='center'>
        <Grid item xs={12} sm={6}>
          <h1 style={{ textAlign: 'center', marginTop: '1em' }}>
            Invoices made easy
          </h1>
          <br />
          <h2 style={{ textAlign:'center' }}>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Unified Payment Management
          </h2>
          <h2 style={{ textAlign:'center' }}>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Accept ETH or DAI Payments
          </h2>
          <h2 style={{ textAlign:'center' }}>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Fast, Easy, and Immutable
          </h2>
          <br />
          <center>
          <Link to={'/registration'}>
            <Button
              variant="contained"
              color="secondary"
            >
              Register
            </Button>
          </Link>
          </center>
        </Grid>

        <Grid item xs={12} sm={6}>
          <img style={{ marginTop: '1em', maxHeight: '100%', maxWidth: '95%', align:'middle' }}src={'/createInvoice.png'}></img>
        </Grid>
      </Grid>
      </div>

      <Grid container justify="center">
        <Grid item sm={3} style={{ textAlign: 'center', marginTop: '2em' }}>
          <div>
            <WebIcon style={{ fontSize: 100 }} />
            <h3>
              Payments Management
            </h3>
            <p>
              See all your Ethereum payments in one place
            </p>
          </div>
        </Grid>
        <Grid item sm={3} style={{ textAlign: 'center', marginTop: '2em' }}>
          <div>
            <ChildFriendlyIcon style={{ fontSize: 100 }} />
            <h3>
              Easy to Use
            </h3>
            <p>
              Send invoices and receive payments in ETH or DAI
            </p>
          </div>
        </Grid>
        <Grid item sm={3} style={{ textAlign: 'center', marginTop: '2em' }}>
          <div>
            <MoneyOffIcon style={{ fontSize: 100 }} />
            <h3>
              Free For Basic Use
            </h3>
            <p>
              Non-commercial accounts enjoy no usage limits!
            </p>
          </div>
        </Grid>
      </Grid>
      <br />

     
    </React.Fragment>

  }
}

export default LandingPage;
