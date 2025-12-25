# Smart Public Issue Reporting System

A simple, mobile-first web application that allows citizens to report public infrastructure issues using **only a photo upload**.  
The system automatically captures location and classifies the issue using a placeholder ML logic for demonstration purposes.

---

## 🧩 Problem Statement
Citizens often face difficulty reporting civic issues such as garbage accumulation, broken street lights, or potholes.  
Existing systems require multiple manual inputs like location, issue type, and descriptions, which reduces usability and adoption.

---

## 💡 Solution Overview
This project provides a **minimal-effort public reporting system** where a user only uploads a photo.  
The application:
- Automatically captures the user's location
- Identifies the type of issue using image-based classification (placeholder logic)
- Routes the issue to the appropriate department
- Confirms submission without showing fake progress or completion statuses

---

## 👤 User Flow (Public User Only)
1. Open the website
2. Upload a single image of the issue
3. Submit

No additional input is required from the user.

---

## ⚙️ Core Features

### 📷 Image Upload
- Users upload one image (from camera or gallery)
- No manual selection of issue type

### 📍 Automatic Location Capture
- Latitude and longitude are captured using the browser's Geolocation API
- Location is attached silently in the background

### 🧠 Image Classification (Placeholder ML)
The uploaded image is classified into one of the following categories:
- Trash / Garbage
- Broken Street Light
- Pothole
- Unclear / Cannot Identify

> ⚠️ Note:  
> Classification logic is a **placeholder function** for demonstration.  
> No accuracy claims are made.

### 🏢 Department Routing (Logic Only)
Based on the detected category:
- Trash → Sanitation Department
- Broken Street Light → Electrical Department
- Pothole → Roads Department

The system only confirms forwarding — **no internal dashboards** are shown.

### 📌 Status Handling
- Status shown: **Submitted**
- No fake or auto-generated statuses such as:
  - In Progress
  - Completed
  - Solved

Message shown:
> “Further updates will be provided by the department.”

---

## 🖥 UI Pages

### Home Page
- Title: **Smart Public Issue Reporting**
- Button: **Upload Photo**

### Upload Page
- Image upload input
- Automatic location capture (hidden)
- Submit button

### Result Page
- Uploaded image preview
- Detected issue category
- Submission confirmation message

---

## 🎨 Design Principles
- Simple government-style UI
- Clean and minimal
- Accessible
- Mobile-first design

---

## 🛠 Technology Stack
- HTML
- CSS
- JavaScript
- Browser Geolocation API

---

## 🚫 Scope Limitations (Intentional)
- Frontend-only implementation
- No authentication
- No admin panel
- No backend workflows
- No real ML model (placeholder only)
- No fake APIs or fake progress tracking

---

## 📌 Use Case
- Smart India Hackathon (SIH)
- Academic Project
- Portfolio Demonstration
- Civic Technology Concept Prototype

---

## 👤 Author
**Mathesh Mithra**

---

## ⚠️ Disclaimer
This project is a **conceptual prototype** designed for demonstration and academic purposes.  
All automation logic is kept minimal and honest, with no exaggerated claims.
