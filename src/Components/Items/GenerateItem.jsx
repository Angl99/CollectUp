import React, { useState, useEffect } from "react";
import ItemDisplay from "./ItemDisplay"

export default function GenerateItem() {
    const [itemCode, setItemCode] = useState("");
    const [itemType, setItemType] = useState("");

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
        console.log("Submitted:", { itemCode, itemType });
    };

    return (
        <>
            <h1>Generate Item</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="item-code">
                    Item Code:
                    <input
                        type="text"
                        name="item-code"
                        value={itemCode}
                        onChange={handleInputChange}
                        placeholder="Enter UPC or EAN"
                    />
                </label>
                <br />
                {itemType && <p>Detected Code Type: {itemType}</p>}
                <br />
                <button type="submit">Generate</button>
            </form>
            <ItemDisplay />
        </>
    )
}
