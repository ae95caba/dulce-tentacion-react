import React from "react";
import { useEffect } from "react";

import ReactGA from "react-ga";
import Image from "./Image";
export default function Gallery() {
  const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <h1>Galeria</h1>
      <div className="gallery-container">
        {images.map((image) => (
          <Image url={`/img/galeria/${image}`} />
        ))}
      </div>
    </>
  );
}
