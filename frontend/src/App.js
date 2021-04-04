import React, { Component } from "react";
import {
  Container,
  Carousel,
  CarouselItem,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { jumboStyle, getUser, GREEN, BLACK } from "./Constants";
import Header from "./Header";
import SwipeNav from "./SwipeNav";
import User from "./User";
import Singles from "./Singles";
import SwipeCarousel from "./SwipeCarousel";
import Post from "./Post";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authID: "",
      authUser: "",
      potentialMatches: [],
      swipeIndex: 0,
      discoverMode: true,
      follows: [],
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
    // Get follows
    const follows = await fetch("./api/user/follows").then((res) => res.json());
    const followIDs = new Singles(follows).ids;
    let users = await Promise.all(followIDs.map((id) => getUser(id)));
    this.setState({ follows: users });
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
    this.setState({
      follows: this.state.follows.concat([this.state.currentSwipe]),
    });
    await this.swipe();
  }

  posts() {
    let captions = [
      "Just got off work! Heading to the cottage this weekend. #TGIF",
      "Listening to my favorite song during #HackPrinceton!...",
      "Love this song but need something new. Any recs?",
      "I swear I just had this song on repeat for 3 hours. OMG!",
      "Just had an awesome workout! #FeelTheBurn",
      "I'm loving this new social media app, ensemble!",
    ];
    while (captions.length < this.state.follows.length) {
      captions = captions.concat(captions);
    }
    return (
      <Container
        fluid
        style={{ position: "absolute", top: 0, paddingTop: 300 }}
      >
        {this.state.follows.length == 0 ? (
          <h1 style={{ color: "white" }}>Not currently following anyone!</h1>
        ) : (
          ""
        )}
        {this.state.follows.map((user, i) => (
          <Post name={user.name} id={user.topTrack} caption={captions[i]} />
        ))}
      </Container>
    );
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
        >
          <Button
            variant="link"
            style={{
              float: "left",
              marginLeft: 75,
              marginTop: 20,
              textDecoration: "none",
              outline: "none",
              boxShadow: "none",
            }}
            onClick={() => this.setState({ discoverMode: true })}
          >
            <h1
              style={{ color: BLACK }}
              className={this.state.discoverMode ? "bold" : ""}
            >
              Discover
            </h1>
          </Button>
          <Button
            variant="link"
            style={{
              float: "right",
              marginRight: 75,
              marginTop: 20,
              textDecoration: "none",
              outline: "none",
              boxShadow: "none",
            }}
            onClick={() => this.setState({ discoverMode: false })}
          >
            <h1
              style={{ color: BLACK }}
              className={!this.state.discoverMode ? "bold" : ""}
            >
              Feed
            </h1>
          </Button>
        </span>
        <Header />
        {!this.state.discoverMode && (
          <div className="jumbotron" style={jumboStyle}>
            {this.posts()}
          </div>
        )}
        <br />
        {this.state.discoverMode && (
          <div className="jumbotron" style={jumboStyle}>
            <SwipeNav swipeLeft={this.swipeLeft} swipeRight={this.swipeRight} />
            {this.state.loaded && (
              <SwipeCarousel
                profiles={this.state.swipes}
                swipeIndex={this.state.swipeIndex}
              />
            )}
          </div>
        )}
      </Container>
    );
  }
}
