import React, {Component } from 'react';
import {Button, Form, FormGroup, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import "../CSSstuff/update.css";
export default class Update extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            title: this.props.post.title,
            content: '',
            id: this.props.post.id
        }
    };

    handleChange = (event) => { 
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.content)
    }

    handleSubmit = (event) => {
        // console.log(this.state.content)
        event.preventDefault();
        this.props.sendUpdate(event, this.state)
    }

    render() {
        return (
            <Modal isOpen={true}>
            <ModalHeader >
                <p className="header">Update Post</p>
                <Button className="x header" color="danger" onClick={this.props.close}><i className="far fa-times-circle"></i></Button>
            </ModalHeader>
            <ModalBody>
            
                <Form>
                    <FormGroup>
                        <Label>{this.props.post.title}</Label>
                        <textarea id="conent" name="content" type="text" defaultValue={this.props.post.content} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button onClick={this.handleSubmit} type='submit'>Save as Draft</Button>
                </Form>
            </ModalBody>
            </Modal>
        )
    }
}