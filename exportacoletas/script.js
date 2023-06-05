const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DBPATH = 'bancodedados.db';
// Configuração do servidor
const hostname = '127.0.0.1';
const port = 3000;
// Middleware para análise do corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Caminho para arquivos estáticos
app.use(express.static('public'));

// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Função para converter JSON em CSV
function convertJSONtoCSV(jsonData) {
  var csvData = [];
  var headerRow = Object.keys(jsonData[0]);
  csvData.push(headerRow.join(','));
  jsonData.forEach(function(object) {
    var values = Object.values(object);
    csvData.push(values.join(','));
  });
  return csvData.join('\n');
}

// Função para baixar o CSV
function downloadCSV(csvContent) {
  let encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
  // let link = document.createElement('h1');
  link.href = encodedUri;
  link.download = 'data.csv';
  link.innerHTML = 'Download CSV';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Rota para obter os dados do banco de dados em formato JSON
app.get('/dados', (req, res) => {
  const db = new sqlite3.Database(DBPATH);
  const query = 'SELECT * FROM login';
  db.all(query, (error, rows) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
    } else {
      res.json(rows);
      var csvContent = convertJSONtoCSV(rows);
      console.log(csvContent);
      downloadCSV(csvContent);
    }   
  });

  //db.close();
});

// Inicia o servidor
app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
