import { useState } from "react";

export default function Image2({ url, price }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`img-loader-container promo`}
      style={{ position: "relative" }}
    >
      <span style={{ position: "absolute", fontWeight: "2rem" }}>{price}</span>
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
