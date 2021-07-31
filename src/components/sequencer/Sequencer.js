import React, {useState, useEffect} from 'react';
import Drum from '../drum/Drum';

function Sequencer(props) {

    const [checkedPattern, setCheckedPattern] = useState(0);
    const [solo, setSolo] = useState(false);
    let timer = false;

    useEffect(() => {
        start();
        return () => clearInterval(timer);
    }, [props.play, props.bpm, timer]);

    const start = () => {
        
        if (props.play) {
            clearInterval(timer);
            setTimer();
            console.log("start");
        } else {
            setCheckedPattern(() => 0);
            clearInterval(timer);
            console.log("stop");
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


// import React, {Component} from 'react';
// import Drum from '../drum/Drum';

// class Sequencer extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//            checkedPattern: 0
//         };
        
//         this.trackIsPlaying = false;
//         this.timer = false;
//         this.repeat = this.repeat.bind(this)
//     }

//     componentDidMount () {
//     };

//     componentDidUpdate (prevProps) {
//         if (this.props.play !== prevProps.play) {
//             this.start();
//         }

//         if (this.props.bpm !== prevProps.bpm) {
//             if(this.timer) {
//                 clearInterval(this.timer);
//             }
//             this.start();
//         }

//         // if (this.props.numberOfPads !== prevProps.numberOfPads) {
//         //     clearInterval(this.timer);
//         //     this.start();
//         // }

//     }

//     start = () => {
//         if (this.props.play) {
            
//             this.setTimer();
//             //console.log("start");
//         } else {
//             this.setState({checkedPattern: 0});
//             clearInterval(this.timer);
//             //console.log("stop");
//         }  
//     }

//     setTimer = () => {
//         this.timer = setInterval(() => {this.repeat()}, this.secToBpm(this.props.bpm))
//     }

//     secToBpm = (bpm) => {
//         let mSec = (60/bpm)*1000/4;
//         return mSec;
//     }

//     repeat = () => {
       
//         if (this.state.checkedPattern  < this.props.numberOfPads) {

//             this.setState({checkedPattern: this.state.checkedPattern + 1});

//         } else {
//             this.setState({checkedPattern: 1});
//         }
//     }

//     render() {
//         //console.log("render SEQ");
//         return (
//                 <div>
                    
//                 {this.props.name.map(item => {
//                 return <Drum key={item} 
//                          name={item}
//                          play={this.props.play}
//                          checkedPattern={this.state.checkedPattern}
//                          numberOfPads={this.props.numberOfPads}/>  
//               })}
//                 </div>
//         )
//     }
// };

// export default Sequencer;