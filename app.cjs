const express = require('express');
const cors = require('cors');
const { runIntent } = require("./serviceDialogflow.cjs");

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post("/requestText", async (req, res) => {
  try {
    console.log(req.body);

    const result = await runIntent(req.body.projectId, req.body.text);
    res.send({
      "Response": result.Response,
      "Query": result.Query,
      "Intent": result.Intent
    });
  } catch (error) {
    console.error("Erro ao processar a intenção:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});