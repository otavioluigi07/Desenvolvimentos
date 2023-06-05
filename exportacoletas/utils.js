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
