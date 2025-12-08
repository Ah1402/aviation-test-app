const fs = require('fs');
const path = require('path');

// Load the questions file
const questionsFile = path.join(__dirname, 'export const AGKQuestions = [.js');
let content = fs.readFileSync(questionsFile, 'utf8');

// Remove BOM if present
content = content.replace(/^\ufeff/, '');
content = content.replace(/export const /g, 'const ');

console.log('Content length:', content.length);
console.log('Content start:', content.substring(0, 100));

// Split by '];'
const parts = content.split('];');
console.log('Parts:', parts.length);

// Run in vm for each part
const vm = require('vm');
const context = vm.createContext({});
parts.forEach((part, index) => {
  const match = part.match(/const (\w+Questions\w*)\s*=\s*\[([\s\S]*)$/);
  if (match) {
    const name = match[1];
    const arrayContent = match[2];
    const code = `var ${name} = [${arrayContent}];`;
    console.log(`Parsing ${name}`);
    try {
      vm.runInContext(code, context);
      console.log(`Parsed ${name} with ${context[name].length} questions`);
    } catch (e) {
      console.error(`Error parsing ${name}:`, e.message);
    }
  }
});

// Now get the arrays
const arrays = [];
Object.keys(context).forEach(name => {
  if (Array.isArray(context[name])) {
    arrays.push({ name, content: context[name] });
  }
});

console.log('Found arrays:', arrays.length);
arrays.forEach(a => console.log(a.name));

// Category mapping from array name
const categoryMap = {
  'AGKQuestions': 'Aircraft General Knowledge',
  'InstQuestions': 'Instrumentation',
  'MassBalQuestions': 'Mass and Balance',
  'RadNavQuestions': 'Radio Navigation',
  'RadNavQuestions2': 'Radio Navigation',
  'MetQuestions': 'Meteorology',
  'OpsQuestions': 'Operations',
  'PoFQuestions': 'Principles of Flight',
  'GenNavQuestions': 'General Navigation',
  'PerformanceQuestions': 'Performance',
  'AirLawQuestions': 'Air Law',
  'FLTPLNQuestions': 'Flight Planning and Monitoring',
  'HPLQuestions': 'Human Performance and Limitations',
  'AONQuestions': 'AON Aviation Knowledge'
};

// Parse questions from each array
const allQuestions = [];
arrays.forEach(({ name, content }) => {
  const expectedCategory = categoryMap[name];
  if (expectedCategory) {
    try {
      // content is the array
      const questions = content.map(q => ({ ...q, category: expectedCategory }));
      allQuestions.push(...questions);
    } catch (e) {
      console.error(`Error parsing ${name}:`, e.message);
    }
  }
});

// Additional Mass and Balance questions
const additionalMassBal = [
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 602,
    "question": "Due to a mistake in the load sheet the aeroplane is 1000 kg heavier than you believe it to be. As a consequence:",
    "options": [
      "V1 will be later",
      "VMU will be later",
      "VR will be later",
      "V1, VMU, VR will all occur earlier"
    ],
    "answer": "VMU will be later"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 603,
    "question": "The datum for the balance arms has to be along the longitudinal axis:",
    "options": [
      "between the nose and the tail",
      "between the leading and trailing edge of the MAC",
      "but does not have to be between the nose and the tail",
      "at the fire wall"
    ],
    "answer": "but does not have to be between the nose and the tail"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 604,
    "question": "For a conventional light aeroplane with a tricycle undercarriage configuration, the higher the take-off mass: 1. stick forces at rotation will increase. 2. range will decrease but endurance will increase. 3. gliding range will reduce. 4. stalling speed will increase.",
    "options": [
      "all are correct",
      "1 and 4 are correct",
      "2, 3 and 4 are correct",
      "1, 3 and 4 are correct"
    ],
    "answer": "1, 3 and 4 are correct"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 605,
    "question": "Performance limited take-off mass may be limited by:",
    "options": [
      "Obstacle clearance and Vmcg",
      "Obstacle clearance",
      "Maximum certified take-off mass",
      "Climb gradient"
    ],
    "answer": "Climb gradient"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 606,
    "question": "Use CAP 696, MRJT 1, fig 4.9. What is the balance arm, the maximum compartment load and the running load for the most aft compartment of the fwd cargo hold?",
    "options": [
      "421.5 cm 3305 kg 13.12 kg per inch",
      "1046.5 inches 711 kg 7.18 kg per kg",
      "421.5 inches 2059 kg 13.12 kg per inch",
      "1046.5 m 711 kg 7.18 kg per in"
    ],
    "answer": "421.5 inches 2059 kg 13.12 kg per inch"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 607,
    "question": "If a compartment takes a maximum load of 500 kg, with a running load limit of 350 kg/m and a distribution load limit of 300 kg/m² max, which of the following boxes, each of 500 kg, can be carried? 1. 100 cm x 110 cm x 145 cm 2. 125 cm x 135 cm x 142 cm 3. 120 cm x 140 cm x 143 cm 4. 125 cm x 135 cm x 144 cm",
    "options": [
      "Any one of the boxes if loaded with due care as to its positioning",
      "Either of boxes 2, 3 and 4 in any configuration",
      "Box 2 with its longest length perpendicular to the floor cross bearers",
      "Box 4 only if loaded with its longest side parallel to the main longitudinal beam"
    ],
    "answer": "Box 4 only if loaded with its longest side parallel to the main longitudinal beam"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 608,
    "question": "When considering CG position, it must be remembered that it is:",
    "options": [
      "set by the pilot",
      "set by the manufacturer",
      "able to exist within a range",
      "fixed"
    ],
    "answer": "able to exist within a range"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 609,
    "question": "Prior to departure an MRJT is loaded with maximum fuel of 20100 liter at an SG of 0.78. Calculate the maximum allowable traffic load that can be carried given the following data: PLTOM 67200 kg, PLLM 54200 kg, DOM 34930 kg, Taxi fuel 250 kg, Trip fuel 9250 kg, Contingency and holding fuel 850 kg, Alternate fuel 700 kg.",
    "options": [
      "13092 kg",
      "12442 kg",
      "16370 kg",
      "16842 kg"
    ],
    "answer": "12442 kg"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 610,
    "question": "The distance from the datum to the CG is:",
    "options": [
      "the index",
      "the moment",
      "the balance arm",
      "the station"
    ],
    "answer": "the balance arm"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 611,
    "question": "An aircraft is flying at 1.3VS1g in order to provide an adequate margin above the low speed buffet and transonic speeds. If the 1.3VS1g speed is 180 kt CAS and the mass increases from 285000 kg to 320000 kg, what is the new 1g stalling speed?",
    "options": [
      "146.7 kt, drag will increase and nautical mile per kg fuel burn will decrease",
      "191 kt, drag will increase and range NM/kg will increase",
      "191 kt, drag will increase and NM/kg fuel burn will decrease",
      "147 kt"
    ],
    "answer": "146.7 kt, drag will increase and nautical mile per kg fuel burn will decrease"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 612,
    "question": "Exceeding the Maximum Structural Landing Mass may:",
    "options": [
      "reduce the fatigue life of the landing gear",
      "cause structural damage",
      "both a and b are correct",
      "no damage will occur providing the aircraft is within the performance limited landing mass"
    ],
    "answer": "both a and b are correct"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 613,
    "question": "Individual aircraft should be weighed in an air-conditioned hangar:",
    "options": [
      "on entry into service and subsequently every 4 years",
      "when the effects of modifications or repairs are not known",
      "with the hangar doors closed and the air conditioning off",
      "all the above"
    ],
    "answer": "all the above"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 614,
    "question": "Which of the following would not affect the CG position?",
    "options": [
      "Cabin crew members performing their normal duties",
      "Fuel consumption during flight",
      "Horizontal stabilator trim setting",
      "Mass added or removed at the neutral point"
    ],
    "answer": "Horizontal stabilator trim setting"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 615,
    "question": "In Mass & Balance terms, what is an index?",
    "options": [
      "A cut down version of a force",
      "A moment divided by a constant",
      "A moment divided by a mass",
      "A mass divided by a moment"
    ],
    "answer": "A moment divided by a constant"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 616,
    "question": "The aeroplane is unstable if:",
    "options": [
      "the CG is forward",
      "the CG is in mid range",
      "the CG is on the rear limit",
      "the CG is behind the rear limit"
    ],
    "answer": "the CG is behind the rear limit"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 617,
    "question": "Define the useful load:",
    "options": [
      "traffic load plus dry operating mass",
      "traffic load plus usable fuel mass",
      "dry operating mass plus usable fuel load",
      "that part of the traffic load which generates revenue"
    ],
    "answer": "traffic load plus usable fuel mass"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 618,
    "question": "If an aeroplane comes into land below its MSLM but above the PLLM for the arrival airfield: 1. airframe structural damage will occur 2. tyre temperature limits could be exceeded 3. the runway length might be inadequate 4. a go-around might not be achievable 5. brake fade could occur",
    "options": [
      "1 and 5 only",
      "3 and 4 only",
      "2, 3, 4 and 5 only",
      "1, 3, 4 and 5 only"
    ],
    "answer": "2, 3, 4 and 5 only"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 619,
    "question": "The useful load is:",
    "options": [
      "TOM minus fuel mass",
      "BEM plus fuel load",
      "TOM minus the DOM",
      "TOM minus the operating mass"
    ],
    "answer": "TOM minus the DOM"
  },
  {
    "category": "Mass and Balance",
    "test": 1,
    "id": 620,
    "question": "Determine the position of the CG as a percentage of the MAC given that the balance arm of the CG = 92.5 cm, the leading edge = 70.8 cm and the MAC = 125 cm.",
    "options": [
      "17.5%",
      "17.7%",
      "16.3%",
      "17.4%"
    ],
    "answer": "17.4%"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 621,
    "question": "What is the zero fuel mass?",
    "options": [
      "MSTOM minus fuel to destination minus fuel to alternative airfield",
      "Maximum allowable mass of the aircraft with no usable fuel on board",
      "Operating mass minus the fuel load",
      "Actual loaded mass of the aircraft with no usable fuel on board"
    ],
    "answer": "Actual loaded mass of the aircraft with no usable fuel on board"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 622,
    "question": "An aeroplane develops a serious maintenance problem shortly after take-off and has to return to its departure airfield. In order to land safely the aircraft must jettison fuel. How much fuel must be jettisoned?",
    "options": [
      "Sufficient to reduce the mass to the zero-fuel mass",
      "The pilot calculates the amount of fuel to jettison to reduce the mass to a safe level at or below the RLM",
      "The fuel system automatically stops the jettison at the RLM",
      "As much as the pilot feels is just in case the problem gets worse"
    ],
    "answer": "The pilot calculates the amount of fuel to jettison to reduce the mass to a safe level at or below the RLM"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 623,
    "question": "If the actual take-off mass is greater than the performance limited take-off mass:",
    "options": [
      "The performance required by regulation cannot be guaranteed because the safety margins are reduced",
      "The safety margins are sufficient to ensure that the required performance can still be achieved",
      "The take-off run must be reduced",
      "The take-off distance must be reduced"
    ],
    "answer": "The performance required by regulation cannot be guaranteed because the safety margins are reduced"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 624,
    "question": "The maximum structural take-off mass is:",
    "options": [
      "the maximum permissible total aeroplane mass on completion of the refuelling operation",
      "the maximum permissible total aeroplane mass for take-off subject to the limiting conditions at the departure airfield",
      "the maximum permissible total aeroplane mass for take-off but excluding fuel",
      "the maximum permissible total aeroplane mass at the start of the take-off run"
    ],
    "answer": "the maximum permissible total aeroplane mass at the start of the take-off run"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 625,
    "question": "The regulated take-off mass:",
    "options": [
      "is the lower of maximum structural take-off mass and the performance limited take-off mass",
      "is the higher of the maximum structural zero fuel mass and the performance limited take-off mass",
      "is the maximum structural take-off mass subject to any last-minute mass changes",
      "is the maximum performance limited take-off mass subject to any last-minute mass changes"
    ],
    "answer": "is the lower of maximum structural take-off mass and the performance limited take-off mass"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 626,
    "question": "The take-off mass is:",
    "options": [
      "the maximum permissible total aeroplane mass at the start of the take-off run",
      "the mass of the aeroplane including usable fuel but excluding traffic load",
      "the mass of the aeroplane including everything and everyone contained within it at the start of the take-off run",
      "the maximum mass permitted for take-off"
    ],
    "answer": "the mass of the aeroplane including everything and everyone contained within it at the start of the take-off run"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 627,
    "question": "The operating mass:",
    "options": [
      "is the lower of the structural mass and the performance limited mass",
      "is the higher of the structural mass and the performance limited mass",
      "is the actual mass of the aircraft on take-of",
      "is the dry operating mass and the fuel load"
    ],
    "answer": "is the dry operating mass and the fuel load"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 628,
    "question": "The basic empty mass is the mass of the aeroplane:",
    "options": [
      "plus non-standard items such as lubricating oil, fire extinguishers, emergency oxygen equipment etc.",
      "minus non-standard items such as lubricating oil, fire extinguishers, emergency oxygen equipment etc.",
      "plus standard items such as unusable fluids, fire extinguishers, emergency oxygen equipment, supplementary electronics etc.",
      "minus non-standard items such as unusable fluids, fire extinguishers, emergency oxygen and supplementary electronic equipment etc."
    ],
    "answer": "plus standard items such as unusable fluids, fire extinguishers, emergency oxygen equipment, supplementary electronics etc."
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 629,
    "question": "The term 'baggage' means:",
    "options": [
      "excess freight",
      "any non-human, non-animal cargo",
      "any freight or cargo not carried on the person",
      "personal property of passengers or crew members carried on an aircraft by agreement with the operator"
    ],
    "answer": "personal property of passengers or crew members carried on an aircraft by agreement with the operator"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 630,
    "question": "An operator may:",
    "options": [
      "compute the actual mass of passengers and checked baggage by using standard masses given in tables 1, 2 and 3",
      "compute the actual mass of passengers and checked baggage by weighing",
      "may compute the actual mass of passengers and checked baggage",
      "all the above"
    ],
    "answer": "all the above"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 631,
    "question": "When computing the mass of passengers and baggage: 1. personal belongings and hand baggage must be included 2. infants must be classed as children if they occupy a seat 3. standard masses include infants being carried by an adult 4. table 1, table 2 and table 3 must be used as appropriate if using standard masses for passengers and freight 5. weighing must be carried out immediately prior to boarding and at an adjacent location",
    "options": [
      "1, 2 and 5 only",
      "2 and 4 only",
      "1, 2, 3 and 5 only",
      "all the above"
    ],
    "answer": "all the above"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 632,
    "question": "When computing the mass of passengers and baggage for an aircraft with 20 seats or more: 1. standard masses of male and female in table 1 are applicable 2. if there are thirty seats or more, the 'all adult' mass values in table 1 may be used as an alternative 3. holiday charter masses apply to table 1 and table 3 if the charter is solely intended as an exclusive holiday charter 4. the standard mass for checked baggage in table 2 is applicable",
    "options": [
      "1, 2, 3 and 4 are correct",
      "1 and 2 only are correct",
      "1, 2 and 4 only are correct",
      "3 and 4 only are correct"
    ],
    "answer": "1, 2, 3 and 4 are correct"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 633,
    "question": "Refer to CAP 696 SEP. What is the CG range for normal category operations at a mass of 3000 lb?",
    "options": [
      "79.5 inches to 87.7 inches",
      "74.0 inches to 87.7 inches",
      "79.5 inches to 89.5 inches",
      "82.0 inches to 89.5 inches"
    ],
    "answer": "79.5 inches to 87.7 inches"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 634,
    "question": "Refer to CAP 696 SEP. What are the CG limits for utility operations?",
    "options": [
      "fwd. limit = 74 inches to 80.4 inches",
      "fwd. limit = 74 inches, aft limit = 80.4 inches",
      "fwd. limit = 74 inches, aft limit = 87.7 inches",
      "fwd. limit = 74 inches to 80.4 inches and aft limit = 87.7 inches"
    ],
    "answer": "fwd. limit = 74 inches, aft limit = 80.4 inches"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 635,
    "question": "Refer to CAP 696 SEP. What is the CG at the BEM?",
    "options": [
      "77 inches",
      "87 inches",
      "77.7 meters",
      "77.7 inches"
    ],
    "answer": "77.7 inches"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 636,
    "question": "Refer to CAP 696 SEP. What is the structural load limit for the floor at baggage zone 'C'?",
    "options": [
      "50 lb. per square foot",
      "100 lb. per cubic foot",
      "100 lb. per square foot",
      "100 kg per square inch"
    ],
    "answer": "100 lb. per square foot"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 637,
    "question": "Refer to CAP 696 MRJT. What stabilizer trim setting is required for take-off when the CG is 19% MAC for 5 degrees of take-off flap?",
    "options": [
      "2.75",
      "3.75",
      "4.75",
      "5.75"
    ],
    "answer": "4.75"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 638,
    "question": "Refer to CAP 696 MRJT. What is the maximum structural take-off mass?",
    "options": [
      "63060 kg",
      "62800 kg",
      "54900 kg",
      "51300 kg"
    ],
    "answer": "62800 kg"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 639,
    "question": "Refer to CAP 696 MRJT. What is the CG range for maximum zero fuel mass?",
    "options": [
      "8% MAC to 27% MAC",
      "12%MAC to 20% MAC",
      "7.5% MAC to 27.5% MAC",
      "8.5% MAC to 26% MAC"
    ],
    "answer": "8.5% MAC to 26% MAC"
  },
  {
    "category": "Mass and Balance",
    "test": 2,
    "id": 640,
    "question": "Refer to CAP 696 MRJT. Assuming the MZFM, what is the maximum allowable fuel mass for take-off?",
    "options": [
      "10015 kg",
      "10150 kg",
      "11500 kg",
      "15000 kg"
    ],
    "answer": "11500 kg"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 641,
    "question": "Use CAP 696 MEP. What performance class does the aircraft belong to?",
    "options": [
      "Performance Class 'A'",
      "Performance Class 'B'",
      "Performance Class 'C'",
      "Performance Class 'D'"
    ],
    "answer": "Performance Class 'B'"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 642,
    "question": "Use CAP 696 MEP. Where is the reference datum?",
    "options": [
      "78.4 inches forward of the wing leading edge at the inboard edge of the inboard fuel tank",
      "25.3 inches forward of the nose wheel",
      "109.8 inches forward of the main wheel",
      "All the above"
    ],
    "answer": "All the above"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 643,
    "question": "Use CAP 696 MEP. The main wheel is:",
    "options": [
      "19 inches forward of the fwd CG limit at the maximum take-of mass",
      "27.8 inches behind the fwd CG limit at a take-off mass of 3400 lb",
      "15.2 inches forward of the rear CG limit at the maximum take-of mass",
      "all the above"
    ],
    "answer": "27.8 inches behind the fwd CG limit at a take-off mass of 3400 lb"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 644,
    "question": "Use CAP 696 MEP. The nose wheel is:",
    "options": [
      "61.1 inches forward of the fwd CG limit at maximum take-off mass",
      "15.2 inches forward of the fwd CG limit at a mass of 3400 lb",
      "69.3 inches aft of the rear CG limit at maximum take-off mass",
      "all the above"
    ],
    "answer": "61.1 inches forward of the fwd CG limit at maximum take-off mass"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 645,
    "question": "Use CAP 696 MEP. What is the minimum fuel mass that must be consumed if the aircraft, having become airborne at maximum weight, decides to abort the fight?",
    "options": [
      "1260 lb",
      "280 lb",
      "237 lb",
      "202 lb"
    ],
    "answer": "237 lb"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 646,
    "question": "Use CAP 696 MEP. If the pilot has a mass of 200 lb, what is the maximum traffic load?",
    "options": [
      "1060 lb",
      "1600 lb",
      "1006 lb",
      "6001 lb"
    ],
    "answer": "1060 lb"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 647,
    "question": "Use CAP 696 MEP. Assuming the maximum zero fuel mass and maximum take-off mass, what fuel load can be carried?",
    "options": [
      "38.9 imperial gallons",
      "46.6 US gallons",
      "176.8 litres",
      "Any one of the above"
    ],
    "answer": "Any one of the above"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 648,
    "question": "Use CAP 696 MEP. The CG when the TOM is 4300 lb and the corresponding moment is 408500 lb in is:",
    "options": [
      "95 inches",
      "59 inches",
      "0.4 inches tail heavy",
      "0.6 inches rear of the aft limit"
    ],
    "answer": "95 inches"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 649,
    "question": "Use CAP 696 MEP. If the CG is 86 inches and the TOM is 4100 lb the aircraf is:",
    "options": [
      "just on the forward CG limit",
      "just outside the forward CG limit",
      "just inside the aft CG limit",
      "within the two forward limits"
    ],
    "answer": "just on the forward CG limit"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 650,
    "question": "Use CAP MRJT. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 150 inches long. What is the distance of the CG from the datum if it is found to be 16% of the MAC?",
    "options": [
      "547 inches.",
      "647 inches.",
      "747 inches.",
      "674 inches."
    ],
    "answer": "647 inches."
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 651,
    "question": "Use CAP MRJT. The CG is found to be 652.5 inches aft of the datum. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 134.1 inches long. What percentage is the CG of the MAC?",
    "options": [
      "10%.",
      "15%.",
      "20%.",
      "25%."
    ],
    "answer": "20%."
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 652,
    "question": "Use CAP MRJT. If a passenger moves from a seat position corresponding to the balance arm at zone D to a position corresponding to the balance arm at zone F, what distance will the passenger have travelled and how many seat rows will he have passed?",
    "options": [
      "255 inches and 8 seat rows.",
      "260 inches and 7 seat rows.",
      "250 inches and 9 seat rows.",
      "255 inches and 7 seat rows."
    ],
    "answer": "255 inches and 8 seat rows."
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 653,
    "question": "Use CAP MRJT. The balance arm for each of the seat zones is measured from the datum to:",
    "options": [
      "the front border line of the zone.",
      "the centre line of the zone.",
      "the rear border line of the zone.",
      "the front border line of the next zone in sequence."
    ],
    "answer": "the centre line of the zone."
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 654,
    "question": "Use CAP MRJT. What stabilizer trim setting is required for take-off when the CG is 15% MAC for 15 degrees of take-off flap?",
    "options": [
      "2.75",
      "3.5",
      "4.5",
      "3.75"
    ],
    "answer": "3.5"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 655,
    "question": "Use CAP MRJT. Assuming the standard masses have been used for both passengers and baggage, what is the mass of a full passenger and baggage load?",
    "options": [
      "13027 kg",
      "13677 kg",
      "14127 kg",
      "15127 kg"
    ],
    "answer": "13677 kg"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 656,
    "question": "Use CAP MRJT. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 134.1 inches long. What is the distance of the CG from the datum if it is found to be 34% of the MAC?",
    "options": [
      "681 inches.",
      "677 inches",
      "669 inches.",
      "674 inches."
    ],
    "answer": "677 inches"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 657,
    "question": "Use CAP MRJT. The CG is found to be 730.5 inches aft of the datum. Our MAC is 189 inches long. The leading edge of the MAC is given as 625.6 inches aft of the datum. What percentage is the CG of the MAC?",
    "options": [
      "52.4%",
      "61%",
      "48%",
      "56%"
    ],
    "answer": "56%"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 658,
    "question": "Use CAP696 SEP1. If the landing mass is 3155 lb and the trip fuel was 40 gallons, what was the ZFM if the fuel tanks held 60 gallons of fuel prior to take-off?",
    "options": [
      "3001 lb",
      "3035 lb",
      "3098 lb",
      "3111 lb"
    ],
    "answer": "3035 lb"
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 659,
    "question": "Use CAP696 SEP1. Does the retractable landing gear have a significant influence on the CG position?",
    "options": [
      "Yes, the landing gear will adversely affect the CG position.",
      "No, the landing gear will not significantly affect CG position.",
      "yes, the CG position will be significantly affected by the landing gear position.",
      "No, Landing gear never affects CG position"
    ],
    "answer": "No, the landing gear will not significantly affect CG position."
  },
  {
    "category": "Mass and Balance",
    "test": 3,
    "id": 660,
    "question": "Use CAP696 SEP1. Assuming the weight and access is not a problem, where can a cubic box of mass 500 lb be positioned?",
    "options": [
      "Zone C only",
      "Zone C and D only",
      "Zone C, D and E only",
      "Zone C, D, E and F only"
    ],
    "answer": "Zone C, D and E only"
  }
];

