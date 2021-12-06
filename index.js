const express = require('express');
const app = express();
const handlebars = require('express-handlebars')

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

app.listen('3001', function(){
  console.log('Servidor Iniciado')
})