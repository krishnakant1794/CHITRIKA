// chitri_backend/routes/authRoutes.js
const express = require('express');
const { verifyFirebaseToken } = require('../controllers/authController');
const router = express.Router();

router.post('/verify-token', verifyFirebaseToken); // This defines /verify-token relative to its mount point
                                                // So, combined with server.js, it becomes /api/auth/verify-token

module.exports = router;