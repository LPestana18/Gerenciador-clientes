const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const Cliente = require ('./models/cliente');


app.use(express.json());

mongoose.connect('mongodb+srv://cliente:cliente12345@cluster0.jzkvl.mongodb.net/app-mean?retryWrites=true&w=majority', { useNewUrlParser: true,
              useUnifiedTopology: true
            })
.then(() => {
  console.log("Conexão OK")
}).catch((error) =>{
  console.log("Conexão não funcionou!")
  console.log(error);
});

/*
const clientes = [
  {
    id: '1',
    nome: 'Jose',
    fone: '11223344',
    email: 'jose@email.com'
  },
  {
    id: '2',
    nome: 'Maria',
    fone: '2119992233',
    email: 'maria@email.com'
  },
  {
    id: '3',
    nome: 'Afonso',
    fone: '11998877',
    email: 'afonso@email.com'
  }
];
*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next()
});


//http://localhost:3000/api/clientes
app.get('/api/clientes', (req, res, next) => {
  Cliente.find().then(
    documents =>{
      res.status(200).json(
        {
        mensagem: "Tudo OK",
        clientes: documents
      }
      );
    }
  );
});

app.post('/api/clientes', (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });

  cliente.save();

  console.log(cliente);
  res.status(201).json({mensagem: 'Cliente inserido'})
});

module.exports = app;
