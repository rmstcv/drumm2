import React, {Component} from 'react';
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
    }
    
    componentDidMount () {
        this.setState({currentSound: audio[this.props.name][0].sound})
    }

    componentDidUpdate (prevProps) {
        if (this.props.active !== prevProps.active) {
            this.play();
        }
    }

    // stop = () => {
    //    let a = this.props.state.pads.every(item => {
    //             return item === false;
    //         });
    //         console.log(a);
    
    // }

    play = () => {
        if (this.props.active && this.props.play) {
            this.audioPlay = new Audio(this.state.currentSound);
            this.audioPlay.play();  
        }
    }
    
    soundChange(e) {
        this.setState({currentSound: e.target.value});
    }

    render() {
            //console.log("renderSOUND");
        return (
            <div>
                <select  onChange={this.soundChange}>
                        {
                            audio[this.props.name].map((item) => {
                                return (
                                    <option key={item.name} value={item.sound}>{item.name}</option>
                                )
                            })
                        }
                </select>
            </div>
        )
    }
}