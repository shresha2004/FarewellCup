import React, { useState } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const PlayerRegistration = () => {
  const [name, setName] = useState('');
  const [hostel, setHostel] = useState('');
  const [year, setYear] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState('');

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    if (typeof cropper !== 'undefined') {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playerData = {
      name,
      hostel,
      year,
      contact,
      description,
      profilePic: croppedImage
    };

    try {
      await axios.post('https://your-backend-url.com/register-player', playerData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      alert('Registration Successful!');
    } catch (error) {
      console.error('Error registering player:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cricket Player Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="form-control mb-2" />
        <input type="text" placeholder="Hostel Name" value={hostel} onChange={(e) => setHostel(e.target.value)} required className="form-control mb-2" />
        <input type="text" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required className="form-control mb-2" />
        <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required className="form-control mb-2" />
        <textarea placeholder="Description (20 words)" value={description} onChange={(e) => setDescription(e.target.value)} required className="form-control mb-2" />

        <input type="file" accept="image/*" onChange={onImageChange} className="form-control mb-2" />
        {image && (
          <div>
            <Cropper
              src={image}
              style={{ height: 300, width: '100%' }}
              aspectRatio={1}
              guides={false}
              crop={handleCrop}
            />
            <button type="button" onClick={handleCrop} className="btn btn-primary mt-2">
              Crop Image
            </button>
          </div>
        )}
        <button type="submit" className="btn btn-success mt-2">Register</button>
      </form>
    </div>
  );
};

export default PlayerRegistration;
