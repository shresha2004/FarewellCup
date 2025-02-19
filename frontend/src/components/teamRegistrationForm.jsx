import { useState } from "react";
import api from "../utils/api";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drfp8nwqi/image/upload";
const CLOUDINARY_PRESET = "mni2tbq0"; // Replace with your Cloudinary preset

const TeamRegistrationForm = () => {
    const [formData, setFormData] = useState({
        teamName: "",
        captainName: "",
        captainContact: "",
        iconPlayerName: "",
        iconPlayerContact: "",
        captainHostel: "",
        iconPlayerHostel: "",
        captainYearOfStudy: "",
        iconPlayerYearOfStudy: "",
    });

    const [teamLogo, setTeamLogo] = useState(null);
    const [captainImage, setCaptainImage] = useState(null);
    const [iconPlayerImage, setIconPlayerImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistered, setIsRegistered] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(true);



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [errors, setErrors] = useState({});

    const hostelOptions = [
        "Isha Boys Hostel",
        "NIS Hostel",
        "Souparnika",
        "Nandini",
        "Shambhavi",
        "Kaveri",
    ];
    const yearOptions = ["1st", "2nd", "3rd", "4th"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, setImage) => {
        setImage(e.target.files[0]);
    };

    const validateForm = () => {
        let errors = {};

        if (!formData.teamName) errors.teamName = "Team Name is required.";
        if (!formData.captainName) errors.captainName = "Captain Name is required.";
        if (!formData.iconPlayerName)
            errors.iconPlayerName = "Icon Player Name is required.";

        if (!formData.captainContact.match(/^\d{10}$/))
            errors.captainContact = "Enter a valid 10-digit contact number.";

        if (!formData.iconPlayerContact.match(/^\d{10}$/))
            errors.iconPlayerContact = "Enter a valid 10-digit contact number.";

        if (!formData.captainHostel) errors.captainHostel = "Select a hostel.";
        if (!formData.iconPlayerHostel) errors.iconPlayerHostel = "Select a hostel.";

        if (!formData.captainYearOfStudy)
            errors.captainYearOfStudy = "Select a year of study.";
        if (!formData.iconPlayerYearOfStudy)
            errors.iconPlayerYearOfStudy = "Select a year of study.";

        if (!teamLogo) errors.teamLogo = "Upload a team logo.";
        if (!captainImage) errors.captainImage = "Upload Captain's Profile Pic.";
        if (!iconPlayerImage)
            errors.iconPlayerImage = "Upload Icon Player's Profile Pic.";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const uploadImage = async (imageFile) => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", CLOUDINARY_PRESET);

        setIsUploading(true);
        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            setIsUploading(false);
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            setIsUploading(false);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const teamLogoUrl = await uploadImage(teamLogo);
        const captainImageUrl = await uploadImage(captainImage);
        const iconPlayerImageUrl = await uploadImage(iconPlayerImage);

        const dataToSend = {
            ...formData,
            teamLogo: teamLogoUrl,
            captainImage: captainImageUrl,
            iconPlayerImage: iconPlayerImageUrl,
        };


        setIsSubmitting(true);
        try {
            await api.post("/teams/register", dataToSend);
            alert("Team Registered Successfully!");
            closeModal(); // Close the form
        } catch (error) {
            console.error("Error registering team:", error);
        } finally {
            setIsSubmitting(false); // Ensure this runs whether success or failure
        }
    };

    return (isModalOpen && (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-xl">
           

            <h2 className="text-3xl font-bold text-[#2D283E] mb-6 text-center">
                Team Registration
            </h2>
          
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Text Inputs */}
                {[
                    { label: "Team Name", name: "teamName" },
                    { label: "Captain Name", name: "captainName" },
                    { label: "Captain Contact", name: "captainContact", type: "tel" },
                    { label: "Icon Player Name", name: "iconPlayerName" },
                    { label: "Icon Player Contact", name: "iconPlayerContact", type: "tel" },
                ].map(({ label, name, type = "text" }) => (
                    <div key={name}>
                        <label className="text-[#2D283E] font-medium">{label}:</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#802BB1] focus:border-[#802BB1]"
                            required
                        />
                        {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                    </div>
                ))}

                {/* Dropdowns */}
                {[
                    { label: "Captain's Hostel", name: "captainHostel" },
                    { label: "Icon Player's Hostel", name: "iconPlayerHostel" },
                    { label: "Captain's Year of Study", name: "captainYearOfStudy" },
                    { label: "Icon Player's Year of Study", name: "iconPlayerYearOfStudy" },
                ].map(({ label, name }) => (
                    <div key={name}>
                        <label className="text-[#2D283E] font-medium">{label}:</label>
                        <select
                            name={name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#802BB1] focus:border-[#802BB1]"
                            required
                        >
                            <option value="">Select {label}</option>
                            {(name.includes("Hostel") ? hostelOptions : yearOptions).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                    </div>
                ))}

                {/* File Uploads */}
                {[
                    { label: "Team Logo", setImage: setTeamLogo },
                    { label: "Captain's Profile Picture", setImage: setCaptainImage },
                    { label: "Icon Player's Profile Picture", setImage: setIconPlayerImage },
                ].map(({ label, setImage }) => (
                    <div key={label}>
                        <label className="text-[#2D283E] font-medium">{label}:</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage)} required />
                    </div>
                ))}
                {isUploading && <p className="text-black">Uploading image...</p>}

                <button
                    disabled={isSubmitting || isUploading}
                    className="w-full bg-[#802BB1] text-white py-2 rounded-lg hover:bg-[#2D283E] transition">
                    {isSubmitting ? (
                        <ClipLoader size={20} color="#ffffff" />
                    ) : (
                        'Submit'
                    )}
                </button>
            </form>
        </div>)
    );
};

export default TeamRegistrationForm;
