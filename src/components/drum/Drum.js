import React, {Component} from 'react';
import "./Drum.css";

class Drum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pads: [],
            numberOfPads: 8
        };
    }

    componentDidMount () {
        let arr = [];
        for (let i = 1; i <= this.state.numberOfPads; i++) {
            arr.push(i);
        }
        this.setState({pads: arr})
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
                                <div key={item} className="pad"></div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
};

export default Drum;