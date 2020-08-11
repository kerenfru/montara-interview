import React from "react";
import {Countdown} from '../../../components/CountDown/CountDown';

export default class QuarantineLogs extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {quarantineDate, getDatePlus14Days} = this.props;
        return (
            <div className='sickLog'>
                <div className='subTitle'>Quarantine log:</div>
                <div className=''>Start Date: {new Date(quarantineDate).toLocaleDateString()}</div>
                <div className='center'>
                    <Countdown {...{timeTillDate: getDatePlus14Days(quarantineDate), timeFormat: "MM DD YYYY, h:mm a"}}/>
                </div>
            </div>
        )
    }
}