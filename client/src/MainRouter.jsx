import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Projects from './Components/Projects';
import Education from './Components/Education';
import Services from './Components/Services';
import Contact from './Components/Contact';
import Login from './Components/Login';
import { useState } from 'react';
import Signup from './Components/Signup';


const MainRouter = () => {
const [token, setToken] = useState(() => localStorage.getItem('token'));  //Creates token variables and sets it to the value in local storage if it exists, otherwise null

const handleAuth = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
}

const handleLogout = () => {                                              //Removes token from local storage upon logout
    localStorage.removeItem('token');
    setToken(null);
}

const isAdmin = () => {                                                   //Checks if the user is an admin
    if (!token) {
        return false;
    }

    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(
            atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        );

        if (decoded.role === 'admin' &&
            decoded.exp * 1000 > Date.now()) {
            return true;
        }

        return false;

    } catch (error) {
        return false;
    }
}

    return (
    <div>
        <Layout token={token} onLogout={handleLogout} />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects isAdmin={isAdmin} token={token} />} />
            <Route path="/education" element={<Education isAdmin={isAdmin} token={token} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact isAdmin={isAdmin} token={token} />} />
            <Route path="/login" element={<Login onAuth={handleAuth} />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </div> 
    )
}



export default MainRouter;