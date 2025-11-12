[![Java CI with Maven](https://github.com/CSCI-40500-Fall-2025/sight-see/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/CSCI-40500-Fall-2025/sight-see/actions/workflows/backend-ci.yml)

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/_KG6YNPd)

[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20220791)

# Group 3

## Product Vision

For New Yorkers who want to share their experiences of the city, SightSee is a web application (with mobile-friendly view) that allows users to post and caption geotagged photos, and view posts nearby. Unlike Instagram, which connects users around the world, our product is designed for users to interact with content in their geographic area.

## Layered Software Architecture

### Description

The qualities which are most important in influencing our software architecture are as follows:
* **Number of users** - Our product is a social, consumer software which has the potential of scaling quickly
* **Software reuse** - Our software involves many components for which credible libraries already exist (i.e. Google Maps API for our map component, Spring Boot for REST capabilities and Authentication, etc.). We can utilize these pre-existing libraries to streamline our software development.
* **Software compatibility** - Because our product is centered around geo-tagged photos and many other popular software applications support them, we want to ensure compatibility with these other services in the event of future integrations.

Our software comprises a 4 layer architecture:
* **User Interface** - Web browser, Google Maps UI, Camera/Location permissions
* **Authentication** - Authentication and Authorization
* **Basic Services and Application-specific functionality** - User search, Post creation/retrieval, User interaction with posts
* **Database Management** - Persisting User, Post, and Comment data

The choice of technologies chosen for our software were influenced by the qualities and architecture described above:
* **Frontend** - React, Tailwind, daisyUI, Vite, Javascript
* **Backend** - Java, Maven, Spring Boot, BCrypt, Docker containers on AWS ECS
* **Database** - PostgreSQL on AWS RDS
* **Image storage** - AWS S3
* **APIs** - Google maps javascript API, Google maps geolocation API
* **Deployment** - Backend & DB - AWS, Frontend - Vercel

### Architecture Diagram
<img src="https://github.com/user-attachments/assets/dc012920-9a3b-4c78-8c83-a1f293aa542d" alt="Software architecture diagram" width="450" height="450">

---

### Running the Frontend

#### Prerequisites
1. [Node.js](https://nodejs.org/) — version **20.17.0** or newer recommended  
2. [npm](https://www.npmjs.com/) — comes bundled with Node.js  
3. **Google Maps API**  
   - Follow [Google’s API key setup guide](https://developers.google.com/maps/documentation/javascript/get-api-key)  
   - Make sure **Maps JavaScript API** and **Geolocation API** are **enabled**  
   - Define your API key in a `.env` file in the project root:
     ```bash
     VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
     ```

---

#### Setup Instructions

1. **Open a terminal** and navigate to the `frontend` folder:
   ```bash
   cd frontend

2. Install dependencies:
    ```
    npm install
    ```

3. Start the development server:
    ```
    npm run dev
    ```

4. Open the local URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)) in your browser.
