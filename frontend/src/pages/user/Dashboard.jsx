import React from 'react'
import './Dashboard.css'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/userMenu/UserMenu'


const Dashboard = () => {

    const [auth] = useAuth();
    return (
        <div className='dashboard-page container-fluid m-3'>
            <div className='row'>
                <div className='col-md-2'>
                    <UserMenu />
                </div>
                <div className='col-md-10'>
                    <h3>User Dashboard</h3>

                    <div className='card w-75 p-3'>
                        <h5>User name: {auth?.user?.name}</h5>
                        <h5>User email: {auth?.user?.email}</h5>
                        <h5>User address: {auth?.user?.address}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
