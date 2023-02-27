
import React, { useState,  } from 'react'
import { Link } from 'react-router-dom'

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)


    const addProduct = async () => {

        console.warn(!name)
    if (!name || !price || !category || !company) {
        setError(true)
        return false;
    }
        console.warn(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:8000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: { 'Content-Type': 'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`      
        }
        });
        result = await result.json();
        console.warn(result)
        
    }

    return (
        <div className='product'>
            <h2>
                Add Product
            </h2>
            <input type='text' placeholder='Enter Product name' className='inputbox'
                onChange={(e) => { setName(e.target.value) }} value={name} required />

            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type='text' placeholder='Enter Product price' className='inputbox'
                onChange={(e) => { setPrice(e.target.value) }} value={price} required />

            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type='text' placeholder='Enter Product category' className='inputbox'
                onChange={(e) => { setCategory(e.target.value) }} value={category} required />

            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type='text' placeholder='Enter Product company' className='inputbox'
                onChange={(e) => { setCompany(e.target.value) }} value={company} required />

            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button onClick={addProduct} type='submit' className='btn'><Link to="/">Add Product</Link></button>
        </div>
        
    )
}

export default AddProduct