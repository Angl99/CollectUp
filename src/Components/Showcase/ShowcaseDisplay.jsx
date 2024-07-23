import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShowcaseItem from "./ShowcaseItem";
import { useAuth } from "../../helpers/AuthContext";
import { create, addItemToShowcase } from "../../helpers/showcaseHelpers";

export default function ShowcaseDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showcaseId, setShowcaseId] = useState(null);

  useEffect(() => {
    const saveItemsToShowcase = async () => {
      if (user && location.state?.items) {
        try {
          setIsLoading(true);
          // Create a new showcase
          const showcase = await create("My Showcase", user.uid);
          setShowcaseId(showcase.id);

          // Add items to the showcase
          await addItemToShowcase(showcase.id, location.state.items);

          setItems(location.state.items);
          setIsLoading(false);
        } catch (err) {
          console.error("Error saving items to showcase:", err);
          setError("Failed to save items to showcase. Please try again.");
          setIsLoading(false);
        }
      } else {
        setError("No items found or user not logged in.");
        setIsLoading(false);
      }
    };

    saveItemsToShowcase();
  }, [user, location.state]);

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
      <button
        onClick={() => navigate('/')}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Back to Home
      </button>
    </div>
  );
}
