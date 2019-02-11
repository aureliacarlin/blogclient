import React, { Component } from 'react';
import DisplayPosts from '../Posts/DisplayPosts'
import APIURL from "../helpers/environment";


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
    fetch(`${APIURL}/blog/getall`, {
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