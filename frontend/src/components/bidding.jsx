import React, { useState, useEffect } from "react";
import api from "../utils/api";

const BiddingPage = () => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "false") {
        return <div className="text-center text-red-500">Please Login</div>;
    }

    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [bidAmount, setBidAmount] = useState(200);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const years = ["4th Year", "3rd Year", "2nd Year", "1st Year"];

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/players");
                setPlayers(data);
            } catch (err) {
                setError("Failed to load players. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        const fetchTeams = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/teams");
                setTeams(data);
            } catch (err) {
                setError("Failed to load teams. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
        fetchTeams();
    }, []);

    const selectRandomPlayer = () => {
        setCountdown(3); // Start countdown from 3

        let counter = 3;
        const interval = setInterval(() => {
            counter -= 1;
            setCountdown(counter);

            if (counter === 0) {
                clearInterval(interval);

                for (let year of years) {
                    const filteredPlayers = players.filter((p) => p.team === null && p.year === year);
                    if (filteredPlayers.length) {
                        setSelectedPlayer(filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)]);
                        return;
                    }
                }
            }
        }, 1000);
    };


    const increaseBid = () => {
        setBidAmount((prev) => {
            const newBid = prev < 1000 ? prev + 50 : prev + 100 <= 10000 ? prev + 100 : prev;
            return newBid;
        });
    };

    const decreaseBid = () => {
        setBidAmount((prev) => {
            const newBid = prev > 200 ? (prev <= 1000 ? prev - 50 : prev - 100) : prev;
            return newBid;
        });
    };

    const handleBid = async () => {
        if (!selectedPlayer || !selectedTeam || !bidAmount) {
            alert("Please select a player, a team, and enter a bid amount.");
            return;
        }

        try {
            const response = await api.post("/bid", {
                playerId: selectedPlayer._id,
                teamId: selectedTeam,
                bidAmount: bidAmount,
            });

            if (response.data.success) {
                alert("Player assigned to team successfully!");
                window.location.reload();
            } else {
                alert("Bid failed: " + response.data.message);
            }
        } catch (error) {
            alert("Failed to place bid. Please try again.");
        }
    };

    return (
        <div className="p-6 bg-white min-h-screen text-gray-900">
            <h1 className="text-3xl font-bold text-[#802BB1] mb-6 text-center underline">
                Farewell Cup-2025 Bidding
            </h1>
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
                <div className="relative">
                    {/* Button */}
                    <button
                        onClick={selectRandomPlayer}
                        className="bg-[#802BB1] text-white px-4 py-2 rounded"
                        disabled={countdown > 0} // Disable button during countdown
                    >
                        Select Random Player
                    </button>

                    {/* Countdown Overlay */}
                    {countdown > 0 && (
                        <div className="fixed inset-0 flex items-center justify-center bg-indigo-500 bg-opacity-40 backdrop-blur-md z-50 pointer-events-none">
                            <span className="text-white text-9xl font-extrabold">Selecting Player in {countdown}</span>
                        </div>
                    )}
                </div>

                <div className="font-bold text-center mb-2">
                    {countdown > 0 ? `Selecting in ${countdown}...` : "Selected Random Player"}
                </div>

                {selectedPlayer && (
                    <>
                        <div className="bg-gray-100 p-6 rounded mb-4 flex flex-col items-center text-center">
                            <h2 className="text-xl font-bold mb-4 text-[#802BB1] underline">
                                Player on the Block
                            </h2>
                            <img
                                src={selectedPlayer.profilePic}
                                alt={selectedPlayer.name}
                                className="w-40 h-40 rounded-lg object-cover mb-4"
                            />
                            <div>
                                <p className="text-xl font-bold">
                                    Name: {selectedPlayer.name}
                                </p>
                                <p className="text-gray-600 text-xl font-bold">
                                    Specialization: {selectedPlayer.role}
                                </p>
                                <p className="text-gray-500 font-medium text-xl font-bold">
                                    🏠 Hostel: {selectedPlayer.hostel}
                                </p>
                                <p className="text-gray-500 font-medium text-xl font-bold">
                                    Year: {selectedPlayer.year}
                                </p>
                            </div>
                        </div>
                    </>
                )}
                <div className="justify-center text-center">
                    <div className="flex items-center gap-4 justify-center">
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                                decreaseBid();
                            }}
                        >
                            -
                        </button>
                        <p className="text-xl font-bold">{bidAmount}</p>
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                                increaseBid();
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-5">
                    <label htmlFor="teamName" className="whitespace-nowrap font-bold">Team Name:</label>
                    <select
                        className="p-2 w-full text-black rounded border border-[#802BB1]"
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        id="teamName"
                    >
                        <option value="">Select Team</option>
                        {teams.map((team) => (
                            <option key={team._id} value={team._id}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex tems-center space-x-2 mt-5">
                    <label htmlFor="finalPrice" className="whitespace-nowrap font-bold">Final Selling Price:</label>
                    <input
                        type="number"
                        placeholder="Enter Final Price"
                        className="p-2 w-full text-black rounded border border-[#802BB1]"
                        value={bidAmount} // Ensuring bid amount updates in the input field
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                    />
                </div>
                <div className="justify-center text-center">
                    <button
                        className="bg-[#802BB1] text-white px-6 py-2 mt-4 rounded"
                        onClick={handleBid}
                    >
                        Submit Bid
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-[#802BB1] mt-8 underline">
                Unselected Players:
            </h2>
            <div>
                {years.map((year) => (
                    <div key={year}>
                        <h2 className="text-xl font-bold mt-4">{year}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                            {players
                                .filter((p) => p.team === null && p.year === year)
                                .map((player) => (
                                    <div
                                        key={player._id}
                                        className="bg-white shadow-md p-4 rounded-lg border border-gray-300"
                                    >
                                        <img
                                            src={player.profilePic}
                                            alt={player.name}
                                            className="w-20 h-20 rounded-full mx-auto"
                                        />
                                        <p className="text-lg font-bold text-center mt-2">
                                            {player.name}
                                        </p>
                                        <p className="text-gray-600 text-center">{player.role}</p>
                                        <p className="text-gray-500 text-center">{player.year}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default BiddingPage;
