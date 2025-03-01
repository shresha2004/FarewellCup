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

import TeamDetails from './components/teamDetails';
import Footer from './components/footer';
import Contact from './components/Contact';
import Venue from './components/Venue';  // ✅ Import Venue Component
import DateTimings from './components/DateTimings';  // ✅ Import Date & Timings Component


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Refs for smooth scrolling
  const sectionRefs = {
    introduction: useRef(null),
    playersRegistered: useRef(null),
    teams: useRef(null),
    rules: useRef(null),
    venue: useRef(null),
    dateTimings: useRef(null),
    contact: useRef(null),
    login: useRef(null),
  };

  const scrollToSection = (section) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };
if(isAdmin) localStorage.setItem('isAdmin','true');
  return (
    <div className="min-h-screen flex flex-col">
      {/* Show Navbar only if not on the bidding page */}
      {location.pathname !== "/bidding" && <Navbar scrollToSection={scrollToSection} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}

      <main className="mt-16">
        <Routes>
          <Route path="/success" element={<RegistrationSuccess />} />
          <Route path="/mandaVinayChandra" element={<TeamRegistrationForm />} />
          <Route path="/bidding" element={<BiddingPage />} />

          <Route path="/teams/:teamId" element={<TeamDetails />} />
          
          {/* Render all other sections only when not on bidding page */}

          <Route
            path="/"
            element={
              <>
                <div ref={sectionRefs.introduction} id="introduction">
                  <Introduction />
                </div>

                <TeamList ref={sectionRefs.teams} id="teams" />
                <PlayerList ref={sectionRefs.playersRegistered} id="playersRegistered" />

                <AuctionRules ref={sectionRefs.rules} id="rules" />

                <div ref={sectionRefs.venue} id="venue">
                  <Venue />
                </div>

                <div ref={sectionRefs.dateTimings} id="dateTimings">
                  <DateTimings />
                </div>

                <div ref={sectionRefs.contact} id="contact">
                  <Contact />
                </div>

                <div ref={sectionRefs.login} id="login">
                  <AdminLogin setIsAdmin={setIsAdmin} />
                  {isAdmin && <StartBiddingButton />}
                </div>
                <Footer/>
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
        className="bg-[#802BB1] text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition mb-3"
      >
        Start Bidding
      </button>
    </div>
  );
}

export default App;
