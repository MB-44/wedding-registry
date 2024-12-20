"use client";

import React, { useState } from "react";
import styles from "./gallery.module.css";

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => {
        return URL.createObjectURL(file);
      });
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <h1>Gallery</h1>
      <div className={styles.gallery}>
        {images.map((src, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img src={src} alt={`Gallery Image ${index}`} />
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveImage(index)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        multiple
        onChange={handleImageUpload}
        className={styles.fileInput}
      />
    </div>
  );
};

export default GalleryPage;
