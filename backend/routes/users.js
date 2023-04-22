const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { users } = require('../models/models')

// POST user login
router.post('/login', (req, res, next) => {
    const user = req.body
    users.findOne({ org: user.org, username: user.username, password: user.password }, (err, user) => {
        if (err) {
          console.error(err);
          res.status(500).send('An error occurred while logging in');
        } else if (!user) {
          res.status(401).send('Incorrect username or password');
        } else {
          res.status(200).json(user);
        }
      });
  })

module.exports = router
