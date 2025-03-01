import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Import your Axios instance

const TeamList = forwardRef((props, ref) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const { data } = await api.get("/teams"); // Fetch teams
                setTeams(data);
            } catch (err) {
                console.error("Error fetching teams:", err.response?.data || err.message);
                setError("Failed to load teams. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div ref={ref} className="min-h-screen p-6 bg-gradient-to-br from-[#2a024b] to-[#1a1b40]">
            <h2 className="text-white text-4xl font-bold text-center mb-8 underline">Teams</h2>

            {loading ? (
                <p className="text-white text-center text-lg">Loading teams...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {teams.map((team) => (
                        <button
                            key={team._id}

                            className="bg-[#802BB1] rounded-lg p-4 shadow-lg text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => navigate(`/teams/${team._id}`)} // Redirect to TeamDetails page
                        >
                            <img src={team.teamLogo} alt={team.teamName} className="w-full h-32 object-contain rounded-md" />
                            <h3 className="text-lg font-semibold mt-2">{team.teamName}</h3>

                            <p className="text-sm">Captain: {team.captainName}</p>
                            <p className="text-sm">Icon Player: {team.iconPlayerName}</p>
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
});

export default TeamList;
