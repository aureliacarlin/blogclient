import React, { Component } from 'react';
import {Form, Input, Button, Label, FormGroup, Container, Row, Col} from 'reactstrap';

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            userEmail: '',
            password: ''
        }
    } 


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    
    } 

    handleSubmit = (event) => {
        fetch(`http://localhost:4000/user/signin`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.theToken(data.sessionToken)
            console.log(data.sessionToken)
        })
        this.setState({
            userEmail: '',
            password: ''
        })
        alert('You have signed in.')
        event.preventDefault()
       // window.location.reload();
    } 

    render() { 
        return(
            <div>
                <Container>
                    <Row>
                        <Col md={{size: 6, offset: 3}}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="userEmail"></Label>
                                    <Input name="userEmail" placeholder="enter email" onChange={this.handleChange}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password"></Label>
                                    <Input name="password" placeholder="enter password" onChange={this.handleChange}></Input>
                                </FormGroup>
                                <Button type="submit">Sign In</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}