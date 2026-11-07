
import { useState, useEffect } from 'react';
import '../styles/Projects.css';

const Projects = ({ isAdmin, token }) => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);                     //Holds variables for editing a project

    const [form, setForm] = useState({  // Form variables for creating new project
        title: '',
        description: '',
        completionDate: '',
        image_link: ''
    });

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await fetch('/api/projects');  // Get projects from database

                if (!response.ok) {
                    throw new Error('Failed to retrieve projects');
                }

                const data = await response.json();

                setProjects(data);
                console.log('Projects from database:', data);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        getProjects();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleEdit = (project) => {                            //Edit project 
        setEditingProject(project._id);
        setForm({
            title: project.title,
            description: project.description || '',
            completionDate: project.completionDate.slice(0, 10), // Format date for input field to YYYY-MM-DD
            image_link: project.image_link || ''
        });
        setShowForm(true);
    }

    const handleToggleForm = () => {                             //Toggle form for creating new project
        setShowForm(!showForm);
        setEditingProject(null);
        setForm({
            title: '',
            description: '',
            completionDate: '',
            image_link: ''
        });
    };

    const handleSubmit = async (event) => {                      //Submitting the form to create a new project
        event.preventDefault();
        setError('');

        try {
            const response = await fetch(
                editingProject ? `/api/projects/${editingProject}` : '/api/projects',        //Changes route depending on editing or creating
                {
                    method: editingProject ? 'PUT' : 'POST',    //Allows put for using and post for creating
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create project');    //Failed to create
            }

            if (editingProject) {                                               //Editing
                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project._id === editingProject ? data : project
                    )
                );
            } else {

                setProjects((prevProjects) => [...prevProjects, data]);
            }
            setForm({
                title: '',
                description: '',
                completionDate: '',
                image_link: ''
            });

            setEditingProject(null);
            setShowForm(false);

        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (projectId) => {                       //Delete project
        const confirmed = window.confirm('Are you sure you want to delete this project?');
        if (!confirmed) {
            return;
        }
        setError('');

        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete project');
        }

        setProjects((prevProjects) =>
            prevProjects.filter((project) => project._id !== projectId)
        );

    } catch (error) {
        setError(error.message);
    }
    };

    return (                                                                 //The project container details how the projects are displayed
        <div className="projects-container">
            <h1>Projects</h1>

            {loading && <p>Loading projects...</p>}
            {error && <p className="project-error" role="alert">Error: {error}</p>}

            {projects.map((project) => (
                <div className="project-card" key={project._id}>
                    <h2>{project.title}</h2>
                    <p>
                        <b>Details:</b> {project.description}
                    </p>
                    <p>
                        <b>Completion Date:</b> {
                            new Date(project.completionDate).toLocaleDateString(
                                'en-CA',
                                { timeZone: 'UTC' }
                            )
                        }
                    </p>
                    {project.image_link && (
                        <img src={project.image_link} alt={project.title} />
                    )}
                    {isAdmin() && (    
                        <div className="project-buttons">                               
                            <button onClick={() => handleEdit(project)}>Edit</button>
                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => handleDelete(project._id)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                    
                </div>
            ))} 

            <div className="add-project-button">                                      
                {isAdmin() && (
                    <button onClick={() => handleToggleForm()}>
                        {showForm ? 'Cancel' : 'Add Project'}
                    </button>
                )}
            </div>

            {isAdmin() && showForm && (
                <form className="project-form" onSubmit={handleSubmit}>
                    <h2>{editingProject ? 'Edit Project' : 'Create New Project'}</h2>          

                    <label htmlFor="title">Project Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <label htmlFor="completionDate">Completion Date</label>
                    <input
                        type="date"
                        id="completionDate"
                        name="completionDate"
                        value={form.completionDate}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="image_link">Image Path</label>
                    <input
                        type="text"
                        id="image_link"
                        name="image_link"
                        value={form.image_link}
                        onChange={handleChange}
                        placeholder="/files/example.jpg"
                    />

                    <button type="submit">
                        {editingProject ? 'Update Project' : 'Save Project'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Projects;
