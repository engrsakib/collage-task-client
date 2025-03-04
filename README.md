# 🎓 AcadEase - College Booking System

AcadEase is a **MERN stack-based** college booking platform where users can search for colleges, view details, and book admissions seamlessly. The platform features an intuitive **search system, college information display, and a streamlined admission process**.

![AcadEase Screenshot](https://i.ibb.co.com/SXsBdhyY/image.png)

## 🚀 Live Preview  
🔗 [Live App](https://your-live-link.com)  

## 📂 Repositories  
- **Frontend:** [GitHub - Client](https://github.com/engrsakib/collage-task-client)  
- **Backend:** [GitHub - Server](https://github.com/engrsakib/collage-task-server)  

---

## ✨ Features  

✅ **College Search & Booking** – Find colleges and book admissions easily  
✅ **Detailed College Profiles** – View research history, events, and sports details  
✅ **Authentication System** – Login via Email/Password & Google  
✅ **Admission System** – Apply for college admission with required details  
✅ **User Reviews & Ratings** – Users can review and rate colleges  
✅ **Profile Management** – Users can update their name, email, and university  
✅ **Fully Responsive UI** – Works across desktops, tablets, and mobiles  

---

## 📌 Pages & Routes  

### 🔹 Home Page  
- **Search Bar:** Search for colleges by name  
- **College Cards:** Displays top 3 colleges with admission dates, events, and research info  
- **College Image Gallery:** Showcases college graduates' group pictures  
- **Research Section:** Displays research papers by college students  
- **Review Section:** Shows user reviews and ratings  

### 🔹 College Page (`/colleges`)  
- Displays **5-6 colleges** with images, ratings, admission dates, and research numbers  
- Clicking "Details" shows **events, sports, and research details**  

### 🔹 Admission Page (`/admission`)  
- Displays college names  
- Admission form fields:  
  - Candidate Name  
  - Subject  
  - Email  
  - Phone Number  
  - Address  
  - Date of Birth  
  - Profile Image  
- Clicking "Submit" saves data in "My College"  

### 🔹 My College Page (`/my-college`)  
- Displays user’s **admission details**  
- Users can **add reviews and ratings**  

### 🔹 Profile Page (`/profile`)  
- Displays user information  
- Users can **edit Name, Email, University, and Address**  

### 🔹 Authentication  
- **Registration & Login** via Email/Password, Google  
- **Password Reset Option**  
- **Protected Routes:** Users must log in to see college details or add reviews  

### 🔹 404 Page  
- Custom **creative 404 page** for broken routes  

---

## 🛠️ Technologies Used  

### **Frontend:**  
- React.js  
- Tailwind CSS, DaisyUI  
- React Router  
- Axios  
- Firebase Authentication  

### **Backend:**  
- Node.js, Express.js  
- MongoDB  
- JWT Authentication  
- Mongoose ORM  

### **Deployment:**  
- **Frontend:** Vercel / Netlify  
- **Backend:** Vercel / Render  
- **Database:** MongoDB Atlas  

---

## 📌 Installation Guide  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/engrsakib/collage-task-client.git
cd collage-task-client
