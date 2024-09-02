import React from 'react';
import './Navbar.css';
import logo1 from '../../assets/scarf.png';
import { TiShoppingCart } from "react-icons/ti";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Navbar = () => {
    const [auth, setAuth] = useAuth();



    const handleLogout = () => {
        setAuth({
            ...auth,
            user: "",
            token: ""
        });
        localStorage.removeItem('auth');

    };

    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container ">
                <div className='navbar-logo-name'>
                    <img src={logo1} alt="JustForYou logo" style={{ height: '30px' }} />
                    <h4>ShopForYou</h4>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active bold" : "nav-link"}
                                to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link active bold" : "nav-link"}
                                to="/about">
                                About us
                            </NavLink>
                        </li>


                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Products
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/men">Men</Link></li>
                                <li><Link className="dropdown-item" to="/women">Women</Link></li>
                                <li><Link className="dropdown-item" to="/women">Kids</Link></li>

                            </ul>
                        </li>

                        {!auth.user ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/register"><button className="bg-button">Register</button></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login"><button className="bg-button">Login</button></Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : "user"}`}>Dashboard</Link></li>

                                            <button onClick={handleLogout} className="bg-button">Logout</button>

                                        </ul>
                                    </li>


                                </li>
                            </>
                        )}

                        <li className="nav-item">
                            <div className="footer-link">
                                <Link to="/cart">
                                    <TiShoppingCart style={{ height: '40px', width: 'auto', marginTop: '5px' }} />
                                </Link>
                                <span>7</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
