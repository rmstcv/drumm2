import React, {Component} from 'react';
import Drum from './components/drum/Drum';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPads: 8,
      name: ["kick", "snare", "hihat", "drumhit"],
      play: false
    }
    this.play = this.play.bind(this)
  }

  play = () => {
    if (!this.state.play) {
      this.setState({play: true})
    } else {
      this.setState({play: false})
    }
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={()=> this.play()}>
            play
          </button>
          {this.state.name.map(item => {
            return <Drum key={item} 
                         name={item} 
                         state={this.state}>  
                   </Drum>
          })}
          DRUMM2
        </header>
      </div>
    );
  };
}

export default App;