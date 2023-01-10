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
        inTime
    }
}

// default values

const intensPotoka = 10;
document.querySelector('input[name="intensivnost"]').value = intensPotoka;

const savedPacketSize = parseInt(localStorage.getItem('packetSize'), 10);
const packetSize = savedPacketSize ? savedPacketSize : 592;

const packetSizeInputs = Array.from(document.querySelectorAll('.packet-size'));
packetSizeInputs.forEach(inp => {
    inp.value = packetSize

    inp.addEventListener('input', (e) => {
        localStorage.setItem('packetSize', parseInt(e.target.value, 10));
        packetSizeInputs.forEach(i => i.value = e.target.value)
    })
});