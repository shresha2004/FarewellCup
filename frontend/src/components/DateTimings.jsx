export default function DateTimings() {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-100">
            <h2 className="text-4xl font-bold text-[#802BB1] mb-6">Date & Timings</h2>

            <div className="w-full max-w-2xl shadow-lg rounded-lg bg-white p-6 text-center">
                <p className="text-2xl font-semibold text-gray-800">
                    📅 <span className="text-[#802BB1]">March 2, 2025</span>
                </p>
                <p className="text-xl text-gray-600 mt-2">
                    🕒 Starts at <span className="font-semibold text-[#802BB1]">3:00 PM</span>
                </p>
            </div>
        </div>
    );
}
