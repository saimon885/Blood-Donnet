# 🩸 BloodHive – Fast & Efficient Blood Donation Management System

🔗 **Live URL:** [https://blood-donnet.netlify.app/](https://blood-donnet.netlify.app/)

BloodHive is a **comprehensive blood donation system** designed to manage donors, volunteers, and admin activities efficiently. The system ensures proper role-based access and smooth handling of blood requests and donations.

---

## 🚀 Key Features

- 🧑‍💻 **Role-Based Access**
  - Admin, Volunteer, and Donor have separate sections.
  - Donors cannot access admin or volunteer areas.
  - Admin cannot access donor or volunteer sections.

- 🩸 **Donor Management**
  - Donors can **create, view, update, and delete requests**.
  - Volunteers can update donor request data in multiple ways.
  - Admin can view the full list of donors and assign roles (volunteer/admin).

- ⏳ **Request Tracking**
  - All pending requests are visible in the **Requests section**.
  - Requests can be updated to **In Progress** status.

- 💰 **Funding & Donations**
  - Logged-in users (Admin, Donor, Volunteer) can donate any amount.

- 🔍 **Find Donor**
  - Search donors by **blood group, district, and upazila**.

- 🔒 **Secure & Efficient**
  - Firebase authentication ensures proper access control.

---

## 🛠 Technologies & Tools

- **Frontend:** React, Tailwind CSS, DaisyUI, React Router  
- **State & Forms:** React Hook Form, Axios, Toastify  
- **UI & Animation:** Swiper, AOS, React Simple Typewriter, SweetAlert2  
- **Backend & Database:** Firebase  
- **Bundler:** Vite  
- **Icons:** React Icons  
- **Date Management:** date-fns  

---

## 🖼 Screenshots

*(Add screenshots of Home, Requests, Donor List, Find Donor pages here)*

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/bloodhive.git
cd bloodhive

# Install dependencies
npm install

# Run locally
npm run dev

