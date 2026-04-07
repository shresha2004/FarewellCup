import React, { useState } from "react";

const organizers = [
    { name: "Poornesh Gowda", phone: "+91 70192 98140", photo: "/images/poornesh.jpeg" },
    { name: "Chinmay Hegde", phone: "+91 87922 92107", photo: "/images/chinmay.jpeg" },
    { name: "Puneeth M G", phone: "+91 87488 26608", photo: "/images/puneeth.jpeg" },
    { name: "Jeevan G K", phone: "+91 866 044 6178", photo: "/images/jeevan.jpeg" },
    { name: "Manvendra Sandhu", phone: "+91 84496 98487", photo: "/images/manvendra.jpeg" },
    { name: "Dattu", phone: "+91 63044 46370", photo: "/images/dattu.jpeg" },
];

const Contact = () => {
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);

    const openModal = (organizer) => setSelectedOrganizer(organizer);
    const closeModal = () => setSelectedOrganizer(null);

    return (
        <div className="py-12 px-6 bg-[#09090b] text-white">
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
                            <div className="absolute inset-0 bg-[#18181b] text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 border border-[#450a0a] backface-hidden">
                                <img
                                    src={organizer.photo}
                                    alt={organizer.name}
                                    className="w-36 h-36 rounded-full object-cover border-4 border-[#27272a]"
                                />
                                <h3 className="mt-6 text-lg font-bold">{organizer.name}</h3>
                            </div>
                            {/* Back Side */}
                            <div className="absolute inset-0 bg-[#18181b] text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 rotate-y-180 backface-hidden border border-[#d4af37]">
                                <p className="text-md font-semibold text-gray-300">{organizer.phone}</p>
                                <button className="mt-6 bg-[#dc2626] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#121212] border border-[#d4af37]">
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
                    <div className="relative bg-[#18181b] p-6 sm:p-8 rounded-xl shadow-2xl border border-[#d4af37] neon-glow backdrop-blur-md w-full max-w-sm sm:max-w-md text-center">
                        <button
                            className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                        <img
                            src={selectedOrganizer.photo}
                            alt={selectedOrganizer.name}
                            className="w-28 sm:w-32 h-28 sm:h-32 mx-auto rounded-full object-cover border-4 border-[#450a0a]"
                        />
                        <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-[#f87171]">{selectedOrganizer.name}</h3>
                        <p className="text-gray-300">{selectedOrganizer.phone}</p>

                        {/* Call Button */}
                        <a
                            href={`tel:${selectedOrganizer.phone}`}
                            className="mt-4 sm:mt-5 inline-block bg-[#991b1b] text-white px-4 sm:px-5 py-2 rounded-lg font-semibold shadow-md 
                            hover:bg-[#7f1d1d] transition-all"
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
