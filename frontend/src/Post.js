import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Post(props) {
  return (
    <Container
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Row style={{ display: "flex" }}>
        <Col>
          <h1 style={{ color: "white", float: "left" }}>{props.name}</h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <iframe
            src={`https://open.spotify.com/embed/track/${props.id}`}
            width="100%"
            height="80"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Col>
        <Col style={{ paddingLeft: 50 }}>
          <h2 style={{ color: "white", textAlign: "left" }}>{props.caption}</h2>
        </Col>
      </Row>
    </Container>
  );
}
