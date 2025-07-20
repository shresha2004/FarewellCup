# 🏆 Farewell Cup

Welcome to **FarewellCup** – a lightweight web app to organize a friendly farewell tournament featuring **team registration**, **player registration**, and **auction-style bidding** of players.

## 📌 Features

- **Team Registration**  
  - Create teams with unique names  
  - Manage team info (captain, logo, etc.)

- **Player Registration**  
  - Register players with details (name, skill level, team preference)  
  - Admin interface to view, edit, or approve players

- **Player Bidding System**  
  - Teams participate in live bids to acquire registered players  
  - Configurable starting bid, time limits, and auction rules  
  - Automatic updating of team rosters and budget tracking

## 🗂️ Repository Structure

FarewellCup/
├── client/ # Frontend (e.g., React)

├── server/ # Backend (e.g., Node.js + Express)

│ ├── controllers/ # API & business logic

│ ├── models/ # Database schemas (MongoDB or SQL)

│ └── routes/ # API endpoints for teams, players, bidding

├── scripts/ # Utilities, data seeding, cron jobs, etc.

├── .env # Environment variables (e.g., DB_URI, JWT_SECRET)

├── package.json # Backend dependencies & scripts

├── client/package.json # Frontend dependencies & scripts

└── README.md # You're looking at it!

## ⚙️ Tech Stack

- **Frontend:** React + Context or Redux  
- **Backend:** Node.js / Express  
- **Database:** MongoDB (via Mongoose)  
- **Real-time/Auctions:** Socket.io  
- **Styling/UI:** Tailwind CSS or Bootstrap

## 🚀 Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/shresha2004/FarewellCup.git
   cd FarewellCup
2. Backend setup:
   cd server
npm install
cp .env.example .env
# Provide DB_URI, JWT_SECRET, AUCTION_SETTINGS...

npm run dev

3. Frontend setup:
    cd ../client
    npm install
    npm start
4. Getting Started:

    Register players (via a form or admin dashboard).
<img width="1622" height="636" alt="Screenshot 2025-02-18 125155" src="https://github.com/user-attachments/assets/466dc4a8-3d2c-4546-8c2f-4b55ba1c9851" />

5. Registered teams:
   <img width="1900" height="847" alt="Screenshot 2025-03-08 214046" src="https://github.com/user-attachments/assets/5e741db8-9066-4085-9c2d-3b5e1506fa95" />
   
6. Registered Players:
   <img width="1895" height="907" alt="Screenshot 2025-03-08 214423" src="https://github.com/user-attachments/assets/fc8c841d-2673-4e4f-9729-0df5ab9cbe52" />
   
7. Start a bidding session:
   <img width="1847" height="923" alt="Screenshot 2025-02-21 125001" src="https://github.com/user-attachments/assets/4d1009c6-f728-4728-a257-645b3710d701" />
   
8. Players bidded to team:
    <img width="1894" height="908" alt="Screenshot 2025-03-08 214313" src="https://github.com/user-attachments/assets/ac7196ea-eca9-4dd3-b39c-3e1533c49c8b" />
    
9. Organizers login:
    <img width="1900" height="913" alt="Screenshot 2025-03-08 214803" src="https://github.com/user-attachments/assets/874a35be-fdea-4938-b048-62e943183af4" />
    
10. Rules:
    <img width="1894" height="895" alt="Screenshot 2025-03-08 214552" src="https://github.com/user-attachments/assets/c5102b33-cef3-428e-9524-065016c3bac4" />
    
11. Venue:
    <img width="1897" height="900" alt="Screenshot 2025-03-08 214634" src="https://github.com/user-attachments/assets/fc587a8c-7997-4dd1-9ab0-68491b273af0" />

    
