import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class DeleteDraft extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.details.id
        }
    };
    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader>
                    <p>Posted</p>
                </ModalHeader>
                <ModalBody>
                    <p>Item posted! Delete draft?</p>
                    <Button onClick={event => this.props.delPost(event, this.state.id)}>Yes</Button>
                    <Button>No</Button>
                </ModalBody>
            </Modal>
        )
    }
}