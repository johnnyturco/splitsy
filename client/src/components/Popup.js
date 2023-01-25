import React from "react";


const Popup = props => {
    return (
        <div>
            <div>
                <span onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    )
}

export default Popup;