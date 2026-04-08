import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationSuccess from './RegistrationSuccess';  // Import the success page
import api from "../utils/api";

const PlayerRegistration = (ref) => {
  const [name, setName] = useState('');
  const [hostel, setHostel] = useState('');
  const [year, setYear] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);  // Track registration status

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'FarewellCup uploads');

    setIsUploading(true);
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dlrlgzxs1/image/upload',
        formData
      );
      setIsUploading(false);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    if (image) {
      imageUrl = await uploadToCloudinary();
      if (!imageUrl) {
        toast.error('Image upload failed. Please try again.');
        return;
      }
    }

    const playerData = {
      name,
      hostel,
      year,
      contact,
      role,
      profilePic: imageUrl,
    };

    setIsSubmitting(true);

    try {

      await api.post('players/register', playerData);
      toast.success('Registration Successful!');
      setIsRegistered(true); // Set registration status to true
      setIsModalOpen(false); // Close the form modal when success
    } catch (error) {
      console.error('Error registering player:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-center w-full h-full flex">
      <button
        onClick={openModal}
        rel="noopener noreferrer"
        className="shiny-button hover:scale-105 transform hover:shadow-2xl bg-gradient-to-r from-[#5c0000] via-[#8b0000] to-[#5c0000] text-[#d4af37] font-extrabold py-5 px-8 rounded-full text-2xl md:text-3xl shadow-xl transition-all duration-300 relative w-full h-full"      >
        Player Register
      </button>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-10"> </div>

          <div className="fixed inset-0 flex items-center justify-center overflow-auto z-20">
            <div className="bg-[#121212] border border-[#d4af37] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-4 relative max-h-screen overflow-y-auto">
              <button
                onClick={closeModal}
                className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-red-600 transition"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-[#d4af37]">Cricket Player Registration</h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <label htmlFor="name" className="font-bold text-sm text-gray-200 w-1/3">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d4af37] border border-gray-600 bg-[#18181b] text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="hostel" className="font-bold text-sm text-gray-200 w-1/3">
                      Hostel:
                    </label>
                    <select
                      id="hostel"
                      value={hostel}
                      onChange={(e) => setHostel(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d4af37] border border-gray-600 bg-[#18181b] text-white"
                    >
                      <option value="">Select Hostel</option>
                      <option value="Outside Hostel">Outside Hostel</option>
                      <option value="Kaveri">Kaveri</option>
                      <option value="Nandini">Nandini</option>
                      <option value="Shambhavi">Shambhavi</option>
                      <option value="Souparnika">Souparnika</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="year" className="font-bold text-sm text-gray-200 w-1/3">
                      Year:
                    </label>
                    <select
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d4af37] border border-gray-600 text-white bg-[#18181b]"
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="contact" className="font-bold text-sm text-gray-200 w-1/3">
                      Contact Number:
                    </label>
                    <input
                      type="text"
                      id="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d4af37] border border-gray-600 bg-[#18181b] text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="role" className="font-bold text-sm text-gray-200 w-1/3 mr-2">
                      Specialization:
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d4af37] border border-gray-600 bg-[#18181b] text-white"
                    >
                      <option value="">Select Role</option>
                      <option value="Right Hand Batsman">Right Hand Batsman</option>
                      <option value="Left Hand Batsman">Left Hand Batsman</option>
                      <option value="Right Arm Bowler">Right Arm Bowler</option>
                      <option value="Left Arm Bowler">Left Arm Bowler</option>
                      <option value="Wicket Keeper">Wicket Keeper</option>
                      <option value="All-Rounder">All-Rounder</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="profilePic" className="font-bold text-sm text-gray-200 w-1/3">
                      Profile Picture:
                    </label>
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      onChange={onImageChange}
                      className="w-full text-sm text-gray-200
                        file:mr-3 file:py-1.5 file:px-3
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#18181b] file:text-white
                        hover:file:bg-black hover:file:text-white cursor-pointer transition-all border border-gray-600 rounded-md py-1 px-1"
                    />
                  </div>
                </div>

                {isUploading && <p className="text-white">Uploading image...</p>}

                <button
                  type="submit"
                  className="bg-[#82071d] text-zinc-400 px-3 py-1 rounded-md font-bold hover:text-white transition mt-4"
                  disabled={isSubmitting || isUploading}
                >
                  {isSubmitting ? (
                    <ClipLoader size={20} color="#ffffff" />
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {isRegistered && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-10"></div>
          <div className="fixed inset-0 flex items-center justify-center overflow-auto z-20">
            <div className="bg-[#121212] border border-[#d4af37] rounded-lg shadow-lg w-10/12 md:w-1/3 p-8 text-center relative">
              <button
                onClick={() => setIsRegistered(false)}
                className="absolute top-2 right-3 text-2xl font-bold text-gray-200 hover:text-white transition"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
              <p className="text-white mb-4">You have successfully registered for the cricket event.</p>
              <p className="text-white mb-4">Join us for live updates.</p>
              <a
                href="https://chat.whatsapp.com/I1J6PUx8ffs5i3LjF8pYUs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] bg-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-gray-100 transition inline-block mt-2"
              >
                Join  the WhatsApp Group
              </a>
            </div>
          </div>
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} style={{ marginTop: '4rem', zIndex: 9999 }} />
    </div>
  );
};

export default PlayerRegistration;
