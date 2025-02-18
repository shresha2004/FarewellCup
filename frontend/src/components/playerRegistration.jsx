import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationSuccess from './RegistrationSuccess';  // Import the success page

const PlayerRegistration = () => {
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
    formData.append('upload_preset', 'mni2tbq0'); // Ensure this is your correct preset

    setIsUploading(true);
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/drfp8nwqi/image/upload',
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
      await axios.post('http://localhost:6001/register', playerData, {
      // await axios.post('https://farewell-cup.vercel.app/register', playerData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      toast.success('Registration Successful!');
      setIsRegistered(true); // Set registration status to true
    } catch (error) {
      console.error('Error registering player:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) {
    return <RegistrationSuccess />;  // Show the success page after registration
  }

  return (
    <div className="text-center mt-4">
      <button
        onClick={openModal}
        className="bg-[#802BB1] text-[#2D283E] font-bold px-4 py-2 rounded-md transition"
      >
        Register
      </button>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-indigo-500 opacity-25 backdrop-blur-sm z-10"> </div>

          <div className="fixed inset-0 flex items-center justify-center overflow-auto z-20">
            <div className="bg-[#802BB1] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-4 relative max-h-screen overflow-y-auto">
              <button
                onClick={closeModal}
                className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-red-600 transition"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-[#2D283E]">Cricket Player Registration</h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <label htmlFor="name" className="font-bold text-sm text-[#2D283E] w-1/3">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#2D283E] bg-[#2D283E] text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="hostel" className="font-bold text-sm text-[#2D283E] w-1/3">
                      Hostel:
                    </label>
                    <select
                      id="hostel"
                      value={hostel}
                      onChange={(e) => setHostel(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#2D283E] bg-[#2D283E] text-white"
                    >
                      <option value="">Select Hostel</option>
                      <option value="Isha Boys Hostel">Isha Boys Hostel</option>
                      <option value="Kaveri">Kaveri</option>
                      <option value="Nandini">Nandini</option>
                      <option value="NIS Hostel">NIS Hostel</option>
                      <option value="Shambhavi">Shambhavi</option>
                      <option value="Souparnika">Souparnika</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="year" className="font-bold text-sm text-[#2D283E] w-1/3">
                      Year:
                    </label>
                    <select
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-[#2D283E]"
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="contact" className="font-bold text-sm text-[#2D283E] w-1/3">
                      Contact Number:
                    </label>
                    <input
                      type="text"
                      id="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#2D283E] bg-[#2D283E] text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="role" className="font-bold text-sm text-[#2D283E] w-1/3 mr-2">
                      Specialization:
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#2D283E] bg-[#2D283E] text-white"
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
                    <label htmlFor="profilePic" className="font-bold text-sm text-[#2D283E] w-1/3">
                      Profile Picture:
                    </label>
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      onChange={onImageChange}
                      className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#2D283E] bg-[#2D283E] text-white"
                    />
                  </div>
                </div>

                {isUploading && <p className="text-white">Uploading image...</p>}

                <button
                  type="submit"
                  className="bg-[#2D283E] text-zinc-400 px-3 py-1 rounded-md font-bold hover:text-white transition mt-4"
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

      <ToastContainer />
    </div>
  );
};

export default PlayerRegistration;
