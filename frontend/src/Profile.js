import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  embedID(id, width, height) {
    return (
      <iframe
        src={`https://open.spotify.com/embed/track/${id}`}
        width={width}
        height={height}
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    );
  }

  render() {
    const [t1, t2, t3, t4, t5] = this.props.user.trackIDs;
    const colStyle = { padding: 0 };
    return (
      <Container style={{ width: "50%", position: "relative" }}>
        <Row>{this.embedID(t1, "100%", "100")}</Row>
        <Row>
          <Col style={colStyle}>{this.embedID(t2, "100%", "100")}</Col>
          <Col style={colStyle}>{this.embedID(t3, "100%", "100")}</Col>
        </Row>
        <Row>
          <Col style={colStyle}>{this.embedID(t4, "100%", "100")}</Col>
          <Col style={colStyle}>{this.embedID(t5, "100%", "100")}</Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <h1 style={{ color: "white" }}>
              <b>{this.props.user.name}</b>
            </h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
