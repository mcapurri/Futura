import React from 'react';
import { Modal, Button } from 'bootstrap-4-react';
const ConfirmationModal = (props) => {
    console.log('confirmationModal running');
    return (
        <Modal id="smallModal" fade>
            <Modal.Dialog sm>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                        <Modal.Close>
                            <span aria-hidden="true">&times;</span>
                        </Modal.Close>
                    </Modal.Header>
                    <Modal.Body>...</Modal.Body>
                    <Modal.Footer>
                        <Button secondary data-dismiss="modal">
                            Close
                        </Button>
                        <Button primary>Save changes</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
    );
};

export default ConfirmationModal;
