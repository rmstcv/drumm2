import React, {useState, useEffect} from 'react';
import Drum from '../drum/Drum';

function Sequencer(props) {

    const [checkedPattern, setCheckedPattern] = useState(0);
    const [solo, setSolo] = useState(false);
    let timer = false;

    useEffect(() => {
        start();
        return () => {clearTimeout(timer); timer = false};
    }, [props.play, props.bpm]);

    const start = () => {
        
        if (props.play) {
            setTimer();
            
        } else {
            setCheckedPattern(() => 0);
            return;
        }  
    }

    let setTimer = () => {
        let i = 1;
        let startTime = new Date().getTime();
        let time =  0;
        let interval = secToBpm(props.bpm);
        timer = setTimeout(function step() {

                                time += interval;
                                setCheckedPattern(c => c = i); 
                                if (i  < props.numberOfPads) {
                                    i++;
                                } else {
                                    i = 1;
                                }
                                let diff = (new Date().getTime()- startTime) - time;
                                timer = setTimeout(step, secToBpm(props.bpm) - diff);

                            } ,secToBpm(props.bpm));
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