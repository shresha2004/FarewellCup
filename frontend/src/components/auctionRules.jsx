import { forwardRef } from "react";

const AuctionRules = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#2a024b] to-[#4d0576] text-white"
    >
      <div className="max-w-3xl w-full bg-[#802BB1] bg-opacity-90 p-8 rounded-2xl shadow-[0_5px_20px_rgba(255,255,255,0.15)] ring-1 ring-[#7335be] border border-[#ffd1f6]">


        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-6 text-[#fbcfe8] drop-shadow-md">
          Farewell Cup 2025 - Auction Rules
        </h1>

        {/* Rules List */}
        <ul className="list-disc space-y-4 text-lg pl-5">
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Every team must have a non-playing manager and a team captain.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Each team must have a Name, Logo, and Instagram Poster ready before the auction.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Every team will have <span className="font-bold text-[#ff99cc]">10,000 points</span> for the auction.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            There will be two categories of players: <span className="font-bold">Iconic Players</span> and <span className="font-bold">Normal Players</span>.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Base price for an <span className="font-bold text-[#ff99cc]">Iconic Player: 500 points</span>.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Base price for a <span className="font-bold text-[#ff99cc]">Normal Player: 200 points</span>.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Teams must acquire players within the allocated <span className="font-bold text-[#ff99cc]">10,000 points</span>.
          </li>

          {/* Bidding Increments */}
          <li>
            <span className="font-semibold text-[#ff99cc]">Bidding increments:</span>
            <ul className="ml-6 list-disc space-y-2 mt-2">
              <li className="hover:text-[#ff80bf] transition-all duration-300">Up to 1,000 points: bids increase by 50 points.</li>
              <li className="hover:text-[#ff80bf] transition-all duration-300">Beyond 1,000 points: bids increase by 100 points.</li>
            </ul>
          </li>

          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Every team must have <span className="font-bold text-[#ff99cc]">11 players</span>.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            <span className="font-bold text-[#ff99cc]">Unbidding is not permitted</span> once a bid is placed.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Each team can have only <span className="font-bold text-[#ff99cc]">one Iconic Player</span>.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            At any time, only <span className="font-bold text-[#ff99cc]">two teams</span> can bid on a player.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Unsold players will re-enter the auction in the second round.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            During the <span className="font-bold text-[#ff99cc]">Iconic Player auction</span>, only the captain and optionally the manager are allowed.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            During the <span className="font-bold text-[#ff99cc]">Normal Player auction</span>, only the captain, iconic player, and optionally the manager are allowed.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Players are chosen randomly from different year sets.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            A total of <span className="font-bold text-[#ff99cc]">10 Iconic Players</span> are available.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            Unsold Iconic Players move to the Normal Player auction at <span className="font-bold text-[#ff99cc]">500 points</span>.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            <span className="font-bold text-[#ff99cc]">Organizers have the final decision</span> on any confusion or misbehavior.
          </li>
          <li className="hover:text-[#ff80bf] transition-all duration-300">
            <span className="font-bold text-[#ff99cc]">Rules can be altered</span> by the organizers.
          </li>
        </ul>
      </div>
    </div>
  );
});

export default AuctionRules;