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
                    const filteredPlayers = players.filter((p) => p.team === null && (!p.auctionStatus || p.auctionStatus === 'AVAILABLE') && p.year === year);
                    if (filteredPlayers.length) {
                        const player = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
                        setSelectedPlayer(player);
                        setBidAmount(player.basePrice || 200);
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
            const newBid = prev > 100 ? (prev <= 1000 ? prev - 50 : prev - 100) : prev;
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

    const handleMarkUnsold = async () => {
        if (!selectedPlayer) return;
        try {
            const response = await api.post("/bid/unsold", { playerId: selectedPlayer._id });
            if (response.data.success) {
                alert("Player marked as unsold!");
                window.location.reload();
            } else {
                alert("Failed to mark as unsold: " + response.data.message);
            }
        } catch (error) {
            alert("Failed to mark player as unsold.");
        }
    };

    const handleRetrieveUnsold = async () => {
        try {
            const response = await api.post("/bid/retrieve-unsold");
            if (response.data.success) {
                alert(response.data.message);
                window.location.reload();
            } else {
                alert("Failed to retrieve unsold players");
            }
        } catch (error) {
            alert("Error retrieving unsold players.");
        }
    };

    return (
        <div className="p-6 bg-white min-h-screen text-gray-900">
            <h1 className="text-3xl font-bold text-[#d4af37] mb-6 text-center underline">
                Farewell Cup-2025 Bidding
            </h1>
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
                <div className="relative">
                    {/* Button */}
                    <button
                        onClick={selectRandomPlayer}
                        className="bg-[#121212] border border-[#d4af37] text-white px-4 py-2 rounded"
                        disabled={countdown > 0} // Disable button during countdown
                    >
                        Select Random Player
                    </button>

                    {/* Countdown Overlay */}
                    {countdown > 0 && (
                        <div
                            className="fixed inset-0 bg-gradient-to-br from-black/70 to-black/10 backdrop-blur-md flex justify-center items-center z-[100] p-4"
                            onClick={() => setSelectedTeam(null)}
                        >                            <span className="text-[#d4af37] text-9xl font-extrabold animate-pulse text-center">
                                Choosing Random Player in  {countdown}
                            </span>
                        </div>
                    )}
                </div>

                <div className="font-bold text-center mb-2">
                    {countdown > 0 ? `Selecting in ${countdown}...` : "Selected Random Player"}
                </div>

                {selectedPlayer && (
                    <>
                        <div className="bg-gray-100 p-6 rounded mb-4 flex flex-col items-center text-center">
                            <h2 className="text-xl font-bold mb-4 text-[#d4af37] underline">
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
                        className="p-2 w-full text-black rounded border border-[#d4af37]"
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
                        className="p-2 w-full text-black rounded border border-[#d4af37]"
                        value={bidAmount} // Ensuring bid amount updates in the input field
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                    />
                </div>
                <div className="flex justify-center gap-4 text-center mt-4">
                    <button
                        className="bg-[#121212] border border-[#d4af37] text-white px-6 py-2 rounded hover:text-[#d4af37] transition-colors"
                        onClick={handleBid}
                    >
                        Submit Bid
                    </button>
                    <button
                        className="bg-red-900 border border-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                        onClick={handleMarkUnsold}
                    >
                        Mark Unsold
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center mt-8 cursor-pointer">
                <h2 className="text-2xl font-bold text-[#d4af37] underline">
                    Unselected Players:
                </h2>
                {players.some(p => p.auctionStatus === 'UNSOLD') && (
                    <button 
                        className="bg-[#d4af37] text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors"
                        onClick={handleRetrieveUnsold}
                    >
                        Retrieve Unsold Players
                    </button>
                )}
            </div>
            <div>
                {years.map((year) => (
                    <div key={year}>
                        <h2 className="text-xl font-bold mt-4">{year}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                            {players
                                .filter((p) => p.team === null && (!p.auctionStatus || p.auctionStatus === 'AVAILABLE') && p.year === year)
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

            {players.some(p => p.auctionStatus === 'UNSOLD') && (
                <>
                    <h2 className="text-2xl font-bold text-[#d4af37] mt-8 underline">
                        Unsold Players:
                    </h2>
                    <div>
                        {years.map((year) => {
                            const unsoldInYear = players.filter((p) => p.auctionStatus === 'UNSOLD' && p.year === year);
                            if (unsoldInYear.length === 0) return null;
                            return (
                                <div key={year + "-unsold"}>
                                    <h2 className="text-xl font-bold mt-4 text-red-500">{year}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                                        {unsoldInYear.map((player) => (
                                            <div
                                                key={player._id}
                                                className="bg-white shadow-md p-4 rounded-lg border border-red-500"
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
                            );
                        })}
                    </div>
                </>
            )}

        </div>
    );
};

export default BiddingPage;
