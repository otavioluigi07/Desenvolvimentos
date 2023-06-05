// Aqui fazemos a requisição para o servidor e baixamos o CSV
fetch("dados")
  .then((response) => {
    // ⚠️ Tem que transformar em blob? ⚠️
    return response.blob();
  })
  .then((blob) => {
    // Chamamos a função para baixar o CSV
    downloadCSV(blob);
  });

// Função para baixar o CSV
function downloadCSV(csvContent) {
  var encodedUri =
    "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
  var link = document.createElement("a");
  link.href = encodedUri;
  link.download = "data.csv";
  link.innerHTML = "Download CSV";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
