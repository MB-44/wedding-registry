"use client";

import React, { useState } from "react";
import styles from "./editProfile.module.css";

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    weddingDate: "",
    deliveryDate: "",
  });

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("Profile updated successfully!");
    setTimeout(() => setFeedback(null), 3000); // Clear feedback after 3 seconds
  };

  return (
    <div className={styles.container}>
      <h1>Edit Profile</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.profilePicture}>
          <label htmlFor="profilePicture" className={styles.imageLabel}>
            <img
              src={formData.profilePicture || "/images/default-profile.png"}
              alt="Profile"
              className={styles.imagePreview}
            />
            <span className={styles.editIcon}>📷</span>
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          placeholder="Phone (e.g., +94 123 4567)"
          onChange={handleInputChange}
          required
        />
        <textarea
          name="address"
          value={formData.address}
          placeholder="Enter your full address"
          onChange={handleInputChange}
        />
        <div className={styles.inputGroup}>
          <label>Wedding Date:</label>
          <input
            type="date"
            name="weddingDate"
            value={formData.weddingDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Delivery Date:</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
            required
          />
        </div>
        {feedback && <p className={styles.feedback}>{feedback}</p>}
        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
