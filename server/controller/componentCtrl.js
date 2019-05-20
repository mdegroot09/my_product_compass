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
  },

  updateParentId: async (req, res) => {
    let manager_id = req.session.user.id
    let product_id = req.params.id
    let {component_id, parent_component} = req.body
    let db = req.app.get('db')
    await db.update_parent_id({manager_id, component_id, parent_component})
    let components = await db.get_components({manager_id, product_id})
    res.status(200).send(components)
  },

  createComponent: async (req, res) => {
    let manager_id = req.session.user.id
    let {name, parent_component, product_id} = req.body
    let db = req.app.get('db')
    let newComponent = await db.create_component({manager_id, name, parent_component, product_id})
    let {component_id} = newComponent[0]
    await db.update_component({manager_id, name, parent_component, product_id, component_id})
    res.sendStatus(200)
  }
}