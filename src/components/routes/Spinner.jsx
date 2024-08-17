import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Spinner = () => {

    const [count, setcount] = useState(5)
    const Navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setcount((prevValue) => --prevValue)
        }, 1000);
        count === 0 && Navigate('/login')
        return () => clearInterval(interval)
    }, [count, Navigate])

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '91vh' }}>
                <h1>redirecting to you in {count} second </h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner
