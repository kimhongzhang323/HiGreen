# 🌿 HiGreen - Full Stack Sustainability Ecosystem

<p align="center">
  <img src="assets/icon.png" alt="HiGreen Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Your Personal Sustainability Companion & Smart City Dashboard</strong><br>
  A comprehensive platform empowering citizens to live greener and city administrators to make data-driven decisions.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.81.5-blue?logo=react" alt="React Native">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=nodedotjs" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.18-gray?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/SQLite-3.x-blue?logo=sqlite" alt="SQLite">
  <img src="https://img.shields.io/badge/Expo-54.0-black?logo=expo" alt="Expo">
</p>

---

## 📱 Features

### 👤 User Application
*   **Weekly Impact Tracking**: Visualize carbon footprint via interactive charts.
*   **Gamification**: Earn points, unlock badges ("Eco Starter"), and maintain daily streaks.
*   **Rewards Center**: Premium "Loyalty Card" interface to redeem points for vouchers (Amazon, Grab, Starbucks).
*   **Report Issues**: Submit P0-P2 priority reports for city maintenance (potholes, dumping).
*   **Smart Chatbot**: AI-powered sustainability tips.
*   **Transport Tracker**: Log EV/Public Transport usage.

### 🛡️ Admin Dashboard
*   **Overview Stats**: Real-time metrics on Users, Reports, and CO2 Savings.
*   **Transport Analytics**: Heatmaps and data on EV Toll usage and Ridership (Bus/MRT/LRT).
*   **Content Management**: Manage News and Community Activities.
*   **Advanced Reporting**: Filter reports by Status (Pending/Resolved) and Priority (P0 Critical).
*   **User Management**: View user profiles and engagement metrics.

---

## 🛠️ Tech Stack

### Frontend (User & Admin App)
*   **Framework**: React Native (Expo)
*   **UI Library**: React Native Paper ("Pro" Soft UI Design)
*   **Navigation**: React Navigation (Bottom Tabs, Stacks)
*   **Charts**: React Native Chart Kit
*   **Icons**: Lucide React Native

### Backend (API & Data)
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: SQLite (Local persistent storage)
*   **Security**:
    *   **Bcrypt**: Password hashing
    *   **JWT**: Secure session tokens
    *   **Helmet/RateLimit**: API protection
    *   **Input Validation**: Express-Validator

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   Expo Go app (for mobile testing)

### 1️⃣ Backend Setup (API)
The backend manages the database, authentication, and logic.

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
    > Server runs on `http://localhost:3000`. Database `higreen.db` will be initialized automatically.

### 2️⃣ Frontend Setup (App)
Open a **new terminal** window for the React Native app.

1.  Navigate to the root folder:
    ```bash
    cd ..
    # (Ensure you are in the project root, not inside /backend)
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the app:
    ```bash
    npm start
    ```
4.  Scan the QR code with **Expo Go** (Android/iOS).

---

## 🧪 Testing & QA

We strictly maintain code quality using a dedicated Test Suite.

### Unit Tests
Verify logic for Auth, Reports (Priority), and Rewards (Points).

```bash
# From the root directory:
node tests/auth.test.js
node tests/reports.test.js
node tests/rewards.test.js
```

### Risk Assessment
See `tests/risk_assessment.md` for a detailed breakdown of security architectures and mitigation strategies implemented in this project.

---

## 📂 Project Structure

```
HiGreen/
├── backend/                  # Node.js Server
│   ├── database/             # SQLite DB file & init script
│   ├── middleware/           # Auth & Security middleware
│   ├── routes/               # API Endpoints (Auth, User, Reports...)
│   └── server.js             # Entry Point
├── tests/                    # QA Suite
│   ├── auth.test.js          # Logic tests
│   └── risk_assessment.md    # Security Audit
├── src/                      # React Native App
│   ├── navigation/           # Admin & User Navigators
│   ├── screens/              # All UI Screens
│   ├── context/              # Auth Context
│   └── theme/                # Design System
└── App.js                    # Main Application Entry
```

---

## 📄 License
Private and Proprietary. Made with 💚 by **Kim Hong Zhang**.
