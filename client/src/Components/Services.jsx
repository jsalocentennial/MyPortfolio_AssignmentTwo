import '../styles/Services.css';

const Services = () => {
    return (
        <div className="services-container">
            <h1>Services</h1>
            <p>What are you looking for?</p>

            <ul className="services-list">
                <li>
                    <div className="service-cost">
                        <span>Project Management</span>
                        <span>500 Gold</span>
                    </div>
                    <ul className="services-sublist">
                        <li>1 on 1 consultation</li>
                        <li>Technical documentation and consultation</li>
                        <li>Product development</li>
                    </ul>
                </li> 
                <li>
                    <div className="service-cost">
                        <span>Game Development</span>
                        <span>750 Gold</span>
                    </div>
                    <ul className="services-sublist">
                        <li>Technical consultation</li>
                        <li>Story and hook gameplay loop development</li>
                        <li>Code development and debugging</li>
                    </ul>
                </li>

                <li>
                    <div className="service-cost">
                        <span>Tutoring</span>
                        <span>250 Gold</span>
                    </div>
                    <ul className="services-sublist">
                        <li>Personalized tutoring in C#</li>
                        <li>Flexible Hours</li>
                        <li>In person or on-line</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Services;