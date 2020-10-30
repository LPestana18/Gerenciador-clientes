const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const clientes = [
  {
    id: '1',
    nome: 'Jose',
    fone: '1122334',
    email: 'jose@email.com'
  },
  {
    id: '2',
    nome: 'Maria',
    fone: '2119992233',
    email: 'maria@email.com'
  }
];

app.use((req, res, next) => {
  res.setHeader('Acces-control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type', 'Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH, DELETE, OPTIONS')
  next()
});

app.post('/api/clientes', (req, res, next) => {
  const cliente = req.body;
  console.log(cliente);
  res.status(201).json({mensagem: "Cliente inserido"})
});

//http://localhost:3000/api/clientes
app.use ('/api/clientes', (req, res, next) => {
  res.status(404).json({
    mensagem: "Tudo ok",
    clientes: clientes
  })
})

module.exports = app;
