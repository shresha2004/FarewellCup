export default function DateTimings() {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 min-h-[50vh]">
            <h2 className="text-4xl font-bold text-[#d4af37] mb-8 uppercase tracking-widest text-center">Event Schedule</h2>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
                {/* Auction Card */}
                <div className="w-full md:w-1/2 shadow-lg rounded-xl bg-[#121212] border-2 border-[#d4af37] p-8 text-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-4">Player Auction</h3>
                    <p className="text-xl font-medium text-gray-300">
                        🔨 <span className="text-[#d4af37]">18th April 2026</span>
                    </p>
                    <p className="text-md text-gray-500 mt-2 italic">
                        Prepare for the bidding war.
                    </p>
                </div>

                {/* Tournament Card */}
                <div className="w-full md:w-1/2 shadow-lg rounded-xl bg-[#121212] border-2 border-[#d4af37] p-8 text-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-4">The Tournament</h3>
                    <p className="text-xl font-medium text-gray-300">
                        🏆 <span className="text-[#d4af37]">1st May - 4th May 2026</span>
                    </p>
                    <p className="text-md text-gray-500 mt-2 italic">
                        Battle for the cup begins.
                    </p>
                </div>
            </div>
        </div>
    );
}
