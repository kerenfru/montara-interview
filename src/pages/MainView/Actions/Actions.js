import React from "react";
import userStore from '../../../stores/userStore';
import Button from "@material-ui/core/Button";

export default class Actions extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser, exitEntry, logEntry, iAmSick } = this.props;
        return (
            <div className='actions'>
                <div className='subTitle'>Actions:</div>
                <div className='buttons'>
                    <Button variant="outlined" color="primary" onClick={logEntry} daya-cy='entry'
                            disabled={currentUser.isSick || currentUser.isQuarantine || userStore.canEntry}>
                        Log Entry
                    </Button>
                    <Button variant="outlined" color="primary" onClick={exitEntry} daya-cy='exit'
                            disabled={userStore.canExit}>
                        Exit Entry
                    </Button>
                    <Button variant="outlined" color="primary" onClick={iAmSick} daya-cy='sick'
                            disabled={currentUser.isSick}>
                        I am Sick
                    </Button>
                </div>
            </div>)
    }
}