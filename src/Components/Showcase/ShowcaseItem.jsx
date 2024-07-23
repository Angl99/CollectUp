import React from "react";

export default function ShowcaseItem({ item }) {
  const { title, category, ean, brand, images } = item.data;
  const imageUrl = images && images.length > 0 ? images[0] : null;
  const highest_recorded_price = item.highest_recorded_price || item.data?.highest_recorded_price;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Category:</span> {category || 'N/A'}</p>
        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Code:</span> {ean || 'N/A'}</p>
        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Brand:</span> {brand || 'N/A'}</p>
        <p className="text-sm text-gray-600"><span className="font-medium">Price:</span> {highest_recorded_price ? `$${highest_recorded_price}` : 'N/A'}</p>
      </div>
    </div>
  );
}
