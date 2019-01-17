import React, { Component } from 'react';
import DisplayPosts from '../Posts/DisplayPosts'


export default class GetPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posting: []
        }
    }


componentWillMount() {
    this.getPosts()
}

getPosts = (event) => {
    fetch(`http://localhost:4000/blog/getall`, {
        method: 'GET', 
        headers: new Headers ({
            'Authorization': this.props.sessionToken
        })
    }).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data)
            this.setState({
                posting: data
            })
        }
    )
}

render() {
    return (
        <div>
            <DisplayPosts posted={this.state.posting}/>
        </div>
    )
}

}