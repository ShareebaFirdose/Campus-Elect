# College Voting System

## Overview
The College Voting System is a comprehensive platform designed to streamline the election process in colleges, ensuring a secure and user-friendly experience for both students and administrators. The system is structured around six key modules, each playing a vital role in managing and conducting fair and transparent elections.

## Features
1. **User Module**
   - Student registration and account management.
   - Administrator tools for managing student records and approving candidate registrations.

2. **Election Module**
   - Setup and configuration of elections, including candidate registration, voting dates, and rules.
   - Ensures compliance with institutional policies for smooth election management.

3. **Voting Module**
   - Secure platform for students to cast their votes.
   - Ensures one vote per student, maintains confidentiality, and validates votes in real-time.
   - Prevents fraud and errors during the voting process.

4. **Results Module**
   - Automated vote tallying and result generation.
   - Provides accurate, transparent, and timely announcement of results.

5. **Profile Module**
   - Personal information management for users.
   - Tracks voting history and allows preference updates.
   - Administrators can access user statistics and manage their profiles.

6. **Admin Module**
   - Comprehensive tools for system management.
   - Monitors election progress, manages system settings, and oversees user activities.
   - Enables CRUD operations on user data.

## Aim
The primary goal of the College Voting System is to create a seamless and secure environment for college elections, enabling students to participate with ease while providing administrators with efficient tools to manage elections and user data. The system ensures:
- Fair and transparent election processes.
- Safeguarding of user data.
- Integrity of each vote cast.

By leveraging this system, colleges can simplify the entire election process, from candidate setup to result announcements, while providing an accessible and smooth user experience.

## Installation
### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed and running locally or accessible via a cloud database.
- Git installed.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-github-username>/college-voting-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd college-voting-system
   ```
3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following keys:
     ```env
     PORT=5000
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     ```
5. Start the backend server:
   ```bash
   npm start
   ```
6. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
7. Start the frontend server:
   ```bash
   npm start
   ```
8. Open the application in your browser at `http://localhost:3000`.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS/Material-UI
- **Tools:** Axios, Nodemailer

## Usage
1. **User Registration:** Students register with their details, and administrators approve candidate registrations.
2. **Election Management:** Administrators configure elections and set up candidates.
3. **Voting:** Students log in and cast their votes securely.
4. **Results:** The system tallies votes and announces results automatically.
5. **Profile Management:** Users and administrators can manage their profiles and preferences.



## License
This project is licensed under the MIT License. See the LICENSE file for details.


