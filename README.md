# VAK (Voice Abuse Kill switch)

**A Social Platform with AI-Powered Toxicity Detection**

<p align="center">
  <img src="demo-picture.png" alt="VAK Demo" width="800"/>
</p>

## Next.js Frontend (Main App)

Repository: (Machine Learning API):
https://github.com/DivitJain26/vak-flask-api.git

Live Deployment:
https://vak-tau.vercel.app/

_Note: The toxicity detection API is hosted on Render free tier,
which sleeps when idle.
It may take ~1 minute to respond the first time while the server wakes up._

## Project Setup Guide

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a .env file in the root of your project:

```bash
cp .env.example .env
```

#### Then open .env and fill in your MongoDB database connection:

```bash
MONGODB_URI=your_mongodb_connection_string_here
```

(Use your MongoDB Atlas URI)

#### Flask Toxicity API URL


(For local development: Flask runs on port 5000)
```bash
NEXT_PUBLIC_FLASK_API_URL=http://127.0.0.1:5000
```

For production (Render backend):

```bash
NEXT_PUBLIC_FLASK_API_URL=https://vak-flask-api.onrender.com
```

**Before running the Next.js app, start the ML API:**

```bash
python app.py
```

## Scripts & Commands

Run all commands from the root directory of the Next.js project.

**Start Next.js Development Server**

```bash
npm run dev
```

Now visit your app at:
http://localhost:3000
