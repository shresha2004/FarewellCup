import React from 'react';

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#802BB1] text-center p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
        <p className="text-white mb-4">You have successfully registered for the cricket event.</p>
        <a
          href="https://chat.whatsapp.com/Jn5Dr0ekmpa412bn9ULoMn"  // Replace with your actual WhatsApp group link
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] font-bold underline"
        >
          Join the WhatsApp Group
        </a>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
