import { Link } from "react-router-dom";
import ListErrors from "../../components/ListErrors";
import React from "react";
import {inject, observer} from "mobx-react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Register.scss';
import Fingerprint from '@material-ui/icons/esm/Fingerprint';
import authStore from '../../stores/authStore';

@observer
export default class Register extends React.Component {
    constructor() {
        super();
        this.form = React.createRef();
        this.validate = this.validate.bind(this);
    }

    validate() {
        this.form.current.reportValidity();
    }

    handleSubmitForm = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        authStore.register(data).then(() => this.props.history.push("/"));
    };

    render() {
        const {errors, inProgress} = authStore;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className='paper'>
                    <Avatar className='avatar'>
                        <Fingerprint/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            data-cy="submit"
                            variant="contained"
                            color="primary"
                            className='submit'
                            disabled={inProgress}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <ListErrors errors={errors}/>
            </Container>
        );
    }
}
