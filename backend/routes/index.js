const express = require('express')
const FocusController = require('../api/controllers/FocusController.js')

const focusController = new FocusController()

const router = express.Router()

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Retorna uma mensagem de hello world
 *     tags: [Teste]
 *     responses:
 *       200:
 *         description: Mensagem de hello world
 */
router.get('/hello', (req, res) => {
  res.send('Hello world')
})

/**
 * @swagger
 * /focusEstateMonthYear/{month}/{year}:
 *   get:
 *     summary: Quantidade mensal de focos de cada estado por mes e ano
 *     tags: [Focos]
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantidade mensal de focos de cada estado
 *       500:
 *         description: Erro interno no servidor
 *
 */
router.get('/focusEstateMonthYear/:month/:year', focusController.getMonthlyFocusByEstate)

/**
 * @swagger
 * /focusYearEstateYear/{estate}/{year}:
 *   get:
 *     summary: Quantidade de focos de um estado em cada mes do ano
 *     tags: [Focos]
 *     parameters:
 *       - in: path
 *         name: estate
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantidade de focos mensal do estado
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/focusYearEstateYear/:estate/:year', focusController.getYearFocusFromEstate)

/**
 * @swagger
 * /focusRegionYear/{year}:
 *   get:
 *     summary: Total de focos de cada regiao em um ano
 *     tags: [Focos]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Focos de cada regiao em um ano
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/focusRegionYear/:year', focusController.getFocusByRegion)

/**
 * @swagger
 * /focusBiomesYear/{year}:
 *   get:
 *     summary: Total de focos de cada bioma em um ano
 *     tags: [Focos]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Focos de cada bioma em um ano
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/focusBiomesYear/:year', focusController.getFocusFromBiomes)

/**
 * @swagger
 * /focusEstateAllYears/{estate}:
 *   get:
 *     summary: Quantidade de focos mensal de um estado de 2003 a 2024
 *     tags: [Focos]
 *     parameters:
 *       - in: path
 *         name: estate
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantidade de focos mensal de um estado de 2003 a 2024
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/focusEstateAllYears/:estate', focusController.getAllYearsFocusFromEstate)

/**
 * @swagger
 * /focusDailyEstateMonth/{month}/{estate}:
 *   get:
 *     summary: Quantidade de focos em cada dia de um estado em um mes
 *     tags: [Focos]
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: estate
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantidade de focos em cada dia de um estado em um mes
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/focusDailyEstateMonth/:month/:estate', focusController.getDailyFocusByEstateMonth)

/**
 * @swagger
 * /focusDailyEstatesMonth/{month}:
 *   get:
 *     summary: Tatal de focos no mes de cada estado em 2025
 *     tags: [Focos]
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tatal de focos no mes de cada estado em 2025
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/focusDailyEstatesMonth/:month', focusController.getDailyFocusFromEstatesByMonth)

module.exports = router
