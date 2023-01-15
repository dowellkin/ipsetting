function calculate({load, intensPotoka, packetSize}) {
    const intensivnostObsl = intensPotoka / load;
    const speed = packetSize * intensivnostObsl;
    const delay = 1 / (intensivnostObsl - intensPotoka);
    const inTime = 1 - Math.exp(-0.150 / delay);
    const lost = 1 - inTime;

    return {
        speed,
        load,
        delay,
        lost,
        inTime,
        intensPotoka,
        packetSize
    }
}
// default values

const load = [0.2, 0.4, 0.6, 0.8];

const intensPotoka = 10;
document.querySelector('input[name="intensivnost"]').value = intensPotoka;

const savedPacketSize = parseInt(localStorage.getItem('packetSize'), 10);
const packetSize = savedPacketSize ? savedPacketSize : 592;

const packetSizeInputs = Array.from(document.querySelectorAll('.packet-size'));
packetSizeInputs.forEach(inp => {
    inp.value = packetSize

    inp.addEventListener('input', (e) => {
        packetSizeInputs.forEach(i => {
            let val = e.target.value;
            val = val.replace(/[\.,]/g, '');
            i.value = val;
        })
        localStorage.setItem("packetSize", parseInt(e.target.value, 10));
    })
});

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