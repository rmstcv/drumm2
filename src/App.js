import React, {Component} from 'react';
import Menu from './components/menu/Menu';
import Sequencer from './components/sequencer/Sequencer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPads: 32,
      bpm: 120,
      play: false,
    }
    this.name = [
                  "KICK", "SNARE", "CLHAT", "OPHAT", "RIMSHOT", "CLAP", "TOM", "PERC", "EFFECT", "SYNTH_A", "SYNTH_B", "VOX"
                ]
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.timer = false;
  }

  play = () => {
      this.setState({play: true})
  }

  stop = () => {
      this.setState({play: false});
  }

  incBpm = () => {
    this.timer = setInterval(() => {if (this.state.bpm < 180) {this.setState({bpm: this.state.bpm + 1})}}, 70)
  }

  decBpm = () => {
    this.timer = setInterval(() => {if (this.state.bpm > 60) {this.setState({bpm: this.state.bpm - 1})}}, 70)
  }

  stopSetBpm = () => {
    clearInterval(this.timer);
    this.timer = false;
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
         

          <div className="work-container">
            <div>
               <Menu play = {this.play}
                stop = {this.stop}
                isPlay={this.state.play}
                bpm={this.state.bpm}
                decBpm={this.decBpm}
                incBpm={this.incBpm}
                stopSetBpm={this.stopSetBpm}/>

              <Sequencer name={this.name}
                         play={this.state.play}
                         bpm={this.state.bpm}
                         numberOfPads={this.state.numberOfPads}/>

            </div>
          </div>


        </div>
      </div>
    );
  };
}

export default App;