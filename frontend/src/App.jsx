import { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Introduction from './components/introduction';
import PlayerRegistration from './components/playerRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';
import TeamRegistrationForm from './components/teamRegistrationForm';
import PlayerList from './components/playerDisplay';
import TeamList from './components/teamDisplay';
import AuctionRules from './components/auctionRules';
import AdminLogin from './components/organiserLogin';
import BiddingPage from './components/bidding';

function App() {
  

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Now inside Router, so it works fine!
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  
  const introductionRef = useRef(null);
  const playersRegisteredRef = useRef(null);
  const teamsRef = useRef(null);
  const rulesRef = useRef(null);
  const loginRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (section) => {
    const sectionRefs = {
      introduction: introductionRef,
      playersRegistered: playersRegisteredRef,
      teams: teamsRef,
      rules: rulesRef,
      login: loginRef,
      contact: contactRef,
    };

    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if(isAdmin) localStorage.setItem('isAdmin','true');

 return (
    <div className="min-h-screen flex flex-col">
      {/* Show Navbar only if not on the bidding page */}
      {location.pathname !== "/bidding" && <Navbar scrollToSection={scrollToSection} />}

      <main className="mt-16">
        <Routes>
          <Route path="/success" element={<RegistrationSuccess />} />
          <Route path="/mandaVinayChandra" element={<TeamRegistrationForm />} />
          <Route path="/bidding" element={<BiddingPage />} />
          
          {/* Render all other sections only when not on bidding page */}
          <Route
            path="/"
            element={
              <>
                <div ref={introductionRef} id="introduction">
                  <Introduction setRegistrationSuccessful={setRegistrationSuccessful} />
                </div>

                <PlayerList ref={playersRegisteredRef} id="playersRegistered" />
                <TeamList ref={teamsRef} id="teams" />
                <AuctionRules ref={rulesRef} id="rules" />

                <div ref={loginRef} id="login">
                  <AdminLogin setIsAdmin={setIsAdmin} />
                  {isAdmin && <StartBiddingButton />}
                </div>
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function StartBiddingButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => navigate('/bidding')}
        className="bg-[#802BB1] text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Start Bidding
      </button>
    </div>
  );
}

export default App;
