import React from 'react';
import '../App.css'; 
const Products = ({ product, closeModal }) => {
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <img src={product.images} alt={product.title} className="product-image" />
          <div className="product-price">{product.price}$</div>
          
          <div className="product-tags">
            <div className="tags-list">#{product.tags.join(' #')}</div>
          </div>
          
          <div className="product-info">
            <div className="product-warranty">Warranty: {product.warrantyInformation}</div>
            <div className="product-shipping">Shipping: {product.shippingInformation}</div>
            <div className="product-stock">Availability: {product.availabilityStatus} ({product.stock} in stock)</div>
          </div>
          
          <div className="product-reviews">
            <p className="reviews-title">Reviews({product.reviews.length})</p>
            <ul className="reviews-list">
              {product.reviews.map((review, i) => (
                <li key={i} className="review-item">
                  <p className="review-comment">{review.comment}</p>
                  <div className="review-details">
                    <div>Rating: {review.rating}</div>
                    <div>Date: {review.date}</div>
                    <div>Reviewer: {review.reviewerName}</div>
                    <div>Email: {review.reviewerEmail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="product-metadata">
            <div>Minimum Order Quantity: {product.minimumOrderQuantity}</div>
            <div>Created At: {product.meta.createdAt}</div>
            <div>Updated At: {product.meta.updatedAt}</div>
            <div>Barcode: {product.meta.barcode}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
