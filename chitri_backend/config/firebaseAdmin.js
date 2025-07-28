// chitri_backend/config/firebaseAdmin.js
const admin = require('firebase-admin');
const dotenv = require('dotenv'); // Make sure dotenv is loaded
const path = require('path'); // Still needed for local dev fallback

dotenv.config(); // Load environment variables (for local dev)

try {
  let serviceAccount;
  // Check if running in production (e.g., on Render) AND if the JSON env var is provided
  if (process.env.NODE_ENV === 'production' && process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    // For Render (production), read the JSON string from environment variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else {
    // For local development, read from the local file path
    // Ensure FIREBASE_SERVICE_ACCOUNT_PATH is set in your local .env
    const serviceAccountPath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './config/serviceAccountKey.json');
    
    // Check if the file exists before requiring it (optional, but prevents crash if file is missing locally)
    if (!require('fs').existsSync(serviceAccountPath)) {
        console.warn(`Firebase serviceAccountKey.json not found at ${serviceAccountPath}. This is expected in production if using FIREBASE_SERVICE_ACCOUNT_JSON env var.`);
        // You might choose to throw an error here for local dev if the file is truly mandatory
        // For production, this path will not be used.
        serviceAccount = {}; // Provide an empty object or handle gracefully
    } else {
        serviceAccount = require(serviceAccountPath); // Node.js can directly require JSON files
    }
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error.message);
  // It's crucial to handle this error, as Firebase auth verification will fail without it.
  // In production, if FIREBASE_SERVICE_ACCOUNT_JSON is missing or malformed, this will crash.
}

module.exports = admin;
