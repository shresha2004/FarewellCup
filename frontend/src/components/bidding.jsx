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
    const [fullscreenImage, setFullscreenImage] = useState(null);
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
        <div className="p-6 bg-[#121212] min-h-screen text-gray-100">
            <h1 className="text-4xl font-bold text-[#d4af37] mb-8 text-center uppercase tracking-wider">
                Farewell Cup-2026 Bidding
            </h1>
            
            <div className="mb-8">
                <div className="flex flex-col items-center justify-center">
                    {/* Button */}
                    <button
                        onClick={selectRandomPlayer}
                        className="bg-[#1a1a1a] border-2 border-[#d4af37] text-[#d4af37] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#d4af37] hover:text-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-50 cursor-pointer"
                        disabled={countdown > 0} 
                    >
                        {countdown > 0 ? `Selecting in ${countdown}...` : "Select Random Player"}
                    </button>

                    {/* Countdown Overlay */}
                    {countdown > 0 && (
                        <div
                            className="fixed inset-0 bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-md flex justify-center items-center z-[100] p-4"
                            onClick={() => setSelectedTeam(null)}
                        >                            
                            <span className="text-[#d4af37] text-9xl font-extrabold animate-pulse text-center drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">
                                {countdown === 3 ? "3" : countdown === 2 ? "2" : "1"}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {selectedPlayer && (
                <div className="bg-[#1a1a1a] shadow-2xl p-8 rounded-2xl border border-gray-800 mb-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* LEFT SIDE: Player details */}
                        <div className="w-full lg:w-1/2 bg-[#242424] p-8 rounded-xl ring-1 ring-gray-700 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                            <h2 className="text-2xl font-bold mb-6 text-[#d4af37] uppercase tracking-widest">
                                Player on the Block
                            </h2>
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-[#d4af37] rounded-lg blur opacity-20"></div>
                                <img
                                    src={selectedPlayer.profilePic}
                                    alt={selectedPlayer.name}
                                    className="relative w-64 h-64 rounded-lg object-cover shadow-2xl border-2 border-gray-600 cursor-pointer hover:scale-105 transition-transform"
                                    onClick={() => setFullscreenImage(selectedPlayer.profilePic)}
                                />
                            </div>
                            <div className="space-y-3 w-full">
                                <p className="text-3xl font-extrabold text-white">
                                    {selectedPlayer.name}
                                </p>
                                <div className="w-full h-px bg-gray-700 my-4"></div>
                                <p className="text-gray-400 text-xl font-semibold flex justify-between px-4">
                                    <span>Role:</span> <span className="text-[#d4af37]">{selectedPlayer.role}</span>
                                </p>
                                <p className="text-gray-400 text-xl font-semibold flex justify-between px-4">
                                    <span>Hostel:</span> <span className="text-white">{selectedPlayer.hostel}</span>
                                </p>
                                <p className="text-gray-400 text-xl font-semibold flex justify-between px-4">
                                    <span>Year:</span> <span className="text-white">{selectedPlayer.year}</span>
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Bidding controls */}
                        <div className="w-full lg:w-1/2 bg-[#242424] p-8 rounded-xl ring-1 ring-gray-700 flex flex-col justify-between">
                            <div className="flex flex-col items-center mb-10 mt-4">
                                <h3 className="text-gray-400 uppercase tracking-widest mb-6 font-bold">Current Bid</h3>
                                <div className="flex items-center gap-8 justify-center bg-[#1a1a1a] py-6 px-10 rounded-2xl border border-gray-800 shadow-inner w-full">
                                    <button
                                        className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white h-16 w-16 rounded-full text-4xl font-light transition-all flex items-center justify-center border border-red-600/30 cursor-pointer"
                                        onClick={decreaseBid}
                                    >
                                        -
                                    </button>
                                    <p className="text-7xl font-black text-[#d4af37] w-48 text-center tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                                        {bidAmount}
                                    </p>
                                    <button
                                        className="bg-green-600/20 text-green-500 hover:bg-green-600 hover:text-white h-16 w-16 rounded-full text-4xl font-light transition-all flex items-center justify-center border border-green-600/30 cursor-pointer"
                                        onClick={increaseBid}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6 mb-10 w-full max-w-md mx-auto">
                                <div className="flex flex-col">
                                    <label htmlFor="teamName" className="font-semibold text-gray-400 mb-2 uppercase text-sm tracking-wider">Assign Team</label>
                                    <select
                                        className="p-4 w-full bg-[#1a1a1a] text-white rounded-lg border border-gray-700 focus:outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
                                        onChange={(e) => setSelectedTeam(e.target.value)}
                                        id="teamName"
                                    >
                                        <option value="">-- Choose a Team --</option>
                                        {teams.map((team) => (
                                            <option key={team._id} value={team._id}>
                                                {team.teamName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="flex flex-col">
                                    <label htmlFor="finalPrice" className="font-semibold text-gray-400 mb-2 uppercase text-sm tracking-wider">Final Price Override</label>
                                    <input
                                        type="number"
                                        placeholder="Enter Final Price"
                                        className="p-4 w-full bg-[#1a1a1a] text-white rounded-lg border border-gray-700 focus:outline-none focus:border-[#d4af37] transition-colors font-bold text-lg"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 w-full max-w-md mx-auto">
                                <button
                                    className="flex-[2] bg-[#d4af37] text-black px-6 py-4 rounded-xl font-extrabold text-lg hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer"
                                    onClick={handleBid}
                                >
                                    SUBMIT BID
                                </button>
                                <button
                                    className="flex-1 bg-red-950 border border-red-800 text-red-500 px-6 py-4 rounded-xl font-bold hover:bg-red-900 hover:text-white transition-colors cursor-pointer"
                                    onClick={handleMarkUnsold}
                                >
                                    UNSOLD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-16">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-wider">
                        Available Players <span className="text-[#d4af37]">Pool</span>
                    </h2>
                    {players.some(p => p.auctionStatus === 'UNSOLD') && (
                        <button 
                            className="mt-4 md:mt-0 bg-[#242424] border border-[#d4af37] text-[#d4af37] px-6 py-2 rounded-lg font-bold hover:bg-[#d4af37] hover:text-black transition-all shadow-[0_0_10px_rgba(212,175,55,0.1)] cursor-pointer"
                            onClick={handleRetrieveUnsold}
                        >
                            Retrieve Unsold Players
                        </button>
                    )}
                </div>
                
                <div className="space-y-12">
                    {years.map((year) => {
                        const yearPlayers = players.filter((p) => p.team === null && (!p.auctionStatus || p.auctionStatus === 'AVAILABLE') && p.year === year);
                        if (yearPlayers.length === 0) return null;
                        
                        return (
                            <div key={year} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg">
                                <h3 className="text-2xl font-bold mb-6 text-gray-300 border-l-4 border-[#d4af37] pl-4">{year}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                    {yearPlayers.map((player) => (
                                        <div
                                            key={player._id}
                                            className="bg-[#242424] p-4 rounded-lg border border-gray-700 hover:border-[#d4af37] transition-colors group"
                                        >
                                            <div className="relative w-24 h-24 mx-auto mb-4">
                                                <div className="absolute inset-0 bg-[#d4af37] rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                                <img
                                                    src={player.profilePic}
                                                    alt={player.name}
                                                    className="relative w-full h-full object-cover rounded-full border-2 border-gray-600 group-hover:border-[#d4af37] transition-all cursor-pointer hover:scale-110"
                                                    onClick={() => setFullscreenImage(player.profilePic)}
                                                />
                                            </div>
                                            <p className="text-white font-bold text-center truncate" title={player.name}>
                                                {player.name}
                                            </p>
                                            <p className="text-[#d4af37] text-sm text-center mt-1">{player.role}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {players.some(p => p.auctionStatus === 'UNSOLD') && (
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-red-500 uppercase tracking-wider mb-8 border-b border-red-900/50 pb-4">
                        Unsold Players
                    </h2>
                    <div className="space-y-8">
                        {years.map((year) => {
                            const unsoldInYear = players.filter((p) => p.auctionStatus === 'UNSOLD' && p.year === year);
                            if (unsoldInYear.length === 0) return null;
                            return (
                                <div key={year + "-unsold"} className="bg-red-950/20 p-6 rounded-xl border border-red-900/30">
                                    <h3 className="text-xl font-bold mb-6 text-red-400 border-l-4 border-red-500 pl-4">{year}</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                        {unsoldInYear.map((player) => (
                                            <div
                                                key={player._id}
                                                className="bg-[#1a1a1a] p-4 rounded-lg border border-red-900/50 opacity-80"
                                            >
                                                <img
                                                    src={player.profilePic}
                                                    alt={player.name}
                                                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover grayscale cursor-pointer hover:grayscale-0 hover:scale-110 transition-all"
                                                    onClick={() => setFullscreenImage(player.profilePic)}
                                                />
                                                <p className="text-gray-300 font-semibold text-center text-sm truncate" title={player.name}>
                                                    {player.name}
                                                </p>
                                                <p className="text-red-400 text-xs text-center mt-1">{player.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Fullscreen Image Overlay */}
            {fullscreenImage && (
                <div 
                    className="fixed inset-0 bg-black/95 z-[9999] flex justify-center items-center p-4 cursor-pointer"
                    onClick={() => setFullscreenImage(null)}
                >
                    <button 
                        className="absolute top-6 right-8 text-white text-5xl font-light hover:text-[#d4af37] transition-colors"
                        onClick={(e) => { e.stopPropagation(); setFullscreenImage(null); }}
                    >
                        &times;
                    </button>
                    <img 
                        src={fullscreenImage} 
                        alt="Fullscreen Profile" 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default BiddingPage;
