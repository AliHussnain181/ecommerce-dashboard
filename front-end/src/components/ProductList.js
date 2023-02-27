import React, { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'


const ProductList = () => {
    
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:8000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        setProducts(result)
    };
    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:8000/product/${id}`,{
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if(result)
        {
            getProducts();
        }
    }

    const searchHandle = async(e)=>{
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:8000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result= await result.json();
            if(result){
                setProducts(result)
            }
            
             else{
                getProducts();
             }
        }
       

        
    }

    return (
        <div className='product-list'>
            <h3 className='pln'>Product List</h3>
            <input className='setinput' type="text" placeholder='Search Product'
            onChange={searchHandle}
            />
            <ul>
                <li>S no</li>
                <li>Name</li>
                <li>price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
             products.length>0  ?products.map((item, index) => 
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li><button className='delest' onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link className='updatest' to={'/update/'+item.name}><button className='btnn'>Update</button></Link>
                        </li>
                    </ul>
                )
                : <h1>Result Not Found</h1>
            }
        </div>
    )
}

export default ProductList