import "../styles/Contact.css";
import { useState, useEffect } from 'react';

const Contact = ({ isAdmin, token }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [contacts, setContacts] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(false);
    const [contactsError, setContactsError] = useState('');
    const [editingContactId, setEditingContactId] = useState(null);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    useEffect(() => {
        if (!isAdmin()) {
            return;
        }

        const getContacts = async () => {
            setLoadingContacts(true);
            setContactsError('');

            try {
                const response = await fetch('/api/contacts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to retrieve contacts');
                }

                setContacts(data);

            } catch (error) {
                setContactsError(error.message);

            } finally {
                setLoadingContacts(false);
            }
        };

        getContacts();
    }, [token, isAdmin]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');

        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    message
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }

            setSuccess('Your message has been sent successfully!');

            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');

        } catch (error) {
            setError(error.message);
        }
    

};

    const handleEdit = (contact) => {
        setEditingContactId(contact._id);

        setEditForm({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phoneNumber: contact.phoneNumber,
            message: contact.message || ''
        });
    };

    const handleEditChange = (event) => {
    const { name, value } = event.target;

        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleUpdateContact = async (event) => {
    event.preventDefault();
    setContactsError('');

    try {
        const response = await fetch(`/api/contacts/${editingContactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editForm)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update contact');
        }

        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact._id === editingContactId ? data : contact
            )
        );

        setEditingContactId(null);

    } catch (error) {
        setContactsError(error.message);
    }
};

    const handleDeleteContact = async (contactId) => {
        const confirmed = window.confirm('Are you sure you want to delete this contact?');

        if (!confirmed) {
            return;
        }

        setContactsError('');

        try {
            const response = await fetch(`/api/contacts/${contactId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete contact');
            }

            setContacts((prevContacts) =>
                prevContacts.filter((contact) => contact._id !== contactId)
            );

            if (editingContactId === contactId) {
                setEditingContactId(null);
            }

        } catch (error) {
            setContactsError(error.message);
        }
    };

    
    
    return (
        <div className="contact-container">
            {isAdmin() && editingContactId && (
                <form className="contact-edit-form" onSubmit={handleUpdateContact}>
                    <h2>Edit Contact</h2>

                    <label htmlFor="editFirstName">First Name:</label>
                    <input
                        type="text"
                        id="editFirstName"
                        name="firstName"
                        value={editForm.firstName}
                        onChange={handleEditChange}
                        required
                    />

                    <label htmlFor="editLastName">Last Name:</label>
                    <input
                        type="text"
                        id="editLastName"
                        name="lastName"
                        value={editForm.lastName}
                        onChange={handleEditChange}
                        required
                    />

                    <label htmlFor="editEmail">Email:</label>
                    <input
                        type="email"
                        id="editEmail"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        required
                    />

                    <label htmlFor="editPhoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="editPhoneNumber"
                        name="phoneNumber"
                        value={editForm.phoneNumber}
                        onChange={handleEditChange}
                        required
                    />

                    <label htmlFor="editMessage">Message:</label>
                    <textarea
                        id="editMessage"
                        name="message"
                        value={editForm.message}
                        onChange={handleEditChange}
                    />

                    <button type="button" onClick={() => setEditingContactId(null)}>
                        Cancel
                    </button>

                    <button type="submit">Update Contact</button>

                </form>
            )}
            <h1>Contact</h1>  
                <h2>Contact Information</h2>
                    <p>Email:Jsalo@my.centennialcollege.ca</p>
                    <p>Phone: 705-222-2222</p>
            <h2>Send a Message</h2>

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            
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

            {isAdmin() && (
                <div className="contact-submissions">
                    <h2>Contact Submissions</h2>

                    {loadingContacts && <p>Loading submissions...</p>}
                    {contactsError && <p>Error: {contactsError}</p>}

                    {!loadingContacts && contacts.length === 0 && (
                        <p>No contact submissions available.</p>
                    )}

                    {contacts.map((contact) => (
                        <div className="contact-card" key={contact._id}>
                            <h3>{contact.firstName} {contact.lastName}</h3>

                            <p><b>Email:</b> {contact.email}</p>
                            <p><b>Phone:</b> {contact.phoneNumber}</p>
                            <p><b>Message:</b> {contact.message}</p>
                            <div className="contact-actions">
                            <button type="button" onClick={() => handleEdit(contact)}>
                                Edit
                            </button>

                            <button type="button" onClick={() => handleDeleteContact(contact._id)}>
                                Delete
                            </button>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Contact;