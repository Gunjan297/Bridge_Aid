# BridgeAid – Unified Welfare Scheme Discovery & Application Portal
Developed a comprehensive web platform that bridges the gap between citizens seeking welfare support and organizations offering social initiatives, CSR programs, and government schemes.

# Problem Addressed:
Individuals struggle to discover and apply for welfare schemes due to fragmented information across websites, newspapers, and social media, often missing deadlines or facing complex application processes.

NGOs and corporates launching CSR initiatives find it challenging to effectively reach and engage their target beneficiaries.

# Key Features:

1) **Personalized Scheme Discovery**: Users can search schemes by keywords, categories (e.g., education, health, pension), sub-categories, and apply advanced filters (location, scheme type).
2) **One-Click Application**: Applicants can view eligibility, documentation, deadlines, and directly apply for schemes through the portal, uploading all required documents in their profiles.
3 **Real-Time Status Tracking**: Users can track applications and receive instant updates on acceptance or rejection.
4) **Organization Module**: Registered NGOs and companies can post initiatives, manage applications, review applicant profiles and documents, and approve or reject applications seamlessly.
5) **Secure Authentication**: Implemented user and organization authentication with robust session management.

# Tech Stack
Frontend: React, Redux Toolkit, Vite, Tailwind CSS, ShadCN UI

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JSON Web Tokens (JWT)

Deployment: Render (website link: https://bridge-aid-frontend.onrender.com/)

# Getting Started
Follow these instructions to set up BridgeAid locally.

Prerequisites
1) Node.js (v16+)
2) MongoDB instance (local or Atlas)

3)Clone the Repository
```
git clone https://github.com/Gunjan297/Bridge_Aid.git
cd bridge-aid
```
4)Install Dependencies

Frontend
```
cd frontend
npm install
```
Backend
```
cd ../backend
npm install

```
5) Configure Environment Variables
Create a .env file inside the backend folder:

PORT=8000

MONGODB_URI=your-mongodb-connection-string

JWT_SECRET=your-secret-key

(For cloudinary setup)

CLOUD_NAME=your-cloud-name-string

API_KEY = your-clodinar-API-key

API_SECRET = your-cloudinary-API-secret-string

6) Run the Application
Backend
```
cd backend
npm run dev
```
Frontend
```
cd ../frontend
npm run dev
```
# Authentication
BridgeAid uses JWT-based authentication:
On signup/login, users receive a token.
Protected routes validate this token via middleware.

# Testing
Backend APIs can be tested using Postman or Thunder Client.
Frontend tested manually on Chrome, Firefox, and Edge.

# Deployment
You can deploy the backend and frontend on Render

# Contributing
Contributions are welcome! Please follow these steps:

1)Fork the repository.

2)Create a feature branch:
```
git checkout -b feature/your-feature-name
Commit your changes.
```

3)Push to your fork.

4)Open a pull request.

# Contact
For any questions or suggestions:

Project Link: https://bridge-aid-frontend.onrender.com/

Email: mgpsgunjan6166@gmail.com

<img width="953" alt="HomePage" src="https://github.com/user-attachments/assets/8782b7d8-91d8-4f36-866f-d1ca3ab387b5" />
<img width="960" alt="HomePage2" src="https://github.com/user-attachments/assets/96c2ca9a-9815-4892-adaa-017e2cb47b8a" />
<img width="955" alt="SchemesPage" src="https://github.com/user-attachments/assets/3a787aea-774c-4f74-aa00-4e44dc2a8e2c" />
<img width="924" alt="SchemeDetails" src="https://github.com/user-attachments/assets/31193ff8-bc5d-4789-a572-31cf66407637" />
<img width="929" alt="Applicant Profile" src="https://github.com/user-attachments/assets/dcf7a3dc-c02a-41d6-b26e-9a1bbe8b2d40" />
<img width="956" alt="ApplicantProfile" src="https://github.com/user-attachments/assets/768eaaef-d178-42ac-b011-1e1e487908b4" />
<img width="959" alt="admin org" src="https://github.com/user-attachments/assets/5e159775-313b-4eed-8f9b-42e6d3dd5acb" />
<img width="960" alt="admin schemes" src="https://github.com/user-attachments/assets/ec6326aa-38b1-4918-89b7-3792bad864dd" />
<img width="960" alt="admin_applications" src="https://github.com/user-attachments/assets/5b4a03a3-531d-4b6f-acf4-0931fc91e85c" />








