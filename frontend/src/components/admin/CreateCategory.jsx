import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../Form/CategoryForm';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(''); // State for new category input
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNlZDAzOTI0N2Y4NTA1NmE3ZDIwMWIiLCJpYXQiOjE3MjUyOTYwMTUsImV4cCI6MTcyNzg4ODAxNX0.MGeT6VvFupJCo9bclxKh2wb9Ctl5WT_4CsQOJOTXj-Q'; // Your JWT token

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                'http://localhost:8080/api/v1/category/create-category', // Ensure the URL is correct
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use Authorization header
                    },
                }
            );

            if (data?.success) {
                toast.success(`${data.category.name} is created `);
                getAllCategory(); // Refresh category list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in adding category");
        }
    };

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category', {
                headers: {
                    Authorization: `Bearer ${token}`, // Use Authorization header
                },
            });

            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error("Failed to load categories");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <div className='dashboard-page container-fluid m-5'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminMenu />
                </div>
                <div className='col-md-10'>
                    <h3>Manage Category</h3>
                    <div className='card w-75 p-3'>
                        <div>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((c) => (
                                        <tr key={c._id}> {/* Key prop should be unique */}
                                            <td>{c.name}</td>
                                            <td>
                                                <button className='btn btn-primary'>Edit</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
