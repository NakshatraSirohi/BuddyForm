# Student Complaint Website & Android App

A project designed to empower students by providing an anonymous platform to voice their concerns and complaints without hesitation. This system ensures that anonymity remains the primary focus, fostering trust and encouraging participation.

---

## Features

### 🎯 Core Objectives:

1. **Anonymity**:
   - Complete anonymity for students to report issues without fear of retaliation.
2. **Cross-Platform**:
   - A responsive **web application** and a dedicated **Android app** for seamless usage.
3. **Secure Complaint Management**:
   - All complaints are encrypted to ensure confidentiality.
4. **Intuitive Interface**:
   - User-friendly design, allowing students to submit complaints easily.
5. **Admin Dashboard**:
   - Enables administrators to review, filter, and address complaints efficiently.

---

## Tech Stack

### 💻 Web Application:

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB (NoSQL)
- **UI**: React.js
- **Data Updation/Caching**: React Query (Tenstack Query)
- **Testing Control**: Postman
- **Routing**: React Router DOM for managing page navigation

### 📱 Android Application:

- **Language**: Kotlin
- **Technology**: Jetpack Compose

### 🔒 Security:

- **Encryption**: Bcrypt for complaint data.
- **Authentication**: JWT-based authentication for admins.

---

## Features Breakdown

### 1️⃣ **Student Complaint Submission**:

- Anonymous complaint submission through a simple form.
- Complaint categories (e.g., Academic, Administrative, Infrastructure, Other).

### 2️⃣ **Real-Time Notifications**:

- Confirmation notifications once a complaint is successfully submitted.

### 3️⃣ **Status Tracking**:

- Admins can update the status of complaints (Pending, In Progress, Resolved).
- Students can view the status anonymously through a complaint ID.
- Complaint are evaluate using a hierarchy system.

### 4️⃣ **Privacy & Security**:

- IP masking to prevent tracking of users.
- End-to-end encryption of complaint data in transit and at rest.

---

## Installation & Setup

### 📦 **Web Application**:

1. Clone the repository:
   ```bash
   git clone https://github.com/NakshatraSirohi/BuddyForm.git
   cd BuddyForm
   ```
2. Install dependencies:

   ```bash
   npm install nodejs
   npm install express mongoose jsonwebtoken bcryptjs dotenv cors cookie-parser cloudinary
   npm install cross-env --save-dev
   npm install nodemailer

   ```

3. Run the application:
   ```bash
   npm run dev
   ```
4. Open the application in your browser:  
   `http://localhost:3000`

### 📱 **Android App**:

1. Clone the repository:
   ```bash
   git clone https://github.com/Robin-Kumar-rk/BuddyFormApp.git
   cd BuddyFormApp
   ```
2. Open the project in Android Studio.
3. Build and run the application on an emulator or any android device.

---

## Future Enhancements

- **Complaint Analytics**:  
  Dashboard insights to analyze recurring issues and improve campus services.
- **Multi-language Support**:  
  To cater to a diverse student base.
- **Feedback System**:  
  Anonymous feedback for resolved complaints.
- **Voice Notes and Attachments**:  
  Allow students to upload images or record complaints.

---

_Empowering students, fostering trust._
