module.exports = {
  getTasks: async (req, res) => {
    let db = req.app.get('db')
    let tasks = await db.get_all_tasks()
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