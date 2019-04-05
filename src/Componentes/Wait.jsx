import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class Wait extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.visible);
    if (this.props.visible) {
      return (
        <Modal show={this.props.visible}>
          <Modal.Header>
            <Modal.Title>Loading...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </Modal.Body>
        </Modal>
      );
    } else {
      return <div />;
    }
  }
}
export default Wait;
