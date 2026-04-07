import { useState, useEffect, forwardRef } from "react";
import api from "../utils/api"; // Import the Axios instance

const PlayerList = forwardRef((props, ref) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fallbackImage = "https://res.cloudinary.com/dtyu88isr/image/upload/v1760509271/lwi3ea6qllcwuyokhlwx.png"; // Put your default image in public/images


    const [selectedImage, setSelectedImage] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const { data } = await api.get("/players"); // Uses Axios instance
                setPlayers(data);
            } catch (err) {
                console.error("Error fetching players:", err.response?.data || err.message);
                setError("Failed to load players. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    return (
        <div className=" min-h-screen p-4" ref={ref}>
            <h2 className="text-white text-3xl font-bold text-center mb-6 underline">
                Players Registered
            </h2>

            {loading ? (
                <p className="text-white text-center text-lg">Loading players...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {players.slice(0, visibleCount).map((player) => (
                            <div 
                                key={player._id} 
                                className="bg-[#121212] border border-[#d4af37] rounded-lg p-4 shadow-lg text-white cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setSelectedImage(player.profilePic || fallbackImage)}
                            >
                                <img 
                                    src={player.profilePic} 
                                    alt={player.name} 
                                    className="w-full h-40 object-cover rounded-md" 
                                    onError={(e) => e.target.src = fallbackImage}
                                    loading="lazy" 
                                />
                                <h3 className="text-lg font-semibold mt-2">{player.name}</h3>
                                <p className="text-sm">Role: {player.role}</p>
                                <p className="text-sm">Year: {player.year}</p>
                                <p className="text-sm">Hostel: {player.hostel}</p>
                            </div>
                        ))}
                    </div>

                    {visibleCount < players.length && (
                        <div className="flex justify-center mt-8">
                            <button 
                                onClick={() => setVisibleCount(prev => prev + 12)}
                                className="bg-[#121212] border border-[#d4af37] text-[#d4af37] px-6 py-2 rounded-full font-bold hover:bg-[#d4af37] hover:text-[#121212] transition-colors"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Fullscreen Image Overlay */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <img 
                        src={selectedImage} 
                        alt="Fullscreen Profile" 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    />
                    <button 
                        className="absolute top-4 right-6 text-white text-4xl font-bold hover:text-gray-300 drop-shadow-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
});

export default PlayerList;
