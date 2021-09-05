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
      solo: []
    }
    this.name = [
                  "KICK", "SNARE", "CLHAT", "OPHAT", "RIMSHOT", 
                  "CLAP", "TOM", "PERC", "EFFECT", "SYNTH_A", 
                  "SYNTH_B", "VOX"
                ]
    this.timer = false;
    this.soloAll = [];
  }

  play = () => {
    clearInterval(this.timer);
    this.timer = false;
    this.setState({play: true});
  }

  stop = () => {
    clearInterval(this.timer);
    this.timer = false;
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

  addSolo = (nameSolo) => {
    this.soloAll.push(nameSolo);
    this.setState({solo: this.soloAll});
  }

  removeSolo = (nameSolo) => {
    this.soloAll = this.soloAll.filter((n) => {return n !== nameSolo});
    this.setState({solo: this.soloAll});
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

              <div>
                {this.name.map(item => {
                  return <Sequencer key={item} 
                          name={item}
                          play={this.state.play}
                          numberOfPads={this.state.numberOfPads}
                          bpm={this.state.bpm}
                          addSolo={this.addSolo}
                          removeSolo={this.removeSolo}
                          solo={this.state.solo}/>  
                  })}
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  };
}

export default App;