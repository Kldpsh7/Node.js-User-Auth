const express = require('express');
const userController = require('../controllers/user')
const router = express.Router();

router.get('/login',userController.getLoginPage);
router.post('/login',userController.postLogin);
router.get('/signup',userController.getSignupPage);
router.post('/signup',userController.postSignup);

module.exports = router;