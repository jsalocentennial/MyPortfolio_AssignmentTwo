import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Contact.css";

const Contact = () => {
    
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Phone:", phoneNumber);
    console.log("Message:", message);

    navigate("/");
};
    
    return (
        <div className="contact-container">
            <h1>Contact</h1>  
                <h2>Contact Information</h2>
                    <p>Email:Jsalo@my.centennialcollege.ca</p>
                    <p>Phone: 705-222-2222</p>
            <h2>Send a Message</h2>
            
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="fName">First Name:</label>
                    <input type="text" id="fName" value={firstName} onChange={(event) => setFirstName(event.target.value)} name="fName" required />
                
                <label htmlFor="lName">Last Name:</label>
                    <input type="text" id="lName" value={lastName} onChange={(event) => setLastName(event.target.value)} name="lName" required />
                
                <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} name="email" required />
                
                <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} name="phoneNumber" required />
                
                <label htmlFor="message">Message:</label>
                    <textarea id="message" value={message} onChange={(event) => setMessage(event.target.value)} name="message" required></textarea>
                
                <button type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default Contact;