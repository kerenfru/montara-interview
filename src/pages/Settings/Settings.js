import React from "react";
import {withRouter} from "react-router-dom";
import ListErrors from "../../components/ListErrors";
import {inject, observer} from "mobx-react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AccountCircle from '@material-ui/icons/esm/AccountCircle';
import userStore from '@/stores/userStore';

@observer
class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.validate = this.validate.bind(this);
        this.state = {
            formControls: {
                email: props.currentUser.getEmail,
                firstName:props.currentUser.fname,
                lastName: props.currentUser.lname,
            }
        }
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: value,
            }
        });
    };

    validate() {
        this.form.current.reportValidity();
    }

    handleSubmitForm = e => {
        e.preventDefault();
        userStore.updateUser(this.state.formControls);
    };

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className='paper'>
                    <Avatar className='avatar'>
                        <AccountCircle/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Your Settings
                    </Typography>
                    <form className='form' ref={this.form} onSubmit={this.handleSubmitForm}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={this.state.formControls.firstName}
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={this.state.formControls.lastName}
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.formControls.email}
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className='submit'
                        >
                            Update Profile
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

@inject("userStore")
@withRouter
@observer
class Settings extends React.Component {
    render() {
        return (
            <div>
                <ListErrors errors={this.props.userStore.updatingUserErrors}/>
                <SettingsForm
                    currentUser={this.props.userStore.currentUser}
                    onSubmitForm={user => this.props.userStore.updateUser(user)}
                />
            </div>
        );
    }
}

export default Settings;
