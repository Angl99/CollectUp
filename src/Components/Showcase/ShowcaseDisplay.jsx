import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShowcaseItem from "./ShowcaseItem";
import { useAuth } from "../../helpers/AuthContext";
import { getShowcaseById, createShowcase, addItemsToShowcase, getShowcasesByUserUid } from "../../helpers/showcaseHelpers";

 function ShowcaseDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showcaseId, setShowcaseId] = useState(null);

  useEffect(() => {
    const loadOrCreateShowcase = async () => {
      if (user) {
        try {
          setIsLoading(true);
          let showcase;
          try {
            showcase = await getShowcasesByUserUid(user.uid);
          } catch (error) {

          }
          
          
          if (!showcase || showcase.length === 0) {
            // If the user doesn't have a showcase, create one
            showcase = await createShowcase({ name: "My Showcase", userId: user.uid });
          } else {
            showcase = showcase[0];
          }
          
          setShowcaseId(showcase.id);

          if (location.state?.items) {
            // Prepare items for adding to showcase
            const itemsToAdd = location.state.items.map(item => ({
              productEan: item.data.ean,
              condition: item.condition,
              userDescription: item.userDescription,
              imgUrl: item.imgUrl
            }));
            // Add new items to the showcase
            await addItemsToShowcase(showcase.id, itemsToAdd);
          }

          // Fetch updated showcase items
          const updatedShowcase = await getShowcaseById(showcase.id);
          setItems(updatedShowcase.items || []);
          setIsLoading(false);
        } catch (err) {
          console.error("Error loading or creating showcase:", err);
          setError("Failed to load or create showcase. Please try again.");
          setIsLoading(false);
        }
      } else {
        setError("User not logged in.");
        setIsLoading(false);
      }
    };

    loadOrCreateShowcase();
  }, [user, location.state]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }
  console.log(items);
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

export default ShowcaseDisplay;