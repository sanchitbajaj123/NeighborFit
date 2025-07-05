# 🏘️ NeighborFit – Neighborhood Review & Discovery App

NeighborFit helps people **discover the best neighborhoods** based on **cleanliness, rent, electricity, safety**, and user reviews. Users can also contribute by **submitting their own reviews** for locations they’ve lived in.

---

## 🚀 Live Features

### 🔍 1. Filter-Based Search
- Users can **apply sliders** to filter neighborhoods based on:
  - Cleanliness (0–10)
  - Rent affordability (1–10)
  - Electricity availability (0–10)
  - Safety (0–10)
- Results are shown as a list of matching locations.

### 📍 2. Direct Location Search
- A user can search any location by typing its name.
- If found, it directly redirects to the details page.

### 🧾 3. Location Details Page
- Displays:
  - Average cleanliness, rent, electricity, safety
  - Total number of reviews
  - List of individual reviews (name + comment)
- Includes a **Back button** that restores previous filters and results via `localStorage`.

### ✍️ 4. Submit a Review
- Users can rate a new or existing location and provide a short review.
- Each submission includes:
  - Location
  - User (optional)
  - 4 Ratings (clean, rent, electricity, safety)
  - Text review
- Submits to backend using `POST /submit`.

---

## 🧱 Tech Stack

| Frontend          | Backend           | Database |
|-------------------|-------------------|----------|
| React.js          | Node.js + Express | MongoDB  |

### Libraries Used
- `axios` – API communication
- `react-toastify` – Toaster notifications
- `react-router-dom` – Routing between pages
- `uuid` – For ID generation (optional)

---

## 🗂️ Project Structure
/client
├── src
│ ├── App.js
│ ├── api.js # Axios-based API calls
│ ├── Home.jsx # Homepage
│ ├── SearchByFilters.jsx# Search filters + results
│ ├── LocationDetails.jsx# Location-specific review page
│ ├── SubmitReview.jsx # Submit review form
│ ├── styles/ # CSS files
│
/server
├── index.js # Express backend
├── models/schema.js # Mongoose model
├── routes.js # All route logic
├── data.json # Optional: Dummy data


---

## 📡 Backend API Endpoints

| Method | Route                  | Description                            |
|--------|------------------------|----------------------------------------|
| `POST` | `/submit`              | Submits a new review                   |
| `GET`  | `/filter?param=value`  | Fetches filtered locations             |
| `GET`  | `/location/:name`      | Fetches reviews + averages for a location |

---

## 💾 State Management

- **LocalStorage used** for:
  - Preserving filter values
  - Storing search results (to allow back navigation)
- Automatically resets on Home page load.

---



