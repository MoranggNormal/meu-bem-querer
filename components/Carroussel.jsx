import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Box from "@mui/material/Box";

const divs = (link) => {
  return <></>;
};

const links = [
  "https://cdn.pixabay.com/photo/2018/08/12/16/59/parrot-3601194_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/03/27/22/22/fox-1284512_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/04/15/08/04/strawberry-1330459_960_720.jpg",
];

export default function IndexCarroussel() {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      emulateTouch={true}
      showStatus={false}
      showThumbs={false}
      renderIndicator={false}
    >
      {links.map((item) => {
        return (
          <Box
            key={item}
            xs={12}
            sm={12}
            md={12}
            sx={{
              backgroundImage: `url(${item})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          ></Box>
        );
      })}
    </Carousel>
  );
}
