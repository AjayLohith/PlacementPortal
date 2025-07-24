# [PlacementPedia](https://placementpedia.vercel.app)

**PlacementPedia** is a full-stack web application built to help college students prepare for their placements. It serves as a centralized, crowd-sourced platform where seniors can share their interview experiences, and juniors can use that information to prepare for their own.

## ✨ Features

- **User Authentication:** Secure registration and login system for students.
- **Admin Approval System:** All submissions are reviewed by an administrator to ensure content quality.
- **Dynamic Company Info:** The "About Company" section is automatically generated using an AI API.
- **Detailed Experience Sharing:** Users can post a full, multi-round breakdown of their interview process.
- **Company-Wise Content:** All interview experiences are organized by company.
- **Separate Deployments:** A modern, decoupled architecture with the frontend on Vercel and the backend on Render.

## 🧰 Technologies Used

- **Frontend:** React (with Vite), Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Deployment:** Vercel (Frontend), Render (Backend)

## 📱 Mobile Compatibility

PlacementPedia is fully responsive and designed to work seamlessly on all devices:

- Adaptive layouts for desktops, tablets, and phones.
- Touch-friendly navigation and form inputs.
- A consistent user experience across all screen sizes.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js installed on your machine.
* A MongoDB Atlas account and your connection string.

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/placementpedia.git](https://github.com/your-username/placementpedia.git)
    cd placementpedia
    ```

2.  **Backend Setup**
    * Navigate to the `server` directory: `cd server`
    * Create a `.env` file and add your environment variables:
        ```
        MONGO_URI=<Your_MongoDB_Connection_String>
        JWT_SECRET=<Your_JWT_Secret_Key>
        PORT=5001
        ```
    * Install dependencies: `npm install`
    * Run the server: `npm run dev`

3.  **Frontend Setup**
    * Navigate to the `client` directory: `cd client`
    * Create a `.env` file and add the API URL:
        ```
        VITE_API_URL=http://localhost:5001
        ```
    * Install dependencies: `npm install`
    * Run the client: `npm run dev`
