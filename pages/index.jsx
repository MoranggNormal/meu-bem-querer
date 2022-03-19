import { NextSeo } from 'next-seo';

import Box from "@mui/material/Box";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const links = [
 "https://cdn.pixabay.com/photo/2016/06/24/15/48/pattern-1477380_960_720.png",
 "https://cdn.pixabay.com/photo/2016/11/01/20/46/cows-1789577_960_720.png",
 "https://cdn.pixabay.com/photo/2016/10/10/22/05/jellyfishes-1730018_960_720.jpg",
 "https://cdn.pixabay.com/photo/2020/08/15/18/02/paws-5491105_960_720.png",
];

export default function Home() {
 return (
  <>
   <NextSeo
    title="Página Inicial"
    description="Doe e adote mascotes, um projeto desenvolvido pensando no próximo."
   />

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
  </>
 );
}
