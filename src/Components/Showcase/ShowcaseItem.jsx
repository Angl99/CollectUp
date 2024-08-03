import React, { useState } from "react";
import ItemForm from "./ItemForm";

export default function ShowcaseItem({ item, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, category, ean, brand, images, condition, userDescription, forSale, publisher } = item.product.data;
  console.log(item.product);
  const { id } = item;
  const imageUrl = images && images.length > 0 ? images[0] : null;
  const highest_recorded_price = item.highest_recorded_price || item.data?.highest_recorded_price;

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleUpdate = (updatedData) => {
    onUpdate(id, updatedData);
    setIsModalOpen(false);
  };


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
        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Brand:</span> {brand || publisher || 'N/A'}</p>
        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Price:</span> {highest_recorded_price ? `$${highest_recorded_price}` : 'N/A'}</p>
        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Condition:</span> {condition || 'N/A'}</p>
        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">For Sale:</span> {forSale ? 'Yes' : 'No'}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded hover:bg-blue-600 hover:text-white"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded hover:bg-red-600 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <ItemForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdate}
        item={{ id, imageUrl, condition, userDescription }}
      />
    </div>
  );
}
