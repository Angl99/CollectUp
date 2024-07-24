import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowcaseItem from "./ShowcaseItem";
import { useAuth } from "../../helpers/AuthContext";
import { getShowcasesByUserUid } from "../../helpers/showcaseHelpers";

export default function ShowcaseDisplay() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showcase, setShowcase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadShowcase = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const showcases = await getShowcasesByUserUid(user.uid);
          
          if (showcases.length > 0) {
            setShowcase(showcases[0]);
          } else {
            setError("No showcase found for this user.");
          }
          
          setIsLoading(false);
        } catch (err) {
          console.error("Error loading showcase:", err);
          setError("Failed to load showcase. Please try again.");
          setIsLoading(false);
        }
      } else {
        setError("User not logged in.");
        setIsLoading(false);
      }
    };

    loadShowcase();
  }, [user]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Showcase</h2>
      {showcase && showcase.items && showcase.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcase.items.map((item, index) => (
            <ShowcaseItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg">No items in the showcase yet.</p>
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
