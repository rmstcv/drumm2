import React, {Component} from 'react';
import Sound from '../sound/Sound';
import {selector} from '../selector';

import "./Drum.css";

class Drum extends Component {
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

    componentDidUpdate (prevProps) {
        if (this.props.checkedPattern !== prevProps.checkedPattern) {
            this.checkActivePad();
        }

        if (this.props.solo !== prevProps.solo) {
            this.checkSolo();
        }
    }

    checkActivePad = () => {
        if  (this.props.play && this.state.pads[this.props.checkedPattern - 1].selected && !this.state.mute) {
                this.setState({activePad: this.props.checkedPattern});
        } else {
            this.setState({activePad: false})
        }
    }

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

    muteTrack = () => {
        if (!this.props.solo) {
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
        if (this.props.solo === this.props.name) {
            return "muteOn"
        } else {
            return "muteOff"
        }
    }

    checkSolo = () => {
        if (this.props.solo && (this.props.solo !== this.props.name)) {
            this.setState({mute: true});
        } else {
            if (!this.props.solo || this.props.solo === this.props.name) {
            this.setState({mute: false})
            }
        }
    }

    render() {
        return (
            <div className="wrapper">
               <div className="wrapper-buttons">
                    <div>
                    <Sound play={this.props.play}
                           name={this.props.name}
                           active={this.state.activePad}/>
                    </div>
                    <div className="buttons-group">
                        <button className={this.muteChangeClass()} 
                                onClick={() => this.muteTrack()}>
                                M
                        </button>
                        <button className={this.soloChangeClass()} 
                                onClick={() => this.props.soloTrack(this.props.name)}>
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

export default Drum;