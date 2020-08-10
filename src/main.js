import React from "react";
import ReactDOM from "react-dom";
import promiseFinally from "promise.prototype.finally";
import {HashRouter} from "react-router-dom";
import {Provider} from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

import authStore from "./stores/authStore";
import commonStore from "./stores/commonStore";
import userStore from "./stores/userStore";
import profileStore from "./stores/profileStore";

const stores = {
    authStore,
    commonStore,
    userStore,
    profileStore
};

import App from "./App";
// import './index.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: purple[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <MuiThemeProvider>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </MuiThemeProvider>
        </HashRouter>
    </Provider>
    , document.getElementById('app'));

if (module.hot) {
    // enables hot module replacement if plugin is installed
    module.hot.accept();
}