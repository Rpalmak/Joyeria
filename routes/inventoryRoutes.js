import express from 'express'
import { getAllInventoryWithHateoas, inventoryFilters } from '../src/controllers/inventoryController.js'
import { getReport } from '../middlewares/inventoryMiddleware.js'

const router = express.Router()
router.get('/joyas', getReport, getAllInventoryWithHateoas)
router.get('/joyas/filtros', getReport, inventoryFilters)

export default router