// Check for duplicates in Mass and Balance
const massBalQuestions = allQuestions.filter(q => q.category === 'Mass and Balance');
const massBalTexts = new Set(massBalQuestions.map(q => q.question));

const duplicates = [];
const uniqueAdditional = [];
additionalMassBal.forEach(q => {
  if (massBalTexts.has(q.question)) {
    duplicates.push(q);
  } else {
    uniqueAdditional.push(q);
  }
});

console.log('Duplicate questions in additional Mass and Balance:', duplicates.length);
duplicates.forEach(d => console.log('Duplicate:', d.question));

allQuestions.push(...uniqueAdditional);

console.log(`Total questions parsed: ${allQuestions.length}`);

// Group by category and test
const categories = {};
allQuestions.forEach(q => {
  if (!categories[q.category]) {
    categories[q.category] = {};
  }
  if (!categories[q.category][q.test]) {
    categories[q.category][q.test] = [];
  }
  categories[q.category][q.test].push(q);
});

// Function to create slug
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Icon mapping
const iconMap = {
  'Aircraft General Knowledge': 'fas fa-cogs',
  'Air Law': 'fas fa-gavel',
  'AON Aviation Knowledge': 'fas fa-plane',
  'Flight Planning and Monitoring': 'fas fa-route',
  'Human Performance and Limitations': 'fas fa-brain',
  'Instrumentation': 'fas fa-tachometer-alt',
  'Mass and Balance': 'fas fa-balance-scale',
  'Radio Navigation': 'fas fa-satellite-dish',
  'Meteorology': 'fas fa-cloud-sun',
  'Operations': 'fas fa-cog',
  'Principles of Flight': 'fas fa-wind',
  'General Navigation': 'fas fa-compass',
  'Performance': 'fas fa-chart-line'
};

