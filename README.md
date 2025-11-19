# VAK (Voice Abuse Kill switch) 
**A Social Platform with AI-Powered Toxicity Detection**

## Next.js Frontend (Main App)
Repository: (Machine Learning API): 
https://github.com/DivitJain26/vak-flask-api.git

Live Deployment:
https://vak-tau.vercel.app/

*Note: The toxicity detection API is hosted on Render free tier,
which sleeps when idle.
It may take ~1 minute to respond the first time while the server wakes up.*

## Project Setup Guide
### Install Dependencies

```bash
npm install
```
## Environment Setup

Create a .env file in the root of your project:

```bash
cp .env.example .env
```

Then open .env and fill in your MongoDB database connection:
```bash
MONGODB_URI=your_mongodb_connection_string_here
```


(Use your MongoDB Atlas URI)

## Scripts & Commands
Run all commands from the root directory of the Next.js project.

**Start Next.js Development Server**
```bash
npm run dev
```
Now visit your app at:
http://localhost:3000