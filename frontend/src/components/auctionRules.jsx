import { forwardRef } from "react";

const  AuctionRules=forwardRef((props,ref) =>{
    return (
      <div 
      ref={ref} className="bg-[#2D283] text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-3xl bg-[#802BB1] p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Farewell Cup 2025 - Auction Rules</h1>
          <ul className="list-disc space-y-3 text-lg">
            <li>Every team must have a non-playing manager and a team captain.</li>
            <li>Each team must have a Name, Logo, and Instagram Poster ready before the auction.</li>
            <li>Every team will have 10,000 points for the auction.</li>
            <li>There will be two categories of players: Iconic Players and Normal Players.</li>
            <li>Base price for an Iconic Player: 500 points.</li>
            <li>Base price for a Normal Player: 200 points.</li>
            <li>Teams must acquire players within the allocated 10,000 points.</li>
            <li>Bidding increments:
              <ul className="ml-5 list-disc">
                <li>Up to 1,000 points: bids increase by 50 points.</li>
                <li>Beyond 1,000 points: bids increase by 100 points.</li>
              </ul>
            </li>
            <li>Every team must have 11 players.</li>
            <li>Unbidding is not permitted once a bid is placed.</li>
            <li>Each team can have only one Iconic Player.</li>
            <li>At any time, only two teams can bid on a player.</li>
            <li>Unsold players will re-enter the auction in the second round.</li>
            <li>During the Iconic Player auction, only the captain and optionally the manager are allowed.</li>
            <li>During the normal player auction, only the captain, iconic player, and optionally the manager are allowed.</li>
            <li>Players are chosen randomly from different year sets.</li>
            <li>A total of 10 Iconic Players are available.</li>
            <li>Unsold Iconic Players move to the Normal Player auction at 500 points.</li>
            <li>Organizers have the final decision on any confusion or misbehavior.</li>
            <li>Rules can be altered by the organizers.</li>
          </ul>
        </div>
      </div>
    );
  });
  export default AuctionRules;