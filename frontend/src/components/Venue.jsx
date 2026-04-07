export default function Venue() {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 min-h-[50vh]">
            <h2 className="text-4xl font-bold text-[#d4af37] mb-8 uppercase tracking-widest text-center">Tournament Venue</h2>

            <div className="w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden bg-[#121212] border-2 border-[#d4af37] transition-transform duration-300 hover:scale-105">
                <img
                    src="/images/Ground Image.jpeg"
                    alt="Venue"
                    className="w-full h-[500px] object-cover"
                    loading="lazy"
                />
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-white text-center">
                        NMIT Ground
                    </h3>
                    <p className="text-md text-[#d4af37] text-center mt-2 italic">
                        The battleground awaits.
                    </p>
                </div>
            </div>
        </div>
    );
}
