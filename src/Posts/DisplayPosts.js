import React, {Component } from 'react';
import "../CSSstuff/DisplayPosts.css";


export default class DisplayPosts extends Component {
    constructor(props) {
        super(props)
        this.state ={}
    }

    render() {
        return(
            <div>
                {
                    this.props.posted.map((objects, id) => {
                        return (
                            <div key={objects.id} className="cards">
                                <h3>{objects.title}</h3>
                                <div className="containers">
                                    <p>{objects.content}</p>
                                    <h6>{objects.author}</h6>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}