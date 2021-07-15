import { identifier } from '@babel/types';
import React, {Component} from 'react';
import "./Drum.css";

class Drum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pads: [{id: 0,
                    active: false
                  }],
            numberOfPads: 8,
            pad: "pad"
        };

        
    }

    componentDidMount () {
        let arr = [];
        for (let i = 1; i <= this.state.numberOfPads; i++) {
            arr.push({id: i, active: false});
        }
        this.setState({pads: arr})
    };

    selectPattern = ({id}) => {
       
           //let isActive = this.state.pads[id].active === false? "pad" : "pad active";
        
        let newPads = this.state.pads.map(pad => {
            if (pad.id === id) {
                switch (pad.active) {
                    case false: 
                        return {
                            id: id,
                            active: true
                        }
                        break;

                    case true: 
                        return {
                            id: id,
                            active: false
                        }
                        break;
                }
            } else {
                return pad;
            }
        })
           let newState = {...this.state};
           newState.pads = newPads;
           this.setState({pads: newPads});
    };


    render() {
        return (
            <div>
                <div className="pad-name">
                    {this.props.name}
                </div>
                <div className="pad-wrapper">
                    {
                        this.state.pads.map(item => {
                            return (
                                <div key={item.id} 
                                     onClick={() => this.selectPattern(item)} 
                                     className={item.active == false? "pad" : "pad active"}>
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