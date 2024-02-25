import { getInventoryOrderAndLimit, getInventoryfiltered } from '../models/inventoryModel.js'
import { findError } from '../utils/utils.js'
import prepareHateoas from '../helpers/hateoas.js'

const getAllInventoryWithHateoas = async (req, res) => {
  try {
    const { order_by, limits, page } = req.query
    const inventory = await getInventoryOrderAndLimit(order_by, limits, page)
    const inventoryWithHateoas = await prepareHateoas('joya', inventory, limits)
    res.status(200).json({ inventory: inventoryWithHateoas })
  } catch (error) {
    const errorFound = findError(error.code)
    return errorFound.length
      ? res.status(errorFound[0].status).json({ error: errorFound[0].message })
      : res.status(500).json({ error: 'Error al mostrar el inventario' })
  }
}

const inventoryFilters = async (req, res) => {
  try {
    const queryStrings = req.query
    const inventory = await getInventoryfiltered(queryStrings)
    res.status(200).json({ inventory })
  } catch (error) {
    const errorFound = findError(error.code)
    return errorFound.length
      ? res.status(errorFound[0].status).json({ error: errorFound[0].message })
      : res.status(500).json({ error: 'Error al mostrar el inventario' })
  }
}

export { getAllInventoryWithHateoas, inventoryFilters }
