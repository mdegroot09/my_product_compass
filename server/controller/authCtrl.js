const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    let {first_name, last_name, company, username, password} = req.body
    const db = req.app.get('db')
    let result = await db.get_manager(username)
    let existingUser = result[0]

    if (existingUser) {
      return res.status(409).send('Username taken')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let registeredUser = await db.register_manager({first_name, last_name, company, username, hash})
    let user = registeredUser[0]

    req.session.user = {
      id: user.id,
      username: user.username
    }

    res.status(201).send(user)
  },

  login: async (req, res) => {
    let {username, password} = req.body
    const db = req.app.get('db')
    let foundUser = await db.get_manager(username)
    let user = foundUser[0]
    
    if (!user) {
      return res.status(401).send('User not found. Please register as a new user before logging in.')
    }

    const isAuthenticated = bcrypt.compareSync(password, user.hash)
    if (!isAuthenticated){
      return res.status(403).send('Incorrect password')
    }

    req.session.user = {
      id: user.id,
      username: user.username
    }

    res.status(200).send(req.session.user)
  },

  logout: async (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}