import React, { useState, useEffect } from "react";
// import { fetchData } from "../../helpers/ItemApi";
// import { createItem, searchItem } from "../../helpers/itemHelper";
import { useAuth } from "../../helpers/AuthContext";
import data from '../../mockData/data.json'
import ShowcaseList from "./ShowcaseList";

// console.log("mock data: ", data[1]);
export default function ShowcaseForm() {
  const { user } = useAuth();
  const [itemCode, setItemCode] = useState("");
  const [itemType, setItemType] = useState("UPC");
  const [items, setItems] = useState([]);

  // console.log(user.uid);

  const handleInputChange = (e) => {
    setItemCode(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setItemType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const externalData = await fetchData(itemCode, itemType);
      // console.log("Api Requested Item:", externalData);
      // await createItem(externalData.items[0], user.uid);
      // console.log("Item Created!");
      
      // const randomEntry = data[Math.floor(Math.random() * data.length)];
      // const randomItem = randomEntry.items[0];

      const mockItem = data[2].items[0];
      console.log('item log: ', mockItem);
      setItems((prevItems) => [...prevItems, mockItem]);
    } catch (error) {
      console.error(`Error looking up item with code: ${itemCode}, item type: ${itemType},`, error);
    }
  };

  return (
    <>
      <h1>Create Your Showcase!</h1>
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
        <button type="submit">Submit</button>
      </form>
      <br />
      {/* <h2>Item Details:</h2>
      {
        JSON.stringify(items, null, 2)
      } */}
      <hr />
      <ShowcaseList items={items} />
    </>
  );
}
