import React from 'react'
import './PageNotFound.css'
import { Helmet } from 'react-helmet'

const PageNotFound = () => {
    return (
        <div className='page-not-found'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>page not found</title>
            </Helmet>
            <div style={{ fontSize: '70px' }}>404</div>
            <div style={{ fontSize: '30px' }}>Oops ! Page Not Found</div>
            <div>
                <button className='buy-button'>Go back</button>
            </div>
        </div>
    )
}

export default PageNotFound
