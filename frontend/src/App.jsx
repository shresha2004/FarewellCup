import { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Introduction from './components/introduction';
//import PlayerRegistration from './components/playerRegistration';
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
  if (isAdmin) localStorage.setItem('isAdmin', 'true');
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-12">
      {/* Show Navbar only if not on the bidding page */}
      {location.pathname !== "/bidding" && <Navbar scrollToSection={scrollToSection} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}

      <main className="mt-16">
        <Routes>
          <Route path="/success" element={<RegistrationSuccess />} />
          <Route path="/mandaVinayChandra" element={<TeamRegistrationForm />} />
          <Route path="/team-registration" element={<TeamRegistrationForm />} />
          <Route path="/bidding" element={<BiddingPage />} />

          <Route path="/teams/:teamId" element={<TeamDetails />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/players" element={<PlayerList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={
            <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[50vh]">
              <AdminLogin setIsAdmin={setIsAdmin} />
              {isAdmin && <StartBiddingButton />}
            </div>
          } />

          {/* Render all other sections only when not on bidding page */}

          <Route
            path="/"
            element={
              <>
                <div ref={sectionRefs.introduction} id="introduction">
                  <Introduction />
                </div>

                <AuctionRules ref={sectionRefs.rules} id="rules" />

                <div ref={sectionRefs.venue} id="venue">
                  <Venue />
                </div>

                <div ref={sectionRefs.dateTimings} id="dateTimings">
                  <DateTimings />
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </main>

      {/* Global Sticky Banner */}
      <div className="fixed bottom-0 w-full z-[100] bg-gradient-to-r from-[#18181b] via-[#8b0000] to-[#18181b] border-t-2 border-[#d4af37] text-white py-2 text-center text-xs md:text-sm font-bold shadow-[0_-4px_10px_rgba(0,0,0,0.5)] flex flex-wrap justify-center items-center gap-2 px-2">
        <span className="text-[#d4af37]">★</span> <span className="tracking-wider">EXCLUSIVELY FOR HOSTELLITES</span> <span className="text-[#d4af37]">★</span>
        <span className="hidden md:inline">|</span>
        <span className="text-gray-300">Registration closes on: <span className="text-[#d4af37]">17th April 2026</span></span>
        <span className="hidden md:inline">|</span>
        <span className="text-gray-300">Auction: <span className="text-[#d4af37]">18th April 2026</span></span>
        <span className="hidden md:inline">|</span>
        <span className="text-gray-300">Tournament: <span className="text-[#d4af37]">1st-4th May 2026</span></span>
      </div>
    </div>
  );
}

function StartBiddingButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => navigate('/bidding')}
        className="bg-[#121212] border border-[#d4af37] text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition mb-3"
      >
        Start Bidding
      </button>
    </div>
  );
}

export default App;
