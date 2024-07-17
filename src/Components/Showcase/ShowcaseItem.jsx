import React from "react";

export default function ShowcaseItem({ item }) {
  if (!item) return "No items currently in showcase!";

  const {title, category, ean, brand, description, highest_recorded_price} = item;

  const imageUrl = item.images[0];
//   console.log("Showcase item: ",item);
  return (
    <>
        <h2>Name: {title}</h2>
        <h2>Category: {category}</h2>
        <h2>Code: {ean}</h2>
        <h2>Brand: {brand}</h2>
        <p>Description: {description}</p>
        <p>Price: {highest_recorded_price}</p>
        <img src={imageUrl} alt={title} />
    </>
  );
}
