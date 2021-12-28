import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function DemoCarousel() {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      emulateTouch={true}
      showStatus={false}
      showThumbs={false}
    >
      <div>
        <img src="https://cdn.pixabay.com/photo/2018/08/12/16/59/parrot-3601194_960_720.jpg" />
      </div>
      <div>
        <img src="https://cdn.pixabay.com/photo/2016/03/27/22/22/fox-1284512_960_720.jpg" />
      </div>
      <div>
        <img src="https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_960_720.jpg" />
      </div>
    </Carousel>
  );
}
