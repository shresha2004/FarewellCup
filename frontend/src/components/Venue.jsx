export default function Venue() {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-100">
            <h2 className="text-4xl font-bold text-[#802BB1] mb-6">Venue</h2>

            <div className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
                <img
                    src="/images/kavery.jpg"
                    alt="Venue"
                    className="w-full h-[500px] object-cover"
                />
                <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 text-center">
                        Hall above Kavery Hostel
                    </h3>
                </div>
            </div>
        </div>
    );
}
