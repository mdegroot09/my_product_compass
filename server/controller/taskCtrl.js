module.exports = {
  getTasks: async (req, res) => {
    let manager_id = req.session.user.id
    let {product_id} = req.params
    let db = req.app.get('db')
    let tasks = await db.get_all_tasks({product_id, manager_id})
    res.status(200).send(tasks)
  },

  decrementTask: async (req, res) => {
    let manager_id = req.session.user.id
    let {task_id, product_id} = req.body
    let db = req.app.get('db')
    let tasks = await db.decrement_task({task_id, manager_id, product_id})
    res.status(200).send(tasks)
  },

  incrementTask: async (req, res) => {
    let manager_id = req.session.user.id
    let {task_id, product_id} = req.body
    let db = req.app.get('db')
    let tasks = await db.increment_task({task_id, manager_id, product_id})
    res.status(200).send(tasks)
  },

  newTask: async (req, res) => {
    let manager_id = req.session.user.id
    let {taskName, due_date, notes, dev_id, component_id, tickets} = req.body
    let product_id = req.body.productid
    let db = req.app.get('db')
    await db.new_task({manager_id, taskName, due_date, notes, dev_id, component_id, tickets, product_id})
    let tasks = await db.get_all_tasks({product_id, manager_id})
    res.status(200).send(tasks)
  },

  deleteTask: async (req, res) => {
    let manager_id = req.session.user.id
    let product_id = req.params.id
    let {task_id} = req.body
    console.log('manager_id, product_id, task_id:', manager_id, product_id, task_id)
    let db = req.app.get('db')
    await db.delete_task({manager_id, task_id})
    let tasks = await db.get_all_tasks({manager_id, product_id})
    res.status(200).send(tasks)
  }
}