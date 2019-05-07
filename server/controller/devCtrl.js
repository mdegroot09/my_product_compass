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
  },

  newDev: async (req, res) => {
    let manager_id = req.session.user.id
    let {first_name, last_name, title} = req.body
    let db = req.app.get('db')
    console.log('newDev req.body:', req.body)
    await db.new_dev({first_name, last_name, title, manager_id})
    let devs = await db.get_all_devs({manager_id})
    console.log('newDev res.send:', devs)
    res.status(200).send(devs)
  }
}