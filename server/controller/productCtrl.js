module.exports = {
  getProducts: async (req, res) => {
    let manager_id = req.session.user.id
    let db = req.app.get('db')
    let products = await db.get_all_products({manager_id})
    res.status(200).send(products)
  },

  newProduct: async (req, res) => {
    let manager_id = req.session.user.id
    let {productName} = req.body
    console.log('productName:', productName)
    let db = req.app.get('db')
    await db.new_product({manager_id, productName})
    let products = await db.get_all_products({manager_id})
    res.status(200).send(products)
  }
}