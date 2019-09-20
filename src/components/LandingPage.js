import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
      background: 'url(gplaypattern.png)'
    }

    return <React.Fragment>
    <br />
    <Grid
        container
        justify='center'
      >
        <Grid item xs={12} sm={6}>
          <div style={{padding: '1em', textAlign: 'center'}}>
          <h1>
            Invoices <br /> made easy
          </h1>
          <br />
          <h2>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Full or partial payments
          </h2>
          <h2>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Invoice for any cryptocurrency
          </h2>
          <h2>
            <AddCircleOutline style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
            Fast, easy, and immutable
          </h2>
          <Link to={'/learn_more'}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '1em', marginTop: '2em' }}
            >
              Learn More
            </Button>
          </Link>
          <Link to={'/registration'}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: '1em', marginTop: '2em' }}
            >
              Register
            </Button>
          </Link>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} style={{ background: "url(/gplaypattern.png)" }}>

        </Grid>
      </Grid>
      <br />

      <Grid
        container
        justify='center'
      >
        <Grid item xs={12} lg={4}>
          <center>
            <img src={invoice_sample} style={{maxWidth: '90vw'}} />
          </center>
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
