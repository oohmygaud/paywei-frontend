import React from 'react';
import { createAPIKey } from '../store/actions/api_keys';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

export class CreateAPIKey extends React.Component {
    state = {
        nickname: "",
    }

    OnSubmit = (e) => {
        e.preventDefault();
        const form_data = { ...this.state, user: this.props.user_id };

        console.log('Creating', form_data)
        this.props.createAPIKey(form_data);
    };

    render() {

        return <Grid container>
            <Grid item xs={6}>
                <Card style={{ padding: '1em' }}>
                    <form onSubmit={this.OnSubmit}>
                        <FormGroup fullwidth='true'>
                            <TextField id="nickname"
                                label="Nickname"
                                variant="outlined"
                                margin="normal"
                                fullwidth='true'
                                onChange={(e) => this.setState({ nickname: e.target.value })} />
                        </FormGroup>
                        
                        <Button type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.OnSubmit}>
                                Create API Key
                        </Button>
                    </form>
                </Card>
            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
    }

}
const mapStateToProps = (state) => ({
    user_id: state.auth.user_id,
})
const mapDispatchToProps = (dispatch) => ({
    createAPIKey: (data) => dispatch(createAPIKey(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAPIKey);