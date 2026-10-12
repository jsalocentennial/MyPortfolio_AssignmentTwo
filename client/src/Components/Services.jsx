import '../styles/Services.css';

const Services = () => {
    return (
        <div className="services-container">
            <h1>Services</h1>
            <p>What are you looking for?</p>

            <ul className="services-list">
                <li>
                    <span>Project Management</span>
                    <span>500 Gold</span>
                </li>
                <li>
                    <span>Game Development</span>
                    <span>750 Gold</span>
                </li>
                <li>
                    <span>Tutoring</span>
                    <span>250 Gold</span>
                </li>
            </ul>
        </div>
    );
};

export default Services;