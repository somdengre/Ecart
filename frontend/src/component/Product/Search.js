import React, { Fragment, useState } from 'react'
import "./Search.css"
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData';

const Search = (props) => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {

        e.preventDefault();
        if (keyword.trim()) {
            console.log("slfdjsadlfasjfdlajks");
            navigate(`/products/${keyword}`)
            // props.context.history.push(`/products/${keyword}`);

        } else {
            navigate(`/products/`);
        }
    }

    return (
        <Fragment>
            <MetaData title="SEARCH-PRODUCT CRABCART" />
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder='Search a Product...'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    )
}

export default Search