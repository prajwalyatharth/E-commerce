import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Spinner = ({ path = 'login' }) => {

    const [count, setcount] = useState(5)
    const Navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setcount((prevValue) => --prevValue)
        }, 1000);
        count === 0 && Navigate(`/${path}`, {
            state: location.pathname,
        })
        return () => clearInterval(interval)
    }, [count, Navigate, location, path])

    return (
        <>
            <div className="d-flex flex-column  justify-content-center align-items-center" style={{ height: '91vh' }}>
                <h1>redirecting to you in {count} second </h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner
