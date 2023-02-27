import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
ChartJS.register(Tooltip, ArcElement, Legend);



const Graph = () => {

    const [products, setProducts] = useState([])


    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:8000/dashboard', {
        });
        setProducts(await result.json())
    };






    
    let Products = products.things
    console.warn(Products)


    const data = {
        labels: [
            'Products',
                    ],
        datasets: [{
            label: 'All Products Count',
            data: [Products],
            backgroundColor: [
                'blue',
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    return (
        <>
            <div className='gra'>
                <Doughnut className='graph' data={data} />
            </div>
        </>
    );
};

export default Graph;
