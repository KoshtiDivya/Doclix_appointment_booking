# Doclix

**Doclix** is a responsive **MERN stack** (MongoDB, Express.js, React.js, Node.js) based appointment booking platform.  
It provides separate panels for **Users, Doctors, and Admins**, with features like appointment booking, availability management, payments, and admin controls.  

---

## 🚀 Features

### 👤 User
- Signup/Login with authentication (JWT based)  
- Search and filter doctors by speciality  
- Book, view, or cancel appointments  
- Update profile information  
- Make secure **online payments with Razorpay**  

### 🩺 Doctor
- Accept or cancel appointments  
- Manage and update availability  
- Check total earnings  
- View list of past patients  

### 👨‍💼 Admin
- Manage all doctors, patients, and appointments  
- Add, edit, or delete doctors  
- Change doctor availability  
- View statistics: total doctors, total patients, and appointment details  

---

## 🛠️ Tech Stack
- **Frontend:** React.js  
- **Admin Panel:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Payments:** Razorpay  

---

## 📂 Project Structure

root/ <br>
├── admin/ # Admin panel (React) <br>
├── backend/ # Backend API (Node/Express)<br>
└── frontend/ # User frontend (React)<br>


## Setup Instructions
1. Clone repo  
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>

2. Backend setup

cd backend
npm install
cp .env.example .env   # add your environment variables
npm run dev

3. Frontend setup

cd frontend
npm install
npm start

4. Admin setup

cd admin
npm install
npm start

## Environment Variables

backend/.env
MONGO_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

## frontend/.env
REACT_APP_API_URL=http://localhost:5173

## admin/.env
REACT_APP_API_URL=http://localhost:5174
