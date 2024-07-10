import React, { useState, useEffect } from 'react';
import { fetchData } from '../../helpers/ShowcaseApi';

export default function ShowcaseForm() {
  const [itemCode, setItemCode] = useState('');
  const [itemType, setItemType] = useState('UPC');

  const handleInputChange = (e) => {
    setItemCode(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setItemType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const LookupCode = await fetchData(itemCode, itemType);
      console.log("Api Requested Item:", LookupCode);
    } catch (error) {
      console.error('Error looking up item:', error);
    }
  };

  return (
    <>
      <h1>Create Your Showcase!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='item-code'>
          Item Code:
          <input
            type='text'
            name='item-code'
            value={itemCode}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor='code-type'>
          Code Type:
          <select
            name='code-type'
            value={itemType}
            onChange={handleDropdownChange}
          >
            <option value='UPC'>UPC</option>
            <option value='ISBN'>ISBN</option>
            <option value='EAN'>EAN</option>
          </select>
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
