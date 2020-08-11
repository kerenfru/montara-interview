import React from "react";
import {inject, observer} from "mobx-react";
import {withRouter, NavLink} from "react-router-dom";
import userStore from '../../stores/userStore';
import Alert from '@material-ui/lab/Alert/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import styles from './MainView.scss';
import {getDatePlus14Days, getQuarantineTimeLeft} from '@/shared/utils';
import Actions from './Actions/Actions';
import QuarantineLogs from './QuarantineLogs/QuarantineLogs';
import Card from './Card/Card';
import LoadingSpinner from '@/components/LoadingSpinner';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

@withRouter
@observer
export default class MainView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    logEntry = () => {
        userStore.setCanExit(true);
        userStore.logEntryUser({log: [...userStore.currentUser.log || [], {entry: new Date()}]})
    };

    exitEntry = () => {
        userStore.setCanExit(false);
        const last = (userStore.currentUser.log && userStore.currentUser.log.pop()) || {};
        userStore.exitEntryUser({log: [...userStore.currentUser.log || [], {...last, exit: new Date()}]})
    };

    iAmSick = () => {
        userStore.notifySick();
    };

    setUserInQuarantine = () => {
        userStore.setInQuarantine();
    };

    handleClose = () => {
        this.setState({open: false});
        this.setUserInQuarantine();
    };

    generateDialog() {
        return (
            <Dialog disableBackdropClick
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">⚠️</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div>You have been in touch with a sick employee.</div>
                        <div className='bold'> You are required to be under quarantine.</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Got it
                    </Button>
                </DialogActions>
            </Dialog>);
    }

    isNeedsToBeUnderQuarantine() {
        const {currentUser} = userStore;
        return userStore.hasInTouchWithSickEmployee && !currentUser.isQuarantine;
    }

    render() {
        const {currentUser, isLoading, logLoading, exitLoading, sickLoading} = userStore;
        if (isLoading) {
            return <LoadingSpinner/>
        }

        return (
            <div>
                {this.isNeedsToBeUnderQuarantine() && this.generateDialog()}

                <div className='container'>
                    <div className='details'>
                        <div className='title' data-cy="greeting">
                            Hi {currentUser.fname} {currentUser.lname},
                        </div>
                        <div className='subTitle'>Here are your personal COVID-19 details:</div>
                        <div className='cardsContainer'>
                            <Card {...{
                                condition: currentUser.isSick,
                                yesObj: {text: 'Sick', img: '🤒'},
                                noObj: {text: 'Healthy', img: '😀'}
                            }}/>
                            <Card {...{
                                condition: currentUser.isQuarantine,
                                yesObj: {text: 'In Quarantine', img: '😔'},
                                noObj: {text: 'Free! (not in quarantine)', img: '😀'}
                            }}/>
                        </div>
                    </div>


                    <Actions {...{
                        currentUser,
                        logEntry: this.logEntry,
                        exitEntry: this.exitEntry,
                        iAmSick: this.iAmSick,
                        logLoading,
                        exitLoading,
                        sickLoading
                    }}/>

                    {currentUser.quarantineDate &&
                    <QuarantineLogs {...{quarantineDate: currentUser.quarantineDate, getDatePlus14Days}}/>}
                </div>
            </div>
        );
    }
}
