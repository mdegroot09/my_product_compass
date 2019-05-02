module.exports = {
  getTasks: async (req, res) => {
    let db = req.app.get('db')
    let tasks = await db.getAllTasks()
    res.status(200).send(tasks)
  }
}