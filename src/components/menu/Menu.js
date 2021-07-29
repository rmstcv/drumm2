import React from 'react';

export default function Menu (props) {
    
    const checkPlay = () => {
        if (props.isPlay) {
            return "STOP"
        } else {
            return "PLAY"
        }
    }

    return(
        <div>
            <button onClick={props.play}>
                {checkPlay()}
            </button>
            <button onClick={props.decBpm}>-</button>
                {props.bpm}
            <button onClick={props.incBpm}>+</button>
            {/* <button onClick={this.props.pads8}>8</button>
            <button onClick={this.props.pads16}>16</button> */}
        </div>
    )
}