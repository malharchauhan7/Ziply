# Zip.ly - URL Shortener

A modern URL shortening service built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Project Demo
[PROEJECT DEMO](./files/projectdemo.mp4)


## Features

- 🔗 URL Shortening
- 📊 Click Analytics
- 👤 User **Authentication**
- 📱 Responsive Design
- 🔒 Secure Storage
- 📋 Copy to Clipboard
- 🎯 Click Tracking

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - React Router DOM
  - Axios
  - React Icons
  - React Hook Form
  - React Hot Toast

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - Cors
  - Dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zip.ly.git
cd zip.ly
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```

3. Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```


### Running the Application

1. Start Backend Server:
```bash
cd backend
npm start
```

2. Start Frontend Development Server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8001`

## API Endpoints

### URL Routes
- `POST /api/v1/url` - Create short URL
- `GET /api/v1/url/:userId` - Get all URLs for a user
- `GET /:shortId` - Redirect to original URL

### Auth Routes
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

## Project Structure

```plaintext
zip.ly/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── common/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

## Contact

Your Name - [@malharchauhan7](https://github.com/malharchauhan7)
Project Link: [https://github.com/malharchauhan7/ziply](https://github.com/malharchauhan7/ziply)