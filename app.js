const express = require('express');
const cors = require('cors');
var runIntent = require("./serviceDialogflow").runIntent;

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post("/requestText", function(req, res) {
  (async() => {
    console.log(req.body);

    var result = await runIntent(req.body.projectId, req.body.text);
    return res.send(
      {
        "Response": result.Response,
        "Query": result.Query,
        "Intent": result.Intent
      }
    )
  })();
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

module.exports = app;