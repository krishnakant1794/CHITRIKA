// chitri_backend/config/firebaseAdmin.js
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// UPDATED: Resolve path relative to the project root, not __dirname
// This assumes your .env path is relative to the backend root (e.g., ./config/serviceAccountKey.json)
const serviceAccountPath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error.message);
}

module.exports = admin;