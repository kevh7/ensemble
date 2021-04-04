import React, { Component } from "react";
import { Container, Carousel, CarouselItem } from "react-bootstrap";
import { jumboStyle, getUser, GREEN } from "./Constants";
import Header from "./Header";
import Profile from "./Profile";
import SwipeNav from "./SwipeNav";
import User from "./User";
import Singles from "./Singles";
import SwipeCarousel from "./SwipeCarousel";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authID: "",
      authUser: "",
      potentialMatches: [],
      swipeIndex: 0,
    };
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
  }

  async componentDidMount() {
    // Fetch Spotify username
    const id = await fetch("./api/user/username").then((res) => res.json());
    this.setState({ authID: id.username });
    // Convert username to details
    const details = await fetch(
      `./api/user/details/${this.state.authID}`
    ).then((res) => res.json());
    this.setState({ authUser: new User(details) });
    // Get potential matches for auth user
    const potential_matches = await fetch(
      "./api/user/potential-matches"
    ).then((res) => res.json());
    this.setState({
      singles: new Singles(potential_matches),
    });
    const firstUser = await this.getSwipe();
    const nextUser = await this.getSwipe();
    this.setState({
      swipes: [firstUser, nextUser],
      currentSwipe: firstUser,
      loaded: true,
    });
  }

  getSwipe() {
    const id = this.state.singles.recommend();
    return getUser(id);
  }

  async swipe() {
    const newSwipe = await this.getSwipe();
    let nextIndex = this.state.swipeIndex + 1;
    this.setState({
      currentSwipe: this.state.swipes[nextIndex],
      swipeIndex: nextIndex,
      swipes: this.state.swipes.concat([newSwipe]),
    });
  }

  async swipeLeft() {
    await fetch(`./api/user/swipe-left/${this.state.currentSwipe.id}`);
    console.log("Swiped left on " + this.state.currentSwipe);
    await this.swipe();
  }

  async swipeRight() {
    await fetch(`./api/user/swipe-right/${this.state.currentSwipe.id}`);
    console.log("Swiped right on " + this.state.currentSwipe);
    await this.swipe();
  }

  render() {
    return (
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <span
          style={{
            width: "100%",
            zIndex: 1,
            height: 100,
            backgroundColor: GREEN,
            position: "absolute",
            top: 0,
          }}
        ></span>
        <Header />
        <br />
        <div className="jumbotron" style={jumboStyle}>
          <SwipeNav swipeLeft={this.swipeLeft} swipeRight={this.swipeRight} />
          {this.state.loaded && (
            <SwipeCarousel
              profiles={this.state.swipes}
              swipeIndex={this.state.swipeIndex}
            />
          )}
        </div>
      </Container>
    );
  }
}
