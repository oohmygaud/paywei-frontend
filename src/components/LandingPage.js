import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import palette from '../theme/palette'
import { baseURL } from '../store/api';
import Card from '@material-ui/core/Card';
require('prismjs');
require('prismjs/components/prism-bash')
require('prismjs/themes/prism-okaidia.css');
import { Link } from 'react-router-dom';
import WebIcon from '@material-ui/icons/Web';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

class LandingPage extends React.Component {
  state = {
    tab: 0
  }
  render() {
    let heroStyle = {
	background: palette.dark_purple
    }

    return <div className="landingPagebodyComponent">

      <br />
      <div className="hero-image" style={heroStyle}>
        <Grid container>
          <Grid item lg={2}></Grid>
          <Grid item lg={4} md={6} style={{ padding: '2em' }}>

            <div className="hero-text">
              <h1>Invoices</h1>
              <p style={{ fontSize: 18 }}>Paywei is a SaaS for invoices.</p>
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
                  Try PayWei Now
        </Button>
              </Link>
            </div>

          </Grid>
          <Grid item lg={4} md={6} style={{ padding: '2em', overflow: 'hidden' }}>

          </Grid>
          <Grid item lg={2}></Grid>
        </Grid>
      </div>



      <Grid container>
        <Grid item sm={4} style={{ padding: '3em', textAlign: 'center' }}>
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
        <Grid item sm={4} style={{ padding: '3em', textAlign: 'center' }}>
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
        <Grid item sm={4} style={{ padding: '3em', textAlign: 'center' }}>
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

    </div>

  }
}

export default LandingPage;
