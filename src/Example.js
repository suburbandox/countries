import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function textwrite(w){
  const logFileText = async file => {
      const response = await fetch(file)
      const text = await response.text()
      //console.log(text)
      document.querySelector('.blue').innerHTML=text
  }
  const txt = logFileText(w)
  return txt;
}

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //textwrite("text.txt")
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading{console.log(textwrite("text.txt"))}{textwrite("text.txt")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='blue'>Woohoo, you are reading this text in a modal!`</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
    
  );
}


export default Example;