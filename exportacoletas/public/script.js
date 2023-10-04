// Aqui fazemos a requisição para o servidor e baixamos o CSV
async function csv() {
  await fetch("dados/csv", {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (response) => {
      const json = await response.json();
      // ⚠️ Tem que transformar em blob? ⚠️
      return json;
    }).then((data) => {
      console.log(data.csv)
      downloadCSV(data.csv)
    })
}

csv()

async function excel() {
  await fetch("dados/excel", {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (response) => {
      const json = await response.json();
      // ⚠️ Tem que transformar em blob? ⚠️
      return json;
    }).then((data) => {
      console.log(data.exc)
      downloadFile(data.exc);
    })
}

excel()


async function csql() {
  await fetch("dados/csql", {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (response) => {
      const json = await response.json();
      // ⚠️ Tem que transformar em blob? ⚠️
      return json;
    }).then((data) => {
      console.log("////////////////");
      console.log(data.sql)
      downloadSQL(data.sql);
    })
}

csql()

// Função para baixar o CSV
function downloadCSV(csvContent) {
  var encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
  var link = document.createElement("a");
  link.href = encodedUri;
  link.download = "data.csv";
  link.innerHTML = "Download CSV";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
}

// Função para baixar o EXCEL
function downloadFile(data) {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const linkEx = document.createElement('a');
  linkEx.href = url;
  linkEx.download = "excel.xlsx";
  linkEx.innerHTML = "Download XLSX"
  linkEx.click();
  URL.revokeObjectURL(url);
}

function downloadSQL(data) {
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const linksq = document.createElement('a');
  linksq.href = url;
  linksq.download = "data.sql";
  linksq.style.display = 'none';
  document.body.appendChild(linksq);
  linksq.click();
  setTimeout(function() {
    URL.revokeObjectURL(url);
    document.body.removeChild(linksq);
  }, 100);
}
