import React from "react";
import { Button, Modal } from "react-bootstrap";

function ModalController(props) {
  const { show, setShow, children, btnText } = props;

  return (
    <>
      <Modal
        size="lg"
        keyboard={false}
        backdrop="static"
        show={show}
        onHide={() => setShow(false)}
        centered
      >
        <Modal.Header centered></Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShow(false)}>
            {btnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalController;
