import '../styles/Projects.css';


const Projects = () => {
    return (
        <div className="projects-container">
            <h1>Projects</h1>
            <div className="project_one">
                    <h2>Project 1: GLIP Hackathon</h2>
                    <img src="/files/GLIP_Presentation.jpg" alt="GLIP Presentation" />
                    <p><b>Details:</b> I acted as the team lead for team ConstructMatrix. This involved
                        meeting with mentors, discussing application requirements, conveying
                         technical requirements to the tech lead and developing technical 
                         documents towards the creation of our application.
                    </p>
                    <p><b>Outcome:</b> Finalist at GLIP Presentation Day 2026</p>
            </div>
            <div className="project_two">
                <h2>Project 2: Space Convoy Game</h2>
                <img src="/files/Space_Convoy.png" alt="Space Convoy Game" />
                <p><b>Details:</b>Space convoy is a single player, terminal based game set in a ship
                    travelling through space. The player must decide what action to take
                    in order to survive the journey. The game was built using C# and is
                    a console application. The game is still in development and will be
                    updated as I learn more about programming.
                </p>
                <p><b>Outcome:</b> Project still in development</p>
            </div>
            <div className="project_three">
                <h2>Project 3: WimTach Hackathon</h2>
                <img src="/files/WIMTACH_Hackathon.png" alt="WIMTACH Hackathon certificate" />
                <p><b>Details:</b>I participated in the WimTach Hackathon, where I worked with a team to develop a innovative solution
                     for a food disperal vending machine. The experience allowed me to enhance my problem-solving skills 
                     and collaborate effectively with other developers.
                </p>
                <p><b>Outcome:</b> Participant and recognition certificate awarded.</p>
            </div>
        </div>
    )
}

export default Projects;