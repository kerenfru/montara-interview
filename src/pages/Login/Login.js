import React from "react";
import {withRouter, Link} from "react-router-dom";
import ListErrors from "../../components/ListErrors";
import {inject, observer} from "mobx-react";
import './Login.scss';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import authStore from '../../stores/authStore';

@withRouter
@observer
export default class Login extends React.Component {

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
        authStore.login(data).then(() => this.props.history.replace("/"));
    };

    render() {
        const {errors, inProgress} = authStore;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className='paper'>
                    <Avatar className='avatar'>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className='form' ref={this.form} onSubmit={this.handleSubmitForm}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className='submit'
                            disabled={inProgress}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="register" variant="body2">
                                    {"Don't have an account? Sign Up"}
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
