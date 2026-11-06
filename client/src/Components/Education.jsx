import '../styles/Education.css';
import { useState, useEffect } from 'react';

const Education = ({ isAdmin, token }) => {
    
    const [qualifications, setQualifications] = useState([]);                        //Similar setup to projects 
    const [loading, setLoading] = useState(true);
    const [editingQualificationId, setEditingQualificationId] = useState(null);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        title: '',
        type: 'Education',
        institution: '',
        completionDate: ''
    });


    useEffect(() => {
        const getQualifications = async () => {
            try {
                const response = await fetch('/api/qualifications');

                if (!response.ok) {
                    throw new Error('Failed to retrieve qualifications');
                }

                const data = await response.json();
                setQualifications(data);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        getQualifications();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleEdit = (qualification) => {
        setEditingQualificationId(qualification._id);
        setForm({
            title: qualification.title,
            type: qualification.type,
            institution: qualification.institution,
            completionDate: qualification.completionDate ? qualification.completionDate.slice(0, 10) : ''
        });
        setShowForm(true);
    }

    const handleToggleForm = () => {
        setShowForm(!showForm);
        setEditingQualificationId(null);

        setForm({
            title: '',
            type: 'Education',
            institution: '',
            completionDate: ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch(
                editingQualificationId
                    ? `/api/qualifications/${editingQualificationId}`
                    : '/api/qualifications',
                {
                    method: editingQualificationId ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...form,
                        completionDate: form.completionDate || null
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save qualification');
            }

            if (editingQualificationId) {
                setQualifications((prevQualifications) =>
                    prevQualifications.map((qualification) =>
                        qualification._id === editingQualificationId
                            ? data
                            : qualification
                    )
                );
            } else {
                setQualifications((prevQualifications) => [
                    ...prevQualifications,
                    data
                ]);
            }

            setForm({
                title: '',
                type: 'Education',
                institution: '',
                completionDate: ''
            });

            setEditingQualificationId(null);
            setShowForm(false);

        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (qualificationId) => {
    const confirmed = window.confirm('Are you sure you want to delete this qualification?');

        if (!confirmed) {
            return;
        }

        setError('');

        try {
            const response = await fetch(`/api/qualifications/${qualificationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete qualification');
            }

            setQualifications((prevQualifications) =>
                prevQualifications.filter(
                    (qualification) => qualification._id !== qualificationId
                )
            );

            if (editingQualificationId === qualificationId) {
                setEditingQualificationId(null);
                setShowForm(false);
            }

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="education">
            <h1>Education & Qualifications</h1>

            {loading && <p>Loading qualifications...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && qualifications.length === 0 && (
                <p>No qualifications available.</p>
            )}

            {qualifications.map((qualification) => (
                <div className="qualification-card" key={qualification._id}>
                    <h2>{qualification.title}</h2>

                    <p><b>Type:</b> {qualification.type}</p>
                    <p><b>Institution:</b> {qualification.institution}</p>

                    {qualification.completionDate && (
                        <p>
                            <b>Completion Date:</b> {
                                new Date(qualification.completionDate)
                                    .toLocaleDateString('en-CA', { timeZone: 'UTC' })
                            }
                        </p>
                    )}
                    {isAdmin() && (
                        <div className="qualification-actions">
                            <button type="button" onClick={() => handleEdit(qualification)}>
                                Edit
                            </button>

                            <button type="button" onClick={() => handleDelete(qualification._id)}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {isAdmin() && (
                <button type="button" onClick={handleToggleForm}>
                    {showForm ? 'Cancel' : 'Add Qualification'}
                </button>
            )}
            
            {isAdmin() && showForm && (
                <form className="qualification-form" onSubmit={handleSubmit}>
                    <h2>{editingQualificationId ? 'Edit Qualification' : 'Add Qualification'}</h2>

                    <label htmlFor="title">Qualification Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="type">Qualification Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="Education">Education</option>
                        <option value="Certification">Certification</option>
                        <option value="License">License</option>
                    </select>

                    <label htmlFor="institution">Institution:</label>
                    <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={form.institution}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="completionDate">Completion Date (Optional)</label>
                    <input
                        type="date"
                        id="completionDate"
                        name="completionDate"
                        value={form.completionDate}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        {editingQualificationId ? 'Update Qualification (Not Connected Yet)' : 'Save Qualification'}
                    </button>
                </form>
            )}
        </div>
    );
        
}
export default Education;