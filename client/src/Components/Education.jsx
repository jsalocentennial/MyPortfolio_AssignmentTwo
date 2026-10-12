import '../styles/Education.css';

const Education = () => {
    
    return (
        <div className="education">
            <h1>Education</h1>

            <h2>Degrees</h2>
                <div className="education-table">
                    <table>
                        <tr>
                            <th>Degree</th>
                            <th>Institution</th>
                            <th>Year</th>
                        </tr>
                        <tr>
                            <td>Software Engineering</td>
                            <td>Centennial College</td>
                            <td>2025 - Present</td>
                        </tr>
                        <tr>
                            <td>Artist Blacksmith</td>
                            <td>Flemming College</td>
                            <td>2016 - 2017</td>
                        </tr>
                        <tr>
                            <td>Aviation Flight Management</td>
                            <td>Confederation College</td>
                            <td>2011 - 2013</td>
                        </tr>
                    </table>
                </div>
            <h2>Certifications</h2>
            <div className="certification_table">
                <table>
                    <tr>
                        <th>Certification</th>
                        <th>Institution</th>
                        <th>Year</th>
                    </tr>
                    <tr>
                        <td>C# Development</td>
                        <td>Codecademy</td>
                        <td>2024</td>
                    </tr>
                </table>
            </div>

            <h2>Licenses</h2>
            <div className="license_table">
                <table>
                    <tr>
                        <th>License</th>
                        <th>Institution</th>
                        <th>Year</th>
                    </tr>
                    <tr>
                        <td>Commercial Pilot License</td>
                        <td>Confederation College</td>
                        <td>2013</td>
                    </tr>
                    <tr>
                        <td>Flight Instructor</td>
                        <td>Harv's Air</td>
                        <td>2013</td>
                    </tr>
                    <tr>
                        <td>Airline Transport Pilot License</td>
                        <td>Transport Canada</td>
                        <td>2022</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Education;