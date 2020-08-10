import React from "react";

export default class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { condition, yesObj, noObj} = this.props;
        return (
            <div className={`card ${condition ? 'yes' : 'no'}`}>
                <div>{condition ? yesObj.text : noObj.text }</div>
                <div>{condition ? <span>{yesObj.img}</span> : <span>{noObj.img}</span>}</div>
            </div>)
    }
}