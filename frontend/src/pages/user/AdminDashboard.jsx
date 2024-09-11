import React from 'react'
import './Dashboard.css'
import AdminMenu from '../../components/admin/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <div className='dashboard-page container m-3'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminMenu />
                </div>
                <div className='col-md-10'>
                    <h2 className='text-center'>Admin Dashboard</h2>

                    <div className='card w-100 p-3'>
                        <h5>Admin name: {auth?.user?.name}</h5>
                        <h5>Admin email: {auth?.user?.email}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
