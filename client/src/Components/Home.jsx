import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Home</h1>
            <p>Welcome to my Portfolio! I am a 2nd year Software Engineering student who is interested in
                software design and building games. I work full time in aviation and attend classes on my
                days off.
            </p>
            <h2>Mission Statement</h2>
                <p>My intention is to learn how to program and build software to create the projects I want to create.
                     I am not programming to get a job, but to follow my own interests. Each project I complete I see 
                     as a tool to learn more and become a more competent programmer. 
                </p>
            <Link to="/about">About Me</Link>
        </div>
    )
}

export default Home;