import { useState, useEffect, forwardRef } from "react";
import api from "../utils/api"; // Import your Axios instance

const TeamList = forwardRef((props, ref) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [imageToView, setImageToView] = useState(null); // New state to show enlarged image

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const { data } = await api.get("/teams"); // Uses Axios instance
                setTeams(data);
            } catch (err) {
                console.error("Error fetching teams:", err.response?.data || err.message);
                setError("Failed to load teams. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();

        // Close modal on ESC key
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedTeam(null);
                setImageToView(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div ref={ref} className="bg-[#2D283E] min-h-screen p-4">
            <h2 className="text-white text-3xl font-bold text-center mb-6 underline">Teams</h2>

            {loading ? (
                <p className="text-white text-center text-lg">Loading teams...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {teams.map((team) => (
                        <button
                            key={team._id}
                            className="bg-[#802BB1] rounded-lg p-4 shadow-lg text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => setSelectedTeam(team)}
                        >
                            {/* 🟢 Restored Rectangular Logo */}
                            <img src={team.teamLogo} alt={team.teamName} className="w-full h-32 object-contain rounded-md" />

                            <h3 className="text-lg font-semibold mt-2">{team.teamName}</h3>
                            <p className="text-sm">Captain: {team.captainName}</p>
                            <p className="text-sm">Icon Player: {team.iconPlayerName}</p>
                        </button>
                    ))}
                </div>
            )}

            {/* Modal for team details */}
            {selectedTeam && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100] p-4 overflow-y-auto"
                    onClick={() => setSelectedTeam(null)} // Close modal on backdrop click
                >
                    <div 
                        className="bg-[#2D283E] w-full max-w-lg p-6 rounded-lg shadow-lg text-white relative z-[100] text-center max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
                    >
                        <button 
                            className="absolute top-3 right-4 text-white text-2xl font-bold"
                            onClick={() => setSelectedTeam(null)}
                        >
                            &times;
                        </button>

                        {/* 🟢 Restored Rectangular Team Logo */}
                        <img 
                            src={selectedTeam.teamLogo || "/default-team-logo.png"} 
                            alt={selectedTeam.teamName} 
                            className="w-full h-40 object-cover rounded-md mx-auto mb-4"
                        />

                        <h2 className="text-xl font-bold">{selectedTeam.teamName}</h2>
                        <p className="text-sm text-gray-300">Captain: {selectedTeam.captainName}</p>
                        <p className="text-sm text-gray-300">Icon Player: {selectedTeam.iconPlayerName}</p>
                        <p className="text-sm text-gray-300">Captain Contact: {selectedTeam.captainContact}</p>
                        <p className="text-sm text-gray-300">Icon Player Contact: {selectedTeam.iconPlayerContact}</p>
                        <p className="text-sm text-gray-300">Captain Hostel: {selectedTeam.captainHostel}</p>
                        <p className="text-sm text-gray-300">Icon Player Hostel: {selectedTeam.iconPlayerHostel}</p>
                        <p className="text-sm text-gray-300">Captain Year of Study: {selectedTeam.captainYearOfStudy}</p>
                        <p className="text-sm text-gray-300">Icon Player Year of Study: {selectedTeam.iconPlayerYearOfStudy}</p>

                        {/* Player Images Centered */}
                        <div className="flex justify-center items-center gap-8 mt-6">
                            <div className="text-center">
                                <img 
                                    src={selectedTeam.captainImage || "/default-profile.png"} 
                                    alt="Captain" 
                                    className="w-24 h-24 object-cover rounded-full mx-auto cursor-pointer hover:scale-105 transition"
                                    onClick={() => setImageToView(selectedTeam.captainImage)}
                                />
                                <p className="text-sm mt-2 font-semibold">Captain</p>
                            </div>
                            <div className="text-center">
                                <img 
                                    src={selectedTeam.iconPlayerImage || "/default-profile.png"} 
                                    alt="Icon Player" 
                                    className="w-24 h-24 object-cover rounded-full mx-auto cursor-pointer hover:scale-105 transition"
                                    onClick={() => setImageToView(selectedTeam.iconPlayerImage)}
                                />
                                <p className="text-sm mt-2 font-semibold">Icon Player</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Enlarged Image */}
            {imageToView && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100] p-4"
                    onClick={() => setImageToView(null)}
                >
                    <div 
                        className="relative"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
                    >
                        <button 
                            className="absolute top-3 right-4 text-white text-2xl font-bold"
                            onClick={() => setImageToView(null)}
                        >
                            &times;
                        </button>

                        <img 
                            src={imageToView} 
                            alt="Enlarged View" 
                            className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
});

export default TeamList;
