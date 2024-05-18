import React, { useState, useEffect } from 'react';

import { Link} from 'react-router-dom';
import styles from './ProductList.module.css'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    // const navigate = useNavigate();
   
   
     
    const getProducts = async() => {
        try {
            let result = await fetch('http://localhost:5000/products'
            ,{
                header:{
                    method: 'GET',
                    authorization:JSON.parse(localStorage.getItem('token'))
                }
            }
        );
            result =await result.json();
            setProducts(result);
        }
         catch (error) {
            return("error",error)
        }
    }

    useEffect(() => {
        getProducts();
        // console.warn("hello product list getProducts()")
    },[]);

    const deleteProduct=async(id)=>{
        // console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result = await result.json();
        if(result){
            // alert("Product deleted")
            setProducts(result);
            getProducts();
        }else{
            return("err");
        }
        // console.warn(result)

    }
//    console.warn(products);

    const searchHandle = async (event)=> {
        // console.warn(event.target.value)
        
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
                // console.warn(result);
            }
        }else{
            getProducts()
        }
        
    }




    return (
        <div className={styles.ProductList}>
            <h3 className={styles.heading}>Product List</h3>
            <input type="text" className={styles.searchbox} onChange={searchHandle} placeholder='Search' />
            <ul className={styles.ulist}>
                        <li className={styles.list}>S. no</li>
                        <li className={styles.list}>Name</li>
                        <li className={styles.list}>Price</li>
                        <li className={styles.list}>Description</li>
                        <li className={styles.list}>Operation</li>
                    </ul>



            {
                products.length > 0 ? products.map((item,index) =>
                    <ul className={styles.ulist} key={item._id}>
                        <li className={styles.list}>{index+1}</li>
                        <li className={styles.list}>{item.name}</li>
                        <li className={styles.list}>{item.price} </li>
                        <li className={styles.list}>{item.description}</li>
                        <li className={styles.list} >
                              <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            
                            {/* <Link to ={`/update/${item._id}`}>Update</Link> */}
                            <Link to ={`/update/${item._id}`}>Update</Link>
                      
                           
                        </li>
                    </ul>
                )
                :<h1>NO Results Found</h1>
            }

        </div>
    )
}
export default ProductList;