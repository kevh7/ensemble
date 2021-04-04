import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { swipeStyle } from "./Constants";

export default class SwipeNav extends Component {
  constructor(props) {
    super(props);
  }

  swipeLeft() {
    return (
      <Button
        variant="outline-dark"
        style={{
          ...swipeStyle,
          left: "50%",
          transform: `translate(-600px, -50%)`,
        }}
        onClick={this.props.swipeLeft}
      >
        <i style={{ fontSize: 50 }} className="fa fa-minus"></i>
      </Button>
    );
  }

  swipeRight() {
    return (
      <Button
        variant="outline-dark"
        style={{
          ...swipeStyle,
          right: "50%",
          transform: `translate(600px, -50%)`,
        }}
        onClick={this.props.swipeRight}
      >
        <i style={{ fontSize: 50 }} className="fa fa-plus"></i>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        {this.swipeLeft()}
        {this.swipeRight()}
      </Container>
    );
  }
}
