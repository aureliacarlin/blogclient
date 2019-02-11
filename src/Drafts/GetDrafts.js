import React, { Component } from 'react';
import DisplayDrafts from './DisplayDrafts';
import Update from './Update';
import DeleteDraft from './DeleteDraft';
import APIURL from "../helpers/environment";

export default class GetDrafts extends Component {
    constructor(props){
        super(props)
        this.state = {
            datas: [],
            update: false,
            postToUpdate: {},
            delete: false,
            ptd: {}
        }
    }

     componentWillMount() {
         this.handleDraft()
     }

    handleDraft = (event) => {
        fetch(`${APIURL}/draft/getall`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                // console.log(data)
                 this.setState({
                    datas: data
                 })
                 this.setState({update: false})
                })
            }

            updatePressed = (event, properties) => {
                // console.log(properties)
                 this.setState({
                     update: true,
                     postToUpdate: properties
                 })
                
            }

            deletePressed = (event, properties) => {
                // console.log(properties)
                this.setState({
                    delete: true,
                    ptd: properties
                })
            }

            sendUpdate = (event, post) => {
                // console.log("All the things!!")
                fetch(`${APIURL}/draft/update/${post.id}`, {
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
            fetch(`${APIURL}/draft/delete/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({id: id} ),
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            })
            .then((res) => {
                this.handleDraft();
                this.setState({
                    delete: false
                })
            })
        }

        postIt = (event, post) => {
            fetch(`${APIURL}/blog/new`, {
                method: 'POST',
                body: JSON.stringify(post),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            }).then((response) => response.json())
            .then((data) => {
                // console.log(data)
            })
            event.preventDefault();
            this.deletePressed(event, post);
        }


        
    render(){
        return(
            <div>
                <DisplayDrafts  post={this.postIt} delete={this.deletePost} propDraft={this.state.datas} update={this.updatePressed} draft={this.deletePressed}/>
                {
                    this.state.update ? <Update  close={this.handleDraft} sendUpdate={this.sendUpdate} post={this.state.postToUpdate}/> : <div></div>
                }
                {
                    this.state.delete ? <DeleteDraft details={this.state.ptd} delPost={this.deletePost}/> : <div></div>
                }
            </div>
        )
    }
}