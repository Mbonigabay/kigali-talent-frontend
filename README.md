# **kigali-talent-frontend**

A modern React application for the Kigali Talent job board, built with Vite and Bootstrap 5\. This front-end application consumes a RESTful API to display job listings, manage user profiles, and handle job applications.

### **Features**

* **User Interface:** A clean and responsive design built with React and Bootstrap 5\.  
* **Client-Side Routing:** Uses react-router-dom for seamless navigation between pages.  
* **State Management:** Integrates **Redux** with @reduxjs/toolkit and react-redux for predictable state management.  
* **Job Board:** Displays a list of available jobs with a search feature.  
* **Job Details Page:** A dedicated page for each job listing, which displays a formatted description and allows applicants to apply.  
* **Authentication:** Provides forms for user login and registration, with secure token-based authentication.  
* **User & Admin Dashboards:** Dedicated dashboards for applicants and administrators to manage their profiles, applications, and job listings.  
* **Containerized Environment:** Fully containerized with Docker for a consistent development and deployment process.

### **Prerequisites**

* [Node.js](https://nodejs.org/en/) (v20 or higher)  
* [npm](https://www.npmjs.com/)  
* [Docker](https://www.docker.com/)

### **Getting Started**

Follow these steps to get a local copy of the project up and running.

1. **Clone the repository**  
   git clone https://github.com/mbonigabay/kigali-talent-frontend.git  
   cd kigali-talent-frontend

2. **Install dependencies**  
   npm install

3. **Create a .env file** in the project root for your environment variables.  
   VITE\_BACKEND\_API\_BASE\_URL=http://localhost:8000/api

   * **Note:** The VITE\_ prefix is required by Vite to expose environment variables to the browser.  
4. **Run the application locally**  
   npm run dev

   The application will be available at http://localhost:5173.

### **Project Structure**
```
kigali-talent-frontend/  
├── public/                 \# Static assets  
├── src/  
│   ├── components/         \# Reusable UI components (Navbar, Footer, Forms, Modals) 
│   ├── layouts/            \# Reusable UI components (UserDashboard, AdminDashboard)  
│   ├── features/           \# Redux slices for state management  
│   ├── services/           \# API calls and business logic    
│   ├── stateMachine/       \# Defines state machine 
│   ├── store/              \# Redux store configuration  
│   ├── styles/             \# Global CSS files  
│   └── views/              \# Page-level components (Home, Jobs, Login, etc.)  
├── .dockerignore           \# Specifies files to ignore in Docker image  
├── Dockerfile              \# Instructions for building the Docker image  
├── docker-compose.yml      \# Docker Compose setup for both backend and frontend  
├── index.html              \# Main HTML file  
├── package.json  
└── README.md
```
### **Docker**

To run the application using Docker Compose, you can use the combined docker-compose.yml file from the backend repository.

1. **Build and run the containers**  
   docker compose up \--build

   This command will build the images and start both the frontend and backend containers.  
2. **Run with a pre-built image**
   If you've already pushed the image to Docker Hub, you can run it without rebuilding.

   ```bash
   docker compose up