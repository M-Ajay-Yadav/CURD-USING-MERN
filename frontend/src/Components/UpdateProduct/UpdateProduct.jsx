import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./UpdateProduct.module.css";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetailsById();
  }, [params.id]);

  const getProductDetailsById = async () => {
    try {
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setDescription(result.description);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Update Product</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
        placeholder="Enter product name"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className={styles.input}
        placeholder="Enter product price"
      />
      <input
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter product Description"
      />
      <button onClick={updateProduct} className={styles.button}>
        Submit Update
      </button>
    </div>
  );
};

export default UpdateProduct;
