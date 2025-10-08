[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/_KG6YNPd)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20220791)

# Group 3

## Product Vision

For New Yorkers who want to share their experiences of the city, SightSee is a web application (with mobile-friendly view) that allows users to post and caption geotagged photos, and view posts nearby. Unlike Instagram, which connects users around the world, our product is designed for users to interact with content in their geographic area.

## First Prototype Instructions (version)

Install the prototype APK on a Android phone. Make sure setting to Install Unknown Apps is turned on. Launch the app.

### Features

Start Page: Click "New User" button

Login Page: Input any text in both fields, then click login

Map Screen: Click on map image, or click on menu Icon

Post View: View sample Post and Comments

## Prototype Extension Instructions (version)

### Features

#### Pages
- **User Authentication**
  1. Choose user type  
  2. Login page — click **Login** to proceed to the Main Page  
  3. Sign Up page — click **Sign Up** to proceed to the Main Page  

- **Main Page** — displays a map with nearby posts  
  - Click **red pins** to view individual post pages  
  - **Note:** Nearby pins are hardcoded around **Hunter College**.  
    If your current location is elsewhere, pan to that area to view nearby pins.  

- **Post Page**

- **User Profile** — click the profile picture in the upper-right navigation bar  

- **User Settings** — accessible from the same profile dropdown  

#### Map Features
- **Interactive map interface** — pan, zoom, and explore nearby locations  
- **Geolocation** — represented by a blue circle  
- **Pins** — indicate nearby posts (hardcoded for demonstration)  

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

---

**Note:**  
If you encounter issues, make sure your Node.js and npm versions meet the prerequisites above.