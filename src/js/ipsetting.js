const table = document.querySelector(".main-table");
const intensElem = document.querySelector('input[name="intensivnost"]');
const packetSizeElem = document.querySelector('input[name="packetsize"]');
const showOCKElem = document.querySelector('input[name="showOCK"]');

document.querySelector(".calc-btn").addEventListener("click", () => {
	output(parseFloat(intensElem.value.replace(",", ".")), +packetSizeElem.value);
});

function hideOCKHandler(element) {
	if (element.checked) {
		table.classList.remove("hide-ock");
		localStorage.setItem("hide-ock", 1);
	} else {
		table.classList.add("hide-ock");
		localStorage.setItem("hide-ock", 0);
	}
}

showOCKElem.checked = +localStorage.getItem("hide-ock") ?? 0;
hideOCKHandler(showOCKElem);
showOCKElem.addEventListener('change', (e) => {
	hideOCKHandler(e.target);
});

output(intensPotoka, packetSize);
function output(intensPotoka, packetSize) {
	Array.from(document.querySelectorAll(".table-row")).forEach((el) =>
		el.remove()
	);

	load.forEach((_load) => {
		const data = calculate({
      load: _load,
      intensPotoka: intensPotoka * 8,
      packetSize,
    });
		const row = generateRow(data);
		table.append(row);
	});
}

function generateRow(opts) {
	let speed = opts.speed;
	let load = opts.load;
	let delay = opts.delay;
	let lost = opts.lost;

	const tr = document.createElement("tr");
	tr.classList.add("table-row");

	const tdOCK = document.createElement("td");
	tdOCK.innerHTML = Math.ceil(speed / 64000);

	const tdspeed = document.createElement("td");
	tdspeed.innerHTML = speed.toFixed(4);

	const tdload = document.createElement("td");
	tdload.innerHTML = load;

	const tddelay = document.createElement("td");
	tddelay.innerHTML = delay.toFixed(6);

	const tdA = document.createElement("td");
	tdA.innerHTML = opts.inTime.toFixed(6);

	const tdLost = document.createElement("td");
	tdLost.innerHTML = lost.toFixed(6);

	tr.append(tdOCK);
	tr.append(tdspeed);
	tr.append(tdload);
	tr.append(tddelay);
	tr.append(tdA);
	tr.append(tdLost);
	return tr;
}

document.querySelector(".copy").addEventListener("click", () => {
  selectElementContents(document.querySelector(".main-table"));
});
