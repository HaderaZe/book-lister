# Book Lister

Full-stack book management application with GraphQL API.

## 🚀 Live Demo

- **Frontend:** [https://book-lister-frontend.vercel.app](https://book-lister-frontend.vercel.app)
- **Backend API:** [https://book-lister-api.vercel.app/graphql](https://book-lister-api.vercel.app/graphql)

## 📋 Tech Stack

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

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with your API URL
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and secrets
npm run dev
```

## 🚀 Deployment

### Backend (Deploy First)

1. Create new Vercel project
2. Import repository
3. Set root directory: `backend`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
5. Deploy

### Frontend (Deploy Second)

1. Create new Vercel project
2. Import same repository
3. Set root directory: `frontend`
4. Add environment variable:
   - `VITE_API_URL` (your backend URL)
5. Deploy

## 📝 Environment Variables

**Backend (.env):**
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend.vercel.app/graphql
```

## 📄 License

MIT