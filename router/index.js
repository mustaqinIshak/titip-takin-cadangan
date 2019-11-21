const express = require('express')
const login = express.Router()
const model = require('../models').User
login.use(express.json())
login.use(express.urlencoded({ extended: true }))

//sign in
login.get('/', (req, res) => {
  res.render('index')
})
login.post('/', (req, res) => {
  model
    .findOne({
      where: {
        first_name: req.body.first_name,
      },
    })
    .then(data => {
      if (!data) {
        res.send('tidak ditemukan')
      } else {
        res.render('home')
        req.session.user = {}
      }
    })
    .catch(err => {
      console.log(err)
    })
})
//register
login.get('/register', (req, res) => {
  res.render('register')
})
login.post('/register', (req, res) => {
  // console.log(req.body)
  model.create(req.body)
  .then(model => {
    res.redirect('home')
  })
  .catch(err => {
    console.log(err)
  })
})

login.get('/admin', (req, res) => {
  model.findAll()
  .then(user => {
    res.render('admin', {user})
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = login
