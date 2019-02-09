import React, { Component } from 'react';
import { Button} from 'reactstrap';
import "../CSSstuff/displayDrafts.css";


export default class DisplayDrafts extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="drafts"> 
            <h3>Saved Drafts</h3>
                
                        {
                            this.props.propDraft.map((properties, id) => {
                                return (
                                    <div key={properties.id} className="cards">
                                        <p>{properties.content}</p>
                                        <div className="containers">
                                            <h3>{properties.title}</h3>
                                            <h6>{properties.author}</h6>
                                            <button  className="updateing"  id={properties.id} onClick={event => this.props.update(event, properties)}><i className="fas fa-pencil-alt"></i></button>
                                         <Button onClick={event => this.props.delete(event, properties.id)} color="danger"><i className="fas fa-trash-alt"></i></Button>
                                         <Button onClick={event => this.props.post(event, properties)} type="submit">Post</Button>
                                        </div> 
                                    </div>
                                )
                            })
                        }
                    
            </div>
        )
    }
}