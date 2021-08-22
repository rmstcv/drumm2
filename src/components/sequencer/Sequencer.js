import React, {Component} from 'react';
import Sound from '../sound/Sound';
import {selector} from '../selector';

import "./Sequencer.css";

class Sequencer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pads: [{id: 0,
                    selected: false,
                  }],
            activePad: false,
            mute: false,
            solo: false
        };   
    }

    componentDidMount () {
        this.createPatterns();
    };

    createPatterns = () => {
        const arr = [];
        for (let i = 1; i <= this.props.numberOfPads; i++) {
            arr.push({id: i, selected: false});
        }
        this.setState({pads: arr});
    }

    selectPattern = (item) => {
        const pads = this.state.pads;
        let newPads = selector(item, pads);
        this.setState({pads: newPads});
    }

    isSelected = ({selected, id}) => {

        if (selected && id === this.state.activePad) {
            return "pad selected active"
        } else {
            if (selected && id !== this.state.activePad) {
                return "pad selected"
            } else {
                return "pad"
            }
        }
    }

    addActivePad = (id) => {
        this.setState({activePad: id});
    }

    soloTrack = (nameSolo) => {
        if (!this.state.mute) {
            if (this.state.solo) {
                this.setState({solo: false});
                this.props.removeSolo(nameSolo);
            } else {
                this.setState({solo: nameSolo});
                this.setState({mute: false});
                this.props.addSolo(nameSolo);
        }
        }
    }

    muteTrack = () => {
        if (!this.state.solo) {
            if (!this.state.mute) {
                this.setState({mute: true})
            } else {
                this.setState({mute: false})
            }
        } 
    }

    muteChangeClass = () => {
        if (this.state.mute) {
            return "muteOn"
        } else {
            return "muteOff"
        }
    }

    soloChangeClass = () => {
        if (this.state.solo) {
            return "muteOn"
        } else {
            return "muteOff"
        }
    }

    render() {
        return (
            <div className="wrapper">
               <div className="wrapper-buttons">
                    <div>
                    <Sound play={this.props.play}
                           name={this.props.name}
                           pads={this.state.pads}
                           numberOfPads={this.props.numberOfPads}
                           bpm={this.props.bpm}
                           mute={this.state.mute}
                           solo={this.state.solo}
                           soloAll={this.props.solo}
                           addActivePad={this.addActivePad}
                           />
                    </div>
                    <div className="buttons-group">
                        <button className={this.muteChangeClass()} 
                                onClick={() => this.muteTrack()}>
                                M
                        </button>
                        <button className={this.soloChangeClass()} 
                                onClick={() => this.soloTrack(this.props.name)}>
                                S
                        </button>
                    </div>
               </div>
                <div className="pad-wrapper">
                    {
                        this.state.pads.map(item => {
                            return (
                                <div key={item.id} 
                                     onClick={() => this.selectPattern(item)} 
                                     className={this.isSelected(item)}>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
};

export default Sequencer;