import React, {Component} from 'react';
import Drum from '../drum/Drum';

class Sequencer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedPattern: 0,
            solo: false
        }
        this.timer = false;
        this.i = 0;
        this.currentBpm = 0;
    }

    componentDidUpdate (prevProps) {
        if (this.props.play !== prevProps.play) {
            clearTimeout(this.timer); 
            this.timer = false;
            this.start();
        }
    }

    start = () => {
        if (this.props.play) {
            this.step();
        } else {
            this.i = 0;
            this.setState({checkedPattern: 0});
        }  
    }
        
    step = () => {
        const startTime = new Date().getTime();
        
        if (this.i  < this.props.numberOfPads) {
            this.i++;
        } else {
            this.i = 1;
        }
        this.setState({checkedPattern: this.i});
        this.currentBpm = this.secToBpm(this.props.bpm);
        let diff = (new Date().getTime() - startTime);
        this.timer = setTimeout(this.step,  this.currentBpm - diff);

    };

    secToBpm = (bpm) => {
        let mSec = ((60*1000)/bpm)/4;
        return mSec;
    }

    soloTrack = (nameSolo) => {
        if (this.state.solo === nameSolo) {
           this.setState({solo: false});
        } else {
            this.setState({solo: nameSolo})
        }
    }

        render() {
            return (
                <div>
                    {this.props.name.map(item => {
                        return <Drum key={item} 
                                name={item}
                                play={this.props.play}
                                checkedPattern={this.state.checkedPattern}
                                numberOfPads={this.props.numberOfPads}
                                soloTrack={this.soloTrack}
                                solo={this.state.solo}/>  
                        })}
                </div>
            )
        }
};

export default Sequencer;