// Build testData
const testData = {};
let globalId = 1;
Object.keys(categories).forEach(category => {
  const slug = createSlug(category);
  const icon = iconMap[category] || 'fas fa-question';
  const tests = [];

  Object.keys(categories[category]).sort((a,b) => parseInt(a) - parseInt(b)).forEach(testNum => {
    const questions = categories[category][testNum].map(q => ({
      id: globalId++,
      question: q.question,
      options: q.options,
      correct: q.options.indexOf(q.answer),
      explanation: q.answer
    }));

    tests.push({
      id: `${slug}-test-${testNum}`,
      name: `Test ${testNum}`,
      timeLimit: 60,
      questions: questions
    });
  });

  testData[slug] = {
    name: category,
    icon: icon,
    tests: tests
  };
});

// Write to testData_embedded.js
const output = `window.testData = ${JSON.stringify(testData, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'testData_embedded.js'), output);

console.log('testData_embedded.js created successfully.');
console.log('Categories:', Object.keys(testData).length);
Object.entries(testData).forEach(([slug, cat]) => {
  const count = cat.tests.reduce((sum, t) => sum + t.questions.length, 0);
  console.log(`${cat.name}: ${count}`);
});
console.log('Total tests:', Object.values(testData).reduce((sum, cat) => sum + cat.tests.length, 0));
console.log('Total questions:', Object.values(testData).reduce((sum, cat) => sum + cat.tests.reduce((s, t) => s + t.questions.length, 0), 0));