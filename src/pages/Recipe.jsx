import React from 'react';
import '../App.css'; 

const Recipe = ({ recipe, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          x
        </button>
        <h1 className="recipe-title">
          {recipe.name}
        </h1>
        <img src={recipe.image} alt={recipe.name} className="recipe-image" />
        <div className="recipe-tags">
          <div className="tags-list">#{recipe.tags.join(' #')}</div>
          <div className="recipe-meal-type">Tür: {recipe.mealType}</div>
        </div>
        
        <div className="recipe-ingredients">
          <div className="section-title">Ingredients:</div>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-instructions">
          <div className="section-title">Instructions:</div>
          <ul className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="instruction-item">{instruction}</li>
            ))}
          </ul>
        </div>
        <div className="prep-cook-time">
          <div className="prep-time">Preparation Time: {recipe.prepTimeMinutes} minutes</div>
          <div className="cook-time">Cooking Time: {recipe.cookTimeMinutes} minutes</div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
