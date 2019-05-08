module.exports = {
  getComponents: async (req, res) => {
    let manager_id = req.session.user.id
    let db = req.app.get('db')
    let components = await db.get_components({manager_id})
    res.status(200).send(components)
  }
}