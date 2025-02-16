import React, { useState } from 'react';
import axios from 'axios';

const PlayerRegistration = () => {
  const [name, setName] = useState('');
  const [hostel, setHostel] = useState('');
  const [year, setYear] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mni2tbq0'); // Change this

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
        alert('Image upload failed. Please try again.');
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

    try {
      // await axios.post('http://localhost:6001/register', playerData, {
      await axios.post('https://farewell-cup.vercel.app/register', playerData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      alert('Registration Successful!');
      closeModal();
    } catch (error) {
      console.error('Error registering player:', error);
    }
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={openModal}
        className="bg-[#802BB1] text-[#2D283E] font-bold px-4 py-2 rounded-md transition"
      >
        Register
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 z-50 overflow-auto">
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
                    Hostel Name:
                  </label>
                  <input
                    type="text"
                    id="hostel"
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    required
                    className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#2D283E] bg-[#2D283E] text-white"
                  />
                </div>

                <div className="flex items-center">
                  <label htmlFor="year" className="font-bold text-sm text-[#2D283E] w-1/3">
                    Year:
                  </label>
                  <input
                    type="text"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#2D283E] bg-[#2D283E] text-white"
                  />
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
                  <label htmlFor="role" className="font-bold text-sm text-[#2D283E] w-1/3">
                    Role:
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#2D283E] bg-[#2D283E] text-white"
                  >
                    <option value="">Select Role</option>
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
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
                disabled={isUploading}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerRegistration;
