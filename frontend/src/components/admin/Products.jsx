import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import AdminMenu from './AdminMenu'
import { Link } from 'react-router-dom';

const Products = () => {

    const [products, setProducts] = useState([]);

    //token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNlZDAzOTI0N2Y4NTA1NmE3ZDIwMWIiLCJpYXQiOjE3MjUyOTYwMTUsImV4cCI6MTcyNzg4ODAxNX0.MGeT6VvFupJCo9bclxKh2wb9Ctl5WT_4CsQOJOTXj-Q';

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/products/get-product', {
                headers: {
                    Authorization: `Bearer ${token}`, // Use Authorization header
                },
            });
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    // lifecycle
    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div className='dashboard-page container m-5'>
            <div className="row">
                <Toaster />
                <div className='col-md-2'>
                    <AdminMenu />
                </div>
                <div className='col-md-10'>
                    <h2 className='text-center'> All Products List</h2>
                    <div className='d-flex flex-wrap justify-content-center '>
                        {products?.map((p) => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} style={{ textDecoration: "none" }}>
                                <div className="card m-3" style={{ width: '15rem', height: '18rem' }} key={p._id}>
                                    <img src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <button className="btn btn-primary">Update</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Products
