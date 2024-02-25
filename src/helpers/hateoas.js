const prepareHateoas = async (entity, data, limit = data.length) => {
  let stockTotal = 0
  const results = data.map(i => {
    stockTotal += i.stock
    return {
      name: i.nombre,
      href: `/joyas/${entity}/${i.id}`
    }
  })
  const HATEOAS = {
    totalJoyas: Number(limit),
    stockTotal,
    results
  }
  return HATEOAS
}

export default prepareHateoas
