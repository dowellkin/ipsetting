const mitElement = document.getElementById("mit");
const mitTable = document.querySelector(".mit-table");

mitElement.addEventListener("input", (e) => {
  const data = e.target.value.trim();
  const rows = data.split("\n");
  const cells = rows.map((el) => el.split("\t"));
  console.log(`cells`, cells);

  console.log(mitTable)
  mitTable.innerHTML = "";
  for (let i = 0; i < cells.length; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < cells[i].length; j++) {
      const td = document.createElement("td");
      td.innerText = cells[i][j];
      tr.appendChild(td);
    }

    mitTable.appendChild(tr);
  }
});
