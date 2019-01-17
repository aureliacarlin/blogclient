import React, {Component} from 'react';
import {
    Route,
    Switch,
    Link
} from 'react-router-dom'
import "../CSSstuff/posts.css";
import {Form, FormGroup, Label, Input, Container, Row, Col, Button} from 'reactstrap';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };

    }

    saveDraft = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        // console.log(this.state)
        // console.log(this.props.sessionToken)
    }

    drafting = (event) => {
        console.log(this.props.sessionToken)
        fetch(`http://localhost:4000/draft/new`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            }) 
            
         }).then((response) => response.json())
        .then((data) => {
             console.log(data)
             this.setState({
                 title: '',
                 content: ''
             })   
         })
         event.preventDefault()
         window.location.href ="/"
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="3" md={{size: 6, offset: 3}}>
                            <Form onSubmit={this.drafting}>
                                <FormGroup>
                                    <Label for='title'>Title</Label> 
                                    <Input id='title' type='text' name='title' placeholder='enter title' onChange={this.saveDraft}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <textarea type="textarea" id='post' name='content' placeholder='start post...' className="content" onChange={this.saveDraft}></textarea>
                                </FormGroup>
                                <Button type="submit">Save as Draft</Button>
                            </Form>
                         </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Posts;