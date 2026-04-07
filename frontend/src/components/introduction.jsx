import React, { forwardRef } from 'react';
import PlayerRegistration from './playerRegistration';  // Import PlayerRegistration component
import { Link } from 'react-router-dom';
const Introduction = forwardRef(({ setRegistrationSuccessful }, ref) => {
  return (
    <div
      ref={ref} // Attach ref here
      className="relative flex flex-col md:flex-row items-center justify-center text-white py-12 px-4 bg-cover bg-center sm:bg-none"
    >
      {/* Background Image for Mobile with Reduced Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-black opacity-30 sm:hidden"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/drfp8nwqi/image/upload/v1739863176/blge8zmsfbf7m3zsrfyt.png')`,
          zIndex: -1
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 p-8 rounded-lg w-full max-w-3xl md:text-left ">
        <h1 className="text-4xl font-extrabold mb-4 text-[#d4af37] drop-shadow-lg">Welcome to the Farewell Cup 2026</h1>
        <p className="text-lg text-gray-300 leading-relaxed my-5">
          The Farewell Cup 2026 is an exciting cricket tournament where hostelites from NMIT college can register
          as individual players and participate in a unique auction process. Captains will bid on registered players in a dynamic,
          real-time auction using a point-based system. Join us for an unforgettable experience as we bid, build teams, and celebrate the
          spirit of cricket!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="w-full flex">
            <PlayerRegistration setRegistrationSuccessful={setRegistrationSuccessful} />
          </div>

          <div className="w-full flex">
            <Link to="/team-registration" className="w-full">
              <button
                className="shiny-button bg-gradient-to-r from-[#5c0000] via-[#8b0000] to-[#5c0000] text-[#d4af37] font-bold py-3 px-6 rounded-full text-xl shadow-lg transition-all relative w-full h-full"
              >
                Team Register
              </button>
            </Link>
          </div>

          <div className="w-full flex">
            <Link to="/players" className="w-full">
              <button className="bg-[#121212] border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#121212] font-bold py-3 px-6 rounded-full text-xl transition-all shadow-md w-full h-full">
                View Players
              </button>
            </Link>
          </div>

          <div className="w-full flex">
            <Link to="/teams" className="w-full">
              <button className="bg-[#121212] border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#121212] font-bold py-3 px-6 rounded-full text-xl transition-all shadow-md w-full h-full">
                View Teams
              </button>
            </Link>
          </div>
        </div>
      </div>


      <div className="w-3/4 md:w-1/3 mt-12 md:mt-0 md:ml-8 flex justify-center">
        <img
          src="https://res.cloudinary.com/dlrlgzxs1/image/upload/Main_gvt98w.png"
          alt="Farewell Cup"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
});

export default Introduction;
