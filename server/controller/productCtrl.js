module.exports = {
  getProducts: async (req, res) => {
    let db = req.app.get('db')
    let products = await db.get_all_products()
    res.status(200).send(products)
  }
}