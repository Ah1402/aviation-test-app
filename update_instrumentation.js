// Simple script to manually add questions to testData.js
const fs = require('fs');
const path = require('path');

// Read current testData.js
const testDataPath = path.join(__dirname, 'src', 'data', 'testData.js');
const testDataContent = fs.readFileSync(testDataPath, 'utf8');
let testData = JSON.parse(testDataContent.replace('const testData = ', '').replace(';', ''));

// Instrumentation questions from Instrumentation Test 1.htm
const instrumentationQuestions = [
  {
    "question": "What is used for EGT measurement?",
    "options": [
      "Helical bimetallic strips",
      "Thermistors",
      "Radiation pyrometry",
      "Thermo EMF thermocouples"
    ],
    "correct": 3,
    "explanation": ""
  },
  {
    "question": "The needle and ball of a turn indicator are both to the left of the datum. This indicates:",
    "options": [
      "a left turn with too much bank",
      "a left turn with too little bank",
      "a right turn with too little bank",
      "a right turn with too much bank"
    ],
    "correct": 0,
    "explanation": ""
  },
  {
    "question": "On a turn and slip indicator, needle to the left and ball to the right indicates:",
    "options": [
      "right turn not enough bank",
      "left turn too much bank",
      "left turn not enough bank",
      "right turn too much bank"
    ],
    "correct": 2,
    "explanation": ""
  },
  {
    "question": "Which of the following are modes of the GPWS?",
    "options": [
      "i. Excessive sink rate ii. Altitude loss after take-off or go-around iii. Excessive terrain closure rate iv. Deviation below glide slope v. Flight into terrain when not in landing configuration vi. Unsafe terrain clearance when not in landing configuration vii. Windshear warning",
      "ii iii v vii",
      "i ii iii vii",
      "iii iv v vi"
    ],
    "correct": 0,
    "explanation": "Modern EGPWS includes vi, basic GPWS typically covers i, ii, iii, iv, v, vii. Assuming the question refers to EGPWS or includes all possible modes."
  },
  {
    "question": "An aircraft is travelling at 120 kt, what angle of bank would be required for a rate one turn?",
    "options": [
      "30°",
      "12°",
      "19°",
      "35°"
    ],
    "correct": 2,
    "explanation": "AoB ≈ TAS/10 + 7. 120/10 + 7 = 19°."
  },
  {
    "question": "What is another name for fail-active?",
    "options": [
      "Fail-soft",
      "Fail-operational",
      "Fail-safe",
      "Fail-passive"
    ],
    "correct": 1,
    "explanation": ""
  },
  {
    "question": "Which of the following are inputs to the central processing unit of the GPWS?",
    "options": [
      "i. Flaps ii. Landing gear iii. Glide slope iv. Unusual attitudes v. Radio altimeter vi. VOR",
      "i ii vi",
      "i ii iii v",
      "i ii iv v"
    ],
    "correct": 2,
    "explanation": ""
  },
  {
    "question": "What is density altitude?",
    "options": [
      "Temperature altitude",
      "Pressure altitude corrected for the prevailing temperature",
      "The altitude in the International Standard Atmosphere at which the prevailing density would be found",
      "Pressure altitude corrected for Total Air Temperature"
    ],
    "correct": 2,
    "explanation": ""
  },
  {
    "question": "A modern radio altimeter uses the frequency band:",
    "options": [
      "VHF 30 - 300 MHz",
      "SHF 3000 MHz - 30 GHz",
      "UHF 300 MHz - 3 GHz",
      "HF 3 MHz - 30 MHz"
    ],
    "correct": 1,
    "explanation": ""
  },
  {
    "question": "The true altitude of an aircraft in flight is shown from:",
    "options": [
      "the standard atmosphere",
      "pressure altitude",
      "density altitude",
      "temperature altitude"
    ],
    "correct": 1,
    "explanation": "None of the options directly represent True Altitude. Pressure altitude is the basis, corrected for non-standard temperature and pressure. The checkmark is on B, Pressure Altitude."
  },
  {
    "question": "Why must an autopilot be synchronized when you wish to disconnect?",
    "options": [
      "To ensure fail-operational landings can continue safely",
      "To allow automatic pitch trimming to reset",
      "To secure against abrupt changes in aircraft attitude",
      "To allow for FD coupling"
    ],
    "correct": 2,
    "explanation": ""
  },
  {
    "question": "Using a classic attitude indicator, an aircraft performs a turn through 270° at a constant angle of bank and rate of turn. The indication is:",
    "options": [
      "nose up bank right",
      "nose down bank left",
      "nose down bank right",
      "nose up bank left"
    ],
    "correct": 0,
    "explanation": "Due to apparent precession/gyro wander in a turn)."
  },
  {
    "question": "A radio altimeter indicates:",
    "options": [
      "2450 - 0 ft",
      "3000 - 50 ft",
      "2450 - 50 ft",
      "3000 - 0 ft"
    ],
    "correct": 2,
    "explanation": "Typical range ~2500 ft max, ~50 ft minimum."
  },
  {
    "question": "A radio altimeter is:",
    "options": [
      "ground based and measures true altitude",
      "ground based and measures true height",
      "aircraft based and measures true altitude",
      "aircraft based and measures true height"
    ],
    "correct": 3,
    "explanation": ""
  },
  {
    "question": "What correction is given by TCAS?",
    "options": [
      "Turn left or right",
      "Climb or descend",
      "Contact ATC on receipt of a resolution advisory",
      "Climb or descend at 500 ft/min"
    ],
    "correct": 1,
    "explanation": ""
  },
  {
    "question": "An aircraft that is assessed as not being a threat would be indicated on a TCAS system as:",
    "options": [
      "a solid red square",
      "a solid white or cyan diamond",
      "a hollow white or cyan diamond",
      "a solid yellow circle"
    ],
    "correct": 2,
    "explanation": ""
  },
  {
    "question": "During descent through a block of airspace of constant temperature and while flying at a constant Mach No. will cause the CAS to:",
    "options": [
      "increase",
      "decrease",
      "remain constant",
      "increase at a rate of 1·98%/1000 ft"
    ],
    "correct": 0,
    "explanation": "Constant Mach & Temp = constant TAS; descending increases density, thus CAS increases."
  },
  {
    "question": "Under conditions determined by the International Standard Atmosphere, at MSL true airspeed:",
    "options": [
      "is greater than CAS",
      "is less than CAS",
      "equals CAS",
      "is indeterminate due to the variation in temperature"
    ],
    "correct": 2,
    "explanation": ""
  },
  {
    "question": "If the total pressure sensor supply line leaks, and with the drain element blocked, in a non-pressurized aircraft this will cause the ASI to:",
    "options": [
      "under-read",
      "over-read",
      "over-read in the climb and under-read in the descent",
      "under-read in the climb and over-read in the descent"
    ],
    "correct": 0,
    "explanation": ""
  },
  {
    "question": "An aircraft is travelling at 100 kt forward speed on a 3° glide slope. What is its rate of descent?",
    "options": [
      "500 ft/min",
      "300 ft/min",
      "250 ft/min",
      "500 ft/sec"
    ],
    "correct": 0,
    "explanation": "RoD ≈ GS × 5. 100 × 5 = 500 ft/min."
  }
];

// Update instrumentation Test 1
testData.instrumentation.tests[0].questions = instrumentationQuestions;

// Write back to file
const updatedContent = `// Aviation Test Data - Updated with Questions
// Generated: ${new Date().toISOString()}

const testData = ${JSON.stringify(testData, null, 2)};

// Attach to window for browser usage
if (typeof window !== "undefined") {
  window.testData = testData;
}

// Export for use in modules (Node/CommonJS)
if (typeof module !== "undefined" && module.exports) {
  module.exports = testData;
}`;

fs.writeFileSync(testDataPath, updatedContent);
console.log('Updated testData.js with instrumentation questions');