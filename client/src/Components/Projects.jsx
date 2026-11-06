
import { useState, useEffect } from 'react';
import '../styles/Projects.css';

const Projects = ({ isAdmin, token }) => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create project');
            }

            setProjects((prevProjects) => [...prevProjects, data]);
            setForm({
                title: '',
                description: '',
                completionDate: '',
                image_link: ''
            });
            setShowForm(false);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="projects-container">
            <h1>Projects</h1>

            {loading && <p>Loading projects...</p>}
            {error && <p>Error: {error}</p>}

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
                </div>
            ))}

            <div className="project_one">
                <h2>Project 1: GLIP Hackathon</h2>
                <img src="/files/GLIP_Presentation.jpg" alt="GLIP Presentation" />
                <p>
                    <b>Details:</b> I acted as the team lead for team ConstructMatrix. This involved
                    meeting with mentors, discussing application requirements, conveying
                    technical requirements to the tech lead and developing technical
                    documents towards the creation of our application as well as the creation and
                    presentation of our final pitch in front of a panel of judges and audience of peers.
                </p>
                <p><b>Outcome:</b> Finalist at GLIP Presentation Day 2026</p>
            </div>

            <div className="project_two">
                <h2>Project 2: Space Convoy Game</h2>
                <img src="/files/Space_Convoy.png" alt="Space Convoy Game" />
                <p>
                    <b>Details:</b> Space convoy is a single player, terminal based game set in a ship
                    travelling through space. The player must decide what action to take
                    in order to survive the journey. The game was built using C# and is
                    a console application. The game is still in development and will be
                    updated as I learn more about programming. I acted as the sole software developer
                    for this project.
                </p>
                <p><b>Outcome:</b> Project still in development</p>
            </div>

            <div className="project_three">
                <h2>Project 3: WimTach Hackathon</h2>
                <img src="/files/WIMTACH_Hackathon.png" alt="WIMTACH Hackathon certificate" />
                <p>
                    <b>Details:</b> I participated in the WimTach Hackathon, where I worked with a team to develop a innovative solution
                    for a food disperal vending machine. The experience allowed me to enhance my problem-solving skills
                    and collaborate effectively with other developers.
                </p>
                <p><b>Outcome:</b> Participant and recognition certificate awarded.</p>
            </div>

            <div className="add-project-button">
                {isAdmin() && (
                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : 'Add Project'}
                    </button>
                )}
            </div>

            {isAdmin() && showForm && (
                <form className="project-form" onSubmit={handleSubmit}>
                    <h2>Create New Project</h2>

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

                    <button type="submit">Save Project</button>
                </form>
            )}
        </div>
    );
};

export default Projects;
