import { useState } from 'react';
import { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import PlayerRegistration from './components/playerRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';

function App() {
  // Create refs for each section
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const intrestRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll to the specific section
  const scrollToSection = (section) => {
    const sectionRefs = {
      about: aboutRef,
      projects: projectsRef,
      skills: skillsRef,
      education: educationRef,
      intrest: intrestRef,
      contact: contactRef,
    };

    sectionRefs[section]?.current.scrollIntoView({ behavior: 'smooth' });
  };
  // State to track registration success
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar scrollToSection={scrollToSection}/>
        <main className="mt-16"> 
          {/* Margin-top to push content below the navbar */}
          <Routes>
            {/* Registration Page */}
            <Route path="/" element={<PlayerRegistration setRegistrationSuccessful={setRegistrationSuccessful} />} />

            {/* Success Page */}
            <Route path="/success" element={<RegistrationSuccess />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
