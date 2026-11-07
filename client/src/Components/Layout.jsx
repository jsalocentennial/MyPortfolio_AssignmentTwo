import { Link } from 'react-router-dom';
import "../styles/Layout.css";

const Layout = ({ token, onLogout }) => {
    return (
        <div className="layout">
            <h1 className="site-title">Portfolio</h1>
            <div className="layout_content">
                <div className="logo_photo">
                    <img src="../files/Logo_CyberPunk.png" alt="Logo" />
                </div>

                <div className="navigation">
                    <nav className="navbar">
                        <Link to="/">Home</Link> |
                        <Link to="/about">About</Link> |
                        <Link to="/projects">Projects</Link> |
                        <Link to="/education">Education</Link> |
                        <Link to="/services">Services</Link> |
                        <Link to="/contact">Contact</Link> |
                        {/* If user logged in, show logout button */}
                        {token ? (
                            <button
                                type="button"
                                className="nav-logout"
                                onClick={onLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </nav>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Layout;