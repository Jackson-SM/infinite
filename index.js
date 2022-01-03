const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const Usuarios = require('./models/db')
const session = require('express-session')
const flash = require("connect-flash")

app.use(session({
  secret: "aijfojsainfnvoij2j90asjpf",
  resave: true,
  saveUninitialized: false
}))
app.use(flash())

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req,res) => {
  if(req.session.login){
    Usuarios.findAll({where: {'login': req.session.login}})
    .then(user => {
      res.render('index', {
        user: user,
        session: req.session.login,
        title: 'Infinite'
      })
    })
  }else{
    res.render('index', {
      title: 'Infinite'
    })
  }
})

/* Login */
app.get('/login', (req,res) => {
  if(req.session.login){
    res.redirect('/')
  }else{
    res.render('login', {
      title: 'Login',
    })
  }
})

app.post('/login', (req,res) => {
  Usuarios.findAll({where: {
    login: req.body.login
  }}).then(log => {
    if(log.length > 0){
      const {password,login} = log[0]
      if(password == req.body.password){
        req.session.login = login
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    }else{
      res.redirect('/login')
    }
  }).catch(err => res.send(err))
})
/*Login - END*/

/* Register */

app.get('/register', (req,res) => {
  res.render('register', {
    title: 'Register',
    error: req.flash('error')
  })
})

app.post('/register', (req,res) => {
  Usuarios.findOrCreate({
    where: {login: req.body.login},
    defaults: {
      login: req.body.login,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name
    }
  }).then((user) => {
    if(!user[1]){
      req.flash('error', 'Usuário já existente')
      res.redirect('/register')
    }else{
      req.session.login = req.body.login
      res.redirect('/')
    }
  })
})

/* Register - END*/

app.get('/logout/:id', (req,res) => {
  Usuarios.findAll({where: {'id': req.params.id}})
  .then(user => {
    req.session.login = undefined
    res.redirect('/')
  }).catch(err => {
    res.redirect('/')
  })
})

app.get('/delete/:id', (req,res) => {
  Usuarios.destroy({where: {'id': req.params.id}})
  .then(function(){
    req.session.login = undefined
    res.redirect('/')
  }).catch(err => console.log(err))
})

app.listen('3001', function(){
  console.log('Servidor Iniciado')
})