import React from 'react';

const Search = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="bill_search"></span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search..."
            name="search"
        />
        <button type="submit">Search</button>
    </form>
);



export default Search