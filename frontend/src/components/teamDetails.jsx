import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const TeamDetails = () => {
    const { teamId } = useParams(); // Get team ID from URL
    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teamError, setTeamError] = useState(null);
    const [playerError, setPlayerError] = useState(null);

    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const { data } = await api.get(`/teams/${teamId}`);
                setTeam(data);
            } catch (err) {
                console.error("Error fetching team details:", err.response?.data || err.message);
                setTeamError("Failed to load team details. Please try again later.");
            }

            try {
                const { data } = await api.get(`/players/${teamId}`); // Fetch players in this team
                setPlayers(data);
            } catch (err) {
                console.error("Error fetching player details:", err.response?.data || err.message);
                setPlayerError("No players found for this team.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeamDetails();
    }, [teamId]);

    if (loading) return <p className="text-white text-center text-lg">Loading team details...</p>;

    return (
        <div className="bg-[#2D283E] min-h-screen p-4">
            {/* Team Details */}
            {teamError ? (
                <p className="text-red-500 text-center">{teamError}</p>
            ) : (
                <div className="max-w-4xl mx-auto bg-[#3E3451] p-6 rounded-lg shadow-lg text-white text-center">
                    <img src={team.teamLogo} alt={team.teamName} className="w-40 h-40 object-contain mx-auto rounded-md" />
                    <h2 className="text-2xl font-bold mt-4">{team.teamName}</h2>

                    {/* Captain & Icon Player Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Captain Card */}
                        <div className="bg-[#803BB1] rounded-lg p-4 shadow-lg text-white text-center">
                            <img src={team.captainImage} alt={team.captainName} className="w-24 h-24 object-cover rounded-full mx-auto" />
                            <h3 className="text-xl font-semibold mt-2">Captain</h3>
                            <h4 className="text-lg">{team.captainName}</h4>
                            <p className="text-sm">{team.captainContact}</p>
                            <p className="text-sm">Hostel: {team.captainHostel}</p>
                            <p className="text-sm">Year of Study: {team.captainYearOfStudy}</p>
                        </div>

                        {/* Icon Player Card */}
                        <div className="bg-[#803BB1] rounded-lg p-4 shadow-lg text-white text-center">
                            <img src={team.iconPlayerImage} alt={team.iconPlayerName} className="w-24 h-24 object-cover rounded-full mx-auto" />
                            <h3 className="text-xl font-semibold mt-2">Icon Player</h3>
                            <h4 className="text-lg">{team.iconPlayerName}</h4>
                            <p className="text-sm">{team.iconPlayerContact}</p>
                            <p className="text-sm">Hostel: {team.iconPlayerHostel}</p>
                            <p className="text-sm">Year of Study: {team.iconPlayerYearOfStudy}</p>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg border border-[#803BB1] text-white text-center justify-center mt-3">Remaining Points:{team.totalAmount}</div>

                </div>
            )}

            {/* Players Section */}
            <h3 className="text-white text-xl font-bold text-center mt-8 underline">Players</h3>
            {playerError ? (
                <p className="text-red-500 text-center">{playerError}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {players.map((player) => (
                        <div key={player._id} className="bg-[#803BB1] rounded-lg p-4 shadow-lg text-white text-center">
                            <img src={player.profilePic} alt={player.name} className="w-24 h-24 object-cover rounded-full mx-auto" />
                            <h4 className="text-lg font-semibold mt-2">{player.name}</h4>
                            <p className="text-sm">{player.role}</p>
                            <p className="text-sm">{player.contact}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamDetails;
