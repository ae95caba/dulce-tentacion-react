import React from "react";

export default function FlavoursList({ flavoursList }) {
  return (
    <ul>
      {flavoursList.map((flavour) => (
        <li>{flavour}</li>
      ))}
    </ul>
  );
}
