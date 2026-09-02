# Personal Portfolio Website (React.js + Firebase)

A modern, responsive, and full-featured Personal Portfolio Website and Administrator CMS developed with **React.js**, **Tailwind CSS**, and **Firebase** (Cloud Firestore, Firebase Authentication, Firebase Storage, and Firebase Hosting).

---

## 🌟 Key Features

### 👤 Public Visitor Experience
- **Interactive Home Page**: Dynamic hero introduction, status pill, CTA buttons, metrics counters, and featured work.
- **About & Philosophy**: Professional summary, biography, career objectives, and core engineering principles.
- **Skills Showcase**: Categorized technical competencies (Languages, Frontend, Backend, Databases, Tools) with proficiency indicators and live search filters.
- **Projects Catalog**: Filterable by category, searchable by keyword or tech stack, with modal project inspector, GitHub repository links, and live demo triggers.
- **Experience Timeline**: Chronological employment history with detailed contributions and tech tags.
- **Education Qualifications**: University degrees, CGPA badges, institution info, and academic coursework.
- **Research & Publications**: Academic papers with expandable methodology/results sections and paper PDF links.
- **In-Browser Resume**: Structured CV viewer with direct print/PDF download.
- **Interactive Contact Form**: Direct message submission with input validation, storing inquiries into Cloud Firestore (`messages` collection).
- **Dark & Light Mode**: Seamless theme switching with localStorage persistence and system preference detection.

### 🛡️ Administrator CMS Dashboard (`/admin`)
- **Secure Authentication**: Firebase Email/Password Auth with instant Demo Mode autofill.
- **Analytics Overview**: Real-time counters for projects, skills, experience, research papers, and visitor inquiries.
- **Profile Manager**: Edit name, title, bio, contact details, social URLs, and upload profile photo.
- **Project Manager**: Complete CRUD operations, category management, tech stack chips, and homepage featured status toggles.
- **Skill Manager**: Full CRUD for technical skills with proficiency sliders and category assignments.
- **Experience & Education Managers**: Full CRUD for career history and academic records.
- **Research Manager**: Add and edit research publications and conference proceedings.
- **Message Inbox**: View visitor inquiries, mark as read/unread, reply directly via email, and delete messages.
- **Firestore Seeding Tool**: 1-click button to push initial sample data directly into your Firebase Firestore database.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
```bash
cd portfolio-website
npm install
```

### 3. Environment Configuration
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

Fill in your Firebase project credentials from the [Firebase Console](https://console.firebase.google.com):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note:** If no Firebase credentials are provided, the application runs automatically in **Interactive Demo Mode** with pre-seeded data and full local state management.

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Administrator Login
- **Route**: `/login` or click "Admin Panel" in the header/footer.
- **Demo Credentials**:
  - Email: `admin@example.com`
  - Password: `admin123`
  *(Or click "Autofill Demo" button on the login screen)*

---

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Log in: `firebase login`
3. Deploy: `firebase deploy`
