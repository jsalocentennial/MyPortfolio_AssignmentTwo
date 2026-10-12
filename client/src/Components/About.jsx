import '../styles/About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About Me</h1>
            
            <div className="about-content">
                
                <div className="about-photo">
                    <img 
                        className="profile-photo" 
                        src="/files/GLIPPhoto.jpg" 
                        alt="GLIP Photo" 
                    />
                </div>
                
                <div className="about-text">
                    <h2>Profile</h2>
                        
                        <p>Name: Jordan Salo</p>
                        
                        <p>Professional Biography: I am a pilot by trade with over 12 years in the industry.
                            I began my software engineering journey in 2024 while learning how to use the Unity
                            game engine. I started with CodeCademy online courses, and later enrolled in Centennial
                            Colleges Online Software Engineering program. I am currently in my second year of the
                            program and have expanded my knowledge considerably.
                        </p>
                        
                        <h2>Skills</h2>
                        
                        <ul>
                            <li>C#</li>
                            <li>Java</li>
                            <li>Python</li>
                            <li>HTML/CSS</li>
                            <li>SQL/Oracle</li>
                        </ul>

                        <a href="/files/JS Tech Resume.pdf" download target="_blank" rel="noopener noreferrer">
                            <button className="download-resume-button">Download Resume</button>
                        </a>
                </div>
             </div>   
            
        </div>
    )
}

export default About;