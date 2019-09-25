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
import invoice_sample from '../../public/invoice_sample.png'

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
    <Grid container justify='center'>
        <Grid item xs={12} sm={4}>
          <h1 style={{ textAlign: 'center', marginTop: '2em' }}>
            Invoices made easy
          </h1>
          <br />
          <h2 style={{ textAlign:'center' }}>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Full or partial payments
          </h2>
          <h2 style={{ textAlign:'center' }}>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Invoice for any cryptocurrency
          </h2>
          <h2 style={{ textAlign:'center' }}>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Fast, easy, and immutable
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

        <Grid item xs={12} sm={4}>
          <img style={{ maxHeight: '70%'}}src={'/createInvoice.png'}></img>
        </Grid>
      </Grid>
      </div>
      <br />

      <Grid
        container
        justify='center'
      >
        <Grid item xs={12} lg={4}>

        </Grid>


      </Grid>

      <br />


      <Grid container justify="center">
        <Grid item sm={3} style={{ textAlign: 'center' }}>
          <div>
            <WebIcon style={{ fontSize: 100 }} />
            <h3>
              One benefit
            </h3>
            <p>
              Something good to brag about
            </p>
          </div>
        </Grid>
        <Grid item sm={3} style={{ textAlign: 'center' }}>
          <div>
            <ChildFriendlyIcon style={{ fontSize: 100 }} />
            <h3>
              Easy to Use
            </h3>
            <p>
              Don't install web3, don't run a node, just subscribe.
            </p>
          </div>
        </Grid>
        <Grid item sm={3} style={{ textAlign: 'center' }}>
          <div>
            <MoneyOffIcon style={{ fontSize: 100 }} />
            <h3>
              Not free in Beta
            </h3>
            <p>
              And you can send us beer money!
            </p>
          </div>
        </Grid>
      </Grid>
      <br />

     
    </React.Fragment>

  }
}

export default LandingPage;
