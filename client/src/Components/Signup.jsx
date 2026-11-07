import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [saving, setSaving] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create account');
            }

            setSuccess('Account created successfully! You can now log in.');

            setForm({
                name: '',
                email: '',
                password: ''
            });

        } catch (error) {
            setError(error.message);

        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="signup">
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                />

                {error && <p>{error}</p>}
                {success && <p>{success}</p>}

                <button type="submit" disabled={saving}>
                    {saving ? 'Please wait...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
};

export default Signup;