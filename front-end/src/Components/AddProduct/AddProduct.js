
import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // Import useParams from React Router
import styles from './AddProduct.module.css'; // Import the CSS module

const AddProduct = () => {
    // const [productId,setProductId]= useState(0);
    // const { productId } = useParams(); // Retrieve the productId from the URL params
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    // const [image, setImage] = useState(null);
    const [error, setError] = useState(false);
    // console.log('ProductId:', productId);


   


    const addProduct = async () => {
        if (!name || !price || !description ) {
            setError(true);
            return false;
        }

        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            let result = await fetch("http://localhost:5000/add-product", {
                method: "post",
                body: JSON.stringify({ name, price, description, userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            result = await result.json();
            console.warn(result);

            setName('');
            setPrice('');
            setDescription('');
          
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // try {

        //     handleUpload();
        // }catch(err){
        //     console.err("error handling uplode image",err);
        // }
        
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add Product</h1>

            <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                className={styles.input}
                placeholder="Enter product name"
            />

            {error && !name && <span className={styles.span}>Enter Valid name</span>}

            <input
                type="number"
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
                className={styles.input}
                placeholder="Enter product price"
            />

            {error && !price && <span className={styles.span}>Enter valid price</span>}

            <input
                className={styles.textarea}
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                placeholder="Enter product Description"
            />

            {error && !description && <span className={styles.span}>Enter valid Description</span>}

            {/* <input type="file" accept="image" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button> */}

            {error && <span className={styles.span}>please choose the image file</span>}

            <button onClick={addProduct} className={styles.button}>Submit</button>
        </div>
    );
}

export default AddProduct;







