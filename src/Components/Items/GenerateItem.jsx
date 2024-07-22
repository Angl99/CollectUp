import React, { useState } from "react";
import ItemDisplay from "./ItemDisplay"

export default function GenerateItem() {
    const [itemCode, setItemCode] = useState("");
    const [itemType, setItemType] = useState("UPC");

    const handleInputChange = (e) => {
        setItemCode(e.target.value);
    };

    const handleDropdownChange = (e) => {
        setItemType(e.target.value);
    };

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
                    />
                </label>
                <label htmlFor="code-type">
                    Code Type:
                    <select
                        name="code-type"
                        value={itemType}
                        onChange={handleDropdownChange}
                    >
                        <option value="UPC">UPC</option>
                        <option value="ISBN">ISBN</option>
                        <option value="EAN">EAN</option>
                    </select>
                </label>
                <br />
                <button type="submit">Generate</button>
            </form>
            <ItemDisplay />
        </>
    )
}
