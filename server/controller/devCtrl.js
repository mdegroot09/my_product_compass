module.exports = {
  getAllDevs: async (req, res) => {
    let db = req.app.get('db')
    let devs = await db.get_all_devs()
    res.status(200).send(devs)
  },

  getDev: async (req, res) => {
    let {dev_id} = req.params
    console.log('params dev_id:', dev_id)
    let db = req.app.get('db')
    let dev = await db.get_dev({dev_id})
    if (dev.length < 1){
      dev = await db.get_dev_simple({dev_id})
    }
    res.status(200).send(dev)
  }
}