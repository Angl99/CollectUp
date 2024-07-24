import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemDisplay from "./ItemDisplay"
import { searchExternalApi, createItem } from "../../helpers/itemHelper";
import { useAuth } from "../../helpers/AuthContext";
import productHelper from "../../helpers/productHelpers";
import { addItemsToFirstShowcase } from "../../helpers/showcaseHelpers";

export default function GenerateItem() {
    const [itemCode, setItemCode] = useState("");
    const [condition, setCondition] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [generatedItems, setGeneratedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [itemType, setItemType] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const detectItemType = () => {
            if (itemCode.length === 13 && /^\d+$/.test(itemCode)) {
                setItemType("EAN-13");
            } else if (itemCode.length === 10 && /^[0-9X]+$/.test(itemCode)) {
                setItemType("ISBN-10");
            } else if (itemCode.length === 12 && /^\d+$/.test(itemCode)) {
                setItemType("UPC");
            } else {
                setItemType("");
            }
        };

        detectItemType();
    }, [itemCode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "item-code":
                setItemCode(value);
                break;
            case "condition":
                setCondition(value);
                break;
            case "user-description":
                setUserDescription(value);
                break;
            default:
                break;
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!user) {
            setError("You must be logged in to generate an item.");
            setIsLoading(false);
            return;
        }
      
        try {
            const product = await searchExternalApi(itemCode);
            if (!product) {
                throw new Error("Product not found");
            }

            const newProduct = await productHelper.createProduct(product);
            if (!newProduct) {
                throw new Error("Failed to create product");
            }

            const newItem = await createItem({
                productEan: newProduct.ean,
                condition,
                userDescription,
                imgUrl
            });

            if (!newItem) {
                throw new Error("Failed to create item");
            }

            // Add the new item to generatedItems state
            setGeneratedItems(prevItems => [...prevItems, { ...newItem, data: { data: newProduct } }]);

        } catch (error) {
            console.error("Error during item generation:", error);
            setError("An error occurred while generating the item");
        } finally {
            setIsLoading(false);
            setItemCode("");
            setCondition("");
            setUserDescription("");
            setImgUrl("");
        }
    };

    const handleShowcaseSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!user) {
                throw new Error("You must be logged in to add items to the showcase.");
            }
            
            // Add items to the first showcase (or create a new one if it doesn't exist)
            await addItemsToFirstShowcase(user.uid, generatedItems);
            
            // Navigate to the showcase display
            navigate('/showcase-display');
        } catch (error) {
            console.error("Error adding items to showcase:", error);
            setError("Failed to add items to showcase. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Build Your Showcase</h1>
            <form onSubmit={handleSubmit} className="mb-8">
                <label htmlFor="item-code" className="block mb-2 text-lg font-medium text-gray-700">
                    Item Code:
                    <input
                        type="text"
                        name="item-code"
                        value={itemCode}
                        onChange={handleInputChange}
                        placeholder="Enter Code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                {itemType && <p className="mt-2 text-sm text-gray-600">Detected Code Type: {itemType}</p>}
                
                <label htmlFor="condition" className="block mt-4 mb-2 text-lg font-medium text-gray-700">
                    Condition:
                    <select
                        name="condition"
                        value={condition}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="New-BoxOpen">New-BoxOpen</option>
                        <option value="Good">Good</option>
                        <option value="Acceptable">Acceptable</option>
                    </select>
                </label>

                <label htmlFor="user-description" className="block mt-4 mb-2 text-lg font-medium text-gray-700">
                    Description:
                    <textarea
                        name="user-description"
                        value={userDescription}
                        onChange={handleInputChange}
                        placeholder="Enter Description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows="3"
                    ></textarea>
                </label>

                <label htmlFor="image-upload" className="block mt-4 mb-2 text-lg font-medium text-gray-700">
                    Upload Image:
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-1 block w-full"
                    />
                </label>
                {imgUrl && (
                    <img src={imgUrl} alt="Uploaded" className="mt-2 max-w-xs rounded-md shadow-sm" />
                )}

                <button 
                    type="submit" 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Generating..." : "Generate"}
                </button>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {isLoading ? (
                <p className="text-gray-600 mb-4">Loading...</p>
            ) : generatedItems.length > 0 ? (
                <>
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Generated Items:</h2>
                        {generatedItems.map((item, index) => (
                            <ItemDisplay key={index} generatedItem={{
                                data: item,
                                condition: item.condition,
                                userDescription: item.userDescription,
                                imgUrl: item.imgUrl,
                                highest_recorded_price: item.highest_recorded_price
                            }} />
                        ))}
                    </div>
                    <button 
                        onClick={handleShowcaseSubmit}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Submit to Showcase
                    </button>
                </>
            ) : (
                <p className="text-gray-600 mb-4">No items generated yet. Enter a code and click "Generate" to create an item.</p>
            )}
        </div>
    )
}
