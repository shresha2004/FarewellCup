import { useRef } from 'react';
import Navbar from './components/navbar';
import Introduction from './components/introduction';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar scrollToSection={scrollToSection} />
      <main className="mt-16"> 
        <Introduction/>
        
      </main>
    </div>
  );
}

export default App;
