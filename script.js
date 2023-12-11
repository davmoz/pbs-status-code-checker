const warnings = {
    1: "Output cooling water rising",
    2: "Input gas flow too low",
    4: "Input gas pressure too low",
    8: "Input gas temperature rising",
    16: "Input gas pressure rising",
    32: "Chiller fault",
    64: "Door open",
    32768: "Hunit timeout",
};

const errors = {
    65536: "High speed oscillator broken",
    131072: "Voltage divider overflow",
    262144: "BB temperature negative",
    524288: "BB temperature too high",
    1048576: "BB duty high current low",
    2097152: "BB 24V voltage too low",
    4194304: "BB can't raise duty above limit",
    8388608: "BB voltages and temperatures NOK",
    16777216: "Input gas temperature above limit",
    33554432: "Output gas temperature above limit",
    67108864: "Cell gas pressure above limit",
    134217728: "Internal pressure above limit",
    268435456: "Output cooling water above limit",
    536870912: "HUnit has no power",
};

function checkStatus() {
    const code = document.getElementById('statusCode').value;
    let resultsHtml = '';

    if (code === '') {
        resultsHtml = "<div class='default-text'>Enter a status code to see warnings and errors.</div>";
    } else {
        for (let key in warnings) {
            if (code & key) {
                resultsHtml += "<div class='warning'>Warning: " + warnings[key] + "</div>";
            }
        }

        for (let key in errors) {
            if (code & key) {
                resultsHtml += "<div class='error'>Error: " + errors[key] + "</div>";
            }
        }
    }

    document.getElementById('results').innerHTML = resultsHtml;
}

checkStatus();
