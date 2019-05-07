module.exports = {
  getDevs: async (req, res) => {
    let manager_id = req.session.user.id
    let db = req.app.get('db')
    let devs = await db.get_all_devs({manager_id})
    res.status(200).send(devs)
  },
  
  getDev: async (req, res) => {
    let manager_id = req.session.user.id
    let {dev_id} = req.params
    let db = req.app.get('db')
    let dev = await db.get_dev({dev_id, manager_id})
    if (dev.length < 1){
      dev = await db.get_dev_simple({dev_id, manager_id})
    }
    res.status(200).send(dev)
  }
}