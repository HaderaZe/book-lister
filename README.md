# 📚 Book Lister

A modern full-stack book management application with user authentication.

## 🚀 Features

- 🔐 User Authentication (JWT)
- 📖 Create, Read, Update, Delete books
- 🔍 Search and filter books by genre, year, rating
- ⭐ Rate books (1-5 stars)
- 📊 Dashboard with statistics
- 📱 Fully responsive design

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Apollo Client (GraphQL)
- TailwindCSS
- React Router
- Vite

### Backend
- Node.js + Express
- Apollo Server (GraphQL)
- MongoDB + Mongoose
- JWT Authentication
- TypeScript

## 🏃‍♂️ Running Locally

### Prerequisites
- Node.js 18+
- MongoDB

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit http://localhost:5173

## 📝 License

MIT