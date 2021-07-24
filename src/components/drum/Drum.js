import React, {Component} from 'react';
import Sound from '../sound/Sound';
import "./Drum.css";

class Drum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pads: [{id: 0,
                    selected: false,
                  }],
            activePad: false,
            //start: false
        };
        this.active = 0;
        // this.timer = false;
        // this.interval = this.interval.bind(this);
        // this.start = this.start.bind(this);
    }

    componentDidMount () {
        //console.log("componentDidMount");
        this.createPatterns();
    };

    componentDidUpdate (prevProps) {
        if (this.props.state.play !== prevProps.state.play) {
            this.start();
        }
    }

    createPatterns = () => {
        const {numberOfPads} = this.props.state;
        const arr = [];
        for (let i = 1; i <= numberOfPads; i++) {
            arr.push({id: i, selected: false});
        }
        this.setState({pads: arr});
    }

    selectPattern = ({id}) => {
        let newPads = this.state.pads.map(pad => {
            if (pad.id === id) {
                switch (pad.selected) {
                    case false: 
                        return {
                            ...pad,
                            selected: true
                        }
                    case true: 
                        return {
                            ...pad,
                            selected: false
                        }   
                    default: 
                        return {...pad};  
                }
            } else {
                return pad;
            }
        })
        let newState = {...this.state};
        newState.pads = newPads;
        this.setState({pads: newPads});
    };

    isSelected = ({selected, id}) => {
        //return (selected === false? "pad" : "pad selected");
        if (selected === true && id === this.state.activePad) {
            return "pad selected active"
        } else {
            if (selected === true && id !== this.state.activePad) {
                return "pad selected"
            } else {
                return "pad"
            }
        }
    }

    start = () => {
        this.active = 0;
        if (this.props.state.play) {
            this.timer = setInterval(() => {this.repeat()}, 200);
            console.log("start");
        } else {
            clearInterval(this.timer)
            console.log("stop");
        }  
    }

    repeat = () => {
        let arrActive = this.state.pads.map(item => {
            if (item.selected) {
                return ("active")
            } else {
                return (item.id)
            }
        });

        if (arrActive[this.active] === "active") {
            this.setState({activePad: this.active + 1});
        } else {
            this.setState({activePad: false})
        }

        if (this.active === arrActive.length - 1) {
            this.active = 0;
        } else {
            this.active++;
        } 
    }

    render() {
        //console.log("render");
        return (
            <div>
                <div className="pad-name">
                    {this.props.name.toUpperCase()}
                </div>
                <Sound play={this.props.state.play}
                       name={this.props.name}
                       active={this.state.activePad}/>
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