const express = require('express')
const FocusController = require('../api/controllers/FocusController.js')

const focusController = new FocusController()

const router = express.Router()

router.get('/hello', (req, res) => {
  res.send('Hello world')
})

router.get('/focusEstateMonthYear/:month/:year', focusController.getMonthlyFocusByEstate)
router.get('/focusRegionMonthYear/:month/:year', focusController.getMonthlyFocusByRegion)
router.get('/focusYearRegionYear/:region/:year', focusController.getYearFocusFromRegion)
router.get('/focusYearEstateYear/:estate/:year', focusController.getYearFocusFromEstate)
router.get('/focusRegionYear/:year', focusController.getFocusByRegion)
router.get('/focusBiomesYear/:year', focusController.getFocusFromBiomes)
router.get('/focusEstateAllYears/:estate', focusController.getAllYearsFocusFromEstate)
router.get('/focusDailyEstateMonth/:month/:estate', focusController.getDailyFocusByEstateMonth)
router.get('/focusDailyBiomeMonth/:month', focusController.getDailyFocusBiomeByMonth)

module.exports = router
