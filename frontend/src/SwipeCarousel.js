import React, { Component } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import Profile from "./Profile";

export default class SwipeCarousel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Carousel
        controls={false}
        pause={false}
        interval={300000}
        indicators={false}
        activeIndex={this.props.swipeIndex}
      >
        {this.props.profiles.map((user) => {
          return (
            <CarouselItem className="w-100">
              <Profile user={user} />
            </CarouselItem>
          );
        })}
      </Carousel>
    );
  }
}
