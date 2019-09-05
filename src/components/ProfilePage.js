import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { getProfile, editProfile } from '../store/actions/auth';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import WhitelistAddress from '../components/WhitelistAddress';

class ProfilePage extends React.Component {
    state = {

    }

    componentWillMount() {
        this.props.getProfile(this.props.match.params.id)
    }

    onSubmit = (e) => {
        e.preventDefault();
        const form_data = { ...this.props.user, ...this.state };

        console.log('Editing', form_data)
        this.props.editProfile(form_data);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            console.log('Setting values', nextProps.user)
            this.setState({
                email: nextProps.user.email,
                first_name: nextProps.user.first_name,
                last_name: nextProps.user.last_name
            });
        }
    }

    render() {
        console.log("rendering", this.state)
        if (!this.props.user)
            return <Typography>Loading...</Typography>


        return <React.Fragment>
            <Grid 
                container 
                justify="center"
                spacing={3} 
            >
                <Grid item xs={12} md={6} lg={3}>


                    <Card style={{ padding: '1em' }}>
                        
                        <form onSubmit={(e) => this.onSubmit(e)}>
                        <h1>
                            User Settings
                        </h1>
                            <FormGroup row>
                                <TextField id="username"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={this.props.user.username}
                                    disabled />
                            </FormGroup>
                            <FormGroup row>
                                <TextField id="email"
                                    label="Email"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={this.props.user.email}
                                    disabled
                                    onChange={(e) => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup row>
                                <TextField id="first_name"
                                    label="First Name"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={this.props.user.first_name}
                                    onChange={(e) => this.setState({ first_name: e.target.value })} />
                            </FormGroup>
                            <FormGroup row>
                                <TextField id="last_name"
                                    label="Last Name"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={this.props.user.last_name}
                                    onChange={(e) => this.setState({ last_name: e.target.value })} />
                            </FormGroup>



                            <Button
                                style={{ marginRight: '1em', marginTop: '1em' }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={this.OnSubmit}>

                                Update
                    </Button>
                        </form>
                    </Card>
                </Grid>
                <WhitelistAddress />
            </Grid>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    getProfile: () => dispatch(getProfile()),
    editProfile: (data) => dispatch(editProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);