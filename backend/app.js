const express = require('express');
const app = express();

app.use((req, res, next) =>{
  console.log("Chegou uma requisição...")
})

app.use ((req, res, next) => {
  res.send("Hello from the Back end");
})
