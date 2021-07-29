import React, {Component} from 'react';
import Drum from '../drum/Drum';

class Sequencer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           checkedPattern: 0
        };
        
        this.trackIsPlaying = false;
        this.timer = false;
        this.repeat = this.repeat.bind(this)
    }

    componentDidMount () {
    };

    componentDidUpdate (prevProps) {
        if (this.props.play !== prevProps.play) {
            this.start();
        }

        if (this.props.bpm !== prevProps.bpm) {
            if(this.timer) {
                clearInterval(this.timer);
            }
            this.start();
        }

        // if (this.props.numberOfPads !== prevProps.numberOfPads) {
        //     clearInterval(this.timer);
        //     this.start();
        // }

    }

    start = () => {
        if (this.props.play) {
            
            this.setTimer();
            //console.log("start");
        } else {
            this.setState({checkedPattern: 0});
            clearInterval(this.timer);
            //console.log("stop");
        }  
    }

    setTimer = () => {
        this.timer = setInterval(() => {this.repeat()}, this.secToBpm(this.props.bpm))
    }

    secToBpm = (bpm) => {
        let mSec = (60/bpm)*1000/4;
        return mSec;
    }

    repeat = () => {
       
        if (this.state.checkedPattern  < this.props.numberOfPads) {

            this.setState({checkedPattern: this.state.checkedPattern + 1});

        } else {
            this.setState({checkedPattern: 1});
        }
    }

    render() {
        //console.log("render SEQ");
        return (
                <div>
                    
                {this.props.name.map(item => {
                return <Drum key={item} 
                         name={item}
                         play={this.props.play}
                         checkedPattern={this.state.checkedPattern}
                         numberOfPads={this.props.numberOfPads}/>  
              })}

                    {/* <Drum  play={this.props.state.play}
                           name={this.props.name}
                           checkedPattern={this.state.checkedPattern}
                           numberOfPads={this.props.state.numberOfPads}/> */}
                </div>
        )
    }
};

export default Sequencer;