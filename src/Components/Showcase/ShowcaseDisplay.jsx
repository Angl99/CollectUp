import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShowcaseItem from "./ShowcaseItem";

export default function ShowcaseDisplay() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.items) {
      setItems(location.state.items);
      setIsLoading(false);
    } else {
      setError("No items found in the showcase.");
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Showcase</h2>
      {items.length === 0 ? (
        <p className="text-gray-600 text-lg">No items in the showcase yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <ShowcaseItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
