# SyncCart – Interactive Shopping List

**SyncCart** is an interactive shopping list application that allows users to create and manage shared shopping lists in real-time.  
The app provides a clean, intuitive interface for managing purchases with household members or friends, supporting both web and mobile access.

🌐 **Live Demo:** [https://sync-cart.uno](https://sync-cart.uno)  

---

## 📖 Project Overview

SyncCart is a theoretically simple application, but it has been implemented using a **microservices architecture** to ensure scalability and maintainability.  
While this approach may be considered **overkill** for such a small project, it was chosen deliberately to explore and practice working with modern, industry-relevant technologies and deployment setups.

---

## 📋 Features

- **Create and manage shopping lists** with product details:
  - Name
  - Preferred price
  - Store
  - Quantity
- **Share lists** with selected users (only invited members can see and edit them).
- **Mark items as completed** after purchase.
- **Real-time collaboration** for household members or friends.
- **Responsive UI** – works as a web application and mobile app (via PWA).

---

## 🛠️ Technologies Used

- **Architecture:** Microservices with Docker Compose
- **Authentication:** Google OAuth2 (planned migration to Keycloak)
- **Backend:** Java, Spring WebFlux
- **Frontend:** React, MUI (Material UI), Axios
- **Database:** MongoDB
- **Web Server:** Nginx
- **Hosting:** Self-deployed on VPS

---

## 🏗️ Architecture

```plaintext
Frontend (React + MUI) <--> Backend (Spring WebFlux)
       |                        |
       v                        v
   Authentication           MongoDB
   (Google OAuth2)           Database
        |
   Nginx Reverse Proxy
        |
   VPS Deployment (Docker Compose)
