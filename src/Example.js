import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function textwrite(w){
  const logFileText = async file => {
      const response = await fetch(file)
      const text = await response.text()
      //console.log(text)
      document.getElementById('blue').innerHTML=text
  }
  const txt = logFileText(w)
  return txt;
}

function Example() {
  const [show, setShow] = useState(false);
  
  let sea = false; 
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
    textwrite("text.txt");
    
  }
  const shoot = () => {
    sea = !sea
    alert(`Great Shot! ${sea}`);
  }
  const boom = () => {
    sea = false
  }

  return (
    <>
      <Button variant="primary" onClick={shoot}>
        see modal
      </Button>

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><p id='blue'></p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={sea} onHide={boom}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><p id='blue'></p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={boom}>
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