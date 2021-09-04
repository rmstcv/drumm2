import React, {Component} from 'react';
import secToBpm from '../secToBpm';
import audio from '../../lib/lib';

import '../sound/Sound.css';

export default class Sound extends Component{
    constructor(props) {
        super(props);
        this.state =  {
            currentSound: '',
            
        };
        this.soundChange = this.soundChange.bind(this);
        
        this.i = 0;
        this.timer = false;
        this.solo = true;

        this.audioCtx = new AudioContext();
        this.source = this.audioCtx.createBufferSource();

        this.startTime = null;

    }
    
    componentDidMount () {
        this.setState({currentSound: audio[this.props.name][0].sound})
    }

    componentDidUpdate (prevProps) {

        if (this.props.play !== prevProps.play) {
            this.startTime = new Date().getTime();
            clearTimeout(this.timer);
            
            if (this.props.play) {
                this.play()
                } else {
                    clearTimeout(this.timer);
                     this.i = 0;
            }
        }
    }

    addAudioCtx = () => {
        this.source = this.audioCtx.createBufferSource();

        fetch(new Request(this.state.currentSound)).then((response) => {
                return response.arrayBuffer();
            }).then((buffer) => {
                this.audioCtx.decodeAudioData(buffer, (decodedData) =>  {
                    this.source.buffer = decodedData;
                    this.source.connect(this.audioCtx.destination);
                });
            });

        this.source.start(); 
    }

    play = () => {
        
        if (new Date().getTime() > (this.startTime + (this.i+1)*secToBpm(this.props.bpm))) {
            this.props.addActivePad(this.props.pads[this.i].id);

            if (this.props.pads[this.i].selected && !this.props.mute && (this.props.solo || this.props.soloAll.length === 0)) {
                this.addAudioCtx();
            }
           
            if (this.i  < 31) {
                this.i++;
                
                } else {
                    this.i = 0;
                    this.startTime = new Date().getTime();
                }
         
        }
        this.timer = setTimeout(this.play, 1);
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