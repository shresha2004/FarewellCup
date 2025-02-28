import React, { forwardRef } from 'react';
import PlayerRegistration from './playerRegistration';  // Import PlayerRegistration component

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
      <div className="relative z-10 p-8 rounded-lg w-full max-w-3xl md:text-left">
        <h1 className="text-4xl font-extrabold mb-4 text-[#ffcc00] drop-shadow-lg">Welcome to the Farewell Cup 2025</h1>
        <p className="text-lg text-gray-300 leading-relaxed my-5">
          The Farewell Cup 2025 is an exciting cricket tournament where hostelites from our college can register
          as individual players and participate in a unique auction process. Captains will bid on registered players in a dynamic,
          real-time auction using a point-based system. Join us for an unforgettable experience as we bid, build teams, and celebrate the
          spirit of cricket!
        </p>

        {/* Player Registration Form */}
        <PlayerRegistration setRegistrationSuccessful={setRegistrationSuccessful} />
      </div>

      {/* Right Side: Image for Larger Screens */}
      <div className="hidden lg:block w-1/3 ml-8">
        <img
          src="https://res.cloudinary.com/drfp8nwqi/image/upload/v1739863176/blge8zmsfbf7m3zsrfyt.png"
          alt="Farewell Cup"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
});

export default Introduction;
