import React, { useEffect, useState } from 'react';
import "../App.css";
import Cart from '../components/Cart';
import PostCom from '../pages/PostCom';
import Products from './Products';
import Recipe from './Recipe';
import SearchBar from '../components/SearchBar'; 

const Home = () => {
    const categories = ["Products", "Recipes", "Post&Comments"];
    const [products, setProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [posts, setPosts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalRecipes, setTotalRecipes] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [degisken, setDegisken] = useState("Products");
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleClick = (name) => {
        setDegisken(name);
        setPage(1);
    };

    async function getData() {
      const fetchUrl = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;
      const data = await fetch(fetchUrl).then(res => res.json());
  
     
      const productsWithImages = data.products.map(product => ({
          ...product,
          image: `https://dummyjson.com/products/images/${product.id}.jpg`, 
      }));
  
      setProducts(productsWithImages);
      setFilteredItems(productsWithImages);
      setTotalProducts(data.total);
  }

    async function getRecipes() {
        const fetchUrl = `https://dummyjson.com/recipes?limit=${limit}&skip=${(page - 1) * limit}`;
        const data = await fetch(fetchUrl).then(res => res.json());
        setRecipes(data.recipes);
        setFilteredItems(data.recipes);
        setTotalRecipes(data.total);
    }

    async function getPosts() {
        const fetchUrl = `https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}`;
        const data = await fetch(fetchUrl).then(res => res.json());
        setPosts(data.posts);
        setFilteredItems(data.posts);
        setTotalPosts(data.total);
    }

    useEffect(() => {
        if (degisken === "Products") {
            getData();
        } else if (degisken === "Recipes") {
            getRecipes();
        } else if (degisken === "Post&Comments") {
            getPosts();
        }
    }, [page, limit, degisken]);

    const totalPages = degisken === "Products" ? Math.ceil(totalProducts / limit) :
        degisken === "Recipes" ? Math.ceil(totalRecipes / limit) :
        degisken === "Post&Comments" ? Math.ceil(totalPosts / limit) : 1;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleProductClick = (post) => {
        setSelectedProduct(post);
    };
    const handleRecipeClick = (post) => {
        setSelectedRecipe(post);
    };
    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setSelectedProduct(null);
        setSelectedRecipe(null);
    };

    const handleSearch = (searchTerm) => {
        const items = degisken === "Products" ? products : 
                      degisken === "Recipes" ? recipes : posts;

        const filtered = items.filter(item => 
            item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.body?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredItems(filtered);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div>
                <ul className="category">
                    {categories.map((category, index) => (
                        <li className="category-text" key={index}>
                            <button onClick={() => handleClick(category)}>{category}</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="cart-container">
                {filteredItems.map((item, i) => (
                    <Cart 
                        key={i} 
                        product={degisken === "Products" ? item : null}
                        recipe={degisken === "Recipes" ? item : null}
                        post={degisken === "Post&Comments" ? item : null}
                        degisken={degisken} 
                        onPostClick={
                            degisken === "Products" ? handleProductClick : 
                            degisken === "Recipes" ? handleRecipeClick : 
                            handlePostClick
                        } 
                    />
                ))}
            </div>

            <div className="simple-pagination">
                <button 
                    onClick={() => handlePageChange(page - 1)} 
                    disabled={page === 1}
                >
                    -
                </button>
                <span> {page} / {totalPages}</span>
                <button 
                    onClick={() => handlePageChange(page + 1)} 
                    disabled={page === totalPages}
                >
                    +
                </button>
            </div>

            {selectedPost && (
                <PostCom post={selectedPost} closeModal={closeModal} />
            )}
            {selectedProduct && (
                <Products product={selectedProduct} closeModal={closeModal} />
            )}
            {selectedRecipe && (
                <Recipe recipe={selectedRecipe} closeModal={closeModal} />
            )}
        </div>
    );
};

export default Home;
