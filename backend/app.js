const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const Cliente = require ('./models/cliente');

mongoose.connect('mongodb+srv://lucas:nw9i8Dmd10dHRXdz@cluster0.5m8t5.mongodb.net/cliente?retryWrites=true&w=majority', { useNewUrlParser: true,
              useUnifiedTopology: true
            })
.then(() => {
  console.log("Conexão OK")
}).catch((error) =>{
  console.log("Conexão não funcionou!")
  console.log(error);
});

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT,DELETE, OPTIONS');
  next()
});


//http://localhost:3000/api/clientes
app.get('/api/clientes', (req, res, next) => {
  Cliente.find().then(documents =>{
      console.log(documents);
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
  })
  cliente.save().
  then(clienteInserido => {
    res.status(201).json({
      mensagem: 'Cliente inserido',
      id: clienteInserido._id
    })
  })
});

//DELETE /api/clientes/eii1349fewajçf1
app.delete('/api/clientes/:id', (req, res, next) => {
  //console.log("Params" + JSON.stringify(req.params));
  Cliente.deleteOne({_id: req.params.id}).then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Cliente removido"});
  })
})

app.put("/api/clientes/:id", (req, res, next) => {
  const cliente = new Cliente({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  Cliente.updateOne({_id: req.params.id}, cliente)
  .then((resultado) => {
    console.log(resultado)
  });
  res.status(200).json({mensagem: 'Atualização realizada com sucesso!'})
})

app.get('/api/clientes/:id', (req, res, next) => {
  Cliente.findById(req.params.id).then(cli => {
    if(cli) {
      res.status(200).json(cli);
    }
    else {
      res.status(404).json({mensagem: "Cliente não encontrado!"})
    }
  })
});

module.exports = app;
