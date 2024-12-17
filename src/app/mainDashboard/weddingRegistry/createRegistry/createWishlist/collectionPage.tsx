// src/app/mainDashboard/weddingRegistry/createRegistry/createWishlist/CollectionsPage.tsx

"use client";

import React, { useEffect, useState } from "react";

interface ProductImage {
  src: string;
}

interface Product {
  id: number;
  title: string;
  images: ProductImage[];
}

interface CollectionImage {
  src: string;
}

interface Collection {
  id: number;
  title: string;
  image: CollectionImage | null;
  collectionType: 'custom' | 'smart';
}

interface CollectionWithProducts extends Collection {
  products: Product[];
}

const CollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<CollectionWithProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/api/collections");
        if (!response.ok) {
          throw new Error(`Failed to fetch collections. Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.collections || !Array.isArray(data.collections)) {
          throw new Error("Invalid collections data structure.");
        }
        setCollections(data.collections);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <h1>All Collections</h1>
      {loading && <p>Loading collections...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && collections.length > 0 && (
        <div style={styles.collectionContainer}>
          {collections.map((collection) => (
            <div key={collection.id} style={styles.collectionCard}>
              <h3>{collection.title}</h3>
              {collection.image ? (
                <img
                  src={collection.image.src}
                  alt={collection.title}
                  style={styles.collectionImage}
                />
              ) : (
                <p>No image available</p>
              )}
              <details>
                <summary>View Products</summary>
                {collection.products.length > 0 ? (
                  <ul>
                    {collection.products.map((product) => (
                      <li key={product.id}>
                        <strong>{product.title}</strong>
                        {product.images.length > 0 ? (
                          <img
                            src={product.images[0].src}
                            alt={product.title}
                            style={{ width: "100px", height: "auto" }}
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No products in this collection.</p>
                )}
              </details>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && collections.length === 0 && <p>No collections available.</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  collectionContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  collectionCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  collectionImage: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
  },
};

export default CollectionsPage;