import {Link} from 'react-router-dom';
import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Projects from './Components/Projects';
import Education from './Components/Education';
import Services from './Components/Services';
import Contact from './Components/Contact';

const MainRouter = () => {
    return (
     <div>
        <Layout />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
     </div> 
    )
}

export default MainRouter;