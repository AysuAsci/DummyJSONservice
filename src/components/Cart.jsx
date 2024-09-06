import React from 'react';


const Cart = ({ degisken, product, recipe, post, onPostClick }) => {
  const sınırlaText = (text, maxLength) => {
    if (!text) {
        return ""; 
    }
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
};
  
return (
  <div className="cart">
      {degisken === "Products" && product ? (
          <div className="cart">
              <h1>{product.title}</h1>
            
              <img src={product.images} alt={product.title} />
              <div className="price">{product.price}$</div>
              <button className='detaygor' onClick={() => onPostClick(product)}>SHOW</button>
          </div>
      ) : degisken === "Recipes" && recipe ? (
          <div className="cart">
              <h1>{recipe.name}</h1>
              <img src={recipe.image} alt={recipe.name} />
              <button className='detaygor' onClick={() => onPostClick(recipe)}>SHOW</button>
          </div>
      ) : degisken === "Post&Comments" && post ? (
          <div className="cart">
              <h1>{post.title}</h1>
              <div>{sınırlaText(post.body, 150)}</div>
              <div className="cart-tags">
                  
                  {post.tags && post.tags.map((tag, i) => (
                      <div className="cart-tag" key={i}>#{tag}</div>
                  ))}
              </div>
              <div className="cart-reactions">
                  
                  {post.reactions && (
                      <>
                        
                      </>
                  )}
              </div>
              <button className='detaygor' onClick={() => onPostClick(post)}>SHOW</button>
          </div>
      ) : null}
  </div>
);
};
  
  export default Cart;
