import express from "express";
import path from "path";
import queryToDb from "./queryToDb.js";
import { convertJSONtoCSV, convertJsonToXLSX, convertJsonToSQL } from "./utils.js";
const __dirname = path.resolve();
// Configuração do servidor
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
// Middleware para análise do corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Caminho para arquivos estáticos
app.use(express.static("public"));

// Rota inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rota para obter os dados do banco de dados em formato JSON
app.get("/dados/csv", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const query = "SELECT * FROM login";
  // 
  const result = await queryToDb(query);
  const csv = convertJSONtoCSV(result);
  // ⚠️ Da uma olhada no console para ver o resultado ⚠️
  console.log(csv);
  // Essa é a forma correta de enviar um arquivo para o cliente?
  res.json({
    csv: csv
  })
});
// Rota para obter os dados do banco de dados em formato JSON
app.get("/dados/excel", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const query = "SELECT * FROM login";
  // 
  const result = await queryToDb(query);
  const exc = convertJsonToXLSX(result);
  // ⚠️ Da uma olhada no console para ver o resultado ⚠️
  console.log(exc);
  // Essa é a forma correta de enviar um arquivo para o cliente?
  res.json({
    exc: exc
  })
});

//Rota pra obter os dados em formato JSON e converter para SQL
app.get("/dados/csql", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const query = "SELECT * FROM login";
  // 
  const result = await queryToDb(query);
  const tableName = 'login';
  const sql = convertJsonToSQL(result, tableName);
  // ⚠️ Da uma olhada no console para ver o resultado ⚠️
  console.log(sql);
  // Essa é a forma correta de enviar um arquivo para o cliente?
  res.json({
    sql: sql
  })
});

// Inicia o servidor
app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
