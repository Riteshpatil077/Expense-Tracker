# 💳 Expense Tracker

**Expense Tracker** is a sleek, high-performance financial management platform designed to help you master your money. Track expenses, categorize income, and generate professional reports with ease.

---

## ✨ Features

- **🚀 Real-time Dashboard**: Dynamic charts and analytics using Recharts.
- **🔐 Secure Auth**: Robust user authentication with JWT (JSON Web Tokens).
- **📂 Modular Tracking**: Easily log expenses and income with customizable categories.
- **📊 Professional Reports**: 
  - Automated **PDF** and **Excel** generation.
  - Background processing with **Celery** & **Redis**.
  - Direct translation to your **Email**.
- **🐳 Dockerized**: One-command setup for the entire stack.
- **📱 Responsive Design**: Fully optimized for mobile and desktop using **Tailwind CSS**.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide-React.
- **Backend**: Django, Django REST Framework, SimpleJWT.
- **Tasks**: Celery, Redis.
- **Database**: PostgreSQL.
- **Reporting**: ReportLab, Openpyxl.
- **Deployment**: Docker, Docker Compose.

---

## 🚀 Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed.
- [Python 3.10+](https://www.python.org/) (for local development).

### Installation (Docker - Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory.

3. **Launch the stack**:
   ```bash
   docker-compose up --build
   ```

The application will be available at:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`

### Deployment (Render)

This project is ready to be deployed to [Render](https://render.com/) using the `render.yaml` blueprint.

1. **Connect your repository** to Render.
2. Render will automatically detect the `render.yaml` file and propose a blueprint.
3. Click **Apply** to start the deployment of the Frontend, Backend, Database, and Redis.
4. Once deployed, update the `CORS_ALLOWED_ORIGINS` in the backend and `VITE_API_URL` in the frontend if necessary.

---

## ⚙️ Configuration (.env)

Ensure your `.env` contains the following keys:

```env
SECRET_KEY=your_secret_key
DB_NAME=expense_tracker
DB_USER=postgres
DB_PASSWORD=your_password
REDIS_URL=redis://redis:6379/0
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
```

---

## 🤝 Contributing

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

Developed with ❤️ by [Ritesh](https://github.com/yourusername)
