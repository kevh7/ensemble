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
        <h3>Pass</h3>
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
        <h3>Follow</h3>
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
