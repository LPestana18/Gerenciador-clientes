const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const clientesRoutes = require('./rotas/clientes');

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

app.use('/api/clientes', clientesRoutes);

module.exports = app;
