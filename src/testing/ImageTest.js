import React, {Component} from 'react';
import logo from '../assets/logo.png'


class ImageTest extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return(
            <div>
                 <img src={logo} alt="logo" height="40px" widht="40px"/>
            </div>
        )
    }
}

export default ImageTest;