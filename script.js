const warnings = {
  1: "Output cooling water temperature rising",
  2: "Input gas flow too low",
  4: "Input gas pressure too low",
  8: "Input gas temperature rising",
  16: "Input gas pressure rising",
  32: "Chiller fault",
  64: "Door open",
  // Skipping empty warnings for clarity
  32768: "HUnit timeout",
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
  268435456: "Output cooling water temperature above limit",
  536870912: "HUnit has no power",
  1073741824: "Input gas flow below min limit during production",
};

function checkStatus() {
  let code = document.getElementById("statusCode").value;
  let warningsHtml = "<div class='warning-column'><h2>Warnings</h2>";
  let errorsHtml = "<div class='error-column'><h2>Errors</h2>";
  let foundIssue = false; // Flag to track if any warning or error was found

  // Assuming input is in the form of "E1F2A3B4", where each pair is a byte and each group of 4 characters is a word in little-endian.
  // We need to swap the words but not the bytes within the words.
  let hexLE = code.slice(4) + code.slice(0, 4);

  // Convert hex input to decimal for bitwise operations
  code = parseInt(hexLE, 16);

  if (isNaN(code)) {
    document.getElementById("results").innerHTML =
      "<div class='default-text'>Enter a valid hexadecimal status code to see warnings and errors.</div>";
    return;
  }

  for (let key in warnings) {
    if (code & key) {
      warningsHtml += "<div class='warning'>" + warnings[key] + "</div>";
      foundIssue = true;
    }
  }

  for (let key in errors) {
    if (code & key) {
      errorsHtml += "<div class='error'>" + errors[key] + "</div>";
      foundIssue = true;
    }
  }

  warningsHtml += "</div>"; // Close the warning-column div
  errorsHtml += "</div>"; // Close the error-column div

  // If no warnings or errors were found, display a message indicating all clear
  if (!foundIssue) {
    document.getElementById("results").innerHTML =
      "<div class='all-clear'>No warnings or errors detected. System is operating normally.</div>";
    return;
  }

  document.getElementById("results").innerHTML = warningsHtml + errorsHtml;
}
