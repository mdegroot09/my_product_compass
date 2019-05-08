module.exports = {
  getProducts: async (req, res) => {
    let manager_id = req.session.user.id
    let db = req.app.get('db')
    let products = await db.get_all_products({manager_id})
    res.status(200).send(products)
  },

  getProduct: async (req, res) => {
    let manager_id = req.session.user.id
    let product_id = req.params.id
    let db = req.app.get('db')
    let product = await db.get_product({manager_id, product_id})
    res.status(200).send(product)
  },

  newProduct: async (req, res) => {
    let manager_id = req.session.user.id
    let {productName} = req.body
    let db = req.app.get('db')
    await db.new_product({manager_id, productName})
    let products = await db.get_all_products({manager_id})
    res.status(200).send(products)
  },

  deleteProduct: async (req, res) => {
    let manager_id = req.session.user.id
    let product_id = req.params.id
    let db = req.app.get('db')
    await db.delete_product({manager_id, product_id})
    let products = await db.get_all_products({manager_id})
    res.status(200).send(products)
  }
}