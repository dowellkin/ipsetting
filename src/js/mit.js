const mitTablesContainer = document.querySelector(".mit-tables");
const mitElement = document.getElementById("mit-textarea");
let mitCalcBtn = document.querySelector(".mit-calc-btn");
let mitTable = document.querySelector(".mit-table");

mitElement.addEventListener("input", (e) => {
  const cells = parseTextarea(e.target.value.trim());
  const table = buildPreviewTable(cells);
  mitTable.parentNode.replaceChild(table, mitTable);
  mitTable = table;
  mitTable.classList.add("mit-table");

  const data = removeExtraFields(cells);
  const calculatedTables = calculateTables(data);
  outputTables(calculatedTables);
});

function parseTextarea(tableString) {
  const rows = tableString.split("\n");
  let cells = rows.map((el) => el.split("\t"));
  if(cells.length == 1 && cells[0].length == 1 && cells[0][0] == "") {
    cells = [];
  }
  return cells;
}

function buildPreviewTable(cells) {
  const table = document.createElement('table');
  for (let i = 0; i < cells.length; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < cells[i].length; j++) {
      const td = document.createElement("td");
      td.innerText = cells[i][j];
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
  return table;
}

function removeExtraFields(cells) {
  const data = JSON.parse(JSON.stringify(cells));
  const sumRegex = /суммарный/i;
  if (data.at(-1)[0]?.match(sumRegex)) {
    data.pop();
  }

  if (data[0].at(-1)?.match(sumRegex)) {
    data.forEach(row => row.pop());
  }
  return data;
}

function calculateTables(cells) {
  const result = [];
  for(let i = 1; i < cells.length; i++) {
    const singleTable = {};
    for(let j = 1; j < cells[i].length; j++) {
      if(i == j) continue;
      const infoLoad = [];
      load.forEach(loadElem => {
        infoLoad.push(calculate({
          load: loadElem,
          intensPotoka: parseFloat(cells[i][j].replaceAll(",", ".")) * 8,
          packetSize: parseFloat(document.querySelector('input[name="mit-packetsize"]').value),
        }));
      });
      singleTable[`M${i}-M${j}`] = infoLoad;
    }
    result.push(singleTable);
  }
  return result;
}

function outputTables(tables) {
  mitTablesContainer.innerHTML = "";
  tables.forEach((table, index) => {
    const tableTitle = document.createElement('p');
    tableTitle.innerText = `Сетевые параметры для маршрутизатора М${index + 1} по всем направлениям связи`;
    mitTablesContainer.append(tableTitle);

    const readyTable = buildReadyTable(table);
    mitTablesContainer.append(readyTable);
  });
}

function buildReadyTable(table) {
  const tableWrapper = document.createElement('table');
  const headers = [
    "Направление связи",
    "С, бит/с",
    "ρ",
    "T<sub>зад</sub>, с",
    "P<sub>сд</sub>",
    "P<sub>п</sub>",
  ];
  const headerTr = document.createElement('tr');
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.innerHTML = header;
    headerTr.appendChild(th);
  });
  tableWrapper.appendChild(headerTr);

  Object.entries(table).forEach(([key, values]) => {
    values.forEach((data, ind) => {
      const tr = document.createElement("tr");
      if(ind == 0) {
        const td = document.createElement("td");
        td.innerText = key;
        td.setAttribute("rowspan", 4);
        tr.appendChild(td);
      }

      const tdspeed = document.createElement("td");
      tdspeed.innerText = data.speed.toFixed(2).replace(".", ",");

      const tdload = document.createElement("td");
      tdload.innerText = String(data.load).replace(".", ",");

      const tddelay = document.createElement("td");
      tddelay.innerText = data.delay.toFixed(6).replace(".", ",");

      const tdinTime = document.createElement("td");
      tdinTime.innerText = data.inTime.toFixed(6).replace(".", ",");

      const tdlost = document.createElement("td");
      tdlost.innerText = data.lost.toFixed(6).replace(".", ",");


      tr.appendChild(tdspeed);
      tr.appendChild(tdload);
      tr.appendChild(tddelay);
      tr.appendChild(tdinTime);
      tr.appendChild(tdlost);
      tableWrapper.appendChild(tr);
    })
  })

  return tableWrapper;
}