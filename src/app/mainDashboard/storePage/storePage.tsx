"use client";

import React, { useEffect, useState } from "react";

interface Collection {
  id: number;
  title: string;
  image: string | null;
}

interface Category {
  [key: string]: Collection[];
}

interface Product {
  id: number;
  title: string;
  images: { src: string }[];
}

const StorePage: React.FC = () => {
  const [categories, setCategories] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`Failed to fetch categories. Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products for a collection
  const fetchProducts = async (collectionId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products?collectionId=${collectionId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCollections(categories?.[category] || []);
    setSelectedCollection(null);
    setProducts([]);
  };

  // Handle collection selection
  const handleCollectionSelect = (collection: Collection) => {
    setSelectedCollection(collection.id);
    fetchProducts(collection.id);
  };

  return (
    <div>
      <h1>Store Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && !selectedCategory && categories && (
        <div>
          <h2>Categories</h2>
          <div style={styles.grid}>
            {Object.keys(categories).map((category) => (
              <div key={category} style={styles.card} onClick={() => handleCategorySelect(category)}>
                <h3>{category}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && selectedCategory && (
        <div>
          <button onClick={() => setSelectedCategory(null)}>Back to Categories</button>
          <h2>Collections in {selectedCategory}</h2>
          <div style={styles.grid}>
            {collections.map((collection) => (
              <div key={collection.id} style={styles.card} onClick={() => handleCollectionSelect(collection)}>
                <h3>{collection.title}</h3>
                {collection.image && <img src={collection.image} alt={collection.title} style={styles.image} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && selectedCollection && (
        <div>
          <button onClick={() => setSelectedCollection(null)}>Back to Collections</button>
          <h2>Products in Collection</h2>
          <div style={styles.grid}>
            {products.map((product) => (
              <div key={product.id} style={styles.card}>
                <h3>{product.title}</h3>
                {product.images.length > 0 && <img src={product.images[0].src} alt={product.title} style={styles.image} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    width: "200px",
    textAlign: "center",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
  },
};

export default StorePage;