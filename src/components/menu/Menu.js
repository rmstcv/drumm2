import React from 'react';

import "../menu/Menu.css"

export default function Menu (props) {

    const checkPlay = () => {
        if (props.isPlay) {
            return "active-play play"
        } else {
            return "play"
        }
    }

    const checkStop = () => {
        if (props.isPlay) {
            return "stop"
        } else {
            return "stop active-stop"
        }
    }

    return(
        <div className="menu">
            <div className="buttons-wrapper">
                <button className={checkPlay()} onClick={props.play}></button>
                <button className={checkStop()} onClick={props.stop}></button>

                    <div className="bpm"><span className="bpm-descr">bpm</span><span className="bpm-value">{props.bpm}</span></div>

                <button className="bpm-down" 
                        onMouseDown={props.decBpm} 
                        onMouseUp={props.stopSetBpm} 
                        onMouseOut={props.stopSetBpm}>
                </button>

                <button className="bpm-up" 
                        onMouseDown={props.incBpm} 
                        onMouseUp={props.stopSetBpm} 
                        onMouseOut={props.stopSetBpm}>
                </button>
                <div className="logo">DRUMM2</div>
            </div>
           
        </div>
    )
}