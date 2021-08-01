import React, {Component} from 'react';
import Menu from './components/menu/Menu';
// import Drum from './components/drum/Drum';
// import Sampler from './components/sampler/Sampler';
import Sequencer from './components/sequencer/Sequencer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPads: 16,
      bpm: 120,
      play: false,
    }
    this.name = ["kick", "snare", "hihat", "drumhit","kick", "snare", "hihat", "drumhit"]
    this.play = this.play.bind(this)
  }

  play = () => {
    if (!this.state.play) {
      this.setState({play: true})
    } else {
      this.setState({play: false})
    }
  }

  incBpm = () => {
    this.setState({bpm: this.state.bpm + 1})
  }

  decBpm = () => {
    this.setState({bpm: this.state.bpm - 1})
  }

  // set8Pads = () => {
  //   this.setState({numberOfPads: 8})
  //   console.log(this.state.numberOfPads);
  // }

  // set16Pads = () => {
  //   this.setState({numberOfPads: 16})
  //   console.log(this.state.numberOfPads);
  // }

  render() {
    //console.log("render APP");
    return (
      <div className="App">
        <header className="App-header">
          <Menu play = {this.play}
                isPlay={this.state.play}
                bpm={this.state.bpm}
                decBpm={this.decBpm}
                incBpm={this.incBpm}/>

          <div className="work-container">
            <div>
              {/* {this.state.name.map(item => {
                return <Drum key={item} 
                         name={item} 
                         state={this.state}>  
                       </Drum>
              })} */}
              <Sequencer name={this.name}
                         play={this.state.play}
                         bpm={this.state.bpm}
                         numberOfPads={this.state.numberOfPads}/>
              DRUMM2
            </div>
          </div> 
        </header>
      </div>
    );
  };
}

export default App;