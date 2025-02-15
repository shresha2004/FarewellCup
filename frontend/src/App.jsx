import { useState } from 'react'
import { useRef } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'

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
    <>
<Navbar scrollToSection={scrollToSection} />    </>
  )
}

export default App
