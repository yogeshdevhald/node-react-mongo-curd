const express = require('express')
const router = express.Router();
const ProductController = require('../controllers/Productcontroller.js');
const verifymiddleware = require('../middleware/verify.js');
const authcontroller = require('../controllers/authcontroller')


router.post('/register',authcontroller.register);
router.post('/login',authcontroller.login);

router.post('/create',verifymiddleware, ProductController.Adduser);
router.post('/edit',verifymiddleware, ProductController.Edituser);
router.get('/fetch', verifymiddleware,ProductController.fetchuser);
router.post('/update',verifymiddleware, ProductController.Updateuser);
router.post('/delete',verifymiddleware,ProductController.Deleteuser);

module.exports = router