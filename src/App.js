import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import PageNotFound from './pages/notFound/PageNotFound';
import { AuthProvider } from './context/auth';
import Dashboard from './pages/user/Dashboard';
import PrivetRoute from './components/routes/Privet';


function App() {
  return (
    <AuthProvider>
      <Router>

        <Navbar />

        <Routes>
          <Route exact path='/' element={<Home />} />

          <Route exact path='/dashboard' element={<PrivetRoute />}>
            <Route exact path='' element={<Dashboard />} />
          </Route>

          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='*' element={<PageNotFound />} />
        </Routes>

        <Footer />


      </Router>
    </AuthProvider>

  );
}

export default App;
