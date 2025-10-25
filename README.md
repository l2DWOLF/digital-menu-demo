# 🍽️ Digital Menu

A Fully interactive restaurant menu web application.  
It enables users to view, add, edit, and manage menu items dynamically — with validation, local data persistence, and responsive UI transitions.

**Live Demo:** [https://digital-menu-xyvw.onrender.com/](https://digital-menu-xyvw.onrender.com/)

---

## ✨ Features

- **Interactive CRUD for menu items**
  - Add, edit, or delete dishes directly from the interface.
  - Duplicate dish name guard for clean data integrity.
- **Formik + Yup Validation**
  - Reusable input fields and consistent schema enforcement.
- **LocalStorage Persistence**
  - Simulates backend functionality for offline development and testing.
- **Grid & Table View Toggle**
  - Switch between visual or structured menu layouts.
- **Category Filtering & Sorting**
  - Simplified UX for managing and exploring dishes.
- **React Toastify**
  - Elegant real-time feedback for actions and errors.

---

## 🧩 Tech Stack

| Category | Tools |
|-----------|--------|
| Frontend | React 19 (Vite) |
| Styling | CSS Modules |
| Forms | Formik + Yup |
| Notifications | React Toastify |
| Icons | Lucide React |
| Package Management | npm |
| Deployment | Render.com (Static Site) |

---

## 📁 Project Structure

```
digital-menu/
├─ public/              # Static assets (images, background, redirects)
├─ src/
│  ├─ components/       # Main UI components and pages
│  ├─ forms/            # Reusable Formik-based forms + validation
│  ├─ utils/            # Helper utilities (toastify, loaders, etc.)
│  ├─ css/              # Modular styling for pages and components
│  ├─ db/               # Default local JSON data
│  ├─ App.jsx           # Root component
│  └─ main.jsx          # Entry point
└─ package.json         # Build and dependency management
```

---

## 🧠 Notes

### Architecture & Design Decisions

- **Local Data Flow:**  
  The app reads and writes menu data to `localStorage`, simulating backend CRUD operations while maintaining full reactivity. This allows easy integration with a future API without changing UI logic.

- **Reusable Components:**  
  Form, card, and table views were built with reuse and scalability in mind for future extensions like orders or categories.

- **Formik + Yup Integration:**  
  Abstracted form field components reduce code duplication and ensure unified validation behavior.

- **Duplicate Entry Guard:**  
  Prevents adding multiple dishes with the same name — improving data consistency and UX.

- **Deployment:**  
  Hosted as a **Render static site**, built with `npm run build`, and served from `/dist`.  
  A `_redirects` file is included to support React Router routes.

---

## 🚧 Next Update

- **Mobile Responsiveness:**  
  Upcoming update will include improved adaptive layouts for all pages, ensuring usability across smaller devices and touch interfaces.

---
