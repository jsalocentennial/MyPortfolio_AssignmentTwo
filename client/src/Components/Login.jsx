import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onAuth }) => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState('')

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSaving(true)
        setError('')
        setSuccess('')

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to login')
            }

            onAuth(data.token)
            // navigate('/projects')

            setSuccess('Login successful')

        } catch (error) {
            setError(error.message)

        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
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
                    required
                />

                {error && <p>{error}</p>}
                {success && <p>{success}</p>}

                <button type="submit" disabled={saving}>
                    {saving ? 'Please wait...' : 'Login'}
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
        </div>
    )
}

export default Login