import React from "react";

export default function ShowcaseItem({ item }) {
  if (!item) return null;

  const { title, category, ean, brand, description } = item.data;
  const imageUrl = item.data.images && item.data.images.length > 0 ? item.data.images[0] : null;
  const highest_recorded_price = item.highest_recorded_price || item.data?.highest_recorded_price;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
        )}
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <div className="space-y-1">
          <p className="text-sm"><span className="font-semibold text-gray-700">Category:</span> {category || 'N/A'}</p>
          <p className="text-sm"><span className="font-semibold text-gray-700">Code:</span> {ean || 'N/A'}</p>
          <p className="text-sm"><span className="font-semib
old text-gray-700">Brand:</span> {brand || 'N/A'}</p>
          <p className="text-sm"><span className="font-semibold text-gray-700">Price:</span> {highest_recorded_price ? `$${highest_recorded_price}` : 'N/A'}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-1 text-gray-800">Description</h4>
          <p className="text-sm text-gray-600">{description || 'No description available'}</p>
        </div>
      </div>
    </div>
  );
}
