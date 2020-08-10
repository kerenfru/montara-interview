import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import './Header.scss';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <div>
                <Button color="inherit">
                    <Link to="/" className="link">
                        Home
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/login" className="link">
                        Sign in
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/register" className="link">
                        Sign up
                    </Link>
                </Button>
            </div>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <div>
                <Button color="inherit">
                    <Link to="/" className="link">
                        Home
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/settings" className="link">
                        Settings
                    </Link>
                </Button>

                <Button color="inherit" onClick={props.logOut}>
                        Log Out
                </Button>
            </div>
        );
    }

    return null;
};

@inject('userStore', 'commonStore', 'authStore')
@observer
class Header extends React.Component {
    handleClickLogout = () =>
        this.props.authStore.logout().then(() => this.props.history && this.props.history.replace("/"));

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className='grow'>
                        {this.props.commonStore.appName}
                    </Typography>
                    <LoggedOutView currentUser={this.props.userStore.currentUser}/>
                    <LoggedInView currentUser={this.props.userStore.currentUser} logOut={this.handleClickLogout}/>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
