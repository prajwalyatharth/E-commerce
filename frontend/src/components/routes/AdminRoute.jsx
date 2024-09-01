import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from './Spinner';

const AdminRoute = () => {

    const [ok, setok] = useState(false)
    const [auth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('http://localhost:8080/api/v1/auth/admin',
                {
                    headers: {
                        "Authorization": `Bearer ${auth?.token}`
                    }
                }

            )
            if (res.data.ok) {
                setok(true)
            } else {
                setok(false)
            }
        }

        if (auth?.token) authCheck();

    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path='' />
}


export default AdminRoute
