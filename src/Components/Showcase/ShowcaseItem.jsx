import React from "react";

export default function ShowcaseItem({ item }) {
  if (!item) return <div className="text-center text-gray-500 text-xl mt-8">No items currently in showcase!</div>;

  const {title, category, ean, brand, description, highest_recorded_price} = item;
  const imageUrl = item.images[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img src={imageUrl} alt={title} className="max-w-full h-auto rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
          <div className="space-y-3">
            <p className="text-lg"><span className="font-semibold text-gray-700">Category:</span> {category}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Code:</span> {ean}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Brand:</span> {brand}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Price:</span> ${highest_recorded_price}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
