
import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom'


const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams();
    
    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async ()=> {
        console.warn(params)
        let result = await fetch(`http://localhost:8000/product/${params.name}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = fetch(`http://localhost:8000/product/${params.name}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: { 'Content-Type': 'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
            
        })
        result = await result.json()
        console.warn(result);
        
    }

    return (
        <div className='product'>
            <h1>
                Update Product
            </h1>
            <input type='text' placeholder='Enter Product name' className='inputbox'
                onChange={(e) => { setName(e.target.value) }} value={name} />


            <input type='text' placeholder='Enter Product price' className='inputbox'
                onChange={(e) => { setPrice(e.target.value) }} value={price} />


            <input type='text' placeholder='Enter Product category' className='inputbox'
                onChange={(e) => { setCategory(e.target.value) }} value={category} />


            <input type='text' placeholder='Enter Product company' className='inputbox'
                onChange={(e) => { setCompany(e.target.value) }} value={company} />


            <button onClick={updateProduct} className='btn'><Link style={{textDecoration:'none'}} to={'/'}>Update Product</Link></button>


             {/* <div onChange={(e) => { setProductDetails(e.target.value) }} value='productdetails' ></div> */}

        </div>
        
    
    )
}

export default UpdateProduct