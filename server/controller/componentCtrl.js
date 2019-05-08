module.exports = {
  getComponents: async (req, res) => {
    let manager_id = req.session.user.id
    let product_id = req.params.id
    let db = req.app.get('db')
    let components = await db.get_components({manager_id, product_id})
    res.status(200).send(components)
  },

  getComponentTaskCount: async (req, res) => {
    let manager_id = req.session.user.id
    let product_id = req.params.id
    let db = req.app.get('db')
    let componentTaskCount = await db.get_component_task_count({manager_id, product_id})
    res.status(200).send(componentTaskCount)
  }
}