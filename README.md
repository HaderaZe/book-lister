# 📚 Book Lister

A full-stack book management application with React, GraphQL, and MongoDB.

## 🚀 Live Demo

- **Frontend:** [https://book-lister-frontend.vercel.app](https://book-lister-frontend.vercel.app)
- **Backend API:** [https://book-lister-backend.vercel.app](https://book-lister-backend.vercel.app)

## ✨ Features

- ✅ User authentication (register, login, logout)
- ✅ Add, view, edit, delete books
- ✅ Search and filter books
- ✅ Responsive design with Tailwind CSS
- ✅ GraphQL API
- ✅ MongoDB database

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Apollo Client
- Tailwind CSS
- React Router

**Backend:**
- Node.js + Express
- Apollo Server
- GraphQL
- MongoDB + Mongoose
- JWT Authentication

## 📦 Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Frontend Setup

\`\`\`bash
cd frontend
npm install
cp .env.example .env
# Update VITE_API_URL in .env
npm run dev
\`\`\`

Visit: http://localhost:5173

### Backend Setup

\`\`\`bash
cd backend
npm install
cp .env.example .env
# Update MONGODB_URI and other vars in .env
npm run dev
\`\`\`

Visit: http://localhost:4000/graphql

## 🚀 Deployment

### Backend

1. Deploy to Vercel
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`

### Frontend

1. Deploy to Vercel
2. Set environment variable:
   - `VITE_API_URL` (your backend URL)

## 📝 Environment Variables

**Backend:**
\`\`\`
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
FRONTEND_URL=https://your-frontend.vercel.app
\`\`\`

**Frontend:**
\`\`\`
VITE_API_URL=https://your-backend.vercel.app/graphql
\`\`\`

## 📄 License

MIT

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/HaderaZe)