import React from 'react'
import { Link } from "react-router-dom"
import Rating from '@mui/material/Rating';


const ProductCard = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly:true,
        precision:0.5 
    }

    return (
        <Link className="productCard" to={`/product/${product._id}`} key={product._id}>
            <img className='productImage' src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div className='ratingContainer'>
                <Rating {...options} size={window.innerWidth < 600 ? "small" : "medium"} /> <span className='productCardSpan'>({product.numOfReviews}Reviews)</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    )
}

export default ProductCard