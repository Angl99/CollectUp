import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from 'uuid';


export default function ShowcaseForm() {

    return (
        <>
            <h1> Create Your Showcase! </h1>
            <form>
                <label for='name'> Enter Item UPC, ISBN, or EAN: 
                    <input type="text" name="item-code" value={""}/>
                    <select name="code-type">
                        {/* <option disabled autoFocus>Enter Item UPC, ISBN, or EAN</option> */}
                        <option value="UPC">UPC</option>
                        <option value="ISBN">ISBN</option>
                        <option value="EAN">EAN</option>
                    </select>
                </label>
                <hr />

                <label for='name'> Name: 
                    <input type="text" name="title" value={""}/>
                </label>
                <hr />

                <label for='name'> Brand: 
                    <input type="text" name="brand" value={""}/>
                </label>
                <hr />

                <label for='name'> Year: 
                    <input type="text" name="year" value={""}/>
                </label>
                <hr />

                <label for='name'> Category: 
                    <input type="text" name="category" value={""}/>
                </label>
                <hr />

                {/* Add section for verifying appraised/ verified items */}
            </form>
        </>
    )
}
