# ResumeCraft - Resume Builder (MERN)

ResumeCraft is a modern, full-stack resume generator application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to easily create, customize, and download professional resumes in a user-friendly interface.

## Features

- **User Authentication:** Secure login and sign-up functionality.
- **Intuitive Resume Builder:** Add, edit, and manage multiple resume sections (Personal Info, Experience, Education, Skills, Projects, etc.).
- **Predefined & Customizable Templates:** Choose from multiple professionally designed templates or customize your own.
- **PDF Export:** Download your finished resume as a PDF file.
- **Real-Time Preview:** See live updates as you edit your resume.
- **Data Persistence:** Save and manage multiple resumes per user.
- **Responsive Design:** Fully responsive and mobile-friendly interface.

## Tech Stack

- **Frontend:** React.js, CSS3/Styled Components
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **PDF Generation:** Libraries like jsPDF or html-pdf
- **Deployment:** Render

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Souvik-31/Resume-Builder-MERN.git
   cd Resume-Builder-MERN
   ```

2. **Install dependencies:**
   - For both client and server:
     ```bash
     cd frontend
     npm install
     cd ../backend
     npm install
     ```

3. **Configure environment variables:**
   - Create a `.env` file in the `server` directory and add your MongoDB URI and JWT secret.
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the applications:**
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend client:
     ```bash
     cd ../frontend
     npm run dev
     ```

5. **Open in browser:**
   - Visit `http://localhost:5173` to use the application.

## Usage

1. Register for a new account or log in.
2. Create a new resume or edit an existing one.
3. Fill in your details in various sections.
4. Preview your resume in real-time.
5. Download your resume as a PDF.

## Folder Structure

```
Resume-Builder-MERN/
├── frontend/      # React frontend
├── backend/      # Node/Express backend
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
