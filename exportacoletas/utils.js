//Biblioteca externa - EXCEL
import XLSX from "json2xml";
//import jsonSql from "json-sql";

// Função para converter JSON em CSV
export function convertJSONtoCSV(jsonData) {
  var csvData = [];
  var headerRow = Object.keys(jsonData[0]);
  csvData.push(headerRow.join(","));
  jsonData.forEach(function (object) {
    var values = Object.values(object);
    csvData.push(values.join(","));
  });
  return csvData.join("\n");
}

// Função para converter JSON em EXCEL
export function convertJsonToXLSX(jsonData) {
const excel = XLSX(jsonData)
console.log(excel)
return excel;
}

export function convertJsonToSQL(jsonData, tableName) {
  if (!Array.isArray(jsonData)) {
    jsonData = [jsonData];
  }
  if (jsonData.length === 0) {
    return ''; // Retorna uma string vazia se o JSON estiver vazio
  }
  const keys = Object.keys(jsonData[0]);
  const values = jsonData.map(item => {
    return Object.values(item).map(value => {
      // Trata as aspas simples ('), substituindo-as por duas aspas simples ('') para evitar erros de sintaxe no SQL
      if (typeof value === 'string') {
        value = value.replace(/'/g, "''");
      }
      return `'${value}'`;
    });
  });

  const sqql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES ${values.map(row => `(${row.join(', ')})`).join(', ')};`;
  console.log(sqql)
  return sqql;
}


//---------------------------------------------------------------------------------------
// Função para converter um objeto JSON em uma instrução SQL
//const jsonSql = require('json-sql');

// Função para converter um objeto JSON em uma instrução SQL
// export function convertJsonToSQL(jsonData, tableName) {
//   const config = {
//     type: 'select',
//     table: tableName,
//     fields: ['nome', 'idade'],
//     condition: {
//       nome: 'Max',
//       id: 6
//     }
//   };

//   const sql = jsonSql.build(config);
//   return sql.query;
// }

// // Exemplo de uso
// const jsonData = {
//   nome: 'John',
//   idade: 24
// };

// const sqlQuery = convertJsonToSQL(jsonData, tableName);
// console.log(sqlQuery);
