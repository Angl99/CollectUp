import React from "react";
import ShowcaseItem from "./ShowcaseItem";

export default function ShowcaseList({ items }) {
    if (!items || items.length === 0) return "No items in showcase!";

    return (
        <div>
            {items.map((item, index) => (
                <ShowcaseItem key={index} item={item} />
            ))}
            <hr />
        </div>
    );
}
