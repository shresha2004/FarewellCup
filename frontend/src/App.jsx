import { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Introduction from './components/introduction';
import PlayerRegistration from './components/playerRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';
import TeamRegistrationForm from './components/teamRegistrationForm';
import PlayerList from './components/playerDisplay';
import TeamList from './components/teamDisplay';
import AuctionRules from './components/auctionRules';

function App() {
  // State to track registration success
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  // Create refs for each section
  const introductionRef = useRef(null);
  const playersRegisteredRef = useRef(null);
  const teamsRef = useRef(null);
  const rulesRef = useRef(null);
  const intrestRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll to the specific section
  const scrollToSection = (section) => {
    const sectionRefs = {
      introduction: introductionRef,
      playersRegistered: playersRegisteredRef,
      teams: teamsRef,
      rules: rulesRef,
      intrest: intrestRef,
      contact: contactRef,
    };

    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar scrollToSection={scrollToSection} />
        <main className="mt-16"> 
          <div ref={introductionRef} id="introduction">
            <Introduction setRegistrationSuccessful={setRegistrationSuccessful} />
          </div>

          <Routes>
            <Route path="/success" element={<RegistrationSuccess />} />
            <Route path="/mandaVinayChandra" element={<TeamRegistrationForm />} />
          </Routes>

          {/* PlayerList with forwardRef fix */}
          <PlayerList ref={playersRegisteredRef} id="playersRegistered" />
          
          <TeamList ref={teamsRef} id="teams"/>
          <AuctionRules ref={rulesRef} id="rules"/>
        </main>
      </div>
    </Router>
  );
}

export default App;
