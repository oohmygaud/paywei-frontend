import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { verifyAddress } from '../store/actions/auth';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class VerifyAddress extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.verifyAddress(this.props.match.params.id, this.props.match.params.secret)
    }
    render() {
        return <React.Fragment>
            <Grid container>
                <Grid item>
                    <Card>
                        <div>
                            Hello {this.props.user.username}
                            You are verifying {this.props.match.params.id}
                            with secret {this.props.match.params.secret}
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.onSubmit}
                            
                        > Verify
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    verifyAddress: (id, secret) => dispatch(verifyAddress(id, secret)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAddress);