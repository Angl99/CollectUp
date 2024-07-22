import React, { useState, useEffect } from "react";
import ItemDisplay from "./ItemDisplay"
import { searchExternalApi, createItem } from "../../helpers/itemHelper";
import { useAuth } from "../../helpers/AuthContext";
import productHelper from "../../helpers/productHelpers";
const { getProductByEan: searchInternalProduct, createProduct } = productHelper;

export default function GenerateItem() {
    const { user } = useAuth();
    const [itemCode, setItemCode] = useState("");
    const [itemType, setItemType] = useState("");
    const [generatedItem, setGeneratedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setItemCode(e.target.value);
    };

    useEffect(() => {
        if (itemCode.length === 13) {
            if (itemCode.startsWith('0')) {
                setItemType("UPC-A (GTIN-12)");
            } else {
                setItemType("EAN-13 (ISBN/ GTIN-13)");
            }
        } else if (itemCode.length === 12) {
            setItemType("UPC-A (GTIN-12)");
        } else {
            setItemType("");
        }
    }, [itemCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedItem(null);

        if (!user) {
            setError("You must be logged in to generate an item.");
            setIsLoading(false);
            return;
        }

        try {
            // First, search in the internal database
            let product = await searchInternalProduct(itemCode);
            if (product) {
                await createItem(user.uid, product);
                console.log("existing prod: ", product);
                setGeneratedItem(product);
            } else {
                // If not found internally, search the external API
                const externalData = await searchExternalApi(itemCode);
                if (externalData && externalData.items && externalData.items.length > 0) {
                    product = externalData.items[0];
                    // Create the item in our internal database
                    try {
                        const cleanedData = {upc:product.upc, isbn:product.isbn, ean:product.ean, data: product}
                        const newProduct = await createProduct(cleanedData);
                        console.log("New product created!!");

                        await createItem(user.uid, newProduct);
                        console.log("New item created!!");
                        console.log("Newly created prod: ", newProduct);
                        setGeneratedItem(newProduct);
                    } catch (error) {
                        console.log("failed to create prod");
                        setError("Failed to create product");
                    }
                } else {
                    setError("No product found for the given code");
                }
            }
        } catch (error) {
            console.error("Error during item generation:", error);
            setError("An error occurred while generating the item");
        } finally {
            setIsLoading(false);
        }
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
                        placeholder="Enter Code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                {itemType && <p className="mt-2 text-sm text-gray-600">Detected Code Type: {itemType}</p>}
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
            ) : generatedItem ? (
                <ItemDisplay generatedItem={generatedItem} />
            ) : (
                <p className="text-gray-600 mb-4">No item generated yet. Enter a code and click "Generate" to create an item.</p>
            )}
        </div>
    )
}
