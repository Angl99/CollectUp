import React, { useState, useEffect } from "react";
import ItemDisplay from "./ItemDisplay"

export default function GenerateItem() {
    const [itemCode, setItemCode] = useState("");
    const [itemType, setItemType] = useState("");
    const [generatedItem, setGeneratedItem] = useState(null);

    const handleInputChange = (e) => {
        setItemCode(e.target.value);
    };

    useEffect(() => {
        if (itemCode.length === 13) {
            if (itemCode.startsWith('0')) {
                setItemType("UPC-A (GTIN-12)");
            } else {
                setItemType("EAN-13 (GTIN-13)");
            }
        } else if (itemCode.length === 12) {
            setItemType("UPC-A (GTIN-12)");
        } else {
            setItemType("");
        }
    }, [itemCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically call a function to process the item
        // For now, we'll create a mock item
        const mockItem = {
            title: "Generated Item",
            category: "Electronics",
            ean: itemCode,
            brand: "Brand Name",
            description: "This is a generated item based on the entered code.",
            highest_recorded_price: 99.99,
            images: ["https://via.placeholder.com/300"]
        };
        setGeneratedItem(mockItem);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Generate Item</h1>
            <form onSubmit={handleSubmit} className="mb-8">
                <label htmlFor="item-code" className="block mb-2 text-lg font-medium text-gray-700">
                    Item Code:
                    <input
                        type="text"
                        name="item-code"
                        value={itemCode}
                        onChange={handleInputChange}
                        placeholder="Enter UPC or EAN"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                {itemType && <p className="mt-2 text-sm text-gray-600">Detected Code Type: {itemType}</p>}
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Generate
                </button>
            </form>
            <ItemDisplay item={generatedItem} />
        </div>
    )
}
