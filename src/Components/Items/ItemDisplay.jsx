import React from "react";

export default function ItemDisplay({ generatedItem }) {
  if (!generatedItem) return <div className="text-center text-gray-500 text-xl mt-8">No item generated yet!</div>;

  const { title, category, ean, brand, description, images } = generatedItem.data;
  // console.log(generatedItem.data);
  const imageUrl = images && images.length > 0 ? images[0] : null;
  const highest_recorded_price = generatedItem.highest_recorded_price || generatedItem.data?.highest_recorded_price;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="max-w-full h-auto rounded-lg shadow-md" />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
          <div className="space-y-3">
            <p className="text-lg"><span className="font-semibold text-gray-700">Category:</span> {category || 'N/A'}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Code:</span> {ean || 'N/A'}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Brand:</span> {brand || 'N/A'}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Price:</span> {highest_recorded_price ? `$${highest_recorded_price}` : 'N/A'}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
            <p className="text-gray-600">{description || 'No description available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
