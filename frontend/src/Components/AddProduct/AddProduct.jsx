import React, { useState } from "react";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !description) {
      setError(true);
      return false;
    }

    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch("http://localhost:5000/add-product", {
        method: "post",
        body: JSON.stringify({ name, price, description, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);

      setName("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Product</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className={styles.input}
        placeholder="Enter product name"
      />

      {error && !name && <span className={styles.span}>Enter Valid name</span>}

      <input
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        className={styles.input}
        placeholder="Enter product price"
      />

      {error && !price && (
        <span className={styles.span}>Enter valid price</span>
      )}

      <input
        className={styles.textarea}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Enter product Description"
      />

      {error && !description && (
        <span className={styles.span}>Enter valid Description</span>
      )}

      {error && (
        <span className={styles.span}>please choose the image file</span>
      )}

      <button onClick={addProduct} className={styles.button}>
        Submit
      </button>
    </div>
  );
};

export default AddProduct;
