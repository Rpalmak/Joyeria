import pool from '../../db/conectionDb.js'
import format from 'pg-format'

const getInventoryOrderAndLimit = async (
  order_by = 'id_ASC',
  limits = 10,
  page = 1
) => {
  const [attribute, direction] = order_by.split('_')
  const offset = (page - 1) * limits
  const formattedQuery = format(
    'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
    attribute,
    direction,
    limits,
    offset
  )
  const { rows } = await pool.query(formattedQuery)
  return rows
}

const getInventoryfiltered = async ({
  precio_max,
  precio_min,
  categoria,
  metal
}) => {
  let filters = []
  const values = []
  const addFilter = (field, comparator, value) => {
    values.push(value)
    const { length } = filters
    filters.push(`${field} ${comparator} $${length + 1}`)
  }
  if (precio_max) addFilter('precio', '<=', precio_max)
  if (precio_min) addFilter('precio', '>=', precio_min)
  if (categoria) addFilter('categoria', '=', categoria)
  if (metal) addFilter('metal', '=', metal)
  let consulta = 'SELECT * FROM inventario'
  if (filters.length > 0) {
    filters = filters.join(' AND ')
    consulta += ` WHERE ${filters}`
  }
  const { rows: inventoryFiltered } = await pool.query(consulta, values)
  return inventoryFiltered
}

export { getInventoryOrderAndLimit, getInventoryfiltered }
