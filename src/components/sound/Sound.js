import React, {Component} from 'react';
//import audio from '../../assets/E808_BD[long]-03.mp3';
import audio from '../../lib/lib';
import "../sound/Sound.css";

export default class Sound extends Component{
    constructor(props) {
        super(props);
        // this.myRef = React.createRef();
        //this.audio;
    }
    
    
    componentDidUpdate (prevProps) {
        // if (this.props.play !== prevProps.play) {
        //     this.playSound();
        // }
        if (this.props.active !== prevProps.active) {
            console.log(audio);
            this.play();     
        }
    }

    play = () => {
        if (this.props.active && this.props.play) {
            const audioPlay = new Audio(audio.kick.kick01);
            //this.myRef.current.play();
            audioPlay.play();
            console.log('play');
            
        }
    }

    // playSound = () => {
    //     console.log(this.props.activePad);
    //     console.log("playSound");
    // }

    render() {
            console.log("render2");
        return (
            <div>
                <select >
                    <option value="E808_BD[long]-03.mp3" selected="selected">kick01</option>
                    <option value="E808_BD[short]-01.mp3">kick02</option>
                </select>
                {/* <audio id="1" ref={this.myRef} src={audio}></audio> */}
            </div>
        )
    }
}