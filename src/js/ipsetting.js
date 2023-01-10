const load = [0.2, 0.4, 0.6, 0.8];

const table = document.querySelector(".main-table");
const intensElem = document.querySelector('input[name="intensivnost"]');
const packetSizeElem = document.querySelector('input[name="packetsize"]');

document.querySelector(".calc-btn").addEventListener("click", () => {
	output(+intensElem.value, +packetSizeElem.value);
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
	// console.log(opts, load)

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

function selectElementContents(el) {
  var body = document.body,
    range,
    sel;
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    sel.removeAllRanges();
    try {
      range.selectNodeContents(el);
      sel.addRange(range);
    } catch (e) {
      range.selectNode(el);
      sel.addRange(range);
    }
  } else if (body.createTextRange) {
    range = body.createTextRange();
    range.moveToElementText(el);
    range.select();
  }
  document.execCommand("Copy");
  sel.removeRange(range);
}

document.querySelector(".copy").addEventListener("click", () => {
  selectElementContents(document.querySelector(".main-table"));
});
