import express from 'express';
import UserController from '../api/controllers/UserController.js';
import AuthController from '../api/controllers/AuthController.js';
import authenticateToken from '../api/middlewares/AuthMiddleware.js';
import authenticateAdminToken from '../api/middlewares/AdminMiddleware.js';
import FocusController from '../api/controllers/FocusController.js';

const userController = new UserController();
const authController = new AuthController();
const focusController = new FocusController();

const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('Hello world')
});

router.post('/users', userController.createUser)
router.get('/users', authenticateAdminToken, userController.findAll)
router.get('/users/:id', authenticateToken, userController.findById)

router.post('/login', authController.authenticate)

router.get('/focusEstateMonthYear/:month/:year', focusController.getMonthlyFocusByEstate)
router.get('/focusRegionMonthYear/:month/:year', focusController.getMonthlyFocusByRegion)
router.get('/focusYearRegionYear/:region/:year', focusController.getYearFocusFromRegion)
router.get('/focusYearEstateYear/:estate/:year', focusController.getYearFocusFromEstate)
router.get('/focusRegionYear/:year', focusController.getFocusByRegion)
router.get('/focusEstateAllYears/:estate', focusController.getAllYearsFocusFromEstate)

export default router;