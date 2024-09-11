import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';



const AllProducts = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNlZDAzOTI0N2Y4NTA1NmE3ZDIwMWIiLCJpYXQiOjE3MjUyOTYwMTUsImV4cCI6MTcyNzg4ODAxNX0.MGeT6VvFupJCo9bclxKh2wb9Ctl5WT_4CsQOJOTXj-Q';


    //GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/products/get-product`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProducts()
    })
    return (
        <div className='dashboard-page container m-5'>
            <div className='row'>
                <div className="col-md-2">
                    <h6 className='text-center'>Filter By Category</h6>
                </div>
                <div className="col-md-10">
                    <h2 className='text-center'> Products </h2>
                    <div className='d-flex flex-wrap justify-content-center '>
                        {products?.map((p) => (

                            <div className="card m-3" style={{ width: '15rem', height: '18rem' }} key={p._id}>
                                <img src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <button className="btn btn-primary">Update</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AllProducts
