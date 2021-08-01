import React, {Component} from 'react';
import Sound from '../sound/Sound';
import {selector} from '../selector';

import "./Drum.css";

class Drum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pads: [{id: 0,
                    selected: false,
                  }],
            activePad: false,
            mute: false,
            solo: false
        };   
    }

    componentDidMount () {
        this.createPatterns();
    };

    componentDidUpdate (prevProps) {
        if (this.props.checkedPattern !== prevProps.checkedPattern) {
            this.checkActivePad();
        }

        if (this.props.solo !== prevProps.solo) {
            this.checkSolo();
        }
    }

    checkActivePad = () => {
        if  (this.props.play && this.state.pads[this.props.checkedPattern - 1].selected && !this.state.mute) {
                this.setState({activePad: this.props.checkedPattern});
        } else {
            this.setState({activePad: false})
        }
    }

    createPatterns = () => {
        const arr = [];
        for (let i = 1; i <= this.props.numberOfPads; i++) {
            arr.push({id: i, selected: false});
        }
        this.setState({pads: arr});
    }

    selectPattern = (item) => {
        const pads = this.state.pads;
        let newPads = selector(item, pads);
        this.setState({pads: newPads});
    }

    isSelected = ({selected, id}) => {

        if (selected && id === this.state.activePad) {
            return "pad selected active"
        } else {
            if (selected && id !== this.state.activePad) {
                return "pad selected"
            } else {
                return "pad"
            }
        }
    }

    muteTrack = () => {
        if (!this.props.solo) {
            if (!this.state.mute) {
                this.setState({mute: true})
            } else {
                this.setState({mute: false})
            }
        }  
    }

    muteChangeClass = () => {
        if (this.state.mute) {
            return "muteOn"
        } else {
            return "muteOff"
        }
    }

    soloChangeClass = () => {
        if (this.props.solo === this.props.name) {
            return "muteOn"
        } else {
            return "muteOff"
        }
    }

    checkSolo = () => {
        if (this.props.solo && (this.props.solo !== this.props.name)) {
            //console.log(this.props.name);
            this.setState({mute: true});
        } else {
            if (!this.props.solo || this.props.solo === this.props.name) {
            //console.log(this.props.name);
            this.setState({mute: false})
            }
        }
    }

    render() {
        //console.log(this.props.checkedPattern);
        //console.log("render DRUM");
        return (
            <div className="wrapper">
               <div className="wrapper-buttons">
                    <div>
                    <Sound play={this.props.play}
                           name={this.props.name}
                           active={this.state.activePad}/>
                    </div>
                    <div className="buttons-group">
                        <button className={this.muteChangeClass()} 
                                onClick={() => this.muteTrack()}>
                                M
                        </button>
                        <button className={this.soloChangeClass()} 
                                onClick={() => this.props.soloTrack(this.props.name)}>
                                S
                        </button>
                    </div>
               </div>
                <div className="pad-wrapper">
                    {
                        this.state.pads.map(item => {
                            return (
                                <div key={item.id} 
                                     onClick={() => this.selectPattern(item)} 
                                     className={this.isSelected(item)}>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className="pad-name">
                    {this.props.name.toUpperCase()}
                </div> */}
                
            </div>
        )
    }
};

export default Drum;

// import React, {Component} from 'react';
// import Sound from '../sound/Sound';
// import {selector} from '../selector';

// import "./Drum.css";

// class Drum extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             pads: [{id: 0,
//                     selected: false,
//                   }],
//             activePad: false,
//             //start: false
//         };
//         this.checkedPattern = 0;
//         this.trackIsPlaying = false;
//         this.timer = false;
//         // this.interval = this.interval.bind(this);
//         // this.start = this.start.bind(this);
//     }

//     componentDidMount () {
//         //console.log("componentDidMount");
//         this.createPatterns();
//     };

//     componentDidUpdate (prevProps) {
//         if (this.props.state.play !== prevProps.state.play) {
//             this.start();
//         }
//     }

//     createPatterns = () => {
//         const {numberOfPads} = this.props.state;
//         const arr = [];
//         for (let i = 1; i <= numberOfPads; i++) {
//             arr.push({id: i, selected: false});
//         }
//         this.setState({pads: arr});
//     }

//     // selectPattern = ({id}) => {
//     //     let newPads = this.state.pads.map(pad => {
//     //         if (pad.id === id) {
//     //             switch (pad.selected) {
//     //                 case false: 
//     //                     return {
//     //                         ...pad,
//     //                         selected: true
//     //                     }
//     //                 case true: 
//     //                     return {
//     //                         ...pad,
//     //                         selected: false
//     //                     }   
//     //                 default: 
//     //                     return {...pad};  
//     //             }
//     //         } else {
//     //             return pad;
//     //         }
//     //     })
//     //     let newState = {...this.state};
//     //     newState.pads = newPads;
//     //     this.setState({pads: newPads});
//     // };

//     selectPattern = (item) => {
//         const pads = this.state.pads;
//         let newPads = selector(item, pads);
//         this.setState({pads: newPads});
//     };

//     isSelected = ({selected, id}) => {
//         //return (selected === false? "pad" : "pad selected");
//         if (selected === true && id === this.state.activePad) {
//             return "pad selected active"
//         } else {
//             if (selected === true && id !== this.state.activePad) {
//                 return "pad selected"
//             } else {
//                 return "pad"
//             }
//         }
//     }

//     secToBpm = (bpm) => {
//         let mSec = (60/bpm)*1000/4;
//         return mSec;
//     }

//     setTimer = () => {
//         this.timer = setInterval(() => {this.repeat()}, this.secToBpm(this.props.state.bpm))
//     }

//     start = () => {
//         this.checkedPattern = 0;
//         if (this.props.state.play) {
//             this.setTimer();
//             this.trackIsPlaying = true;
//             console.log("start");
//         } else {
//             clearInterval(this.timer);
//             this.trackIsPlaying = false;
//             console.log("stop");
//         }  
//     }

//     repeat = () => {
//         // const arrActive = this.state.pads.map(item => {
//         //     if (item.selected) {
//         //         return ("active")
//         //     } else {
//         //         return false//(item.id)
//         //     }
//         // });

//         // if (arrActive[this.active] === "active") {
//         //     this.setState({activePad: this.active + 1});
//         //     console.log(this.active + 1);
//         // } else {
//         //     this.setState({activePad: false})
//         // }

//         // if (this.active === arrActive.length - 1) {
//         //     this.active = 0;
//         // } else {
//         //     this.active++;
//         // } 

//         if (this.checkedPattern + 1 < this.props.state.numberOfPads) {

//             if (this.state.pads[this.checkedPattern].selected) {
//                 this.setState({activePad: this.checkedPattern + 1});
//             } else {
//                 this.setState({activePad: false})
//             }
//             this.checkedPattern++;

//         } else {
//             this.checkedPattern = 0;
//         }
//     }

//     playTrack = () => {
//         if (this.trackIsPlaying) {
//             this.trackIsPlaying = false;
//             clearInterval(this.timer);
//         } else {
//             this.trackIsPlaying = true;
//             this.start();
//         }
        
//     }

//     render() {
//         console.log("render DRUM");
//         return (
//             <div className="wrapper">
//                 <button onClick={() => this.playTrack()}>PLAYsound</button>
//                 <div className="pad-wrapper">
//                     {
//                         this.state.pads.map(item => {
//                             return (
//                                 <div key={item.id} 
//                                      onClick={() => this.selectPattern(item)} 
//                                      className={this.isSelected(item)}>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 {/* <div className="pad-name">
//                     {this.props.name.toUpperCase()}
//                 </div> */}
//                 <div>
//                     <Sound play={this.props.state.play}
//                            name={this.props.name}
//                            active={this.state.activePad}/>
//                 </div>
//             </div>
//         )
//     }
// };

// export default Drum;