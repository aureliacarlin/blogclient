import React, {Component} from 'react';

import { Jumbotron, Container} from 'reactstrap'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return(
            <div>
                <Jumbotron fluid className="jumbo">
                    <Container fluid className="jumboCon">
                    <h1 className="display-3">Lorem Ipsum</h1>
                    <p className="lead">To learn, is to admit you don't know everything</p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}