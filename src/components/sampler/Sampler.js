import React, {Component} from 'react';
import {selector} from '../selector';

import './Sampler.css';

export default class Sampler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            samples: [{id: '', selected: ''}]
        } 
    }

    componentDidMount() {
        let arr = [];
        for (let i = 0; i < 8; i++ ) {
            arr.push({id: i, selected: false})
        }
        this.setState({samples: arr});
    }

    selectSample(item) {
        const samples = this.state.samples;
        let newPads = selector(item, samples);
        this.setState({samples: newPads});
    }

    isSelected = ({selected, id}) => {
        return (selected === false? "sample" : "sample selected");
    }

    render() {
        console.log("render3");
        return (
            <div className="sampler-pad-wrapper">
                {
                    this.state.samples.map(item => {
                        return (
                            <div key={item.id}
                                 className={this.isSelected(item)}
                                 onClick={() => this.selectSample(item)}>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
} 