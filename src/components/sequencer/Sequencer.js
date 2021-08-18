import React, {useState, useEffect} from 'react';
import Drum from '../drum/Drum';

function Sequencer(props) {

    const [checkedPattern, setCheckedPattern] = useState(0);
    const [solo, setSolo] = useState(false);
    let timer = false;

    useEffect(() => {
        start();
        return () => clearInterval(timer);
    }, [props.play, props.bpm]);

    const start = () => {
        
        if (props.play) {
            clearInterval(timer);
            setTimer();
        } else {
            setCheckedPattern(() => 0);
            clearInterval(timer);
        }  
    }

    let setTimer = () => {
        let i = 1;
        timer = setInterval(() => {
            setCheckedPattern(c => c = i); 
            if (i  < props.numberOfPads) {
                i++;  
            } else {
                i = 1;
        }}, secToBpm(props.bpm))
    }

    const secToBpm = (bpm) => {
        let mSec = (60/bpm)*1000/4;
        return mSec;
    }

    let soloTrack = (nameSolo) => {
        if (solo === nameSolo) {
           setSolo(false);
        } else {
            setSolo(nameSolo)
        }
    }

        return (
                <div>

                {props.name.map(item => {
                return <Drum key={item} 
                         name={item}
                         play={props.play}
                         checkedPattern={checkedPattern}
                         numberOfPads={props.numberOfPads}
                         soloTrack={soloTrack}
                         solo={solo}/>  
              })}

                </div>
        )
};

export default Sequencer;