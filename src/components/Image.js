import { useState } from "react";

export default function Image({ url }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    console.log("loaded");
    setIsLoaded(true);
  };

  return (
    <div className="img-loader-container">
      <img
        src={url}
        onLoad={onLoad}
        alt="product"
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      />
      <span
        className="loader"
        style={{ display: !isLoaded ? "block" : "none" }}
      ></span>
    </div>
  );
}
