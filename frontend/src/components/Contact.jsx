import React, { useState } from "react";

const organizers = [
    { name: "Amogh Moger", phone: "+91 97407 39170", photo: "/images/amogh.jpg" },
    { name: "Darshan Kharvi", phone: "+91 63631 67113", photo: "/images/darshan.jpg" },
    { name: "Hemant Raja", phone: "+91 63012 58841", photo: "/images/rama.jpg" },
    { name: "Shresha Acharya", phone: "+91 96063 38467", photo: "/images/shresha.jpg" },
    { name: "Sandesh Moger", phone: "+91 86604 10758", photo: "/images/sandesh.jpg" },
    { name: "Pranav Ganiga", phone: "+91 98446 35830", photo: "/images/pranav.jpg" },
    { name: "Santosh Sullad", phone: "+91 82170 51490", photo: "/images/santosh.jpg" },
    { name: "Ashutosh Thaware", phone: "+91 90198 11039", photo: "/images/ashutosh.jpg" },
    { name: "Ashith Kotian", phone: "+91 91086 93807", photo: "/images/ashith.jpg" },
    { name: "Vinay Chandra", phone: "+91 98452 45659", photo: "/images/vinay.jpg" },
    { name: "Shayan Kumar", phone: "+91 91089 07587", photo: "/images/shayan.jpg" },
    { name: "Kushal Surya", phone: "+91 86180 68676", photo: "/images/kushal.jpg" },
    { name: "Prathamesh Patil", phone: "+91 63667 49679", photo: "/images/prathamesh.jpg" },
    { name: "Gagan M S", phone: "+91 90367 85105", photo: "/images/gagan.jpg" },
    { name: "Ramesh", phone: "+91 81979 34943", photo: "/images/ramesh.jpg" },
    { name: "Chandu Naik", phone: "+91 74832 05278", photo: "/images/chandu.jpg" }
];

const Contact = () => {
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);

    const openModal = (organizer) => setSelectedOrganizer(organizer);
    const closeModal = () => setSelectedOrganizer(null);

    return (
        <div className="py-12 px-6 bg-[#2a024b] text-white">
            <h2 className="text-4xl font-bold text-center neon-text mb-10">⚡ Meet the Organizers ⚡</h2>

            {/* Responsive Organizer Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {organizers.map((organizer, index) => (
                    <div
                        key={index}
                        className="relative max-w-xs sm:max-w-sm md:max-w-md w-74 h-72 mx-auto cursor-pointer group perspective"
                        onClick={() => openModal(organizer)}
                    >
                        <div className="relative w-full h-full transition-transform duration-500 flip-card preserve-3d">
                            {/* Front Side */}
                            <div className="absolute inset-0 bg-[#181616] text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 border border-[#280f62] backface-hidden">
                                <img
                                    src={organizer.photo}
                                    alt={organizer.name}
                                    className="w-36 h-36 rounded-full object-cover border-4 border-[#17141e]"
                                />
                                <h3 className="mt-6 text-lg font-bold">{organizer.name}</h3>
                            </div>
                            {/* Back Side */}
                            <div className="absolute inset-0 bg-[#1c012c] text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 rotate-y-180 backface-hidden border border-[#ff0080]">
                                <p className="text-md font-semibold text-gray-300">{organizer.phone}</p>
                                <button className="mt-6 bg-[#ab0b5b] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#b4576c]">
                                    Call Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedOrganizer && (
                <div className="fixed inset-0 backdrop-blur-xl flex justify-center items-center z-50 px-4">
                    <div className="relative bg-[#11001c] p-6 sm:p-8 rounded-xl shadow-2xl border border-[#ff0080] neon-glow backdrop-blur-md w-full max-w-sm sm:max-w-md text-center">
                        <button
                            className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                        <img
                            src={selectedOrganizer.photo}
                            alt={selectedOrganizer.name}
                            className="w-28 sm:w-32 h-28 sm:h-32 mx-auto rounded-full object-cover border-4 border-[#210632]"
                        />
                        <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-[#ff4da6]">{selectedOrganizer.name}</h3>
                        <p className="text-gray-300">{selectedOrganizer.phone}</p>

                        {/* Call Button */}
                        <a
                            href={`tel:${selectedOrganizer.phone}`}
                            className="mt-4 sm:mt-5 inline-block bg-[#906e7f] text-white px-4 sm:px-5 py-2 rounded-lg font-semibold shadow-md 
                            hover:bg-[#7c467c] transition-all"
                        >
                            📞 Call Organizer
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
