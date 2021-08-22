import React, {Component} from 'react';
import secToBpm from '../secToBpm';
import audio from '../../lib/lib';

import '../sound/Sound.css';

export default class Sound extends Component{
    constructor(props) {
        super(props);
        this.state =  {
            currentSound: ''
        };
        this.audioPlay = new Audio();
        this.soundChange = this.soundChange.bind(this);
        
        this.i = 0;
        this.timer = false;
        this.solo = true;
    }
    
    componentDidMount () {
        this.setState({currentSound: audio[this.props.name][0].sound})
    }

    componentDidUpdate (prevProps) {
        if (this.props.play !== prevProps.play) {
            clearTimeout(this.timer);
            if (this.props.play) {
                this.play();
            } else {
                 clearTimeout(this.timer);
                 this.i = 0;
            }
        }
    }

    play = () => {
        const startTime = new Date().getTime();
        this.props.addActivePad(this.props.pads[this.i].id);

        if (this.props.pads[this.i].selected && !this.props.mute && (this.props.solo || this.props.soloAll.length === 0)){
            this.audioPlay = new Audio(this.state.currentSound);
            this.audioPlay.play();
        }
        const bpmCurrent = secToBpm(this.props.bpm);

        if (this.i  < 31) {
            this.i++;
            
        } else {
            this.i = 0;
        }
        const diff = (new Date().getTime() - startTime);
        this.timer = setTimeout(this.play, bpmCurrent - diff);
    }
    
    soundChange(e) {
        this.setState({currentSound: e.target.value});
    }

    render() {

        return (
            <div>
                <select  onChange={this.soundChange}>
                        {
                            audio[this.props.name].map((item) => {
                                return (
                                    <option key={item.name} 
                                            value={item.sound}>
                                        {item.name}
                                    </option>
                                )
                            })
                        }
                </select>
            </div>
        )
    }
}