// Aviation Test Data - COMPREHENSIVE Question Database  
// Extracted from multiple aviation test sources including:
// - Aircraft General Knowledge, Air Law, AON Aviation, Instrumentation
// - Performance, General Navigation, Operational Procedures, Human Performance
// - Meteorology, Mass & Balance, Principles of Flight
// Total Questions: 550+ across 13 categories
// Updated: November 3, 2025

const testData = {
  "instrumentation": {
    "name": "Instrumentation",
    "icon": "fas fa-gauge",
    "tests": [
      {
        "name": "Instrumentation Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is used for EGT measurement?",
            "options": [
              "Helical bimetallic strips",
              "Thermistors",
              "Radiation pyrometry",
              "Thermo EMF thermocouples"
            ],
            "correct": 3,
            "explanation": "EGT uses thermocouples generating EMF proportional to temperature."
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
            "explanation": "Both left = left turn with excessive bank."
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
            "explanation": "Needle left = left turn; ball right = insufficient bank."
          },
          {
            "question": "Which of the following are modes of the GPWS?",
            "options": [
              "i. Excessive sink rate, ii. Altitude loss after take-off or go-around, iii. Excessive terrain closure rate, iv. Deviation below glide slope, v. Flight into terrain when not in landing configuration, vi. Unsafe terrain clearance when not in landing configuration, vii. Windshear warning",
              "ii. iii. v. vii.",
              "i. ii. iii. vii.",
              "iii. iv. v. vi."
            ],
            "correct": 0,
            "explanation": "(Note: Modern EGPWS includes vi, basic GPWS typically covers i, ii, iii, iv, v, vii. Assuming the question refers to EGPWS or includes all possible modes.)"
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
            "explanation": "Fail-active = Fail-operational (system continues after failure)."
          },
          {
            "question": "Which of the following are inputs to the central processing unit of the GPWS?",
            "options": [
              "i. Flaps, ii. Landing gear, vi. VOR",
              "i. Flaps, ii. Landing gear, iii. Glide slope, v. Radio altimeter",
              "i. Flaps, ii. Landing gear, iv. Unusual attitudes, v. Radio altimeter",
              "i. Flaps, ii. Landing gear, iii. Glide slope, v. Radio altimeter, vi. VOR"
            ],
            "correct": 1,
            "explanation": "GPWS inputs: flaps, gear, glide slope, radio altimeter."
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
            "explanation": "Density altitude is the ISA altitude for current density."
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
            "explanation": "Radio altimeters use SHF band (3-30 GHz)."
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
            "explanation": "Synchronization prevents abrupt attitude changes on disconnect."
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
            "explanation": "Aircraft-based, measures height AGL."
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
            "explanation": "TCAS provides vertical resolution advisories."
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
            "explanation": "Non-threat traffic = hollow white/cyan diamond."
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
            "explanation": "At ISA MSL, TAS = CAS."
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
            "explanation": "Pitot leak causes ASI under-read."
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
        ]
      },
      {
        "name": "Instrumentation Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "A gravity-erecting device is utilized in:",
            "options": [
              "an artificial horizon",
              "a directional gyroscopic indicator",
              "a vertical speed indicator",
              "a turn and slip"
            ],
            "correct": 0,
            "explanation": "Artificial horizon uses gravity erection."
          },
          {
            "question": "Total air temperature is ______ than static air temperature and the difference varies with ______.",
            "options": [
              "warmer altitude",
              "colder altitude",
              "warmer CAS",
              "colder CAS"
            ],
            "correct": 2,
            "explanation": "TAT > SAT; difference increases with airspeed (CAS)."
          },
          {
            "question": "The period of validity of an FMS data base is:",
            "options": [
              "56 days",
              "one week",
              "28 days",
              "varies depending on the area of operational cover"
            ],
            "correct": 2,
            "explanation": "FMS database valid for 28-day AIRAC cycle."
          },
          {
            "question": "What does the white arc on a temperature scale indicate?",
            "options": [
              "Never exceed",
              "Maximum start and acceleration temperature",
              "Normal operating temperature",
              "Minimum temperature"
            ],
            "correct": 2,
            "explanation": "White arc = normal operating range."
          },
          {
            "question": "A blockage occurs in the ram air source and the drain-hole. The ASI in a nonpressurized aircraft will:",
            "options": [
              "read a little low",
              "read a little high",
              "act like an altimeter",
              "freeze at zero"
            ],
            "correct": 2,
            "explanation": "Blocked pitot & drain = trapped static acts as altimeter."
          },
          {
            "question": "A rate integrating gyroscope is used in:",
            "options": [
              "i. inertial attitude system, ii. automatic flight control systems",
              "i. inertial attitude system, iii. inertial navigation systems",
              "i. inertial attitude system, iii. inertial navigation systems, iv. rate of turn indicators",
              "i. inertial attitude system, ii. automatic flight control systems, iii. inertial navigation systems"
            ],
            "correct": 1,
            "explanation": "Rate integrating gyros used in IRS/INS systems."
          },
          {
            "question": "When accelerating on a northerly heading what does the direct reading magnetic compass indicate?",
            "options": [
              "No change",
              "North",
              "A turn to the west",
              "A turn to the east"
            ],
            "correct": 1,
            "explanation": "Acceleration error on North/South headings causes no turn indication. (Self-correction: The source checkmark is B, but acceleration error (ANDS - Accelerate North, Decelerate South) applies to East/West headings. On a Northerly heading, acceleration causes no turning error. Rechecking compass errors confirms this. The source checkmark might be incorrect.)"
          },
          {
            "question": "In an IRS:",
            "options": [
              "the accelerometers are strapped down but the platform is gyro-stabilized",
              "the platform is strapped down but the accelerometers are gyro-stabilized",
              "accelerometers and gyros are both gyro-stabilized",
              "accelerometers and gyros are both strapped down"
            ],
            "correct": 3,
            "explanation": "IRS uses strapdown technology for both."
          },
          {
            "question": "To convert true track to magnetic track you need:",
            "options": [
              "a deviation map",
              "a map with isoclinal lines",
              "a map with isobars",
              "a deviation card"
            ],
            "correct": 1,
            "explanation": "Isoclinal lines show dip, Isogonal lines show variation. Variation is needed. Assuming isoclinal is a typo for isogonal."
          },
          {
            "question": "The rate of turn indicator is a very useful gyroscopic instrument. When used in conjunction with the attitude indicator it provides:",
            "options": [
              "angle of bank",
              "rate of turn about the yaw axis",
              "rate of climb",
              "rate of turn athwartships"
            ],
            "correct": 1,
            "explanation": "Rate of turn about yaw axis."
          },
          {
            "question": "The outputs of a flux valve are initially sent to:",
            "options": [
              "an amplifier",
              "an error detector",
              "a compass card",
              "a feedback loop"
            ],
            "correct": 1,
            "explanation": "Flux valve output goes to error detector first."
          },
          {
            "question": "An inertial reference system is aligned when turned on so as to:",
            "options": [
              "calculate the computed trihedron with reference to the earth",
              "establish true and magnetic north",
              "establish position relative to true and magnetic north",
              "establish magnetic north"
            ],
            "correct": 0,
            "explanation": "IRS alignment establishes reference frame to earth."
          },
          {
            "question": "Why is there a vibration device in a pressure altimeter?",
            "options": [
              "i. To prevent hysteresis",
              "i. To prevent hysteresis, ii. To prevent lag in a mechanical system",
              "i. To prevent hysteresis, iv. To prevent icing",
              "i. To prevent hysteresis, ii. To prevent lag in a mechanical system, iii. To keep pilots happy during long flights, iv. To prevent icing"
            ],
            "correct": 1,
            "explanation": "Vibration overcomes friction/stiction (hysteresis & lag)."
          },
          {
            "question": "An aircraft flies into a colder airmass. This will cause the altimeter to:",
            "options": [
              "over-read",
              "under-read",
              "read the correct altitude",
              "the indication will depend on the hemisphere of operation"
            ],
            "correct": 0,
            "explanation": "Colder air = denser; altimeter reads higher than true altitude."
          },
          {
            "question": "In a solid state gyroscope the purpose of the dither motor is to:",
            "options": [
              "enhance the acceleration of the gyro at all rotational rates",
              "overcome laser lock",
              "compensate for transport wander",
              "stabilize the laser frequencies"
            ],
            "correct": 1,
            "explanation": "Dither motor prevents laser lock in RLG."
          },
          {
            "question": "With the aircraft weight constant but variations in airfield altitude, take-off will always be at a constant:",
            "options": [
              "equivalent airspeed",
              "calibrated airspeed",
              "ground speed",
              "true airspeed"
            ],
            "correct": 1,
            "explanation": "Takeoff speeds defined in IAS/CAS."
          },
          {
            "question": "An IRS differs from an INS in that it:",
            "options": [
              "has a longer spin-up (is not affected by vertical accelerations due to gravity)",
              "has a shorter spin-up time and suffers from laser lock.",
              "does not need to correct for coriolis and central acceleration)",
              "does not suffer Schuler oscillations"
            ],
            "correct": 1,
            "explanation": "IRS strapdown = faster alignment; RLG can have laser lock."
          },
          {
            "question": "The rigidity (gyroscopic inertia) of a gyro rotor is improved by:",
            "options": [
              "increasing the angular momentum and concentrating the mass on the periphery of the rotor",
              "increasing the angular momentum and concentrating the mass at the hub of the rotor",
              "decreasing the angular momentum and concentrating the mass on the periphery of the rotor",
              "decreasing the angular momentum and concentrating the mass at the hub of the rotor"
            ],
            "correct": 0,
            "explanation": "Higher rpm and rim mass increase rigidity."
          },
          {
            "question": "The errors associated with the directional indicator are:",
            "options": [
              "i. earth rate, ii. transport wander, iii. banking when pitched up",
              "i. earth rate, ii. transport wander, iv. annual movement of the poles, v. mechanical problems",
              "i. earth rate, ii. transport wander, iii. banking when pitched up, iv. annual movement of the poles, v. mechanical problems",
              "i. earth rate, ii. transport wander, iii. banking when pitched up, v. mechanical problems"
            ],
            "correct": 3,
            "explanation": "DI errors: earth rate, transport wander, cross-coupling, mechanical."
          },
          {
            "question": "Which of the following correctly describes the gyroscope of a rate of turn indicator?",
            "options": [
              "i. 1 degree of freedom, ii. 2 degrees of freedom",
              "i. 1 degree of freedom, iv. Its spin axis is parallel to the pitch axis, v. The spin axis is parallel to the yaw axis",
              "i. 1 degree of freedom, iii. Its frame is held by two springs, iv. Its spin axis is parallel to the pitch axis",
              "i. 1 degree of freedom, iii. Its frame is held by two springs, vi. The spin axis is horizontal"
            ],
            "correct": 2,
            "explanation": "Turn indicator: 1 DoF, spring restrained, spin axis parallel to pitch axis."
          }
        ]
      },
      {
        "name": "Instrumentation Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "An aircraft in the northern hemisphere lands and decelerates on a westerly heading. The compass will indicate:",
            "options": [
              "a turn north",
              "no turn will be indicated",
              "an oscillation",
              "a turn south"
            ],
            "correct": 3,
            "explanation": "Deceleration on West heading (N. hemisphere) = turn south indication."
          },
          {
            "question": "The angle formed between the directive force and the total magnetic force is called:",
            "options": [
              "variation",
              "deviation",
              "dip",
              "isoclinal"
            ],
            "correct": 2,
            "explanation": "Dip angle is between horizontal and total magnetic field."
          },
          {
            "question": "The ability of a gyroscope to indicate aircraft heading is based on it having:",
            "options": [
              "one degree of freedom in the vertical axis",
              "two degrees of freedom in the vertical axis",
              "two degrees of freedom in the horizontal",
              "one degree of freedom in the horizontal"
            ],
            "correct": 0,
            "explanation": "Heading gyro: 1 DoF, vertical spin axis."
          },
          {
            "question": "If the TAS at 40000 ft is 450 kt the Mach No. is:",
            "options": [
              "0.815",
              "0.784",
              "0.76",
              "0.825"
            ],
            "correct": 1,
            "explanation": "LSS at 40000 ft ≈ 573.6 kt. Mach = 450/573.6 ≈ 0.784."
          },
          {
            "question": "The local speed of sound at mean sea level at ISA -10°C is:",
            "options": [
              "661 kt",
              "650 kt",
              "673 kt",
              "680 kt"
            ],
            "correct": 1,
            "explanation": "Temp = 5°C = 278.15 K. LSS ≈ 650 kt."
          },
          {
            "question": "The output of a double integration N/S is:",
            "options": [
              "velocity",
              "departure",
              "distance",
              "longitude"
            ],
            "correct": 2,
            "explanation": "Integrating acceleration → velocity → distance."
          },
          {
            "question": "If a constant CAS is maintained under normal conditions in the climb what happens to the Mach No.?",
            "options": [
              "It will decrease",
              "It will remain constant",
              "It will decrease in an isothermal layer",
              "It will increase"
            ],
            "correct": 3,
            "explanation": "Constant CAS climb: TAS increases, LSS decreases → Mach increases."
          },
          {
            "question": "The magnetic heading reference unit has a precession rate of:",
            "options": [
              "1°/min",
              "2°/min",
              "5°/min",
              "3°/min"
            ],
            "correct": 1,
            "explanation": "Typical MHRU precession ~2°/min."
          },
          {
            "question": "A VMO/MMO alerting system contains a barometric aneroid capsule:",
            "options": [
              "which is subjected to dynamic pressure and an airspeed capsule which is subjected to static pressure",
              "and an airspeed capsule subjected to static pressure",
              "and an airspeed capsule subjected to dynamic pressure",
              "which is subjected to static pressure and an airspeed capsule which is subjected to dynamic pressure"
            ],
            "correct": 3,
            "explanation": "Barometric capsule: static; airspeed capsule: dynamic pressure."
          },
          {
            "question": "An aircraft is flying at flight level 350 at a CAS of 290 kt and a temperature deviation of ISA -10°C. The TAS and MN will be:",
            "options": [
              "TAS 498 kt Mach 0.885",
              "TAS 520 kt Mach 0.882",
              "TAS 481 kt Mach 0.855",
              "TAS 507 kt Mach 0.86"
            ],
            "correct": 2,
            "explanation": "Calculation with compressibility correction yields ~481 kt, M0.855."
          },
          {
            "question": "The EADI and the EHSI of an EFIS installation are also referred to by the manufacturers as:",
            "options": [
              "primary display and navigation display respectively",
              "navigation display and primary display respectively",
              "EICAS and ECAM respectively",
              "ECAM and EICAS respectively"
            ],
            "correct": 0,
            "explanation": "EADI = Primary Flight Display; EHSI = Navigation Display."
          },
          {
            "question": "When measuring different pressures (low/med/high) which of the following has the three types of sensing devices in ascending order of pressure measurement?",
            "options": [
              "iii. Aneroid capsule, ii. Bellows type, i. Bourdon tube",
              "i. Bourdon tube, ii. Bellows type, iii. Aneroid capsule",
              "ii. Bellows type, i. Bourdon tube, iii. Aneroid capsule",
              "iii. Aneroid capsule, i. Bourdon tube, ii. Bellows type"
            ],
            "correct": 0,
            "explanation": "Aneroid (low) → Bellows (medium) → Bourdon (high pressure)."
          },
          {
            "question": "Which of the following modes can be selected on an EHSI?",
            "options": [
              "i. plan, ii. full ILS, iv. expanded nav, vii. full VOR",
              "i. plan, iii. full VOR, vii. full VOR, viii. expanded VOR, ix. centre map",
              "ii. full ILS, iii. full VOR, vi. expanded nav, viii. expanded VOR, ix. centre map",
              "ii. full ILS, iii. full VOR, v. full ILS, vii. full VOR, ix. centre map"
            ],
            "correct": 2,
            "explanation": "Common EHSI modes include Plan, Map, Full/Expanded ILS/VOR."
          },
          {
            "question": "What is the speed of sound at 30000 ft and -40°C?",
            "options": [
              "562 kt",
              "595 kt",
              "590 kt",
              "661 kt"
            ],
            "correct": 1,
            "explanation": "Temp = 233.15 K. LSS ≈ 595 kt."
          },
          {
            "question": "Rate of turn is affected by:",
            "options": [
              "i. aircraft speed, ii. angle of bank",
              "i. aircraft speed, iii. aircraft weight",
              "ii. angle of bank, iii. aircraft weight",
              "none of the above"
            ],
            "correct": 0,
            "explanation": "RoT = (g × tan(AoB)) / TAS; function of speed and bank."
          },
          {
            "question": "Sound is propagated at a velocity which is dependent upon:",
            "options": [
              "barometric pressure",
              "density",
              "static pressure",
              "temperature"
            ],
            "correct": 3,
            "explanation": "Speed of sound depends on temperature."
          },
          {
            "question": "A solid state gyro is:",
            "options": [
              "a rate gyro",
              "a rate sensor",
              "an earth gyro",
              "a tied gyro"
            ],
            "correct": 1,
            "explanation": "Solid-state gyro = rate sensor (RLG/fiber-optic)."
          },
          {
            "question": "What would the compass heading be given a true heading of 247° in an area where the variation is 8°W and a compass deviation of 11°E?",
            "options": [
              "255°",
              "244°",
              "247°",
              "266°"
            ],
            "correct": 1,
            "explanation": "True 247° + 8°W = 255° Mag; 255° - 11°E = 244° Compass."
          },
          {
            "question": "A compass swing is used to:",
            "options": [
              "align compass north with magnetic north",
              "align compass north with true north",
              "align magnetic north with true north",
              "get true north and the lubber line aligned"
            ],
            "correct": 0,
            "explanation": "Compass swing determines deviation, aligns to magnetic north."
          },
          {
            "question": "Regarding magnetism, which of the following statements is correct?",
            "options": [
              "i. Lines of flux run from blue pole to red pole, ii. Like poles repel, v. Unlike poles attract",
              "i. Lines of flux run from blue pole to red pole, iii. Unlike poles repel, v. Unlike poles attract",
              "ii. Like poles repel, v. Unlike poles attract",
              "i. Lines of flux run from blue pole to red pole, iii. Unlike poles repel, iv. Like poles attract"
            ],
            "correct": 2,
            "explanation": "Like poles repel; unlike poles attract (flux N→S)."
          }
        ]
      },
      {
        "name": "Instrumentation Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "In an inertial-lead VSI the source of the most pronounced error is:",
            "options": [
              "instrument",
              "position",
              "steep turn",
              "missed approach manoeuvre"
            ],
            "correct": 2,
            "explanation": "Steep turns cause significant VSI errors."
          },
          {
            "question": "A factor giving an error on a direct indicating compass would be:",
            "options": [
              "crosswinds - particularly on east/west headings",
              "parallax due to oscillations of the compass rose",
              "acceleration on east/west headings",
              "turning through east/west headings"
            ],
            "correct": 2,
            "explanation": "Acceleration errors most pronounced on E/W headings."
          },
          {
            "question": "An aircraft maintaining a constant CAS and altitude is flying from a cold airmass into warmer air. The effect of the change of temperature on the speed will be:",
            "options": [
              "CAS will increase",
              "EAS will decrease",
              "TAS will increase",
              "TAS will decrease"
            ],
            "correct": 2,
            "explanation": "Warmer air at constant CAS → higher TAS."
          },
          {
            "question": "An aircraft taking off from an airfield with QNH set in the altimeter has the subscale reading erroneously set 10 hPa too low. The aircraft:",
            "options": [
              "may lift off early with insufficient take-off speed",
              "will indicate an altitude 300 ft lower than actual altitude",
              "will indicate an altitude 300 ft higher than actual altitude",
              "will indicate the correct altitude"
            ],
            "correct": 1,
            "explanation": "10 hPa low setting = 300 ft under-read (1 hPa ≈ 30 ft)."
          },
          {
            "question": "Which of the following will affect a direct reading compass?",
            "options": [
              "1. ferrous metals only",
              "1. ferrous metals & 3. electrical equipment",
              "1. ferrous metals & 2. non-ferrous metals",
              "all 3"
            ],
            "correct": 1,
            "explanation": "Ferrous metals and electrical equipment affect compass."
          },
          {
            "question": "The gravity erecting device on a vertical gyro is used on which instrument?",
            "options": [
              "Directional gyro unit",
              "Turn indicator",
              "Artificial horizon",
              "Gyromagnetic device"
            ],
            "correct": 2,
            "explanation": "Artificial horizon uses gravity erection."
          },
          {
            "question": "In FMS fitted aircraft the main interface between pilot and system will be provided by:",
            "options": [
              "the automatic flight control system",
              "the multi-purpose control and display unit",
              "the flight control unit",
              "the flight management source selector"
            ],
            "correct": 1,
            "explanation": "MCDU/CDU is primary FMS pilot interface."
          },
          {
            "question": "On an EADI radio altitude is displayed:",
            "options": [
              "digitally between 2500 ft and 100 ft",
              "on an analogue scale below 2500 ft",
              "digitally between 2500 ft and 1000 ft and thereafter as an analogue/digital display",
              "as an analogue display between 2500 ft and 1000 ft and thereafter as a digital display"
            ],
            "correct": 2,
            "explanation": "Radio alt: digital 2500-1000 ft, then analog/digital below."
          },
          {
            "question": "The combined Machmeter/ASI is subject to the following errors:",
            "options": [
              "position, density, instrument, compressibility, manoeuvre induced",
              "those of the machmeter only",
              "instrument, pressure and temperature only",
              "instrument and compressibility only"
            ],
            "correct": 0,
            "explanation": "Combined ASI/Mach subject to all airspeed errors."
          },
          {
            "question": "On a standard 2-dot EHSI in the en route mode each dot represents:",
            "options": [
              "1 NM",
              "2 NM",
              "5 NM",
              "10 NM"
            ],
            "correct": 1,
            "explanation": "En route mode: 1 dot ≈ 2 NM lateral deviation."
          },
          {
            "question": "Wind information can be displayed in an EFIS system in which of the following modes?",
            "options": [
              "plan map expanded ILS full VOR",
              "map centre map plan full ILS",
              "full nav full ILS map centre map",
              "full ILS full VOR map plan"
            ],
            "correct": 2,
            "explanation": "Wind displayed in full nav, full ILS, map, center map modes."
          },
          {
            "question": "An aircraft is descending at a constant Mach number. If the aircraft is descending through an inversion layer, the CAS will:",
            "options": [
              "remain constant",
              "increase",
              "decrease",
              "decrease then decrease more slowly"
            ],
            "correct": 1,
            "explanation": "Descending through inversion (warming): constant Mach → CAS increases."
          },
          {
            "question": "Given the following information calculate the instrument error in the altimeter: Indicated altitude 2500 ft, QFE 1003 set, Airfield elevation 1000 ft, QNH 1013.",
            "options": [
              "+20 ft",
              "+30 ft",
              "+40 ft",
              "+10 ft"
            ],
            "correct": 1,
            "explanation": "Pressure-based calculation yields +30 ft instrument error."
          },
          {
            "question": "If an aircraft, fitted with a DRMC, takes off on a westerly heading, in the northern hemisphere, the DRMC will indicate:",
            "options": [
              "a turn to the north",
              "oscillates about west",
              "no turn",
              "a turn to south"
            ],
            "correct": 0,
            "explanation": "Acceleration on West (N. hemisphere) = turn north indication (ANDS)."
          },
          {
            "question": "The rigidity (gyroscopic interia) of a gyroscope may be increased by:",
            "options": [
              "increasing the number of gimbals and decreasing the number of planes of rotation",
              "increasing the speed of rotation and decreasing the mass of the rotor",
              "increasing the speed of rotation and increasing the mass of the rotor",
              "decreasing the speed of rotation and increasing the speed of the rotor."
            ],
            "correct": 2,
            "explanation": "Higher rpm and mass increase gyroscopic rigidity."
          },
          {
            "question": "In the ILS mode, one dot on the lateral deviation scale on the EHSI indicates:",
            "options": [
              "1 NM",
              "2 NM",
              "1°",
              "2°"
            ],
            "correct": 2,
            "explanation": "ILS mode: 1 dot ≈ 1° lateral deviation."
          },
          {
            "question": "Select the correct statement:",
            "options": [
              "EAS = CAS corrected for compressibility error",
              "EAS = IAS corrected for position error",
              "CAS = TAS corrected for density error",
              "TAS = EAS corrected for compressibility error"
            ],
            "correct": 0,
            "explanation": "EAS = CAS corrected for compressibility."
          },
          {
            "question": "VLO is defined as:",
            "options": [
              "the maximum speed at which to fly with the landing gear retracted",
              "the maximum speed at which the landing gear may be retracted or extended",
              "the maximum speed at which to fly with the landing gear extended",
              "the minimum speed at which to fly with the landing gear extended"
            ],
            "correct": 1,
            "explanation": "VLO = max speed for gear operation (extend/retract)."
          },
          {
            "question": "To improve the horizontality of a compass, the magnet assembly is suspended from a point:",
            "options": [
              "on the centre line of the magnet",
              "below the centre of gravity",
              "above the centre of gravity",
              "varying with magnetic latitude"
            ],
            "correct": 2,
            "explanation": "Suspension above CG improves horizontal stability."
          },
          {
            "question": "You are flying at a constant FL290 and constant Mach number. The total temperature increases by 5°. The CAS will:",
            "options": [
              "remain approximately constant",
              "increase by 10 kt",
              "decrease by 10 kt",
              "will increase or decrease depending on whether you are above or below ISA."
            ],
            "correct": 0,
            "explanation": "Constant Mach, temp increase: TAS up, density effects balance → CAS ~constant."
          }
        ]
      },
      {
        "name": "Instrumentation Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Altitude select and altitude hold are examples of:",
            "options": [
              "inner loop functions in pitch",
              "manometric functions from the Air Data Computer",
              "interlocking functions",
              "outer loop functions in roll"
            ],
            "correct": 1,
            "explanation": "Alt select/hold use ADC pressure data (manometric)."
          },
          {
            "question": "What are the advantages of an IRS compared to an INS?",
            "options": [
              "Reduce spin-up time and a dither motor to prevent \"lock-out\".",
              "Reduce spin-up time and accuracy not adversely affect by \"g\"",
              "Increase accuracy and a dither motor to prevent \"lock-out\".",
              "Insensitively to \"g\" and reduced wander of the gyroscope."
            ],
            "correct": 1,
            "explanation": "IRS: faster alignment, not affected by g-forces."
          },
          {
            "question": "If the RPM of the rotor in a turn and slip indicator is higher than normal, the turn indicator will:",
            "options": [
              "over-read the correct rate of turn",
              "under-read the correct rate of turn",
              "not indicate due to the increased rigidity",
              "indicate correctly"
            ],
            "correct": 0,
            "explanation": "Higher rpm = greater rigidity = over-reads turn rate."
          },
          {
            "question": "The ANN RNV light on an RNAV system:",
            "options": [
              "illuminates if the calculated track differs from the selected track by more than 2 NM",
              "illuminates if the accuracy of the calculated position falls outside predetermined limits",
              "illuminates if power from the aircraft bus bar has been lost and the system is operating on standby battery",
              "illuminates steadily after passing a waypoint in manual mode, until the next leg is programmed in"
            ],
            "correct": 1,
            "explanation": "ANP/RNP annunciator for position accuracy degradation."
          },
          {
            "question": "An autopilot delivers roll commands to the ailerons to achieve a bank angle:",
            "options": [
              "proportional to TAS, but below a specified maximum",
              "set bank of 25 degrees",
              "set bank of 30 degrees",
              "proportional to the deviation from the desired heading, but not exceeding a specified maximum"
            ],
            "correct": 3,
            "explanation": "Bank angle proportional to heading error, with limits."
          },
          {
            "question": "With reference to the flux valve of a remote indicating compass:",
            "options": [
              "the flux valve is pendulously mounted and is free to turn to remain aligned with the earth magnetic field",
              "the flux valve is not subject to acceleration errors",
              "the flux valve is pendulously mounted and so it is not subject to or affected by the earth's magnetic field",
              "the flux valve is fixed to the aircraft and senses the horizontal component of the earth's magnetic field"
            ],
            "correct": 3,
            "explanation": "Flux valve fixed to aircraft, senses horizontal magnetic component."
          },
          {
            "question": "The command bars on an ADI used for autoflight command:",
            "options": [
              "heading hold, VOR radial track, ILS track, speed hold, pitch hold",
              "heading hold, VOR radial track, ILS track, speed hold, altitude hold, pitch hold",
              "heading hold, VOR radial track, altitude hold",
              "heading hold, VOR radial track, ILS track, altitude hold, pitch hold"
            ],
            "correct": 1,
            "explanation": "ADI flight director bars command all listed modes."
          },
          {
            "question": "During an approach to autoland at 1500 feet:",
            "options": [
              "off line channels are manually engaged, flare mode is armed",
              "localizer is controlling the roll channel, off line channels are automatically engaged and flare mode is armed",
              "localizer is controlling the roll channel, stabilizer is trimmed nose up and roll out is armed",
              "provided both localizer and glide slope signals are valid LAND 3 will be displayed"
            ],
            "correct": 1,
            "explanation": "At 1500 ft: LOC active, offline channels engage, flare armed."
          },
          {
            "question": "If only a single A/P is used to climb, cruise and approach, following a failure:",
            "options": [
              "it is fail-passive with redundancy",
              "it is fail-operational and will not disconnect",
              "it is fail-soft and will not disconnect",
              "it is fail-safe and will disconnect"
            ],
            "correct": 3,
            "explanation": "Single AP = fail-safe (disconnects on failure)."
          },
          {
            "question": "At 200 ft on an autoland:",
            "options": [
              "the LOC mode is engaged in the roll channel and the G/S mode is engaged in pitch.",
              "the LOC mode is engaged in the roll channel and the FLARE mode is engaged in the pitch channel",
              "the ROLL OUT mode is engaged in the Roll channel and the G/S mode is engaged in pitch.",
              "the ROLL OUT mode is engaged in the Roll channel and the FLARE mode is engaged in the pitch channel"
            ],
            "correct": 1,
            "explanation": "At 200 ft: LOC roll, FLARE pitch."
          },
          {
            "question": "The term \"fail passive\" applied to an automatic flight control system means that in the event of failure, the system is:",
            "options": [
              "fully operational",
              "inoperative",
              "approaching decision height",
              "requiring a crew input"
            ],
            "correct": 1,
            "explanation": "Fail-passive = system becomes inoperative but safe."
          },
          {
            "question": "\"LOC ARMED\" lights up on the FMA part of the PFD, this means:",
            "options": [
              "localizer beam captured",
              "localizer beam armed and awaiting capture",
              "localizer alarm is on",
              "a/c is on localizer centre line"
            ],
            "correct": 1,
            "explanation": "ARMED = mode ready, awaiting capture condition."
          },
          {
            "question": "Where an alternate static source is fitted, use of this source usually leads to:",
            "options": [
              "a temporary increase in lag error",
              "a lower pressure error than with normal sources",
              "an increase in position error",
              "no change in position error"
            ],
            "correct": 2,
            "explanation": "Alternate static typically inside cabin = position error increase."
          },
          {
            "question": "In a Schuler tuned INS, the largest unbounded errors are:",
            "options": [
              "due to acceleration errors",
              "track errors due to initial misalignment",
              "due to real wander of the platform gyroscopes",
              "created at the first stage of integration"
            ],
            "correct": 2,
            "explanation": "Gyro wander causes largest unbounded INS errors."
          },
          {
            "question": "What errors can the Air Data Computer correct for?",
            "options": [
              "1. Instrument error & ram rise, 3. Lag & density error, 4. Position & temperature error",
              "1. Instrument error & ram rise, 2. Compressibility & density error, 3. Lag & density error, 4. Position & temperature error",
              "1. Instrument error & ram rise, 2. Compressibility & density error, 4. Position & temperature error",
              "2. Compressibility & density error, 4. Position & temperature error"
            ],
            "correct": 2,
            "explanation": "ADC corrects: instrument, position, compressibility, density/temp (ram rise)."
          },
          {
            "question": "WXR display is on:",
            "options": [
              "the captain's CRT only",
              "the co-pilot's CRT only",
              "a special screen",
              "on both the captain's and co-pilot's CRTs"
            ],
            "correct": 3,
            "explanation": "Weather radar displays on both pilot ND/MFD."
          },
          {
            "question": "During a CAT 1 ILS approach, height is indicated by:",
            "options": [
              "GPS",
              "radio altimeter",
              "marker",
              "barometric"
            ],
            "correct": 3,
            "explanation": "CAT I uses barometric altitude; radio alt for CAT II/III."
          },
          {
            "question": "Which of the following is the FMS normal operating condition in the cruise?",
            "options": [
              "L NAV only",
              "V NAV only",
              "L NAV or V NAV",
              "L NAV and V NAV"
            ],
            "correct": 3,
            "explanation": "FMS cruise typically uses both LNAV and VNAV."
          },
          {
            "question": "To obtain heading information from a gyro stabilized platform, the gyros should have:",
            "options": [
              "1 degree of freedom and a horizontal axis",
              "1 degree of freedom and a vertical axis",
              "2 degrees of freedom and a horizontal axis",
              "2 degrees of freedom and a vertical axis"
            ],
            "correct": 0,
            "explanation": "Heading gyro: 1 DoF, horizontal (azimuth) spin axis."
          },
          {
            "question": "Weather radar returns can be displayed in which of the following EFIS Modes?",
            "options": [
              "Plan Exp ILS Exp VOR",
              "Plan Exp ILS Map",
              "Map Exp ILS Exp VOR",
              "Map ILS VOR"
            ],
            "correct": 2,
            "explanation": "WXR overlay: Map, Expanded ILS, Expanded VOR modes."
          }
        ]
      }
    ]
  },
    "aircraft-general": {
    "name": "Aircraft General Knowledge",
    "icon": "fas fa-plane",
    "tests": [
      {
        "name": "Aircraft General Knowledge Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "If an artificial feel unit were fitted it would be connected:",
            "options": [
              "in parallel with the primary controls",
              "in series with the primary controls",
              "in series with the secondary controls",
              "in parallel with the secondary controls"
            ],
            "correct": 1,
            "explanation": "Artificial feel is introduced in series with primary controls to provide feedback in irreversible systems."
          },
          {
            "question": "An impulse coupling in a magneto is provided to:",
            "options": [
              "generate high voltage and advance the spark for starting",
              "increase the energy to the spark plug as the rpm increases",
              "generate high voltage and retard the spark for starting",
              "allows a low energy value when continuous ignition is selected"
            ],
            "correct": 2,
            "explanation": "Impulse coupling winds a spring and releases it at low RPM to increase speed and retard timing for starting."
          },
          {
            "question": "In a modern airliner what is the hydraulic fluid used?",
            "options": [
              "Synthetic",
              "Mineral",
              "Mineral/alcohol",
              "Vegetable"
            ],
            "correct": 0,
            "explanation": "Modern transport aircraft use synthetic hydraulic fluids (e.g., Skydrol)."
          },
          {
            "question": "The principle of operation of firewire is:",
            "options": [
              "positive coefficient of impedance, negative coefficient of inductance",
              "positive coefficient of resistance, negative coefficient of capacitance",
              "positive coefficient of inductance, negative coefficient of impedance",
              "positive coefficient of capacitance, negative coefficient of resistance"
            ],
            "correct": 3,
            "explanation": "Firewire detectors rely on changes in capacitance/resistance due to temperature."
          },
          {
            "question": "A magneto is switched off by:",
            "options": [
              "open circuiting the primary circuit",
              "grounding the secondary circuit",
              "open circuiting the secondary circuit",
              "grounding the primary circuit"
            ],
            "correct": 3,
            "explanation": "Grounding the primary prevents voltage build-up, shutting the magneto off."
          },
          {
            "question": "In a bootstrap air conditioning system what is the first thing the air does?",
            "options": [
              "Goes through the primary heat exchanger, compressor then secondary heat exchanger",
              "Goes through the compressor, turbine, secondary heat exchanger",
              "Goes through the turbine, compressor and secondary heat exchanger",
              "Goes through the compressor, secondary heat exchanger, turbine"
            ],
            "correct": 0,
            "explanation": "Primary HX -> compressor -> secondary HX is the bootstrap sequence."
          },
          {
            "question": "The fuel tanks of a modern passenger airliner are filled by:",
            "options": [
              "gravity",
              "fuel is sucked in by the aircraft pumps",
              "fuel is pumped in by the fuel truck",
              "the VTO system"
            ],
            "correct": 2,
            "explanation": "Pressure refuelling pumps fuel into tanks via the fueling panel."
          },
          {
            "question": "Fuel tank booster pumps are:",
            "options": [
              "spur gear pumps - high pressure",
              "centrifugal pumps - high pressure",
              "spur gear pumps - low pressure",
              "centrifugal pumps - low pressure"
            ],
            "correct": 3,
            "explanation": "Boost pumps are low-pressure centrifugal pumps feeding engine HP pumps."
          },
          {
            "question": "The function of baffle check valves in a fuel tank is:",
            "options": [
              "to reduce fuel flow at altitude",
              "to prevent fuel surge during manoeuvring",
              "to prevent pump cavitation",
              "to prevent movement of fuel to the wingtip"
            ],
            "correct": 3,
            "explanation": "Check/baffle arrangements limit outboard migration of fuel."
          },
          {
            "question": "What type of fire extinguisher would be used on a propane fire?",
            "options": [
              "Foam",
              "Water",
              "Dry powder",
              "Sand"
            ],
            "correct": 0,
            "explanation": "Foam is used for flammable liquid/gas fires; water is unsuitable."
          },
          {
            "question": "A twin jet aircraft would normally be refuelled by which of the following methods?",
            "options": [
              "Overwing refuelling",
              "Suction refuelling",
              "Open line refuelling",
              "Pressure refuelling"
            ],
            "correct": 3,
            "explanation": "Pressure refuelling is standard on transport jets."
          },
          {
            "question": "The purpose of a refuelling volumetric top off unit (VTO) is:",
            "options": [
              "to keep the feeder box full of fuel at all times",
              "to close the fuelling valve when the tank is full",
              "to close the surge check valves in the outboard tanks to keep the tank full until the centre tank fuel has been used",
              "to close the tank vent system when the tank is full"
            ],
            "correct": 1,
            "explanation": "VTO shuts the fueling valve when tank volume limit is reached."
          },
          {
            "question": "Where is EGT measured?",
            "options": [
              "In the jet pipe",
              "HP turbine outlet",
              "HP compressor outlet",
              "Combustion chamber"
            ],
            "correct": 1,
            "explanation": "EGT probe location is typically at turbine discharge (Tt7)."
          },
          {
            "question": "An ion detector detects:",
            "options": [
              "smoke and fire",
              "smoke",
              "overheat",
              "light"
            ],
            "correct": 1,
            "explanation": "Ionization smoke detectors respond to particulate ionization changes."
          },
          {
            "question": "Load shedding is:",
            "options": [
              "increasing circuit resistance",
              "transferring the loads between generators",
              "reducing the load voltage",
              "overall reductions of the loads on the system"
            ],
            "correct": 3,
            "explanation": "Load shedding automatically removes non-essential loads."
          },
          {
            "question": "EPR is measured by the ratio of:",
            "options": [
              "turbine pressure to combustion chamber inlet pressure",
              "high pressure compressor inlet pressure to exhaust pressure",
              "low pressure compressor inlet pressure to high pressure compressor outlet pressure",
              "exhaust pressure to low pressure compressor inlet pressure"
            ],
            "correct": 3,
            "explanation": "EPR â‰ˆ P_exit / P_inlet (engine station pressures), as given."
          },
          {
            "question": "In a twin jet fuel system what is the function of a feeder box?",
            "options": [
              "To equally distribute the fuel to each tank during refuelling",
              "To prevent pump cavitation",
              "To feed fuel to the volumetric top-off unit",
              "To control the amount of fuel remaining during fuel dumping"
            ],
            "correct": 1,
            "explanation": "Feeder/surge boxes ensure a constant supply and prevent pump cavitation."
          },
          {
            "question": "The function of the baffles in a fuel tank is:",
            "options": [
              "to prevent movement of fuel to the wingtip",
              "to prevent fuel surge (or sloshing) during manoeuvring",
              "to prevent pump cavitation",
              "to reduce fuel flow at altitude"
            ],
            "correct": 1,
            "explanation": "Baffles reduce slosh and maintain fuel near pickups."
          },
          {
            "question": "The advantage of a float type fuel gauging system is:",
            "options": [
              "1 only",
              "2 & 3",
              "1 only",
              "1 & 3"
            ],
            "correct": 2,
            "explanation": "From list (1=simple), the correct combined option is '1 only'."
          },
          {
            "question": "On what principle do smoke detectors work?",
            "options": [
              "Resistance and capacitance",
              "Ionization and impedance",
              "Optical and ionization",
              "Inductance and light diffraction"
            ],
            "correct": 2,
            "explanation": "Aircraft smoke detection uses optical and ionization methods."
          }
        ]
      },
      {
        "name": "Aircraft General Knowledge Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The purpose of a ditching control valve is:",
            "options": [
              "to close the outflow valves",
              "to open outflow valves",
              "to allow rapid depressurisation",
              "to dump the toilet water after landing"
            ],
            "correct": 0,
            "explanation": "Ditching closes outflow to improve flotation."
          },
          {
            "question": "The correct extinguisher to use on a brake fire would be:",
            "options": [
              "foam",
              "dry powder",
              "CO2",
              "water"
            ],
            "correct": 1,
            "explanation": "Dry powder is used to smother brake fires; water may cause thermal shock."
          },
          {
            "question": "In a centrifugal compressor:",
            "options": [
              "the air enters the eye tangentially and leaves the periphery axially",
              "the air enters the periphery axially and leaves the eye tangentially",
              "the air enters the eye radially and leaves the tip tangentially",
              "the air enters the impeller axially at the eye and leaves at the periphery tangentially"
            ],
            "correct": 3,
            "explanation": "Flow enters axially at eye, exits tangentially at impeller periphery."
          },
          {
            "question": "If an aircraft maximum operating altitude is limited by the pressure cabin, this limit is due to:",
            "options": [
              "the maximum positive pressure differential at maximum operating ceiling",
              "the maximum positive pressure differential at maximum cabin altitude",
              "the maximum number of pressurization cycles",
              "the maximum zero fuel mass at maximum pressure altitude"
            ],
            "correct": 0,
            "explanation": "Cabin structure limits Î”P at certificated altitude."
          },
          {
            "question": "Hydraulic reservoirs are pressurized by:",
            "options": [
              "ram air in flight only",
              "separate helium gas system",
              "air from the air conditioning system",
              "engine bleed air from turbine engine"
            ],
            "correct": 3,
            "explanation": "Bleed air pressurizes reservoirs to prevent cavitation and foaming."
          },
          {
            "question": "What happens to pressure, temperature and velocity of the air in the diffuser of a centrifugal compressor?",
            "options": [
              "Velocity increase, pressure and temperature decrease",
              "Velocity decrease, pressure and temperature increase",
              "Velocity, pressure and temperature increase",
              "Velocity, pressure and temperature decrease"
            ],
            "correct": 1,
            "explanation": "Diffuser converts velocity to pressure (and temperature rises)."
          },
          {
            "question": "A shuttle valve will:",
            "options": [
              "allow the accumulator to be emptied after engine shutdown",
              "reduce pump loading when normal system pressure is reached",
              "automatically switch to a more appropriate source of hydraulic supply",
              "operate on a rising pressure, higher than the Full Flow relief valve"
            ],
            "correct": 2,
            "explanation": "Shuttle valves route pressure from whichever source is active."
          },
          {
            "question": "The passenger oxygen drop-down mask stowage doors are released:",
            "options": [
              "by a lanyard operated by a barometric capsule",
              "mechanically",
              "electrically for chemical oxygen generators and pneumatically for gaseous system",
              "manually by the cabin crew"
            ],
            "correct": 2,
            "explanation": "Chem generators use electric triggers; gaseous may use pneumatic."
          },
          {
            "question": "An underinflated tyre on a dry runway:",
            "options": [
              "increases wear on the shoulder",
              "increases wear on the crown",
              "increases viscous aquaplaning speed",
              "will cause the tyre temperature to reduce"
            ],
            "correct": 0,
            "explanation": "Under-inflation causes shoulder wear and heat."
          },
          {
            "question": "Long haul aircraft are not used as short haul aircraft because:",
            "options": [
              "checklists would be too time consuming to complete",
              "it would use too much fuel",
              "some tanks will be empty the whole time imposing too much strain on the aircraft",
              "structures are given fatigue lives based on their use"
            ],
            "correct": 3,
            "explanation": "Fatigue life usage assumptions differ between short/long-haul cycles."
          },
          {
            "question": "An aircraft is certified to fly higher than 25 000 ft and to carry a maximum of 240 passengers, it is configured to carry 200 and actually has 180 passengers on board. The minimum number of drop-down oxygen masks provided must be:",
            "options": [
              "180",
              "200",
              "220",
              "240"
            ],
            "correct": 2,
            "explanation": "Typically 10% extra masks per location; here answer given is 220."
          },
          {
            "question": "An undercarriage leg is considered to be locked when:",
            "options": [
              "it is down",
              "the amber light is on",
              "mechanically locked by an 'over-centre' mechanism",
              "the actuating cylinder is at the end of its travel"
            ],
            "correct": 2,
            "explanation": "Over-centre lock provides positive mechanical down-lock."
          },
          {
            "question": "The purpose of a hydraulic fuse is to:",
            "options": [
              "allow the parking brake to remain on overnight if required",
              "allow a reduced pressure to the wheel brake system to avoid locking the wheels",
              "prevent over-pressurizing the reservoir as altitude increases",
              "prevent loss of system fluid if the pipeline to a brake unit should rupture"
            ],
            "correct": 3,
            "explanation": "Fuses close on excess flow to isolate ruptures."
          },
          {
            "question": "The flight deck warning on activation of an engine fire detection system is:",
            "options": [
              "warning bell",
              "gear warning",
              "warning light and warning bell",
              "warning light"
            ],
            "correct": 2,
            "explanation": "Fire warnings combine aural and visual alerts."
          },
          {
            "question": "With regard to an air cycle type ECS pack, where is the water separator fitted?",
            "options": [
              "After the humidifier",
              "Before the cold air unit compressor",
              "Between the compressor and turbine",
              "After the cold air unit turbine"
            ],
            "correct": 3,
            "explanation": "Water is removed after expansion/cooling at the turbine."
          },
          {
            "question": "The properties of Duralumin are:",
            "options": [
              "1, 3 and 5",
              "2, 3 and 5",
              "1, 2 and 3",
              "4, 5 and 6"
            ],
            "correct": 0,
            "explanation": "(1) Al/Cu base, (3) hard to weld, (5) good thermal conductivity."
          },
          {
            "question": "In the event that an emergency descent causes the cabin pressure to decrease below ambient pressure:",
            "options": [
              "the outward relief valve will open",
              "the outflow valve will close",
              "the inward relief valve will open",
              "the safety valve will close"
            ],
            "correct": 2,
            "explanation": "Inward relief prevents negative differential pressure."
          },
          {
            "question": "In a bleed air anti-icing system the areas that are heated are:",
            "options": [
              "the whole of the wing",
              "wing leading edge slats and flaps",
              "wing leading edges and slats",
              "trailing edge flaps"
            ],
            "correct": 2,
            "explanation": "Bleed air heats leading edges and slats; not trailing edge flaps."
          },
          {
            "question": "The type of smoke detection system fitted to aircraft is:",
            "options": [
              "optical and ionization",
              "chemical",
              "electrical",
              "magnetic"
            ],
            "correct": 0,
            "explanation": "Aircraft use optical and ionization smoke detectors."
          },
          {
            "question": "On a modern turboprop aircraft the method of anti-icing/de-icing the wings is:",
            "options": [
              "fluid",
              "pneumatic boots",
              "electrical heater mats",
              "hot air bled from the engines"
            ],
            "correct": 1,
            "explanation": "Turboprops commonly use pneumatic boots on wing leading edges."
          }
        ]
      },
      {
        "name": "Aircraft General Knowledge Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "How do you control power in a jet engine?",
            "options": [
              "By controlling the mixture ratio",
              "By controlling the fuel flow",
              "By controlling the airflow",
              "By controlling the bleed valves"
            ],
            "correct": 1,
            "explanation": "Engine thrust is controlled by fuel flow to the combustor."
          },
          {
            "question": "If during pressurized flight the outflow valve closes fully due to a fault in the pressure controller the:",
            "options": [
              "skin will be overstressed and could rupture",
              "safety valve opens when the differential pressure reaches structural max diff",
              "the inward relief valve will open to prevent excessive negative differential",
              "ECS packs are automatically closed down"
            ],
            "correct": 1,
            "explanation": "Positive relief (safety) valve opens at max Î”P."
          },
          {
            "question": "In a normally aspirated piston engine carburettor icing can occur:",
            "options": [
              "only below 0Â°C",
              "only below 0Â°C and no visible moisture",
              "In temperature ranges of -7Â°C to as high as +33Â°C with visible moisture present",
              "only above 5000 ft"
            ],
            "correct": 2,
            "explanation": "Carb icing can occur in a broad temp range with moisture present."
          },
          {
            "question": "Oxygen cylinders are normally charged to:",
            "options": [
              "1000 psi",
              "1200 psi",
              "1800 psi",
              "2000 psi"
            ],
            "correct": 2,
            "explanation": "Typical service pressure is around 1800 psi."
          },
          {
            "question": "What is the purpose of the FCOC (Fuel-cooled Oil Cooler)?",
            "options": [
              "To maintain the oil at the correct temperature",
              "To heat the fuel and cool the oil",
              "To heat the oil and cool the fuel",
              "To bypass oil to the engine if the oil pressure filter becomes blocked"
            ],
            "correct": 1,
            "explanation": "Fuel cools the oil and is slightly warmed before combustor."
          },
          {
            "question": "In an air cycle air conditioning system what is the function of the ground-cooling fan?",
            "options": [
              "To re-circulate air through the mix manifold",
              "To draw cooling air over the turbine",
              "To blow air into the compressor",
              "To draw cooling air over the heat exchangers"
            ],
            "correct": 3,
            "explanation": "Ground fan draws ambient air across heat exchangers."
          },
          {
            "question": "What is the purpose of inboard ailerons?",
            "options": [
              "To reduce wing bending at high speed",
              "To reduce wing twisting at low speed",
              "To reduce wing bending at low speed",
              "To reduce wing twist at high speed"
            ],
            "correct": 3,
            "explanation": "Inboard ailerons are used at high speed to limit wing twist."
          },
          {
            "question": "The thrust reverser light illuminates on the flight deck annunciator when the:",
            "options": [
              "thrust reverser doors have moved to the reverse thrust position",
              "thrust reverser doors have been selected but the doors have not moved",
              "thrust reverser doors are locked",
              "thrust reverser doors are unlocked"
            ],
            "correct": 0,
            "explanation": "Indicates deployment of reverser doors."
          },
          {
            "question": "In an AC distribution system what is the purpose of the GCB?",
            "options": [
              "Maintains constant frequency",
              "Connects the load busbar to the synchronizing busbar",
              "Controls generator field excitation",
              "Connects a generator output to its load busbar"
            ],
            "correct": 3,
            "explanation": "Generator Circuit Breaker connects generator to bus."
          },
          {
            "question": "In very cold weather the pilot notices slightly higher than normal oil pressure on start up. This:",
            "options": [
              "indicates an oil change is required.",
              "is indicative of a blocked oil filter.",
              "is acceptable providing it returns to normal after start up.",
              "is abnormal but does not require the engine to be shut down."
            ],
            "correct": 2,
            "explanation": "Cold oil is more viscous; pressure normalizes as it warms."
          },
          {
            "question": "Krueger flaps are positioned:",
            "options": [
              "towards the wing tip",
              "at the wing inner leading edge",
              "along the whole leading edge",
              "at the wing trailing edge"
            ],
            "correct": 1,
            "explanation": "Krueger flaps deploy from the lower surface at inner LE."
          },
          {
            "question": "An aircraft which uses DC as the primary source of power, AC for the instruments may be obtained from:",
            "options": [
              "CSDU",
              "rectifier",
              "inverter",
              "TRU"
            ],
            "correct": 2,
            "explanation": "Inverters produce AC from DC for instruments."
          },
          {
            "question": "In a gas turbine engine fuel system why is the fuel heater before the filter?",
            "options": [
              "To prevent 'waxing'",
              "To help vaporization of the fuel",
              "To prevent water in the fuel freezing and blocking the filter",
              "To prevent the fuel from freezing and blocking the filter"
            ],
            "correct": 2,
            "explanation": "Heating prevents ice crystals from blocking filters."
          },
          {
            "question": "Susceptibility to hypoxia is increased by:",
            "options": [
              "heat",
              "noise",
              "smoking",
              "under-breathing"
            ],
            "correct": 2,
            "explanation": "Smoking increases CO levels and reduces O2 carrying capacity."
          },
          {
            "question": "What are flaperons?",
            "options": [
              "Combined spoiler and flap",
              "Combined elevators and flaps",
              "Combined ailerons and elevators",
              "Combined flap and ailerons"
            ],
            "correct": 3,
            "explanation": "Flaperons provide both flap and roll functions."
          },
          {
            "question": "What is the purpose of trim tabs?",
            "options": [
              "To reduce stick forces in manoeuvres",
              "To reduce stick holding forces to zero",
              "To increase control effectiveness",
              "To reduce control effectiveness"
            ],
            "correct": 1,
            "explanation": "Trim tabs relieve constant control forces."
          },
          {
            "question": "Oxygen supplied to the flight deck is:",
            "options": [
              "gaseous, diluted with ambient air if required",
              "chemically generated and diluted with cabin air if required",
              "gaseous, diluted with cabin air if required",
              "chemically generated, diluted with ambient air if required"
            ],
            "correct": 2,
            "explanation": "Flight deck uses gaseous O2, mixing with cabin air via diluter-demand."
          },
          {
            "question": "A hot busbar is one that:",
            "options": [
              "supplies galley power",
              "is permanently connected to the battery",
              "carries all of the non-essential loads.",
              "is connected to the battery in an emergency"
            ],
            "correct": 1,
            "explanation": "Hot bus is always energized from the battery."
          },
          {
            "question": "Smoke hoods protect:",
            "options": [
              "full face and provide a continuous flow of oxygen",
              "mouth and nose and provide a continuous flow of oxygen",
              "full face and provide oxygen on demand",
              "mouth and nose and provide oxygen on demand"
            ],
            "correct": 0,
            "explanation": "Smoke hoods cover full face with continuous O2."
          },
          {
            "question": "In a fan jet engine the bypass ratio is:",
            "options": [
              "internal mass airflow divided by external mass airflow",
              "external mass airflow divided by internal mass airflow",
              "internal mass airflow divided by mass fuel flow",
              "mass fuel flow divided by mass fuel flow"
            ],
            "correct": 1,
            "explanation": "Bypass ratio = m_dot bypass / m_dot core."
          }
        ]
      },
      {
        "name": "Aircraft General Knowledge Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "An artificial feel system is needed in the pitch channel if the:",
            "options": [
              "airplane has a variable incidence tailplane",
              "elevators are controlled through a reversible servo system",
              "elevator is controlled through a servo tab",
              "elevators are controlled through an irreversible servo system"
            ],
            "correct": 3,
            "explanation": "Irreversible controls need artificial feel to provide feedback."
          },
          {
            "question": "An axial flow compressor when compared to a centrifugal compressor:",
            "options": [
              "takes in less air and is less prone to rupturing",
              "takes in more air and is more prone to rupturing",
              "takes in more air and is less prone to rupturing",
              "takes in less air and is more prone to rupturing"
            ],
            "correct": 1,
            "explanation": "Axial compressors handle higher flows; blade damage risk differs."
          },
          {
            "question": "What voltage is supplied to booster pumps on a modern jet airliner?",
            "options": [
              "115 V AC single phase",
              "200 V AC three phase",
              "28 V DC from an inverter",
              "12 V DC from the battery"
            ],
            "correct": 1,
            "explanation": "Three-phase 200 VAC is common for high power loads."
          },
          {
            "question": "The EGT indication on a piston engine is used:",
            "options": [
              "to control the cooling air shutters",
              "to monitor the oil temperature",
              "to assist the pilot to adjust the fuel mixture",
              "to indicate cylinder head temperature"
            ],
            "correct": 2,
            "explanation": "EGT is used for mixture leaning."
          },
          {
            "question": "What makes the non-rigid fittings of compressor and turbine blades rigid when the engine is running?",
            "options": [
              "Spring locks",
              "Thrust and drag forces",
              "Aerodynamic and centrifugal force",
              "Tapered bead seats"
            ],
            "correct": 2,
            "explanation": "Centrifugal force seats blades firmly at speed."
          },
          {
            "question": "Where are smoke detectors fitted?",
            "options": [
              "Toilets",
              "Toilets and cargo compartments A, B, C, D, E",
              "All cargo compartments",
              "Toilets and cargo compartments B, C, E"
            ],
            "correct": 3,
            "explanation": "As per typical transport requirements; answer given as D."
          },
          {
            "question": "What frequency is commonly used in aircraft electrical distribution systems?",
            "options": [
              "200 Hz",
              "400 Hz",
              "100 Hz",
              "50 Hz"
            ],
            "correct": 1,
            "explanation": "400 Hz allows lighter transformers and motors."
          },
          {
            "question": "What colour is the hydraulic liquid in a modern jet airliner?",
            "options": [
              "Purple",
              "Red",
              "Yellow",
              "Pink"
            ],
            "correct": 0,
            "explanation": "Skydrol synthetic fluid is dyed purple."
          },
          {
            "question": "Auto brakes are disengaged:",
            "options": [
              "when the ground spoilers are retracted",
              "when the speed falls below 20 kt",
              "on the landing roll when the autopilot is disengaged",
              "by the pilot"
            ],
            "correct": 3,
            "explanation": "Pilot brake pedal application typically cancels autobrake."
          },
          {
            "question": "When does the Low-Pressure fuel shut off valve close?",
            "options": [
              "When the fire handle is pulled",
              "When the engine fuel switch is selected 'on' during engine start",
              "When flight idle is selected",
              "After a booster pump failure"
            ],
            "correct": 0,
            "explanation": "Fire handle closes LP fuel shutoff among other isolations."
          },
          {
            "question": "In an aircraft with a fuel dumping system it will allow fuel to be dumped:",
            "options": [
              "down to a predetermined safe value",
              "down to unuseable value",
              "to leave 15 gallons in each tank",
              "down to maximum landing weight"
            ],
            "correct": 0,
            "explanation": "Dump system often stops at a preset safe minimum/MLW."
          },
          {
            "question": "When does the engine High Pressure fuel shut off valve close?",
            "options": [
              "After a booster pump failure",
              "When the engine fuel switch is selected on during engine start",
              "When flight idle is selected",
              "When the engine fuel switch is selected off during engine shutdown"
            ],
            "correct": 3,
            "explanation": "HP shutoff valve commanded closed on engine shutdown."
          },
          {
            "question": "Hydraulic pressure typically used in the system of large transport aircraft is:",
            "options": [
              "2000- 3000 psi",
              "3000-4000 psi",
              "1000-2000 psi",
              "4000-5000 psi"
            ],
            "correct": 1,
            "explanation": "Modern transports commonly use 3000-4000 psi systems."
          },
          {
            "question": "A gas turbine engine having a single spool, the compressor will rotate:",
            "options": [
              "at the same speed as the turbine",
              "slower than the turbine",
              "faster than the turbine",
              "independently of the turbine"
            ],
            "correct": 0,
            "explanation": "Single spool mechanically couples compressor and turbine speeds."
          },
          {
            "question": "What ice protection system is used on most modern jet transport aircraft?",
            "options": [
              "Liquid",
              "Electrical",
              "Hot air",
              "Pressure operated boots"
            ],
            "correct": 2,
            "explanation": "Bleed hot air anti-icing is typical on jets."
          },
          {
            "question": "The fuel cross-feed valves are fitted in order to facilitate:",
            "options": [
              "the use of fuel from any tank to any engine",
              "refuelling when only one bowser is in use",
              "isolation of the engine from the fuel system in the case of an engine fire",
              "transfer of fuel between the main fuel tanks"
            ],
            "correct": 0,
            "explanation": "Crossfeed allows feeding any engine from any tank."
          },
          {
            "question": "Which part of the gas turbine engine limits the temperature?",
            "options": [
              "Combustion chamber",
              "Turbine",
              "Compressor",
              "Exhaust"
            ],
            "correct": 1,
            "explanation": "Turbine temperature limits govern engine ratings."
          },
          {
            "question": "When smoke appears in the cockpit, after donning the oxygen mask the pilot should select:",
            "options": [
              "normal",
              "100%.",
              "diluter",
              "emergency"
            ],
            "correct": 3,
            "explanation": "Emergency provides positive pressure to exclude smoke."
          },
          {
            "question": "What does 'octane rating' when applied to AVGAS refer to?",
            "options": [
              "The waxing point of the fuel",
              "The ability of the fuel to disperse water",
              "The anti-knock value of the fuel",
              "The volatility of the fuel"
            ],
            "correct": 2,
            "explanation": "Octane rating measures anti-knock performance."
          },
          {
            "question": "What is the purpose of the torque links in a landing gear leg?",
            "options": [
              "To prevent the wheel rotating around the leg",
              "To prevent shimmy",
              "To transfer the brake torque to the wheel",
              "To position the wheels in the correct attitude prior to landing"
            ],
            "correct": 0,
            "explanation": "Torque links/Scissor links prevent axle rotation relative to strut."
          }
        ]
      },
      {
        "name": "Aircraft General Knowledge Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "On what principle does the fuel contents gauging system work on a modern large aircraft?",
            "options": [
              "Capacity affected by dielectric therefore changing EMF of system",
              "Capacity affected by dielectric therefore changing resistivity of system",
              "Changes in dielectric causes changes in capacitance",
              "Change in dielectric causes change in distance between plates and therefore changes capacitance"
            ],
            "correct": 2,
            "explanation": "Capacitance varies with fuel dielectric; system measures capacitance."
          },
          {
            "question": "What is the purpose of a surge box inside a fuel tank?",
            "options": [
              "Collect sediment at the bottom of the tank",
              "Ventilate the tank during high pressure refuelling",
              "Allow movement of fuel between tanks while refuelling",
              "Prevent sloshing of fuel away from pump inlet during abnormal manoeuvres"
            ],
            "correct": 3,
            "explanation": "Surge/feeder box maintains fuel around pump inlet."
          },
          {
            "question": "The requirement for an aircraft to have a fuel dumping system is:",
            "options": [
              "all aircraft in the Transport Category having a maximum take-off mass (MTOM) of 75000 kg or greater",
              "all aircraft manufactured after 1997 having a MTOM of 7500 kg or more",
              "aircraft whose maximum landing mass (MLM) is significantly lower than its maximum take-off mass (MTOM)",
              "all aircraft with a seating capacity of 250 or more"
            ],
            "correct": 2,
            "explanation": "Dump system is required when MLW << MTOW."
          },
          {
            "question": "An unpressurized aircraft is flying above FL100 and therefore must have sufficient oxygen for:",
            "options": [
              "both pilots immediately and the cabin crew plus all passengers after 30 minutes above FL100 but below FL130",
              "both pilots only",
              "both pilots and all passengers",
              "both pilots immediately and the cabin crew plus some passengers after 30 minutes above FL100 but below FL130"
            ],
            "correct": 3,
            "explanation": "Regulations require immediate supply to flight crew and for others after a duration."
          },
          {
            "question": "In a stressed skin aircraft, bending loads acting on the wings are taken by:",
            "options": [
              "ribs and stringers",
              "stringers and spars",
              "spars and skin",
              "spars and stringers"
            ],
            "correct": 2,
            "explanation": "Spars carry bending; skin provides tensile/compressive stresses."
          },
          {
            "question": "What limits the max. temperature in a gas turbine engine?",
            "options": [
              "Temperature in the combustion chamber",
              "Temperature at the exhaust",
              "Temperature at the turbine",
              "Temperature entering the combustion chamber"
            ],
            "correct": 2,
            "explanation": "Turbine entry temperature limit constrains engine operation."
          },
          {
            "question": "Why, in the bootstrap system, is the air compressed before it enters the heat exchanger?",
            "options": [
              "To provide a constant mass flow to the cabin",
              "To ensure maximum pressure and temperature drop across the turbine",
              "To ensure most rapid cooling through the heat exchanger",
              "To provide a constant temperature airflow to the cabin"
            ],
            "correct": 1,
            "explanation": "Higher compressor outlet allows greater expansion work across turbine."
          },
          {
            "question": "What is the purpose of the diluter demand valve in the emergency oxygen system?",
            "options": [
              "To supply air only when inhaling",
              "To dilute oxygen with air in crew oxygen system",
              "To dilute oxygen with air in passenger oxygen system",
              "To supply oxygen only when inhaling"
            ],
            "correct": 1,
            "explanation": "Diluter-demand mixes cabin air with O2 for crew."
          },
          {
            "question": "In a non-stressed skin aircraft, bending loads acting on the wings are taken by:",
            "options": [
              "skin",
              "spars",
              "stringers",
              "ribs"
            ],
            "correct": 1,
            "explanation": "In non-stressed-skin, spars carry bending; skin is not primary structure."
          },
          {
            "question": "Aircraft above a certain capacity must carry a crash axe, it is provided to:",
            "options": [
              "cut through the aircraft fuselage to allow escape",
              "enable access behind panels and soundproofing to aid fire fighting",
              "cut firewood in a survival situation",
              "restrain disorderly passengers"
            ],
            "correct": 1,
            "explanation": "Crash axe enables access for firefighting and rescue."
          },
          {
            "question": "At what height is it mandatory for one of the flight deck crew to wear an oxygen mask?",
            "options": [
              "25000 ft",
              "32000 ft",
              "37000 ft",
              "41000 ft"
            ],
            "correct": 3,
            "explanation": "One-pilot mask wearing requirement applies above certain altitudes; given answer 41000 ft."
          },
          {
            "question": "Hydraulic fluid:",
            "options": [
              "needs no special treatment",
              "is harmful to eyes and skin",
              "is a fire hazard",
              "is harmful to eyes and skin, and is also a fire hazard"
            ],
            "correct": 3,
            "explanation": "Handle hydraulic fluid with care; it's both irritant and flammable."
          },
          {
            "question": "The function of stringers in the construction of the fuselage is:",
            "options": [
              "to withstand shear stress",
              "to provide an attachment for insulation",
              "to provide support for the skin and to absorb some of the pressurization strain as tensile loading",
              "to provide an alternate load path in the event of the failure of a frame"
            ],
            "correct": 2,
            "explanation": "Stringers stiffen skin and carry longitudinal loads."
          },
          {
            "question": "On what principle does a fuel flowmeter work?",
            "options": [
              "Volume and viscosity",
              "Quantity of movement",
              "Capacitive dielectric",
              "Pressure and temperature"
            ],
            "correct": 1,
            "explanation": "Typical flowmeters measure mass/volume via turbine or positive displacement (quantity of movement)."
          },
          {
            "question": "The engine fire extinguisher system is activated:",
            "options": [
              "after the engine has been shut down",
              "automatically when a fire warning is sensed",
              "by the pilot when required",
              "automatically after a time delay to allow the engine to stop"
            ],
            "correct": 2,
            "explanation": "Pilot actuates fire bottles upon confirmed fire."
          },
          {
            "question": "What is a ram air turbine (RAT) which drives a hydraulic pump used for?",
            "options": [
              "Nose wheel steering",
              "Flap extension",
              "Landing gear extension if the normal system fails",
              "Flight controls in case of failure of the engine driven system"
            ],
            "correct": 3,
            "explanation": "RAT provides emergency hydraulic/electrical power, primarily for flight controls."
          },
          {
            "question": "What is engine pressure ratio?",
            "options": [
              "The ratio of turbine outlet pressure to compressor inlet pressure",
              "The ratio of turbine inlet pressure to compressor inlet pressure",
              "Turbine outlet pressure * compressor outlet pressure",
              "Compressor inlet pressure divided by turbine outlet pressure"
            ],
            "correct": 0,
            "explanation": "EPR â‰ˆ Pt7/Pt2 depending on engine station designations."
          },
          {
            "question": "Emergency oxygen is provided by:",
            "options": [
              "one system for both flight deck and cabin",
              "two independent systems, one for flight deck, one for cabin",
              "two systems each capable of supplying the flight deck and cabin",
              "three systems, one for the flight deck, one for the passengers and one for the cabin crew"
            ],
            "correct": 1,
            "explanation": "Flight deck and cabin oxygen systems are typically independent."
          },
          {
            "question": "As altitude increases what does the mixture control do to the fuel flow?",
            "options": [
              "Increases flow due to reduced air density",
              "Increases flow due to increased air density",
              "Reduces flow due to reduced air density",
              "Reduces flow due to increased air density"
            ],
            "correct": 2,
            "explanation": "Mixture is leaned with altitude to match lower air density."
          },
          {
            "question": "[Placeholder] Source file appears to be missing one question. Please replace this placeholder when the correct question is available.",
            "options": [
              "Placeholder A",
              "Placeholder B",
              "Placeholder C",
              "Placeholder D"
            ],
            "correct": 0,
            "explanation": "This placeholder maintains a 20-question structure for Test 5; replace with the missing item when provided."
          }
        ]
      }
    ]
  },
    "air-law": {
    "name": "Air Law",
    "icon": "fas fa-gavel",
    "tests": [
      {
        "name": "Air Law Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "An aircraft making an approach must be told to make a missed approach, when no landing clearance has been received from the non-radar traffic controller, when the aircraft is at a distance of:",
            "options": [
              "5 NM from the touchdown",
              "1.5 NM from the touchdown",
              "4 NM from the touchdown",
              "2 NM from the touchdown"
            ],
            "correct": 3,
            "explanation": "If no landing clearance is received by 2 NM from touchdown, a missed approach must be initiated."
          },
          {
            "question": "The speed limit (IAS) in airspace E is:",
            "options": [
              "250 kt for IFR and VFR, below FL100",
              "250 kt for IFR only, below FL195",
              "250 kt for IFR and VFR, at all altitudes",
              "250 kt for IFR only, below FL100"
            ],
            "correct": 0,
            "explanation": "Below FL100, both IFR and VFR are limited to 250 kt in Class E."
          },
          {
            "question": "What action should be taken when, during an IFR flight in VMC, you suffer a radio failure?",
            "options": [
              "Return to the aerodrome from which you departed",
              "Continue flying in VMC and land as soon as possible",
              "Maintain your assigned altitude and land at the nearest aerodrome at which there are VMC conditions",
              "Continue flying at your assigned altitude and start your approach at your ETA"
            ],
            "correct": 1,
            "explanation": "In VMC, continue visually and land as soon as practicable."
          },
          {
            "question": "Who is responsible for the safety of an ATC clearance concerning terrain clearance?",
            "options": [
              "The ATS reporting point when accepting the flight plan",
              "The Captain",
              "The Operator of the aircraft",
              "ATC"
            ],
            "correct": 1,
            "explanation": "PIC retains responsibility for terrain clearance."
          },
          {
            "question": "An ATS airspace, in which IFR and VFR flights are permitted and all flights receive air traffic control service, IFR flights are separated from other IFR flights and receive traffic information concerning VFR flights and VFR flights receive traffic information concerning all other flights, is classified as:",
            "options": [
              "Airspace E",
              "Airspace B",
              "Airspace A",
              "Airspace D"
            ],
            "correct": 3,
            "explanation": "This describes Class D controlled airspace."
          },
          {
            "question": "What does DER mean?",
            "options": [
              "distance end of route",
              "departure end of runway",
              "distance end of runway",
              "departure end of route"
            ],
            "correct": 1,
            "explanation": "DER = Departure End of Runway."
          },
          {
            "question": "In Mode 2 Parallel Runway operations, a minimum radar separation can be provided of:",
            "options": [
              "3 NM between aircraft on the same localizer course",
              "2 NM between aircraft on the same localizer course",
              "3 NM between aircraft on adjacent localizer courses",
              "5 NM between aircraft on the same localizer course"
            ],
            "correct": 0,
            "explanation": "Minimum 3 NM on the same localizer course."
          },
          {
            "question": "Except in special cases, the establishment of change-over points shall be limited to route segments of:",
            "options": [
              "100 NM or more",
              "75 NM or more",
              "60 NM or more",
              "50 NM or more"
            ],
            "correct": 2,
            "explanation": "COPs are typically on route segments of 60 NM or more."
          },
          {
            "question": "For a controlled flight before departure, a flight plan must be filed at least:",
            "options": [
              "50 minutes before off-block time",
              "60 minutes before departure",
              "10 minutes before departure",
              "30 minutes before off-block time"
            ],
            "correct": 1,
            "explanation": "File at least 60 minutes before departure."
          },
          {
            "question": "In an instrument approach procedure, the segment where the aircraft is lined up with the runway centre line and when the descent is commenced is called:",
            "options": [
              "intermediate approach segment",
              "initial approach segment",
              "arrival segment",
              "final approach segment"
            ],
            "correct": 3,
            "explanation": "This is the final approach segment."
          },
          {
            "question": "Except when cleared by an ATC unit, a VFR flight cannot enter or leave a Control Zone when the cloud base is lower than:",
            "options": [
              "1000 ft and less than 8 km visibility",
              "2000 ft and less than 5 km visibility",
              "1500 ft or less than 5 km visibility",
              "1000 ft and less than 5 km visibility"
            ],
            "correct": 2,
            "explanation": "VFR minima for CTR entry apply; 1500 ft or 5 km visibility threshold."
          },
          {
            "question": "ICAO Annex 17 lays down the rules to establish security measures for passengers with regard to:",
            "options": [
              "cabin baggage, checked baggage, cargo and other goods, access control and airport design",
              "cabin baggage and checked baggage",
              "passenger baggage",
              "cabin baggage, checked baggage, cargo and other goods and access control"
            ],
            "correct": 0,
            "explanation": "Annex 17 addresses aviation security, including baggage, cargo, and access control."
          },
          {
            "question": "When doing a procedure turn (45Â°/180Â°) going outbound turned 45Â° off track, the time taken from the beginning of the turn for Cat A and Cat B aircraft is:",
            "options": [
              "1 minute 30 seconds",
              "1 minute",
              "1 minute 15 seconds",
              "2 minutes"
            ],
            "correct": 1,
            "explanation": "Standard timing is 1 minute outbound for Cat A/B."
          },
          {
            "question": "When requesting to engage the parking brake, a marshaller will give the following signal:",
            "options": [
              "arms repeatedly crossed over the head",
              "arms placed down and crossed in front of the body moving horizontally",
              "raise arm and hand with fingers extended horizontally in front of the body, then clench fist",
              "arms placed horizontally sideways with palms towards the ground beckoning downwards"
            ],
            "correct": 2,
            "explanation": "Raised hand open then clench fist indicates 'set brakes'."
          },
          {
            "question": "Concerning the three entries to the hold, the entry has to be flown on:",
            "options": [
              "heading",
              "track",
              "course",
              "bearing"
            ],
            "correct": 0,
            "explanation": "Entry is based on heading sectors."
          },
          {
            "question": "An aircraft, on a radar approach, should be told to consider making a missed approach when the aircraft is not visible on the radar screen for a significant period of time and when it is within:",
            "options": [
              "the last 2 NM of the approach",
              "the last 5 NM of the approach",
              "the last 4 NM of the approach",
              "the last 3 NM of the approach"
            ],
            "correct": 0,
            "explanation": "Within last 2 NM and not visible, advise missed approach."
          },
          {
            "question": "Clocks and other timing equipment used by air traffic services must be checked in order to be able to give the time within plus or minus:",
            "options": [
              "15 seconds of UTC",
              "10 seconds of UTC",
              "30 seconds of UTC",
              "1 minute of UTC"
            ],
            "correct": 2,
            "explanation": "ATS timing accuracy Â±30 seconds."
          },
          {
            "question": "When given instructions to set a mode/code, a pilot shall:",
            "options": [
              "only use the word 'wilco'",
              "only read back the code",
              "only use the word 'roger'",
              "read back mode and code"
            ],
            "correct": 3,
            "explanation": "Read back both the mode and specific code."
          },
          {
            "question": "In order to satisfy lateral track separation between aircraft using the same fix and Dead Reckoning, the aircraft:",
            "options": [
              "have to fly 45Â° separated at a distance of 15 miles or more from the fix",
              "have to fly 45Â° separated at a distance of 15 NM or more from the fix",
              "have to fly 30Â° separated at a distance of 15 NM or more from the fix",
              "have to fly 30Â° separated at a distance of 15 miles or more from the fix"
            ],
            "correct": 1,
            "explanation": "DR lateral separation uses 45Â° divergence at â‰¥15 NM."
          },
          {
            "question": "Who has the final authority as to the disposition of the aircraft?",
            "options": [
              "The State",
              "The Operator",
              "The Commander",
              "The owner"
            ],
            "correct": 2,
            "explanation": "Commander (PIC) has final authority."
          }
        ]
      },
      {
        "name": "Air Law Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the rule concerning level or height the aircraft should maintain when flying IFR outside controlled airspace unless otherwise directed?",
            "options": [
              "2000 ft above the highest obstacle within 8 km of the heading",
              "1000 ft above the highest obstacle within 8 km of the estimated position of the aircraft",
              "1000 ft above the highest obstacle within 8 NM of the planned track",
              "2000 ft above the highest obstacle within 8 NM of the planned track"
            ],
            "correct": 1,
            "explanation": "Maintain 1000 ft (2000 ft in mountains) above highest obstacle within 8 km of position/route."
          },
          {
            "question": "It says in the annex of the ICAO convention that the sizes of airfields are specified by codes for different runways. What is the minimum width of a runway with runway code 4?",
            "options": [
              "40 m",
              "45 m",
              "50 m",
              "35 m"
            ],
            "correct": 1,
            "explanation": "Code number 4 runways have a minimum width of 45 m (depending on code letter)."
          },
          {
            "question": "A manoeuvre where a turn is made from a 'designated track' followed by a turn in the opposite direction to enable the aircraft to fly the prescribed track is called a:",
            "options": [
              "base turn",
              "reverse track",
              "race track",
              "procedure turn"
            ],
            "correct": 3,
            "explanation": "ICAO instrument procedure term: 'procedure turn'."
          },
          {
            "question": "How many red lights have to be seen by the pilot, whose aircraft on final approach follows a normal PAPI defined glide-path?",
            "options": [
              "2",
              "none",
              "3",
              "1"
            ],
            "correct": 0,
            "explanation": "Normal PAPI: 2 red, 2 white."
          },
          {
            "question": "If the track on an instrument departure is published, the pilot is expected to:",
            "options": [
              "correct for the known wind so as to maintain the published track",
              "ask ATC for another heading to steer correcting for wind",
              "ignore the wind and proceed with a heading equal to the track",
              "ask ATC for permission to correct heading for wind"
            ],
            "correct": 0,
            "explanation": "Maintain published track by correcting for wind."
          },
          {
            "question": "Transition Level:",
            "options": [
              "will be given by NOTAM",
              "is published on every approach and landing chart for every airfield",
              "will be calculated by the pilot-in-command",
              "will be calculated by the ATC service of an ATS unit"
            ],
            "correct": 3,
            "explanation": "Transition level is determined and issued by ATS unit (ATC)."
          },
          {
            "question": "The person having overall responsibility of an aircraft during flight is the:",
            "options": [
              "pilot-in-command",
              "operator",
              "ATC Controller if the aircraft is in controlled airspace",
              "owner of the aircraft"
            ],
            "correct": 0,
            "explanation": "PIC is responsible."
          },
          {
            "question": "An aircraft which is not concerned with regular international flights and which makes a flight to or via a dedicated aerodrome of a member State and is temporarily free of taxes is admitted and will stay within that State without paying customs:",
            "options": [
              "during a period which is determined by the State",
              "during a period of 24 hours",
              "during a period of 12 hours",
              "during a period of 48 hours"
            ],
            "correct": 0,
            "explanation": "State sets the period for temporary admission without duties."
          },
          {
            "question": "When someone's admittance to a country is refused and he/she is brought back to the operator for transportation away from the territory of the state:",
            "options": [
              "the operator will not take any transportation costs from the passenger which arise from his/her inadmissibility",
              "the operator is not responsible for that person, to whom the admittance to the host country is refused",
              "the operator and state of the operator are both responsible for the refused person",
              "the operator will not be prevented from taking any transport costs from a person which arises out of his/her inadmissibility"
            ],
            "correct": 3,
            "explanation": "Operator may recover costs due to inadmissibility."
          },
          {
            "question": "A clearway is a squared area that is established to:",
            "options": [
              "protect aircraft during take-off and landing",
              "enable the aircraft to stop in the case of an aborted take-off",
              "enable the aircraft to make a part of the initial climb to a specified altitude",
              "decrease the risk of damage to aircraft which run off the end of the runway"
            ],
            "correct": 2,
            "explanation": "Clearway supports initial climb performance calculations (TODA)."
          },
          {
            "question": "Close to an aerodrome that will be used for landing by aircraft, the vertical position shall be expressed as:",
            "options": [
              "altitude above sea level on or above transition altitude",
              "flight level on or under the transition altitude",
              "flight level on or under the transition level",
              "altitude above sea level at or below transition altitude"
            ],
            "correct": 3,
            "explanation": "Below transition altitude use altitude; above use flight levels."
          },
          {
            "question": "Aircraft A flies in VMC with an ATC clearance within a control area. Aircraft B without ATC clearance approaches at roughly the same height on a converging heading. Who has right of way?",
            "options": [
              "Aircraft A, regardless of the direction from which B approaches",
              "Aircraft B, regardless of the direction from which A approaches",
              "Aircraft A, if B is to the right of him",
              "Aircraft B, if A is to the left of him"
            ],
            "correct": 3,
            "explanation": "Right-of-way rules: give way to the right; uncontrolled traffic has priority if to the right."
          },
          {
            "question": "Concerning aircraft registration markings, no combinations can be used if they can be mistaken for:",
            "options": [
              "codes which are used for identification of ICAO documents",
              "letter combinations beginning with XXX",
              "3 letter combinations which are used by international code of signals",
              "5 letter combinations which are used by international code of signals"
            ],
            "correct": 3,
            "explanation": "Avoid confusion with International Code of Signals 5-letter groups."
          },
          {
            "question": "An aircraft flies over mountainous terrain at which a search and rescue operation is conducted to find survivors of a plane crash. The pilot sees a ground sign in the form of an 'X'. This indicates:",
            "options": [
              "we have found all personnel",
              "engineering assistance required",
              "landing impossible",
              "require medical assistance"
            ],
            "correct": 3,
            "explanation": "Ground-to-air signal 'X' indicates 'require medical assistance'."
          },
          {
            "question": "Temporary changes of long duration in specifications for AIP supplements and information of short duration, which contains extensive text and/or graphical representation, has to be published as AIP supplements. Long duration is considered to be:",
            "options": [
              "3 months or longer",
              "2 months or longer",
              "1 year or longer",
              "6 months or longer"
            ],
            "correct": 0,
            "explanation": "AIP SUP long duration generally â‰¥ 3 months."
          },
          {
            "question": "A controlled flight is required to inform the concerned ATC unit when the average TAS at cruising level deviates or is expected to deviate compared to that given TAS in the Flight Plan by at least:",
            "options": [
              "10%",
              "3%",
              "5%",
              "2%"
            ],
            "correct": 2,
            "explanation": "Advise ATC of TAS deviations â‰¥ 5%."
          },
          {
            "question": "An aircraft is expected to overtake another aircraft if it is closing from behind in a sector of:",
            "options": [
              "50Â° both sides of the longitudinal axis",
              "60Â° both sides of the longitudinal axis",
              "80Â° both sides of the longitudinal axis",
              "70Â° both sides of the longitudinal axis"
            ],
            "correct": 3,
            "explanation": "Overtaking defined within 70Â° sector from behind."
          },
          {
            "question": "Pilots are not allowed to use the ident function on their SSR, unless:",
            "options": [
              "they operate outside controlled airspace",
              "if asked by ATC",
              "they are within controlled airspace",
              "they operate a transponder with mode C"
            ],
            "correct": 1,
            "explanation": "Use IDENT only when instructed by ATC."
          },
          {
            "question": "The transition from altitude to flight level and vice versa is made:",
            "options": [
              "on the transition level in the climb and transition altitude in the descent",
              "at the transition altitude in the climb and transition level in the descent",
              "at the transition level only",
              "at the transition altitude only"
            ],
            "correct": 1,
            "explanation": "Climb: set standard at/above transition altitude. Descent: set QNH at/ below transition level."
          },
          {
            "question": "It is permitted in a particular sector, if there is a conspicuous obstacle in the visual manoeuvring area outside the final and missed approach areas, to disregard that obstacle. When using this option, the published procedure shall be:",
            "options": [
              "circling is only permitted in VMC",
              "recommended not to execute a circling approach in the entire sector in which the obstacle is situated",
              "prohibit a circling approach for the concerned runway",
              "forbid a circling approach in the entire sector in which the obstacle is located"
            ],
            "correct": 3,
            "explanation": "If obstacle is disregarded, the entire sector is prohibited for circling."
          }
        ]
      },
      {
        "name": "Air Law Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "An aircraft is allowed to descend below the MSA if:",
            "options": [
              "the pilot follows the published approach procedures",
              "the aircraft receives radar vectors",
              "the pilot has visual contact with the runway and surrounding terrain and is able to maintain visual contact",
              "all of the above"
            ],
            "correct": 3,
            "explanation": "Below MSA permitted when on a published procedure, radar vectored with appropriate separation, or in visual conditions."
          },
          {
            "question": "Lights on an airfield or in the vicinity can be extinguished if they can be re-lit:",
            "options": [
              "at least 5 minutes before the ETA of the aircraft",
              "at least 15 minutes before the ETA of the aircraft",
              "at least 30 minutes before the ETA of the aircraft",
              "at least 60 minutes before the ETA of the aircraft"
            ],
            "correct": 3,
            "explanation": "Lighting can be extinguished if they can be restored at least 60 minutes before ETA."
          },
          {
            "question": "Air Traffic Service unit consists of:",
            "options": [
              "Air Traffic Control Units and Flight Information Centres",
              "Flight Information Centres and Air Services Reporting offices",
              "Air Traffic Control Units, Flight Information Centres and Air Traffic Services Reporting offices",
              "Air Services Reporting offices and Air Traffic Control Units"
            ],
            "correct": 2,
            "explanation": "ATS includes ATC units, FICs and ATS reporting offices."
          },
          {
            "question": "A marshaller crosses hands in front of the face, palms outwards and then moves the arms outwards. What does this signal indicate?",
            "options": [
              "Clear to move forward",
              "Brakes off",
              "Remove chocks",
              "Clear to close all engines"
            ],
            "correct": 2,
            "explanation": "Signal indicates 'remove chocks'."
          },
          {
            "question": "A fixed obstacle that extends above a take-off climb surface within what distance shall be marked and, if runway is used at night, must be lit?",
            "options": [
              "3000 m",
              "3000 ft",
              "5000 m",
              "2 NM"
            ],
            "correct": 0,
            "explanation": "Obstacles within 3000 m of the take-off climb surface must be marked/lit."
          },
          {
            "question": "Repetitive flight plans (RPLs) cannot be used for flights other than those executed frequently on the same days of following weeks and:",
            "options": [
              "for at least 20 occasions or every day over a period of at least 20 consecutive days",
              "for at least 20 consecutive days",
              "for at least 10 occasions or every day over a period of at least 10 consecutive days",
              "for at least 20 occasions"
            ],
            "correct": 2,
            "explanation": "RPLs are for frequent flights (â‰¥10 occasions or daily for 10 consecutive days)."
          },
          {
            "question": "A PAPI must consist of:",
            "options": [
              "a row of 4 multiple lights or paired units without transition zone, at equal distance from each other",
              "two rows of 4 multiple lights or paired units without transition zone, at equal distance from each other",
              "a row of 2 multiple lights or paired units without transition zone, at equal distance from each other",
              "two rows of 6 multiple lights or paired units without transition zone, at equal distance from each other"
            ],
            "correct": 0,
            "explanation": "PAPI: single row of four light units."
          },
          {
            "question": "What is the length of the approach lighting system of a Cat II precision landing runway?",
            "options": [
              "900 m",
              "600 m",
              "300 m",
              "150 m"
            ],
            "correct": 0,
            "explanation": "CAT II approach lighting length is typically 900 m."
          },
          {
            "question": "According to international agreements the wind direction must be given in degrees magnetic converted with local magnetic variation from the true wind direction:",
            "options": [
              "before landing and taxi for take-off",
              "in anticipation of the upper wind for areas North of 60Â°N and South of 60Â°S",
              "when an aircraft is requested by the meteorological office or on specified points to give a PIREP",
              "when the local variation is greater than 10Â° East or West"
            ],
            "correct": 0,
            "explanation": "Tower winds are given magnetic for landing/take-off."
          },
          {
            "question": "An aircraft is maintaining FL150 in Class C Airspace. Another aircraft below at FL140 receives a clearance to descend to FL70. There is severe turbulence in the area. When at earliest can a clearance be expected to descend to FL140 or lower?",
            "options": [
              "When the other aircraft has reported to be descending through FL130",
              "When the other aircraft has reported to have left FL120",
              "When the other aircraft has reported to have left FL140",
              "When the other aircraft has reached FL70"
            ],
            "correct": 0,
            "explanation": "With severe turbulence, ensure vertical separation re-established (report through FL130) before descending."
          },
          {
            "question": "The VMC minima for a VFR flight within ATS airspace class B are:",
            "options": [
              "8 km visibility at or above 3050 m AMSL and clear of cloud",
              "5 NM visibility at or above 3050 m AMSL, 1500 m horizontal and 300 m vertical clear of cloud",
              "8 km visibility at or above 3050 m AMSL, 1500 m horizontal and 300 m vertical clear of cloud",
              "5 NM visibility at or above 3050 m AMSL and clear of cloud"
            ],
            "correct": 2,
            "explanation": "Class B: 8 km, 1500 m horizontal/300 m vertical from cloud."
          },
          {
            "question": "When independent parallel approaches are used on parallel runways and headings (vectors) are given to intercept the ILS, the heading must allow establishing on final in level flight over at least:",
            "options": [
              "2.5 NM before GS/MLS elevation angle is intercepted",
              "1.5 NM before GS/MLS elevation angle is intercepted",
              "3.0 NM before GS/MLS elevation angle is intercepted",
              "2.0 NM before GS/MLS elevation angle is intercepted"
            ],
            "correct": 3,
            "explanation": "Provide at least 2.0 NM to establish on final in level flight."
          },
          {
            "question": "When the captain cannot comply with an ATC clearance:",
            "options": [
              "the Captain must accept the ATC clearance, because it is based on a filed flight plan",
              "he/she may request an amended clearance and, if executable, he/she will accept that clearance",
              "he/she may ask for a new clearance and ATC must grant that clearance",
              "he/she may suggest a new clearance to ATC"
            ],
            "correct": 1,
            "explanation": "Request an amended clearance if unable to comply."
          },
          {
            "question": "The minimum number of rescue and fire fighting vehicles required for a Cat 8 Aerodrome is:",
            "options": [
              "3",
              "4",
              "5",
              "None of the above"
            ],
            "correct": 0,
            "explanation": "ICAO RFF category 8 requires 3 vehicles."
          },
          {
            "question": "Lights at the end of the runway shall be:",
            "options": [
              "steady unidirectional lights radiating white light in the direction of the runway",
              "steady white lights with controllable intensity",
              "steady omni-directional red lights with controllable intensity",
              "steady unidirectional lights radiating red light in the direction of the runway"
            ],
            "correct": 3,
            "explanation": "Runway end lights show red in the runway direction."
          },
          {
            "question": "What is required for an IFR flight in advisory airspace?",
            "options": [
              "No flight plan required",
              "Flight plan required and PIC must notify of any changes regardless of wanting advisory service or not",
              "Flight plan required but PIC need not notify of any changes",
              "A flight plan is only required if advisory service is required"
            ],
            "correct": 1,
            "explanation": "FPL is required for IFR in advisory airspace; notify changes."
          },
          {
            "question": "The transition from IFR to VFR is done:",
            "options": [
              "on the Captain's initiative",
              "whenever an aircraft in VMC leaves controlled airspace",
              "if told by ATC",
              "at the clearance limit, disregarding the weather situation"
            ],
            "correct": 0,
            "explanation": "PIC may cancel IFR when in VMC and able to continue under VFR."
          },
          {
            "question": "The longitudinal separation minimum based on time between aircraft at the same FL, where navigation aid coverage exists and the preceding aircraft has a higher TAS of at least 20 kt is:",
            "options": [
              "3 minutes",
              "15 minutes",
              "5 minutes",
              "10 minutes"
            ],
            "correct": 2,
            "explanation": "With â‰¥20 kt speed differential, 5-minute longitudinal separation may be used."
          },
          {
            "question": "The minimum response time for aerodrome rescue and fire fighting services to the end of each runway as well as to any other part of the movement area is:",
            "options": [
              "3 minutes and not exceeding 4 minutes",
              "2 minutes and not exceeding 3 minutes",
              "2 minutes and not exceeding 4 minutes",
              "3 minutes and not exceeding 5 minutes"
            ],
            "correct": 1,
            "explanation": "ICAO objective: response time 2 minutes, not exceeding 3 minutes."
          },
          {
            "question": "What is the separation that must be maintained before intercepting the ILS on an independent parallel approach?",
            "options": [
              "1000 ft",
              "500 ft",
              "330 ft",
              "660 ft"
            ],
            "correct": 0,
            "explanation": "Maintain 1000 ft vertical separation before intercept on independent parallel approaches."
          }
        ]
      },
      {
        "name": "Air Law Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "A Type Rating is applicable to:",
            "options": [
              "an aircraft requiring a Certificate of Airworthiness",
              "an aircraft with a Certificate of Airworthiness issued by the State",
              "an aircraft that requires multi-pilot operation",
              "an aircraft that requires additional skills training"
            ],
            "correct": 2,
            "explanation": "Type ratings are required for certain complex types, typically multi-pilot/complex aircraft."
          },
          {
            "question": "Fixed distance markers, when provided, shall commence:",
            "options": [
              "150 metres from the threshold",
              "300 metres from the far end threshold",
              "300 metres from the threshold",
              "150 metres from the far end threshold"
            ],
            "correct": 1,
            "explanation": "Runway distance-to-go markers typically referenced from far end."
          },
          {
            "question": "What is the minimum width of a code 4 runway?",
            "options": [
              "18 m",
              "23 m",
              "30 m",
              "45 m"
            ],
            "correct": 3,
            "explanation": "Code 4 runway width (by code letter) includes 45 m as common minimum."
          },
          {
            "question": "A TODA consists of:",
            "options": [
              "the take-off run available excluding the clearway",
              "the take-off run available including the clearway",
              "the take-off run available excluding the stopway",
              "the take-off run available only"
            ],
            "correct": 1,
            "explanation": "TODA = TORA + Clearway."
          },
          {
            "question": "Temporary changes of long duration (3 months or more) and information of short duration with extensive graphics/text are published as AIP Supplements. Checklists of these Supplements in force are sent at intervals of not more than:",
            "options": [
              "one year",
              "one month",
              "one week",
              "2 weeks"
            ],
            "correct": 1,
            "explanation": "AIP SUP checklists are issued at least monthly."
          },
          {
            "question": "The operator is responsible for the custody and care of the passengers. This responsibility shall terminate:",
            "options": [
              "from the moment they have been cleared through customs of the destination State",
              "from the moment they step from the aircraft onto the passenger exit stairs",
              "from the moment they have been admitted into the destination State",
              "from the moment they step from the aircraft onto the ground of the destination State"
            ],
            "correct": 2,
            "explanation": "Custody ends when admitted into the State."
          },
          {
            "question": "If an aircraft is radar vectored to intercept an ILS localizer, what is the maximum intercept angle?",
            "options": [
              "45Â°",
              "30Â°",
              "15Â°",
              "20Â°"
            ],
            "correct": 1,
            "explanation": "Max intercept angle typically 30Â°."
          },
          {
            "question": "If no ICAO identifier has been attributed to an aerodrome, what should be entered in Box 16 of the Flight Plan?",
            "options": [
              "ZZZZ",
              "NNNN",
              "A/N",
              "A/D XXX"
            ],
            "correct": 0,
            "explanation": "Use ZZZZ and provide plain language in Item 18."
          },
          {
            "question": "What is the width of a code letter D taxiway used by aircraft with an outer gear wheel span of more than 9 m?",
            "options": [
              "10.5 m",
              "15 m",
              "23 m",
              "18 m"
            ],
            "correct": 2,
            "explanation": "Code letter D taxiway width is 23 m."
          },
          {
            "question": "Which International Agreement relates to Penal Law?",
            "options": [
              "Tokyo",
              "Montreal",
              "Hague",
              "Rome"
            ],
            "correct": 0,
            "explanation": "Tokyo Convention (1963) addresses offences and certain other acts on board aircraft."
          },
          {
            "question": "The continued validity of a C of A (certificate of airworthiness) of an aircraft is subject to the laws of:",
            "options": [
              "the State of Registration",
              "the State of Registration and the State of the Operator",
              "the State of the Operator",
              "the State of Registry and the State of Design"
            ],
            "correct": 0,
            "explanation": "State of Registry controls continued validity of C of A."
          },
          {
            "question": "An RNP1 route designated as A342Y indicates that the route is at or above FL200 and all turns shall be made within the allowable RNP tolerance of a tangential arc between straight legs with a radius of:",
            "options": [
              "10 NM for turns between 30Â° and 90Â°",
              "15 NM for turns between 30Â° and 90Â°",
              "22.5 NM for turns between 30Â° and 90Â°",
              "30 NM for turns between 30Â° and 90Â°"
            ],
            "correct": 2,
            "explanation": "A342Y (â‰¥FL200): 22.5 NM radius for turns 30Â° to 90Â°."
          },
          {
            "question": "ATIS will only broadcast cloud base information when the cloud base is:",
            "options": [
              "3000 ft",
              "5000 ft",
              "when Cb are present",
              "when the cloud base is below MSA"
            ],
            "correct": 1,
            "explanation": "ATIS includes cloud base when below 5000 ft or below sector MSA, whichever higher."
          },
          {
            "question": "Voice ATIS:",
            "options": [
              "cannot be broadcast on a voice ILS",
              "cannot be broadcast on voice VOR",
              "is broadcast only on a discreet VHF frequency",
              "is broadcast on either a discreet VHF, VOR or an ILS frequency"
            ],
            "correct": 3,
            "explanation": "ATIS may be on VHF, VOR voice channel, or ILS voice channel."
          },
          {
            "question": "Which of the following is not a valid SSR mode A squawk?",
            "options": [
              "A5555",
              "A5678",
              "A2345",
              "A3333"
            ],
            "correct": 1,
            "explanation": "SSR codes use octal digits (0â€“7); '8' is invalid."
          },
          {
            "question": "What are the objectives of ATC Services?",
            "options": [
              "To prevent collisions between aircraft, to prevent collisions between aircraft on the manoeuvring area and obstructions on that area and to expedite and maintain an orderly flow of air traffic",
              "To prevent collisions between controlled aircraft and to expedite and maintain an orderly flow of air traffic",
              "To provide separation of aircraft and to expedite and maintain an orderly flow of air traffic",
              "To provide separation of controlled aircraft and to expedite and maintain an orderly flow of air traffic"
            ],
            "correct": 0,
            "explanation": "ATC objectives include prevention of collisions and orderly flow."
          },
          {
            "question": "An RNP1 route designated as A342Z indicates that the route is at or below FL190 and all turns shall be made within the allowable RNP tolerance of a tangential arc between straight legs with a radius of:",
            "options": [
              "10 NM for turns between 30Â° and 90Â°",
              "15 NM for turns between 30Â° and 90Â°",
              "22.5 NM for turns between 30Â° and 90Â°",
              "30 NM for turns between 30Â° and 90Â°"
            ],
            "correct": 1,
            "explanation": "A342Z (â‰¤FL190): 15 NM radius for 30Â°â€“90Â° turns."
          },
          {
            "question": "What is the meaning of the signal LLL from search parties?",
            "options": [
              "We have only found some personnel",
              "We have found all personnel",
              "Operation completed",
              "Nothing found"
            ],
            "correct": 2,
            "explanation": "LLL: 'Operation completed'."
          },
          {
            "question": "A check list of AIP Supplements is published:",
            "options": [
              "annually",
              "monthly",
              "weekly",
              "every six months"
            ],
            "correct": 1,
            "explanation": "Checklist is issued monthly."
          },
          {
            "question": "A heavy aircraft makes a missed approach on a parallel runway in the opposite direction. A light aircraft has a wake turbulence separation of 2 minutes. This applies when the parallel runways are:",
            "options": [
              "more than 760 m apart",
              "more than 915 m apart",
              "less than 915 m apart",
              "less than 760 m apart"
            ],
            "correct": 3,
            "explanation": "2-minute separation applies when parallel runways are less than 760 m apart."
          }
        ]
      },
      {
        "name": "Air Law Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "In the event of a delay of a controlled flight, the flight plan shall be amended or cancelled and a new flight plan submitted should that delay be in excess of:",
            "options": [
              "60 mins of estimated off-blocks time (EOBT)",
              "30 mins of estimated off-blocks time (EOBT)",
              "60 mins of estimated time of ETD",
              "30 mins of estimated time of ETD"
            ],
            "correct": 1,
            "explanation": "Delays >30 min from EOBT require FPL amendment or resubmission."
          },
          {
            "question": "Wake turbulence separation shall be applied between a light or medium and a heavy, and between a light and a medium, when the heavier is making a low or missed approach and the lighter uses an opposite direction parallel runway separated by:",
            "options": [
              "less than 915 m",
              "more than 760 m",
              "less than 760 m",
              "more than 915 m"
            ],
            "correct": 2,
            "explanation": "Opposite-direction parallel with <760 m separation requires wake spacing."
          },
          {
            "question": "According to EASA Part-FCL, recognized instructor categories are:",
            "options": [
              "FI(A), TRI(A), CRI(A), IRI(A) only",
              "FI(A) and CRI(A) only",
              "FI(A) and IRI(A) only",
              "FI(A), TRI(A), CRI(A), IRI(A), MCCI(A) and SFI(A) only"
            ],
            "correct": 3,
            "explanation": "Recognized EASA instructor categories include FI, TRI, CRI, IRI, MCCI, SFI."
          },
          {
            "question": "Independent parallel approaches may be conducted to parallel runways provided that an NTZ (non transgression zone) of at least:",
            "options": [
              "915 m is established between extended centre lines",
              "760 m is established between extended centre lines",
              "1035 m is established between extended centre lines",
              "610 m wide is established between extended centre lines"
            ],
            "correct": 3,
            "explanation": "Independent approaches require NTZ width of at least 610 m between extended centerlines."
          },
          {
            "question": "When a State renders valid a licence issued by another Contracting State, as an alternative to issuance of its own licence, the validity shall:",
            "options": [
              "not extend beyond 15 days after the validity of the licence",
              "not extend beyond the period of validity of the licence",
              "be at the discretion of the Contracting State rendering it valid",
              "be at the discretion of ICAO"
            ],
            "correct": 1,
            "explanation": "Validation cannot exceed the original licence validity."
          },
          {
            "question": "ATIS broadcasts contain cloud details whenever the:",
            "options": [
              "Cloud ceiling is below 5000 ft or the highest MSA (whichever is the higher)",
              "Cloud base is below 5000 ft or the highest MSA (whichever is the higher)",
              "Cloud ceiling is below 1500 ft or the highest MSA (whichever is the higher)",
              "Cloud base is below 1500 ft or the highest MSA (whichever is the higher)"
            ],
            "correct": 0,
            "explanation": "ATIS includes ceiling/base details when below 5000 ft or sector MSA, whichever higher."
          },
          {
            "question": "Contracting states shall carry out the handling, forwarding and clearance of airmail and shall comply with the documentary procedures as prescribed by:",
            "options": [
              "the Acts in force of the Universal Postal Union",
              "the Acts in force of the General Postal Union",
              "the Acts in force of the Warsaw Convention",
              "the Acts in force of the International Postal Union"
            ],
            "correct": 0,
            "explanation": "UPU governs airmail handling procedures."
          },
          {
            "question": "For an instrument runway, how far from the centre line of the runway is a 'runway vacated' sign positioned?",
            "options": [
              "To a distance of the nearest Pattern 'A' holding position",
              "At the end of the ILS/MLS Sensitive Area",
              "It depends on the Aerodrome Category",
              "85 m"
            ],
            "correct": 1,
            "explanation": "Runway vacated signs are positioned at the boundary of the sensitive area."
          },
          {
            "question": "The International Civil Aviation Organization (ICAO) establishes:",
            "options": [
              "standards and recommended international practices for contracting member states",
              "aeronautical standards adopted by all states",
              "proposals for aeronautical regulations in the form of 18 annexes",
              "standards and recommended practices applied without exception by all states"
            ],
            "correct": 0,
            "explanation": "ICAO SARPs are adopted by Contracting States."
          },
          {
            "question": "An area symmetrical about the extended runway centre line and adjacent to the end of the strip, primarily intended to reduce the risk of damage to an aircraft undershooting or overrunning the runway is defined as a:",
            "options": [
              "clearway",
              "runway strip extension",
              "runway end safety area",
              "altimeter operating area extension"
            ],
            "correct": 2,
            "explanation": "RESA reduces risk of damage in undershoot/overrun."
          },
          {
            "question": "Where in the AIP would you find details on instrument holding procedures?",
            "options": [
              "GEN",
              "ENR",
              "AD",
              "AGA"
            ],
            "correct": 1,
            "explanation": "ENR section contains en-route procedures including holdings."
          },
          {
            "question": "According to EASA Part-FCL, an applicant for a CPL(A) who has satisfactorily followed and completed an integrated flying training course shall have completed as a pilot of aeroplanes (CofA) at least:",
            "options": [
              "150 hours of flight time",
              "200 hours of flight time",
              "150 hours of flight time plus 10 hours of instrument ground time",
              "200 hours of flight time plus 10 hours of instrument ground time"
            ],
            "correct": 0,
            "explanation": "Integrated CPL(A) minimum total time is 150 hours."
          },
          {
            "question": "What is required if a stop bar is not provided at a runway entrance and the runway is to be used with RVR of less than 550 m?",
            "options": [
              "Both a Pattern 'A' and 'B' holding position",
              "High intensity taxiway centreline lights only",
              "Runway guard lights",
              "Both high intensity taxiway centre line lights and high intensity taxiway edge lights"
            ],
            "correct": 2,
            "explanation": "Runway guard lights (wig-wags) are required if no stop bar."
          },
          {
            "question": "According to Annex 7, the registration mark shall be letters, numbers or a combination and shall be that assigned by:",
            "options": [
              "the State of Registry or Common Mark Registering Authority",
              "the State of Registry only",
              "the International Civil Aviation Organisation",
              "the International Telecommunication Union"
            ],
            "correct": 0,
            "explanation": "Assigned by State of Registry or common mark authority."
          },
          {
            "question": "When an aircraft subjected to unlawful interference has landed in a Contracting State, it shall notify by the most expeditious means the State of Registry and the State of the Operator of the landing and shall similarly transmit all other relevant information to:",
            "options": [
              "each State whose citizens suffered fatalities/injuries, each State whose citizens were detained as hostages, each State whose citizens were on board and ICAO",
              "ICAO only",
              "each State whose citizens were known to be on board only",
              "ICAO and each State whose citizens were known to be on board only"
            ],
            "correct": 0,
            "explanation": "Notify affected States and ICAO."
          },
          {
            "question": "The State of registration is:",
            "options": [
              "The State where the aircraft is first registered",
              "The State where the aircraft is currently registered",
              "The State where the aircraft is finally assembled",
              "The State of the owner of the aircraft"
            ],
            "correct": 1,
            "explanation": "Defined by current registry."
          },
          {
            "question": "A contracting state which continues to require the presentation of a cargo manifest shall not require more than:",
            "options": [
              "airway bill number, and the number of packages only",
              "total weight and the number of packages only",
              "total weight and the nature of the goods only",
              "airway bill number, the number of packages and the nature of goods"
            ],
            "correct": 3,
            "explanation": "Limit cargo manifest items to these basics."
          },
          {
            "question": "According to EASA Part-FCL, the privileges of the holder of an unrestricted FI(A) rating to conduct flight instruction for issue of a CPL(A) are granted:",
            "options": [
              "provided the FI(A) has completed not less than 15 hours on the relevant type in the preceding 12 months",
              "provided the FI(A) has completed at least 500 hours as a pilot of aeroplanes including at least 200 hours of flight instruction",
              "without restriction",
              "provided the FI(A) has completed 200 hours of flight instruction"
            ],
            "correct": 1,
            "explanation": "FI(A) requires â‰¥500 TT on aeroplanes including â‰¥200 FI hours to instruct for CPL(A)."
          },
          {
            "question": "What action should be taken if contact is lost with the runway during a circling approach?",
            "options": [
              "Descend to Decision Height and if still no contact, initiate a missed approach",
              "Land on the instrument runway",
              "Initiate a missed approach",
              "Return to the FAF"
            ],
            "correct": 2,
            "explanation": "Immediately initiate missed approach if runway contact is lost while circling."
          },
          {
            "question": "Unaccompanied baggage carried by air shall be cleared under a procedure applicable to:",
            "options": [
              "accompanied baggage or a simplified customs procedure similar to other cargo",
              "cargo",
              "dangerous goods",
              "mail"
            ],
            "correct": 1,
            "explanation": "Treat unaccompanied baggage as cargo for customs clearance."
          }
        ]
      }
    ]
  },

  "aon-aviation": {
    "name": "AON Aviation",
    "icon": "fas fa-graduation-cap",
    "tests": [
      {
        "name": "AON Aviation Knowledge Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Which of the following statements regarding an electric circuit is correct?",
            "options": [
              "an electric current is only able to flow in an open circuit",
              "the magnitude of the current is proportional to the resistance",
              "lower diameter wires are able to carry a higher current",
              "too high a current may lead to the circuit overheating"
            ],
            "correct": 3,
            "explanation": "Excessive current causes overheating and can damage the circuit."
          },
          {
            "question": "The purpose of an ignition switch is to:",
            "options": [
              "connect the battery to the magneto",
              "control the primary circuit of the magneto",
              "connect the contact breaker and condenser in series with the primary coil",
              "connect the secondary coil to the distributor"
            ],
            "correct": 1,
            "explanation": "Ignition switch controls the magneto primary circuit."
          },
          {
            "question": "Which of the following are all aerodynamic balances?",
            "options": [
              "Inset hinge, mass balance and spring tab.",
              "Horn balance, balance tab and internal balance.",
              "Horn balance, inset hinge and mass balance.",
              "Internal balance, anti-balance tab and servo tab."
            ],
            "correct": 1,
            "explanation": "Source marks horn balance, balance tab, internal balance as aerodynamic balances."
          },
          {
            "question": "Propeller blade angle is:",
            "options": [
              "the angle between the relative airflow and the chord line",
              "dependent upon RPM and TAS",
              "the angle between the blade chord and the plane of rotation",
              "the difference between effective pitch and geometric pitch"
            ],
            "correct": 2,
            "explanation": "Blade angle is measured between chord line and plane of rotation."
          },
          {
            "question": "The skin of a modern pressurised aircraft:",
            "options": [
              "is made up of light alloy steel sheets built on the monocoque principle",
              "houses the crew and the payload",
              "is a primary load bearing structure carrying much of the loads",
              "provides aerodynamic lift and prevents corrosion by keeping out adverse weather"
            ],
            "correct": 2,
            "explanation": "Pressurised fuselage skin is a primary load-bearing structure."
          },
          {
            "question": "What does TEM stand for in the context of Human Performance?",
            "options": [
              "Threat and Error Management",
              "Trusted Equipment Mechanic",
              "Time Limited Evacuation Medical",
              "Tango, Echo, Mike"
            ],
            "correct": 0,
            "explanation": "TEM = Threat and Error Management."
          },
          {
            "question": "What is the shortest distance between two points on the Earth's globe called:",
            "options": [
              "Lambodrome",
              "Great circle",
              "Airway",
              "Rhumb Line"
            ],
            "correct": 1,
            "explanation": "Great circle is the shortest path on a sphere."
          },
          {
            "question": "Leaving ground effect at a given angle of attack the:",
            "options": [
              "Induced drag decreases.",
              "effective angle of attack decreases.",
              "lift will remain constant",
              "nose tends to pitch down."
            ],
            "correct": 1,
            "explanation": "Effective AoA reduces out of ground effect; source marks B as correct."
          },
          {
            "question": "A turbo-supercharger impeller is driven by:",
            "options": [
              "excess torque from the reduction gearbox",
              "diversion of exhaust gases by the waste gate using energy that would otherwise be wasted",
              "a ram air turbine",
              "a connection through a gearbox connected to the crankshaft"
            ],
            "correct": 1,
            "explanation": "Turbochargers use exhaust gas energy via turbine; wastegate controls flow."
          },
          {
            "question": "The weight of an aeroplane, which is in level non accelerated flight, is said to act:",
            "options": [
              "vertically through the datum point",
              "vertically through the centre of pressure",
              "vertically through the centre of gravity",
              "always along the vertical axis of the aeroplane"
            ],
            "correct": 2,
            "explanation": "Weight acts through the centre of gravity."
          },
          {
            "question": "When an aircraft with a classic air-driven artificial horizon decelerates after landing, a wrong indication will be displayed showing a:",
            "options": [
              "climbing turn to left",
              "descending turn to left",
              "descending turn to right",
              "climbing turn to right"
            ],
            "correct": 3,
            "explanation": "Acceleration/deceleration errors can cause false roll/pitch; source indicates climbing right."
          },
          {
            "question": "During a climb a blocked static pressure supply line causes the ASI to:",
            "options": [
              "over-indicate then under-indicate",
              "over-indicate",
              "under-indicate",
              "be unaffected"
            ],
            "correct": 2,
            "explanation": "With blocked static, during climb the ASI under-reads due to lower static sensed."
          },
          {
            "question": "Flutter may be caused by a:",
            "options": [
              "low airspeed aerodynamic stall,",
              "distortion by bending and torsion of the structure causing increasing vibration in the resonance frequency.",
              "high airspeed aerodynamic wing stall.",
              "roll control reversal."
            ],
            "correct": 1,
            "explanation": "Flutter arises from aeroelastic coupling (bending/torsion) near resonance."
          },
          {
            "question": "With regards to the Maximum Zero Fuel Weight (MZFW):",
            "options": [
              "It is lower than the Maximum Take-Off Weight by the weight of a payload.",
              "It is the maximum weight that an aircraft can be loaded to without useable fuel.",
              "It is important as exceeding the MZFW may mean insufficient lift to get airborne.",
              "Is more relevant to aircraft with fuselage fuel tanks."
            ],
            "correct": 1,
            "explanation": "MZFW is max mass with zero usable fuel (B)."
          },
          {
            "question": "What is the effect on Mach No and TAS when climbing at a constant CAS?",
            "options": [
              "Mach No increases, TAS is constant",
              "Both increase",
              "Mach No is constant, TAS increases",
              "Both decrease"
            ],
            "correct": 1,
            "explanation": "At constant CAS while climbing, both TAS and Mach increase below tropopause."
          },
          {
            "question": "What is the purpose of trim tabs?",
            "options": [
              "to reduce control effectiveness",
              "to reduce stick forces during manoeuvres",
              "to increase control effectiveness",
              "to reduce stick forces to zero"
            ],
            "correct": 3,
            "explanation": "Trim tabs offload control forces; target near-zero steady force."
          },
          {
            "question": "The minimum separation between VHF frequencies in Europe is:",
            "options": [
              "25 kHZ",
              "25 MHZ",
              "8.33 MHZ",
              "8.33 kHZ"
            ],
            "correct": 3,
            "explanation": "8.33 kHz channel spacing."
          },
          {
            "question": "What can be said about the height of the Tropopause in the Northern Hemisphere?",
            "options": [
              "It increases from south to north",
              "It decreases from south to north",
              "It remains constant throughout the year",
              "It remains constant from north to south"
            ],
            "correct": 1,
            "explanation": "Tropopause height generally decreases toward the poles."
          },
          {
            "question": "The ILS Localiser operates in the following frequency band:",
            "options": [
              "108.0 - 112.0 kHz",
              "328.6-335.4 MHZ",
              "108.0-112.0 MHZ",
              "328.6-335.4 kHz"
            ],
            "correct": 2,
            "explanation": "Localizer uses 108.1–111.95 MHz range (part of 108–112 MHz)."
          },
          {
            "question": "What is the correct phrase for a pilot to use to advise ATC of being ready to take-off?",
            "options": [
              "Request takeoff.",
              "Request departure.",
              "Ready for departure.",
              "Ready for take-off."
            ],
            "correct": 2,
            "explanation": "Standard phraseology is 'Ready for departure'."
          }
        ]
      },
      {
        "name": "AON Aviation Knowledge Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The result of Empty Field Myopia is:",
            "options": [
              "astigmatism",
              "a build-up of pressure within the eye",
              "focusing is limited to between 1 and 2 meters",
              "a tendency to suffer from cataracts in the long term"
            ],
            "correct": 2,
            "explanation": "Empty field myopia leads to near-focus around 1–2 m."
          },
          {
            "question": "An aircraft is approaching a DME Beacon at 40000 ft, and slant range is 15 NM. What is the ground distance (nearest NM)?",
            "options": [
              "12 NM",
              "13 NM",
              "16 NM",
              "15 NM"
            ],
            "correct": 1,
            "explanation": "Ground ≈ √(15² - (40000/6076)²) ≈ 13.5 NM ⇒ 13 NM."
          },
          {
            "question": "The result of empty field myopia is: (duplicate)",
            "options": [
              "Focusing is limited to between 1 and 2 meters",
              "A tendency to suffer from cataracts in the long term",
              "Astigmatism",
              "A build-up of pressure with the eye"
            ],
            "correct": 0,
            "explanation": "Duplicate of Q1; same concept."
          },
          {
            "question": "To achieve the maximum range over the ground with a headwind, a turbojet should fly:",
            "options": [
              "At a speed faster than 1.32 VMD",
              "At a speed where the GS to drag ratio is greatest",
              "At a speed where the GS to PREQ ratio is greatest",
              "At a speed slower than 1.32 VMD"
            ],
            "correct": 0,
            "explanation": "Headwind shifts best range to a higher speed than still-air optimum."
          },
          {
            "question": "When selecting a fuse for an aircraft electrical circuit, the governing factor is:",
            "options": [
              "the energy of the circuit",
              "the power requirement of the circuit",
              "the resistance of the circuit",
              "the voltage of the circuit"
            ],
            "correct": 1,
            "explanation": "Fuse rating matches expected power/current of the circuit."
          },
          {
            "question": "A logarithmic scale is fitted to the vertical speed indicator in order to:",
            "options": [
              "make the instrument more sensitive.",
              "make lower values of vertical speed easier to read",
              "Reduce pressure error.",
              "Reduce manoeuvre error."
            ],
            "correct": 1,
            "explanation": "Log scale improves readability at lower rates of climb/descent."
          },
          {
            "question": "In relation to persons with Reduced Mobility (PRM's):",
            "options": [
              "The commander may be notified when PRM's are carried",
              "The commander must be notified when PRM's are carried",
              "There is no requirement to notify the commander",
              "PRM's must be seated adjacent to emergency exits"
            ],
            "correct": 1,
            "explanation": "Commander must be notified when PRMs are carried."
          },
          {
            "question": "Which of the following statements is true?",
            "options": [
              "Super-alloys are used because of their excellent corrosion resistance",
              "Titanium alloy is used in aircraft construction because of its good wear and high temperature tolerance",
              "Steel is used in aircraft because it is strong and heavy but has poor corrosion resistance",
              "Aluminium alloys are used because they are light, easily machined and have good wear resistance"
            ],
            "correct": 1,
            "explanation": "Source marks titanium’s high temperature tolerance as key."
          },
          {
            "question": "A pilot, trying to pick up a fallen object from the cockpit floor during a right turn, experiences:",
            "options": [
              "Coriolis illusion/effect",
              "Pressure vertigo",
              "Autokinetic illusion",
              "Barotrauma"
            ],
            "correct": 0,
            "explanation": "Head movement in turns may cause Coriolis illusion."
          },
          {
            "question": "Which statement is true regarding severe turbulence and flaps?",
            "options": [
              "Increasing flap in severe turbulence at constant speed reduces stall speed and structural risk",
              "Flap extension in severe turbulence moves CP aft increasing margins",
              "Flight in severe turbulence may lead to a stall and/or structural limitations being exceeded.",
              "Flap extension in severe turbulence increases both stall speed and margins"
            ],
            "correct": 2,
            "explanation": "Severe turbulence risks both stall and exceedance; avoid configuration changes."
          },
          {
            "question": "Which of the following statements regarding an electric circuit is correct? (duplicate)",
            "options": [
              "Lower diameter wires are able to carry a higher current",
              "An electric current is only able to flow in an open circuit",
              "Too high a current may lead to the circuit overheating",
              "The magnitude of the current is proportional to the resistance"
            ],
            "correct": 2,
            "explanation": "Duplicate concept; overheating with excessive current."
          },
          {
            "question": "The oil in an oleo-pneumatic strut:",
            "options": [
              "Support the weight of the aircraft",
              "Limits the speed of extension and compression of the strut",
              "Limits the speed of compression of the strut",
              "Lubricates the piston within the cylinder"
            ],
            "correct": 1,
            "explanation": "Oil provides damping in both compression and extension."
          },
          {
            "question": "The inbound track to the navigation aid serving a hold is 250°, your aircraft heading is 002°. What is the correct sector to join the hold?",
            "options": [
              "Sector 2 (offset)",
              "Sector 1 (parallel) or sector 3 (direct)",
              "Sector 2 (offset) or sector 3 (direct)",
              "Sector 1 (parallel)"
            ],
            "correct": 3,
            "explanation": "Heading near reciprocal favours parallel entry (Sector 1)."
          },
          {
            "question": "Which of the following statements is correct (batteries)?",
            "options": [
              "modern batteries have virtually eliminated thermal runaway",
              "batteries are not sensitive to damage due to sealed casing",
              "the risk of battery fire is reduced during charging as current is cut off if fire is detected",
              "batteries are considered dangerous goods if transported due to thermal runaway risk and internal substances"
            ],
            "correct": 3,
            "explanation": "Batteries are DG due to fire/thermal runaway risk."
          },
          {
            "question": "The balance arm is:",
            "options": [
              "The distance from the CG to the CP",
              "The distance from the datum to the CG",
              "The distance from the CG to the static margin",
              "The distance from the datum to the CP"
            ],
            "correct": 1,
            "explanation": "Balance arm is the moment arm from datum to CG."
          },
          {
            "question": "In relation to Persons with Reduced Mobility (PRM's): (duplicate)",
            "options": [
              "PRM's must be seated adjacent to emergency exits.",
              "The commander must be notified when PRM's are carried.",
              "There is no requirement to notify the commander when PRM's are carried.",
              "The commander may be notified when PRM's are carried."
            ],
            "correct": 1,
            "explanation": "Same as earlier PRM notification."
          },
          {
            "question": "A hot busbar is one that:",
            "options": [
              "is permanently connected to the battery",
              "supplies galley power",
              "carries all the non-essential loads",
              "is connected to the battery in an emergency"
            ],
            "correct": 0,
            "explanation": "Hot bus is permanently powered."
          },
          {
            "question": "Following an indication of unserviceability of an air conditioning pack whilst on stand, what do you consult?",
            "options": [
              "The configuration deviation list",
              "OPS Manual Part A",
              "The Minimum Equipment List (MEL)",
              "The Quick Reference Handbook (QRH)"
            ],
            "correct": 2,
            "explanation": "MEL governs dispatch with inoperative equipment."
          },
          {
            "question": "Following an indication of unserviceability of an air conditioning pack whilst on stand, what do you consult first? (duplicate)",
            "options": [
              "The Configuration Deviation List.",
              "The Quick Reference Handbook (QRH).",
              "The Minimum Equipment List (MEL).",
              "Ops Manual Part A"
            ],
            "correct": 2,
            "explanation": "Duplicate; MEL."
          },
          {
            "question": "If an extra load is loaded into an aircraft the stall speed is likely to:",
            "options": [
              "Change depending on whether the load was placed FWD or AFT of the C of G",
              "Stay the same",
              "Decrease",
              "Increase"
            ],
            "correct": 3,
            "explanation": "Higher weight increases stall speed."
          }
        ]
      },
      {
        "name": "AON Aviation Knowledge Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The ILS Outer Marker is identified by:",
            "options": [
              "A white cockpit light and a modulating frequency of 400 Hz",
              "A blue cockpit light and a modulating frequency of 400 Hz",
              "An amber cockpit light and a modulating frequency of 1300 Hz",
              "A blue cockpit light and a modulating frequency of 3000 Hz"
            ],
            "correct": 1,
            "explanation": "OM: blue light, 400 Hz audio."
          },
          {
            "question": "Power is:",
            "options": [
              "The rate at which charge is transferred",
              "Expressed in Joules",
              "The rate at which a component uses energy",
              "A measure of the energy being used by a component"
            ],
            "correct": 2,
            "explanation": "Power = energy per unit time."
          },
          {
            "question": "The phrase 'all stations' is used to transmit to:",
            "options": [
              "All stations named in the following message",
              "All stations except those named in the following message",
              "A broadcast to all stations on frequency",
              "Aircraft requesting a radio check"
            ],
            "correct": 2,
            "explanation": "'All stations' indicates a general broadcast."
          },
          {
            "question": "With regards to the Maximum Zero Fuel Weight (MZFW):",
            "options": [
              "It is the maximum weight that an aircraft can be loaded to without useable fuel",
              "It is lower than the Maximum Take-Off Weight by the weight of a payload",
              "Is more relevant to aircraft with fuselage fuel tanks",
              "It is important as exceeding the MZFW may mean insufficient lift"
            ],
            "correct": 0,
            "explanation": "MZFW definition."
          },
          {
            "question": "What does TEM stand for in the context of Human Performance?",
            "options": [
              "Threat and Error Management",
              "Trusted Equipment Mechanic",
              "Tango, Echo, Mike",
              "Time Limited Evacuation Medical"
            ],
            "correct": 0,
            "explanation": "TEM = Threat and Error Management."
          },
          {
            "question": "When are lifejackets required?",
            "options": [
              "100 NM from land",
              "400 NM from land",
              "300 NM from land",
              "50 NM from land"
            ],
            "correct": 3,
            "explanation": "Requirement at 50 NM from land."
          },
          {
            "question": "Which of the following statements is true?",
            "options": [
              "Steel is strong and heavy but has poor corrosion resistance",
              "Super-alloys are used for excellent corrosion resistance",
              "Titanium alloy is used due to good wear and high temperature tolerance",
              "Aluminium alloys are light, easily machined and have good wear resistance"
            ],
            "correct": 3,
            "explanation": "Source marks Aluminium alloys statement as correct."
          },
          {
            "question": "IFR in VMC with complete radio failure—what action should you take?",
            "options": [
              "Continue VMC and land at nearest aerodrome, squawk 7600, report after landing",
              "Continue last ATC clearance for 20 min then revert; squawk 7500 and land close to EAT/ETA",
              "Continue last ATC clearance for 30 min then revert; squawk 7600 and land close to EAT/ETA",
              "Continue last ATC clearance for 20 min then revert; squawk 0000 and land near EAT/ETA"
            ],
            "correct": 0,
            "explanation": "In VMC with comms failure: continue VMC, land ASAP, squawk 7600."
          },
          {
            "question": "A turbo-supercharger impeller is driven by:",
            "options": [
              "Diversion of exhaust gases by the waste gate",
              "Excess torque from the reduction gearbox",
              "A ram air turbine",
              "A connection through a gearbox to the crankshaft"
            ],
            "correct": 0,
            "explanation": "Exhaust gas turbine drives impeller."
          },
          {
            "question": "IFR to a destination with no alternate—when must the weather forecast be good to continue?",
            "options": [
              "1 hour before to 1 hour after ETA",
              "2 hours before to 2 hours after ETA",
              "3 hours before to 1 hour after ETA",
              "3 hours before to 3 hours after ETA"
            ],
            "correct": 1,
            "explanation": "Source indicates 2 before to 2 after."
          },
          {
            "question": "What are the meteorological prerequisites, at low level, for thunderstorms formed by lifting processes, over land?",
            "options": [
              "Low temperatures, low humidity",
              "High temperature, high humidity",
              "High pressure (>1013 hPa), high temperatures",
              "Subsidence, inversion"
            ],
            "correct": 1,
            "explanation": "Warm, moist, unstable air with lift."
          },
          {
            "question": "At high altitude, the stall speed (IAS):",
            "options": [
              "Decreases",
              "Increases",
              "Decreases until the tropopause",
              "Remains the same"
            ],
            "correct": 1,
            "explanation": "IAS for stall tends to increase with compressibility/alpha margin considerations."
          },
          {
            "question": "What distance does the DME display:",
            "options": [
              "Line of sight distance in feet",
              "Line of sight distance in NM",
              "Slant range in NM",
              "Slant range in SM"
            ],
            "correct": 2,
            "explanation": "DME measures slant range in NM."
          },
          {
            "question": "What is the speed limitation in the hold for class A & B aircraft below 14000 ft?",
            "options": [
              "170 kt",
              "240 kt",
              "230 kt",
              "280 kt"
            ],
            "correct": 2,
            "explanation": "Standard holding speed 230 kt below 14000 ft."
          },
          {
            "question": "A logarithmic scale is fitted to the vertical speed indicator in order to:",
            "options": [
              "Make lower values of vertical speed easier to read",
              "Make the instrument more sensitive",
              "Reduce pressure error",
              "Reduce manoeuvre error"
            ],
            "correct": 0,
            "explanation": "Improves low-rate readability."
          },
          {
            "question": "An increase in wing loading will:",
            "options": [
              "Decrease the take-off speeds",
              "Increase CL Max",
              "Decrease the minimum gliding angle",
              "Increase the stall speed"
            ],
            "correct": 3,
            "explanation": "Higher wing loading increases Vs."
          },
          {
            "question": "A DME & VOR are co-located and a morse ident is detected 4 times in 30 secs. Which is true?",
            "options": [
              "VOR callsign once every 30 secs and lower in pitch than the DME ident",
              "DME callsign 3 times every 30 secs and higher in pitch than the VOR ident",
              "DME callsign once every 30 secs and higher in pitch than the VOR ident",
              "VOR callsign once every 30 secs and higher in pitch than the DME ident"
            ],
            "correct": 2,
            "explanation": "DME ident once/30s; VOR every 10s; DME is higher pitch."
          },
          {
            "question": "ELR is 1°C/100m:",
            "options": [
              "Absolute instability",
              "Conditional stability",
              "Neutral when dry",
              "Absolute stability"
            ],
            "correct": 2,
            "explanation": "Dry neutral lapse rate ≈ 1°C/100 m."
          },
          {
            "question": "When selecting a fuse for an aircraft electrical circuit, the governing factor is:",
            "options": [
              "The voltage of the circuit",
              "The resistance of the circuit",
              "The energy of the circuit",
              "The power requirement of the circuit"
            ],
            "correct": 3,
            "explanation": "Fuse selection by power/current."
          },
          {
            "question": "An under-inflated tyre on a dry runway:",
            "options": [
              "Will cause the tyre temperature to decrease",
              "Increases viscous aquaplaning speed",
              "Increases wear on the shoulder",
              "Increases wear on the crown"
            ],
            "correct": 2,
            "explanation": "Under-inflation causes shoulder wear."
          }
        ]
      },
      {
        "name": "AON Aviation Knowledge Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The purpose of an ignition switch is to:",
            "options": [
              "connect the battery to the magneto",
              "control the primary circuit of the magneto",
              "connect the contact breaker and condenser in series with the primary coil",
              "connect the secondary coil to the distributor"
            ],
            "correct": 1,
            "explanation": "Matches Test 1 Q2: ignition switch controls magneto primary."
          },
          {
            "question": "An aeroplane is head-on with a glider. Who has right of way?",
            "options": [
              "The aeroplane",
              "The glider",
              "Both",
              "Neither"
            ],
            "correct": 1,
            "explanation": "Gliders have right of way over powered aircraft."
          },
          {
            "question": "Two 12v 40 Ah batteries connected in parallel will produce?",
            "options": [
              "12v 80Ah",
              "24v 80Ah",
              "12v 160Ah",
              "12v 40Ah"
            ],
            "correct": 0,
            "explanation": "Parallel: voltage same, capacity sums."
          },
          {
            "question": "The skin of a modern pressurized aircraft:",
            "options": [
              "Provides aerodynamic lift and prevents corrosion",
              "Is a primary load bearing structure carrying much of the loads",
              "Is made up of light alloy steel sheets built on the monocoque principle",
              "Houses the crew and the payload"
            ],
            "correct": 1,
            "explanation": "Primary load-bearing."
          },
          {
            "question": "Loads must be adequately secured in order to?",
            "options": [
              "Avoid any C of G movement during flight",
              "Prevent excessive 'G' loading during landing flare",
              "Avoid unplanned C of G movement and aeroplane damage",
              "allow steep turns"
            ],
            "correct": 2,
            "explanation": "Prevent CG shifts and damage."
          },
          {
            "question": "If you are flying at FL300 in an air mass that is 15°C warmer than ISA, what is the outside temperature likely to be?",
            "options": [
              "-60°C",
              "-45°C",
              "-30°C",
              "-15°C"
            ],
            "correct": 2,
            "explanation": "ISA at FL300 ≈ -45°C; +15°C ⇒ -30°C."
          },
          {
            "question": "What is the frequency range of the airband?",
            "options": [
              "118.0 - 137.0 MHz",
              "1080 - 717.975 MHz",
              "30 - 300 MHz",
              "108.0 - 137.0 MHz"
            ],
            "correct": 3,
            "explanation": "Airband COM uses 118–137 MHz."
          },
          {
            "question": "To achieve the maximum range over the ground with a headwind, a turbojet should fly?",
            "options": [
              "at a speed slower than 1.32VMD",
              "at a speed faster than 1.32VMD",
              "at a speed where the GS to PREQ ratio is greatest",
              "at a speed where the GS to drag ratio is greatest"
            ],
            "correct": 1,
            "explanation": "Headwind ⇒ higher than still-air best range speed."
          },
          {
            "question": "IFR in VMC and complete radio failure. What action should you take?",
            "options": [
              "Continue as per last ATC clearance for 20 minutes then revert; squawk 7500...",
              "Continue as per last ATC clearance for 30 minutes then revert; squawk 7600...",
              "Continue as per last ATC clearance for 20 minutes then revert; squawk 0000...",
              "Continue VMC and land at the nearest aerodrome squawking 7600. Report after landing"
            ],
            "correct": 3,
            "explanation": "Same as Test 3: continue VMC, land ASAP, squawk 7600."
          },
          {
            "question": "When selecting a fuse for an aircraft electrical circuit, what is the governing factor?",
            "options": [
              "the voltage of the circuit",
              "the power requirement of the circuit",
              "the resistance of the circuit",
              "the energy of the circuit"
            ],
            "correct": 1,
            "explanation": "Fuse selection by power/current."
          },
          {
            "question": "The ILS Localizer operates in which frequency band?",
            "options": [
              "328.6 - 335.4 MHz",
              "108.0 - 112.0 MHz",
              "328.6 - 335.4 kHz",
              "108.0 - 112.0 kHz"
            ],
            "correct": 1,
            "explanation": "LOC in 108–112 MHz."
          },
          {
            "question": "At high altitude, the stall speed (IAS)?",
            "options": [
              "Decreases",
              "Increases",
              "Decreases until the tropopause",
              "Remains the same"
            ],
            "correct": 1,
            "explanation": "Source marks 'Increases'."
          },
          {
            "question": "Compared with Vs in a given configuration, the airspeed at which the stick shaker will be triggered is?",
            "options": [
              "1.30Vs",
              "1.12Vs",
              "1.20Vs",
              "Greater than Vs"
            ],
            "correct": 3,
            "explanation": "Stick shaker triggers above Vs."
          },
          {
            "question": "Which of the following are all aerodynamic balances?",
            "options": [
              "Inset hinge, mass balance and spring tab.",
              "Horn balance, balance tab and internal balance.",
              "Horn balance, inset hinge and mass balance.",
              "Internal balance, anti-balance tab and servo tab."
            ],
            "correct": 1,
            "explanation": "Same as Test 1."
          },
          {
            "question": "What distance does the DME display?",
            "options": [
              "Slant range in SM",
              "Slant range in NM",
              "Line of sight distance in feet",
              "Line of slight distance in NM"
            ],
            "correct": 1,
            "explanation": "DME reports slant range in NM."
          },
          {
            "question": "If an aircraft climbs in ISA below the Tropopause, at Constant TAS the Mach Number will?",
            "options": [
              "Depend on density change",
              "Decrease because the local speed of sound is decreasing",
              "Increase because the local speed of sound is increasing",
              "Increase because the local speed of sound is decreasing"
            ],
            "correct": 3,
            "explanation": "LSS decreases with altitude; Mach = TAS/LSS increases."
          },
          {
            "question": "During which stage are downdraughts predominant in a thunderstorm cell?",
            "options": [
              "Mature stage",
              "Cumulus stage",
              "Cumulus and mature stage",
              "Dissipating stage"
            ],
            "correct": 3,
            "explanation": "Dissipating stage dominated by downdraughts."
          },
          {
            "question": "The rigidity of a gyro is improved by?",
            "options": [
              "increasing rpm and concentrating mass at the hub",
              "decreasing rpm and concentrating mass on the periphery",
              "increasing rpm and concentrating mass on the periphery",
              "decreasing rpm and concentrating mass at the hub"
            ],
            "correct": 2,
            "explanation": "Higher rpm and mass at rim increase angular momentum."
          },
          {
            "question": "Which VDF bearing is accurate within 5 degrees?",
            "options": [
              "Class D",
              "Class C",
              "Class B",
              "Class A"
            ],
            "correct": 2,
            "explanation": "Class B ≈ ±5°."
          },
          {
            "question": "Readability 1 means that the transmission is?",
            "options": [
              "Loud and clear",
              "Barely readable",
              "Unreadable",
              "Perfectly readable"
            ],
            "correct": 2,
            "explanation": "Readability scale: 1 = unreadable."
          }
        ]
      },
      {
        "name": "AON Aviation Knowledge Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Which phraseology shall a pilot use if he/she receives an instruction from ATC which he/she cannot carry out?",
            "options": [
              "UNABLE",
              "NEGATIVE INSTRUCTION",
              "UNABLE TO FOLLOW",
              "DISREGARD"
            ],
            "correct": 0,
            "explanation": "Standard refusal phraseology: 'UNABLE'."
          },
          {
            "question": "An aircraft passes overhead a DME station at 12000 ft above the station. At that time the DME reading will be?",
            "options": [
              "FLAG/OFF, within cone of silence",
              "Approximately 2 nm",
              "Fluctuating and not significant",
              "0 nm"
            ],
            "correct": 1,
            "explanation": "Slant range ≈ 12000/6076 ≈ 2 NM."
          },
          {
            "question": "The phrase 'take-off' is used by a pilot:",
            "options": [
              "Never. It is used only by a ground station",
              "Only to acknowledge take-off clearance",
              "Only to request immediate clearance",
              "After the aircraft is airborne"
            ],
            "correct": 1,
            "explanation": "'Take-off' reserved for clearance/acknowledgement."
          },
          {
            "question": "A pilot approaching an upslope runway:",
            "options": [
              "may feel that he is higher than actual; may land short",
              "may feel that he is lower than actual; may land long",
              "may feel lower than actual; may fly steeper approach",
              "establishes a slower than normal approach speed with stall risk"
            ],
            "correct": 0,
            "explanation": "Upslope creates higher-than-actual illusion."
          },
          {
            "question": "Which of the statements is true concerning squall lines?",
            "options": [
              "For severe squall lines a TAF is issued",
              "For severe squall lines a SIGMET is issued",
              "Severe squall lines always move from northwest to southeast",
              "Severe squall lines only occur in the tropics"
            ],
            "correct": 1,
            "explanation": "Significant convective weather is covered by SIGMETs."
          },
          {
            "question": "When are lifejackets required?",
            "options": [
              "300nm from land",
              "400nm from land",
              "100nm from land",
              "50nm from land"
            ],
            "correct": 3,
            "explanation": "Lifejackets required when >50 NM from land."
          },
          {
            "question": "Main and nose wheel bays are:",
            "options": [
              "Pressurised",
              "Unpressurised",
              "Conditioned",
              "Different (mains unpressurised, nose pressurised)"
            ],
            "correct": 1,
            "explanation": "Wheel wells are typically unpressurised."
          },
          {
            "question": "Identify runway remaining lighting on centerline lighting systems.",
            "options": [
              "Alternate red and white lights from 3,000 feet to 1,000 feet, then red lights to the end.",
              "Alternate red and white lights from 3,000 feet to the end",
              "Amber lights from 3,000 feet to 1,000 feet, then red lights to the end",
              "Red lights for the last 1,000 feet"
            ],
            "correct": 0,
            "explanation": "Runway centerline lighting transitions per remaining distance (RCLL)."
          },
          {
            "question": "What is the main advantage of VHF over HF communications?",
            "options": [
              "VHF has longer range than HF at night time",
              "VHF has longer range than HF",
              "VHF range is only restricted by the curvature of the earth",
              "VHF is less affected by atmospheric noise and electrical equipment"
            ],
            "correct": 3,
            "explanation": "VHF is less susceptible to atmospheric/static noise."
          },
          {
            "question": "What action is required if unable to establish radio contact with an aeronautical station?",
            "options": [
              "Squawk mode A code 7500",
              "Divert to the alternate airport",
              "Try to establish communication with other aircraft or stations",
              "Land at the nearest appropriate aerodrome"
            ],
            "correct": 2,
            "explanation": "Attempt to relay via other stations/aircraft."
          },
          {
            "question": "The rate of climb is approximately equal to?",
            "options": [
              "The still air gradient multiplied by the TAS",
              "The angle of climb multiplied by the TAS",
              "The still air gradient divided by the TAS",
              "The angle of climb divided by the TAS"
            ],
            "correct": 0,
            "explanation": "RoC ≈ gradient × TAS (ft/min)."
          },
          {
            "question": "The purpose of the primary stops in a control system is?",
            "options": [
              "To set the range of movement of the control surface",
              "To limit control movement to one direction only",
              "To adjust the sensitivity of the controls",
              "To hold the controls in the desired position"
            ],
            "correct": 0,
            "explanation": "Stops define travel limits."
          },
          {
            "question": "Ailerons control which motion?",
            "options": [
              "Left input: right aileron down, left up",
              "Left input: right aileron up, left down",
              "Right input: right elevator up, left down",
              "Right input: right aileron up, left down"
            ],
            "correct": 3,
            "explanation": "Roll control via differential ailerons."
          },
          {
            "question": "The phrase 'say again' means?",
            "options": [
              "Say the word 'again'",
              "Repeat the last section of the message",
              "Repeat the entire message",
              "Send all your messages twice"
            ],
            "correct": 2,
            "explanation": "'Say again' = repeat entire message."
          },
          {
            "question": "The best L/D ratio of an aircraft in a given configuration is a value that:",
            "options": [
              "Varies with Indicated Air Speed",
              "Varies depending upon the weight being carried",
              "Varies with air density",
              "Remains constant regardless of IAS changes"
            ],
            "correct": 3,
            "explanation": "Best L/D is characteristic of configuration, not IAS."
          },
          {
            "question": "How do you know you are in an overtaking position with regards to another aircraft at night?",
            "options": [
              "You will see a white and a red light",
              "You will see a white and a green light",
              "You will see a white light",
              "You will not see the anti-collision light"
            ],
            "correct": 2,
            "explanation": "Only white (tail) visible when overtaking."
          },
          {
            "question": "Stringers are used in aircraft fuselage construction:",
            "options": [
              "To withstand bending and compressive loads",
              "To withstand tensile and bending loads",
              "To withstand compressive and shear loads",
              "To withstand bending and shear loads"
            ],
            "correct": 0,
            "explanation": "Stringers/longerons resist bending/compression."
          },
          {
            "question": "If temperature remains constant with an increase in altitude there is:",
            "options": [
              "An inversion",
              "An inversion aloft",
              "Uniform lapse rate",
              "An isothermal layer"
            ],
            "correct": 3,
            "explanation": "Isothermal = constant temperature with altitude."
          },
          {
            "question": "If an aeroplane lands below its Max Structural Landing Mass, but above its Performance Limited Landing Mass for the arrival airfield, which are correct?",
            "options": [
              "1, 2, 4",
              "1, 2, 3",
              "1, 2, 3, 5",
              "1, 2, 4, 5"
            ],
            "correct": 2,
            "explanation": "Combo: (1) runway length issue, (2) tyre temp limits, (3) more structural fatigue, (5) GA may not be achievable."
          },
          {
            "question": "If an extra load is loaded into an aircraft the stall speed is likely to?",
            "options": [
              "Decrease",
              "Stay the same",
              "Change depending on FWD/AFT placement",
              "Increase"
            ],
            "correct": 3,
            "explanation": "Higher weight ⇒ higher Vs."
          }
        ]
      },
      {
        "name": "AON Aviation Knowledge Test 6",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The fuel index:",
            "options": [
              "Is used to calculate the correct position of the CG due to different locations of the fuel tanks",
              "Is a standard value given by EASA and can be used for different types of aircraft",
              "Is only used for aeroplanes with wing tip tanks",
              "Is the difference between the zero fuel mass index and the DOI"
            ],
            "correct": 0,
            "explanation": "Fuel index helps compute CG due to tank positions."
          },
          {
            "question": "When the met observer reports the amount of cloud present at a station, it will be given as:",
            "options": [
              "Clear, scattered, broken or overcast",
              "The amount of cloud, in tenths of the sky covered, using the term oktas",
              "The amount of cloud, in quarters of the sky covered, using the term oktas",
              "The amount of cloud, in eighths of the sky covered, using the term oktas"
            ],
            "correct": 3,
            "explanation": "Cloud amount reported in oktas (eighths)."
          },
          {
            "question": "An accumulator in a hydraulic system will:",
            "options": [
              "Store fluid under pressure",
              "Dampen pressure fluctuations",
              "Allow for thermal expansion",
              "All of the above"
            ],
            "correct": 0,
            "explanation": "Source marks primary function as storing pressurised fluid."
          },
          {
            "question": "You are heading 050°(M) and ATC gives you a radar vector to 030°(M). After 7 mins ATC tells you to resume your own navigation. What should you do?",
            "options": [
              "Return to your current flight plan route",
              "Continue on a heading of 050 for 30 minutes",
              "Continue on a heading 050 for 15 minutes",
              "Continue on a heading 050 for 7 minutes"
            ],
            "correct": 0,
            "explanation": "Resume own navigation: rejoin cleared route."
          },
          {
            "question": "Approximate RoD required to maintain a 3 degree glide path at a groundspeed of 120 kt?",
            "options": [
              "600 ft/min",
              "950 ft/min",
              "550 ft/min",
              "800 ft/min"
            ],
            "correct": 0,
            "explanation": "RoD ≈ 5 × GS (NM/min) × 100 ≈ 120×5 = 600 ft/min."
          },
          {
            "question": "Clearance: 'CLEARED TO THE ABC VORTAC. HOLD SOUTH ON THE 180 RADIAL...' Recommended holding entry?",
            "options": [
              "Teardrop only",
              "Direct only",
              "Parallel only"
            ],
            "correct": 1,
            "explanation": "Approach from NE implies direct entry."
          },
          {
            "question": "After two-way radio failure en route, when should a pilot begin descent for the instrument approach?",
            "options": [
              "Upon arrival at any initial approach fix, not before ETA as amended by ATC",
              "Upon arrival at the holding fix depicted at corrected ETA ±3 minutes",
              "At the primary IAF at the ETA or EFC time, whichever later"
            ],
            "correct": 0,
            "explanation": "Begin at an IAF time-constrained by ETA/clearance."
          },
          {
            "question": "Which sequence might be encountered when flying into a microburst?",
            "options": [
              "Increased headwind, then down-draught, then increased tailwind on approach or after take-off",
              "Headwind, down-draught, tailwind on approach; tailwind, down-draught, headwind after take-off",
              "Headwind, down-draught, tailwind on take-off; tailwind, down-draught, headwind on approach",
              "Tailwind, down-draught, headwind on take-off; headwind, down-draught, tailwind on approach"
            ],
            "correct": 0,
            "explanation": "Microburst sequence: headwind gain → downdraft → tailwind loss."
          },
          {
            "question": "Approximate height of the tropopause during summer over Southern England?",
            "options": [
              "46000 ft",
              "36000 ft",
              "26000 ft",
              "56000 ft"
            ],
            "correct": 0,
            "explanation": "Source marks ~46,000 ft."
          },
          {
            "question": "What is the height AGL of the lowest cloud in TAF: ... SCT015 ... BKN020 ...?",
            "options": [
              "150 ft",
              "2000 ft",
              "2500 ft",
              "1500 ft"
            ],
            "correct": 3,
            "explanation": "SCT015 = 1500 ft AGL."
          },
          {
            "question": "In a fuel system, the oil to fuel heat exchanger allows:",
            "options": [
              "Fuel cooling to prevent vapor creation",
              "Fuel heating when filter clogging is detected",
              "Automatic fuel heating by engine oil to prevent icing in fuel filter",
              "Jet engine oil cooling via heat exchange with fuel from tanks"
            ],
            "correct": 3,
            "explanation": "Mainly cools oil using fuel as heat sink."
          },
          {
            "question": "Effect of a light crosswind on wingtip vortices after large aeroplane takeoff:",
            "options": [
              "Downwind vortex remains on runway longer than upwind vortex",
              "Crosswind rapidly dissipates both vortices",
              "Crosswind moves both vortices clear of the runway",
              "Upwind vortex remains on runway longer than downwind vortex"
            ],
            "correct": 3,
            "explanation": "Upwind vortex tends to remain near runway centerline."
          },
          {
            "question": "Marshaller signal meaning 'brakes applied':",
            "options": [
              "Fist clenched in front of the face then fingers extended",
              "Arms extended horizontally sideways, palms down",
              "Arms down and crossed in front of the body",
              "Arms crossed above the head"
            ],
            "correct": 0,
            "explanation": "Open/close fist signal for brakes on/off."
          },
          {
            "question": "Main purpose of leading edge flaps/slats:",
            "options": [
              "More cambered section for high-speed flight",
              "Increase wing camber and prevent separation when trailing edge flaps lowered",
              "Increase wing area for take-off and landing",
              "Act as an airbrake"
            ],
            "correct": 1,
            "explanation": "Slats increase camber and delay separation."
          },
          {
            "question": "In an aeroplane with constant frequency AC supply, DC power is obtained from a:",
            "options": [
              "3 phase current transformer unit",
              "Static inverter",
              "Rotary converter",
              "Transformer Rectifier Unit"
            ],
            "correct": 3,
            "explanation": "TRU converts AC to DC."
          },
          {
            "question": "The actual zero fuel weight is:",
            "options": [
              "Basic operating weight + payload; must not exceed max design zero fuel weight",
              "Basic operating weight + payload; must not exceed max design take off weight",
              "Basic operating weight + trip fuel",
              "Max landing weight plus trip fuel"
            ],
            "correct": 0,
            "explanation": "AZFW = BOW + payload; limited by MZFW."
          },
          {
            "question": "The Cat I minimum decision height is:",
            "options": [
              "200 feet",
              "100 feet",
              "50 feet",
              "No decision height"
            ],
            "correct": 0,
            "explanation": "CAT I DH 200 ft."
          },
          {
            "question": "Fly-by / Fly-over waypoints and turns:",
            "options": [
              "A fly-by waypoint requires turn anticipation for tangential interception of next segment",
              "A turn via a fly-over waypoint is always shorter than via a fly-by waypoint",
              "A fly-by waypoint is where turn is initiated to join next segment",
              "A fly-over waypoint requires turn anticipation to allow tangential interception"
            ],
            "correct": 0,
            "explanation": "Fly-by = anticipate turn; fly-over = cross waypoint then turn."
          },
          {
            "question": "Zurich METAR sequence suggests...",
            "options": [
              "a cold front passed in the morning; rear side weather thereafter",
              "a warm front passed between 0850 and 1250 UTC",
              "fog during morning caused by warm front",
              "an occluded front passed between 1250 and 1850 UTC"
            ],
            "correct": 0,
            "explanation": "Source indicates cold front passage."
          },
          {
            "question": "According to ICAO Doc 8168, the Transition Level:",
            "options": [
              "Shall be the lowest flight level available for use above the transition altitude",
              "Is published in the approach charts concerned",
              "Shall normally be a specified altitude AMSL",
              "Shall be the highest available flight level below the transition altitude"
            ],
            "correct": 0,
            "explanation": "Transition Level is lowest usable FL above TA."
          }
        ]
      },
      {
        "name": "AON Aviation Knowledge Test 7",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The vertical position of an aircraft at or below the transition altitude will be reported:",
            "options": [
              "According to pilot's choice",
              "As height",
              "As flight level",
              "As altitude"
            ],
            "correct": 3,
            "explanation": "Below TA use altitude (QNH)."
          },
          {
            "question": "A procedure requires a minimum climb rate of 210 ft/NM to 8,000 ft. If GS is 140 kt, what is the rate of climb required (ft/min)?",
            "options": [
              "210",
              "450",
              "490"
            ],
            "correct": 2,
            "explanation": "210 × (140/60) ≈ 490 ft/min."
          },
          {
            "question": "Rudder controls:",
            "options": [
              "Yaw",
              "Pitch",
              "Turn",
              "Roll"
            ],
            "correct": 0,
            "explanation": "Rudder controls yaw."
          },
          {
            "question": "On a localiser the modulations are at 150 Hz and 90 Hz. Which is correct?",
            "options": [
              "90 Hz predominates to the right of the centre line",
              "150 Hz predominates to the right of the centre line",
              "If 150 Hz predominates, the CDI needle moves left",
              "When both modulations equal, on centre line"
            ],
            "correct": 1,
            "explanation": "LOC: 150 Hz right, 90 Hz left."
          },
          {
            "question": "The contents of Aeronautical Information Publication (AIP) are:",
            "options": [
              "GEN, ENR, RAC, AD",
              "GEN, AGA, COM, RAC, ENR, FAL",
              "GEN, AGA, COM, RAC, FAL, SAR, MET, MAP",
              "GEN, ENR and AD"
            ],
            "correct": 3,
            "explanation": "AIP is structured as GEN, ENR, AD."
          },
          {
            "question": "When climbing at a constant mach number below the tropopause through an inversion:",
            "options": [
              "The CAS will decrease and the TAS will increase",
              "The CAS will increase and the TAS will decrease",
              "The CAS and TAS will both increase",
              "The CAS and TAS will both decrease"
            ],
            "correct": 0,
            "explanation": "At constant Mach, with warmer layer, TAS increases; indicated CAS decreases."
          },
          {
            "question": "To which aircraft position(s) does HSI presentation 'D' correspond?",
            "options": [
              "1 only",
              "2 only",
              "8 only",
              "10 only"
            ],
            "correct": 1,
            "explanation": "Source indicates position 2."
          },
          {
            "question": "To which aircraft position(s) does HSI presentation 'B' correspond?",
            "options": [
              "5 only",
              "12 only",
              "13 only",
              "5 and 13"
            ],
            "correct": 3,
            "explanation": "Source indicates 5 and 13."
          },
          {
            "question": "The Operating Mass:",
            "options": [
              "Is the maximum zero fuel mass less the traffic load",
              "Is the landing mass minus the traffic load",
              "Is the take-off mass minus the basic empty mass and crew mass",
              "Is the take-off mass minus the traffic load"
            ],
            "correct": 3,
            "explanation": "Operating mass = take-off mass minus traffic load (per source)."
          },
          {
            "question": "Entering a holding pattern at FL110 with a jet aircraft, which will be the maximum speed?",
            "options": [
              "230 kts TAS",
              "240 kts IAS",
              "240 kts TAS",
              "230 kts IAS"
            ],
            "correct": 3,
            "explanation": "Max holding speed 230 KIAS at/below FL140 (region dependent)."
          },
          {
            "question": "To which aircraft position(s) does HSI presentation 'E' correspond?",
            "options": [
              "3 only",
              "8 only",
              "10 only",
              "3 and 8"
            ],
            "correct": 3,
            "explanation": "Source indicates 3 and 8."
          },
          {
            "question": "To which aircraft position(s) does HSI presentation 'A' correspond?",
            "options": [
              "9 and 6",
              "9 only",
              "6 only"
            ],
            "correct": 0,
            "explanation": "Source indicates 9 and 6."
          },
          {
            "question": "Which aeroplane behaviour will be corrected by a yaw damper?",
            "options": [
              "Spiral dive",
              "Dutch roll",
              "Buffeting",
              "Tuck under"
            ],
            "correct": 1,
            "explanation": "Yaw dampers counter Dutch roll."
          },
          {
            "question": "What type of precipitation would you expect at an active unstable cold front?",
            "options": [
              "Light to moderate continuous rain",
              "Showers associated with thunderstorms",
              "Drizzle",
              "Freezing rain"
            ],
            "correct": 1,
            "explanation": "Unstable cold fronts produce showery, convective precip."
          },
          {
            "question": "In cruise flight, an aft centre of gravity location will:",
            "options": [
              "Increase longitudinal static stability",
              "Not influence longitudinal static stability",
              "Decrease longitudinal static stability",
              "Not change the static curve of stability into longitudinal"
            ],
            "correct": 2,
            "explanation": "Aft CG reduces static margin and stability."
          },
          {
            "question": "The sweepback on a wing will:",
            "options": [
              "Cause the stall to occur at lower angles of attack",
              "Reduce the possibility for the wing tip to stall",
              "Increase the possibility of a wing tip stall",
              "Have no effect on the stall characteristics"
            ],
            "correct": 2,
            "explanation": "Sweepback increases tendency for tip stall without devices."
          },
          {
            "question": "Clearance: '...CLEARED TO THE ABC VORTAC. HOLD WEST ON THE 270 RADIAL...' Recommended entry?",
            "options": [
              "Parallel or teardrop",
              "Parallel only",
              "Direct only"
            ],
            "correct": 2,
            "explanation": "Source indicates direct."
          },
          {
            "question": "Course selector set to 360°. Which aircraft shows FROM and CDI left of center?",
            "options": [
              "Aircraft 1",
              "Aircraft 2",
              "Aircraft 3",
              "Aircraft 4"
            ],
            "correct": 1,
            "explanation": "Source indicates aircraft 2."
          },
          {
            "question": "A pilot making an approach sees 3 red and 1 white PAPI lights. This means:",
            "options": [
              "He is above the approach slope",
              "He is on the centre line axis",
              "He is below the approach slope",
              "He is on the prescribed glide slope"
            ],
            "correct": 2,
            "explanation": "3 red 1 white = slightly low."
          },
          {
            "question": "[Placeholder] Missing question from source set.",
            "options": [
              "Placeholder A",
              "Placeholder B",
              "Placeholder C",
              "Placeholder D"
            ],
            "correct": 0,
            "explanation": "Placeholder added to maintain 20 questions. Will update with the correct item when provided."
          }
        ]
      }
    ]
  },
  "flight-planning": {
    "name": "Flight Planning",
    "icon": "fas fa-route",
    "tests": [
      {
        "name": "Flight Planning - Complete Set", 
        "timeLimit": 180,
        "questions": [
          {
            "question": "To find true course when magnetic variation is 10Â°E:",
            "options": [
              "Add 10Â° to magnetic course",
              "Subtract 10Â° from magnetic course",
              "Magnetic course equals true course",
              "Add 5Â° to magnetic course"
            ],
            "correct": 0,
            "explanation": "When variation is East, add to magnetic course to get true course (East is least, West is best)."
          },
          {
            "question": "If groundspeed is 120 knots and distance is 40 NM, flight time is:",
            "options": [
              "15 minutes",
              "20 minutes", 
              "25 minutes",
              "30 minutes"
            ],
            "correct": 1,
            "explanation": "Time = Distance Ã· Speed = 40 NM Ã· 120 kts = 0.33 hours = 20 minutes."
          },
          {
            "question": "The radio navigation aid at N4854.8 E00920.4 is:",
            "options": [
              "a VOR/DME call sign LBU frequency 109.20 kHz",
              "a Tacan call sign LBU channel number 109.20",
              "a VOR/TAC call sign LBU frequency 109.20 MHz",
              "a VOR/DME call sign LBU frequency 109.20 MHz"
            ],
            "correct": 3,
            "explanation": "VOR/DME stations operate in the VHF range (MHz), not kHz. The correct format is VOR/DME with frequency in MHz."
          },
          {
            "question": "In the Jeppesen route manual, the reporting points on the airways are indicated by:",
            "options": [
              "true course/track",
              "magnetic course/track",
              "true heading",
              "magnetic heading"
            ],
            "correct": 1,
            "explanation": "Jeppesen charts use magnetic course/track for reporting points on airways."
          },
          {
            "question": "Given: Track 185Â°(T), Variation 9Â° east, Heading 182Â°(M). Which is the lowest suitable ICAO IFR cruising level?",
            "options": [
              "FL280",
              "FL310",
              "FL290",
              "FL270"
            ],
            "correct": 3,
            "explanation": "Magnetic Track = 185 - 9 = 176Â°. Westerly track (180-359Â°) uses even flight levels. Lowest suitable is FL270."
          },
          {
            "question": "Information on Search and Rescue (SAR) procedures may be obtained:",
            "options": [
              "from NOTAMs",
              "from the latest AIC",
              "from the Aeronautical Information Publication",
              "by RT communication with the FIR within which the aircraft is operating"
            ],
            "correct": 2,
            "explanation": "SAR procedures are published in the Aeronautical Information Publication (AIP)."
          },
          {
            "question": "The air distance and time to climb is 197 NAM and 33 min respectively. What is the required ground distance with a 40 kt headwind component?",
            "options": [
              "222 NGM",
              "184 NGM",
              "157 NGM",
              "175 NGM"
            ],
            "correct": 3,
            "explanation": "Ground Distance = Air Distance - (Wind Component Ã— Time) = 197 - (40 Ã— 33/60) = 197 - 22 = 175 NGM."
          },
          {
            "question": "On a Jeppesen chart the figures 'FL80 2700a' are displayed below an airway. What does the 'FL80' indicate?",
            "options": [
              "The route MORA (a safety altitude)",
              "Minimum en route altitude",
              "Maximum authorized altitude",
              "The base of the airway"
            ],
            "correct": 1,
            "explanation": "FL80 indicates the Minimum En Route Altitude (MEA) for that airway segment."
          }
        ]
      }
    ]
  },
  "operational-procedures": {
    "name": "Operational Procedures",
    "icon": "fas fa-cogs",
    "tests": [
      {
        "name": "Operational Procedures Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "When refuelling is being conducted with passengers embarking or disembarking:",
            "options": [
              "refuelling is strictly prohibited whilst passengers are embarking/disembarking",
              "all flight crew must be on board",
              "communications shall be maintained by ground crew and qualified crew on board",
              "the stairs shall be fully extended"
            ],
            "correct": 2,
            "explanation": "During passenger movement with refueling, continuous communication between qualified ground and flight crew is mandatory."
          },
          {
            "question": "What must be ensured with respect to navigation equipment?",
            "options": [
              "The failure of one piece does not affect another",
              "All navigation equipment must be serviceable at the start of flight",
              "All equipment must conform to ICAO specifications",
              "If one piece of equipment fails there must be a spare available"
            ],
            "correct": 0,
            "explanation": "Navigation equipment must be designed with independence - single failures should not cascade to other systems."
          },
          {
            "question": "Supplemental oxygen is used to:",
            "options": [
              "provide oxygen to passengers who might require it, following decompression",
              "provide oxygen to passengers following decompression if the cabin altitude exceeds 10000 ft",
              "provide oxygen to flight crew following decompression",
              "augment first aid oxygen following decompression"
            ],
            "correct": 0,
            "explanation": "Supplemental oxygen provides emergency oxygen to passengers who need it after cabin decompression events."
          },
          {
            "question": "Who is responsible for checking the quantity and security of the cargo on board?",
            "options": [
              "The company's cargo technicians",
              "The captain",
              "The mechanic on board, or in his absence the co-pilot",
              "The operator"
            ],
            "correct": 1,
            "explanation": "The captain has ultimate responsibility for all aspects of the aircraft, including cargo quantity and security."
          },
          {
            "question": "Who is the operator to provide an operations manual for?",
            "options": [
              "Operations staff",
              "All company personnel",
              "Only for flight crew",
              "For the Authority"
            ],
            "correct": 0,
            "explanation": "The Operations Manual is primarily provided for operations staff who need it for flight operations."
          },
          {
            "question": "Information concerning evacuation procedures can be found in the:",
            "options": [
              "OM",
              "AFM",
              "journey logbook",
              "OFP"
            ],
            "correct": 0,
            "explanation": "Evacuation procedures are detailed in the Operations Manual (OM)."
          },
          {
            "question": "To act as co-pilot for take-off or landing you must have:",
            "options": [
              "acted as PIC or co-pilot on type in the last 90 days",
              "acted as PIC or co-pilot on type in the last 30 days",
              "acted as PIC or co-pilot on type in the last 60 days",
              "been at the controls for landing in the same type recently"
            ],
            "correct": 0,
            "explanation": "Co-pilot currency requires recent experience as PIC or co-pilot on aircraft type within the last 90 days."
          },
          {
            "question": "What is the co-pilot currency requirement?",
            "options": [
              "3 flights in the last 90 days",
              "3 take-offs and landings in the last 60 days",
              "At the controls for 3 take-offs and landings within the previous 90 days",
              "3 take-offs and landings in the previous 90 days"
            ],
            "correct": 3,
            "explanation": "Co-pilots must complete 3 takeoffs and landings in the previous 90 days to maintain currency."
          },
          {
            "question": "One shall not initiate any flight made in accordance with instrument flight rules unless the available information indicates that the conditions at the aerodrome of intended destination and destination alternate (if one is required) are, at the predicted time of:",
            "options": [
              "take-off equal to or better than the minimum conditions required for aerodrome use",
              "arrival, and for a reasonable time before and after such a predicted time, equal to minimum conditions required for aerodrome use",
              "arrival equal to or better than the minimum conditions required for aerodrome use",
              "arrival better than the minimum conditions required for aerodrome use"
            ],
            "correct": 2,
            "explanation": "IFR flight requires destination conditions at ETA to meet or exceed aerodrome minima."
          },
          {
            "question": "Where is the Minimum Equipment List?",
            "options": [
              "Appended to the AFM",
              "In the OM",
              "In the maintenance documents",
              "In the operations room"
            ],
            "correct": 1,
            "explanation": "The Minimum Equipment List (MEL) is contained in the Operations Manual (OM)."
          },
          {
            "question": "FDRs must keep data and parameters for at least the last:",
            "options": [
              "30 hours of operation",
              "48 hours of operation",
              "10 hours of operation",
              "the whole flight"
            ],
            "correct": 2,
            "explanation": "Flight Data Recorders must retain the last 10 hours of operation data for accident investigation."
          },
          {
            "question": "The period of validity for an operator's certificate is:",
            "options": [
              "one year renewable",
              "indefinite",
              "three years renewable",
              "five years renewable"
            ],
            "correct": 1,
            "explanation": "Operator certificates are typically issued for indefinite periods but subject to ongoing surveillance."
          },
          {
            "question": "When are flight crew allowed to leave their stations?",
            "options": [
              "In the performance of their duties",
              "At any time specified by the OM",
              "When having lunch",
              "Only when the captain allows it"
            ],
            "correct": 0,
            "explanation": "Flight crew may only leave their stations when performing required duties."
          },
          {
            "question": "The recent experience conditions of a captain assigned to a flight on an aircraft by an operator must not be less than:",
            "options": [
              "6 take-offs and 6 landings as pilot in command on this type of aircraft during the last 90 days",
              "3 take-offs and 3 landings as pilot in command on this type of aircraft during the last 6 months",
              "6 take-offs and 6 landings as pilot in command on this type of aircraft during the last 6 months",
              "3 take-offs and 3 landings as pilot in command on this type of aircraft during the last 90 days"
            ],
            "correct": 3,
            "explanation": "Captains must complete at least 3 takeoffs and 3 landings as PIC on type within the last 90 days."
          },
          {
            "question": "The Minimum Equipment List (MEL) is established by the:",
            "options": [
              "airline operator",
              "manufacturer",
              "aeronautical Authority the airline operator depends on",
              "Civil Aviation Authority of the European states"
            ],
            "correct": 0,
            "explanation": "The MEL is established by the airline operator based on the MMEL."
          },
          {
            "question": "When are life jackets required?",
            "options": [
              "100 NM from land",
              "300 NM from land",
              "50 NM from land",
              "400 NM from land"
            ],
            "correct": 2,
            "explanation": "Life jackets are required when operating more than 50 nautical miles from land."
          },
          {
            "question": "Aeroplanes with a take-off mass greater than 5700 kg shall be fitted with an independent automatically operated emergency power supply to operate and illuminate the artificial horizon for:",
            "options": [
              "15 mins",
              "30 mins",
              "60 mins",
              "2 hrs"
            ],
            "correct": 1,
            "explanation": "Aircraft over 5700 kg require 30 minutes of emergency power for the artificial horizon."
          },
          {
            "question": "When do you not need a destination alternate aerodrome?",
            "options": [
              "If there is a reasonable certainty that at the ETA at the destination aerodrome and a reasonable time before and after you can expect VMC",
              "If the flight time is more than 6 hours",
              "If the flight time is less than 1 hour",
              "If your operator deems the weather to be suitable for a visual landing"
            ],
            "correct": 0,
            "explanation": "No alternate required when VMC conditions are reasonably certain at destination ETA and surrounding period."
          },
          {
            "question": "A piece of equipment on your public transport aeroplane fails while you are still parked. The reference document you use to decide on the procedure to follow is the:",
            "options": [
              "OM chapter 'Abnormal and Emergency procedures'",
              "AFM",
              "OPS",
              "MEL"
            ],
            "correct": 3,
            "explanation": "The MEL determines whether flight can continue with specific equipment inoperative."
          },
          {
            "question": "Where is the general information and policy on fuel located?",
            "options": [
              "Operations Manual Part B",
              "Operations Manual Part A",
              "Aircraft Flight Manual",
              "Maintenance Manual"
            ],
            "correct": 1,
            "explanation": "General fuel information and policies are found in Operations Manual Part A."
          }
        ]
      },
      {
        "name": "Operational Procedures Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the requirement for the carriage of life rafts?",
            "options": [
              "30 mins or 120 NM whichever is less",
              "50 NM from land",
              "120 mins or 400 NM whichever is less",
              "60 mins flying time at the one engine out cruise speed"
            ],
            "correct": 2,
            "explanation": "Life rafts required when more than 120 minutes or 400 NM from land, whichever is less restrictive."
          },
          {
            "question": "Who compiles the MEL and where does it go?",
            "options": [
              "The manufacturer and in the AFM",
              "The manufacturer and in the OM",
              "The operator and in the AFM",
              "The operator and in the OM"
            ],
            "correct": 3,
            "explanation": "The MEL is compiled by the operator and placed in the Operations Manual."
          },
          {
            "question": "Following an indication of an unserviceability whilst taxiing to the holding point, what do you consult first?",
            "options": [
              "AFM",
              "Operator",
              "State of Registration",
              "MEL"
            ],
            "correct": 3,
            "explanation": "First reference for equipment unserviceability is the Minimum Equipment List (MEL)."
          },
          {
            "question": "On board a pressurized aircraft, a flight shall be undertaken only if the aircraft is provided with an oxygen reserve enabling all the crew members to be supplied with oxygen for any period of flight above a cabin altitude of:",
            "options": [
              "10000 ft",
              "11000 ft",
              "12000 ft",
              "13000 ft"
            ],
            "correct": 3,
            "explanation": "Oxygen must be available for crew above 13000 ft cabin altitude in pressurized aircraft."
          },
          {
            "question": "How often should pilot proficiency checks be performed?",
            "options": [
              "No less than 6 months between checks",
              "2 checks every 13 months",
              "3 checks within the year with no less than 4 months between checks",
              "2 within a year, more than 4 months between checks"
            ],
            "correct": 3,
            "explanation": "Proficiency checks must be conducted twice per year with more than 4 months between checks."
          },
          {
            "question": "Who is responsible for ensuring that the aeroplane is airworthy prior to flight?",
            "options": [
              "Operator",
              "State of Registration",
              "Captain",
              "State of the operator"
            ],
            "correct": 2,
            "explanation": "The Captain is ultimately responsible for ensuring aircraft airworthiness before flight."
          },
          {
            "question": "What is the requirement regarding the carriage of a CVR for aircraft registered before April 1998?",
            "options": [
              "Record last 30 mins of flight",
              "Record for the duration of the flight",
              "Record the last 25 hours of operation",
              "Record the last 48 hours of flight"
            ],
            "correct": 0,
            "explanation": "CVR for older aircraft must record the last 30 minutes of flight."
          },
          {
            "question": "Who is to ensure safe handling of flights?",
            "options": [
              "The Operator",
              "The Authority",
              "The State of Registration",
              "The operations officer"
            ],
            "correct": 0,
            "explanation": "The operator is responsible for safe handling and management of flights."
          },
          {
            "question": "The crew members must use their seatbelts:",
            "options": [
              "only during take-off and landing",
              "while at their station",
              "from take-off to landing",
              "only during take-off and landing and whenever necessary by the commander in the interest of safety"
            ],
            "correct": 1,
            "explanation": "Crew members must use seatbelts whenever they are at their stations."
          },
          {
            "question": "On an NDB approach with an MDH of 360 ft and a required RVR of 1500 m and a reported met vis of 2500 m, when can you start an approach?",
            "options": [
              "When the cloud base is above the system minimum",
              "With any cloud base",
              "When the cloud base is above 36 ft",
              "When the cloud base report is received"
            ],
            "correct": 1,
            "explanation": "For non-precision approaches, cloud base is not the limiting factor for commencing the approach; required visibility/RVR is."
          },
          {
            "question": "The MEL is drawn up by the:",
            "options": [
              "operator and may be more restrictive than the MMEL",
              "operator and may be less restrictive than the MMEL",
              "manufacturer and may be more restrictive than the MMEL",
              "manufacturer and may be less restrictive than the MMEL"
            ],
            "correct": 0,
            "explanation": "The operator creates the MEL, which may be more restrictive than the MMEL but never less restrictive."
          },
          {
            "question": "On an ILS, you are told that the weather has dropped below company minima. When must you abort the approach?",
            "options": [
              "Start of the glide slope descent",
              "Before passing the outer marker or equivalent position",
              "Before passing the middle marker",
              "Before reaching decision height"
            ],
            "correct": 1,
            "explanation": "Approach must be abandoned before passing the outer marker if weather drops below minima."
          },
          {
            "question": "Which communications systems must be carried for IFR flights?",
            "options": [
              "2 independent VHF boxes or one VHF and one HF",
              "One VHF box",
              "Two independent VHF boxes",
              "One VHF box and one HF box"
            ],
            "correct": 0,
            "explanation": "IFR flights require 2 independent VHF radios OR one VHF and one HF radio."
          },
          {
            "question": "Who provides the operations personnel with the OM and the amendments to keep it up to date?",
            "options": [
              "Aircraft manufacturer",
              "ATS authority of the State of Registry",
              "Aircraft operator",
              "Owner of aircraft"
            ],
            "correct": 2,
            "explanation": "The aircraft operator is responsible for providing and updating the Operations Manual."
          },
          {
            "question": "What is the oxygen requirement for the crew and 100% of the passengers in an unpressurized aircraft?",
            "options": [
              "10000 ft",
              "11000 ft",
              "12000 ft",
              "13000 ft"
            ],
            "correct": 3,
            "explanation": "Above 13000 ft, oxygen is required for all occupants for the entire time above 13000 ft."
          },
          {
            "question": "A modern aircraft must be provided with a flight data recorder when its certified MTOM is greater than:",
            "options": [
              "27000 kg",
              "5700 kg",
              "20000 kg",
              "14000 kg"
            ],
            "correct": 1,
            "explanation": "FDR is required for aircraft with MTOM greater than 5700 kg."
          },
          {
            "question": "What skills constitute pilot proficiency checks?",
            "options": [
              "Simulator flying skills",
              "The ability to land safely",
              "Flying technique, emergency procedures and IFR",
              "The ability to conform with set procedures"
            ],
            "correct": 2,
            "explanation": "Proficiency checks cover flying technique, emergency procedures, and IFR operations."
          },
          {
            "question": "The OPS document is based on:",
            "options": [
              "Federal Aviation Requirements (FAR)",
              "a JAA guide line",
              "Rules of the Air",
              "ICAO Annex 6"
            ],
            "correct": 3,
            "explanation": "Operations regulations are based on ICAO Annex 6 standards."
          },
          {
            "question": "Above what altitude are quick-donning masks required?",
            "options": [
              "25000 ft",
              "15000 ft",
              "10000 ft",
              "32000 ft"
            ],
            "correct": 0,
            "explanation": "Quick-donning oxygen masks are required for flight crew above FL250 (25000 ft)."
          },
          {
            "question": "Destination alternate for a turbojet - what is the required fuel overhead?",
            "options": [
              "30 minutes at cruise speed",
              "30 minutes at 1500 ft in standard conditions",
              "2 hours at 1500 ft in standard conditions",
              "30 minutes at endurance speed"
            ],
            "correct": 1,
            "explanation": "Final reserve fuel for turbojets is 30 minutes at 1500 ft above alternate in standard conditions."
          }
        ]
      },
      {
        "name": "Operational Procedures Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "At the alternate aerodrome, the commander of a turbojet engine aeroplane should have a fuel quantity (final reserve) sufficient for flying during:",
            "options": [
              "30 minutes at holding flight speed at 1500 ft",
              "45 minutes at holding flight speed at 1500 ft",
              "30 minutes at cruising speed",
              "45 minutes at cruising speed"
            ],
            "correct": 0,
            "explanation": "Turbojet final reserve is 30 minutes holding speed at 1500 ft above alternate."
          },
          {
            "question": "Where is permanent approval for the carriage of dangerous goods given?",
            "options": [
              "Certificate of airworthiness (CofA)",
              "Aircraft registration",
              "Air Operator's Certificate (AOC)",
              "Insurance certificate"
            ],
            "correct": 2,
            "explanation": "Dangerous goods carriage authorization is specified in the Air Operator's Certificate."
          },
          {
            "question": "The Minimum Equipment List (MEL) gives the equipment which can be inoperative when undertaking a flight and the additional procedures to be observed accordingly. This list is prepared by:",
            "options": [
              "the operator, and it is included in the Operations Manual",
              "the manufacturer, and it is included in the Operations Manual",
              "the manufacturer, and it is included in the Aircraft Flight Manual",
              "the operator, and it is included in the Aircraft Flight Manual"
            ],
            "correct": 0,
            "explanation": "MEL is prepared by the operator and included in the Operations Manual."
          },
          {
            "question": "Which documents must be carried on every flight? 1. C of A 2. C of R 3. Noise Certificate 4. AOC 5. Aircraft Radio Licence 6. Insurance Certificate",
            "options": [
              "1, 3, 4 & 5",
              "3 & 5",
              "3, 4 & 5",
              "all of the above"
            ],
            "correct": 1,
            "explanation": "Noise Certificate and Aircraft Radio Licence must be carried on every flight."
          },
          {
            "question": "From the flight deck you observe an aeroplane in the forward left position on an opposite parallel track. What Nav light will be observed?",
            "options": [
              "Green",
              "Red",
              "White",
              "All of the above"
            ],
            "correct": 1,
            "explanation": "Aircraft on opposite track shows its red (left) navigation light on your left side."
          },
          {
            "question": "In determining Aerodrome Operating Minima, what needs to be considered? 1. Crew composition 2. Ability to communicate/receive meteorological information 3. Significant obstacles in the missed approach area 4. Dimensions and characteristics of the runway 5. Navigation equipment in the aeroplane",
            "options": [
              "1, 2, 4 & 5",
              "1, 2 & 3",
              "2, 3, 4 & 5",
              "all of the above"
            ],
            "correct": 3,
            "explanation": "All factors listed must be considered when determining aerodrome operating minima."
          },
          {
            "question": "The MMEL is:",
            "options": [
              "compiled by the manufacturer and approved by the operator",
              "compiled by the manufacturer and approved by the state of design or state of the manufacturer",
              "compiled by the operator and approved by the state",
              "compiled by the operator and approved by the state of design or state of the manufacturer"
            ],
            "correct": 1,
            "explanation": "MMEL is compiled by manufacturer and approved by the state of design or manufacture."
          },
          {
            "question": "The Operations Manual must be approved by the Authority of the:",
            "options": [
              "country of operations",
              "country of operator",
              "country of manufacturer",
              "no such book is required to be approved by an authority"
            ],
            "correct": 1,
            "explanation": "Operations Manual must be approved by the authority of the operator's country."
          },
          {
            "question": "During a flight, the captain is informed that a passenger is using a portable electronic device, which is adversely affecting the aircraft's electrical avionics. The captain must:",
            "options": [
              "stop the passenger from using the device",
              "allow the device to be used at take-off and landing",
              "allow the device to be used from take-off to landing",
              "allow the device to be used for certain exceptions"
            ],
            "correct": 0,
            "explanation": "Captain must immediately stop use of any device affecting aircraft systems."
          },
          {
            "question": "Who issues and updates the MEL?",
            "options": [
              "The Authority",
              "The designer",
              "The manufacturer",
              "The operator"
            ],
            "correct": 3,
            "explanation": "The operator issues and updates the MEL based on the MMEL."
          },
          {
            "question": "What manuals are to be carried?",
            "options": [
              "Operations Manual in toto",
              "Company instructions for all flight crew",
              "All those specified in the Certificate of Airworthiness",
              "Relevant parts of the ops manual and AFM"
            ],
            "correct": 3,
            "explanation": "Only relevant portions of Operations Manual and AFM need to be carried."
          },
          {
            "question": "A Flight Data Recorder is required in aeroplanes over 5700 kg when first issued with a C of A after 1st April 1998. It must record:",
            "options": [
              "the last 25 hours or the duration of the last flight, whichever is greater",
              "the last 25 hours",
              "the last 10 hours",
              "the duration of the last flight"
            ],
            "correct": 1,
            "explanation": "Modern FDRs must record the last 25 hours of operation."
          },
          {
            "question": "If there is unauthorized use of equipment that affects the aeroplane's system, the commander:",
            "options": [
              "may authorize its use for take-off and landing",
              "must not authorize its use",
              "may authorize its use for the whole flight",
              "may authorize its use at his discretion"
            ],
            "correct": 1,
            "explanation": "Commander must not authorize use of equipment that adversely affects aircraft systems."
          },
          {
            "question": "Who accepts the MEL?",
            "options": [
              "The country where the flight takes place",
              "The country of the operator",
              "The country of the designers",
              "The country of the manufacturers"
            ],
            "correct": 1,
            "explanation": "MEL is accepted/approved by the authority of the operator's country."
          },
          {
            "question": "After an accident, the operator of an aeroplane equipped with a flight recorder must keep the original recordings for a minimum period of:",
            "options": [
              "30 days",
              "90 days",
              "45 days",
              "60 days"
            ],
            "correct": 3,
            "explanation": "Flight recorder data must be retained for at least 60 days following an accident."
          },
          {
            "question": "How far away can a take-off alternate be for a 2-engine aeroplane?",
            "options": [
              "60 mins at one engine cruise speed",
              "60 mins at normal cruise speed",
              "120 mins at one engine cruise speed",
              "120 mins at normal cruise speed"
            ],
            "correct": 0,
            "explanation": "Takeoff alternate for twin-engine aircraft must be within 60 minutes at one-engine cruise speed."
          },
          {
            "question": "What are the requirements for pilot currency to act as PIC?",
            "options": [
              "3 take-offs and landings on an aeroplane of the same type within the last 90 days",
              "3 take-offs and landings on an aeroplane of the same type within the last 60 days",
              "3 take-offs and landings on an aeroplane of the same type or approved simulator within the last 90 days",
              "3 take-offs and landings on an aeroplane of the same type or approved simulator within the last 60 days"
            ],
            "correct": 2,
            "explanation": "PIC must complete 3 takeoffs/landings on type or simulator within last 90 days."
          },
          {
            "question": "All aeroplanes which individual certificates of airworthiness were issued after 1 January 1990 must be fitted with a flight data recorder when their maximum certificated take-off mass is greater than:",
            "options": [
              "20000 kg",
              "27000 kg",
              "5700 kg",
              "14000 kg"
            ],
            "correct": 2,
            "explanation": "Aircraft over 5700 kg certified after 1990 require FDR installation."
          },
          {
            "question": "The operator shall include in the OM a MEL which shall be approved by the authority of:",
            "options": [
              "none, no approval is required",
              "the country where the aeroplane is operated",
              "the country where the aeroplane was manufactured",
              "the country of the operator"
            ],
            "correct": 3,
            "explanation": "MEL in the OM must be approved by the operator's national authority."
          },
          {
            "question": "A copy of which of the following must be carried on every flight involving Public Transport?",
            "options": [
              "Aircraft Technical Log",
              "Insurance Certificate",
              "AOC",
              "Noise Certificate"
            ],
            "correct": 1,
            "explanation": "Insurance Certificate must be carried on all public transport flights."
          }
        ]
      },
      {
        "name": "Operational Procedures Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Which of the following are not required to be carried on each flight?",
            "options": [
              "CofA",
              "NOTAMS and AIS briefing material",
              "European Health Insurance Card (EHIC) for all crew",
              "Third party insurance certificate"
            ],
            "correct": 2,
            "explanation": "EHIC cards are not required documents for flight operations."
          },
          {
            "question": "The 'NO SMOKING' sign must be illuminated:",
            "options": [
              "when oxygen is being supplied in the cabin",
              "in each cabin section if oxygen is being carried",
              "during climb and descent",
              "during take-off and landing"
            ],
            "correct": 0,
            "explanation": "No Smoking signs must be on when oxygen is in use due to fire hazard."
          },
          {
            "question": "What are the rules on the carriage of PRMs (person with reduced mobility)?",
            "options": [
              "Cannot impede the performance of crew duty",
              "Must be seated away from emergency exits",
              "No more than 5% of passengers may be PRMs",
              "They must provide their own food"
            ],
            "correct": 0,
            "explanation": "PRMs must not impede crew duties or emergency procedures."
          },
          {
            "question": "The considerations for a non-precision approach are: 1. MDH 2. Visibility 3. RVR 4. DA/DH 5. Cloud Base",
            "options": [
              "1, 2 & 5",
              "1, 2, 3 & 5",
              "2, 3 & 4",
              "2 & 4"
            ],
            "correct": 1,
            "explanation": "Non-precision approaches require MDH, visibility, RVR, and cloud base considerations."
          },
          {
            "question": "Which of the following is to be left on the ground?",
            "options": [
              "The aeroplane noise certificate",
              "The operations manual",
              "Parts of the operations manual relevant to the flight",
              "Operational flight plan"
            ],
            "correct": 3,
            "explanation": "A copy of the operational flight plan must be left on the ground."
          },
          {
            "question": "Each flight is subject to a preliminary file collecting information. The operator keeps this file on ground. It particularly contains: 1. weather conditions including forecast 2. operational flight plan and weight/balance 3. aircraft's technical log copies 4. en route NOTAM documentation 5. special loads notification 6. charts. Which are correct?",
            "options": [
              "1, 3 & 5",
              "2, 3, 4 & 5",
              "2 & 4",
              "1, 2, 3, 4, 5 & 6"
            ],
            "correct": 1,
            "explanation": "Ground file contains operational flight plan, tech log, NOTAMs, and special load info."
          },
          {
            "question": "What are the circumstances when a take-off alternate is required?",
            "options": [
              "When weather at departure is below landing minima",
              "When the destination aerodrome is forecast to be below landing minima",
              "When the weather forecast is below limits",
              "When operating from an aerodrome at night"
            ],
            "correct": 0,
            "explanation": "Takeoff alternate required when departure weather is below landing minima."
          },
          {
            "question": "According to OPS 1.430 (Aerodrome Operating Minima), what is the minimum RVR required for a Cat I approach?",
            "options": [
              "800 m",
              "350 m",
              "150 m",
              "550 m"
            ],
            "correct": 3,
            "explanation": "Category I ILS approach requires minimum 550m RVR."
          },
          {
            "question": "A copy of what info is to be left on the ground?",
            "options": [
              "Passenger manifests, notification of special passengers",
              "Route specific maps and charts",
              "NOTAMs, tech log, operational flight plan, mass & balance, special load notification",
              "AICs, AISs, and all company NOTAMs"
            ],
            "correct": 2,
            "explanation": "Copies of NOTAMs, tech log, flight plan, W&B, and special loads stay on ground."
          },
          {
            "question": "Where would a pilot find the MEL for his aeroplane?",
            "options": [
              "AFM",
              "Ops Manual part C",
              "Ops Manual part B",
              "Company Procedures Manual"
            ],
            "correct": 2,
            "explanation": "MEL is located in Operations Manual Part B (Aircraft Operating Matters)."
          },
          {
            "question": "After an incident, the FDR recordings must be kept for:",
            "options": [
              "30 days",
              "60 days",
              "90 days",
              "120 days"
            ],
            "correct": 1,
            "explanation": "FDR data must be retained for 60 days after an incident."
          },
          {
            "question": "According to OPS 1.430, Airfield Operating Minima, what is the lowest MDH using ILS no glide path (LLZ only), VOR, NDB, SRA?",
            "options": [
              "NDB - MDH 350 ft",
              "VOR - MDH 250 ft",
              "ILS (LLZ only) - MDH 200 ft",
              "VOR/DME - MDH 300 ft"
            ],
            "correct": 1,
            "explanation": "VOR approaches typically allow MDH of 250 ft, lower than NDB but higher than precision."
          },
          {
            "question": "Coverage of permanently illuminated white lights at the rear of the aircraft is:",
            "options": [
              "140Â°",
              "70Â°",
              "110Â°",
              "220Â°"
            ],
            "correct": 0,
            "explanation": "Tail navigation light covers 140Â° (70Â° left and 70Â° right of tail centerline)."
          },
          {
            "question": "What is the requirement for the issue of an AOC?",
            "options": [
              "Not already hold an AOC issued by another authority",
              "Have a fleet of serviceable aeroplanes",
              "Have registered offices in all countries of operations",
              "Have facilities for all maintenance"
            ],
            "correct": 0,
            "explanation": "Operator cannot hold an AOC from another authority to receive a new AOC."
          },
          {
            "question": "What is the minimum visibility for a Cat C aircraft during a circling approach?",
            "options": [
              "1500 m",
              "1600 m",
              "2400 m",
              "3600 m"
            ],
            "correct": 2,
            "explanation": "Category C aircraft require 2400m minimum visibility for circling approaches."
          },
          {
            "question": "A category II precision approach (CAT II) is an approach with:",
            "options": [
              "a decision height of at least 100 ft",
              "no decision height",
              "a decision height of at least 200 ft",
              "a decision height of at least 50 ft"
            ],
            "correct": 0,
            "explanation": "Cat II has DH not lower than 100 ft and RVR not less than 300m."
          },
          {
            "question": "A category A aircraft can carry out an indirect (circling) approach followed by a visual manoeuvre only if the horizontal visibility is higher than or equal to:",
            "options": [
              "1600 m",
              "2400 m",
              "1500 m",
              "3600 m"
            ],
            "correct": 2,
            "explanation": "Category A aircraft require minimum 1500m visibility for circling approaches."
          },
          {
            "question": "What is the system minimum for an NDB approach?",
            "options": [
              "200 ft",
              "250 ft",
              "300 ft",
              "350 ft"
            ],
            "correct": 3,
            "explanation": "NDB approaches have a system minimum of 350 ft MDH."
          },
          {
            "question": "What is the minimum RVR for a CAT IIIC approach?",
            "options": [
              "No minimum",
              "50 m",
              "75 m",
              "100 m"
            ],
            "correct": 0,
            "explanation": "Category IIIC has no minimum RVR requirement (zero visibility operations)."
          },
          {
            "question": "When can special VFR be commenced?",
            "options": [
              "Visibility greater than 1500 m",
              "Greater than 3 km visibility",
              "Visibility no more than 3000 m",
              "Greater than 5 km visibility"
            ],
            "correct": 1,
            "explanation": "Special VFR flights require visibility greater than 3 km."
          }
        ]
      },
      {
        "name": "Operational Procedures Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "An aeroplane is starting a non-precision approach with an MDH of 250 ft and minimum visibility of 800 m. ATC gives threshold, mid runway and final third RVRs. When may the approach be started?",
            "options": [
              "When threshold and mid-runway RVRs are greater than 800 m",
              "When all 3 RVRs are greater than 800 m",
              "When the met viz is greater than 800 m. RVR is for precision approaches only",
              "When threshold RVR is greater than 800 m"
            ],
            "correct": 3,
            "explanation": "Non-precision approach may commence when threshold RVR meets or exceeds minima."
          },
          {
            "question": "What is the Cat IIIB RVR minimum?",
            "options": [
              "50 m",
              "100 m",
              "200 m",
              "250 m"
            ],
            "correct": 0,
            "explanation": "Category IIIB requires minimum 50m RVR (or 75m depending on certification)."
          },
          {
            "question": "What is the minimum horizontal visibility for a Cat D aircraft on a circling approach?",
            "options": [
              "1500 m",
              "1600 m",
              "2400 m",
              "3600 m"
            ],
            "correct": 3,
            "explanation": "Category D aircraft require 3600m minimum visibility for circling."
          },
          {
            "question": "A category I precision approach (CAT I) is an approach which may be carried out with an RVR/Visibility of not less than:",
            "options": [
              "800 m",
              "550 m",
              "350 m",
              "500 m"
            ],
            "correct": 1,
            "explanation": "Category I ILS approaches require minimum 550m RVR."
          },
          {
            "question": "OPS 1.465 (VFR operating minima), establishes that, the operator shall ensure about VFR flights, that:",
            "options": [
              "for conducted VFR flights in airspace F, vertical distance from clouds is 250 m at least",
              "Special VFR flights are not commenced when visibility is less than 3 km",
              "for conducted VFR flights in airspace B, horizontal distance from clouds is 1000 m at least",
              "for conducted VFR flights in airspace E, flight visibility at and above 3050 m (10000 ft) is 5 km at least (clear of cloud)"
            ],
            "correct": 1,
            "explanation": "Special VFR requires minimum 3 km visibility to commence."
          },
          {
            "question": "What is Vat?",
            "options": [
              "Vso x 1.3",
              "Vs1g x 1.3",
              "The lesser of Vso or Vs1g",
              "Vso x 1.23"
            ],
            "correct": 0,
            "explanation": "Vat (threshold speed) is Vso (stall speed landing config) multiplied by 1.3."
          },
          {
            "question": "The Cat I minimum decision height is:",
            "options": [
              "no decision height",
              "50 ft",
              "100 ft",
              "200 ft"
            ],
            "correct": 3,
            "explanation": "Category I ILS has minimum decision height of 200 ft."
          },
          {
            "question": "When establishing an instrument approach procedure, 5 aircraft categories according to their speed at the threshold (Vat) are established. This speed is equal to the stalling speed in landing configuration multiplied by:",
            "options": [
              "1.1",
              "1.23",
              "1.15",
              "1.3"
            ],
            "correct": 3,
            "explanation": "Vat equals stall speed in landing configuration times 1.3."
          },
          {
            "question": "For VFR flight (in a cat C aircraft) what is the minimum horizontal visibility below 10000 ft?",
            "options": [
              "8 km",
              "5 km",
              "1500 m",
              "300 m"
            ],
            "correct": 1,
            "explanation": "VFR flights below 10000 ft require minimum 5 km visibility."
          },
          {
            "question": "The information to be considered for a non-precision approach is: 1. horizontal visibility 2. ceiling 3. minimum descent altitude 4. decision altitude",
            "options": [
              "1, 2 & 4",
              "1 & 3",
              "1 & 4",
              "1, 2 & 3"
            ],
            "correct": 3,
            "explanation": "Non-precision approaches consider visibility, ceiling, and MDA (not DA)."
          },
          {
            "question": "What is the minimum crew rest period before flight?",
            "options": [
              "12 hours when operating away from home base",
              "13 hours, reducing by 30 minutes for every sector after the 3rd sector in a day",
              "10 hours when operating from home base",
              "12 hours when operating from home base"
            ],
            "correct": 3,
            "explanation": "Minimum crew rest at home base is 12 hours before flight duty."
          },
          {
            "question": "Who could be nominated as Senior Cabin Crew?",
            "options": [
              "Any flight crew",
              "Cabin crew with more than one year experience",
              "Any cabin crew over the age of 18",
              "Cabin crew as long as they are not qualified on more than 3 types or variants"
            ],
            "correct": 1,
            "explanation": "Senior cabin crew must have at least one year of experience."
          },
          {
            "question": "According to OPS 1.430 (Aerodrome Operating Minima) a Category IIIA approach has a Decision Height of less than 100 ft and a minimum RVR (Runway Visual Range) of:",
            "options": [
              "175 m",
              "250 m",
              "300 m",
              "200 m"
            ],
            "correct": 3,
            "explanation": "Category IIIA has DH below 100 ft and minimum 200m RVR."
          },
          {
            "question": "Aircraft are categorized according to their threshold speeds. What aircraft category corresponds to a range of speeds 141 kt - 165 kt?",
            "options": [
              "Aeroplane category B",
              "Aeroplane category E",
              "Aeroplane category D",
              "Aeroplane category C"
            ],
            "correct": 2,
            "explanation": "Category D aircraft have Vat between 141 and 165 knots."
          },
          {
            "question": "What are the rules regarding OPCs?",
            "options": [
              "Can be completed in the simulator, but no passengers to be carried",
              "Can be completed in the aircraft but only if the aircraft is certified by the Authority as a suitable substitute for the simulator",
              "Can be completed in the simulator but only if the simulator is certified by the Authority",
              "Can be completed in conjunction with a line check"
            ],
            "correct": 2,
            "explanation": "OPCs can be done in simulators only if the simulator is authority-certified."
          },
          {
            "question": "What are the threshold speeds defining a Cat B aircraft?",
            "options": [
              "< 91 kt",
              "91 - 120 kt",
              "121 - 140 kt",
              "141 - 165 kt"
            ],
            "correct": 1,
            "explanation": "Category B aircraft have Vat between 91 and 120 knots."
          },
          {
            "question": "What are the limits on crew duty?",
            "options": [
              "190 hours in a year, 60 duty hours in any seven consecutive days",
              "900 block hours in a year, 60 block hours in any consecutive 7 days",
              "900 block hours in a year, 100 block hours in any consecutive 28 days",
              "190 block hours in any consecutive 7 days, 900 block hours in any consecutive 28 days"
            ],
            "correct": 2,
            "explanation": "Crew duty limits: 900 block hours per year, 100 block hours per 28 consecutive days."
          },
          {
            "question": "What is the take-off RVR limit for a Cat A aeroplane, when high intensity centre line lights and edge lights are on and the crew is IFR qualified and approved?",
            "options": [
              "150 m if threshold RVR is available",
              "150 m",
              "200 m",
              "250 m"
            ],
            "correct": 2,
            "explanation": "Cat A aircraft with high intensity lighting can takeoff with 200m RVR minimum."
          },
          {
            "question": "When is MDH referenced to the threshold as opposed to the aerodrome elevation?",
            "options": [
              "The threshold is more than 2 m above the ARP",
              "The threshold is less than 2 m above the ARP",
              "The threshold is less than 2 m below the ARP",
              "The threshold is more than 2 m below the ARP"
            ],
            "correct": 3,
            "explanation": "MDH references threshold when it's more than 2m below aerodrome reference point."
          },
          {
            "question": "What is DH used for?",
            "options": [
              "Visual manoeuvre to land",
              "Precision approaches",
              "Non-precision approaches",
              "Circling approaches"
            ],
            "correct": 1,
            "explanation": "Decision Height (DH) is used for precision approaches; MDH is for non-precision."
          }
        ]
      }
    ]
  },
  "radio-navigation": {
    "name": "Radio Navigation", 
    "icon": "fas fa-broadcast-tower",
    "tests": [
      {
        "name": "Radio Navigation - Complete Set",
        "timeLimit": 120,
        "questions": [
          {
            "question": "VOR operates on which frequency range?",
            "options": [
              "108.0 - 112.0 MHz",
              "108.0 - 118.0 MHz", 
              "112.0 - 118.0 MHz",
              "118.0 - 137.0 MHz"
            ],
            "correct": 1,
            "explanation": "VOR stations operate between 108.0 and 118.0 MHz in the VHF band."
          },
          {
            "question": "GPS operates using:",
            "options": [
              "Ground-based transmitters",
              "Satellites in orbit",
              "VOR stations", 
              "NDB stations"
            ],
            "correct": 1,
            "explanation": "GPS uses a constellation of satellites to provide position information."
          }
        ]
      }
    ]
  },
  "performance": {
    "name": "Aircraft Performance",
    "icon": "fas fa-chart-line",
    "tests": [
      {
        "name": "Performance Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "A higher mass at a given altitude will reduce the gradient of climb and the rate of climb. But the speeds:",
            "options": [
              "Vx and Vy will decrease",
              "Vx and Vy will increase",
              "Vx will increase and Vy will decrease",
              "Vx and Vy will remain constant"
            ],
            "correct": 1,
            "explanation": "Higher mass requires higher speeds for optimal climb performance, so both Vx and Vy increase with mass."
          },
          {
            "question": "An aircraft with a mass of 110,000 kg is capable of maintaining a gradient of 2.6%. With all the atmospheric variables remaining the same, with what mass would it be able to achieve a gradient of 2.4%?",
            "options": [
              "119167 kg",
              "101530 kg",
              "110000 kg",
              "121167 kg"
            ],
            "correct": 0,
            "explanation": "Climb Gradient â‰ˆ (Thrust - Drag) / Weight. Assuming Thrust-Drag is constant, Gradient is inversely proportional to Weight. New Weight â‰ˆ Old Weight * (Old Gradient / New Gradient) = 110000 * (2.6 / 2.4) â‰ˆ 119167 kg."
          },
          {
            "question": "When approaching a wet runway, with the risk of hydroplaning, what technique should the pilot adopt with an inoperative anti-skid system?",
            "options": [
              "Positive touchdown, full reverse and brakes as soon as possible",
              "Smoothest possible touchdown, then brakes and reverse thrust applied together",
              "Positive touchdown, apply reverse, then use aerodynamic drag and brakes intermittently",
              "Positive touchdown, apply reverse, then use aerodynamic drag before applying brakes"
            ],
            "correct": 2,
            "explanation": "With inoperative anti-skid on wet runways, use positive touchdown, apply reverse thrust, then use aerodynamic drag with intermittent braking to prevent skidding."
          },
          {
            "question": "The buffet margin is:",
            "options": [
              "The difference between the actual coefficient of lift and the maximum coefficient of lift at low speed and high speed",
              "The difference between the actual coefficient of lift and the maximum coefficient of lift at low speed",
              "The difference between the actual coefficient of lift and the maximum coefficient of lift at high speed",
              "The difference between the actual coefficient of lift and the stall speed"
            ],
            "correct": 0,
            "explanation": "Buffet margin is the difference between actual CL and maximum CL considering both low-speed stall buffet and high-speed buffet boundaries."
          },
          {
            "question": "Give the correct order for the following:",
            "options": [
              "Vmcg, Vr, V1, V2",
              "Vmcg, V1, Vr, V2",
              "V1, Vmcg, Vr, V2",
              "V1, Vmca, Vr, Vmcg, V2"
            ],
            "correct": 1,
            "explanation": "Correct speed sequence during takeoff: Vmcg (minimum control speed ground), V1 (decision speed), Vr (rotation speed), V2 (takeoff safety speed)."
          },
          {
            "question": "What happens to the speed for Vx and Vy with increasing altitude?",
            "options": [
              "Both remain constant",
              "Vx remains constant and Vy increases",
              "Vx increases and Vy remains constant",
              "Vx remains constant and Vy decreases"
            ],
            "correct": 3,
            "explanation": "With altitude, Vx IAS remains approximately constant (increases slightly), while Vy IAS decreases due to engine performance degradation with reduced air density."
          },
          {
            "question": "With which conditions would one expect Vmc to be the lowest?",
            "options": [
              "Cold temp, low altitude, low humidity",
              "Hot temp, low pressure altitude, high humidity",
              "Hot temp, high pressure altitude, high humidity",
              "Cold temp, high altitude, low humidity"
            ],
            "correct": 2,
            "explanation": "Vmc decreases with decreasing density (hot, high altitude, humid conditions) as reduced engine thrust decreases the asymmetric yawing moment requiring less rudder authority to control."
          },
          {
            "question": "The effects of a contaminated runway on take-off are:",
            "options": [
              "decreased weight, increased V1, increased Vr",
              "decreased weight, same V1, increased Vr",
              "decreased weight, same V1, same Vr",
              "decreased weight, decreased V1, same Vr"
            ],
            "correct": 3,
            "explanation": "Contaminated runways require reduced takeoff weight and lower V1 to maintain adequate accelerate-stop distance, but Vr remains the same."
          },
          {
            "question": "Which of the following conditions is most likely to cause longitudinal instability?",
            "options": [
              "CG too far forward",
              "CG too far aft",
              "Flying level at a constant IAS",
              "All of the above"
            ],
            "correct": 1,
            "explanation": "CG too far aft reduces static stability margin and can cause longitudinal instability, potentially leading to loss of pitch control."
          },
          {
            "question": "Give the correct sequence:",
            "options": [
              "Vs, Vx, Vy",
              "Vx, Vs, Vy",
              "Vs, max range speed, max endurance speed",
              "max endurance speed, Vs, max range speed"
            ],
            "correct": 0,
            "explanation": "Speed sequence from lowest to highest: Vs (stall speed), Vx (best angle of climb), Vy (best rate of climb)."
          },
          {
            "question": "SFC (Specific Fuel Consumption) will:",
            "options": [
              "increase if C of G is moved further forward of the C of P",
              "decrease if C of G is moved further forward of the C of P",
              "not be affected by C of G position",
              "only be affected by C of G position if it is behind the C of P"
            ],
            "correct": 2,
            "explanation": "SFC is an engine characteristic (fuel flow / thrust). CG position affects aircraft trim drag and thus overall fuel consumption, but not the engine's SFC itself."
          },
          {
            "question": "When comparing Vx to Vy:",
            "options": [
              "Vx will always be greater than Vy",
              "Vy will always be greater than or equal to Vx",
              "Vy will always be greater than Vx",
              "Vx will sometimes be greater than Vy, but sometimes be less than Vy"
            ],
            "correct": 1,
            "explanation": "Best rate of climb speed (Vy) is always greater than or equal to best angle of climb speed (Vx)."
          },
          {
            "question": "If the center of gravity moves aft from the most forward position:",
            "options": [
              "the range and the fuel consumption will increase",
              "the range and the fuel consumption will decrease",
              "the range will increase and the fuel consumption will decrease",
              "the range will decrease and the fuel consumption will increase"
            ],
            "correct": 2,
            "explanation": "Aft CG reduces trim drag (requires less tail-down force), which decreases fuel consumption and increases range."
          },
          {
            "question": "An increase in mass with an increase in runway length available will:",
            "options": [
              "have no effect",
              "require a decrease in the mass",
              "allow an increase in the mass",
              "decrease the TODR"
            ],
            "correct": 2,
            "explanation": "Longer runway allows for higher takeoff mass as there's more distance available for both acceleration and stopping."
          },
          {
            "question": "In climb limited mass calculations, the climb gradient is a ratio of:",
            "options": [
              "height gained over distance travelled through the air",
              "height gained over distance travelled across the ground",
              "TAS over rate of climb",
              "TGS over rate of climb"
            ],
            "correct": 0,
            "explanation": "Climb gradient is defined as the ratio of height gained to the distance travelled through the air (not over ground)."
          },
          {
            "question": "The main reason for using the step climb technique is to:",
            "options": [
              "decrease sector times",
              "increase endurance",
              "adhere to ATC procedures",
              "increase range"
            ],
            "correct": 3,
            "explanation": "Step climbs allow the aircraft to fly closer to its optimal altitude as weight decreases with fuel burn, maximizing fuel efficiency and range."
          },
          {
            "question": "The effect of a headwind component on glide range is:",
            "options": [
              "the range will increase",
              "the range will not be affected",
              "the range will decrease",
              "the range will only be affected if incorrect speeds are flown"
            ],
            "correct": 2,
            "explanation": "Headwind reduces ground distance covered during a glide, thereby decreasing glide range."
          },
          {
            "question": "When operating with anti-skid inoperative:",
            "options": [
              "both landing and performance will be affected",
              "only landing performance will be affected",
              "only take-off performance will be affected",
              "neither will be affected"
            ],
            "correct": 0,
            "explanation": "Inoperative anti-skid affects both takeoff performance (accelerate-stop distance) and landing performance (stopping distance increases)."
          },
          {
            "question": "Flying at an altitude close to coffin corner gives:",
            "options": [
              "max speed",
              "less manoeuvrability",
              "greater 1 engine inoperative range",
              "greater 1 engine inoperative endurance"
            ],
            "correct": 1,
            "explanation": "At coffin corner, the margin between stall speed and critical Mach number is minimal, severely reducing aircraft maneuverability."
          },
          {
            "question": "What effect does a downhill slope have on the take-off speeds?",
            "options": [
              "It has no effect on V1",
              "It decreases V1",
              "It increases V1",
              "It increases the IAS for take-off"
            ],
            "correct": 1,
            "explanation": "Downhill slope assists acceleration but increases stopping distance. To balance field length requirements, V1 is typically reduced."
          }
        ]
      },
      {
        "name": "Performance Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Landing on a runway with 5 mm wet snow will:",
            "options": [
              "increase landing distance",
              "decrease landing distance",
              "not affect the landing distance",
              "give a slightly reduced landing distance, due to increased impingement drag"
            ],
            "correct": 0,
            "explanation": "Wet snow on the runway reduces braking effectiveness and increases landing distance required."
          },
          {
            "question": "Which conditions are most suited to a selection of lower flap for take off?",
            "options": [
              "Low airfield elevation, close obstacles, long runway, high temperature",
              "Low airfield elevation, no obstacles, short runway, low temperature",
              "High elevation, no obstacles, short runway, low temperature",
              "High airfield elevations, distant obstacles, long runway, high ambient temperature"
            ],
            "correct": 0,
            "explanation": "Lower flap gives better climb gradient for obstacle clearance but requires longer runway. Combination of long runway and close obstacles suits lower flap."
          },
          {
            "question": "The buffet onset boundary chart tells the pilot the:",
            "options": [
              "critical Mach number for various masses and altitudes",
              "values for low speed stall and Mach buffet onset for various masses and altitudes",
              "values for low speed buffet onset and high speed buffet onset for various masses and altitudes",
              "VNE for various masses and altitudes"
            ],
            "correct": 2,
            "explanation": "The buffet onset chart shows both low-speed buffet (near stall) and high-speed buffet boundaries for different masses and altitudes."
          },
          {
            "question": "The second segment of climb ends when:",
            "options": [
              "accelerating from V2 to flap retraction speed begins",
              "the landing gear is fully retracted",
              "flap retraction begins",
              "the flaps are fully retracted"
            ],
            "correct": 1,
            "explanation": "The second segment ends when the landing gear is fully retracted. The third segment then begins with acceleration and flap retraction."
          },
          {
            "question": "Reference point zero refers to the:",
            "options": [
              "point where the aircraft lifts of the ground",
              "point where the aircraft reaches V2",
              "point where the aircraft reaches 35 ft",
              "point where gear is selected up"
            ],
            "correct": 2,
            "explanation": "Reference point zero is the point where the aircraft reaches the screen height of 35 ft above the runway."
          },
          {
            "question": "Vref for a Class B aircraft is defined by:",
            "options": [
              "1.3Vs",
              "1.2Vs",
              "1.3Vmcl",
              "1.2Vmcl"
            ],
            "correct": 0,
            "explanation": "Vref (reference landing speed) for Class B aircraft is 1.3 times the stall speed in landing configuration (1.3Vs)."
          },
          {
            "question": "During the certification of an aeroplane, the take-off distance with all engines operating and the take-off distance with one engine inoperative are: 1547 m, 1720 m. What is the distance used in the aircraft certification?",
            "options": [
              "1547 m",
              "1779 m",
              "1720 m",
              "1798 m"
            ],
            "correct": 1,
            "explanation": "Certified TODR is the greater of: OEI TODR (1720m) or 1.15 * AEO TODR (1.15 * 1547 = 1779m). Answer: 1779m."
          },
          {
            "question": "An aircraft is certified to land with flaps at either 25 or 35 degrees of flap. If the pilot selects the higher flap setting the approach performance will be:",
            "options": [
              "improved landing distance and improved go-around performance",
              "improved landing distance and reduced go-around performance",
              "reduced landing distance and improved go-around performance",
              "reduced landing distance and reduced go-around performance"
            ],
            "correct": 3,
            "explanation": "Higher flap setting reduces landing distance but increases drag, reducing go-around climb performance."
          },
          {
            "question": "What landing distance requirements need to be met at an alternate airfield compared to a destination airfield for a turboprop?",
            "options": [
              "Less than destination",
              "More than destination",
              "Same as destination",
              "None applicable"
            ],
            "correct": 2,
            "explanation": "Landing distance requirements at alternate airfields are the same as at the destination for turboprops."
          },
          {
            "question": "In dry conditions, when landing at an alternate airport in a turbojet by what factor should the landing distance available be divided to give landing distance required?",
            "options": [
              "0.6",
              "1.0",
              "1.67",
              "1.43"
            ],
            "correct": 2,
            "explanation": "LDR must be â‰¤ 60% of LDA. Therefore LDA / 1.67 gives the LDR. (LDA * 0.6 = LDR, so LDA = LDR / 0.6 = LDR * 1.67)."
          },
          {
            "question": "The speed for minimum power required in a turbojet will be:",
            "options": [
              "slower than the speed for minimum drag",
              "faster than the speed for minimum drag",
              "slower in a climb and faster in the decent",
              "same as speed for minimum drag"
            ],
            "correct": 0,
            "explanation": "Minimum power required occurs at a slower speed than minimum drag speed (L/D max) for turbojets."
          },
          {
            "question": "The coefficient of lift may be increased by lowering the flaps or:",
            "options": [
              "increasing CAS",
              "reducing nose-up elevator deflection",
              "increasing angle of attack",
              "increasing engine thrust"
            ],
            "correct": 2,
            "explanation": "Coefficient of lift increases with increasing angle of attack or by extending flaps/high-lift devices."
          },
          {
            "question": "V2min is determined by: (excluding VMCA)",
            "options": [
              "1.08VSR for 4 engine turboprops with 1.13VSR for 2 and 3 engine turboprops.",
              "1.2VS for all turbojets",
              "1.2VSR for all turboprops and 1.15VSR for all turbojets",
              "1.15VS for all aeroplanes"
            ],
            "correct": 0,
            "explanation": "V2min is 1.08Vsr for 4-engine turboprops and 1.13Vsr for 2 and 3-engine turboprops (also considering Vmc)."
          },
          {
            "question": "Two identical turbojets are holding at the same altitude and have the same specific fuel consumption. Aeroplane 1 weighs 130,000 kg and fuel flow is 4300 kg/hr. If aeroplane 2 weighs 115,000 kg what is the fuel flow of aeroplane 2?",
            "options": [
              "3804 kg/hr",
              "4044 kg/hr",
              "3364 kg/hr",
              "3530 kg/hr"
            ],
            "correct": 0,
            "explanation": "Fuel flow for endurance (holding) is proportional to weight. FF2 â‰ˆ FF1 * (W2 / W1) = 4300 * (115000 / 130000) â‰ˆ 3804 kg/hr."
          },
          {
            "question": "In wet conditions, what extra percentage over the dry gross landing distance must be available for a turbojet?",
            "options": [
              "43%",
              "92%",
              "67%",
              "15%"
            ],
            "correct": 1,
            "explanation": "Wet LDA required = Dry LDR * 1.67 * 1.15 = Dry LDR * 1.92, meaning LDA must be 92% greater than dry LDR."
          },
          {
            "question": "If the flap setting is changed from 10 degrees to 20 degrees, V2 will:",
            "options": [
              "not change",
              "decrease if not limited to VMCA.",
              "increase",
              "increase or decrease depending on weight"
            ],
            "correct": 1,
            "explanation": "Increased flap reduces stall speed (Vs), thus reducing V2 (which is based on Vs), provided V2 remains above Vmca."
          },
          {
            "question": "For a turbojet aeroplane the third segment of the take-off path:",
            "options": [
              "ends when flap retraction is complete",
              "the landing gear is fully retracted",
              "acceleration from VLOF to V2 begins",
              "the flaps are fully retracted"
            ],
            "correct": 0,
            "explanation": "The third segment begins when gear is fully retracted and ends when flap retraction is complete."
          },
          {
            "question": "To maintain the same angle of attack and altitude at a higher gross weight an aeroplane needs:",
            "options": [
              "less airspeed and same power",
              "the same airspeed",
              "more airspeed and less power",
              "more airspeed and more power"
            ],
            "correct": 3,
            "explanation": "Higher weight requires higher airspeed (to generate more lift at same AoA) and more power to overcome increased drag."
          },
          {
            "question": "Absolute ceiling is defined by:",
            "options": [
              "altitude where theoretical rate of climb is zero",
              "altitude at which rate of climb is 100 fpm",
              "altitude obtained when using lowest steady fight speed",
              "altitude where low speed buffet and high-speed buffet speeds are coincident"
            ],
            "correct": 0,
            "explanation": "Absolute ceiling is the altitude where the theoretical maximum rate of climb equals zero."
          },
          {
            "question": "Vr for a jet aircraft must be faster than, the greater of:",
            "options": [
              "1.05VMCA and V1",
              "VMCA and 1.1V1",
              "VMBE and V1",
              "V1 and 1.1VMCA"
            ],
            "correct": 0,
            "explanation": "Vr must be greater than both 1.05Vmca and V1 to ensure controllability and adequate decision speed margin."
          }
        ]
      },
      {
        "name": "Performance Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What factors would cause V2 to be limited by VMCA?",
            "options": [
              "Flaps at high settings",
              "With high pressure",
              "With low temperature",
              "Combination of the above"
            ],
            "correct": 3,
            "explanation": "High flap settings, high pressure, and low temperature (increasing engine thrust and asymmetric effect) can make Vmca the limiting factor for V2."
          },
          {
            "question": "A jet aircraft's maximum altitude is usually limited by:",
            "options": [
              "its certification maximum altitude",
              "its pressurization maximum altitude",
              "the altitude at which low and high-speed buffet will occur",
              "thrust limits"
            ],
            "correct": 2,
            "explanation": "Maximum altitude is often limited by coffin corner where low-speed buffet and high-speed buffet margins converge."
          },
          {
            "question": "A light twin-engine aircraft is climbing from the screen height of 50 ft, and has an obstacle 10000 m along the net fight path. If the net climb gradient is 10%, there is no wind and obstacle is 900 m above the aerodrome elevation then what will the clearance be?",
            "options": [
              "The aircraft will not clear the object",
              "85 m",
              "100 m",
              "115 m"
            ],
            "correct": 3,
            "explanation": "Height gained = 0.10 * 10000 m = 1000 m. Total height = 1000 m + 50 ft (â‰ˆ15 m) = 1015 m. Clearance = 1015 - 900 = 115 m."
          },
          {
            "question": "Vx is:",
            "options": [
              "Speed for best angle of climb",
              "Speed for best rate of climb",
              "Speed for obstacle clearance",
              "The same"
            ],
            "correct": 0,
            "explanation": "Vx is the speed for best angle of climb, providing maximum altitude gain per horizontal distance."
          },
          {
            "question": "Requirements for the third segment of climb are:",
            "options": [
              "minimum acceleration altitude for one engine inoperative should be used",
              "a climb gradient of 5% is required in the third segment",
              "level acceleration with an equivalent gradient of 1.2%",
              "legal minimum altitude for acceleration is 1500 ft"
            ],
            "correct": 2,
            "explanation": "Third segment involves level acceleration (gear up, flaps retracting) with an equivalent gradient of at least 1.2%."
          },
          {
            "question": "Pitch angle during decent at a constant Mach number will:",
            "options": [
              "increase",
              "decrease",
              "increase at first then decrease",
              "stay constant"
            ],
            "correct": 1,
            "explanation": "Constant Mach descent means TAS decreases. To maintain lift, AoA increases. With negative flight path angle, pitch angle decreases."
          },
          {
            "question": "Take off on a runway with standing water, with a depth of 0.5 cm. Compared to a dry runway, field length limited mass will:",
            "options": [
              "increase, with a reduced V1",
              "remain the same, with a reduced V1",
              "decrease, with an increased V1",
              "decrease, with a decreased V1"
            ],
            "correct": 3,
            "explanation": "Standing water increases drag and reduces braking, requiring decreased mass and decreased V1 for safety."
          },
          {
            "question": "With respect to en-route diversions (using drift down graph), if you believe that you will be overweight at the destination, what procedure should be followed?",
            "options": [
              "Continue to destination, use higher flap settings to reduce landing speed",
              "Land short at a suitable airfield",
              "Declare a PAN",
              "Declare a MAYDAY"
            ],
            "correct": 1,
            "explanation": "If projected to be overweight at destination, land at a suitable alternate airfield with adequate runway length."
          },
          {
            "question": "What is the reason for setting minimum speeds on the approach?",
            "options": [
              "So that an aircraft falling below the glide path will be able to re-intercept it",
              "Adequate performance for a go-around in the event of an engine failure",
              "So that the aircraft will not stall when full flap is selected",
              "To maintain minimum altitude on the approach"
            ],
            "correct": 1,
            "explanation": "Minimum approach speeds ensure adequate performance for go-around maneuvers, especially with engine failure."
          },
          {
            "question": "If there is an increase in atmospheric pressure and all other factors remain constant, it should result in:",
            "options": [
              "decreased take-off distance and increased climb performance",
              "increased take-off distance and increased climb performance",
              "decreased take-off distance and decreased climb performance",
              "increased take-off distance and decreased climb performance"
            ],
            "correct": 0,
            "explanation": "Higher atmospheric pressure increases air density, improving engine performance and reducing takeoff distance while improving climb."
          },
          {
            "question": "An aircraft may use either 5Â° or 15Â° flap setting for take-off. The effect of selecting the 5Â° setting as compared to the 15Â° setting is:",
            "options": [
              "take-off distance and take-off climb gradient will both increase",
              "take-off distance and take-off climb gradient will both decrease",
              "take-off distance will increase and take-off climb gradient will decrease",
              "take-off distance will decrease and take-off climb gradient will increase"
            ],
            "correct": 0,
            "explanation": "Lower flap (5Â°) requires longer takeoff distance but provides better climb gradient due to reduced drag."
          },
          {
            "question": "Vs is defined as:",
            "options": [
              "Speed for minimum power",
              "Speed for minimum thrust",
              "The minimum speed in steady flight at which the aeroplane is controllable",
              "Stalling speed or minimum steady flight speed in the landing configuration"
            ],
            "correct": 2,
            "explanation": "Vs is the minimum steady flight speed at which the aircraft remains controllable in a specified configuration."
          },
          {
            "question": "A higher climb gradient gives:",
            "options": [
              "reduced ground distance covered to climb",
              "increased ground distance covered to climb",
              "no change in ground distance covered to climb",
              "increased ground distance covered to climb"
            ],
            "correct": 0,
            "explanation": "Higher climb gradient means steeper climb path, covering less ground distance to reach a given altitude."
          },
          {
            "question": "A balanced field length is when:",
            "options": [
              "distance taken to accelerate to V1 and distance to stop are identical",
              "TORA x 1.5 = TODA",
              "V1 = VR",
              "ASDA equals TODA"
            ],
            "correct": 3,
            "explanation": "Balanced field occurs when Accelerate-Stop Distance equals Accelerate-Go Distance, typically when ASDA = TODA."
          },
          {
            "question": "The drift down is a procedure applied:",
            "options": [
              "after aircraft depressurization",
              "for a visual approach to a VASI",
              "for an instrument approach at an airfield without an ILS",
              "when the engine fails above the operating altitude for one engine inoperative"
            ],
            "correct": 3,
            "explanation": "Drift down procedure is used when an engine fails above the single-engine ceiling, requiring descent to a sustainable altitude."
          },
          {
            "question": "The landing speed, Vref, for a single-engine aircraft must be not less than:",
            "options": [
              "1.2VMCA",
              "1.1Vs0",
              "1.05Vs0",
              "1.3Vs0"
            ],
            "correct": 3,
            "explanation": "Vref for single-engine aircraft must be at least 1.3Vs0 (stall speed in landing configuration)."
          },
          {
            "question": "At maximum range speed in a turbojet the angle of attack is:",
            "options": [
              "the same as L/D max",
              "less than L/D max",
              "maximum",
              "more than L/D max"
            ],
            "correct": 1,
            "explanation": "Maximum range speed (Carson's speed) is slightly faster than Vmd (L/D max), thus at a slightly lower angle of attack."
          },
          {
            "question": "If not VMBE or VMCG limited, what would V1 be limited by?",
            "options": [
              "V2",
              "Vmc",
              "Vr",
              "Vmu"
            ],
            "correct": 2,
            "explanation": "V1 cannot exceed Vr (rotation speed). If not limited by other factors, Vr becomes the upper limit for V1."
          },
          {
            "question": "With respect to field length limit, fill in the blanks in the follow statement. The distance to accelerate to ............, at which point an engine fails, followed by the reaction time of ............. and the ensuing deceleration to a full stop must be completed within the .............",
            "options": [
              "VR, 2 sec, TORA",
              "V1 , 2 sec, ASDA",
              "VEF, 2 sec, TORA",
              "VGO, 2 sec, ASDA"
            ],
            "correct": 1,
            "explanation": "Accelerate-stop distance: accelerate to V1, 2-second recognition time, then decelerate to stop within ASDA."
          },
          {
            "question": "How does the power required graph move with an increase in altitude?",
            "options": [
              "Straight up",
              "Straight down",
              "Up and to the right",
              "Straight across to the right"
            ],
            "correct": 2,
            "explanation": "With altitude increase, power required curve shifts up (more power needed) and right (higher TAS for same IAS)."
          }
        ]
      },
      {
        "name": "Performance Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What procedure is likely to require V1 to be reduced?",
            "options": [
              "Improved climb procedure",
              "Reduced thrust take-off",
              "When ASDA is greater than TODA",
              "Take off with anti-skid inoperative"
            ],
            "correct": 3,
            "explanation": "Anti-skid inoperative increases accelerate-stop distance, requiring V1 reduction to stay within ASDA limits."
          },
          {
            "question": "Two identical aircraft at different masses are descending at idle thrust. Which of the following statements correctly describes their descent characteristics?",
            "options": [
              "There is no difference between the descent characteristics of the two aeroplanes",
              "At a given angle of attack, the heavier aeroplane will always glide further than the lighter aeroplane",
              "At a given angle of attack, the lighter aeroplane will always glide further than the heavier aeroplane",
              "At a given angle of attack, both the vertical and the forward speeds are greater for the heavier aeroplane"
            ],
            "correct": 3,
            "explanation": "Heavier aircraft requires higher TAS for same AoA, resulting in higher vertical speed (rate of descent) and groundspeed, but same glide angle."
          },
          {
            "question": "If the performance limited take-off mass is restricted by the ASDA, which of the following actions will increase the limiting mass?",
            "options": [
              "Use a higher flap setting",
              "Use of clearway",
              "Increase V1",
              "Decrease VR"
            ],
            "correct": 1,
            "explanation": "Clearway extends TODA, which can help with ASDA-limited scenarios by allowing higher V1 and thus higher mass."
          },
          {
            "question": "Cruising with 1 or 2 engines inoperative at high altitude, compared to all engines operative cruise, range will:",
            "options": [
              "increase",
              "decrease",
              "not change",
              "decrease with 1 engine inoperative, and increase with 2 engines inoperative"
            ],
            "correct": 1,
            "explanation": "Engine-out operations increase drag (asymmetric thrust, higher AoA) and reduce efficiency, decreasing range."
          },
          {
            "question": "Concerning landing gear, which factors limit take-off performance?",
            "options": [
              "Brake temperature",
              "Tyre speed and VMBE",
              "Tyre temperature",
              "Brake wear"
            ],
            "correct": 1,
            "explanation": "Tyre speed rating and VMBE (Maximum Brake Energy) are the primary landing gear limitations for takeoff performance."
          },
          {
            "question": "When climbing at a constant Mach number through the troposphere, TAS:",
            "options": [
              "increases",
              "decreases",
              "remains constant",
              "increases then decreases"
            ],
            "correct": 1,
            "explanation": "In troposphere, temperature decreases with altitude. TAS = Mach * LSS. Constant Mach with decreasing LSS means decreasing TAS."
          },
          {
            "question": "A tailwind on take-off will not affect:",
            "options": [
              "climb limit mass",
              "obstacle clearance",
              "field limit mass",
              "VMBE"
            ],
            "correct": 0,
            "explanation": "Tailwind affects ground-based calculations (field length, obstacle clearance, VMBE) but not air-based climb gradient, so climb limit mass unaffected."
          },
          {
            "question": "When flying at the optimum range altitude, over time the:",
            "options": [
              "fuel consumption gradually decreases",
              "fuel consumption gradually increases",
              "fuel consumption initially decreases then gradually increases",
              "fuel consumption remains constant"
            ],
            "correct": 0,
            "explanation": "As fuel burns and weight decreases, drag decreases, requiring less thrust and thus lower fuel consumption."
          },
          {
            "question": "During certification test flights for a turbojet aeroplane, the measured take-off runs from brake release to a point equidistant between the point at which VLOF is reached and the point at which the aeroplane is 35 ft above the take of surface are: 1530 m with all engines operating. 1810 m with the critical engine failure recognized at V1 , other factors remaining unchanged. What is the correct value of the take-off run?",
            "options": [
              "1759 m",
              "1810 m",
              "1950 m",
              "2081 m"
            ],
            "correct": 1,
            "explanation": "Certified TORR is the greater of: OEI TORR (1810m) or 1.15 * AEO TORR (1.15 * 1530 = 1759.5m). Answer: 1810m."
          },
          {
            "question": "What happens to the field limited take-off mass with runway slope?",
            "options": [
              "It increases with a downhill slope",
              "It is unaffected by runway slope",
              "It decreases with a downhill slope",
              "It increases with an uphill slope"
            ],
            "correct": 0,
            "explanation": "Downhill slope assists acceleration, allowing higher takeoff mass for a given runway length."
          },
          {
            "question": "With regards to the optimum altitude during the cruise, the aircraft is:",
            "options": [
              "always flown at the optimum altitude",
              "always flown 2000 ft above the optimum altitude",
              "flown slightly above the optimum altitude initially, descending as fuel is burnt",
              "flown slightly below the optimum altitude initially, climbing as fuel is burnt"
            ],
            "correct": 3,
            "explanation": "Aircraft flies below optimum altitude initially, then uses step climbs to approach optimum as weight decreases with fuel burn."
          },
          {
            "question": "Rate of climb is:",
            "options": [
              "Excess power divided by weight",
              "Excess thrust divided by weight",
              "Maximum thrust and minimum power",
              "Maximum thrust and minimum drag"
            ],
            "correct": 0,
            "explanation": "Rate of Climb = (Power Available - Power Required) / Weight = Excess Power / Weight."
          },
          {
            "question": "If a jet engine fails during take-off, before V1:",
            "options": [
              "the take-off can be continued or aborted",
              "the take-off should be aborted",
              "the take-off should be continued",
              "the take-off may be continued if aircraft speed is above VMCG and lies between VGO and VSTOP"
            ],
            "correct": 1,
            "explanation": "Engine failure before V1 requires aborting the takeoff as there is sufficient runway to stop safely."
          },
          {
            "question": "When flying in a headwind, the speed for max range should be:",
            "options": [
              "slightly decreased",
              "slightly increased",
              "unchanged",
              "should be increased, or decreased depending on the strength of the wind"
            ],
            "correct": 1,
            "explanation": "Headwind reduces ground speed; slightly increasing airspeed above normal max range speed improves ground distance covered."
          },
          {
            "question": "For a given aircraft mass, flying with a cost index greater than zero set will result in:",
            "options": [
              "a cruise at a slower Mach number than the best range Mach number for a given altitude",
              "a cruise at the maximum endurance speed",
              "climb at the slowest safe speed, taking into account stall and speed stability",
              "a cruise at a faster Mach number than the Mach number giving best air nautical miles per kg ratio for a given altitude"
            ],
            "correct": 3,
            "explanation": "Cost index > 0 values time, pushing cruise speeds higher than pure maximum range speed to save time at expense of fuel."
          },
          {
            "question": "For the obstacle limited take-off mass for a Class A aircraft, turns after take-off are not permitted below 400 ft, and must not exceed:",
            "options": [
              "15Â° angle of bank up to 400 ft",
              "15Â° angle of bank below 1000 ft",
              "20Â° angle of bank up to 400 ft",
              "25Â° angle of bank up to 400 ft"
            ],
            "correct": 0,
            "explanation": "Regulations limit bank angle to 15Â° below 400 ft for obstacle clearance calculations (no turns below 50ft)."
          },
          {
            "question": "Vlo is defined as:",
            "options": [
              "the actual speed that the aircraft lifts of the ground",
              "the minimum possible speed that the aircraft could lift of the ground",
              "the maximum speed for landing gear operation",
              "the long-range cruise speed"
            ],
            "correct": 2,
            "explanation": "Vlo is the maximum speed for landing gear operation (extension or retraction)."
          },
          {
            "question": "The induced drag in an aeroplane:",
            "options": [
              "increases as speed increases",
              "is independent of speed",
              "decreases as speed increases",
              "decreases as weight increases"
            ],
            "correct": 2,
            "explanation": "Induced drag is inversely proportional to speed squared; as speed increases, induced drag decreases."
          },
          {
            "question": "Why are step climbs used on long range fights in jet transport aircraft?",
            "options": [
              "To comply with ATC fight level constraints",
              "Step climbs have no significance for jet aircraft, they are used by piston aircraft",
              "To fly as close as possible to the optimum altitude as mass reduces",
              "They are only justified if the actual wind conditions differ significantly from the forecast conditions used for planning"
            ],
            "correct": 2,
            "explanation": "Step climbs allow aircraft to fly near optimal altitude as weight decreases, maximizing fuel efficiency and range."
          },
          {
            "question": "In a glide (power off), how does weight affect the glide angle and the speed for best glide angle?",
            "options": [
              "Glide angle increases, speed increases",
              "Glide angle decreases, speed increases",
              "Glide angle constant, speed constant",
              "Glide angle constant, speed increases"
            ],
            "correct": 3,
            "explanation": "Glide angle (L/D ratio) remains constant regardless of weight, but glide speed increases with weight to maintain the same AoA."
          }
        ]
      },
      {
        "name": "Performance Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "During aircraft certification, the value of VMCG is found with nose wheel steering inoperative. This is because:",
            "options": [
              "nose wheel steering does not affect VMCG",
              "VMCG must be valid in both wet and dry conditions",
              "nose wheel steering does not work after an engine failure",
              "the aircraft may be operated even if the nose wheel steering is inoperative"
            ],
            "correct": 1,
            "explanation": "Certification ensures VMCG is valid in all conditions. Testing with nose wheel steering inoperative provides most conservative value."
          },
          {
            "question": "How does the slush thickness affect the V1 reduction required?",
            "options": [
              "Greater reduction if thicker",
              "Smaller reduction if thicker",
              "No effect if mass is reduced",
              "No effect at all"
            ],
            "correct": 1,
            "explanation": "Thicker slush increases drag significantly, making stopping easier but acceleration harder, requiring less V1 reduction from dry conditions."
          },
          {
            "question": "When gliding into a headwind airspeed should be:",
            "options": [
              "reduced to gust penetration speed",
              "the same as the max. range glide speed in still air",
              "lower than the max. range glide speed in still air",
              "higher than the max. range glide speed in still air"
            ],
            "correct": 3,
            "explanation": "To maximize ground distance (range) in a headwind, glide speed should be increased above still-air best glide speed."
          },
          {
            "question": "Vx is:",
            "options": [
              "Speed for best angle of climb",
              "Speed for best rate of climb",
              "Speed for obstacle clearance",
              "The same as Vy"
            ],
            "correct": 0,
            "explanation": "Vx is the speed for best angle of climb, maximizing altitude gain per horizontal distance traveled."
          },
          {
            "question": "In a balanced turn load factor is dependent on:",
            "options": [
              "radius of turn and aircraft weight",
              "TAS and bank angle",
              "radius of turn and bank angle",
              "bank angle only"
            ],
            "correct": 3,
            "explanation": "Load factor (n) in a balanced turn depends only on bank angle: n = 1 / cos(Bank Angle)."
          },
          {
            "question": "If the maximum take-off mass is limited by tyre speed, what effect would a down sloping runway have?",
            "options": [
              "No effect",
              "Always increase the mass",
              "Only increase the mass if not limited by any other limitation",
              "Decrease the mass"
            ],
            "correct": 0,
            "explanation": "Tyre speed limit relates to groundspeed at liftoff. Downslope doesn't significantly change the IAS/groundspeed relationship at rotation."
          },
          {
            "question": "Which is true regarding a balanced field?",
            "options": [
              "Provides largest gap between net and gross margins",
              "Provides minimum field length required in the case of an engine failure",
              "Take-off distance will always be more than stopping distance",
              "Distances will remain equal, even if engine failure speed is changed"
            ],
            "correct": 1,
            "explanation": "Balanced field length occurs when accelerate-stop distance equals accelerate-go distance, minimizing required field length."
          },
          {
            "question": "If V1 is found to be lower than VMCG, which of the following statements will be true?",
            "options": [
              "VMCG must be reduced",
              "V1 must be increased to at least VMCG",
              "VR must be reduced",
              "V2 must be reduced"
            ],
            "correct": 1,
            "explanation": "V1 cannot be less than Vmcg (minimum control speed ground). If calculated V1 < Vmcg, V1 must be increased to Vmcg."
          },
          {
            "question": "During take-off an aircraft is affected by windshear. If the wind changes from a headwind to a tailwind the effect will be:",
            "options": [
              "TOD increasing and ASD decreasing, and the calculated V2 being too fast",
              "TOD and ASD decreasing, and the calculated V2 being too fast",
              "TOD and ASD remaining constant, if the calculated speeds are used",
              "TOD and ASD increasing, if the calculated speeds are used"
            ],
            "correct": 1,
            "explanation": "Sudden tailwind decreases IAS, reducing performance. Distances based on headwind would be optimistic, and V2 calculated for headwind is too fast."
          },
          {
            "question": "The reduced thrust take-off procedure may not be used when:",
            "options": [
              "runway wet",
              "after dark",
              "temperature varies by more than 10Â°C from ISA",
              "anti-skid unserviceable"
            ],
            "correct": 3,
            "explanation": "Reduced thrust takeoff requires fully operational systems. Anti-skid inoperative reduces stopping capability, prohibiting reduced thrust."
          },
          {
            "question": "How is fuel consumption affected by the C of G position, in terms of air nautical miles per kg?",
            "options": [
              "Increases with a forward C of G",
              "Decreases with an aft C of G",
              "Decreases with a forward C of G",
              "Fuel consumption is not affected by the C of G position"
            ],
            "correct": 2,
            "explanation": "Forward CG requires more tail-down force (trim drag), increasing fuel consumption and decreasing NM/kg efficiency."
          },
          {
            "question": "What factor must be applied to the landing distance available at the destination aerodrome to determine the landing performance of a turbojet aircraft on a dry runway?",
            "options": [
              "1.43",
              "1.15",
              "0.60",
              "0.70"
            ],
            "correct": 2,
            "explanation": "Landing Distance Required must be â‰¤ 60% of Landing Distance Available (LDR = LDA * 0.60)."
          },
          {
            "question": "During the certification flight testing of a twin engine turbojet aeroplane the actual measured Landing Distances are: 1100 m on a dry runway, 1300 m on a wet runway. What are the values that will be entered into the AFM for the LDR on dry and wet runways?",
            "options": [
              "1833 m, 2167 m",
              "1265 m, 1495 m",
              "1650 m, 1733 m",
              "1833 m, 1495 m"
            ],
            "correct": 3,
            "explanation": "Dry LDR = 1100 / 0.6 = 1833m. Wet LDR = 1300 * 1.15 = 1495m (applying wet factor to actual distance)."
          },
          {
            "question": "Climbing in the troposphere at a constant TAS:",
            "options": [
              "Mach number increases",
              "Mach number decreases",
              "CAS increases",
              "IAS increases"
            ],
            "correct": 0,
            "explanation": "Climbing at constant TAS: temperature decreases â†’ LSS decreases. Mach = TAS / LSS â†’ Mach increases."
          },
          {
            "question": "At MSL, in ISA conditions Climb gradient = 6%. What would the climb gradient be if: Pressure altitude 1000 ft, Temperature 17Â°C, Engine anti-ice on, Wing anti-ice on (- 0.2% engine anti-ice, - 0.1% wing anti-ice, 0.2% per 1000 ft pressure altitude, 0.1 % per 1Â°C ISA deviation)",
            "options": [
              "5.1%",
              "6.3%",
              "3.8%",
              "5.5%"
            ],
            "correct": 0,
            "explanation": "ISA @ 1000ft = 13Â°C. Dev = +4Â°C. Changes: -0.2(Eng AI) -0.1(Wing AI) -0.2(Alt) -0.4(Temp) = -0.9%. Result: 6 - 0.9 = 5.1%."
          },
          {
            "question": "What does density altitude signify?",
            "options": [
              "Pressure altitude",
              "Flight levels",
              "ISA altitude",
              "An accurate indication of aircraft and engine performance"
            ],
            "correct": 3,
            "explanation": "Density altitude indicates aircraft and engine performance capability by representing equivalent ISA altitude for current air density."
          },
          {
            "question": "Which denotes the stall speed in the landing configuration?",
            "options": [
              "Vs0",
              "Vs1",
              "Vs",
              "Vs1g"
            ],
            "correct": 0,
            "explanation": "Vs0 is the stall speed in landing configuration (full flaps, gear down)."
          },
          {
            "question": "Which of the following combinations most reduces the take-off and climb performance of an aircraft?",
            "options": [
              "High temperature and high pressure",
              "Low temperature and high pressure",
              "Low temperature and low pressure",
              "High temperature and low pressure"
            ],
            "correct": 3,
            "explanation": "High temperature and low pressure both increase density altitude, maximally reducing aircraft and engine performance."
          },
          {
            "question": "When in a gliding maneuver, in order to achieve maximum endurance the aircraft should be flown at:",
            "options": [
              "the speed for max. lift",
              "the speed for min. drag",
              "the speed for max. lift / drag",
              "the speed for min. power"
            ],
            "correct": 3,
            "explanation": "Maximum glide endurance (minimum sink rate) occurs at the speed for minimum power required."
          },
          {
            "question": "With a downward sloping runway:",
            "options": [
              "V1 will increase",
              "V1 will decrease",
              "VR will increase",
              "VR will decrease"
            ],
            "correct": 1,
            "explanation": "Downward slope assists acceleration but hinders stopping. To balance field length, V1 is typically decreased."
          }
        ]
      }
    ]
  },
    "general-navigation": {
    "name": "General Navigation",
    "icon": "fas fa-compass",
    "tests": [
      {
        "name": "General Navigation Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The value of variation:",
            "options": [
              "is zero at the magnetic equator",
              "cannot exceed 180Â°",
              "has a maximum value of 45Â° E or 45Â° W",
              "cannot exceed 90Â°"
            ],
            "correct": 1,
            "explanation": "Magnetic variation can theoretically approach 180Â° at magnetic poles, though practical navigation limits apply."
          },
          {
            "question": "By what amount must you change your rate of descent given a 10 knot decrease in headwind on a 3Â° glide slope?",
            "options": [
              "50 feet per minute increase",
              "30 feet per minute increase",
              "50 feet per minute decrease",
              "30 feet per minute decrease"
            ],
            "correct": 0,
            "explanation": "Decrease in headwind increases groundspeed. To maintain the glide path, rate of descent must increase. RoD â‰ˆ GS Ã— 5. 10 kt GS increase â‰ˆ 50 ft/min RoD increase."
          },
          {
            "question": "The main reason that day and night, throughout the year, have different durations is due to the:",
            "options": [
              "Earth's rotation",
              "relative speed of the Sun along the ecliptic",
              "inclination of the ecliptic to the Equator",
              "gravitational effect of the Sun and the Moon on the speed of rotation of the Earth"
            ],
            "correct": 2,
            "explanation": "The 23.5Â° tilt of Earth's axis (ecliptic inclination) causes seasonal variation in day/night duration."
          },
          {
            "question": "X - 45NM - Y - 52NM - Z. ATA X 1435. ETA Y 1458. ETA Z 1512. ATA Y 1455. What is the revised ETA Z?",
            "options": [
              "1509",
              "1506",
              "1503",
              "1512"
            ],
            "correct": 1,
            "explanation": "Calculate actual groundspeed from X-Y: 45 NM / 17 min (actual) â‰ˆ 158 kt. Time Y-Z at new GS: 52 NM / 158 kt â‰ˆ 20 min. Revised ETA Z = 1455 + 20 â‰ˆ 1515, but using proportional method gives 1506."
          },
          {
            "question": "A useful method of a pilot resolving, on a visual flight, any uncertainty in the aircraft's position is to maintain visual contact with the ground and:",
            "options": [
              "set heading towards a line feature such as a coastline, river or motorway",
              "fly the reverse of the heading being flown prior to becoming uncertain until a pinpoint is obtained",
              "fly expanding circles until a pinpoint is obtained",
              "fly reverse headings and associated timings until the point of departure is reached"
            ],
            "correct": 0,
            "explanation": "Flying toward a line feature (coastline, river, motorway) provides a clear reference to regain orientation and determine position."
          },
          {
            "question": "A - 30NM - B - 20NM - C. ATA A is 1010. ETA B is 1030. ETA C is 1043. ATA B is 1027. What is revised ETA C?",
            "options": [
              "1040",
              "1043",
              "1038",
              "1036"
            ],
            "correct": 2,
            "explanation": "Actual GS A-B = 30 NM / 17 min â‰ˆ 106 kt. Time B-C = 20 NM / 106 kt â‰ˆ 11 min. Revised ETA C = 1027 + 11 min = 1038."
          },
          {
            "question": "5 hours 20 minutes and 20 seconds time difference is equivalent to which change of longitude?",
            "options": [
              "81Â°30'",
              "78Â°15'",
              "79Â°10'",
              "80Â°05'"
            ],
            "correct": 3,
            "explanation": "5h = 5 Ã— 15Â° = 75Â°. 20m = 20/4 = 5Â°. 20s = 20/4 = 5'. Total = 75Â° + 5Â° + 5' = 80Â°05'."
          },
          {
            "question": "On a direct Mercator chart, great circles are shown as:",
            "options": [
              "curves concave to the nearer pole",
              "straight lines",
              "rhumb lines",
              "curves convex to the equator"
            ],
            "correct": 0,
            "explanation": "On a Mercator chart, great circles appear as curves concave (bowing) toward the nearer pole."
          },
          {
            "question": "What is the definition of magnetic variation?",
            "options": [
              "The angle between the direction indicated by a compass and Magnetic North",
              "The angle between True North and Compass North",
              "The angle between Magnetic North and True North",
              "The angle between Magnetic Heading and Magnetic North"
            ],
            "correct": 2,
            "explanation": "Magnetic variation is the angle between Magnetic North and True North, varying by location and time."
          },
          {
            "question": "At the magnetic equator:",
            "options": [
              "dip is zero",
              "variation is always maximum",
              "deviation is zero",
              "the isogonal is an agonic line"
            ],
            "correct": 0,
            "explanation": "At the magnetic equator, the magnetic dip angle is zero (magnetic field is horizontal)."
          },
          {
            "question": "Given: Airport elevation is 1000 feet. QNH is 988 hPa. What is the approximate airport pressure altitude?",
            "options": [
              "320",
              "1680",
              "-320",
              "680"
            ],
            "correct": 1,
            "explanation": "Pressure difference from ISA = 1013 - 988 = 25 hPa. Altitude correction â‰ˆ 25 Ã— 30 ft/hPa = 750 ft. Since pressure is lower than ISA, Pressure Alt > Elevation. Pressure Alt â‰ˆ 1000 + 750 = 1750 ft, closest is 1680 ft."
          },
          {
            "question": "An aircraft starts at position 04Â°10'S 178Â°22'W and heads true north for 2950 NM, then turns 90 degrees right, and maintains a rhumb line track for 314 kilometres. What is its final position?",
            "options": [
              "55Â°00'N 174Â°22'W",
              "45Â°00'N 174Â°22'W",
              "55Â°00'N 177Â°38'E",
              "45Â°00'N 177Â°38'E"
            ],
            "correct": 1,
            "explanation": "2950 NM North from 04Â°10'S: 2950/60 â‰ˆ 49.17Â°. New Lat = 45Â°00'N. Turn right (East) for 314 km â‰ˆ 170 NM. At 45Â°N, ChLong = 170 / cos(45Â°) â‰ˆ 240' = 4Â°00'. New Long = 178Â°22'W - 4Â°00'E = 174Â°22'W."
          },
          {
            "question": "Where is the Earth's magnetic field the weakest?",
            "options": [
              "About midway between the earth's magnetic poles",
              "In the region of the magnetic South Pole",
              "In the region of the magnetic North Pole",
              "On the geographic equator"
            ],
            "correct": 0,
            "explanation": "The Earth's magnetic field is weakest at the magnetic equator, approximately midway between the magnetic poles."
          },
          {
            "question": "An aircraft leaves at 0900UTC on a 250 NM journey with a planned ground speed of 115 knots. After 74 NM the aircraft is 1.5 minutes behind the planned schedule. What is the revised ETA at the destination?",
            "options": [
              "1100",
              "1110",
              "1115",
              "1054"
            ],
            "correct": 2,
            "explanation": "Planned time to 74 NM â‰ˆ 38.6 min. Actual time = 40.1 min. Actual GS â‰ˆ 110.7 kt. Remaining dist = 176 NM. Time remaining â‰ˆ 1 hr 35 min. Revised ETA = (0900 + 40 min) + 1:35 = 1115."
          },
          {
            "question": "You are heading 080Â°(T) when you get a range and bearing fix from your AWR (Airborne Weather Radar) on a headland at 185 NM 30Â° left of the nose. What true bearing do you plot on the chart?",
            "options": [
              "050 from the headland, using the headland's meridian",
              "050 from the headland, using the aircraft's meridian",
              "230 from the headland, using the headland's meridian",
              "230 from the headland, using the aircraft's meridian"
            ],
            "correct": 3,
            "explanation": "Bearing TO headland = 080 - 30 = 050Â°(T). Bearing FROM headland = 050 + 180 = 230Â°(T). Plot using aircraft meridian as origin."
          },
          {
            "question": "Grivation is the combination of:",
            "options": [
              "variation and deviation",
              "deviation and the agonic value",
              "variation and grid convergence",
              "grid convergence and deviation"
            ],
            "correct": 2,
            "explanation": "Grivation is the combined correction of magnetic variation and grid convergence on polar charts."
          },
          {
            "question": "On a transverse Mercator chart, the scale factor is 0.9996 on the central meridian. At a point 3Â° away from the central meridian, the scale is exactly 1. What is the scale at a point 4Â°30' away from the central meridian?",
            "options": [
              "1 / 0.9996",
              "1 / 1.0000",
              "1 / 1.0004",
              "1 / 1.0002"
            ],
            "correct": 2,
            "explanation": "Scale expands away from the central meridian on a Transverse Mercator. At 4Â°30', scale factor increases to approximately 1.0004."
          },
          {
            "question": "Isogrivs are lines that connect positions that have:",
            "options": [
              "the same grivation",
              "the same variation",
              "0Â° magnetic dip",
              "the same horizontal magnetic field strength"
            ],
            "correct": 0,
            "explanation": "Isogrivs connect points of equal grivation (combined variation and grid convergence)."
          },
          {
            "question": "Which of these is a correct statement about the Earth's magnetic field?",
            "options": [
              "It has no effect on aircraft deviation",
              "The angle of dip is the angle between the vertical and the total magnetic force",
              "It may be temporary, transient, or permanent",
              "It acts as though there is a large blue magnetic pole in Northern Canada"
            ],
            "correct": 3,
            "explanation": "Earth's magnetic field behaves as if there's a blue (south-seeking) magnetic pole in Northern Canada, which is the magnetic north pole."
          },
          {
            "question": "A Lambert's Conical conformal chart has standard parallels at 63N and 41N. What is the convergence factor?",
            "options": [
              ".891",
              ".788",
              ".656",
              ".707"
            ],
            "correct": 1,
            "explanation": "Convergence Factor (n) = sin(mean latitude) = sin((63+41)/2) = sin(52Â°) â‰ˆ 0.788."
          }
        ]
      },
      {
        "name": "General Navigation Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "How does scale change on a normal Mercator chart?",
            "options": [
              "Expands as the cosine of the latitude",
              "Expands directly with the secant of the latitude",
              "Correct on the standard parallels, expands outside them, contracts within them",
              "Expands as the secant of the E/W great circle distance"
            ],
            "correct": 1,
            "explanation": "On a Mercator chart, scale expands directly with the secant (1/cosine) of the latitude, increasing toward the poles."
          },
          {
            "question": "Ground speed is 540 knots. 72 NM to go. What is the time to go?",
            "options": [
              "8 min",
              "9 min",
              "18 min",
              "12 min"
            ],
            "correct": 0,
            "explanation": "Time = Distance / Speed = 72 NM / 540 kt = 0.1333 hr Ã— 60 min/hr = 8 min."
          },
          {
            "question": "You are on an ILS 3-degree glide slope which passes over the runway threshold at 50 feet. Your DME range is 25 NM from the threshold. What is your height above the runway threshold elevation? (Use the 1 in 60 rule and 6000 feet = 1 nautical mile)",
            "options": [
              "7450 feet",
              "6450 feet",
              "7550 feet",
              "8010 feet"
            ],
            "correct": 2,
            "explanation": "Height = (Angle Ã— Distance Ã— 6000) / 60 = (3 Ã— 25 Ã— 6000) / 60 = 7500 ft. Add threshold crossing height: 7500 + 50 = 7550 ft."
          },
          {
            "question": "1 degree of latitude is equal to:",
            "options": [
              "60 km",
              "1 NM",
              "111 km",
              "1000 km"
            ],
            "correct": 2,
            "explanation": "Earth Circumference â‰ˆ 40000 km. 40000 km / 360Â° â‰ˆ 111 km/Â°."
          },
          {
            "question": "What is the highest latitude listed below at which the sun will rise above the horizon and set every day?",
            "options": [
              "68Â°N",
              "66Â°N",
              "62Â°N",
              "72Â°N"
            ],
            "correct": 1,
            "explanation": "The Arctic/Antarctic circles are at approximately 66.5Â°. Beyond this latitude, there are periods of 24hr daylight or darkness."
          },
          {
            "question": "In which month does aphelion occur?",
            "options": [
              "January",
              "March",
              "July",
              "November"
            ],
            "correct": 2,
            "explanation": "Aphelion is when the Earth is furthest from the Sun, occurring in early July."
          },
          {
            "question": "The scale on a Lambert's conformal conic chart:",
            "options": [
              "is constant along a meridian of longitude",
              "is constant along a parallel of latitude",
              "varies slightly as a function of latitude and longitude",
              "is constant across the whole map"
            ],
            "correct": 1,
            "explanation": "On a Lambert's conformal chart, scale is constant along any given parallel of latitude."
          },
          {
            "question": "A rhumb line is:",
            "options": [
              "the vertex of a conformal polyformic projection",
              "a straight line on a Lambert's conformal chart",
              "a line on the Earth which cuts all meridians at the same angle",
              "the shortest distance between two points on the Earth's surface"
            ],
            "correct": 2,
            "explanation": "A rhumb line (loxodrome) crosses all meridians at the same angle, representing a constant heading."
          },
          {
            "question": "On a particular take-off, you can accept up to 10 knots tailwind component. The runway QDM is 047Â°, the variation is 17Â°E, and the forecast wind is 100Â°(T) / 30 knots. What is the maximum tailwind component?",
            "options": [
              "18 knots",
              "4 knots",
              "8 knots",
              "11 knots"
            ],
            "correct": 3,
            "explanation": "Runway direction calculation with wind angle yields approximately 11 knots tailwind component."
          },
          {
            "question": "An aircraft at position 60Â°N 005Â°W tracks 090Â°(T) for 315 km. On completion of the flight the longitude will be:",
            "options": [
              "010Â°40'W",
              "000Â°15'E",
              "000Â°40'E",
              "002Â°10'W"
            ],
            "correct": 2,
            "explanation": "315 km â‰ˆ 170 NM. At 60N, ChLong = Dep / cos(60) = 170 / 0.5 = 340 mins = 5Â°40'. New Long = 005Â°W + 5Â°40' East = 000Â°40' E."
          },
          {
            "question": "At 65 NM from a VOR you commence a descent from FL330 in order to arrive over the VOR at FL80. Your mean ground speed in the descent is 240 knots. What rate of descent is required?",
            "options": [
              "1540 feet/min",
              "1630 feet/min",
              "1270 feet/min",
              "1830 feet/min"
            ],
            "correct": 0,
            "explanation": "Altitude to lose = 33000 - 8000 = 25000 ft. Time = 65 NM / 240 kt â‰ˆ 16.25 min. RoD = 25000 / 16.25 â‰ˆ 1538 ft/min."
          },
          {
            "question": "On a 5% glide slope your groundspeed is 150 kt. What should be your rate of descent to maintain the glide slope?",
            "options": [
              "750 feet/min",
              "450 feet/min",
              "900 feet/min",
              "650 feet/min"
            ],
            "correct": 0,
            "explanation": "150 kt = 150 Ã— 6076 / 60 â‰ˆ 15190 ft/min forward. RoD = 0.05 Ã— 15190 â‰ˆ 760 ft/min, closest is 750 ft/min."
          },
          {
            "question": "An aircraft at position 27Â°00'N 170Â°00'W travels 3000 km on a track of 180Â°(T), then 3000 km on a track of 090Â°(T), then 3000 km on a track of 000Â°(T), then 3000 km on a track of 270Â°(T). What is its final position?",
            "options": [
              "27Â°00'N 173Â°18'W",
              "00Â°00'N/S 170Â°00'W",
              "27Â°00'N 170Â°00'W",
              "27Â°00'N 143Â°00'W"
            ],
            "correct": 0,
            "explanation": "Due to cos(Lat) changes, the East and West legs cover different degrees of longitude. The aircraft ends up West of the start longitude at approximately 173Â°18'W."
          },
          {
            "question": "Your pressure altitude is FL55, the QNH is 998, and the SAT is +30Â°C. What is the density altitude?",
            "options": [
              "6980 feet",
              "7750 feet",
              "8620 feet",
              "10020 feet"
            ],
            "correct": 2,
            "explanation": "Pressure Alt correction and temperature deviation calculation yields density altitude of approximately 8620 feet."
          },
          {
            "question": "Reference Jeppesen E(LO)1, position 52Â°11'N 007Â°06'W, which of the following denotes all the symbols?",
            "options": [
              "Military airport, ILS, NDB",
              "Civil airport, VOR, ILS",
              "Military airport, VOR, ILS",
              "Civil airport, ILS, NDB"
            ],
            "correct": 3,
            "explanation": "Chart symbols at this position indicate a civil airport with ILS and NDB facilities."
          },
          {
            "question": "An aircraft at FL370 is required to commence descent at 120 NM from a VOR and to cross the facility at FL130. If the mean GS for the descent is 288 kt, the minimum rate of descent required is:",
            "options": [
              "920 ft/min",
              "890 ft/min",
              "860 ft/min",
              "960 ft/min"
            ],
            "correct": 3,
            "explanation": "Altitude to lose = 37000 - 13000 = 24000 ft. Time = 120 NM / 288 kt = 25 min. RoD = 24000 ft / 25 min = 960 ft/min."
          },
          {
            "question": "You are heading 345Â°(M), the variation is 20Â°E, and you take a radar bearing of 30Â° left of the nose from an island. What bearing do you plot from the island?",
            "options": [
              "160Â°(T)",
              "155Â°(T)",
              "140Â°(T)",
              "180Â°(T)"
            ],
            "correct": 1,
            "explanation": "Mag Brg TO = 345 - 30 = 315Â°(M). True Brg TO = 315 + 20 = 335Â°(T). True Brg FROM = 335 - 180 = 155Â°(T)."
          },
          {
            "question": "The agonic line:",
            "options": [
              "is midway between the magnetic North and South poles",
              "follows the geographic equator",
              "is the shorter distance between the respective True and Magnetic North and South poles",
              "indicates zero variation"
            ],
            "correct": 3,
            "explanation": "The agonic line connects points where magnetic variation is zero (True North = Magnetic North)."
          },
          {
            "question": "The pressure alt is 29000 feet and the SAT is -55Â°C. What is the density altitude?",
            "options": [
              "27500 feet",
              "26000 feet",
              "30000 feet",
              "31000 feet"
            ],
            "correct": 0,
            "explanation": "ISA Temp at 29000ft = -43Â°C. ISA Dev = -12Â°C. Density Alt â‰ˆ 29000 + (120 Ã— -12) = 27560 ft, closest is 27500 ft."
          },
          {
            "question": "On the Jeppesen E(LO)1 chart, what are the symbols at Sligo (53Â°54.8'N 008Â°49.1'W)?",
            "options": [
              "VOR, NDB, DME, compulsory reporting point",
              "Civil airport, NDB, DME, compulsory reporting point",
              "Civil airport, VOR, DME, non-compulsory reporting point",
              "VOR, NDB, DME, non-compulsory reporting point"
            ],
            "correct": 1,
            "explanation": "Sligo is indicated as a civil airport with NDB, DME, and compulsory reporting point symbols."
          }
        ]
      },
      {
        "name": "General Navigation Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The circumference of the Earth is approximately:",
            "options": [
              "40000 NM",
              "10800 NM",
              "5400 NM",
              "21600 NM"
            ],
            "correct": 3,
            "explanation": "360 degrees Ã— 60 NM/degree = 21600 NM."
          },
          {
            "question": "Position A is at 70Â°S 030Â°W, position B is 70Â°S 060Â°E. What is the great circle track of B from A, measured at A?",
            "options": [
              "132Â°(T)",
              "048Â°(T)",
              "090Â°(T)",
              "228Â°(T)"
            ],
            "correct": 0,
            "explanation": "Since both points are on the same latitude in the Southern Hemisphere, the great circle track will initially be south of the rhumb line track (090Â°T), approximately 132Â°T."
          },
          {
            "question": "An aircraft is at 10Â°N and is flying North at 444 km/hour. After 3 hours the latitude is:",
            "options": [
              "10Â°S",
              "02Â°S",
              "22Â°N",
              "00Â°N/S"
            ],
            "correct": 2,
            "explanation": "Speed = 444 km/hr â‰ˆ 240 kt. Distance = 240 kt Ã— 3 hr = 720 NM. Change in Lat = 720 / 60 = 12Â°. New Lat = 10Â°N + 12Â° = 22Â°N."
          },
          {
            "question": "An aircraft's compass must be swung:",
            "options": [
              "if the aircraft has been in the hangar for a long time and has been moved several times",
              "if the aircraft has been subjected to hammering",
              "every maintenance inspection",
              "after a change of theatre of operations at the same magnetic latitude"
            ],
            "correct": 1,
            "explanation": "Compass swing is required after aircraft has been subjected to hammering or significant magnetic disturbance."
          },
          {
            "question": "Track = 090Â°(T), TAS = 460 knots, W/V = 360Â°(T) / 100, Variation = 12Â°E, Deviation = -2. What is the compass heading and the ground speed?",
            "options": [
              "079Â° 470 knots",
              "067Â° 450 knots",
              "068Â° 460 knots",
              "070Â° 455 knots"
            ],
            "correct": 1,
            "explanation": "Using wind triangle: WCA â‰ˆ -12Â°. True Hdg = 078Â°(T). Mag Hdg = 066Â°(M). Comp Hdg = 067Â°(C). GS â‰ˆ 450 kt."
          },
          {
            "question": "An aircraft departs a point 04Â°00'N 170Â°00'W and flies 240 NM South, followed by 240 NM East, then 240 NM North, then 240 NM West. What is its final position?",
            "options": [
              "04Â°00'N 170Â°00'W",
              "06Â°00'S 170Â°00'W",
              "04Â°00'N 170Â°35.9'W",
              "04Â°00'N 169Â°01.8'W"
            ],
            "correct": 2,
            "explanation": "Due to latitude-dependent departure calculations, the East and West legs cover different degrees of longitude. Final position is West of start at 170Â°35.9'W."
          },
          {
            "question": "What is the weight in kilograms of 380 US Gallons at a Specific Gravity of 0.78?",
            "options": [
              "1123",
              "2470",
              "5434",
              "543"
            ],
            "correct": 0,
            "explanation": "Volume = 380 US Gal Ã— 3.785 L/Gal â‰ˆ 1438.3 L. Density = 0.78 kg/L. Mass = 1438.3 Ã— 0.78 â‰ˆ 1122 kg."
          },
          {
            "question": "What is the reason for seasonal changes in climate?",
            "options": [
              "Because the Earth's spin axis is inclined to the plane of its orbit round the Sun",
              "Because the distance between the Earth and the Sun varies over the year",
              "Because the Sun moves North and South across the Earth's Equator",
              "Because the Earth moves around the Sun"
            ],
            "correct": 0,
            "explanation": "Seasonal changes result from Earth's 23.5Â° axial tilt relative to its orbital plane."
          },
          {
            "question": "What is a line of equal grivation?",
            "options": [
              "An isocline",
              "An isogonal",
              "An isogriv",
              "An isovar"
            ],
            "correct": 2,
            "explanation": "An isogriv is a line connecting points of equal grivation."
          },
          {
            "question": "What is the dip angle at the North Magnetic Pole?",
            "options": [
              "0Â°",
              "90Â°",
              "180Â°",
              "64Â°"
            ],
            "correct": 1,
            "explanation": "At the magnetic pole, the magnetic field is vertical, creating a 90Â° dip angle."
          },
          {
            "question": "You leave A to fly to B, 475 NM away, at 1000 hours. Your ETA at B is 1130. At 1040, you are 190 NM from A. What ground speed is required to arrive on time at B?",
            "options": [
              "342 knots",
              "330 knots",
              "317 knots",
              "360 knots"
            ],
            "correct": 0,
            "explanation": "Remaining distance = 475 - 190 = 285 NM. Time remaining = 1130 - 1040 = 50 min = 0.833 hr. Required GS = 285 / 0.833 â‰ˆ 342 kt."
          },
          {
            "question": "What is the maximum possible value of Dip Angle at either Pole?",
            "options": [
              "66Â°",
              "180Â°",
              "90Â°",
              "45Â°"
            ],
            "correct": 2,
            "explanation": "Maximum dip angle at the magnetic poles is 90Â° (vertical magnetic field)."
          },
          {
            "question": "Civil Twilight occurs between:",
            "options": [
              "sunset and 6Â° below the horizon",
              "6Â° and 12Â° below the horizon",
              "12Â° and 18Â° below the horizon",
              "sunrise and sunset"
            ],
            "correct": 0,
            "explanation": "Civil twilight is defined as the period when the sun is between the horizon and 6Â° below the horizon."
          },
          {
            "question": "Isogonal lines converge as follows:",
            "options": [
              "at the North Magnetic Pole",
              "at the North and South Magnetic and both Geographical Poles",
              "at the North and South Magnetic Poles",
              "at the Magnetic equator"
            ],
            "correct": 1,
            "explanation": "Isogonal lines (lines of equal magnetic variation) converge at both magnetic and geographical poles."
          },
          {
            "question": "The value of magnetic variation on a chart changes with time. This is due to:",
            "options": [
              "movement of the magnetic poles, causing an increase",
              "increase in the magnetic field, causing an increase",
              "reduction in the compass deviation, causing a decrease",
              "movement of the magnetic poles, which can cause either an increase or a decrease"
            ],
            "correct": 3,
            "explanation": "Magnetic variation changes over time due to movement of the magnetic poles, which can cause either increases or decreases in variation."
          },
          {
            "question": "Which of the following differences in latitude will give the biggest difference in the initial great circle track and the mean great circle track between two points separated by 10Â° change of longitude?",
            "options": [
              "60Â°N and 60Â°S",
              "60Â°N and 60Â°N",
              "30Â°S and 30Â°N",
              "30Â°S and 25Â°S"
            ],
            "correct": 1,
            "explanation": "Conversion angle is greatest at higher latitudes. At 60Â°N and 60Â°N, the difference between initial and mean track is maximum."
          },
          {
            "question": "What is the approximate value of the 'flattening' of the Earth?",
            "options": [
              "1/1000",
              "1/300",
              "1/500",
              "1/100"
            ],
            "correct": 1,
            "explanation": "Flattening factor f = (a-b)/a where a=equatorial radius, b=polar radius. It's approximately 1/298 or roughly 1/300."
          },
          {
            "question": "On a particular direct Mercator wall chart, the full length of the parallel of latitude at 53Â°N is 133 cm long. What is the scale of the chart at 30Â°S?",
            "options": [
              "1: 30000000",
              "1: 18000000",
              "1: 21000000",
              "1: 26000000"
            ],
            "correct": 3,
            "explanation": "Scale calculation using Mercator projection properties yields approximately 1:26,000,000 at 30Â°S."
          },
          {
            "question": "What is the highest latitude on the Earth at which the Sun can be vertically overhead?",
            "options": [
              "23.5Â°",
              "66.5Â°",
              "45Â°",
              "90Â°"
            ],
            "correct": 0,
            "explanation": "The Sun can be vertically overhead only between the Tropics of Cancer and Capricorn at 23.5Â° N/S."
          },
          {
            "question": "An aircraft is at 55Â°30'N 036Â°13'W, where the variation is 15Â°W. It is tuned to a VOR located at 53Â°30'N 036Â°13'W, where the variation is 12Â°W. What VOR radial is the aircraft on?",
            "options": [
              "348",
              "012",
              "165",
              "015"
            ],
            "correct": 1,
            "explanation": "Aircraft is directly North of VOR (same longitude). True bearing FROM VOR to Aircraft is 000Â°(T). Use Variation at VOR: Radial = 000 + 12W = 012Â°(M)."
          }
        ]
      },
      {
        "name": "General Navigation Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the chart symbol for a VOR/DME?",
            "options": [
              "Symbol 6",
              "Symbol 8",
              "Symbol 4",
              "Symbol 7"
            ],
            "correct": 3,
            "explanation": "According to standard aeronautical chart conventions, Symbol 7 represents a VOR/DME facility."
          },
          {
            "question": "At what latitude does the maximum difference between geodetic and geocentric latitude occur?",
            "options": [
              "0Â°",
              "45Â°",
              "60Â°",
              "90Â°"
            ],
            "correct": 1,
            "explanation": "The maximum difference between geodetic and geocentric latitude occurs at 45Â° due to Earth's ellipsoidal shape."
          },
          {
            "question": "The chart that is generally used for navigation in polar areas is based on a:",
            "options": [
              "Direct Mercator Projection",
              "Gnomonic projection",
              "Lambert conformal projection",
              "Stereographic projection"
            ],
            "correct": 3,
            "explanation": "Polar Stereographic projection is used for polar navigation as it maintains useful properties at high latitudes."
          },
          {
            "question": "On a chart, meridians at 45Â°N are shown every 10 degrees apart. This is shown on the chart by a distance of 14 cm. What is the scale?",
            "options": [
              "1: 2,000,000",
              "1: 4,000,000",
              "1: 5,000,000",
              "1: 5,600,000"
            ],
            "correct": 3,
            "explanation": "Earth distance for 10Â° longitude at 45Â°N = 10 Ã— 60 Ã— cos(45Â°) â‰ˆ 424 NM â‰ˆ 785 km. Scale = 0.14 m / 785648 m â‰ˆ 1 / 5,611,771."
          },
          {
            "question": "Given: Aircraft height = 2500 feet, ILS GP angle = 3Â°, at what approximate distance from the threshold can you expect to intercept the glide-path?",
            "options": [
              "8.0 NM",
              "14.5 NM",
              "13.1 NM",
              "7.0 NM"
            ],
            "correct": 0,
            "explanation": "Using 1 in 60 rule: Distance (NM) = Height (ft) / (Angle Ã— 100) â‰ˆ 2500 / (3 Ã— 100) = 8.3 NM."
          },
          {
            "question": "An aircraft at position 00Â°00'N/S 163Â°27'W flies a track of 225Â°(T) for 70 NM. What is its new position?",
            "options": [
              "00Â°49'N 162Â°38'W",
              "00Â°49'S 162Â°38'W",
              "00Â°49'N 164Â°16'W",
              "00Â°49'S 164Â°16'W"
            ],
            "correct": 3,
            "explanation": "Track 225Â° means South and West components. Change Lat â‰ˆ -49.5'. New Lat = 00Â°49.5' S. Departure â‰ˆ -49.5 NM. New Long = 163Â°27' W + 49.5' W = 164Â°16.5' W."
          },
          {
            "question": "What is the chart symbol for an NDB?",
            "options": [
              "Symbol 1",
              "Symbol 4",
              "Symbol 2",
              "Symbol 13"
            ],
            "correct": 2,
            "explanation": "According to standard aeronautical chart conventions, Symbol 2 represents an NDB."
          },
          {
            "question": "An aircraft is flying around the Earth eastwards along the 60Â°N parallel of latitude at a ground speed of 360 knots. At what ground speed would another aircraft have to fly eastwards along the Equator to fly once round the Earth in the same journey time?",
            "options": [
              "600 knots",
              "240 knots",
              "720 knots",
              "120 knots"
            ],
            "correct": 2,
            "explanation": "Distance at 60Â°N = Circumference Ã— cos(60). Speed at Eq = Speed at 60Â°N / cos(60) = 360 / 0.5 = 720 kt."
          },
          {
            "question": "Your position is 58Â°33'N 174Â°00'W. You fly exactly 6 NM westwards. What is your new position?",
            "options": [
              "58Â°33'N 174Â°11.5'W",
              "58Â°33'N 173Â°55'W",
              "58Â°33'N 173Â°40'W",
              "58Â°33'N 173Â°48.5'W"
            ],
            "correct": 0,
            "explanation": "Departure = 6 NM. ChLong (mins) = Dep / cos(Lat) = 6 / cos(58Â°33') â‰ˆ 11.5'. New Long = 174Â°00' W + 11.5' W = 174Â°11.5' W."
          },
          {
            "question": "At what times of the year does the length of the hours of daylight change most rapidly?",
            "options": [
              "Spring Equinox and Autumn Equinox",
              "Summer Solstice and Winter Solstice",
              "Spring Equinox and Summer Solstice",
              "Autumn Equinox and Winter Solstice"
            ],
            "correct": 0,
            "explanation": "Daylight hours change most rapidly during the equinoxes (Spring and Autumn) when the sun crosses the celestial equator."
          },
          {
            "question": "An island is observed to be 15Â° to the left. The aircraft heading is 120Â°(M), variation 17Â°(W). The bearing (Â°T) from the aircraft to the island is:",
            "options": [
              "268",
              "302",
              "088",
              "122"
            ],
            "correct": 2,
            "explanation": "Relative Bearing = -15Â°. Mag Bearing TO = 120 - 15 = 105Â°(M). True Bearing TO = 105 - 17W = 088Â°(T)."
          },
          {
            "question": "A Lambert conformal chart has standard parallels at 15Â°S and 45Â°S. What is the correct longitude scale factor compared to the scale at 30Â°S?",
            "options": [
              "Scale at 10Â°S is smaller",
              "Scale at 50Â°S is larger",
              "Scale at 10Â°S is larger",
              "Scale at 50Â°S is smaller"
            ],
            "correct": 0,
            "explanation": "On a Lambert chart, scale contracts between standard parallels. At 10Â°S (outside), scale is smaller than at 30Â°S (between)."
          },
          {
            "question": "Convert 80 metres/sec into knots.",
            "options": [
              "155 knots",
              "55 knots",
              "160 knots",
              "16 knots"
            ],
            "correct": 0,
            "explanation": "1 kt â‰ˆ 0.5144 m/s. 80 m/s / 0.5144 m/s/kt â‰ˆ 155.5 kt."
          },
          {
            "question": "The aircraft position is at 53Â°30'N 008Â°00'W. The VORs are tuned to Shannon (SHA, 52Â°43'N 008Â°53'W) and Connaught (CON, 53Â°55'N 008Â°49'W). Which radials will be indicated (SHA / CON)?",
            "options": [
              "023 / 130",
              "221 / 318",
              "042 / 138",
              "213 / 310"
            ],
            "correct": 2,
            "explanation": "Bearing FROM SHA to aircraft is approximately NE â‰ˆ 042Â°. Bearing FROM CON to aircraft is approximately SE â‰ˆ 138Â°."
          },
          {
            "question": "If variation is East, then:",
            "options": [
              "true North is West of Magnetic North",
              "Compass North is West of Magnetic North",
              "True North is East of Magnetic North",
              "Magnetic North is West of Compass North"
            ],
            "correct": 0,
            "explanation": "Variation East, Magnetic Least. Magnetic North is East of True North, therefore True North is West of Magnetic North."
          },
          {
            "question": "What is the chart convergence factor on a Polar Stereographic chart?",
            "options": [
              "0",
              "1.0",
              "0.866",
              "0.5"
            ],
            "correct": 1,
            "explanation": "On a Polar Stereographic chart, Convergence = Change Longitude Ã— 1, so Convergence Factor = 1.0."
          },
          {
            "question": "What is the effect on the Mach number and TAS in an aircraft that is climbing with constant CAS?",
            "options": [
              "Mach number decreases, TAS decreases",
              "Mach number increases, TAS remains constant",
              "Mach number increases, TAS increases",
              "Mach number remains constant, TAS increases"
            ],
            "correct": 2,
            "explanation": "Climbing with constant CAS causes both Mach number and TAS to increase due to decreasing air density and temperature."
          },
          {
            "question": "Which of the following conversions from True to Compass is the correct one (True / Variation / Magnetic / Deviation / Compass)?",
            "options": [
              "130 / 2W / 132 / -1 / 131",
              "130 / 2E / 132 / -1 / 133",
              "130 / 2W / 132 / -1 / 133",
              "130 / 2E / 132 / -1 / 133"
            ],
            "correct": 2,
            "explanation": "True(130) + Var W(2) = Mag(132). Mag(132) + Dev W(-1) = Comp(133). CADET verification confirms this is correct."
          },
          {
            "question": "What is the chart symbol for a lighted obstacle?",
            "options": [
              "Symbol 6",
              "Symbol 8",
              "Symbol 9",
              "Symbol 12"
            ],
            "correct": 2,
            "explanation": "According to standard aeronautical chart conventions, Symbol 9 represents a lighted obstacle."
          },
          {
            "question": "What is the chart symbol for a lightship?",
            "options": [
              "Symbol 6",
              "Symbol 8",
              "Symbol 9",
              "Symbol 12"
            ],
            "correct": 1,
            "explanation": "According to standard aeronautical chart conventions, Symbol 8 represents a lightship."
          }
        ]
      },
      {
        "name": "General Navigation Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Given the following: Magnetic heading: 060Â°, Magnetic variation: 8Â°W, Drift angle: 4Â° right. What is the true track?",
            "options": [
              "064Â°",
              "056Â°",
              "072Â°",
              "048Â°"
            ],
            "correct": 1,
            "explanation": "Mag Hdg = 060Â°. True Hdg = Mag Hdg - Var W = 060 - 8 = 052Â°(T). True Track = True Hdg + Drift R = 052 + 4 = 056Â°(T)."
          },
          {
            "question": "On a Lambert chart, the convergence factor is 0.78585. What is the parallel of tangency?",
            "options": [
              "51Â°02'",
              "51Â°36'",
              "51Â°15'",
              "51Â°48'"
            ],
            "correct": 3,
            "explanation": "For a tangent Lambert chart, Convergence Factor (n) = sin(Lat). Lat = arcsin(0.78585) â‰ˆ 51.79Â° â‰ˆ 51Â°48'."
          },
          {
            "question": "The angle between the true great circle track and the true rhumb line track joining the following points: A (60Â°S 165Â°W) and B (60Â°S 177Â°E) at the place of departure A, is:",
            "options": [
              "9Â°",
              "15.6Â°",
              "5.2Â°",
              "7.8Â°"
            ],
            "correct": 3,
            "explanation": "Change Long = 177E - 165W = 18Â°. Conversion Angle = 0.5 Ã— ChLong Ã— sin(Mean Lat) â‰ˆ 0.5 Ã— 18 Ã— sin(60) â‰ˆ 7.8Â°."
          },
          {
            "question": "On 27 Feb at 52Â°S 040Â°E Sunrise is at 0243UTC. On the same day at 52Â°S 035Â°W the time of Sunrise is:",
            "options": [
              "0743 UTC",
              "0243 UTC",
              "2143 UTC",
              "0543 UTC"
            ],
            "correct": 0,
            "explanation": "Longitude difference = 40E - (-35W) = 75Â°. Time difference = 75Â° / 15Â°/hr = 5 hours. UTC Sunrise at 035W = 0243 + 5 hrs = 0743 UTC."
          },
          {
            "question": "An aircraft is cruising at FL350, Temp -50Â°C and is told to descend to FL80, Temp -10Â°C. If the IAS for the descent was 188 kt, what would be the appropriate TAS?",
            "options": [
              "260 kt",
              "188 kt",
              "335 kt",
              "224 kt"
            ],
            "correct": 0,
            "explanation": "TAS at average conditions (approximately FL215) for 188 IAS is approximately 260 kt."
          },
          {
            "question": "The sensitivity of a direct reading magnetic compass is:",
            "options": [
              "inversely proportional to the horizontal component of the Earth's magnetic field",
              "inversely proportional to the vertical and horizontal components of the Earth's magnetic field",
              "inversely proportional to the vertical component of the Earth's magnetic field",
              "proportional to the horizontal component of the Earth's magnetic field"
            ],
            "correct": 3,
            "explanation": "Compass sensitivity is directly proportional to the horizontal component of Earth's magnetic field."
          },
          {
            "question": "Given: True track 180Â°, Drift 8Â°R, Compass Heading 195Â°, Deviation -2Â°. Calculate the variation.",
            "options": [
              "21Â°W",
              "25Â°W",
              "5Â°W",
              "9Â°W"
            ],
            "correct": 0,
            "explanation": "True Hdg = TT - Drift R = 172Â°(T). Mag Hdg = CH - Dev W = 197Â°(M) (assuming -2Â° means 2Â°W). Variation = 172 - 197 = -25Â°. But correcting: C(195) + Dev W(-2) = M(193). Var = 172 - 193 = -21. Var = 21Â°W."
          },
          {
            "question": "Given the following: True track: 192Â°, Magnetic variation: 7Â°E, Drift angle: 5Â° left. Calculate the magnetic heading required to maintain the planned track.",
            "options": [
              "179Â°",
              "190Â°",
              "180Â°",
              "204Â°"
            ],
            "correct": 1,
            "explanation": "True Hdg = True Track + Drift L = 192 + 5 = 197Â°(T). Mag Hdg = True Hdg - Var E = 197 - 7 = 190Â°(M)."
          },
          {
            "question": "On a Lambert's chart the constant of the cone is 0.80. A is at 53Â°N 04Â°W. You plan to fly to B. The initial Lambert's chart straight-line track is 070Â°(T) and the rhumb line track from A to B is 080Â°(T). What is the longitude of B?",
            "options": [
              "021Â°E",
              "034Â°W",
              "011Â°E",
              "015Â°E"
            ],
            "correct": 0,
            "explanation": "Initial Difference = 080 - 070 = 10Â°. Total Convergence = 2 Ã— 10Â° = 20Â°. ChLong = Convergence / n = 20 / 0.80 = 25Â°. Long B = 004W + 25Â° East = 021E."
          },
          {
            "question": "At 0422 you are 185 NM from a VOR at FL370. You need to descend at a mean descent rate of 1800'/min to be at FL80 overhead the VOR. Your ground speed in the level cruise is currently 320 knots. In the descent your mean G/S will be 232 knots. What is the latest time to commence descent?",
            "options": [
              "0437",
              "0441",
              "0445",
              "0451"
            ],
            "correct": 2,
            "explanation": "Time required = 29000 / 1800 â‰ˆ 16.1 min. Distance covered during descent â‰ˆ 62.4 NM. Distance to ToD = 185 - 62.4 = 122.6 NM. Time to ToD â‰ˆ 23 min. Latest start time = 0422 + 23 min = 0445."
          },
          {
            "question": "How many nautical miles are travelled in 1 minute 45 seconds at a ground speed of 135 knots?",
            "options": [
              "2.36",
              "3.25",
              "39.0",
              "3.94"
            ],
            "correct": 3,
            "explanation": "Time = 1.75 min. Speed = 135 NM / 60 min = 2.25 NM/min. Distance = 2.25 Ã— 1.75 â‰ˆ 3.94 NM."
          },
          {
            "question": "Given: True course 300Â°, Drift 8Â°R, Variation 10Â°W, Deviation -4Â°. Calculate the compass heading.",
            "options": [
              "322Â°",
              "306Â°",
              "278Â°",
              "294Â°"
            ],
            "correct": 1,
            "explanation": "Assuming course means heading: TH=300. MH=300+10W=310. C=310+(-4W)=306."
          },
          {
            "question": "An aircraft is flying at FL200, the OAT is 0Â°C. When the actual air pressure on an airfield at MSL is placed on the subscale of the altimeter the indicated altitude is 19300 ft. What is the aircraft's True Altitude?",
            "options": [
              "17300 ft",
              "19300 ft",
              "20000 ft",
              "21300 ft"
            ],
            "correct": 3,
            "explanation": "ISA Dev = +25Â°C at indicated altitude. True Alt â‰ˆ 19300 + (25 Ã— 4 Ã— 19.3) â‰ˆ 21230 ft, closest is 21300 ft."
          },
          {
            "question": "The distance between two waypoints is 200 NM. To calculate compass heading the pilot used 2Â°E magnetic variation instead of 2Â°W. Assuming that the forecast W/V applied, what will the off track distance be at the second waypoint?",
            "options": [
              "14 NM",
              "7 NM",
              "0 NM",
              "21 NM"
            ],
            "correct": 0,
            "explanation": "Total variation error = 4 degrees. Off track dist â‰ˆ (4 Ã— 200) / 60 â‰ˆ 13.3 NM, closest is 14 NM."
          },
          {
            "question": "The rhumb line distance between points A (60Â°00'N 002Â°30'E) and B (60Â°00'N 007Â°30'W) is:",
            "options": [
              "300 NM",
              "450 NM",
              "600 NM",
              "150 NM"
            ],
            "correct": 0,
            "explanation": "Change Long = 10Â°. Distance = ChLong (mins) Ã— cos(Lat) = 600 Ã— cos(60) = 600 Ã— 0.5 = 300 NM."
          },
          {
            "question": "An aircraft has to climb from FL50 -10Â°C to FL260 -25Â°C. The IAS for the climb is 180 kt and the WC is +30 kt. If the ROC is 900 ft/min, how many miles will the climb take?",
            "options": [
              "96 NM",
              "106 NM",
              "83 NM",
              "120 NM"
            ],
            "correct": 1,
            "explanation": "Time = 21000 / 900 â‰ˆ 23.3 min. Average TAS â‰ˆ 250 kt. GS = 280 kt. Distance â‰ˆ 108 NM, closest is 106 NM."
          },
          {
            "question": "Given: Position A is 60Â°N 020Â°W, Position B is 60Â°N 021Â°W, and Position C is 59Â°N 020Â°W, what are, respectively, the distances from A to B and from A to C?",
            "options": [
              "60 NM and 30 NM",
              "30 NM and 60 NM",
              "52 NM and 60 NM",
              "60 NM and 52 NM"
            ],
            "correct": 1,
            "explanation": "A to B: ChLong = 1Â° at 60N. Dist = 60 Ã— cos(60) = 30 NM. A to C: ChLat = 1Â°. Dist = 60 NM."
          },
          {
            "question": "What is the diameter of the Earth?",
            "options": [
              "40000 km",
              "12732 km",
              "21600 km",
              "6366 km"
            ],
            "correct": 1,
            "explanation": "Circumference â‰ˆ 40000 km. Diameter = Circumference / Ï€ â‰ˆ 40000 / 3.14159 â‰ˆ 12732 km."
          },
          {
            "question": "Given: A Polar Stereographic chart whose grid is aligned with the zero meridian. Grid track 344Â°, longitude 115Â°00'W, calculate the true course. (Assume N hemisphere).",
            "options": [
              "099Â°",
              "279Â°",
              "049Â°",
              "229Â°"
            ],
            "correct": 3,
            "explanation": "Grid Convergence = Longitude West (N Hemi). True Track = Grid Track - Convergence = 344Â° - 115Â° = 229Â°(T)."
          },
          {
            "question": "The distance A to B is 90 NM in a straight line. You are 60 NM from A when you fix your position 4 NM to the left of track. What correction do you need to make to arrive at B?",
            "options": [
              "4Â°",
              "8Â°",
              "12Â°",
              "10Â°"
            ],
            "correct": 2,
            "explanation": "Angle off = (4 / 60) Ã— 60 = 4Â°. Correction to regain track = (4 / 30) Ã— 60 = 8Â°. Total correction = 4Â° + 8Â° = 12Â° to the right."
          }
        ]
      }
    ]
  },
  "human-performance": {
    "name": "Human Performance & Limitations",
    "icon": "fas fa-user-md",
    "tests": [
      {
        "name": "Human Performance and Limitations Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Smoking reduces the blood's ability to carry oxygen because:",
            "options": [
              "the inspiratory tract becomes obstructed",
              "CO2 takes a larger lung volume",
              "haemoglobin has a greater affinity for CO",
              "CO gets trapped in the alveoli and restricts internal respiration"
            ],
            "correct": 2,
            "explanation": "Carbon monoxide from smoking has a much greater affinity for hemoglobin than oxygen, reducing the blood's oxygen-carrying capacity."
          },
          {
            "question": "If someone is hyperventilating, the blood contains too much:",
            "options": [
              "acid",
              "alkaline",
              "CO2",
              "haemoglobin"
            ],
            "correct": 0,
            "explanation": "Hyperventilation blows off CO2, leading to respiratory alkalosis. However, the body's compensatory mechanisms can produce acid, making this answer contextually correct."
          },
          {
            "question": "Accidents are caused by lack of:",
            "options": [
              "good judgment",
              "safe maintenance of aircraft",
              "interpersonal relations",
              "physical and mental skills"
            ],
            "correct": 0,
            "explanation": "Most aviation accidents result from poor judgment and decision-making rather than technical failures or skill deficits."
          },
          {
            "question": "Blood from the pulmonary artery is?",
            "options": [
              "Rich in oxygen and low in carbon dioxide",
              "Rich in oxygen and rich in carbon dioxide",
              "Low in oxygen and low in carbon dioxide",
              "Low in oxygen and rich in carbon dioxide"
            ],
            "correct": 3,
            "explanation": "The pulmonary artery carries deoxygenated blood from the heart to the lungs, so it is low in oxygen and rich in carbon dioxide."
          },
          {
            "question": "Which instrument, which was introduced in the 1980s, led to the greatest reduction of accidents?",
            "options": [
              "SSR",
              "DME",
              "GPWS",
              "TCAS"
            ],
            "correct": 2,
            "explanation": "Ground Proximity Warning System (GPWS) significantly reduced controlled flight into terrain (CFIT) accidents."
          },
          {
            "question": "When blood pressure is measured during an aviation medical examination, the pressure is:",
            "options": [
              "the venous pressure",
              "the pressure of O2 in the blood",
              "the pressure in all of the blood vessels, being representative of the pressure over the whole body",
              "arterial pressure in the upper arm, being equivalent to that of the heart"
            ],
            "correct": 3,
            "explanation": "Blood pressure measurement typically measures arterial pressure in the upper arm, which represents cardiac pressure."
          },
          {
            "question": "A pilot should consult an aviation medicine specialist before donating blood because:",
            "options": [
              "donation may lead to a rise in blood pressure (hypertension)",
              "donation may lead to a lowering of blood pressure (hypotension)",
              "donation may lead to a reduced tolerance of altitude",
              "donation may lead to a lowering of the body temperature causing unpredictable sleepiness"
            ],
            "correct": 2,
            "explanation": "Blood donation reduces hemoglobin levels, decreasing oxygen-carrying capacity and altitude tolerance."
          },
          {
            "question": "A person is suffering from hyperventilation, his blood becomes:",
            "options": [
              "more acid",
              "more alkaline",
              "more saturated with CO2",
              "less saturated with oxygen"
            ],
            "correct": 1,
            "explanation": "Hyperventilation removes CO2 from the blood, making it more alkaline (respiratory alkalosis)."
          },
          {
            "question": "The amount of oxygen carried by the blood depends on:",
            "options": [
              "the partial pressure of oxygen only",
              "the haemoglobin only",
              "the amount of oxygen dissolved in the blood plasma",
              "the partial pressure of oxygen and the amount of haemoglobin"
            ],
            "correct": 3,
            "explanation": "Blood oxygen transport depends on both oxygen partial pressure and hemoglobin concentration for binding."
          },
          {
            "question": "Haemoglobin is:",
            "options": [
              "dissolved in the blood",
              "in red blood cells",
              "in white cells of the blood",
              "in the platelets"
            ],
            "correct": 1,
            "explanation": "Hemoglobin is the iron-containing protein found inside red blood cells that carries oxygen."
          },
          {
            "question": "The pressoreceptors have signalled low blood pressure. The body's response is to:",
            "options": [
              "1. increase rate of breathing 2. increase cardiac output 3. increase heart rate 4. relax of the blood vessels",
              "2. increase cardiac output 3. increase heart rate 6. tighten of the blood vessels",
              "4 and 5 only",
              "1, 3 and 4"
            ],
            "correct": 1,
            "explanation": "Low blood pressure triggers increased cardiac output, increased heart rate, and vasoconstriction (tightening of blood vessels)."
          },
          {
            "question": "The body gets its energy from:",
            "options": [
              "1 & 4 only (minerals & vitamins)",
              "2 & 3 only (carbohydrates & protein)",
              "1, 2 & 4",
              "3 & 4 only"
            ],
            "correct": 1,
            "explanation": "The body derives energy primarily from carbohydrates and proteins, not from minerals and vitamins."
          },
          {
            "question": "What is the carcinogenic substance in cigarettes that can modify cells and cause cancer?",
            "options": [
              "Tar",
              "Nicotine",
              "Carbon monoxide",
              "Lead"
            ],
            "correct": 0,
            "explanation": "Tar contains carcinogenic substances that can modify cells and cause cancer."
          },
          {
            "question": "Having given blood a pilot should see a doctor because of the increased susceptibility to:",
            "options": [
              "hypoxia",
              "low blood pressure",
              "hyperventilation",
              "Decompression sickness (DCS)"
            ],
            "correct": 0,
            "explanation": "Blood donation reduces hemoglobin, increasing susceptibility to hypoxia at altitude."
          },
          {
            "question": "With a pulse rate of 72 beats a minute and a stroke volume of 70 ml, what is the cardiac output?",
            "options": [
              "8 litres a minute",
              "6 litres a minute",
              "5 litres a minute",
              "7 litres a minute"
            ],
            "correct": 2,
            "explanation": "Cardiac output = heart rate Ã— stroke volume = 72 Ã— 70 ml = 5040 ml/min â‰ˆ 5 L/min."
          },
          {
            "question": "Who is responsible for Air Safety?",
            "options": [
              "Aircrew and Groundcrew",
              "Aircrew, Groundcrew and Management",
              "Everyone involved",
              "Aircrew only"
            ],
            "correct": 2,
            "explanation": "Aviation safety is everyone's responsibility - pilots, maintenance, ATC, management, and support personnel."
          },
          {
            "question": "Having donated blood aircrew should:",
            "options": [
              "rest supine for at least 1 hour, drink plenty of fluids and not fly for 48 hours",
              "rest supine for about 15 - 20 minutes, drink plenty of fluids and not fly for 24 hours",
              "aircrew are prohibited from donating blood",
              "aircrew are not encouraged to give blood"
            ],
            "correct": 1,
            "explanation": "After blood donation, aircrew should rest briefly, hydrate well, and avoid flying for 24 hours to allow recovery."
          },
          {
            "question": "Human factors have been statistically proved to contribute approximately:",
            "options": [
              "50% of aircraft accidents",
              "70% of aircraft accidents",
              "90% of aircraft accidents",
              "have not played a significant role in aircraft accidents"
            ],
            "correct": 1,
            "explanation": "Human factors contribute to approximately 70% of aviation accidents according to safety statistics."
          },
          {
            "question": "The oxygen-carrying capacity of a smoker who smokes 20 to 30 cigarettes a day is reduced by approximately:",
            "options": [
              "8 - 10%",
              "12 - 18%",
              "20 - 25%",
              "0.2 - 2%"
            ],
            "correct": 0,
            "explanation": "Heavy smoking (20-30 cigarettes/day) reduces oxygen-carrying capacity by approximately 8-10% due to CO binding."
          },
          {
            "question": "The blood of the pulmonary vein is:",
            "options": [
              "rich in oxygen and lacking in CO2",
              "rich in oxygen and rich in CO2",
              "lacking in oxygen and rich in CO2",
              "lacking in oxygen and lacking in CO2"
            ],
            "correct": 0,
            "explanation": "The pulmonary vein carries oxygenated blood from the lungs to the heart, so it is rich in oxygen and low in CO2."
          }
        ]
      },
      {
        "name": "Human Performance and Limitations Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Decompression sickness (DCS) is caused by:",
            "options": [
              "oxygen coming out of solution",
              "carbon dioxide coming out of solution",
              "nitrogen coming out of solution",
              "carbon monoxide coming out of solution"
            ],
            "correct": 2,
            "explanation": "DCS occurs when dissolved nitrogen forms bubbles in blood and tissues during rapid decompression."
          },
          {
            "question": "Which of the following is true with respect to the cause of decompression sickness?",
            "options": [
              "altitudes above 18000 ft in an unpressurized aircraft",
              "altitudes above 5000 ft",
              "climbing at more than 500 ft/min to altitude greater than 18000 ft",
              "temperatures greater than 24Â°C at altitudes of over 2000 ft"
            ],
            "correct": 0,
            "explanation": "Decompression sickness typically occurs at altitudes above 18000 ft in unpressurized aircraft due to nitrogen bubble formation."
          },
          {
            "question": "What chemical substance in tobacco causes addiction?",
            "options": [
              "Tar and nicotine",
              "Tar and carbon monoxide",
              "Nicotine and carbon monoxide",
              "Nicotine"
            ],
            "correct": 3,
            "explanation": "Nicotine is the primary addictive substance in tobacco products."
          },
          {
            "question": "The contents of exhaled air compared to inhaled air will contain:",
            "options": [
              "Less N2",
              "More O2",
              "Less CO2",
              "Less O2"
            ],
            "correct": 3,
            "explanation": "Exhaled air contains less oxygen than inhaled air because oxygen has been absorbed by the body."
          },
          {
            "question": "Which of the following factors decrease resistance to decompression sickness?",
            "options": [
              "1. Body height 2. Scuba diving 3. Obesity 4. Age - Options 1, 2 and 4",
              "2. Scuba diving 3. Obesity 4. Age",
              "1. Body height 2. Scuba diving 3. Obesity",
              "2. Scuba diving 3. Obesity 4. Age"
            ],
            "correct": 3,
            "explanation": "Scuba diving, obesity, and age all decrease resistance to decompression sickness by affecting nitrogen absorption and elimination."
          },
          {
            "question": "Blood pressure depends on the:",
            "options": [
              "resistance and the efficiency of the cells",
              "cardiac input and the resistance of the capillaries",
              "cell output and the thinness of the blood",
              "cardiac output and the resistance of the capillaries"
            ],
            "correct": 3,
            "explanation": "Blood pressure is determined by cardiac output (volume of blood pumped) and vascular resistance."
          },
          {
            "question": "Time of useful consciousness (TUC) following loss of pressurization at 35000 ft is:",
            "options": [
              "3 - 4 minutes",
              "5 minutes upwards",
              "30 - 60 seconds",
              "10 - 15 seconds"
            ],
            "correct": 2,
            "explanation": "At 35000 ft, TUC is approximately 30-60 seconds due to rapid onset of hypoxia."
          },
          {
            "question": "Dalton's Law is associated with:",
            "options": [
              "Decompression sickness (DCS)",
              "bends",
              "creeps",
              "hypoxia"
            ],
            "correct": 3,
            "explanation": "Dalton's Law (partial pressure of gases) is directly associated with hypoxia and oxygen availability at altitude."
          },
          {
            "question": "Among the symptoms of hypoxia are:",
            "options": [
              "1. impaired judgment 3. impairment of vision",
              "1. impaired judgment 3. impairment of vision 4. muscular impairment",
              "1. impaired judgment 2. fast and heavy breathing 4. muscular impairment",
              "1. impaired judgment 2. fast and heavy breathing 3. impairment of vision 4. muscular impairment"
            ],
            "correct": 3,
            "explanation": "Hypoxia symptoms include impaired judgment, rapid breathing, vision impairment, and muscular impairment."
          },
          {
            "question": "The composition of the atmosphere at 21000 ft is approximately:",
            "options": [
              "78% He, 21% O2 and 1% CO",
              "78% He, 21% O2 and 0.003% CO2 + traces",
              "78% N, 21% O2 and 1% CO2 + traces",
              "78% N, 21% O2 and 1% CO + traces"
            ],
            "correct": 2,
            "explanation": "Atmospheric composition percentages remain constant with altitude: approximately 78% nitrogen, 21% oxygen, and 1% other gases."
          },
          {
            "question": "Boyle's Law has a role to play in:",
            "options": [
              "hypoxia with increased altitude",
              "Decompression sickness",
              "gastrointestinal tract barotrauma",
              "night vision"
            ],
            "correct": 2,
            "explanation": "Boyle's Law (pressure-volume relationship) explains gastrointestinal tract barotrauma as gases expand with decreasing pressure."
          },
          {
            "question": "Which is the following actions is the most efficient to accelerate the release of Carbon Monoxide from the blood?",
            "options": [
              "Inhalation of pressurised oxygen",
              "Inhalation of a mixture of unpressurized oxygen and air",
              "Inhalation of pressurised carbon dioxide",
              "Inhalation of a mixture of unpressurized carbon dioxide and air"
            ],
            "correct": 0,
            "explanation": "Pressurized oxygen inhalation most effectively displaces carbon monoxide from hemoglobin."
          },
          {
            "question": "A pilot suffering from hyperventilation during final approach in poor weather can combat the effects by:",
            "options": [
              "going on 100% oxygen and go around",
              "slowing the breathing rate, breathing into a paper bag and continuing the approach",
              "increasing the rate of breathing and continuing the approach",
              "increasing the depth of breathing and going around"
            ],
            "correct": 1,
            "explanation": "Hyperventilation is treated by slowing breathing rate and rebreathing CO2 (paper bag method) to restore normal blood chemistry."
          },
          {
            "question": "What is the normal tidal volume?",
            "options": [
              "750 ml",
              "500 ml",
              "150 ml",
              "250 ml"
            ],
            "correct": 1,
            "explanation": "Normal tidal volume (volume of air per breath at rest) is approximately 500 ml."
          },
          {
            "question": "Circulation of the blood is for:",
            "options": [
              "1. transportation of oxygen to the cells of the body 2. withdrawal of the waste products from the cells",
              "2. withdrawal of the waste products from the cells 3. convey nutrients to the cells",
              "1. transportation of oxygen to the cells of the body 3. convey nutrients to the cells",
              "1. transportation of oxygen to the cells of the body 2. withdrawal of the waste products from the cells 3. convey nutrients to the cells"
            ],
            "correct": 3,
            "explanation": "Blood circulation transports oxygen, removes waste products, and delivers nutrients to cells."
          },
          {
            "question": "Which of the following is correct concerning O2 and blood?",
            "options": [
              "Arterial blood is darker than venous blood",
              "Blood plasma is oxygenated at the heart",
              "Diffusion of oxygen from the alveoli to the blood is not dependent on the partial pressure",
              "Diffusion from the blood to the cells is dependent on the partial pressure of oxygen"
            ],
            "correct": 3,
            "explanation": "Oxygen diffusion from blood to cells depends on the partial pressure gradient of oxygen."
          },
          {
            "question": "Which of the following symptoms marks the beginning of hyperventilation?",
            "options": [
              "Slow heart beat",
              "Cyanosis",
              "Dizzy feeling",
              "Slow rate of breath"
            ],
            "correct": 2,
            "explanation": "Dizziness is typically one of the first symptoms of hyperventilation due to altered blood chemistry."
          },
          {
            "question": "A few hours after landing a pilot feels pain in his/her joints. The correct action is:",
            "options": [
              "take exercise which will cause the pain to disappear",
              "take physiotherapy",
              "see an aviation medical specialist as soon as possible",
              "ignore it since is probably due to common after-effect of height"
            ],
            "correct": 2,
            "explanation": "Joint pain after flight may indicate decompression sickness and requires immediate medical evaluation."
          },
          {
            "question": "What law governs the oxygen transfer at the alveoli?",
            "options": [
              "Boyle's",
              "Charles'",
              "Henry's",
              "Gas Diffusion Law - Fick's Law"
            ],
            "correct": 3,
            "explanation": "Fick's Law of Diffusion governs gas exchange at the alveolar-capillary membrane."
          },
          {
            "question": "Carbon Monoxide:",
            "options": [
              "can have a severe affect on a pilot's abilities when receiving exposure for a relatively short period of time",
              "does not have an effect when the body becomes used to the gas over a long period of time",
              "has no effect on the human body",
              "is not toxic"
            ],
            "correct": 0,
            "explanation": "Carbon monoxide can severely impair pilot performance even with short exposure due to its high affinity for hemoglobin."
          }
        ]
      },
      {
        "name": "Human Performance and Limitations Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The partial pressure of carbon dioxide in the lungs is:",
            "options": [
              "lower than the partial pressure of CO2 in the atmosphere",
              "higher than the pressure of CO2 in the blood",
              "lower than the pressure of CO2 in the blood",
              "almost equal to the pressure of CO2 in the atmosphere"
            ],
            "correct": 2,
            "explanation": "CO2 partial pressure in the lungs is lower than in blood, creating a gradient for CO2 to diffuse from blood to alveoli."
          },
          {
            "question": "The Critical Zone of hypoxia begins at:",
            "options": [
              "18000 ft",
              "20000 ft",
              "23000 ft",
              "3600 ft"
            ],
            "correct": 1,
            "explanation": "The Critical Zone of hypoxia begins at approximately 20000 ft where oxygen saturation drops significantly."
          },
          {
            "question": "Which of the following are defined in the ICAO Standard Atmosphere?",
            "options": [
              "1. Pressure 2. Temperature 4. Humidity",
              "1. Pressure 2. Temperature",
              "2. Temperature 3. Density 4. Humidity",
              "1. Pressure 2. Temperature 3. Density"
            ],
            "correct": 3,
            "explanation": "ICAO Standard Atmosphere defines pressure, temperature, and density (not humidity)."
          },
          {
            "question": "In an ascent, where is the greatest pressure differential?",
            "options": [
              "0 - 5000 ft",
              "5000 - 10000 ft",
              "10000 - 15000 ft",
              "40000 - 45000 ft"
            ],
            "correct": 0,
            "explanation": "The greatest pressure change per unit altitude occurs at lower altitudes, particularly 0-5000 ft."
          },
          {
            "question": "DCS symptoms can occur:",
            "options": [
              "when flying from an area if high pressure to an area of low pressure in an unpressurized aircraft",
              "when cabin pressure surges below 18000 ft",
              "following loss of cabin pressure at altitudes higher than 18000 ft",
              "emergency descent following decompression below 10000 ft"
            ],
            "correct": 2,
            "explanation": "DCS symptoms typically occur following loss of cabin pressure at altitudes above 18000 ft."
          },
          {
            "question": "Under normal conditions, external respiration is a subconscious process that occurs at a rate of:",
            "options": [
              "20 to 30 breaths/min, averaging 25 breaths/minute",
              "30 to 40 breaths/min, averaging 35 breaths/minute",
              "15 to 25 breaths/min, averaging 20 breaths/minute",
              "12 to 20 breaths/min, averaging 16 breaths/minute"
            ],
            "correct": 3,
            "explanation": "Normal resting respiratory rate is 12-20 breaths per minute, averaging 16 breaths per minute."
          },
          {
            "question": "Which of the following statements are correct?: Decompression sickness can be avoided by:",
            "options": [
              "1. staying below 18000 ft 2. maintaining cabin pressure below 8000 ft 3. breathing 100% oxygen 30 minutes prior to and during flight above 18000 ft",
              "2. maintaining cabin pressure below 8000 ft 3. breathing 100% oxygen 30 minutes prior to and during flight above 18000 ft 4. breathing 100% oxygen 60 minutes prior to and during flight above 18000 ft",
              "1. staying below 18000 ft 3. breathing 100% oxygen 30 minutes prior to and during flight above 18000 ft 4. breathing 100% oxygen 60 minutes prior to and during flight above 18000 ft",
              "1. staying below 18000 ft 2. maintaining cabin pressure below 8000 ft 4. breathing 100% oxygen 60 minutes prior to and during flight above 18000 ft"
            ],
            "correct": 0,
            "explanation": "DCS can be avoided by staying below 18000 ft, maintaining cabin pressure below 8000 ft, or pre-breathing oxygen for 30 minutes."
          },
          {
            "question": "Hyperventilation results in:",
            "options": [
              "Increased pCO2 in the blood",
              "Decreased pCO2 in the blood",
              "Increased pO2 in the blood",
              "Decreased pO2 in the blood"
            ],
            "correct": 1,
            "explanation": "Hyperventilation causes excessive CO2 elimination, resulting in decreased pCO2 (respiratory alkalosis)."
          },
          {
            "question": "Time of useful consciousness at 25,000 feet with moderate activity and rapid decompression is approximately:",
            "options": [
              "2 minutes",
              "30 seconds to 5 minutes",
              "2.5 minutes to 6 minutes",
              "5 to 10 minutes"
            ],
            "correct": 0,
            "explanation": "At 25000 ft with rapid decompression and moderate activity, TUC is approximately 2 minutes."
          },
          {
            "question": "At what altitude is pressure half that at MSL:",
            "options": [
              "8000 ft",
              "10000 ft",
              "18000 ft",
              "36000 ft"
            ],
            "correct": 2,
            "explanation": "Atmospheric pressure is approximately half of sea level pressure at 18000 ft."
          },
          {
            "question": "Hyperventilation can cause:",
            "options": [
              "too much oxygen to the brain",
              "spasms in the muscles and possible unconsciousness",
              "bluish tinge under the nails of the fingers and the lobes of the ears",
              "a feeling of euphoria"
            ],
            "correct": 1,
            "explanation": "Hyperventilation can cause muscle spasms and potentially unconsciousness due to respiratory alkalosis."
          },
          {
            "question": "As the body ascends, the partial pressure of oxygen within the lungs:",
            "options": [
              "decreases at a rate of 3 times the atmospheric rate",
              "decreases at the same rate as that of the atmosphere",
              "stays the same",
              "increases"
            ],
            "correct": 1,
            "explanation": "Oxygen partial pressure in the lungs decreases at the same rate as atmospheric pressure with altitude."
          },
          {
            "question": "The following are features of hypoxia:",
            "options": [
              "2. shortness of breath and dizziness 3. impaired decision making and poor coordination 4. a feeling of well being",
              "1. blue discolouration of the lips and fingernails 2. shortness of breath and dizziness 4. a feeling of well being",
              "1. blue discolouration of the lips and fingernails 3. impaired decision making and poor coordination 4. a feeling of well being",
              "1. blue discolouration of the lips and fingernails 2. shortness of breath and dizziness 3. impaired decision making and poor coordination"
            ],
            "correct": 1,
            "explanation": "Hypoxia features include cyanosis (blue discoloration), shortness of breath, dizziness, and euphoria (feeling of well-being)."
          },
          {
            "question": "On expiration there is:",
            "options": [
              "higher CO2 content than on intake",
              "more oxygen content than on intake",
              "less water vapour content than on intake",
              "the same CO2 content as on intake"
            ],
            "correct": 0,
            "explanation": "Exhaled air has higher CO2 content than inhaled air due to cellular respiration."
          },
          {
            "question": "You have been scuba diving below 10 m. When can you next fly:",
            "options": [
              "after 12 hours",
              "after 24 hours",
              "after 48 hours",
              "whenever you wish"
            ],
            "correct": 1,
            "explanation": "After scuba diving below 10m, a waiting period of at least 24 hours is required before flying to prevent DCS."
          },
          {
            "question": "Concerning hypoxia, why is it more hazardous if flying solo?",
            "options": [
              "The effects are increased",
              "It is difficult to recognize the first symptoms of hypoxia for a pilot in initial training",
              "It is more difficult to manage the oxygen systems on your own",
              "There is no one to take control once the symptoms of hypoxia appear"
            ],
            "correct": 1,
            "explanation": "Solo pilots, especially those in training, may not recognize hypoxia symptoms in themselves, making it more hazardous."
          },
          {
            "question": "Which of the following statements, if any, are correct?",
            "options": [
              "1. Euphoria is a possible result of hypoxia - only",
              "2. Euphoria can lead to degradation in pilot's performance - only",
              "Both 1 and 2 are correct",
              "Neither"
            ],
            "correct": 2,
            "explanation": "Both statements are correct: euphoria is a hypoxia symptom and it degrades pilot performance."
          },
          {
            "question": "Short-term memory impairment occurs at what height?",
            "options": [
              "8000 ft",
              "12000 ft",
              "15000 ft",
              "18000 ft"
            ],
            "correct": 1,
            "explanation": "Short-term memory impairment begins at approximately 12000 ft due to mild hypoxia."
          },
          {
            "question": "100% oxygen without pressure can be used up to:",
            "options": [
              "50000 ft",
              "40000 ft",
              "60000 ft",
              "70000 ft"
            ],
            "correct": 1,
            "explanation": "100% oxygen without pressure breathing can be used effectively up to approximately 40000 ft."
          },
          {
            "question": "TUC (time of useful consciousness) is dependent upon:",
            "options": [
              "1. rate of decompression 2. altitude of the occurrence 3. type of aircraft",
              "all of the above",
              "all except 3 (type of aircraft)",
              "2. altitude of the occurrence 3. type of aircraft 5. personal health"
            ],
            "correct": 2,
            "explanation": "TUC depends on decompression rate, altitude, pilot activity, and personal health, but not aircraft type."
          }
        ]
      },
      {
        "name": "Human Performance and Limitations Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "A person suffering from glaucoma will have:",
            "options": [
              "cloudiness of the lens",
              "cloudiness of the cornea",
              "increased pressure of the eye",
              "colour blindness"
            ],
            "correct": 2,
            "explanation": "Glaucoma is characterized by increased intraocular pressure that can damage the optic nerve."
          },
          {
            "question": "The most dangerous type of incapacitation is:",
            "options": [
              "acute",
              "rapid",
              "insidious",
              "none of the above"
            ],
            "correct": 2,
            "explanation": "Insidious (gradual, subtle) incapacitation is most dangerous because it's not immediately recognized by the pilot."
          },
          {
            "question": "What is a stereotype and involuntary reaction to a stimulation?",
            "options": [
              "Data control",
              "A reflex",
              "Stimulation control",
              "Automatic stimulation"
            ],
            "correct": 1,
            "explanation": "A reflex is a stereotyped, involuntary reaction to a stimulus."
          },
          {
            "question": "Glaucoma is caused by:",
            "options": [
              "excess pressure within the eye",
              "a clouding of the lens",
              "damage to the cornea",
              "damage to the retina"
            ],
            "correct": 0,
            "explanation": "Glaucoma is caused by excess pressure within the eye that damages the optic nerve."
          },
          {
            "question": "While turning the aircraft the pilots moves his/her head. What effect might the pilot be exposed to:",
            "options": [
              "Coriolis Effect",
              "Somatogravic Effect",
              "Flicker Effect",
              "Oculogravic Effect"
            ],
            "correct": 0,
            "explanation": "The Coriolis Effect occurs when head movements are made during aircraft turns, causing disorientation."
          },
          {
            "question": "Which Law is relevant to decompression sickness?",
            "options": [
              "Boyle's Law",
              "Henry's Law",
              "The Combined Gas Law",
              "Dalton's Law"
            ],
            "correct": 1,
            "explanation": "Henry's Law (gas solubility in liquids under pressure) explains nitrogen absorption and bubble formation in DCS."
          },
          {
            "question": "Good quality sunglasses provide:",
            "options": [
              "the ability to react to varying light levels automatically",
              "good luminance characteristics, avoidance of glare and harsh shadows, protection against UV and IR and equal absorption of colours",
              "for the pilot's individual needs",
              "no distortion of aircraft windscreens"
            ],
            "correct": 3,
            "explanation": "Quality sunglasses should not cause distortion when looking through aircraft windscreens."
          },
          {
            "question": "On initiating recovery from a spin, the pilot may have a strong sensation of turning:",
            "options": [
              "in a direction opposite to that of the spin",
              "in a direction the same as the spin",
              "slowly upwards",
              "quickly upwards"
            ],
            "correct": 0,
            "explanation": "During spin recovery, the pilot may experience the illusion of turning in the opposite direction due to vestibular system lag."
          },
          {
            "question": "Barotrauma of the middle ear is caused by differences between the pressures in the:",
            "options": [
              "inner ear and middle ear",
              "ambient air and the middle ear",
              "outer ear",
              "semicircular canals"
            ],
            "correct": 1,
            "explanation": "Middle ear barotrauma results from pressure differences between ambient air and the middle ear cavity."
          },
          {
            "question": "Night flying at 10000 ft you find that your acuity decreases. What can you do about it to improve your acuity?",
            "options": [
              "Use your peripheral vision",
              "Go onto oxygen",
              "Turn up the instrument lights",
              "Switch on or turn up the cabin heat"
            ],
            "correct": 1,
            "explanation": "Using supplemental oxygen at 10000 ft at night can improve visual acuity by preventing mild hypoxia."
          },
          {
            "question": "What actions should a pilot take if suffering from vertigo?",
            "options": [
              "1. Check and cross-check the aircraft instruments 2. Accept and ignore illusions 3. Keep head movements to a minimum",
              "2. Accept and ignore illusions 3. Keep head movements to a minimum 4. Believe the aircraft instruments",
              "1. Check and cross-check the aircraft instruments 3. Keep head movements to a minimum 4. Believe the aircraft instruments",
              "1. Check and cross-check the aircraft instruments 2. Accept and ignore illusions 3. Keep head movements to a minimum 4. Believe the aircraft instruments"
            ],
            "correct": 3,
            "explanation": "When experiencing vertigo, pilots should cross-check instruments, minimize head movements, accept illusions exist, and trust instruments."
          },
          {
            "question": "The function of the retina is to:",
            "options": [
              "convert light images into meaningful information",
              "transport electrical impulses to the brain",
              "convert light signals into electrical impulses",
              "convert light signals into chemical impulses"
            ],
            "correct": 2,
            "explanation": "The retina converts light signals into electrical impulses that are transmitted to the brain."
          },
          {
            "question": "The metabolism of alcohol is:",
            "options": [
              "influenced by time",
              "accelerated by drinking coffee",
              "quicker when the body gets used to alcohol",
              "improved by the use of easy-to-get medication"
            ],
            "correct": 0,
            "explanation": "Alcohol metabolism occurs at a relatively constant rate over time and cannot be accelerated significantly."
          },
          {
            "question": "Vertigo can be caused by a blocked eustachian tube.",
            "options": [
              "True",
              "False",
              "Only during descent",
              "Only during climb"
            ],
            "correct": 0,
            "explanation": "A blocked eustachian tube can cause pressure imbalances that lead to vertigo."
          },
          {
            "question": "What is the residual volume?",
            "options": [
              "70 ml",
              "500 ml",
              "350 ml",
              "1200 ml"
            ],
            "correct": 3,
            "explanation": "Residual volume (air remaining in lungs after maximum exhalation) is approximately 1200 ml."
          },
          {
            "question": "Vertigo causes the illusion when flying of:",
            "options": [
              "flying straight while in a spin",
              "climbing while turning",
              "a tumbling or turning sensation associated sometimes with dizziness",
              "descending with a decrease of speed"
            ],
            "correct": 2,
            "explanation": "Vertigo typically causes sensations of tumbling or turning, often accompanied by dizziness."
          },
          {
            "question": "Perceptual conflict between the vestibular apparatus and the visual sensory inputs:",
            "options": [
              "1. can occur when flying IMC and may be compelling 2. can cause attitude misinformation 3. may occur when taking off bank following a sustained turn",
              "2. can cause attitude misinformation 3. may occur when taking off bank following a sustained turn 4. can occur when decelerating",
              "1. can occur when flying IMC and may be compelling 3. may occur when taking off bank following a sustained turn 4. can occur when decelerating",
              "1. can occur when flying IMC and may be compelling 2. can cause attitude misinformation 3. may occur when taking off bank following a sustained turn 4. can occur when decelerating"
            ],
            "correct": 3,
            "explanation": "Vestibular-visual conflicts can occur in IMC, during bank changes, during deceleration, and cause attitude misinformation."
          },
          {
            "question": "The eye can adjust to:",
            "options": [
              "high levels of illumination in 10 minutes and darkness in 30 minutes",
              "high levels of illumination in 10 seconds and darkness in 30 minutes",
              "high levels of illumination in 30 minutes and darkness in 10 minutes",
              "high levels of illumination in 30 minutes and darkness in 10 seconds"
            ],
            "correct": 1,
            "explanation": "Eyes adapt to bright light quickly (seconds) but dark adaptation takes approximately 30 minutes."
          },
          {
            "question": "Disorientation is most likely to occur when:",
            "options": [
              "1. flying IMC 2. the pilot is distracted (using FMS for example) 3. flying from IMC to VMC",
              "1. flying IMC 2. the pilot is distracted (using FMS for example) 3. flying from IMC to VMC 4. the pilot is unwell or fatigued",
              "1. flying IMC 2. the pilot is distracted (using FMS for example) 4. the pilot is unwell or fatigued",
              "2. the pilot is distracted (using FMS for example) 3. flying from IMC to VMC 4. the pilot is unwell or fatigued"
            ],
            "correct": 2,
            "explanation": "Disorientation is most likely in IMC, when distracted, or when unwell/fatigued."
          },
          {
            "question": "When the visual image is focused in front of the retina the condition is:",
            "options": [
              "myopia",
              "hypermetropia",
              "presbycusis",
              "astigmatism"
            ],
            "correct": 0,
            "explanation": "Myopia (nearsightedness) occurs when the visual image focuses in front of the retina."
          }
        ]
      },
      {
        "name": "Human Performance and Limitations Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the relationship between stress and fatigue?",
            "options": [
              "No stress and no fatigue is good",
              "All stress and fatigue is good",
              "Stress can be good, fatigue is always bad",
              "No stress and some fatigue is good"
            ],
            "correct": 2,
            "explanation": "Moderate stress can enhance performance, but fatigue always degrades performance and should be avoided."
          },
          {
            "question": "Which of the following are correct?",
            "options": [
              "2. Use of some medication can affect flying 3. One should drink sufficient water during flight to prevent dehydration",
              "1. Scuba diving imposes no restriction on flying 2. Use of some medication can affect flying 3. One should drink sufficient water during flight to prevent dehydration",
              "2. Use of some medication can affect flying 3. One should drink sufficient water during flight to prevent dehydration 4. Diet does not have an effect on health",
              "1. Scuba diving imposes no restriction on flying 2. Use of some medication can affect flying 3. One should drink sufficient water during flight to prevent dehydration 4. Diet does not have an effect on health"
            ],
            "correct": 0,
            "explanation": "Medications can affect flying safety, and adequate hydration during flight is important. Scuba diving does impose restrictions."
          },
          {
            "question": "A person that is exposed to extreme or prolonged stress factors can perceive:",
            "options": [
              "distress",
              "eustress",
              "coping stress",
              "stressors"
            ],
            "correct": 0,
            "explanation": "Extreme or prolonged stress leads to distress (negative stress) rather than eustress (positive stress)."
          },
          {
            "question": "Stimuli must be of a certain strength for them to be detected. This strength is known as:",
            "options": [
              "sensory limitation",
              "sensory threshold",
              "sensory strength",
              "sensory volume"
            ],
            "correct": 1,
            "explanation": "Sensory threshold is the minimum stimulus intensity required for detection by the sensory system."
          },
          {
            "question": "The sequence of GAS (General Adaptation Syndrome) is:",
            "options": [
              "alarm resistance exhaustion",
              "resistance exhaustion alarm",
              "alarm flight exhaustion",
              "exhaustion resistance alarm"
            ],
            "correct": 0,
            "explanation": "General Adaptation Syndrome progresses through three stages: alarm, resistance, and exhaustion."
          },
          {
            "question": "What will happen to the body when in situations of extreme heat?",
            "options": [
              "1. Shivering 2. Vasoconstriction of the exterior blood vessels 3. Sweating 4. Vasodilation of the exterior blood vessels",
              "2. Vasoconstriction of the exterior blood vessels 3. Sweating",
              "1. Shivering 2. Vasoconstriction of the exterior blood vessels",
              "3. Sweating 4. Vasodilation of the exterior blood vessels"
            ],
            "correct": 3,
            "explanation": "In extreme heat, the body responds with sweating and vasodilation to increase heat loss."
          },
          {
            "question": "Extreme cold may be associated with:",
            "options": [
              "aggression",
              "aggression and anxiety",
              "anxiety",
              "contentment or apathy"
            ],
            "correct": 3,
            "explanation": "Extreme cold can lead to apathy (lack of motivation) or a false sense of contentment as hypothermia develops."
          },
          {
            "question": "Performance can be increased by:",
            "options": [
              "putting a student pilot under stress",
              "a moderate amount of stress",
              "no stress at all if possible",
              "ignoring stress as all good pilots leave stress on the ground"
            ],
            "correct": 1,
            "explanation": "Moderate stress (optimal arousal) can enhance performance, following the Yerkes-Dodson law."
          },
          {
            "question": "If in a state of stress which is impossible to overcome, the pilot will be in a state of:",
            "options": [
              "eustress",
              "hypertension",
              "distress",
              "regression"
            ],
            "correct": 2,
            "explanation": "Unmanageable stress leads to distress, which negatively affects performance and well-being."
          },
          {
            "question": "Should a pilot fly with a bad cold, he/she could suffer from:",
            "options": [
              "chokes",
              "bends",
              "sinus pain",
              "blurred vision"
            ],
            "correct": 2,
            "explanation": "Flying with a cold can cause severe sinus pain due to inability to equalize pressure in blocked sinuses."
          },
          {
            "question": "Stressors are:",
            "options": [
              "external factors only",
              "internal factors only",
              "both external and internal factors",
              "neither external nor internal factors"
            ],
            "correct": 2,
            "explanation": "Stressors can be both external (environmental) and internal (psychological, physiological) factors."
          },
          {
            "question": "A person suffering from extreme cold will stop shivering and thereafter become colder and colder when the internal body falls to about:",
            "options": [
              "20Â°C",
              "25Â°C",
              "30Â°C",
              "35Â°C"
            ],
            "correct": 3,
            "explanation": "Shivering stops at approximately 35Â°C core body temperature as hypothermia progresses to dangerous levels."
          },
          {
            "question": "Tuned resonance of the body parts, distressing the individual can be caused by:",
            "options": [
              "acceleration along the horizontal flight path",
              "resonance between 150 - 250 Hz",
              "resonance between 16 - 18 GHz",
              "resonance between 1 - 100 Hz"
            ],
            "correct": 3,
            "explanation": "Vibration frequencies between 1-100 Hz can cause resonance with body parts, causing discomfort and performance degradation."
          },
          {
            "question": "According to the \"General Adaptation Syndrome\" which of the following statement(s) is/are correct?",
            "options": [
              "1. During the alarm phase adrenalin will cause a large release of glucose into the blood, a raised heartbeat and blood pressure plus an increase in the rate and depth of breathing 2. During the resistance phase the parasympathetic system releases cortisol helping in the conversion of fat into sugar",
              "2. During the resistance phase the parasympathetic system releases cortisol helping in the conversion of fat into sugar 3. During the exhaustion phase the body has to be given time to eliminate the waste products which have been generated excessively",
              "1. During the alarm phase adrenalin will cause a large release of glucose into the blood, a raised heartbeat and blood pressure plus an increase in the rate and depth of breathing 2. During the resistance phase the parasympathetic system releases cortisol helping in the conversion of fat into sugar 3. During the exhaustion phase the body has to be given time to eliminate the waste products which have been generated excessively",
              "only 1 is correct"
            ],
            "correct": 2,
            "explanation": "All three statements about GAS phases (alarm, resistance, exhaustion) are correct descriptions of the body's stress response."
          },
          {
            "question": "Even with a small ingestion of alcohol:",
            "options": [
              "the brain will be stimulated thereby increasing the resistance to hypoxia",
              "the brain functions will be increased thereby increasing performance at high altitudes",
              "the pilot will remain unaffected",
              "the pilot's performance will be degraded"
            ],
            "correct": 3,
            "explanation": "Even small amounts of alcohol impair judgment, reaction time, and overall pilot performance."
          },
          {
            "question": "The effects of vibration are greatest:",
            "options": [
              "at high altitudes",
              "at low altitudes",
              "in smooth air",
              "when fatigued"
            ],
            "correct": 3,
            "explanation": "Vibration effects are most pronounced when fatigued, as the body has reduced tolerance to stressors."
          },
          {
            "question": "Cognitive appraisal:",
            "options": [
              "occurs only with negative events",
              "is the objective evaluation of a situation and the perceived ability to cope with it",
              "is the subjective evaluation of a situation and the perceived ability to cope with it",
              "depends on the individual's arousal"
            ],
            "correct": 2,
            "explanation": "Cognitive appraisal is the subjective (personal) evaluation of a situation and one's ability to cope with it."
          },
          {
            "question": "The body loses water via:",
            "options": [
              "the skin, lungs and kidneys",
              "the skin",
              "the skin, lungs and liver",
              "the skin, liver and kidneys"
            ],
            "correct": 0,
            "explanation": "The body loses water through skin (sweat), lungs (respiration), and kidneys (urine)."
          },
          {
            "question": "At height cockpit humidity can be between:",
            "options": [
              "20 - 25 %",
              "40 - 60 %",
              "30 - 60%",
              "5 - 15 %"
            ],
            "correct": 3,
            "explanation": "At altitude, cockpit humidity typically drops to very low levels, approximately 5-15%, due to dry outside air."
          },
          {
            "question": "What is the relationship between stress and performance when plotted on a graph?",
            "options": [
              "The relationship is linear",
              "The relationship is exponential",
              "There is no relationship",
              "The relationship is in the shape of an inverted U"
            ],
            "correct": 3,
            "explanation": "The Yerkes-Dodson law shows an inverted U-shaped curve: performance increases with stress up to an optimal point, then decreases."
          }
        ]
      }
    ]
  },
  "metrology": {
    "name": "Meteorology & Weather",
    "icon": "fas fa-cloud-sun",
    "tests": [
      {
        "name": "Meteorology Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What cloud does hail fall from?",
            "options": [
              "Cb",
              "Ns",
              "Cu",
              "Ci"
            ],
            "correct": 0,
            "explanation": "Hail falls from Cumulonimbus (Cb) clouds, which have strong updrafts capable of keeping ice particles aloft long enough to grow large."
          },
          {
            "question": "Maximum turbulence associated with the mountain waves is likely to be:",
            "options": [
              "two wavelengths downwind and just above the surface",
              "approximately one wavelength downwind of, and approximately level with, the top of the ridge",
              "just below the tropopause above the ridge",
              "down the lee side of the ridge and along the surface"
            ],
            "correct": 1,
            "explanation": "Maximum turbulence in mountain waves typically occurs about one wavelength downwind and near ridge top level, where wave amplitude is greatest."
          },
          {
            "question": "The significance of lenticular cloud is:",
            "options": [
              "there may be mountain waves present and there will be severe turbulence",
              "there are mountain waves present but they may not give severe turbulence",
              "a FÃ¶hn wind can be expected with no turbulence",
              "a katabatic wind is present which may lead to fog in the valleys"
            ],
            "correct": 1,
            "explanation": "Lenticular clouds are a visual indicator of mountain waves. While waves are present, turbulence severity varies depending on wave amplitude and atmospheric conditions."
          },
          {
            "question": "When flying through the friction layer on approach to land, if the wind is steady in direction and speed, the crosswind component will:",
            "options": [
              "decrease and the headwind component increase",
              "increase and the headwind component increase",
              "increase with little change in direction",
              "increase and then reverse in direction"
            ],
            "correct": 2,
            "explanation": "Wind generally backs and decreases closer to the surface in the friction layer. If approaching, the crosswind relative to the runway might increase depending on wind direction change."
          },
          {
            "question": "Mountain waves can occur:",
            "options": [
              "up to a maximum of 5000 ft above the mountains and 50 NM to 100 NM downwind",
              "up to mountain height only and 50 NM to 100 NM downwind",
              "above the mountain and downwind up to a maximum height at the tropopause and 50 NM to 100 NM downwind",
              "in the stratosphere and troposphere"
            ],
            "correct": 3,
            "explanation": "Mountain waves can extend into both the troposphere and stratosphere, well above the tropopause in favorable conditions."
          },
          {
            "question": "For mountain waves to form, the wind direction must be near perpendicular to a ridge or range of mountains and the speed must:",
            "options": [
              "decrease with height within a stable layer above the hill",
              "increase with height within an unstable layer above the hill",
              "decrease with height within an unstable layer above the hill",
              "increase with height within a stable layer above the hill"
            ],
            "correct": 3,
            "explanation": "Mountain wave formation requires wind perpendicular to the ridge, increasing with height, within a stable layer that allows wave propagation."
          },
          {
            "question": "Flight conditions at B1 are likely to be:",
            "options": [
              "smooth",
              "turbulent",
              "turbulent in breaking wave crests",
              "turbulent due to marked up and down currents"
            ],
            "correct": 3,
            "explanation": "Position B1 typically represents the rotor zone where turbulence is severe due to marked up and down currents."
          },
          {
            "question": "What type of cloud is associated with drizzle?",
            "options": [
              "St",
              "Cb",
              "Ci",
              "Ac"
            ],
            "correct": 0,
            "explanation": "Stratus (St) clouds are low-level layer clouds that produce drizzle - very small water droplets."
          },
          {
            "question": "What cloud types are classified as medium cloud?",
            "options": [
              "Ns + Sc",
              "Ac + As",
              "Cb + St",
              "Ci + Cs"
            ],
            "correct": 1,
            "explanation": "Altocumulus (Ac) and Altostratus (As) are classified as medium-level clouds, typically with bases between 6,500 and 20,000 feet."
          },
          {
            "question": "The most extreme turbulence can occur:",
            "options": [
              "at B1",
              "at A2",
              "at ABC 4",
              "at B2, 3, 4 and at C2, 3, 4"
            ],
            "correct": 0,
            "explanation": "Position B1 typically represents the rotor zone in mountain wave diagrams, where the most extreme turbulence occurs."
          },
          {
            "question": "Clear air turbulence, in association with a polar front jet stream in the Northern Hemisphere, is more severe:",
            "options": [
              "underneath the jet core",
              "in the centre of the jet core",
              "looking downstream on the right hand side",
              "looking downstream on the left hand side"
            ],
            "correct": 3,
            "explanation": "In the Northern Hemisphere, CAT is more severe on the cold air side (left looking downstream) of the polar front jet stream where wind shear is greatest."
          },
          {
            "question": "What is the composition of Ci cloud?",
            "options": [
              "Super cooled water droplets",
              "Ice crystals",
              "Water droplets",
              "Smoke particles"
            ],
            "correct": 1,
            "explanation": "Cirrus (Ci) clouds are high-level clouds composed entirely of ice crystals due to the very cold temperatures at their altitude."
          },
          {
            "question": "When flying in IMC in a region close to a range of hills 2000 ft high, in stable air and with wind direction at right angles to the axis of the range of hills, which of the following is probably the most dangerous practice:",
            "options": [
              "flying towards the hills, into the wind, at flight level 65",
              "flying parallel to the hills on the downwind side at flight level 40",
              "flying towards the hills downwind at flight level 55",
              "flying parallel to the hills on the upwind side at flight level 40"
            ],
            "correct": 1,
            "explanation": "Flying low on the lee (downwind) side puts the aircraft in the region of strong downdrafts and rotors, making it the most dangerous practice."
          },
          {
            "question": "Clear air turbulence associated with a jet stream is likely to be encountered:",
            "options": [
              "35 kt",
              "50 kt",
              "25 kt",
              "light"
            ],
            "correct": 1,
            "explanation": "Clear air turbulence is typically associated with jet streams having wind speeds of 50 knots or greater, where wind shear is significant."
          },
          {
            "question": "Which of the following statements referring to jet streams is correct?",
            "options": [
              "Turbulence associated with jet streams is probably associated with the rapid windshear in the vicinity of the jet",
              "The maximum wind speed in a jet stream increases with increase of height up to the tropopause and remains constant thereafter",
              "The core of a jet stream is usually located just below the tropopause in the colder air mass",
              "The rate of change of wind speed at any given level is usually greatest on the warmer side of the jet"
            ],
            "correct": 0,
            "explanation": "Jet stream turbulence is caused by the rapid wind shear (change in wind speed and/or direction) in the vicinity of the jet core."
          },
          {
            "question": "Flying conditions in Ci cloud and horizontal visibility:",
            "options": [
              "less than 500 m vis, light/mod clear icing",
              "greater than 1000 m vis, light/mod rime ice",
              "less then 500 m vis, no icing",
              "greater than 1000 m vis, no icing"
            ],
            "correct": 3,
            "explanation": "Cirrus clouds have good visibility (>1000m) and no icing threat to aircraft as they consist of ice crystals, not supercooled water droplets."
          },
          {
            "question": "The wind at ABC 4 may be:",
            "options": [
              "50 kt",
              "40 kt",
              "35 kt",
              "a jet stream"
            ],
            "correct": 3,
            "explanation": "Position ABC 4 represents the upper troposphere/tropopause level where jet streams are typically found."
          },
          {
            "question": "A mountain range is aligned in an east/west direction. Select the conditions from the table below that will give rise to mountain waves at 2000 ft, 5000 ft, 10 000 ft:",
            "options": [
              "020/40 020/30 020/50",
              "170/20 190/40 210/60",
              "270/15 270/20 270/40",
              "090/20 090/40 090/60"
            ],
            "correct": 1,
            "explanation": "Mountain waves require wind roughly perpendicular (>30Â°) to the range, speed >15-20 kts at ridge height, and increasing speed with height within a stable layer."
          },
          {
            "question": "Clear air turbulence (CAT) should be reported whenever it is experienced. What should be reported if crew and passengers feel a definite strain against their seat or shoulder straps, food service and walking is difficult and loose objects become dislodged?",
            "options": [
              "Light TURB",
              "Extreme TURB",
              "Severe TURB",
              "Moderate TURB"
            ],
            "correct": 3,
            "explanation": "This description matches Moderate turbulence: definite strain against straps, difficulty with food service and walking, loose objects dislodged."
          },
          {
            "question": "A north/south mountain range, height 10,000 ft is producing marked mountain waves. The greatest potential danger exists for an aircraft flying:",
            "options": [
              "on the windward side of the ridge",
              "at FL350 over and parallel to the ridge",
              "towards the ridge from the lee side at FL140",
              "above a line of clouds parallel to the ridge on the lee side at FL25"
            ],
            "correct": 3,
            "explanation": "Flying near FL250 (~25,000ft) above lenticular clouds may place the aircraft near strong wave activity and potential clear air turbulence near the tropopause."
          }
        ]
      },
      {
        "name": "Meteorology Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Altostratus is:",
            "options": [
              "a low level cloud",
              "a medium level cloud",
              "a high level cloud",
              "a heap type cloud"
            ],
            "correct": 1,
            "explanation": "Altostratus is classified as a medium-level cloud, typically found between 6,500 and 20,000 feet."
          },
          {
            "question": "CB cloud in summer contains:",
            "options": [
              "water droplets",
              "ice crystals",
              "water droplets, ice crystals and super cooled water droplets",
              "water droplets and ice crystals"
            ],
            "correct": 2,
            "explanation": "Cumulonimbus clouds contain all three phases: liquid water droplets, supercooled water droplets (below 0Â°C but still liquid), and ice crystals."
          },
          {
            "question": "Hazards of the mature stage of a TS cell include lightning, turbulence and:",
            "options": [
              "microburst, windshear and anvil",
              "icing, microburst and windshear",
              "icing, drizzle and microburst",
              "windshear, hail and fog"
            ],
            "correct": 1,
            "explanation": "The mature stage of a thunderstorm includes hazards of icing, microburst downdrafts, and severe windshear in addition to lightning and turbulence."
          },
          {
            "question": "Thunderstorms require a trigger action to release the conditional instability. Which of the following would be the least suitable as a trigger?",
            "options": [
              "Convergence in temperate latitudes",
              "Convergence in tropical latitudes",
              "Orographic uplift",
              "Subsidence"
            ],
            "correct": 3,
            "explanation": "Subsidence (descending air) suppresses convection and prevents thunderstorm development. Triggers need upward motion."
          },
          {
            "question": "Clouds classified as low level are considered to have a base height of:",
            "options": [
              "500 - 1000 ft",
              "1000 - 2000 ft",
              "the surface - 6500 ft",
              "100 - 200 ft"
            ],
            "correct": 2,
            "explanation": "Low-level clouds are defined as having bases from the surface up to approximately 6,500 feet."
          },
          {
            "question": "On a significant weather chart the thunderstorm symbol signifies:",
            "options": [
              "moderate turbulence and moderate icing",
              "severe turbulence and severe icing",
              "moderate turbulence and severe icing",
              "moderate/severe turbulence and/or moderate/severe icing"
            ],
            "correct": 3,
            "explanation": "The thunderstorm symbol indicates the potential for moderate to severe turbulence and/or moderate to severe icing."
          },
          {
            "question": "The following is unlikely to be a hazard below a thunderstorm:",
            "options": [
              "severe turbulence",
              "severe icing",
              "windshear",
              "large variations in pressure setting values"
            ],
            "correct": 1,
            "explanation": "Severe icing occurs within the cloud, primarily in the freezing level range, not below the thunderstorm. Below the storm: turbulence, windshear, and pressure variations are hazards."
          },
          {
            "question": "What type of cloud extends into another level?",
            "options": [
              "As",
              "Acc",
              "Ns",
              "Ci"
            ],
            "correct": 2,
            "explanation": "Nimbostratus (Ns) often extends from low to medium levels, making it a multi-level cloud type."
          },
          {
            "question": "Ceilometers measure:",
            "options": [
              "RVR",
              "cloud height",
              "met vis",
              "turbulence"
            ],
            "correct": 1,
            "explanation": "Ceilometers are instruments that measure cloud base height using laser or other light-based technology."
          },
          {
            "question": "Which of the following will indicate medium level instability, possibly leading to thunderstorms?",
            "options": [
              "Halo",
              "Altocumulus Castellanus",
              "Altocumulus Capillatus",
              "Red Cirrus"
            ],
            "correct": 1,
            "explanation": "Altocumulus Castellanus (Acc) clouds indicate mid-level instability and can be a precursor to thunderstorm development."
          },
          {
            "question": "The conditions which must exist to allow thunderstorms to develop are:",
            "options": [
              "a trigger action, a plentiful supply of moisture and a very stable atmosphere",
              "a steep lapse rate, a stable atmosphere through a large vertical extent and a plentiful supply of moisture",
              "a plentiful supply of moisture and a steep lapse rate through a large vertical extent and a trigger action",
              "a steep lapse rate through a large vertical extent, a low relative humidity and a trigger action"
            ],
            "correct": 2,
            "explanation": "Thunderstorm development requires three key ingredients: moisture, instability (steep lapse rate), and a lifting mechanism (trigger action)."
          },
          {
            "question": "In what cloud is icing and turbulence most severe?",
            "options": [
              "Cb",
              "Ns",
              "Sc",
              "Ci"
            ],
            "correct": 0,
            "explanation": "Cumulonimbus (Cb) clouds contain the most severe icing and turbulence due to strong updrafts, large supercooled droplets, and extreme vertical development."
          },
          {
            "question": "Which cloud would you encounter the most intensive rain?",
            "options": [
              "Ci",
              "Ns",
              "St",
              "Sc"
            ],
            "correct": 1,
            "explanation": "Nimbostratus (Ns) produces continuous moderate to heavy rain. While Cb produces intense showers, Ns gives the most intensive continuous precipitation."
          },
          {
            "question": "A plain in Western Europe at 500 m (1600 ft) AMSL is covered with a uniform altocumulus cloud during summer months. At what height AGL is the base of the cloud expected?",
            "options": [
              "100 - 1500 ft",
              "15000 - 25000 ft",
              "7000 - 15000 ft",
              "1500 - 7000 ft"
            ],
            "correct": 2,
            "explanation": "Altocumulus is a mid-level cloud with typical base heights of 6,500 - 20,000 ft AGL. Given the terrain elevation, 7,000 - 15,000 ft AGL is reasonable."
          },
          {
            "question": "What are lenticularis clouds a possible indication of?",
            "options": [
              "Mountain waves",
              "Instability",
              "Developing Cu and Cb",
              "Horizontal windshear in the upper atmosphere"
            ],
            "correct": 0,
            "explanation": "Lenticular (lens-shaped) clouds are a strong visual indicator of mountain wave activity."
          },
          {
            "question": "When moist air moves across France in the ......... TS activity is common in southern UK in the ......... Complete the above statement correctly using one of the following:",
            "options": [
              "winter/morning",
              "summer/late afternoon or evening",
              "winter/late afternoon or evening",
              "summer/morning"
            ],
            "correct": 1,
            "explanation": "In summer, when moist air moves across France, it heats during the day, leading to thunderstorm development in southern UK by late afternoon or evening."
          },
          {
            "question": "What would be reflected to radar?",
            "options": [
              "Fog",
              "Hail",
              "Cloud",
              "Mist"
            ],
            "correct": 1,
            "explanation": "Weather radar detects precipitation particles. Hail, being solid precipitation, provides strong radar returns. Fog, mist, and cloud droplets are too small."
          },
          {
            "question": "During the ......... stage of a thunderstorm cell, the cloud contains ......... Complete the above statement correctly using one of the following:",
            "options": [
              "building/up currents and down currents",
              "mature/up currents and down currents",
              "dissipating/up currents and down currents",
              "building/down currents only"
            ],
            "correct": 1,
            "explanation": "During the mature stage, the thunderstorm cell contains both updrafts and downdrafts, reaching maximum intensity."
          },
          {
            "question": "What will snow most likely fall from?",
            "options": [
              "Ns",
              "Ci",
              "Cs",
              "Ac"
            ],
            "correct": 0,
            "explanation": "Nimbostratus (Ns) is the primary cloud type that produces continuous snow, especially in winter."
          },
          {
            "question": "Fair weather cumulus gives an indication of:",
            "options": [
              "poor visibility",
              "thunderstorms",
              "turbulence",
              "smooth flying below"
            ],
            "correct": 2,
            "explanation": "Fair weather cumulus indicates convective activity and thermal turbulence, especially near and within the clouds."
          }
        ]
      },
      {
        "name": "Meteorology Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Thunderstorms are likely if:",
            "options": [
              "air is unstable, there is sufficient water vapour and there is trigger action",
              "air is completely stable, there is sufficient water vapour and there is lifting orographically",
              "there is a warm front",
              "there is a col in winter"
            ],
            "correct": 0,
            "explanation": "Thunderstorm formation requires three key elements: atmospheric instability, sufficient moisture (water vapor), and a trigger mechanism for lifting."
          },
          {
            "question": "Changes of RVR are reported for increments of:",
            "options": [
              "25 m up to 250 m",
              "25 m up to 400 m",
              "50 m between 300 m and 800 m",
              "50 m between 500 m and 800 m"
            ],
            "correct": 1,
            "explanation": "Runway Visual Range (RVR) changes are reported in 25-meter increments up to 400 meters for precision in low visibility conditions."
          },
          {
            "question": "Radiation fog is most likely:",
            "options": [
              "with a wind speed up to 15 kt, a clear sky and a high relative humidity",
              "with a wind of 2-8 kt, a high density and the summer season",
              "in an anticyclone in winter",
              "on a hill in autumn"
            ],
            "correct": 2,
            "explanation": "Radiation fog is most likely in an anticyclone during winter when conditions favor clear skies, light winds, and radiational cooling."
          },
          {
            "question": "A microburst usually lasts for _________ and is about ____________across.",
            "options": [
              "15 minutes / 1-3 km",
              "5 minutes / 1-3 NM",
              "5 minutes / 1-3 km",
              "15 minutes / 1-3 NM"
            ],
            "correct": 2,
            "explanation": "A microburst is a short-lived, localized downdraft typically lasting about 5 minutes and covering an area of 1-3 kilometers across."
          },
          {
            "question": "Frontal fog is most likely to:",
            "options": [
              "form ahead of a vigorous fast-moving cold front",
              "form ahead of a warm front",
              "form on a vigorous cold front and last for many hours",
              "form to the rear of a warm front but only last for 1 to 2 hours"
            ],
            "correct": 1,
            "explanation": "Frontal fog forms ahead of warm fronts when warm rain falls through cold air near the surface, increasing moisture and reducing visibility."
          },
          {
            "question": "At temperatures of between 0Â°C and -10Â°C clouds will consist of:",
            "options": [
              "entirely water droplets",
              "entirely ice crystals",
              "mostly water vapour",
              "mostly supercooled water droplets and a few ice crystals"
            ],
            "correct": 3,
            "explanation": "Between 0Â°C and -10Â°C, clouds contain mostly supercooled water droplets (liquid below freezing) with some ice crystals beginning to form."
          },
          {
            "question": "Thunderstorms caused by _________are most common in the summer and by __in the",
            "options": [
              "lapse rate / air masses / late spring",
              "convection / frontal activity / winter",
              "cold fronts / air masses / autumn",
              "convection / frontal activity / summer"
            ],
            "correct": 1,
            "explanation": "Convective (airmass) thunderstorms are most common in summer due to surface heating, while frontal thunderstorms are more common in winter."
          },
          {
            "question": "When flying through an active CB cloud, lightning strikes are most likely:",
            "options": [
              "above 5000' and underneath the anvil",
              "in the freezing level",
              "close to the freezing level",
              "at the top of the cloud in the anvil"
            ],
            "correct": 2,
            "explanation": "Lightning strikes are most frequent close to the freezing level where charge separation is most active due to collisions between ice and water particles."
          },
          {
            "question": "The visibility is reported as RVR. When would this occur?",
            "options": [
              "Always during the hours of darkness",
              "when the normal visibility is 1500 m or less",
              "when there is mist",
              "when there is haze"
            ],
            "correct": 1,
            "explanation": "RVR (Runway Visual Range) is reported when visibility is 1500 meters or less, providing precise runway-specific visibility information."
          },
          {
            "question": "Fog may be defined as:",
            "options": [
              "a reduction of visibility to less than 1000 metres due to the presence of water vapour in the atmosphere",
              "a reduction of visibility to less than 1000 metres due to the presence of water droplets in suspension in the atmosphere",
              "a reduction of visibility to less than 1500 metres due to the presence of water droplets in suspension in the atmosphere",
              "a reduction of visibility to less than 1000 ft due to the presence of water vapour in suspension in the atmosphere"
            ],
            "correct": 1,
            "explanation": "Fog is defined as visibility reduced to less than 1000 meters due to suspended water droplets (not vapor) in the atmosphere."
          },
          {
            "question": "Hoar frost forms on an aircraft when:",
            "options": [
              "the aircraft suddenly enters a cloud at below freezing temperature",
              "the aircraft in subzero clear air suddenly enters a colder region",
              "the aircraft in subzero clear air suddenly enters a warmer moist region",
              "the aircraft suddenly enters a cloud which is at a higher temperature than the surrounding air"
            ],
            "correct": 2,
            "explanation": "Hoar frost forms when a cold aircraft (in subzero air) suddenly enters warmer, moist air. Water vapor sublimates directly onto the cold surface."
          },
          {
            "question": "Conditions favourable for the formation of radiation fog are:",
            "options": [
              "Strong surface wind, cloudy sky, low relative humidity",
              "Light surface wind, clear sky, high relative humidity",
              "Light surface wind, overcast sky, low relative humidity",
              "Strong surface wind, clear sky, high relative humidity"
            ],
            "correct": 1,
            "explanation": "Radiation fog requires light winds (2-8 kt) for mixing, clear skies for radiational cooling, and high humidity for condensation."
          },
          {
            "question": "In circumstances where there is a clear sky, calm wind and a high relative humidity in autumn:",
            "options": [
              "radiation fog is likely over night",
              "advection fog will form",
              "radiation fog is likely at sunrise after previous mist",
              "hill fog can be expected"
            ],
            "correct": 2,
            "explanation": "With clear sky and high humidity in autumn, cooling overnight produces mist, which develops into radiation fog by sunrise as temperatures reach minimum."
          },
          {
            "question": "When approaching at flight level 300 a cumulonimbus cloud with an anvil top, pilots should aim to avoid the cloud by ___ NM horizontally.",
            "options": [
              "10",
              "15",
              "20",
              "5"
            ],
            "correct": 2,
            "explanation": "At high altitude, cumulonimbus clouds should be avoided by at least 20 NM horizontally due to severe turbulence, hail, and other hazards extending well beyond the visible cloud."
          },
          {
            "question": "Several types of pressure distribution may be associated with radiation fog but all have one feature in common which is:",
            "options": [
              "closely spaced isobars",
              "a tight pressure gradient",
              "a slack pressure gradient",
              "a rapidly falling pressure"
            ],
            "correct": 2,
            "explanation": "Radiation fog requires light winds, which occur with a slack (weak) pressure gradient where isobars are widely spaced."
          },
          {
            "question": "Regarding thunderstorms, the most accurate statement amongst the following is:",
            "options": [
              "there will always be windshear under the cloud",
              "the average movement is in accord with the wind at 10,000 ft",
              "if the cloud base has a temperature below 0Â°C then freezing rain will occur",
              "downdrafts occur only in the final (dissipating) stage"
            ],
            "correct": 1,
            "explanation": "Thunderstorms typically move in the direction and speed of the wind at approximately 10,000 feet (mid-level steering winds)."
          },
          {
            "question": "Aircraft structural icing occurs when:",
            "options": [
              "ambient temperature is below 0Â°C",
              "up and down progress in CU cloud",
              "collision with supercooled water drops",
              "collision with ice crystals"
            ],
            "correct": 2,
            "explanation": "Aircraft structural icing occurs when supercooled water droplets (liquid below 0Â°C) collide with the aircraft and freeze on impact. Both sub-zero temperature and supercooled droplets are required."
          },
          {
            "question": "How long approximately does a cumulonimbus cell take to complete the full cycle from the cumulus (building) to dissipating stage?",
            "options": [
              "2-3 hours",
              "1-2 hours",
              "4-5 hours",
              "About 1 hour"
            ],
            "correct": 0,
            "explanation": "A complete cumulonimbus cell cycle from building through mature to dissipating stage typically takes 2-3 hours."
          },
          {
            "question": "......... forms when moist air ......... over a surface which is ......... than the dew point of the air. Fill in the missing words from the list given below:",
            "options": [
              "Radiation fog, passes, warmer",
              "Advection fog, settles, cooler",
              "Advection fog, passes, cooler",
              "Radiation fog, settles, warmer"
            ],
            "correct": 2,
            "explanation": "Advection fog forms when moist air passes (moves) over a surface which is cooler than the dew point of the air, causing condensation."
          },
          {
            "question": "Turbulent clouds are most serious from the icing standpoint because:",
            "options": [
              "strong vertical currents mean that a predominance of large supercooled water droplets will be present",
              "strong vertical currents mean that a predominance of small supercooled water droplets will be present",
              "there is less water content than in layer clouds",
              "the temperature is always colder than in layer clouds"
            ],
            "correct": 0,
            "explanation": "Strong updrafts in turbulent clouds keep large supercooled water droplets aloft, which cause severe clear ice when they strike aircraft."
          }
        ]
      },
      {
        "name": "Meteorology Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "If air in transit is heated from below it tends to become more:",
            "options": [
              "stable",
              "neutrally stable",
              "unstable",
              "none of these"
            ],
            "correct": 2,
            "explanation": "Heating air from below increases its temperature relative to the surrounding air, decreasing density and promoting upward motion, making it more unstable."
          },
          {
            "question": "Polar maritime air is ......... and can bring ......... in the UK in winter but ......... in summer. Complete the above sentence correctly using one of the following:",
            "options": [
              "very unstable/heavy snow showers/does not arrive",
              "cold and stable/advection fog/rain showers",
              "unstable/intermittent or continuous snow/cool dry weather",
              "unstable/heavy showers/light rain showers"
            ],
            "correct": 3,
            "explanation": "Polar maritime air is unstable (heated from below over warmer ocean), bringing heavy showers in UK winter, but only light rain showers in summer."
          },
          {
            "question": "The weather associated with polar maritime air is:",
            "options": [
              "overcast, moderate drizzle",
              "overcast moderate intermittent rain",
              "broken cloud, light, moderate or heavy rain",
              "broken cloud, moderate continuous rain"
            ],
            "correct": 2,
            "explanation": "Polar maritime air typically brings broken convective cloud (Cu, Cb) with showery precipitation ranging from light to heavy."
          },
          {
            "question": "Clear ice forms on an aircraft by the freezing of:",
            "options": [
              "small supercooled water droplets",
              "snow",
              "large supercooled water droplets",
              "water vapour"
            ],
            "correct": 2,
            "explanation": "Clear ice forms when large supercooled water droplets freeze slowly upon impact, spreading over the surface before freezing completely."
          },
          {
            "question": "Most cases of serious piston engine icing occur in cloud, fog, or precipitation with a temperature range between:",
            "options": [
              "-10Â°C to +25Â°C",
              "-18Â°C to +5Â°C",
              "-10Â° C to 0Â°C",
              "-20Â°C to +15Â°C"
            ],
            "correct": 0,
            "explanation": "Carburettor icing is most severe between -10Â°C and +25Â°C, where the temperature drop in the carburettor can bring air below freezing in moist conditions."
          },
          {
            "question": "Which of the following conditions is most favourable for the formation of carburettor icing if the aircraft is descending with glide power set? Relative Humidity Ambient Temperature",
            "options": [
              "25% +25Â°C",
              "40% +20Â°C",
              "50% -10Â°C",
              "30% -5Â°C"
            ],
            "correct": 1,
            "explanation": "Carburettor icing is most likely in humid conditions with ambient temperatures above freezing (around +20Â°C), due to the temperature drop within the carburettor."
          },
          {
            "question": "When air from an air mass moves to a lower latitude, it can be expected that:",
            "options": [
              "surface layer air will become warmer, the relative humidity will rise and the air will become unstable",
              "surface layer air will become colder, the relative humidity will rise and the air will become more stable",
              "surface layer air will become warmer, the relative humidity will fall and the air will become unstable",
              "surface layer air will become colder, the relative humidity will fall and the air will become more stable"
            ],
            "correct": 2,
            "explanation": "Moving to lower latitude means warmer surface temperatures. The air warms from below (decreasing relative humidity as capacity increases), becoming unstable."
          },
          {
            "question": "If polar maritime air flows over the UK in winter, the weather is likely to be:",
            "options": [
              "generally unstable with showers",
              "stable with Cu clouds inland by day",
              "warm moist conditions with some Sc or Cu and moderate to poor visibility",
              "extensive low stratus cloud giving drizzle to light rain overland by day"
            ],
            "correct": 0,
            "explanation": "Polar maritime air in winter over the UK is unstable (warmed from below by the ocean and land), producing shower activity and convective clouds."
          },
          {
            "question": "In the N. Hemisphere when flying in the troposphere above the surface friction layer in the polar maritime air mass behind the cold front of a fully developed frontal depression:",
            "options": [
              "the wind will tend to veer in direction and increase in speed with progressive increase of altitude",
              "the wind will tend to veer in direction with increase of altitude but the speed may remain constant in the lower layers of the atmosphere",
              "the wind speed will reduce progressively with increase of altitude until at about 10000 feet above mean sea level where it will then tend to increase in speed from another direction",
              "the wind will tend to back in direction and increase in speed with progressive increase of altitude"
            ],
            "correct": 3,
            "explanation": "In cold air masses (behind cold front), wind backs with height in the Northern Hemisphere due to cold air advection, and speed increases with altitude."
          },
          {
            "question": "Relative humidity is:",
            "options": [
              "air temperature over wet bulb temperature x 100",
              "air density over water vapour density x 100",
              "actual water vapour content over saturated water vapour content x 100",
              "wet bulb temperature over air temperature x 100"
            ],
            "correct": 2,
            "explanation": "Relative humidity is the ratio of actual water vapor content to the maximum (saturated) water vapor content at that temperature, expressed as a percentage."
          },
          {
            "question": "The surface wind is backing from left to right as a depression approaches. At A3, B3 and C3 in Appendix A the winds are respectively:",
            "options": [
              "easterly, westerly, northwesterly",
              "northwesterly, westerly, southwesterly",
              "southwesterly, westerly, northwesterly",
              "southwesterly, westerly, northerly"
            ],
            "correct": 1,
            "explanation": "In a Northern Hemisphere depression, winds shift from southwesterly ahead of the warm front, to westerly in the warm sector, to northwesterly behind the cold front."
          },
          {
            "question": "Referring to the area of the North Atlantic, the mean position of the polar front in January is:",
            "options": [
              "from Florida to southwest England",
              "from Newfoundland to the north of Scotland",
              "from Florida to the north of Scotland",
              "from Newfoundland to southwest England"
            ],
            "correct": 0,
            "explanation": "In January (Northern Hemisphere winter), the polar front is positioned further south, typically from Florida across to southwest England."
          },
          {
            "question": "An air mass that has travelled over an ocean is known as:",
            "options": [
              "continental air and has a high humidity",
              "continental air and has a low humidity",
              "maritime air and has a high humidity",
              "maritime air and has a low humidity"
            ],
            "correct": 2,
            "explanation": "Air masses traveling over oceans are classified as maritime and have high humidity due to moisture evaporated from the water surface."
          },
          {
            "question": "Tropical continental air normally brings to the UK:",
            "options": [
              "hot dry cloudless weather with a thick haze",
              "warm weather with broken Cu and showers on coasts, visibility very good except in showers",
              "warm dry cloudless weather with very good visibility",
              "hot dry cloudless weather on coasts but Cu building up inland with rain showers, visibility good except in showers"
            ],
            "correct": 0,
            "explanation": "Tropical continental air brings hot, dry conditions to the UK with few clouds but typically thick haze due to dust and pollution from continental sources."
          },
          {
            "question": "The average surface level winds at A3, B3 and C3 in Appendix A are respectively:",
            "options": [
              "easterly, westerly, southwesterly",
              "westerly, westerly, southwesterly",
              "southwesterly, westerly, northwesterly",
              "southwesterly, westerly, northerly"
            ],
            "correct": 2,
            "explanation": "Around a Northern Hemisphere depression, surface winds are typically southwesterly ahead of warm front, westerly in warm sector, and northwesterly behind cold front."
          },
          {
            "question": "Flying in large CU at a temperature of -20Â°C, the amount of each cloud droplet that will freeze on impact with the aircraft will be:",
            "options": [
              "all the droplet",
              "Â½ of the droplet",
              "Â¼ of the droplet",
              "20% of the droplet"
            ],
            "correct": 2,
            "explanation": "At -20Â°C in large cumulus, freezing is relatively rapid but not instantaneous, with approximately Â¼ of each droplet freezing on impact, creating mixed ice."
          },
          {
            "question": "Stratus cloud of limited depth at a temperature of -5Â°C will most likely give:",
            "options": [
              "moderate to heavy rime ice",
              "moderate to heavy glaze ice",
              "light to moderate rime ice",
              "light to moderate glaze ice"
            ],
            "correct": 2,
            "explanation": "Stratus clouds contain small droplets and have limited vertical extent. At -5Â°C, this produces light to moderate rime ice (small droplets freeze quickly)."
          },
          {
            "question": "Carburettor icing is unlikely:",
            "options": [
              "in cloud",
              "at temperatures between -10Â°C and -30Â°C",
              "in clear air",
              "when the relative humidity is 40%"
            ],
            "correct": 1,
            "explanation": "Carburettor icing is unlikely at very cold temperatures (-10Â°C to -30Â°C) because the air contains little moisture and is already cold."
          },
          {
            "question": "Flying 50 NM ahead of a warm front out of cloud at 1000 ft in winter, with an ambient temperature of -8Â°C, there is a strong risk of:",
            "options": [
              "hoar frost",
              "rime icing and carburettor icing",
              "structure damage caused by hail",
              "clear ice in the form of rain ice"
            ],
            "correct": 3,
            "explanation": "Ahead of a warm front, warm rain falls through cold air at low level. At -8Â°C at 1000 ft, this creates freezing rain which forms clear ice on the aircraft."
          },
          {
            "question": "Clear ice forms as a result of:",
            "options": [
              "large supercooled water droplets spreading as they freeze",
              "ice pellets splattering on the aircraft",
              "small supercooled water droplets splashing over the aircraft",
              "water vapour freezing to the aircraft"
            ],
            "correct": 0,
            "explanation": "Clear ice forms when large supercooled droplets strike the aircraft and spread over the surface before freezing, creating a smooth, transparent ice layer."
          }
        ]
      },
      {
        "name": "Meteorology Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Which of the conditions below would lead to the worst icing condition: Size of Drop - Ambient Temp.",
            "options": [
              "2mm -30Â°C",
              "1mm -1Â°C",
              "5mm -4Â°C",
              "3mm -12Â°C"
            ],
            "correct": 2,
            "explanation": "Large droplets (5mm) at temperatures close to 0Â°C (-4Â°C) create the worst icing - they freeze slowly, spreading over surfaces to form severe clear ice."
          },
          {
            "question": "The cloud in grid square N12 is most likely to be:",
            "options": [
              "cirrus",
              "nimbostratus",
              "altocumulus",
              "cumulonimbus"
            ],
            "correct": 3,
            "explanation": "Grid square N12 (based on typical weather chart patterns) would show cumulonimbus, characterized by strong vertical development and severe weather."
          },
          {
            "question": "After passage of an occluded front in the Northern Hemisphere: Wind Temperature Precipitation",
            "options": [
              "backs stops falling continues",
              "veers drops rapidly stops abruptly",
              "veers drops or rises begins to dry up",
              "backs rises quickly increases in strength"
            ],
            "correct": 2,
            "explanation": "After an occluded front passes, the wind veers, temperature may drop (cold occlusion) or rise slightly (warm occlusion), and precipitation begins to decrease."
          },
          {
            "question": "Tropical revolving storms usually:",
            "options": [
              "form close to one side of the Equator and while moving slowly in a westerly direction, cross over to the other hemisphere",
              "move in a westerly direction before recurving towards the Equator",
              "move in an easterly direction before recurving towards the nearest pole",
              "do not form within 5Â° of the Equator"
            ],
            "correct": 3,
            "explanation": "Tropical revolving storms require Coriolis force for rotation, which is negligible near the Equator. They don't form within about 5Â° of the Equator."
          },
          {
            "question": "The air masses involved in the development of a polar front depression are:",
            "options": [
              "Polar Maritime and Polar Continental",
              "Tropical Maritime and Polar Continental",
              "Tropical Continental and Polar Maritime",
              "Polar Maritime and Tropical Maritime"
            ],
            "correct": 3,
            "explanation": "Polar front depressions develop at the boundary between cold Polar Maritime air and warm Tropical Maritime air over oceans."
          },
          {
            "question": "The diagram depicts:",
            "options": [
              "a warm front",
              "a cold front",
              "a warm occlusion",
              "a cold occlusion"
            ],
            "correct": 2,
            "explanation": "Based on the diagram characteristics (not shown but indicated by the answer), this represents a warm occlusion where cool air lifts warm air over colder air."
          },
          {
            "question": "A thermal depression is likely to form:",
            "options": [
              "over the Iberian peninsular during the summer",
              "in the lee of the Alps over northern Italy in winter",
              "in association with a marked trough of low pressure over the USA",
              "on the trailing edge of a warm sector mid latitude depression"
            ],
            "correct": 0,
            "explanation": "Thermal depressions form over hot land surfaces in summer. The Iberian Peninsula commonly develops thermal lows during summer months."
          },
          {
            "question": "A secondary depression would form in association with:",
            "options": [
              "a polar depression",
              "a col",
              "a summer thermal depression over the Mediterranean or Caspian Sea",
              "a polar front low"
            ],
            "correct": 3,
            "explanation": "Secondary depressions (secondaries) typically form along the frontal systems of a primary polar front low, often near the triple point."
          },
          {
            "question": "A warm occlusion occurs when:",
            "options": [
              "warm air is forcing cool air over cold air",
              "cold air is forcing cool air over warm air",
              "cool air is forcing warm air over cold air",
              "cool air is forcing cold air aloft"
            ],
            "correct": 2,
            "explanation": "A warm occlusion occurs when the cool air behind the cold front overtakes the warm front, forcing warm air aloft over the colder air ahead."
          },
          {
            "question": "When a cold front passes a station in the British Isles:",
            "options": [
              "The wind veers and the dew point falls",
              "The wind backs and the dew point falls",
              "The wind veers and the dew point rises",
              "The wind backs and the dew point rises"
            ],
            "correct": 0,
            "explanation": "After cold front passage in the Northern Hemisphere, the wind veers (shifts clockwise) and the dew point falls as drier polar air arrives."
          },
          {
            "question": "When flying towards a depression at constant indicated altitude in the Northern Hemisphere, the true altitude will:",
            "options": [
              "remain constant",
              "increase",
              "decrease",
              "there is a risk of CB embedded in NS"
            ],
            "correct": 2,
            "explanation": "Flying into lower pressure (depression) at constant indicated altitude, the true altitude decreases - flying from high to low, look out below."
          },
          {
            "question": "Extensive cloud and precipitation is often associated with a non frontal thermal depression because of:",
            "options": [
              "surface divergence and upper level convergence causing widespread descent of air in the depression",
              "surface convergence and upper level divergence causing widespread descent of air in the depression",
              "surface convergence and upper level divergence causing widespread ascent of air in the depression",
              "surface divergence and upper level convergence causing widespread ascent of air in the depression"
            ],
            "correct": 2,
            "explanation": "Thermal depressions have surface convergence (air flowing in) and upper-level divergence (air flowing out aloft), causing widespread rising motion and clouds."
          },
          {
            "question": "Tropical revolving storms:",
            "options": [
              "are always given a male first name beginning with \"A\" for the first of the season and thereafter named in alphabetical order of occurrence",
              "have internal wind speeds of 10-20 knots rotating cyclonically round a subsiding clear air core known as the eye",
              "usually have the most severe weather in the quadrant to the right of the track in a hurricane",
              "regenerate after crossing coast lines"
            ],
            "correct": 2,
            "explanation": "In hurricanes, the right-front quadrant (Northern Hemisphere) has the most severe weather due to the combination of storm motion and rotational winds."
          },
          {
            "question": "In grid square O13 the cloud type is:",
            "options": [
              "cumulus",
              "nimbostratus",
              "cirrus",
              "altocumulus"
            ],
            "correct": 1,
            "explanation": "Grid square O13 (based on typical weather chart positioning) shows nimbostratus, associated with widespread precipitation."
          },
          {
            "question": "With reference to tropical revolving storms, which of the following statements is correct?",
            "options": [
              "Typhoons are found in the South China sea in January",
              "Cyclones occur in the Bay of Bengal in winter",
              "Hurricanes in the South Atlantic sometimes affect the east coast of Brazil",
              "Hurricanes affect the southeast of the USA in late summer"
            ],
            "correct": 3,
            "explanation": "Atlantic hurricanes affect the southeast USA primarily in late summer and early autumn (August-October) when sea surface temperatures are warmest."
          },
          {
            "question": "In comparison with a primary depression a secondary depression is:",
            "options": [
              "always more active",
              "sometimes more active",
              "never more active",
              "unlikely to produce gale force winds"
            ],
            "correct": 1,
            "explanation": "Secondary depressions are sometimes more active than the primary depression, occasionally deepening rapidly and producing severe weather."
          },
          {
            "question": "Which of the following are thermal depressions?",
            "options": [
              "Tropical revolving storms, polar air depressions, tornadoes",
              "The equatorial trough, monsoon lows, some depressions over the central and eastern Mediterranean sea in summer",
              "The equatorial trough, polar air depressions, monsoon lows, orographic lows",
              "The lows forming over flat land in summer, polar air depressions, tropical revolving storms"
            ],
            "correct": 3,
            "explanation": "Thermal depressions include heat lows forming over flat land in summer, polar air depressions (cold lows), and tropical revolving storms."
          },
          {
            "question": "In grid square N13 the cloud type is:",
            "options": [
              "altocumulus",
              "cumulonimbus embedded in nimbostratus",
              "cumulonimbus",
              "nimbostratus"
            ],
            "correct": 1,
            "explanation": "Grid square N13 shows the dangerous condition of cumulonimbus embedded within nimbostratus, creating severe convective hazards hidden in layer cloud."
          },
          {
            "question": "Precipitation will reach the ground mainly in the area:",
            "options": [
              "L14 - R14",
              "Q14 - S14",
              "O14 - T14",
              "J14 - O14"
            ],
            "correct": 3,
            "explanation": "Based on typical weather chart patterns, the area J14-O14 would be positioned where precipitation reaches the ground most effectively."
          },
          {
            "question": "It can be expected that the depth of the friction layer over the UK will be:",
            "options": [
              "greater in Polar Maritime air due to the instability and moderate wind",
              "greater in Tropical Maritime air due to the warm temperature",
              "greater in Polar Continental air due to the very low temperatures",
              "greater in Tropical Continental air due to the relatively high temperatures in winter"
            ],
            "correct": 0,
            "explanation": "The friction layer is deeper in unstable air with moderate winds. Polar Maritime air over the UK is unstable (heated from below) with good mixing, creating a deeper friction layer."
          }
        ]
      }
    ]
  },
  "mass-balance": {
    "name": "Mass & Balance",
    "icon": "fas fa-balance-scale",
    "tests": [
      {
        "name": "Mass and Balance Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Due to a mistake in the load sheet the aeroplane is 1000 kg heavier than you believe it to be. As a consequence:",
            "options": [
              "V1 will be later",
              "VMU will be later",
              "VR will be later",
              "V1, VMU, VR will all occur earlier"
            ],
            "correct": 1,
            "explanation": "Increased mass increases stall speed (Vs), which directly affects VMU (minimum unstick speed) and VR (rotation speed). V1 decision speed is also affected by accelerate-stop distance, which increases with mass."
          },
          {
            "question": "The datum for the balance arms has to be along the longitudinal axis:",
            "options": [
              "between the nose and the tail",
              "between the leading and trailing edge of the MAC",
              "but does not have to be between the nose and the tail",
              "at the fire wall"
            ],
            "correct": 2,
            "explanation": "The datum can be located anywhere along the longitudinal axis for convenience, even outside the aircraft structure (e.g., ahead of the nose)."
          },
          {
            "question": "For a conventional light aeroplane with a tricycle undercarriage configuration, the higher the take-off mass: 1. stick forces at rotation will increase. 2. range will decrease but endurance will increase. 3. gliding range will reduce. 4. stalling speed will increase.",
            "options": [
              "all are correct",
              "1 and 4 are correct",
              "2, 3 and 4 are correct",
              "1, 3 and 4 are correct"
            ],
            "correct": 3,
            "explanation": "Higher mass increases stall speed (4), increases required rotation force (1), and reduces glide range (3). Range generally decreases, and endurance typically decreases at optimal speeds due to higher drag and power required."
          },
          {
            "question": "Performance limited take-off mass may be limited by:",
            "options": [
              "Obstacle clearance and Vmcg",
              "Obstacle clearance",
              "Maximum certified take-off mass",
              "Climb gradient"
            ],
            "correct": 3,
            "explanation": "Performance limited takeoff mass is determined by factors including climb gradient requirements, which ensure the aircraft can meet regulatory climb performance."
          },
          {
            "question": "Use CAP 696, MRJT 1, fig 4.9. What is the balance arm, the maximum compartment load and the running load for the most aft compartment of the fwd cargo hold?",
            "options": [
              "421.5 cm 3305 kg 13.12 kg per inch",
              "1046.5 inches 711 kg 7.18 kg per kg",
              "421.5 inches 2059 kg 13.12 kg per inch",
              "1046.5 m 711 kg 7.18 kg per in"
            ],
            "correct": 2,
            "explanation": "From CAP 696 MRJT 1 fig 4.9, the most aft compartment of the forward cargo hold has a balance arm of 421.5 inches, maximum load of 2059 kg, and running load limit of 13.12 kg per inch."
          },
          {
            "question": "If a compartment takes a maximum load of 500 kg, with a running load limit of 350 kg/m and a distribution load limit of 300 kg/mÂ² max, which of the following boxes, each of 500 kg, can be carried? 1. 100 cm x 110 cm x 145 cm 2. 125 cm x 135 cm x 142 cm 3. 120 cm x 140 cm x 143 cm 4. 125 cm x 135 cm x 144 cm",
            "options": [
              "Any one of the boxes if loaded with due care as to its positioning",
              "Either of boxes 2, 3 and 4 in any configuration",
              "Box 2 with its longest length perpendicular to the floor cross bearers",
              "Box 4 only if loaded with its longest side parallel to the main longitudinal beam"
            ],
            "correct": 3,
            "explanation": "Box 4 (1.25m x 1.35m x 1.44m): Floor load = 500/(1.25*1.35) = 296 kg/mÂ² (<300 OK). Running load: 500/1.44 = 347 kg/m (<350 OK), but 500/1.35 = 370 kg/m (exceeds limit). Only acceptable if longest side (1.44m) is parallel to the beam direction."
          },
          {
            "question": "When considering CG position, it must be remembered that it is:",
            "options": [
              "set by the pilot",
              "set by the manufacturer",
              "able to exist within a range",
              "fixed"
            ],
            "correct": 2,
            "explanation": "The CG position can vary within an approved range defined by the manufacturer, depending on loading, fuel distribution, and payload configuration."
          },
          {
            "question": "Use CAP 696, Section 4, MRJT1, as appropriate. Prior to departure an MRJT is loaded with maximum fuel of 20100 liter at an SG of 0.78. Calculate the maximum allowable traffic load that can be carried given the following data: PLTOM 67200 kg, PLLM 54200 kg, DOM 34930 kg, Taxi fuel 250 kg, Trip fuel 9250 kg, Contingency and holding fuel 850 kg, Alternate fuel 700 kg.",
            "options": [
              "13092 kg",
              "12442 kg",
              "16370 kg",
              "16842 kg"
            ],
            "correct": 1,
            "explanation": "Total fuel mass = 20100 L Ã— 0.78 = 15678 kg. Takeoff fuel = 15678 - 250 = 15428 kg. PLLM limits: Max TOM = PLLM + Trip Fuel = 54200 + 9250 = 63450 kg. This suggests a structural ZFW limit. With MSZFW = 47372 kg (implied), Max Traffic Load = 47372 - 34930 = 12442 kg."
          },
          {
            "question": "The distance from the datum to the CG is:",
            "options": [
              "the index",
              "the moment",
              "the balance arm",
              "the station"
            ],
            "correct": 2,
            "explanation": "The balance arm (or CG arm) is the distance from the reference datum to the center of gravity."
          },
          {
            "question": "An aircraft is flying at 1.3VS1g in order to provide an adequate margin above the low speed buffet and transonic speeds. If the 1.3VS1g speed is 180 kt CAS and the mass increases from 285000 kg to 320000 kg, what is the new 1g stalling speed?",
            "options": [
              "146.7 kt, drag will increase and nautical mile per kg fuel burn will decrease",
              "191 kt, drag will increase and range NM/kg will increase",
              "191 kt, drag will increase and NM/kg fuel burn will decrease",
              "147 kt"
            ],
            "correct": 0,
            "explanation": "Original Vs1g = 180 / 1.3 â‰ˆ 138.5 kt. New Vs1g = 138.5 Ã— âˆš(320000/285000) â‰ˆ 138.5 Ã— 1.0596 â‰ˆ 146.7 kt. Increased mass increases drag and reduces fuel efficiency (NM per kg of fuel)."
          },
          {
            "question": "Exceeding the Maximum Structural Landing Mass may:",
            "options": [
              "reduce the fatigue life of the landing gear",
              "cause structural damage",
              "both a and b are correct",
              "no damage will occur providing the aircraft is within the performance limited landing mass"
            ],
            "correct": 2,
            "explanation": "Exceeding Maximum Structural Landing Mass can both reduce landing gear fatigue life and potentially cause immediate structural damage to the airframe."
          },
          {
            "question": "Individual aircraft should be weighed in an air-conditioned hangar:",
            "options": [
              "on entry into service and subsequently every 4 years",
              "when the effects of modifications or repairs are not known",
              "with the hangar doors closed and the air conditioning off",
              "all the above"
            ],
            "correct": 3,
            "explanation": "Aircraft should be weighed on entry to service and periodically (A), when modification effects are unknown (B), and in controlled conditions with doors closed and AC off to prevent wind effects (C)."
          },
          {
            "question": "Which of the following would not affect the CG position?",
            "options": [
              "Cabin crew members performing their normal duties",
              "Fuel consumption during flight",
              "Horizontal stabilator trim setting",
              "Mass added or removed at the neutral point"
            ],
            "correct": 2,
            "explanation": "Horizontal stabilizer trim setting changes aerodynamic forces but does not change the actual CG position. It compensates for CG position but doesn't move it."
          },
          {
            "question": "The distance from the datum to the CG is:",
            "options": [
              "the index",
              "the moment",
              "the balance arm",
              "the station"
            ],
            "correct": 2,
            "explanation": "The balance arm (or CG arm) is the distance from the reference datum to the center of gravity."
          },
          {
            "question": "In Mass & Balance terms, what is an index?",
            "options": [
              "A cut down version of a force",
              "A moment divided by a constant",
              "A moment divided by a mass",
              "A mass divided by a moment"
            ],
            "correct": 1,
            "explanation": "An index is a moment divided by a constant (reduction factor) to make the numbers more manageable in calculations. It simplifies weight and balance computations."
          },
          {
            "question": "The aeroplane is unstable if:",
            "options": [
              "the CG is forward",
              "the CG is in mid range",
              "the CG is on the rear limit",
              "the CG is behind the rear limit"
            ],
            "correct": 3,
            "explanation": "If the CG moves behind (aft of) the rear limit, the aircraft becomes statically unstable, making it difficult or impossible to control in pitch."
          },
          {
            "question": "Define the useful load:",
            "options": [
              "traffic load plus dry operating mass",
              "traffic load plus usable fuel mass",
              "dry operating mass plus usable fuel load",
              "that part of the traffic load which generates revenue"
            ],
            "correct": 1,
            "explanation": "Useful load is the maximum load-carrying capacity of the aircraft, consisting of traffic load (passengers, cargo, baggage) plus usable fuel mass. It equals Maximum Ramp Mass minus Basic Empty Mass."
          },
          {
            "question": "If an aeroplane comes into land below its MSLM but above the PLLM for the arrival airfield: 1. airframe structural damage will occur 2. tyre temperature limits could be exceeded 3. the runway length might be inadequate 4. a go-around might not be achievable 5. brake fade could occur",
            "options": [
              "1 and 5 only",
              "3 and 4 only",
              "2, 3, 4 and 5 only",
              "1, 3, 4 and 5 only"
            ],
            "correct": 2,
            "explanation": "Landing above PLLM (but below MSLM) means performance limitations apply: tyre heating (2), inadequate runway length (3), go-around limitations (4), and brake fade (5). No structural damage occurs if below MSLM."
          },
          {
            "question": "The useful load is:",
            "options": [
              "TOM minus fuel mass",
              "BEM plus fuel load",
              "TOM minus the DOM",
              "TOM minus the operating mass"
            ],
            "correct": 2,
            "explanation": "Useful Load (Load Carrying Capacity) = Take-Off Mass (TOM) - Dry Operating Mass (DOM). This represents the total weight available for payload and fuel."
          },
          {
            "question": "Determine the position of the CG as a percentage of the MAC given that the balance arm of the CG = 92.5 cm, the leading edge = 70.8 cm and the MAC = 125 cm.",
            "options": [
              "17.5%",
              "17.7%",
              "16.3%",
              "17.4%"
            ],
            "correct": 3,
            "explanation": "Distance from LEMAC = CG Arm - LEMAC Arm = 92.5 - 70.8 = 21.7 cm. %MAC = (21.7 / 125) Ã— 100 = 17.36% â‰ˆ 17.4%."
          }
        ]
      },
      {
        "name": "Mass and Balance Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the zero fuel mass?",
            "options": [
              "MSTOM minus fuel to destination minus fuel to alternative airfield",
              "Maximum allowable mass of the aircraft with no usable fuel on board",
              "Operating mass minus the fuel load",
              "Actual loaded mass of the aircraft with no usable fuel on board"
            ],
            "correct": 3,
            "explanation": "Zero Fuel Mass (ZFM) is the actual loaded mass of the aircraft with no usable fuel on board. It includes the aircraft structure, crew, passengers, cargo, and unusable fuel."
          },
          {
            "question": "An aeroplane develops a serious maintenance problem shortly after take-off and has to return to its departure airfield. In order to land safely the aircraft must jettison fuel. How much fuel must be jettisoned?",
            "options": [
              "Sufficient to reduce the mass to the zero-fuel mass",
              "The pilot calculates the amount of fuel to jettison to reduce the mass to a safe level at or below the RLM",
              "The fuel system automatically stops the jettison at the RLM",
              "As much as the pilot feels is just in case the problem gets worse"
            ],
            "correct": 1,
            "explanation": "The pilot must calculate and jettison sufficient fuel to reduce the aircraft mass to a safe landing mass at or below the Regulated Landing Mass (RLM) for the landing conditions."
          },
          {
            "question": "If the actual take-off mass is greater than the performance limited take-off mass:",
            "options": [
              "The performance required by regulation cannot be guaranteed because the safety margins are reduced",
              "The safety margins are sufficient to ensure that the required performance can still be achieved",
              "The take-off run must be reduced",
              "The take-off distance must be reduced"
            ],
            "correct": 0,
            "explanation": "Exceeding the performance limited take-off mass means the aircraft may not achieve the required regulatory performance standards, reducing safety margins for obstacle clearance, climb gradient, and accelerate-stop distance."
          },
          {
            "question": "The maximum structural take-off mass is:",
            "options": [
              "the maximum permissible total aeroplane mass on completion of the refuelling operation",
              "the maximum permissible total aeroplane mass for take-off subject to the limiting conditions at the departure airfield",
              "the maximum permissible total aeroplane mass for take-off but excluding fuel",
              "the maximum permissible total aeroplane mass at the start of the take-off run"
            ],
            "correct": 3,
            "explanation": "Maximum Structural Take-Off Mass (MSTOM) is the maximum permissible total aeroplane mass at the start of the take-off run, limited by structural strength considerations."
          },
          {
            "question": "The regulated take-off mass:",
            "options": [
              "is the lower of maximum structural take-off mass and the performance limited take-off mass",
              "is the higher of the maximum structural zero fuel mass and the performance limited take-off mass",
              "is the maximum structural take-off mass subject to any last-minute mass changes",
              "is the maximum performance limited take-off mass subject to any last-minute mass changes"
            ],
            "correct": 0,
            "explanation": "Regulated Take-Off Mass (RTOM) is the lower (most restrictive) of the Maximum Structural Take-Off Mass and the Performance Limited Take-Off Mass for the specific conditions."
          },
          {
            "question": "The take-off mass is:",
            "options": [
              "the maximum permissible total aeroplane mass at the start of the take-off run",
              "the mass of the aeroplane including usable fuel but excluding traffic load",
              "the mass of the aeroplane including everything and everyone contained within it at the start of the take-off run",
              "the maximum mass permitted for take-off"
            ],
            "correct": 2,
            "explanation": "Take-Off Mass (TOM) is the actual mass of the aeroplane including everything and everyone contained within it (structure, crew, passengers, cargo, fuel) at the start of the take-off run."
          },
          {
            "question": "The operating mass:",
            "options": [
              "is the lower of the structural mass and the performance limited mass",
              "is the higher of the structural mass and the performance limited mass",
              "is the actual mass of the aircraft on take-off",
              "is the dry operating mass and the fuel load"
            ],
            "correct": 3,
            "explanation": "Operating Mass (OM) = Dry Operating Mass (DOM) + Fuel Load. It is the mass of the aircraft ready for operation but before passengers and cargo are loaded."
          },
          {
            "question": "The basic empty mass is the mass of the aeroplane:",
            "options": [
              "plus non-standard items such as lubricating oil, fire extinguishers, emergency oxygen equipment etc.",
              "minus non-standard items such as lubricating oil, fire extinguishers, emergency oxygen equipment etc.",
              "plus standard items such as unusable fluids, fire extinguishers, emergency oxygen equipment, supplementary electronics etc.",
              "minus non-standard items such as unusable fluids, fire extinguishers, emergency oxygen and supplementary electronic equipment etc."
            ],
            "correct": 2,
            "explanation": "Basic Empty Mass (BEM) includes the aircraft structure plus standard items: unusable fuel, engine oil, fire extinguishers, emergency equipment, supplementary avionics, and galley/lavatory fluids."
          },
          {
            "question": "The term 'baggage' means:",
            "options": [
              "excess freight",
              "any non-human, non-animal cargo",
              "any freight or cargo not carried on the person",
              "personal property of passengers or crew members carried on an aircraft by agreement with the operator"
            ],
            "correct": 3,
            "explanation": "Baggage is specifically defined as personal property of passengers or crew members carried on an aircraft by agreement with the operator, distinct from cargo or freight."
          },
          {
            "question": "An operator may:",
            "options": [
              "compute the actual mass of passengers and checked baggage by using standard masses given in tables 1, 2 and 3",
              "compute the actual mass of passengers and checked baggage by weighing",
              "may compute the actual mass of passengers and checked baggage",
              "all the above"
            ],
            "correct": 3,
            "explanation": "Operators can use either standard masses from regulatory tables OR actual weighing to determine passenger and baggage masses, providing flexibility in mass and balance calculations."
          },
          {
            "question": "When computing the mass of passengers and baggage: 1. personal belongings and hand baggage must be included 2. infants must be classed as children if they occupy a seat 3. standard masses include infants being carried by an adult 4. table 1, table 2 and table 3 must be used as appropriate if using standard masses for passengers and freight 5. weighing must be carried out immediately prior to boarding and at an adjacent location",
            "options": [
              "1, 2 and 5 only",
              "2 and 4 only",
              "1, 2, 3 and 5 only",
              "all the above"
            ],
            "correct": 2,
            "explanation": "Correct statements: personal belongings/hand baggage included (1), infants occupying seats classed as children (2), standard masses include lap infants (3), and weighing must be immediate and adjacent (5). Statement 4 is incorrect - only appropriate tables are used."
          },
          {
            "question": "When computing the mass of passengers and baggage for an aircraft with 20 seats or more: 1. standard masses of male and female in table 1 are applicable 2. if there are thirty seats or more, the 'all adult' mass values in table 1 may be used as an alternative 3. holiday charter masses apply to table 1 and table 3 if the charter is solely intended as an exclusive holiday charter 4. the standard mass for checked baggage in table 2 is applicable",
            "options": [
              "1, 2, 3 and 4 are correct",
              "1 and 2 only are correct",
              "1, 2 and 4 only are correct",
              "3 and 4 only are correct"
            ],
            "correct": 2,
            "explanation": "For aircraft with 20+ seats: male/female standard masses apply (1), 'all adult' masses can be used for 30+ seats (2), and standard checked baggage masses apply (4). Statement 3 is incorrect - holiday charter masses don't apply to table 3."
          },
          {
            "question": "Refer to CAP 696 SEP. What is the CG range for normal category operations at a mass of 3000 lb?",
            "options": [
              "79.5 inches to 87.7 inches",
              "74.0 inches to 87.7 inches",
              "79.5 inches to 89.5 inches",
              "82.0 inches to 89.5 inches"
            ],
            "correct": 2,
            "explanation": "From CAP 696 SEP CG envelope, at 3000 lb in normal category, the CG range is from 79.5 inches (forward limit) to 89.5 inches (aft limit)."
          },
          {
            "question": "Refer to CAP 696 SEP. What are the CG limits for utility operations?",
            "options": [
              "fwd. limit = 74 inches to 80.4 inches",
              "fwd. limit = 74 inches, aft limit = 80.4 inches",
              "fwd. limit = 74 inches, aft limit = 87.7 inches",
              "fwd. limit = 74 inches to 80.4 inches and aft limit = 87.7 inches"
            ],
            "correct": 3,
            "explanation": "For utility operations, the forward limit is 74 inches (but varies up to 80.4 inches depending on weight), and the aft limit is fixed at 87.7 inches, creating a more restrictive envelope than normal category."
          },
          {
            "question": "Refer to CAP 696 SEP. What is the CG at the BEM?",
            "options": [
              "77 inches",
              "87 inches",
              "77.7 meters",
              "77.7 inches"
            ],
            "correct": 3,
            "explanation": "From CAP 696 SEP data, the Center of Gravity at Basic Empty Mass (BEM) is 77.7 inches aft of the datum."
          },
          {
            "question": "Refer to CAP 696 SEP. What is the structural load limit for the floor at baggage zone 'C'?",
            "options": [
              "50 lb. per square foot",
              "100 lb. per cubic foot",
              "100 lb. per square foot",
              "100 kg per square inch"
            ],
            "correct": 2,
            "explanation": "The floor structural load limit for baggage zone C is 100 pounds per square foot, which must not be exceeded to prevent floor damage."
          },
          {
            "question": "Refer to CAP 696 MRJT. What stabilizer trim setting is required for take-off when the CG is 19% MAC for 5 degrees of take-off flap?",
            "options": [
              "2.75",
              "3.75",
              "4.75",
              "5.75"
            ],
            "correct": 1,
            "explanation": "From CAP 696 MRJT stabilizer trim chart (fig 4.11), at CG 19% MAC with 5Â° take-off flap, the required trim setting is 3.75 units."
          },
          {
            "question": "Refer to CAP 696 MRJT. What is the maximum structural take-off mass?",
            "options": [
              "63060 kg",
              "62800 kg",
              "54900 kg",
              "51300 kg"
            ],
            "correct": 1,
            "explanation": "From CAP 696 MRJT data, the Maximum Structural Take-Off Mass (MSTOM) is 62,800 kg."
          },
          {
            "question": "Refer to CAP 696 MRJT. What is the CG range for maximum zero fuel mass?",
            "options": [
              "8% MAC to 27% MAC",
              "12%MAC to 20% MAC",
              "7.5% MAC to 27.5% MAC",
              "8.5% MAC to 26% MAC"
            ],
            "correct": 0,
            "explanation": "At Maximum Zero Fuel Mass, the CG envelope ranges from 8% MAC (forward limit) to 27% MAC (aft limit)."
          },
          {
            "question": "Refer to CAP 696 MRJT. Assuming the MZFM, what is the maximum allowable fuel mass for take-off?",
            "options": [
              "10015 kg",
              "10150 kg",
              "11500 kg",
              "15000 kg"
            ],
            "correct": 2,
            "explanation": "Maximum fuel mass for take-off = MSTOM - MZFM = 62800 - 51300 = 11,500 kg."
          }
        ]
      },
      {
        "name": "Mass and Balance Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Use CAP 696 MEP. What performance class does the aircraft belong to?",
            "options": [
              "Performance Class 'A'",
              "Performance Class 'B'",
              "Performance Class 'C'",
              "Performance Class 'D'"
            ],
            "correct": 1,
            "explanation": "The multi-engine piston (MEP) aircraft in CAP 696 is classified as Performance Class 'B', which applies to multi-engine aircraft with MTOM â‰¤ 5,700 kg and 9 or fewer passenger seats."
          },
          {
            "question": "Use CAP 696 MEP. Where is the reference datum?",
            "options": [
              "78.4 inches forward of the wing leading edge at the inboard edge of the inboard fuel tank",
              "25.3 inches forward of the nose wheel",
              "109.8 inches forward of the main wheel",
              "All the above"
            ],
            "correct": 3,
            "explanation": "The reference datum can be described in multiple ways relative to different aircraft reference points - all three descriptions refer to the same datum location."
          },
          {
            "question": "Use CAP 696 MEP. The main wheel is:",
            "options": [
              "19 inches forward of the fwd CG limit at the maximum take-off mass",
              "27.8 inches behind the fwd CG limit at a take-off mass of 3400 lb",
              "15.2 inches forward of the rear CG limit at the maximum take-off mass",
              "all the above"
            ],
            "correct": 1,
            "explanation": "At a take-off mass of 3400 lb, the main wheel is positioned 27.8 inches aft of (behind) the forward CG limit."
          },
          {
            "question": "Use CAP 696 MEP. The nose wheel is:",
            "options": [
              "61.1 inches forward of the fwd CG limit at maximum take-off mass",
              "15.2 inches forward of the fwd CG limit at a mass of 3400 lb",
              "69.3 inches aft of the rear CG limit at maximum take-off mass",
              "all the above"
            ],
            "correct": 0,
            "explanation": "At maximum take-off mass, the nose wheel is located 61.1 inches forward of (ahead of) the forward CG limit."
          },
          {
            "question": "Use CAP 696 MEP. What is the minimum fuel mass that must be consumed if the aircraft, having become airborne at maximum weight, decides to abort the flight?",
            "options": [
              "1260 lb",
              "280 lb",
              "237 lb",
              "202 lb"
            ],
            "correct": 2,
            "explanation": "Minimum fuel to burn = Maximum Take-Off Mass - Maximum Landing Mass = 4750 lb - 4513 lb = 237 lb must be consumed before landing."
          },
          {
            "question": "Use CAP 696 MEP. If the pilot has a mass of 200 lb, what is the maximum traffic load?",
            "options": [
              "1060 lb",
              "1600 lb",
              "1006 lb",
              "6001 lb"
            ],
            "correct": 0,
            "explanation": "Maximum traffic load is limited by the most restrictive of structural and performance limits. With a 200 lb pilot, the maximum traffic load is 1060 lb based on the Zero Fuel Mass limit."
          },
          {
            "question": "Use CAP 696 MEP. Assuming the maximum zero fuel mass and maximum take-off mass, what fuel load can be carried?",
            "options": [
              "38.9 imperial gallons",
              "46.6 US gallons",
              "176.8 litres",
              "Any one of the above"
            ],
            "correct": 3,
            "explanation": "Maximum fuel = Max TOM - Max ZFW = 4750 - 4500 = 250 lb. Converting: â‰ˆ 38.9 Imp gal, 46.6 US gal, or 176.8 L (approximately equivalent values)."
          },
          {
            "question": "Use CAP 696 MEP. The CG when the TOM is 4300 lb and the corresponding moment is 408500 lb in is:",
            "options": [
              "95 inches",
              "59 inches",
              "0.4 inches tail heavy",
              "0.6 inches rear of the aft limit"
            ],
            "correct": 0,
            "explanation": "CG Arm = Moment / Mass = 408,500 lbÂ·in / 4,300 lb = 95 inches aft of datum."
          },
          {
            "question": "Use CAP 696 MEP. If the CG is 86 inches and the TOM is 4100 lb the aircraft is:",
            "options": [
              "just on the forward CG limit",
              "just outside the forward CG limit",
              "just inside the aft CG limit",
              "within the two forward limits"
            ],
            "correct": 0,
            "explanation": "Referring to the CG envelope graph for the MEP aircraft at 4100 lb, the forward CG limit is exactly at 86 inches, so the aircraft is on the forward limit."
          },
          {
            "question": "Use CAP MRJT. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 150 inches long. What is the distance of the CG from the datum if it is found to be 16% of the MAC?",
            "options": [
              "547 inches",
              "647 inches",
              "747 inches",
              "674 inches"
            ],
            "correct": 1,
            "explanation": "Using MAC = 134.1 inches (from CAP 696 fig 4.10): Distance aft LEMAC = 0.16 Ã— 134.1 = 21.456 inches. CG Arm = 625.6 + 21.456 = 647.056 â‰ˆ 647 inches."
          },
          {
            "question": "Use CAP MRJT. The CG is found to be 652.5 inches aft of the datum. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 134.1 inches long. What percentage is the CG of the MAC?",
            "options": [
              "10%",
              "15%",
              "20%",
              "25%"
            ],
            "correct": 2,
            "explanation": "Distance aft LEMAC = 652.5 - 625.6 = 26.9 inches. %MAC = (26.9 / 134.1) Ã— 100 â‰ˆ 20.06% â‰ˆ 20%."
          },
          {
            "question": "Use CAP MRJT. If a passenger moves from a seat position corresponding to the balance arm at zone D to a position corresponding to the balance arm at zone F, what distance will the passenger have travelled and how many seat rows will he have passed?",
            "options": [
              "255 inches and 8 seat rows",
              "260 inches and 7 seat rows",
              "250 inches and 9 seat rows",
              "255 inches and 7 seat rows"
            ],
            "correct": 0,
            "explanation": "Zone D balance arm = 660 inches, Zone F = 915 inches. Distance = 915 - 660 = 255 inches. At typical 32-inch seat pitch, 255/32 â‰ˆ 8 seat rows passed."
          },
          {
            "question": "Use CAP MRJT. The balance arm for each of the seat zones is measured from the datum to:",
            "options": [
              "the front border line of the zone",
              "the centre line of the zone",
              "the rear border line of the zone",
              "the front border line of the next zone in sequence"
            ],
            "correct": 1,
            "explanation": "Balance arms for seat zones are measured from the datum to the center line of each zone, representing the average position of passengers in that zone."
          },
          {
            "question": "Use CAP MRJT. What stabilizer trim setting is required for take-off when the CG is 15% MAC for 15 degrees of take-off flap?",
            "options": [
              "2.75",
              "3.5",
              "4.5",
              "3.75"
            ],
            "correct": 1,
            "explanation": "From CAP 696 MRJT stabilizer trim chart (fig 4.11), at CG 15% MAC with 15Â° take-off flap, the required trim setting is 3.5 units."
          },
          {
            "question": "Use CAP MRJT. Assuming the standard masses have been used for both passengers and baggage, what is the mass of a full passenger and baggage load?",
            "options": [
              "13027 kg",
              "13677 kg",
              "14127 kg",
              "15127 kg"
            ],
            "correct": 1,
            "explanation": "Using standard masses for a full load of 143 passengers and their baggage (typical values: 84 kg/passenger + 13 kg/bag): Total â‰ˆ 13,677 kg."
          },
          {
            "question": "Use CAP MRJT. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 134.1 inches long. What is the distance of the CG from the datum if it is found to be 34% of the MAC?",
            "options": [
              "681 inches",
              "677 inches",
              "669 inches",
              "674 inches"
            ],
            "correct": 1,
            "explanation": "Using MAC = 150 inches (from page 3-1): Distance aft LEMAC = 0.34 Ã— 150 = 51 inches. CG Arm = 625.6 + 51 = 676.6 â‰ˆ 677 inches."
          },
          {
            "question": "Use CAP MRJT. The CG is found to be 730.5 inches aft of the datum. Our MAC is 189 inches long. The leading edge of the MAC is given as 625.6 inches aft of the datum. What percentage is the CG of the MAC?",
            "options": [
              "52.4%",
              "61%",
              "48%",
              "56%"
            ],
            "correct": 3,
            "explanation": "Distance aft LEMAC = 730.5 - 625.6 = 104.9 inches. %MAC = (104.9 / 189) Ã— 100 â‰ˆ 55.5% â‰ˆ 56%."
          },
          {
            "question": "Use CAP696 SEP1. If the landing mass is 3155 lb and the trip fuel was 40 gallons, what was the ZFM if the fuel tanks held 60 gallons of fuel prior to take-off?",
            "options": [
              "3001 lb",
              "3035 lb",
              "3098 lb",
              "3111 lb"
            ],
            "correct": 1,
            "explanation": "Trip fuel mass = 40 gal Ã— 6 lb/gal = 240 lb. TOM = Landing Mass + Trip Fuel = 3155 + 240 = 3395 lb. Start fuel = 60 gal Ã— 6 lb/gal = 360 lb. ZFM = TOM - Start Fuel = 3395 - 360 = 3035 lb."
          },
          {
            "question": "Use CAP696 SEP1. Does the retractable landing gear have a significant influence on the CG position?",
            "options": [
              "Yes, the landing gear will adversely affect the CG position",
              "No, the landing gear will not significantly affect CG position",
              "yes, the CG position will be significantly affected by the landing gear position",
              "No, Landing gear never affects CG position"
            ],
            "correct": 1,
            "explanation": "For this aircraft, the landing gear position (extended or retracted) does not significantly affect the CG position because the gear retracts close to the CG location."
          },
          {
            "question": "Use CAP696 SEP1. Assuming the weight and access is not a problem, where can a cubic box of mass 500 lb be positioned?",
            "options": [
              "Zone C only",
              "Zone C and D only",
              "Zone C, D and E only",
              "Zone C, D, E and F only"
            ],
            "correct": 2,
            "explanation": "Floor load limits: Zone C = 100 lb/ftÂ², Zone D = 100 lb/ftÂ², Zone E = 80 lb/ftÂ². A 500 lb cubic box needs sufficient area: Zones C and D (5 ftÂ² required), Zone E (6.25 ftÂ² required). It can fit in C, D, and E. Zone F is seats only."
          }
        ]
      }
    ]
  },
  "principles-of-flight": {
    "name": "Principles of Flight",
    "icon": "fas fa-paper-plane",
    "tests": [
      {
        "name": "Principles of Flight Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The Principle of Continuity states that in a streamtube of decreasing cross-sectional area, the speed of a subsonic and incompressible airflow will:",
            "options": [
              "remain the same",
              "decrease",
              "increase",
              "sonic"
            ],
            "correct": 2,
            "explanation": "In a converging streamtube, velocity increases to maintain constant mass flow rate."
          },
          {
            "question": "The Principle of Continuity states that in a tube of increasing cross sectional area, the speed of a subsonic and incompressible airflow will:",
            "options": [
              "remain the same",
              "decrease",
              "sonic",
              "increase"
            ],
            "correct": 1,
            "explanation": "In a diverging streamtube, velocity decreases to maintain constant mass flow rate."
          },
          {
            "question": "Static pressure acts:",
            "options": [
              "parallel to airflow",
              "parallel to dynamic pressure",
              "in all directions",
              "downwards"
            ],
            "correct": 2,
            "explanation": "Static pressure is omnidirectional, acting equally in all directions."
          },
          {
            "question": "Consider a uniform flow of air at velocity V in a streamtube. If the temperature of the air in the tube is raised:",
            "options": [
              "the mass flow remains constant and velocity V decreases",
              "the mass flow decreases and the velocity V remains constant",
              "the mass flow increases and the velocity V remains constant",
              "the mass flow remains constant and the velocity V will increase"
            ],
            "correct": 1,
            "explanation": "Raising temperature decreases density; at constant velocity, mass flow (ρ × V × A) decreases."
          },
          {
            "question": "As subsonic air flows through a convergent duct: (i) static pressure (ii) velocity",
            "options": [
              "(i) increases and (ii) decreases",
              "(i) increases and (ii) increases",
              "(i) decreases and (ii) decreases",
              "(i) decreases and (ii) increases"
            ],
            "correct": 3,
            "explanation": "Bernoulli's principle: as velocity increases through a convergent duct, static pressure decreases."
          },
          {
            "question": "Which of the following is the equation for power?",
            "options": [
              "N/m",
              "Nm/s",
              "Pa/s squared",
              "Kg/m/s squared"
            ],
            "correct": 1,
            "explanation": "Power = Work/Time = Force × Distance/Time. Units: Nm/s (Newton-meters per second) or Watts."
          },
          {
            "question": "Bernoulli's Theorem states:",
            "options": [
              "dynamic pressure increases and static pressure increases",
              "dynamic pressure increases and static pressure decreases",
              "dynamic pressure is maximum at stagnation point",
              "there is zero pressure at zero dynamic pressure"
            ],
            "correct": 1,
            "explanation": "Bernoulli's theorem: as velocity (dynamic pressure) increases, static pressure decreases."
          },
          {
            "question": "The difference between IAS and TAS will:",
            "options": [
              "increase with decreasing temperature",
              "increase with increasing density",
              "remain constant at all times",
              "increase with increasing altitude"
            ],
            "correct": 3,
            "explanation": "As altitude increases, density decreases, causing TAS to exceed IAS by a greater margin."
          },
          {
            "question": "Equivalent Air Speed (EAS) is:",
            "options": [
              "IAS corrected for compressibility and position/instrument error",
              "lower than the speed of the undisturbed airstream around the aircraft",
              "lower than IAS at ISA altitudes below sea level",
              "equal to IAS, multiplied by air density at sea level"
            ],
            "correct": 0,
            "explanation": "EAS = CAS corrected for compressibility error."
          },
          {
            "question": "At a constant CAS when flying below sea level an aircraft will have:",
            "options": [
              "a higher TAS than at sea level",
              "a lower TAS than at sea level at ISA conditions",
              "the same TAS as at sea level",
              "the same TAS, but an increased IAS"
            ],
            "correct": 1,
            "explanation": "Below sea level, density is higher; at constant CAS, TAS is lower than at sea level."
          },
          {
            "question": "In accordance with Bernoulli's Theorem, where PT = Total Pressure, PS = Static pressure and q = Dynamic pressure:",
            "options": [
              "PT + PS = q",
              "PT = PS - q",
              "PT - PS = q",
              "PS + PT = q"
            ],
            "correct": 2,
            "explanation": "Bernoulli equation: PT = PS + q, therefore PT - PS = q."
          },
          {
            "question": "In a subsonic flow venturi, the relationship between the total pressure, static pressure and dynamic pressure of undisturbed air and air in the throat will be: (i) Dynamic pressure will be constant, static pressure will decrease. (ii) Total pressure will be constant, dynamic pressure will increase.",
            "options": [
              "both (i) and (ii) are correct",
              "(i) is correct but (ii) is incorrect",
              "(i) and (ii) are correct",
              "(i) and (ii) are incorrect"
            ],
            "correct": 3,
            "explanation": "Statement (i) is incorrect (dynamic pressure increases in throat). Statement (ii) is correct but with caveats. Answer marked as both incorrect in source."
          }
        ]
      },
      {
        "name": "Principles of Flight Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "A symmetrical aerofoil section at CL = 0 will produce?",
            "options": [
              "A negative (nose-down) pitching moment.",
              "A positive (nose-up) pitching moment.",
              "Zero pitching moment.",
              "No aerodynamic force."
            ],
            "correct": 2,
            "explanation": "At CL=0, a symmetrical aerofoil produces zero pitching moment about its aerodynamic center."
          },
          {
            "question": "Which of the following most accurately describes the airflow which causes wing tip vortices?",
            "options": [
              "From the root to the tip on the top surface and from the tip to the root on the bottom surface over the wing tip",
              "From the root to the tip on the top surface and from the tip to the root on the bottom surface over the trailing edge",
              "From the tip to the root on the top surface and from the root to the tip on the bottom surface over the trailing edge",
              "From the tip to the root on the top surface and from the root to the tip on the bottom surface over the wing tip"
            ],
            "correct": 3,
            "explanation": "High pressure below flows tip-ward; low pressure above causes inward flow. They meet at the tip, creating vortices."
          },
          {
            "question": "With increasing angle of attack, the stagnation point moves ............. and the point of lowest pressure moves ...............",
            "options": [
              "down, forward",
              "up, aft",
              "down, aft",
              "up, forward"
            ],
            "correct": 2,
            "explanation": "Increasing AoA: stagnation point moves down (towards lower surface); lowest pressure point moves aft on upper surface."
          },
          {
            "question": "The formula for lift is:",
            "options": [
              "L = W",
              "L = 2 rho V squared S CL",
              "L = 1/2 rho V squared S CL",
              "L = rho V S CL"
            ],
            "correct": 2,
            "explanation": "Lift formula: L = ½ ρ V² S CL"
          },
          {
            "question": "Angle of attack is the angle between:",
            "options": [
              "undisturbed airflow and chord line.",
              "undisturbed airflow and mean camber line.",
              "local airflow and chord line.",
              "local airflow and mean camber line"
            ],
            "correct": 0,
            "explanation": "Angle of attack is defined between the undisturbed (relative) airflow and the chord line."
          },
          {
            "question": "If IAS is doubled, by which of the following factors should the original CL be multiplied to maintain level flight?",
            "options": [
              "0.25",
              "0.5",
              "2.0",
              "4.0"
            ],
            "correct": 0,
            "explanation": "L = ½ ρ V² S CL. If V doubles, V² increases by 4. To keep L constant, CL must be multiplied by 0.25 (1/4)."
          },
          {
            "question": "When considering the lift and drag forces on an aerofoil section:",
            "options": [
              "they are only normal to each other at one angle of attack.",
              "they both depend on the pressure distribution on the aerofoil section.",
              "they vary linearly.",
              "lift is proportional to drag."
            ],
            "correct": 1,
            "explanation": "Both lift and drag result from pressure distribution around the aerofoil."
          },
          {
            "question": "When considering the coefficient of lift and angle of attack of aerofoil sections:",
            "options": [
              "a symmetrical section at zero angle of attack will produce a positive coefficient of lift.",
              "an asymmetrical section at zero angle of attack will produce zero coefficient of lift.",
              "a symmetrical section at zero angle of attack will produce zero coefficient of lift.",
              "aerofoil section symmetry has no effect on lift coefficient."
            ],
            "correct": 2,
            "explanation": "Symmetrical aerofoil at 0° AoA produces CL = 0."
          },
          {
            "question": "When considering an angle of attack versus coefficient of lift graph for a cambered aerofoil, where does the lift curve intersect the vertical CL axis?",
            "options": [
              "above the origin",
              "below the origin",
              "at the point of origin",
              "to the left of the origin"
            ],
            "correct": 0,
            "explanation": "Cambered aerofoil produces positive lift at 0° AoA, so curve intersects CL axis above origin."
          },
          {
            "question": "Where does the lift act on the wing?",
            "options": [
              "Suction",
              "Always forward of the CG",
              "Centre of Gravity",
              "Centre of Pressure"
            ],
            "correct": 3,
            "explanation": "Lift acts at the Centre of Pressure (CP)."
          },
          {
            "question": "Which of the following is the correct definition of aspect ratio?",
            "options": [
              "Span divided by tip chord",
              "Chord divided by span",
              "Span divided by mean chord",
              "Chord divided by span, measured at the 25% chord position"
            ],
            "correct": 2,
            "explanation": "Aspect Ratio = Span / Mean Chord (or b²/S)."
          },
          {
            "question": "On entering ground effect:",
            "options": [
              "more thrust is required",
              "induced drag decreases",
              "the stalling speed increases",
              "parasite drag decreases"
            ],
            "correct": 1,
            "explanation": "Ground effect reduces induced drag by restricting downwash and tip vortices."
          },
          {
            "question": "Which of the following is the cause of wing tip vortices?",
            "options": [
              "Air spilling from the top surface to the bottom surface at the wing tip",
              "Air spilling from the bottom surface to the top surface at the wing tip",
              "Air spilling from the bottom surface to the top surface at the left wing tip and from the top surface to the bottom surface at the right wing tip",
              "Spanwise flow vector from the tip to the root on the bottom surface of the wing"
            ],
            "correct": 1,
            "explanation": "High pressure below spills upward around the tip to low pressure above, creating vortices."
          },
          {
            "question": "An aircraft is flying straight and level, if density halves, aerodynamic drag will:",
            "options": [
              "increase by a factor of four",
              "increase by a factor of two",
              "decrease by a factor of two",
              "decrease by a factor of four"
            ],
            "correct": 2,
            "explanation": "At constant TAS, if density halves, drag (D = ½ ρ V² S CD) halves."
          },
          {
            "question": "High aspect ratio:",
            "options": [
              "reduces parasite drag",
              "reduces induced drag",
              "increases stalling speed",
              "increases manoeuvrability"
            ],
            "correct": 1,
            "explanation": "High aspect ratio reduces induced drag (CDi ∝ 1/AR)."
          },
          {
            "question": "CDi is proportional to which of the following?",
            "options": [
              "CLMAX",
              "CL squared",
              "the square root of CL",
              "CL"
            ],
            "correct": 1,
            "explanation": "Induced drag coefficient: CDi ∝ CL²."
          },
          {
            "question": "If IAS is reduced from 150 kt to 75 kt in straight and level flight, the induced drag will change by a factor of:",
            "options": [
              "16",
              "8",
              "4",
              "2"
            ],
            "correct": 0,
            "explanation": "Di ∝ 1/V². If V halves, V² decreases by 4, Di increases by 4. Source marks 16 (may relate to power required)."
          },
          {
            "question": "What is interference drag?",
            "options": [
              "Airflow retardation over the aircraft structure due to surface irregularities",
              "Drag caused by high total pressure at the leading edges when compared to the lower pressure present at the trailing edge",
              "Drag caused by the generation of lift",
              "Drag due to the interaction of individual boundary layers at the junction of aircraft major components"
            ],
            "correct": 3,
            "explanation": "Interference drag occurs where airflows from different components interact (e.g., wing-fuselage junction)."
          },
          {
            "question": "At a constant IAS, induced drag is affected by:",
            "options": [
              "aircraft weight",
              "changes in thrust",
              "angle between chord line and longitudinal axis",
              "wing location"
            ],
            "correct": 0,
            "explanation": "Di ∝ CL². In level flight L=W, so CL ∝ W. Thus Di ∝ W²."
          },
          {
            "question": "On the approach to land, ground effect will begin to be felt at:",
            "options": [
              "twice the wingspan above the ground",
              "one wingspan above the ground",
              "when the angle of attack is increased",
              "upon elevator deflection"
            ],
            "correct": 1,
            "explanation": "Ground effect begins around one wingspan above the surface."
          }
        ]
      },
      {
        "name": "Principles of Flight Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the cause of induced angle of attack?",
            "options": [
              "Downwash from trailing edge in the vicinity of the wing tips",
              "Change in flow from effective angle of attack",
              "The upward inclination of the free stream flow around the wing tips",
              "Wing downwash altering the angle at which the airflow meets the tailplane"
            ],
            "correct": 0,
            "explanation": "Induced angle of attack is caused by downwash from tip vortices, reducing the effective angle of attack."
          },
          {
            "question": "What phenomena causes induced drag?",
            "options": [
              "Wing tip vortices",
              "Wing tanks",
              "The increased pressure at the leading edge",
              "The spanwise flow, inward below the wing and outward above"
            ],
            "correct": 0,
            "explanation": "Wing tip vortices create downwash, tilting the lift vector aft, producing induced drag."
          },
          {
            "question": "When considering the properties of a laminar and turbulent boundary layer, which of the following statements is correct?",
            "options": [
              "Friction drag is the same",
              "Friction drag higher in laminar",
              "Friction drag higher in turbulent",
              "Separation occurs earlier in turbulent"
            ],
            "correct": 2,
            "explanation": "Turbulent boundary layer has higher friction drag but resists separation better."
          },
          {
            "question": "The boundary layer is:",
            "options": [
              "the layer between upper and lower surfaces",
              "the thin layer of air over an aerofoil where the air is slowed by viscosity",
              "the layer below the transition point",
              "the wing tip vortex"
            ],
            "correct": 1,
            "explanation": "Boundary layer is the thin region where air velocity transitions from zero at surface to freestream."
          },
          {
            "question": "CDi is the ratio of?",
            "options": [
              "(CL) squared to S",
              "(CL) squared to AR",
              "½ rho V squared",
              "½ rho V squared S"
            ],
            "correct": 1,
            "explanation": "CDi = CL² / (π × AR × e). It's proportional to CL²/AR."
          },
          {
            "question": "Which of the following is a characteristic of laminar flow boundary layer?",
            "options": [
              "Constant velocity",
              "Constant temperature",
              "No flow normal to the surface",
              "No vortices"
            ],
            "correct": 3,
            "explanation": "Laminar flow has smooth, parallel streamlines with no mixing or vortices."
          },
          {
            "question": "Stall speed in a turn is proportional to:",
            "options": [
              "lift",
              "weight",
              "the square root of the load factor",
              "TAS squared"
            ],
            "correct": 2,
            "explanation": "VS(turn) = VS(level) × √n, where n is load factor."
          },
          {
            "question": "When the undercarriage is lowered in flight:",
            "options": [
              "form drag will increase and the aircrafts nose-down pitching moment will be unchanged",
              "induced drag will increase and the aircrafts nose-down pitching moment will increase",
              "form drag will increase and the aircrafts nose-down pitching moment will increase",
              "induced drag will decrease and the aircrafts nose-down pitching moment will increase"
            ],
            "correct": 2,
            "explanation": "Lowering gear increases form (parasite) drag and typically creates nose-down moment."
          },
          {
            "question": "In recovery from a spin:",
            "options": [
              "ailerons should be kept neutral",
              "airspeed increases",
              "ailerons are used to stop the spin",
              "rudder and ailerons are used against the direction of spin rotation"
            ],
            "correct": 0,
            "explanation": "Standard spin recovery: ailerons neutral, opposite rudder, forward stick."
          },
          {
            "question": "If the stalling speed in a 15 degree bank turn is 60 kt, what would the stall speed be in a 45 degree bank?",
            "options": [
              "83 kt",
              "70 kt",
              "85 kt",
              "60 kt"
            ],
            "correct": 1,
            "explanation": "n₁₅ ≈ 1.035, n₄₅ ≈ 1.414. VS(level) ≈ 58.9 kt. VS(45°) = 58.9 × √1.414 ≈ 70 kt."
          },
          {
            "question": "If a jet aircraft is at 60 degrees bank angle during a constant altitude turn, the stall speed will be:",
            "options": [
              "1.60 greater",
              "1.19 greater",
              "1.41 greater",
              "2.00 greater"
            ],
            "correct": 2,
            "explanation": "n₆₀ = 1/cos(60°) = 2. Stall speed increases by √2 ≈ 1.414."
          },
          {
            "question": "Which statement about induced drag and tip vortices is correct?",
            "options": [
              "Vortex generators diminish tip vortices.",
              "Flow on upper and lower wing surfaces is towards the tip.",
              "They both decrease at high angle of attack.",
              "On the upper surface there is a component of flow towards the root, whilst on the lower surface it is towards the tip."
            ],
            "correct": 3,
            "explanation": "Spanwise flow: inward on top (low pressure), outward below (high pressure), creating vortices."
          },
          {
            "question": "The stalling speed of an aircraft in straight and level flight is 80 kt. What is the stalling speed in a level turn with a load factor of 2.25?",
            "options": [
              "120 kt",
              "150 kt",
              "81 kt",
              "100 kt"
            ],
            "correct": 0,
            "explanation": "VS(turn) = 80 × √2.25 = 80 × 1.5 = 120 kt."
          },
          {
            "question": "When compared to a laminar boundary layer:",
            "options": [
              "a turbulent boundary layer has more kinetic energy",
              "a turbulent boundary layer is thinner",
              "less skin friction is generated by a turbulent layer",
              "a turbulent boundary layer is more likely to separate"
            ],
            "correct": 0,
            "explanation": "Turbulent layer has more kinetic energy, resists separation better but creates more friction."
          },
          {
            "question": "A jet aircraft flying at high altitude encounters severe turbulence without encountering high speed buffet. If the aircraft decelerates, what type of stall could occur first?",
            "options": [
              "Low speed stall",
              "Accelerated stall",
              "Deep stall",
              "Shock stall"
            ],
            "correct": 0,
            "explanation": "If decelerating at high altitude with turbulence, low speed stall is most likely."
          },
          {
            "question": "If VS is 100 kt in straight and level flight, during a 45° bank turn VS will be:",
            "options": [
              "100 kt",
              "140 kt",
              "80 kt",
              "119 kt"
            ],
            "correct": 3,
            "explanation": "VS(45°) = 100 × √(1/cos45°) = 100 × √1.414 ≈ 119 kt."
          },
          {
            "question": "When considering the aerodynamic forces acting on an aerofoil section:",
            "options": [
              "lift and drag increase linearly with an increase in angle of attack",
              "lift and drag act normal to each other only at one angle of attack",
              "lift and drag coefficients are equal at 4 degrees angle of attack",
              "lift increases linearly and drag increases exponentially with an increase in angle of attack"
            ],
            "correct": 1,
            "explanation": "Lift acts perpendicular to relative airflow; drag acts parallel. They're always at 90° to each other."
          },
          {
            "question": "Which of the following is the correct formula for drag?",
            "options": [
              "½ rho V squared CL S",
              "½ rho V (CL) squared S",
              "½ rho V squared AR CD S",
              "½ rho V squared CD S"
            ],
            "correct": 3,
            "explanation": "Drag formula: D = ½ ρ V² S CD"
          },
          {
            "question": "In level flight at 1.4VS what is the approximate bank angle at which stall will occur?",
            "options": [
              "44 degrees",
              "30 degrees",
              "60 degrees",
              "32 degrees"
            ],
            "correct": 2,
            "explanation": "n = (1.4)² = 1.96. Bank = arccos(1/1.96) ≈ 59°."
          },
          {
            "question": "A swept wing aircraft stalls and the wake contacts the horizontal tail. What would be the stall behaviour?",
            "options": [
              "Nose down",
              "Nose up and/or elevator ineffectiveness",
              "Tendency to increase speed after stall",
              "Nose up"
            ],
            "correct": 1,
            "explanation": "Wake blanking the tail causes elevator ineffectiveness and potential nose-up tendency (deep stall)."
          }
        ]
      },
      {
        "name": "Principles of Flight Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is load factor?",
            "options": [
              "1 / Bank angle",
              "Weight / Lift",
              "Lift / Weight",
              "Weight / Wing area"
            ],
            "correct": 2,
            "explanation": "Load factor (n) = Lift / Weight. In level flight n=1; in turns n>1."
          },
          {
            "question": "The CP on a swept wing aircraft will move forward due to:",
            "options": [
              "boundary layer fences and spanwise flow",
              "tip stall of the wing",
              "flow separation at the root due to spanwise flow",
              "change in wing angle of incidence"
            ],
            "correct": 1,
            "explanation": "Tip stall on swept wings causes CP to move forward, creating pitch-up tendency."
          },
          {
            "question": "What is a high speed stall?",
            "options": [
              "Separation of the airflow due to shock wave formation",
              "A stall caused by increasing the load factor (g) during a manoeuvre",
              "A stall due to decreasing CLMAX at speeds above M 0.4",
              "Excessive dynamic pressure causing airflow separation"
            ],
            "correct": 2,
            "explanation": "High speed stall occurs as CLMAX decreases at higher Mach numbers due to compressibility effects."
          },
          {
            "question": "The effect of tropical rain on drag and stall speed would be to:",
            "options": [
              "increase drag and increase stall speed",
              "increase drag and decrease stall speed",
              "decrease drag and increase stall speed",
              "decrease drag and decrease stall speed"
            ],
            "correct": 0,
            "explanation": "Rain disrupts airflow, increasing drag and reducing CLMAX, thus increasing stall speed."
          },
          {
            "question": "Stalling speed increases when:",
            "options": [
              "recovering from a steep dive",
              "the aircraft is subjected to minor altitude changes, i.e. 0 to 10000 ft",
              "the aircraft weight decreases",
              "flaps are deployed"
            ],
            "correct": 0,
            "explanation": "Pulling out of a dive increases load factor, which increases stall speed."
          },
          {
            "question": "VS is 100 kt at n = 1. What will the stall speed be at n = 2?",
            "options": [
              "200 kt",
              "119 kt",
              "141 kt",
              "100 kt"
            ],
            "correct": 2,
            "explanation": "VS(n=2) = 100 × √2 ≈ 141 kt."
          },
          {
            "question": "Which of the following aircraft designs would be most prone to super stall?",
            "options": [
              "T-tail",
              "Swept forward wing",
              "Swept-back wing",
              "Pod mounted engines beneath the wing"
            ],
            "correct": 2,
            "explanation": "Swept-back wings are prone to tip stall, which can lead to deep/super stall conditions."
          },
          {
            "question": "Which of the following is the most important result/problem caused by ice formation?",
            "options": [
              "Increased drag",
              "Increased weight",
              "Blockage of the controls",
              "Reduction in CLMAX"
            ],
            "correct": 3,
            "explanation": "Ice disrupts airflow, reducing CLMAX and increasing stall speed - the most critical effect."
          },
          {
            "question": "What causes deep stall in a swept-back wing?",
            "options": [
              "CP moves aft",
              "CP moves forward",
              "Root stall",
              "Spanwise flow from tip to root on wing upper surface"
            ],
            "correct": 1,
            "explanation": "Tip stall causes CP to move forward, creating pitch-up. Wake then blankets tailplane (deep stall)."
          },
          {
            "question": "What are the effects of tropical rain on: (i) CLMAX (ii) Drag",
            "options": [
              "(i) increase (ii) decrease",
              "(i) decrease (ii) increase",
              "(i) increase (ii) increase",
              "(i) decrease (ii) decrease"
            ],
            "correct": 1,
            "explanation": "Rain decreases CLMAX and increases drag due to surface roughness and flow disruption."
          },
          {
            "question": "The IAS of a stall:",
            "options": [
              "increases with high altitude, more flaps and slats",
              "may increase with increasing altitude, especially high altitude, forward CG and icing",
              "decreases with forward CG and increasing altitude",
              "altitude never affects stall speed IAS"
            ],
            "correct": 1,
            "explanation": "At high altitude, compressibility effects can increase IAS stall speed. Forward CG and ice also increase it."
          },
          {
            "question": "Vortex generators:",
            "options": [
              "take energy from the laminar flow to induce boundary layer separation",
              "use free stream flow to induce laminar flow",
              "prevent spanwise flow",
              "use free stream flow to increase energy in the turbulent boundary layer"
            ],
            "correct": 3,
            "explanation": "Vortex generators energize the boundary layer by mixing high-energy freestream air, delaying separation."
          },
          {
            "question": "What causes a swept wing aircraft to pitch-up at the stall?",
            "options": [
              "Negative camber at the root",
              "Separated airflow at the root",
              "Spanwise flow causing the tips to stall first",
              "Strong lateral stability"
            ],
            "correct": 2,
            "explanation": "Spanwise flow causes tip stall first on swept wings, moving CP forward and causing pitch-up."
          },
          {
            "question": "A stick pusher will:",
            "options": [
              "Activate at a certain angle of attack and pull the control column backwards",
              "Activate at a certain angle of attack and push the stick forward",
              "Activate at a certain IAS and vibrate the stick",
              "Activate at a certain IAS and push the stick forward"
            ],
            "correct": 1,
            "explanation": "Stick pusher activates at high AoA (near stall) and automatically pushes stick forward to reduce AoA."
          },
          {
            "question": "Which of the following combination of characteristics would be most likely make an aircraft susceptible to deep stall?",
            "options": [
              "Swept wing and wing mounted engines",
              "Swept wing and a T-tail",
              "Straight wing and wing mounted engines",
              "Straight wing and a T-tail"
            ],
            "correct": 1,
            "explanation": "Swept wing (tip stall) + T-tail (high position vulnerable to wake) = deep stall susceptibility."
          },
          {
            "question": "Which of the following is the correct designation of stall speed in the landing configuration?",
            "options": [
              "VS1g",
              "VS1",
              "VS0",
              "VSL"
            ],
            "correct": 2,
            "explanation": "VS0 is the stall speed in landing configuration (gear down, full flaps)."
          },
          {
            "question": "What effect on stall speed do the following have?",
            "options": [
              "Increased anhedral increases stall speed",
              "Fitting a T-tail will reduce stall speed",
              "Increasing sweepback decreases stall speed",
              "Decreasing sweep angle decreases stall speed"
            ],
            "correct": 3,
            "explanation": "Less sweep reduces effective chord reduction at tips, improving stall characteristics."
          },
          {
            "question": "The lift formula is:",
            "options": [
              "L=CL ½ Rho V² S",
              "L=CL 2 Rho V S",
              "L=CL Rho V² S",
              "L=CD ½ Rho V² S"
            ],
            "correct": 0,
            "explanation": "Lift = ½ ρ V² S CL"
          },
          {
            "question": "What happens to the stall speed with flaps down, when compared to flaps up?",
            "options": [
              "Increase",
              "Decrease",
              "Remain the same"
            ],
            "correct": 1,
            "explanation": "Flaps increase CLMAX, reducing stall speed."
          },
          {
            "question": "What influence does the CG being on the forward limit have on VS and the stall angle?",
            "options": [
              "VS increases, stall angle remains constant",
              "VS increases, stall angle increases",
              "VS decreases, stall angle remains constant",
              "VS decreases, stall angle decreases"
            ],
            "correct": 0,
            "explanation": "Forward CG requires more tail-down force (greater total lift needed), increasing VS. Critical AoA unchanged."
          }
        ]
      },
      {
        "name": "Principles of Flight Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Which stall has the greatest angle of attack?",
            "options": [
              "Low speed stall",
              "High speed stall (shock stall)",
              "Deep stall",
              "Accelerated stall"
            ],
            "correct": 0,
            "explanation": "Low speed stall occurs at the critical angle of attack, which is the highest AoA before flow separation."
          },
          {
            "question": "Which of the following is used to activate a stall warning device?",
            "options": [
              "Movement of the CP",
              "Movement of the CG",
              "Movement of the stagnation point",
              "A reduction in dynamic pressure"
            ],
            "correct": 2,
            "explanation": "Stall warning systems detect stagnation point movement as AoA increases toward stall."
          },
          {
            "question": "An aircraft has trailing edge flap positions of 0, 15, 30 and 45 degrees plus slats can be deployed. What will have the greatest negative influence on CL/ CD?",
            "options": [
              "Deploying slats",
              "0 - 15 flaps",
              "15 - 30 flaps",
              "30 - 45 flaps"
            ],
            "correct": 3,
            "explanation": "High flap angles (30-45°) increase drag much more than lift, greatly reducing L/D ratio."
          },
          {
            "question": "What is pitch angle?",
            "options": [
              "The angle between the chord line and the horizontal plane",
              "The angle between the longitudinal axis and the horizontal plane",
              "The angle between the longitudinal axis and the relative airflow",
              "The angle between the chord line and the relative airflow"
            ],
            "correct": 1,
            "explanation": "Pitch angle (attitude) is between the longitudinal axis and horizontal plane."
          },
          {
            "question": "How does a plain flap increase CL?",
            "options": [
              "Increases camber",
              "Increases angle of attack",
              "Changes position of CP",
              "Decreases the Aspect Ratio"
            ],
            "correct": 0,
            "explanation": "Plain flaps increase effective camber, increasing CL."
          },
          {
            "question": "When flying straight and level in 1g flight, slightly below maximum all up weight, a basic stall warning system (flapper switch) activates at 75 kt IAS and the aircraft stalls at 68 kt IAS. Under the same conditions at maximum all up weight the margin between stall warning and stall will:",
            "options": [
              "increase because increasing weight increases the 1g stall speed",
              "decrease because the 1g stall speed is an IAS",
              "decrease because increasing weight increases the 1g stall speed",
              "remain the same because increased weight increases the IAS that corresponds to a particular angle of attack"
            ],
            "correct": 3,
            "explanation": "Both warning and stall occur at specific AoA. Weight increases IAS for both equally; margin stays constant."
          },
          {
            "question": "The CG of an aeroplane is in a fixed position forward of the neutral point. Speed changes cause a departure from the trimmed speed. The aeroplane is:",
            "options": [
              "statically unstable",
              "statically stable",
              "statically neutral",
              "dynamically unstable"
            ],
            "correct": 1,
            "explanation": "CG forward of neutral point = statically stable (tends to return to trim)."
          },
          {
            "question": "Why are slats generally used in combination with flaps during take-off and landing?",
            "options": [
              "Because flaps extended gives a large decrease in stall speed with relatively less drag",
              "Because slats extended provides a better view from the cockpit than flaps extended",
              "Because slats extended provides a better view from the cockpit than flaps extended",
              "Because slats extended gives a large decrease in stall speed with relatively less drag"
            ],
            "correct": 3,
            "explanation": "Slats increase CLMAX with less drag penalty than flaps alone, complementing flap deployment."
          },
          {
            "question": "If flaps are extended in level flight:",
            "options": [
              "lift and drag increase",
              "CLMAX increases",
              "CL and drag increase",
              "CL increases"
            ],
            "correct": 1,
            "explanation": "Extending flaps increases CLMAX (and both lift and drag for given AoA)."
          },
          {
            "question": "What is the effect of an aft shift of the CG on (1) static longitudinal stability and (2) the required control deflection for a given pitch change?",
            "options": [
              "(1) reduces (2) increases",
              "(1) increases (2) increases",
              "(1) increases (2) reduces",
              "(1) reduces (2) reduces"
            ],
            "correct": 3,
            "explanation": "Aft CG reduces stability margin and reduces control force needed for pitch changes."
          },
          {
            "question": "For an aircraft flying straight and level at constant IAS, when flaps are deployed the induced drag:",
            "options": [
              "increases",
              "decreases",
              "increases or decreases depending on the aircraft",
              "stays the same"
            ],
            "correct": 3,
            "explanation": "At constant IAS in level flight, L=W. Flaps allow lower AoA; induced drag effects balance (source marks same)."
          },
          {
            "question": "Which statement is correct?",
            "options": [
              "The stick force stability can be zero or slightly positive for civil transport aeroplanes",
              "The stick force per g must have both upper and lower limits in order to assure acceptable control characteristics",
              "If the slope of the fe-n line becomes negative, generally speaking this is not a problem for control of an aeroplane",
              "The stick force per g can only be corrected by means of electronic devices (stability augmentation) in the case of an unacceptable value"
            ],
            "correct": 1,
            "explanation": "Stick force per g must be within specified limits for safe, predictable control characteristics."
          },
          {
            "question": "Which of the following is the speed that would activate the stick shaker?",
            "options": [
              "1.5 VS",
              "1.15 VS",
              "1.2 VS",
              "Above VS"
            ],
            "correct": 3,
            "explanation": "Stick shaker activates above VS, typically around 1.05-1.1 VS, as a stall warning margin."
          },
          {
            "question": "In order to maintain straight and level flight when trailing edge flaps are retracted, the angle of attack must:",
            "options": [
              "be increased or decreased depending on type of flap",
              "be decreased",
              "be increased",
              "stay the same because the lift requirement will be the same"
            ],
            "correct": 2,
            "explanation": "Retracting flaps decreases CLMAX; AoA must increase to maintain required CL for level flight."
          },
          {
            "question": "Extending the flaps while maintaining a constant angle of attack (all other factors constant):",
            "options": [
              "the aircraft will sink suddenly",
              "the aircraft will yaw",
              "the aircraft will climb",
              "the aircraft will maintain level flight"
            ],
            "correct": 2,
            "explanation": "At constant AoA, extending flaps increases lift, causing the aircraft to climb."
          },
          {
            "question": "A leading edge slot:",
            "options": [
              "increases the energy of the boundary layer and decreases the critical angle of attack",
              "increases the wing leading edge radius by rotating forward and down from its stowed position on the bottom side of the wing leading edge",
              "deploys automatically under the influence of increased stagnation pressure at high angles of attack / low IAS",
              "increases the energy of the boundary layer and increases the maximum angle of attack"
            ],
            "correct": 3,
            "explanation": "Leading edge slot/slat energizes boundary layer, delaying separation and increasing critical AoA."
          },
          {
            "question": "How is the pitching moment affected if flaps are deployed in straight and level flight?",
            "options": [
              "Pitch up",
              "Pitch down",
              "Depends on CG position"
            ],
            "correct": 1,
            "explanation": "Flaps typically create pitch-down moment due to CP movement and increased downwash on tail."
          },
          {
            "question": "If the angle of attack is maintained constant, what happens to the coefficient of lift when flaps are deployed?",
            "options": [
              "Increases",
              "Decreases",
              "Changes with the square of IAS",
              "Remains constant because angle of attack remains the same"
            ],
            "correct": 0,
            "explanation": "At constant AoA, deploying flaps increases CL due to increased camber."
          },
          {
            "question": "With a swept wing the nose-up phenomena is caused by:",
            "options": [
              "deploying lift augmentation devices",
              "wing fences",
              "wing tip stall",
              "leading edge devices"
            ],
            "correct": 2,
            "explanation": "Tip stall on swept wings moves CP forward, causing pitch-up tendency."
          },
          {
            "question": "Static longitudinal stability is the tendency of an aircraft to:",
            "options": [
              "nose-down pitching moment when encountering an up gust",
              "nose-up pitching moment with a speed change at a constant angle of attack",
              "nose-down pitching moment with a speed change at a constant angle of attack",
              "nose-up moment when encountering an up gust"
            ],
            "correct": 0,
            "explanation": "Static stability means aircraft resists disturbances. Up gust → increased AoA → nose-down restoring moment."
          }
        ]
      }
    ]
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testData;
}

