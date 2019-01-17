import React, { Component } from 'react';
import {Button} from 'reactstrap';
import DisplayDrafts from './DisplayDrafts';
import Update from './Update';

export default class GetDrafts extends Component {
    constructor(props){
        super(props)
        this.state = {
            datas: [],
            update: false,
            postToUpdate: {}
        }
    }

     componentWillMount() {
         this.handleDraft()
     }

    handleDraft = (event) => {
        fetch("http://localhost:4000/draft/getall", {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                console.log(data)
                 this.setState({
                    datas: data
                 })
                 this.setState({update: false})
                })
            }

            updatePressed = (event, properties) => {
                console.log(properties)
                 this.setState({
                     update: true,
                     postToUpdate: properties
                 })
                
            }

            sendUpdate = (event, post) => {
                console.log("All the things!!")
                fetch(`http://localhost:4000/draft/update/${post.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(post),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': this.props.sessionToken
                    })
                })
                .then((res) => {
                    this.setState({update: false})
                    this.handleDraft();
                })
            }

        deletePost = (event, id) => {
            fetch(`http://localhost:4000/draft/delete/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({id: id} ),
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            })
            .then((res) => {
                this.handleDraft();
            })
        }

        postIt = (event, post) => {
            fetch(`http://localhost:4000/blog/new`, {
                method: 'POST',
                body: JSON.stringify(post),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            }).then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            event.preventDefault()
         window.location.href ="/"
        }

        
    render(){
        return(
            <div>
                <DisplayDrafts  post={this.postIt} delete={this.deletePost} propDraft={this.state.datas} update={this.updatePressed} />
                {
                    this.state.update ? <Update  close={this.handleDraft} sendUpdate={this.sendUpdate} post={this.state.postToUpdate}/> : <div></div>
                }
            </div>
        )
    }
}