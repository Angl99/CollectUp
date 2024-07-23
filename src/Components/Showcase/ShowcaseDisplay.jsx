import React from "react";
import { useLocation } from "react-router-dom";

export default function ShowcaseDisplay() {
  const location = useLocation();
  const items = location.state?.items || [];
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Showcase</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">No items in the showcase yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ShowcaseItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
