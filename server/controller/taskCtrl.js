module.exports = {
  getTasks: async (req, res) => {
    console.log('req.session:', req.session)
    let db = req.app.get('db')
    let tasks = await db.getAllTasks()
    res.status(200).send(tasks)
  },

  decrementTask: async (req, res) => {
    let db = req.app.get('db')
    let {task_id} = req.body
    console.log('task_id:', task_id)
    let tasks = await db.decrement_task({task_id})
    res.status(200).send(tasks)
  },

  incrementTask: async (req, res) => {
    let db = req.app.get('db')
    let {task_id} = req.body
    console.log('task_id:', task_id)
    let tasks = await db.increment_task({task_id})
    res.status(200).send(tasks)
  }
}