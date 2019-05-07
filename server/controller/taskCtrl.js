module.exports = {
  getTasks: async (req, res) => {
    let manager_id = req.session.user.id
    let {dev_id} = req.params
    let db = req.app.get('db')
    let tasks = await db.get_all_tasks({dev_id, manager_id})
    res.status(200).send(tasks)
  },

  decrementTask: async (req, res) => {
    let db = req.app.get('db')
    let {task_id} = req.body
    let tasks = await db.decrement_task({task_id})
    res.status(200).send(tasks)
  },

  incrementTask: async (req, res) => {
    let db = req.app.get('db')
    let {task_id} = req.body
    let tasks = await db.increment_task({task_id})
    res.status(200).send(tasks)
  }
}