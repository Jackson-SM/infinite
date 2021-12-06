const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const Usuarios = require('./models/db')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req,res) => {
  res.render('index', {
    session: 'sessao'
  })
})

app.get('/login', (req,res) => {
  res.render('login')
})

app.post('/authenticate', (req,res) => {
  Usuarios.findAll({where: {
    login: req.body.login
  }}).then(log => {
    const {password} = log[0]
    if(log.length > 0){
      password == req.body.password ? res.redirect('/') : res.redirect('/login')
    }
  }).catch(err => res.send(err))
})

app.listen('3001', function(){
  console.log('Servidor Iniciado')
})