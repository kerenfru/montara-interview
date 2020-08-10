import Header from "./components/Header/Header";
import React from "react";
import Container from '@material-ui/core/es/Container/Container';
import {Switch, Route, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import PrivateRoute from "./components/PrivateRoute";
import './App.scss';


import Login from "./pages/Login/Login";
import MainView from "./pages/MainView/MainView";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import commonStore from "./stores/commonStore";

@withRouter
@observer
export default class App extends React.Component {

    render() {

        if (commonStore.isAppLoaded) {
            return (
                <div>
                    <Header/>
                    <div className='app-main'>
                        <Container maxWidth='md'>
                            <Switch>
                                <Route path="/login" component={Login}/>
                                <Route path="/register" component={Register}/>
                                <PrivateRoute path="/settings" component={Settings}/>
                                <PrivateRoute exact path="/" component={MainView}/>
                            </Switch>
                        </Container>
                    </div>
                </div>
            );
        }
        return <Header/>;
    }
}
