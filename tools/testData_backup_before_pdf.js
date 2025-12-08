// Aviation Test Data - Clean State
// Generated: 2025-11-07T00:30:00.000Z

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
        ]
      },
      {
        "name": "Instrumentation Test 2",
        "timeLimit": 60,
        "questions": []
      },
      {
        "name": "Instrumentation Test 3",
        "timeLimit": 60,
        "questions": []
      },
      {
        "name": "Instrumentation Test 4",
        "timeLimit": 60,
        "questions": []
      },
      {
        "name": "Instrumentation Test 5",
        "timeLimit": 60,
        "questions": []
      },
      {
        "name": "Instrumentation - 617 Import",
        "timeLimit": 180,
        "questions": []
      }
    ]
  },
  "meteorology": {
    "name": "Meteorology",
    "icon": "fas fa-cloud",
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
            "explanation": ""
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
            "explanation": ""
          },
          {
            "question": "The significance of lenticular cloud is:",
            "options": [
              "there may be mountain waves present and there will be severe turbulence",
              "there are mountain waves present but they may not give severe turbulence",
              "a Föhn wind can be expected with no turbulence",
              "a katabatic wind is present which may lead to fog in the valleys"
            ],
            "correct": 1,
            "explanation": ""
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
            "explanation": "Wind generally backs and decreases closer to the surface. If approaching, the crosswind relative to the runway might increase depending on the wind direction change, but the overall wind speed decreases. The checkmark is on C."
          },
          {
            "question": "Mountain waves can occur:",
            "options": [
              "up to a maximum of 5000 ft above the mountains and 50 NM to 100 NM downwind",
              "up to mountain height only and 50 NM to 100 NM downwind",
              "above the mountain and downwind up to a maximum height at the tropopause and 50 NM to 100 NM downwind.",
              "in the stratosphere and troposphere"
            ],
            "correct": 3,
            "explanation": ""
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
            "explanation": ""
          },
          {
            "question": "Flight conditions at B1 are likely to be:",
            "options": [
              "smooth",
              "turbulent",
              "turbulent in breaking wave crests",
              "turbulent due to marked up and down currents [cite: 3423]"
            ],
            "correct": 3,
            "explanation": ""
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
            "explanation": ""
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
            "explanation": ""
          },
          {
            "question": "The most extreme turbulence can occur:",
            "options": [
              "at B1 [cite: 3426]",
              "at A2",
              "at ABC 4",
              "at B2, 3, 4 and at C2, 3, 4"
            ],
            "correct": 0,
            "explanation": "(B1 typically represents the rotor zone)."
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
            "explanation": "(On the cold air side/polar side of the jet core)."
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
            "explanation": ""
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
            "explanation": "(Flying low on the lee side puts the aircraft in the region of strong downdrafts and rotors)."
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
            "explanation": "(The question seems incomplete, likely asking about minimum jet stream core speed for significant CAT. 50kt is often cited as a lower threshold)."
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
            "explanation": ""
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
            "explanation": ""
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
            "explanation": "(ABC 4 represents the upper troposphere/tropopause level where jet streams are found)."
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
            "explanation": "(Requires wind roughly perpendicular (>30 deg) to the range, speed > 15-20 kts at ridge height, and increasing speed with height, within a stable layer)."
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
            "explanation": ""
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
            "explanation": "(Flying near FL250 (~25000ft) might place the aircraft near the tropopause where wave amplitude can be large, especially if lenticular clouds indicate strong wave activity below)."
          }
        ]
      },
      {
        "name": "Meteorology - 617 Import",
        "timeLimit": 180,
        "questions": []
      }
    ]
  },
  "aircraft-performance": {
    "name": "Aircraft Performance",
    "icon": "fas fa-plane",
    "tests": [
      {
        "name": "Performance Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "An increase in mass with an increase in runway length available will:",
            "options": [
              "A. have no effect",
              "B. require a decrease in the mass",
              "C. allow an increase in the mass",
              "D. decrease the TODR"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "In climb limited mass calculations, the climb gradient is a ratio of:",
            "options": [
              "A. height gained over distance travelled through the air",
              "B. height gained over distance travelled across the ground",
              "C. TAS over rate of climb",
              "D. TGS over rate of climb"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The main reason for using the step climb technique is to:",
            "options": [
              "A. decrease sector times",
              "B. increase endurance",
              "C. adhere to ATC procedures",
              "D. increase range"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The effect of a headwind component on glide range is:",
            "options": [
              "A. the range will increase",
              "B. the range will not be affected",
              "C. the range will decrease",
              "D. the range will only be affected if incorrect speeds are flown"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "When operating with anti-skid inoperative:",
            "options": [
              "A. both landing and performance will be affected",
              "B. only landing performance will be affected",
              "C. only take-off performance will be affected",
              "D. neither will be affected"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Flying at an altitude close to coffin corner gives:",
            "options": [
              "A. max speed",
              "B. less manoeuvrability",
              "C. greater 1 engine inoperative range",
              "D. greater 1 engine inoperative endurance"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What effect does a downhill slope have on the take-off speeds?",
            "options": [
              "A. It has no effect on V1",
              "B. It decreases V1",
              "C. It increases V1",
              "D. It increases the IAS for take-off"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The second segment of climb ends when:",
            "options": [
              "A. accelerating from V2 to flap retraction speed begins",
              "B. the landing gear is fully retracted",
              "C. flap retraction begins",
              "D. the flaps are fully retracted"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Reference point zero refers to the:",
            "options": [
              "A. point where the aircraft lifts of the ground",
              "B. point where the aircraft reaches V2",
              "C. point where the aircraft reaches 35 ft",
              "D. point where gear is selected up"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Vref for a Class B aircraft is defined by:",
            "options": [
              "A. 1.3Vs",
              "B. 1.2Vs",
              "C. 1.3Vmcl",
              "D. 1.2Vmcl"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "During the certification of an aeroplane, the take-off distance with all engines operating and the take-off distance with one engine inoperative are: 1547 m, 1720 m. What is the distance used in the aircraft certification?",
            "options": [
              "A. 1547 m",
              "B. 1779 m",
              "C. 1720 m",
              "D. 1798 m"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "An aircraft is certified to land with flaps at either 25 or 35 degrees of flap. If the pilot selects the higher flap setting the approach performance will be:",
            "options": [
              "A. improved landing distance and improved go-around performance",
              "B. improved landing distance and reduced go-around performance",
              "C. reduced landing distance and improved go-around performance",
              "D. reduced landing distance and reduced go-around performance"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What landing distance requirements need to be met at an alternate airfield compared to a destination airfield for a turboprop?",
            "options": [
              "A. Less than destination",
              "B. More than destination",
              "C. Same as destination",
              "D. None applicable"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "In dry conditions, when landing at an alternate airport in a turbojet by what factor should the landing distance available be divided to give landing distance required?",
            "options": [
              "A. 0.6",
              "B. 1.0",
              "C. 1.67",
              "D. 1.43"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The speed for minimum power required in a turbojet will be:",
            "options": [
              "A. slower than the speed for minimum drag",
              "B. faster than the speed for minimum drag",
              "C. slower in a climb and faster in the decent",
              "D. same as speed for minimum drag"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The coefficient of lift may be increased by lowering the flaps or:",
            "options": [
              "A. increasing CAS",
              "B. reducing nose-up elevator deflection",
              "C. increasing angle of attack",
              "D. increasing engine thrust"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "V2min is determined by: (excluding VMCA)",
            "options": [
              "A. 1.08VSR for 4 engine turboprops with 1.13VSR for 2 and 3 engine turboprops.",
              "B. 1.2VS for all turbojets",
              "C. 1.2VSR for all turboprops and 1.15VSR for all turbojets",
              "D. 1.15VS for all aeroplanes"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Two identical turbojets are holding at the same altitude and have the same specific fuel consumption. Aeroplane 1 weighs 130,000 kg and fuel flow is 4300 kg/hr. If aeroplane 2 weighs 115,000 kg what is the fuel flow of aeroplane 2?",
            "options": [
              "A. 3804 kg/hr",
              "B. 4044 kg/hr",
              "C. 3364 kg/hr",
              "D. 3530 kg/hr"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "In wet conditions, what extra percentage over the dry gross landing distance must be available for a turbojet?",
            "options": [
              "A. 43%",
              "B. 92%",
              "C. 67%",
              "D. 15%"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Vr for a jet aircraft must be faster than, the greater of:",
            "options": [
              "A. 1.05VMCA and V1",
              "B. VMCA and 1.1V1",
              "C. VMBE and V1",
              "D. V1 and 1.1VMCA"
            ],
            "correct": 0,
            "explanation": ""
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
              "A. increase landing distance",
              "B. decrease landing distance",
              "C. not affect the landing distance",
              "D. give a slightly reduced landing distance, due to increased impingement drag"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which conditions are most suited to a selection of lower flap for take off?",
            "options": [
              "A. Low airfield elevation, close obstacles, long runway, high temperature",
              "B. Low airfield elevation, no obstacles, short runway, low temperature",
              "C. High elevation, no obstacles, short runway, low temperature",
              "D. High airfield elevations, distant obstacles, long runway, high ambient temperature"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The buffet onset boundary chart tells the pilot the:",
            "options": [
              "A. critical Mach number for various masses and altitudes",
              "B. values for low speed stall and Mach buffet onset for various masses and altitudes",
              "C. values for low speed buffet onset and high speed buffet onset for various masses and altitudes",
              "D. VNE for various masses and altitudes"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The second segment of climb ends when:",
            "options": [
              "A. accelerating from V2 to flap retraction speed begins",
              "B. the landing gear is fully retracted",
              "C. flap retraction begins",
              "D. the flaps are fully retracted"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Reference point zero refers to the:",
            "options": [
              "A. point where the aircraft lifts of the ground",
              "B. point where the aircraft reaches V2",
              "C. point where the aircraft reaches 35 ft",
              "D. point where gear is selected up"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Vref for a Class B aircraft is defined by:",
            "options": [
              "A. 1.3Vs",
              "B. 1.2Vs",
              "C. 1.3Vmcl",
              "D. 1.2Vmcl"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "During the certification of an aeroplane, the take-off distance with all engines operating and the take-off distance with one engine inoperative are: 1547 m, 1720 m. What is the distance used in the aircraft certification?",
            "options": [
              "A. 1547 m",
              "B. 1779 m",
              "C. 1720 m",
              "D. 1798 m"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "An aircraft is certified to land with flaps at either 25 or 35 degrees of flap. If the pilot selects the higher flap setting the approach performance will be:",
            "options": [
              "A. improved landing distance and improved go-around performance",
              "B. improved landing distance and reduced go-around performance",
              "C. reduced landing distance and improved go-around performance",
              "D. reduced landing distance and reduced go-around performance"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What landing distance requirements need to be met at an alternate airfield compared to a destination airfield for a turboprop?",
            "options": [
              "A. Less than destination",
              "B. More than destination",
              "C. Same as destination",
              "D. None applicable"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "In dry conditions, when landing at an alternate airport in a turbojet by what factor should the landing distance available be divided to give landing distance required?",
            "options": [
              "A. 0.6",
              "B. 1.0",
              "C. 1.67",
              "D. 1.43"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The speed for minimum power required in a turbojet will be:",
            "options": [
              "A. slower than the speed for minimum drag",
              "B. faster than the speed for minimum drag",
              "C. slower in a climb and faster in the decent",
              "D. same as speed for minimum drag"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The coefficient of lift may be increased by lowering the flaps or:",
            "options": [
              "A. increasing CAS",
              "B. reducing nose-up elevator deflection",
              "C. increasing angle of attack",
              "D. increasing engine thrust"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "V2min is determined by: (excluding VMCA)",
            "options": [
              "A. 1.08VSR for 4 engine turboprops with 1.13VSR for 2 and 3 engine turboprops.",
              "B. 1.2VS for all turbojets",
              "C. 1.2VSR for all turboprops and 1.15VSR for all turbojets",
              "D. 1.15VS for all aeroplanes"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Two identical turbojets are holding at the same altitude and have the same specific fuel consumption. Aeroplane 1 weighs 130,000 kg and fuel flow is 4300 kg/hr. If aeroplane 2 weighs 115,000 kg what is the fuel flow of aeroplane 2?",
            "options": [
              "A. 3804 kg/hr",
              "B. 4044 kg/hr",
              "C. 3364 kg/hr",
              "D. 3530 kg/hr"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "In wet conditions, what extra percentage over the dry gross landing distance must be available for a turbojet?",
            "options": [
              "A. 43%",
              "B. 92%",
              "C. 67%",
              "D. 15%"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If the flap setting is changed from 10 degrees to 20 degrees, V2 will:",
            "options": [
              "A. not change",
              "B. decrease if not limited to VMCA.",
              "C. increase",
              "D. increase or decrease depending on weight"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "For a turbojet aeroplane the third segment of the take-off path:",
            "options": [
              "A. ends when flap retraction is complete",
              "B. the landing gear is fully retracted",
              "C. acceleration from VLOF to V2 begins",
              "D. the flaps are fully retracted"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "To maintain the same angle of attack and altitude at a higher gross weight an aeroplane needs:",
            "options": [
              "A. less airspeed and same power",
              "B. the same airspeed",
              "C. more airspeed and less power",
              "D. more airspeed and more power"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Absolute ceiling is defined by:",
            "options": [
              "A. altitude where theoretical rate of climb is zero",
              "B. altitude at which rate of climb is 100 fpm",
              "C. altitude obtained when using lowest steady fight speed",
              "D. altitude where low speed buffet and high-speed buffet speeds are coincident"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Vr for a jet aircraft must be faster than, the greater of:",
            "options": [
              "A. 1.05VMCA and V1",
              "B. VMCA and 1.1V1",
              "C. VMBE and V1",
              "D. V1 and 1.1VMCA"
            ],
            "correct": 0,
            "explanation": ""
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
              "A. Flaps at high settings",
              "B. With high pressure",
              "C. With low temperature",
              "D. Combination of the above"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A jet aircraft's maximum altitude is usually limited by:",
            "options": [
              "A. its certification maximum altitude",
              "B. its pressurization maximum altitude",
              "C. the altitude at which low and high-speed buffet will occur",
              "D. thrust limits"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A light twin-engine aircraft is climbing from the screen height of 50 ft, and has an obstacle 10000 m along the net fight path. If the net climb gradient is 10%, there is no wind and obstacle is 900 m above the aerodrome elevation then what will the clearance be?",
            "options": [
              "A. The aircraft will not clear the object",
              "B. 85 m",
              "C. 100 m",
              "D. 115 m"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Vx is:",
            "options": [
              "A. Speed for best angle of climb",
              "B. Speed for best rate of climb",
              "C. Speed for obstacle clearance",
              "D. The same"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Requirements for the third segment of climb are:",
            "options": [
              "A. minimum acceleration altitude for one engine inoperative should be used",
              "B. a climb gradient of 5% is required in the third segment",
              "C. level acceleration with an equivalent gradient of 1.2%",
              "D. legal minimum altitude for acceleration is 1500 ft"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Pitch angle during decent at a constant Mach number will:",
            "options": [
              "A. increase",
              "B. decrease",
              "C. increase at first then decrease",
              "D. stay constant"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Take off on a runway with standing water, with a depth of 0.5 cm. Compared to a dry runway, field length limited mass will:",
            "options": [
              "A. increase, with a reduced V1",
              "B. remain the same, with a reduced V1",
              "C. decrease, with an increased V1",
              "D. decrease, with a decreased V1"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "With respect to en-route diversions (using drift down graph), if you believe that you will be overweight at the destination, what procedure should be followed?",
            "options": [
              "A. Continue to destination, use higher flap settings to reduce landing speed",
              "B. Land short at a suitable airfield",
              "C. Declare a PAN",
              "D. Declare a MAYDAY"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the reason for setting minimum speeds on the approach?",
            "options": [
              "A. So that an aircraft falling below the glide path will be able to re-intercept it",
              "B. Adequate performance for a go-around in the event of an engine failure",
              "C. So that the aircraft will not stall when full flap is selected",
              "D. To maintain minimum altitude on the approach"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If there is an increase in atmospheric pressure and all other factors remain constant, it should result in:",
            "options": [
              "A. decreased take-off distance and increased climb performance",
              "B. increased take-off distance and increased climb performance",
              "C. decreased take-off distance and decreased climb performance",
              "D. increased take-off distance and decreased climb performance"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft may use either 5� or 15� flap setting for take-off. The effect of selecting the 5� setting as compared to the 15� setting is:",
            "options": [
              "A. take-off distance and take-off climb gradient will both increase",
              "B. take-off distance and take-off climb gradient will both decrease",
              "C. take-off distance will increase and take-off climb gradient will decrease",
              "D. take-off distance will decrease and take-off climb gradient will increase"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Vs is defined as:",
            "options": [
              "A. Speed for minimum power",
              "B. Speed for minimum thrust",
              "C. The minimum speed in steady flight at which the aeroplane is controllable",
              "D. Stalling speed or minimum steady flight speed in the landing configuration"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A higher climb gradient gives:",
            "options": [
              "A. reduced ground distance covered to climb",
              "B. increased ground distance covered to climb",
              "C. no change in ground distance covered to climb",
              "D. increased ground distance covered to climb"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "A balanced field length is when:",
            "options": [
              "A. distance to accelerate to V1 and distance to stop are identical",
              "B. TORA x 1.5 = TODA",
              "C. V1 = VR",
              "D. ASDA equals TODA"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The drift down is a procedure applied:",
            "options": [
              "A. after aircraft depressurization",
              "B. for a visual approach to a VASI",
              "C. for an instrument approach at an airfield without an ILS",
              "D. when the engine fails above the operating altitude for one engine inoperative"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The landing speed, Vref, for a single-engine aircraft must be not less than:",
            "options": [
              "A. 1.2VMCA",
              "B. 1.1Vs0",
              "C. 1.05Vs0",
              "D. 1.3Vs0"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "At maximum range speed in a turbojet the angle of attack is:",
            "options": [
              "A. the same as L/D max",
              "B. less than L/D max",
              "C. maximum",
              "D. more than L/D max"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If not VMBE or VMCG limited, what would V1 be limited by?",
            "options": [
              "A. V2",
              "B. Vmc",
              "C. Vr",
              "D. Vmu"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "With respect to field length limit, fill in the blanks in the follow statement. The distance to accelerate to ............, at which point an engine fails, followed by the reaction time of ............. and the ensuing deceleration to a full stop must be completed within the .............",
            "options": [
              "A. VR, 2 sec, TORA",
              "B. V1 , 2 sec, ASDA",
              "C. VEF, 2 sec, TORA",
              "D. VGO, 2 sec, ASDA"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "How does the power required graph move with an increase in altitude?",
            "options": [
              "A. Straight up",
              "B. Straight down",
              "C. Up and to the right",
              "D. Straight across to the right"
            ],
            "correct": 2,
            "explanation": ""
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
              "A. Improved climb procedure",
              "B. Reduced thrust take-off",
              "C. When ASDA is greater than TODA",
              "D. Take off with anti-skid inoperative"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Two identical aircraft at different masses are descending at idle thrust. Which of the following statements correctly describes their descent characteristics?",
            "options": [
              "A. There is no difference between the descent characteristics of the two aeroplanes",
              "B. At a given angle of attack, the heavier aeroplane will always glide further than the lighter aeroplane",
              "C. At a given angle of attack, the lighter aeroplane will always glide further than the heavier aeroplane",
              "D. At a given angle of attack, both the vertical and the forward speeds are greater for the heavier aeroplane"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "If the performance limited take-off mass is restricted by the ASDA, which of the following actions will increase the limiting mass?",
            "options": [
              "A. Use a higher flap setting",
              "B. Use of clearway",
              "C. Increase V1",
              "D. Decrease VR"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Cruising with 1 or 2 engines inoperative at high altitude, compared to all engines operative cruise, range will:",
            "options": [
              "A. increase",
              "B. decrease",
              "C. not change",
              "D. decrease with 1 engine inoperative, and increase with 2 engines inoperative"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Concerning landing gear, which factors limit take-off performance?",
            "options": [
              "A. Brake temperature",
              "B. Tyre speed and VMBE",
              "C. Tyre temperature",
              "D. Brake wear"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "When climbing at a constant Mach number through the troposphere, TAS:",
            "options": [
              "A. increases",
              "B. decreases",
              "C. remains constant",
              "D. increases then decreases"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A tailwind on take-off will not affect:",
            "options": [
              "A. climb limit mass",
              "B. obstacle clearance",
              "C. field limit mass",
              "D. VMBE"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When flying at the optimum range altitude, over time the:",
            "options": [
              "A. fuel consumption gradually decreases",
              "B. fuel consumption gradually increases",
              "C. fuel consumption initially decreases then gradually increases",
              "D. fuel consumption remains constant"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "During certification test flights for a turbojet aeroplane, the measured take-off runs from brake release to a point equidistant between the point at which VLOF is reached and the point at which the aeroplane is 35 ft above the take of surface are: 1530 m with all engines operating. 1810 m with the critical engine failure recognized at V1 , other factors remaining unchanged. What is the correct value of the take-off run?",
            "options": [
              "A. 1759 m",
              "B. 1810 m",
              "C. 1950 m",
              "D. 2081 m"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What happens to the field limited take-off mass with runway slope?",
            "options": [
              "A. It increases with a downhill slope",
              "B. It is unaffected by runway slope",
              "C. It decreases with a downhill slope",
              "D. It increases with an uphill slope"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "With regards to the optimum altitude during the cruise, the aircraft is:",
            "options": [
              "A. always flown at the optimum altitude",
              "B. always flown 2000 ft above the optimum altitude",
              "C. flown slightly above the optimum altitude initially, descending as fuel is burnt",
              "D. flown slightly below the optimum altitude initially, climbing as fuel is burnt"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Rate of climb is:",
            "options": [
              "A. Excess power divided by weight",
              "B. Excess thrust divided by weight",
              "C. Maximum thrust and minimum power",
              "D. Maximum thrust and minimum drag"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "If a jet engine fails during take-off, before V1:",
            "options": [
              "A. the take-off can be continued or aborted",
              "B. the take-off should be aborted",
              "C. the take-off should be continued",
              "D. the take-off may be continued if aircraft speed is above VMCG and lies between VGO and VSTOP"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "When flying in a headwind, the speed for max range should be:",
            "options": [
              "A. slightly decreased",
              "B. slightly increased",
              "C. unchanged",
              "D. should be increased, or decreased depending on the strength of the wind"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "For a given aircraft mass, flying with a cost index greater than zero set will result in:",
            "options": [
              "A. a cruise at a slower Mach number than the best range Mach number for a given altitude",
              "B. a cruise at the maximum endurance speed",
              "C. climb at the slowest safe speed, taking into account stall and speed stability",
              "D. a cruise at a faster Mach number than the Mach number giving best air nautical miles per kg ratio for a given altitude"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "For the obstacle limited take-off mass for a Class A aircraft, turns after take-off are not permitted below 400 ft, and must not exceed:",
            "options": [
              "A. 15� angle of bank up to 400 ft",
              "B. 15� angle of bank below 1000 ft",
              "C. 20� angle of bank up to 400 ft",
              "D. 25� angle of bank up to 400 ft"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Vlo is defined as:",
            "options": [
              "A. the actual speed that the aircraft lifts of the ground",
              "B. the minimum possible speed that the aircraft could lift of the ground",
              "C. the maximum speed for landing gear operation",
              "D. the long-range cruise speed"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The induced drag in an aeroplane:",
            "options": [
              "A. increases as speed increases",
              "B. is independent of speed",
              "C. decreases as speed increases",
              "D. decreases as weight increases"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Why are step climbs used on long range fights in jet transport aircraft?",
            "options": [
              "A. To comply with ATC fight level constraints",
              "B. Step climbs have no significance for jet aircraft, they are used by piston aircraft",
              "C. To fly as close as possible to the optimum altitude as mass reduces",
              "D. They are only justified if the actual wind conditions differ significantly from the forecast conditions used for planning"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "In a glide (power off), how does weight affect the glide angle and the speed for best glide angle?",
            "options": [
              "A. Glide angle increases, speed increases",
              "B. Glide angle decreases, speed increases",
              "C. Glide angle constant, speed constant",
              "D. Glide angle constant, speed increases"
            ],
            "correct": 3,
            "explanation": ""
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
              "A. nose wheel steering does not affect VMCG",
              "B. VMCG must be valid in both wet and dry conditions",
              "C. nose wheel steering does not work after an engine failure",
              "D. the aircraft may be operated even if the nose wheel steering is inoperative"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "How does the slush thickness affect the V1 reduction required?",
            "options": [
              "A. Greater reduction if thicker",
              "B. Smaller reduction if thicker",
              "C. No effect if mass is reduced",
              "D. No effect at all"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "When gliding into a headwind airspeed should be:",
            "options": [
              "A. reduced to gust penetration speed",
              "B. the same as the max. range glide speed in still air",
              "C. lower than the max. range glide speed in still air",
              "D. higher than the max. range glide speed in still air"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Vx is:",
            "options": [
              "A. Speed for best angle of climb",
              "B. Speed for best rate of climb",
              "C. Speed for obstacle clearance",
              "D. The same as Vy"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "In a balanced turn load factor is dependent on:",
            "options": [
              "A. radius of turn and aircraft weight",
              "B. TAS and bank angle",
              "C. radius of turn and bank angle",
              "D. bank angle only"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "If the maximum take-off mass is limited by tyre speed, what effect would a down sloping runway have?",
            "options": [
              "A. No effect",
              "B. Always increase the mass",
              "C. Only increase the mass if not limited by any other limitation",
              "D. Decrease the mass"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which is true regarding a balanced field?",
            "options": [
              "A. Provides largest gap between net and gross margins",
              "B. Provides minimum field length required in the case of an engine failure",
              "C. Take-off distance will always be more than stopping distance",
              "D. Distances will remain equal, even if engine failure speed is changed"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If V1 is found to be lower than VMCG, which of the following statements will be true?",
            "options": [
              "A. VMCG must be reduced",
              "B. V1 must be increased to at least VMCG",
              "C. VR must be reduced",
              "D. V2 must be reduced"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "During take-off an aircraft is affected by windshear. If the wind changes from a headwind to a tailwind the effect will be:",
            "options": [
              "A. TOD increasing and ASD decreasing, and the calculated V2 being too fast",
              "B. TOD and ASD decreasing, and the calculated V2 being too fast",
              "C. TOD and ASD remaining constant, if the calculated speeds are used",
              "D. TOD and ASD increasing, if the calculated speeds are used"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The reduced thrust take-off procedure may not be used when:",
            "options": [
              "A. runway wet",
              "B. after dark",
              "C. temperature varies by more than 10�C from ISA",
              "D. anti-skid unserviceable"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "How is fuel consumption affected by the C of G position, in terms of air nautical miles per kg?",
            "options": [
              "A. Increases with a forward C of G",
              "B. Decreases with an aft C of G",
              "C. Decreases with a forward C of G",
              "D. Fuel consumption is not affected by the C of G position"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What factor must be applied to the landing distance available at the destination aerodrome to determine the landing performance of a turbojet aircraft on a dry runway?",
            "options": [
              "A. 1.43",
              "B. 1.15",
              "C. 0.60",
              "D. 0.70"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "During the certification flight testing of a twin engine turbojet aeroplane the actual measured Landing Distances are: 1100 m on a dry runway, 1300 m on a wet runway. What are the values that will be entered into the AFM for the LDR on dry and wet runways?",
            "options": [
              "A. 1833 m, 2167 m",
              "B. 1265 m, 1495 m",
              "C. 1650 m, 1733 m",
              "D. 1833 m, 1495 m"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Climbing in the troposphere at a constant TAS:",
            "options": [
              "A. Mach number increases",
              "B. Mach number decreases",
              "C. CAS increases",
              "D. IAS increases"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "At MSL, in ISA conditions Climb gradient = 6%. What would the climb gradient be if: Pressure altitude 1000 ft, Temperature 17�C, Engine anti-ice on, Wing anti-ice on (- 0.2% engine anti-ice, - 0.1% wing anti-ice, 0.2% per 1000 ft pressure altitude, 0.1 % per 1�C ISA deviation)",
            "options": [
              "A. 5.1%",
              "B. 6.3%",
              "C. 3.8%",
              "D. 5.5%"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What does density altitude signify?",
            "options": [
              "A. Pressure altitude",
              "B. Flight levels",
              "C. ISA altitude",
              "D. An accurate indication of aircraft and engine performance"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which denotes the stall speed in the landing configuration?",
            "options": [
              "A. Vs0",
              "B. Vs1",
              "C. Vs",
              "D. Vs1g"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which of the following combinations most reduces the take-off and climb performance of an aircraft?",
            "options": [
              "A. High temperature and high pressure",
              "B. Low temperature and high pressure",
              "C. Low temperature and low pressure",
              "D. High temperature and low pressure"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "When in a gliding maneuver, in order to achieve maximum endurance the aircraft should be flown at:",
            "options": [
              "A. the speed for max. lift",
              "B. the speed for min. drag",
              "C. the speed for max. lift / drag",
              "D. the speed for min. power"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "With a downward sloping runway:",
            "options": [
              "A. V1 will increase",
              "B. V1 will decrease",
              "C. VR will increase",
              "D. VR will decrease"
            ],
            "correct": 1,
            "explanation": ""
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
        "name": "Mass & Balance Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Due to a mistake in the load sheet the aeroplane is 1000 kg heavier than you believe it to be. As a consequence:",
            "options": [
              "A. V1 will be later",
              "B. VMU will be later",
              "C. VR will be later",
              "D. V1, VMU, VR will all occur earlier"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The datum for the balance arms has to be along the longitudinal axis:",
            "options": [
              "A. between the nose and the tail",
              "B. between the leading and trailing edge of the MAC",
              "C. but does not have to be between the nose and the tail",
              "D. at the fire wall"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "For a conventional light aeroplane with a tricycle undercarriage configuration, the higher the take-off mass:",
            "options": [
              "1. stick forces at rotation will increase. 2. range will decrease but endurance will increase. 3. gliding range will reduce. 4. stalling speed will increase.",
              "A. all are correct",
              "B. 1 and 4 are correct",
              "C. 2, 3 and 4 are correct",
              "D. 1, 3 and 4 are correct"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Performance limited take-off mass may be limited by:",
            "options": [
              "A. Obstacle clearance and Vmcg",
              "B. Obstacle clearance",
              "C. Maximum certified take-off mass",
              "D. Climb gradient"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Use CAP 696, MRJT 1, fig 4.9. What is the balance arm, the maximum compartment load and the running load for the most aft compartment of the fwd cargo hold?",
            "options": [
              "A. 421.5 cm 3305 kg 13.12 kg per inch",
              "B. 1046.5 inches 711 kg 7.18 kg per kg",
              "C. 421.5 inches 2059 kg 13.12 kg per inch",
              "D. 1046.5 m 711 kg 7.18 kg per in"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If a compartment takes a maximum load of 500 kg, with a running load limit of 350 kg/m and a distribution load limit of 300 kg/m� max, which of the following boxes, each of 500 kg, can be carried?",
            "options": [
              "1. 100 cm x 110 cm x 145 cm 2. 125 cm x 135 cm x 142 cm 3. 120 cm x 140 cm x 143 cm 4. 125 cm x 135 cm x 144 cm",
              "A. Any one of the boxes if loaded with due care as to its positioning",
              "B. Either of boxes 2, 3 and 4 in any configuration",
              "C. Box 2 with its longest length perpendicular to the floor cross bearers",
              "D. Box 4 only if loaded with its longest side parallel to the main longitudinal beam"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "When considering CG position, it must be remembered that it is:",
            "options": [
              "A. set by the pilot",
              "B. set by the manufacturer",
              "C. able to exist within a range",
              "D. fixed"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "An aircraft is flying at 1.3VS1g in order to provide an adequate margin above the low speed buffet and transonic speeds. If the 1.3VS1g speed is 180 kt CAS and the mass increases from 285000 kg to 320000 kg, what is the new 1g stalling speed?",
            "options": [
              "A. 146.7 kt, drag will increase and nautical mile per kg fuel burn will decrease",
              "B. 191 kt, drag will increase and range NM/kg will increase",
              "C. 191 kt, drag will increase and NM/kg fuel burn will decrease",
              "D. 147 kt"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Exceeding the Maximum Structural Landing Mass may:",
            "options": [
              "A. reduce the fatigue life of the landing gear",
              "B. cause structural damage",
              "C. both a and b are correct",
              "D. no damage will occur providing the aircraft is within the performance limited landing mass"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Individual aircraft should be weighed in an air-conditioned hangar:",
            "options": [
              "A. on entry into service and subsequently every 4 years",
              "B. when the effects of modifications or repairs are not known",
              "C. with the hangar doors closed and the air conditioning off",
              "D. all the above"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following would not affect the CG position?",
            "options": [
              "A. Cabin crew members performing their normal duties",
              "B. Fuel consumption during flight",
              "C. Horizontal stabilator trim setting",
              "D. Mass added or removed at the neutral point"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The distance from the datum to the CG is:",
            "options": [
              "A. the index",
              "B. the moment",
              "C. the balance arm",
              "D. the station"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "In Mass & Balance terms, what is an index?",
            "options": [
              "A. A cut down version of a force",
              "B. A moment divided by a constant",
              "C. A moment divided by a mass",
              "D. A mass divided by a moment"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The aeroplane is unstable if:",
            "options": [
              "A. the CG is forward",
              "B. the CG is in mid range",
              "C. the CG is on the rear limit",
              "D. the CG is behind the rear limit"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Define the useful load:",
            "options": [
              "A. traffic load plus dry operating mass",
              "B. traffic load plus usable fuel mass",
              "C. dry operating mass plus usable fuel load",
              "D. that part of the traffic load which generates revenue"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If an aeroplane comes into land below its MSLM but above the PLLM for the arrival airfield:",
            "options": [
              "1. airframe structural damage will occur 2. tyre temperature limits could be exceeded 3. the runway length might be inadequate 4. a go-around might not be achievable 5. brake fade could occur",
              "A. 1 and 5 only",
              "B. 3 and 4 only",
              "C. 2, 3, 4 and 5 only",
              "D. 1, 3, 4 and 5 only"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The useful load is:",
            "options": [
              "A. TOM minus fuel mass",
              "B. BEM plus fuel load",
              "C. TOM minus the DOM",
              "D. TOM minus the operating mass"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Determine the position of the CG as a percentage of the MAC given that the balance arm of the CG = 92.5 cm, the leading edge = 70.8 cm and the MAC = 125 cm.",
            "options": [
              "A. 17.5%",
              "B. 17.7%",
              "C. 16.3%",
              "D. 17.4%"
            ],
            "correct": 3,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Mass & Balance Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the zero fuel mass?",
            "options": [
              "A. MSTOM minus fuel to destination minus fuel to alternative airfield",
              "B. Maximum allowable mass of the aircraft with no usable fuel on board",
              "C. Operating mass minus the fuel load",
              "D. Actual loaded mass of the aircraft with no usable fuel on board"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "An aeroplane develops a serious maintenance problem shortly after take-off and has to return to its departure airfield. In order to land safely the aircraft must jettison fuel. How much fuel must be jettisoned?",
            "options": [
              "A. Sufficient to reduce the mass to the zero-fuel mass",
              "B. The pilot calculates the amount of fuel to jettison to reduce the mass to a safe level at or below the RLM",
              "C. The fuel system automatically stops the jettison at the RLM",
              "D. As much as the pilot feels is just in case the problem gets worse"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If the actual take-off mass is greater than the performance limited take-off mass:",
            "options": [
              "A. The performance required by regulation cannot be guaranteed because the safety margins are reduced",
              "B. The safety margins are sufficient to ensure that the required performance can still be achieved",
              "C. The take-off run must be reduced",
              "D. The take-off distance must be reduced"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The maximum structural take-off mass is:",
            "options": [
              "A. the maximum permissible total aeroplane mass on completion of the refuelling operation",
              "B. the maximum permissible total aeroplane mass for take-off subject to the limiting conditions at the departure airfield",
              "C. the maximum permissible total aeroplane mass for take-off but excluding fuel",
              "D. the maximum permissible total aeroplane mass at the start of the take-off run"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The regulated take-off mass:",
            "options": [
              "A. is the lower of maximum structural take-off mass and the performance limited take-off mass",
              "B. is the higher of the maximum structural zero fuel mass and the performance limited take-off mass",
              "C. is the maximum structural take-off mass subject to any last-minute mass changes",
              "D. is the maximum performance limited take-off mass subject to any last-minute mass changes"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The take-off mass is:",
            "options": [
              "A. the maximum permissible total aeroplane mass at the start of the take-off run",
              "B. the mass of the aeroplane including usable fuel but excluding traffic load",
              "C. the mass of the aeroplane including everything and everyone contained within it at the start of the take-off run",
              "D. the maximum mass permitted for take-off"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The operating mass:",
            "options": [
              "A. is the lower of the structural mass and the performance limited mass",
              "B. is the higher of the structural mass and the performance limited mass",
              "C. is the actual mass of the aircraft on take-of",
              "D. is the dry operating mass and the fuel load"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The basic empty mass is the mass of the aeroplane:",
            "options": [
              "A. plus non-standard items such as lubricating oil, fire extinguishers, emergency oxygen equipment etc.",
              "B. minus non-standard items such as lubricating oil, fire extinguishers, emergency oxygen equipment etc.",
              "C. plus standard items such as unusable fluids, fire extinguishers, emergency oxygen equipment, supplementary electronics etc.",
              "D. minus non-standard items such as unusable fluids, fire extinguishers, emergency oxygen and supplementary electronic equipment etc."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The term 'baggage' means:",
            "options": [
              "A. excess freight",
              "B. any non-human, non-animal cargo",
              "C. any freight or cargo not carried on the person",
              "D. personal property of passengers or crew members carried on an aircraft by agreement with the operator"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "An operator may:",
            "options": [
              "A. compute the actual mass of passengers and checked baggage by using standard masses given in tables 1, 2 and 3",
              "B. compute the actual mass of passengers and checked baggage by weighing",
              "C. may compute the actual mass of passengers and checked baggage",
              "D. all the above"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "When computing the mass of passengers and baggage:",
            "options": [
              "1. personal belongings and hand baggage must be included 2. infants must be classed as children if they occupy a seat 3. standard masses include infants being carried by an adult 4. table 1, table 2 and table 3 must be used as appropriate if using standard masses for passengers and freight 5. weighing must be carried out immediately prior to boarding and at an adjacent location",
              "A. 1, 2 and 5 only",
              "B. 2 and 4 only",
              "C. 1, 2, 3 and 5 only",
              "D. all the above"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "When computing the mass of passengers and baggage for an aircraft with 20 seats or more:",
            "options": [
              "1. standard masses of male and female in table 1 are applicable 2. if there are thirty seats or more, the 'all adult' mass values in table 1 may be used as an alternative 3. holiday charter masses apply to table 1 and table 3 if the charter is solely intended as an exclusive holiday charter 4. the standard mass for checked baggage in table 2 is applicable",
              "A. 1, 2, 3 and 4 are correct",
              "B. 1 and 2 only are correct",
              "C. 1, 2 and 4 only are correct",
              "D. 3 and 4 only are correct"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Refer to CAP 696 SEP. What is the CG range for normal category operations at a mass of 3000 lb?",
            "options": [
              "A. 79.5 inches to 87.7 inches",
              "B. 74.0 inches to 87.7 inches",
              "C. 79.5 inches to 89.5 inches",
              "D. 82.0 inches to 89.5 inches"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Refer to CAP 696 SEP. What are the CG limits for utility operations?",
            "options": [
              "A. fwd. limit = 74 inches to 80.4 inches",
              "B. fwd. limit = 74 inches, aft limit = 80.4 inches",
              "C. fwd. limit = 74 inches, aft limit = 87.7 inches",
              "D. fwd. limit = 74 inches to 80.4 inches and aft limit = 87.7 inches"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Refer to CAP 696 SEP. What is the CG at the BEM?",
            "options": [
              "A. 77 inches",
              "B. 87 inches",
              "C. 77.7 meters",
              "D. 77.7 inches"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Refer to CAP 696 SEP. What is the structural load limit for the floor at baggage zone 'C'?",
            "options": [
              "A. 50 lb. per square foot",
              "B. 100 lb. per cubic foot",
              "C. 100 lb. per square foot",
              "D. 100 kg per square inch"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Refer to CAP 696 MRJT. What stabilizer trim setting is required for take-off when the CG is 19% MAC for 5 degrees of take-off flap?",
            "options": [
              "A. 2.75",
              "B. 3.75",
              "C. 4.75",
              "D. 5.75"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Refer to CAP 696 MRJT. What is the maximum structural take-off mass?",
            "options": [
              "A. 63060 kg",
              "B. 62800 kg",
              "C. 54900 kg",
              "D. 51300 kg"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Refer to CAP 696 MRJT. What is the CG range for maximum zero fuel mass?",
            "options": [
              "A. 8% MAC to 27% MAC",
              "B. 12%MAC to 20% MAC",
              "C. 7.5% MAC to 27.5% MAC",
              "D. 8.5% MAC to 26% MAC"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Refer to CAP 696 MRJT. Assuming the MZFM, what is the maximum allowable fuel mass for take-off?",
            "options": [
              "A. 10015 kg",
              "B. 10150 kg",
              "C. 11500 kg",
              "D. 15000 kg"
            ],
            "correct": 2,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Mass & Balance Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Use CAP 696 MEP. What performance class does the aircraft belong to?",
            "options": [
              "A. Performance Class 'A'",
              "B. Performance Class 'B'",
              "C. Performance Class 'C'",
              "D. Performance Class 'D'"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP 696 MEP. Where is the reference datum?",
            "options": [
              "A. 78.4 inches forward of the wing leading edge at the inboard edge of the inboard fuel tank",
              "B. 25.3 inches forward of the nose wheel",
              "C. 109.8 inches forward of the main wheel",
              "D. All the above"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Use CAP 696 MEP. The main wheel is:",
            "options": [
              "A. 19 inches forward of the fwd CG limit at the maximum take-of mass",
              "B. 27.8 inches behind the fwd CG limit at a take-off mass of 3400 lb",
              "C. 15.2 inches forward of the rear CG limit at the maximum take-of mass",
              "D. all the above"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP 696 MEP. The nose wheel is:",
            "options": [
              "A. 61.1 inches forward of the fwd CG limit at maximum take-off mass",
              "B. 15.2 inches forward of the fwd CG limit at a mass of 3400 lb",
              "C. 69.3 inches aft of the rear CG limit at maximum take-off mass",
              "D. all the above"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Use CAP 696 MEP. What is the minimum fuel mass that must be consumed if the aircraft, having become airborne at maximum weight, decides to abort the fight?",
            "options": [
              "A. 1260 lb",
              "B. 280 lb",
              "C. 237 lb",
              "D. 202 lb"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Use CAP 696 MEP. If the pilot has a mass of 200 lb, what is the maximum traffic load?",
            "options": [
              "A. 1060 lb",
              "B. 1600 lb",
              "C. 1006 lb",
              "D. 6001 lb"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Use CAP 696 MEP. Assuming the maximum zero fuel mass and maximum take-off mass, what fuel load can be carried?",
            "options": [
              "A. 38.9 imperial gallons",
              "B. 46.6 US gallons",
              "C. 176.8 litres",
              "D. Any one of the above"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Use CAP 696 MEP. The CG when the TOM is 4300 lb and the corresponding moment is 408500 lb in is:",
            "options": [
              "A. 95 inches",
              "B. 59 inches",
              "C. 0.4 inches tail heavy",
              "D. 0.6 inches rear of the aft limit"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Use CAP 696 MEP. If the CG is 86 inches and the TOM is 4100 lb the aircraf is:",
            "options": [
              "A. just on the forward CG limit",
              "B. just outside the forward CG limit",
              "C. just inside the aft CG limit",
              "D. within the two forward limits"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Use CAP MRJT. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 150 inches long. What is the distance of the CG from the datum if it is found to be 16% of the MAC?",
            "options": [
              "A. 547 inches.",
              "B. 647 inches.",
              "C. 747 inches.",
              "D. 674 inches."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP MRJT. The CG is found to be 652.5 inches aft of the datum. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 134.1 inches long. What percentage is the CG of the MAC?",
            "options": [
              "A. 10%.",
              "B. 15%.",
              "C. 20%.",
              "D. 25%."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Use CAP MRJT. If a passenger moves from a seat position corresponding to the balance arm at zone D to a position corresponding to the balance arm at zone F, what distance will the passenger have travelled and how many seat rows will he have passed?",
            "options": [
              "A. 255 inches and 8 seat rows.",
              "B. 260 inches and 7 seat rows.",
              "C. 250 inches and 9 seat rows.",
              "D. 255 inches and 7 seat rows."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Use CAP MRJT. The balance arm for each of the seat zones is measured from the datum to:",
            "options": [
              "A. the front border line of the zone.",
              "B. the centre line of the zone.",
              "C. the rear border line of the zone.",
              "D. the front border line of the next zone in sequence."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP MRJT. What stabilizer trim setting is required for take-off when the CG is 15% MAC for 15 degrees of take-off flap?",
            "options": [
              "A. 2.75",
              "B. 3.5",
              "C. 4.5",
              "D. 3.75"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP MRJT. Assuming the standard masses have been used for both passengers and baggage, what is the mass of a full passenger and baggage load?",
            "options": [
              "A. 13027 kg",
              "B. 13677 kg",
              "C. 14127 kg",
              "D. 15127 kg"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP MRJT. The leading edge of the MAC is given as 625.6 inches aft of the datum. Our MAC is 134.1 inches long. What is the distance of the CG from the datum if it is found to be 34% of the MAC?",
            "options": [
              "A. 681 inches.",
              "B. 677 inches",
              "C. 669 inches.",
              "D. 674 inches."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP MRJT. The CG is found to be 730.5 inches aft of the datum. Our MAC is 189 inches long. The leading edge of the MAC is given as 625.6 inches aft of the datum. What percentage is the CG of the MAC?",
            "options": [
              "A. 52.4%",
              "B. 61%",
              "C. 48%",
              "D. 56%"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Use CAP696 SEP1. If the landing mass is 3155 lb and the trip fuel was 40 gallons, what was the ZFM if the fuel tanks held 60 gallons of fuel prior to take-off?",
            "options": [
              "A. 3001 lb",
              "B. 3035 lb",
              "C. 3098 lb",
              "D. 3111 lb"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP696 SEP1. Does the retractable landing gear have a significant influence on the CG position?",
            "options": [
              "A. Yes, the landing gear will adversely affect the CG position.",
              "B. No, the landing gear will not significantly affect CG position.",
              "C. yes, the CG position will be significantly affected by the landing gear position.",
              "D. No, Landing gear never affects CG position"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Use CAP696 SEP1. Assuming the weight and access is not a problem, where can a cubic box of mass 500 lb be positioned?",
            "options": [
              "A. Zone C only",
              "B. Zone C and D only",
              "C. Zone C, D and E only",
              "D. Zone C, D, E and F only"
            ],
            "correct": 2,
            "explanation": ""
          }
        ]
      }
    ]
  },
  "human-performance": {
    "name": "Human Performance & Limitations",
    "icon": "fas fa-brain",
    "tests": [
      {
        "name": "Human Performance Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Smoking reduces the blood's ability to carry oxygen because:",
            "options": [
              "A. the inspiratory tract becomes obstructed",
              "B. CO2 takes a larger lung volume",
              "C. haemoglobin has a greater affinity for CO",
              "D. CO gets trapped in the alveoli and restricts internal respiration"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If someone is hyperventilating, the blood contains too much:",
            "options": [
              "A. acid",
              "B. alkaline",
              "C. CO2",
              "D. haemoglobin"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Accidents are caused by lack of:",
            "options": [
              "A. good judgment",
              "B. safe maintenance of aircraft",
              "C. interpersonal relations",
              "D. physical and mental skills"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Blood from the pulmonary artery is?",
            "options": [
              "A. Rich in oxygen and low in carbon dioxide",
              "B. Rich in oxygen and rich in carbon dioxide",
              "C. Low in oxygen and low in carbon dioxide",
              "D. Low in oxygen and rich in carbon dioxide"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which instrument, which was introduced in the 1980s, led to the greatest reduction of accidents?",
            "options": [
              "A. SSR",
              "B. DME",
              "C. GPWS",
              "D. TCAS"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "When blood pressure is measured during an aviation medical examination, the pressure is:",
            "options": [
              "A. the venous pressure",
              "B. the pressure of O2 in the blood",
              "C. the pressure in all of the blood vessels, being representative of the pressure over the whole body",
              "D. arterial pressure in the upper arm, being equivalent to that of the heart"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A pilot should consult an aviation medicine specialist before donating blood because:",
            "options": [
              "A. donation may lead to a rise in blood pressure (hypertension)",
              "B. donation may lead to a lowering of blood pressure (hypotension)",
              "C. donation may lead to a reduced tolerance of altitude",
              "D. donation may lead to a lowering of the body temperature causing unpredictable sleepiness"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A person is suffering from hyperventilation, his blood becomes:",
            "options": [
              "A. more acid",
              "B. more alkaline",
              "C. more saturated with CO2",
              "D. less saturated with oxygen"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The amount of oxygen carried by the blood depends on:",
            "options": [
              "A. the partial pressure of oxygen only",
              "B. the haemoglobin only",
              "C. the amount of oxygen dissolved in the blood plasma",
              "D. the partial pressure of oxygen and the amount of haemoglobin"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Haemoglobin is:",
            "options": [
              "A. dissolved in the blood",
              "B. in red blood cells",
              "C. in white cells of the blood",
              "D. in the platelets"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The pressoreceptors have signalled low blood pressure. The body's response is to:",
            "options": [
              "1. increase rate of breathing 2. increase cardiac output 3. increase heart rate 4. relax of the blood vessels 5. decrease heart rate 6. tighten of the blood vessels",
              "A. 1, 2, 3 and 4",
              "B. 2, 3 and 6",
              "C. 4 and 5 only",
              "D. 1, 3 and 4"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The body gets its energy from:",
            "options": [
              "1. minerals 2. carbohydrates 3. protein 4. vitamins",
              "A. 1 & 4 only",
              "B. 2 & 3 only",
              "C. 1, 2 & 4",
              "D. 3 & 4 only"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the carcinogenic substance in cigarettes that can modify cells and cause cancer?",
            "options": [
              "A. Tar",
              "B. Nicotine",
              "C. Carbon monoxide",
              "D. Lead"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Having given blood aircrew should:",
            "options": [
              "A. rest supine for at least 1 hour, drink plenty of fluids and not fly for 48 hours",
              "B. rest supine for about 15 - 20 minutes, drink plenty of fluids and not fly for 24 hours",
              "C. aircrew are prohibited from donating blood",
              "D. aircrew are not encouraged to give blood"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "With a pulse rate of 72 beats a minute and a stroke volume of 70 ml, what is the cardiac output?",
            "options": [
              "A. 8 litres a minute",
              "B. 6 litres a minute",
              "C. 5 litres a minute",
              "D. 7 litres a minute"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Who is responsible for Air Safety?",
            "options": [
              "A. Aircrew and Groundcrew",
              "B. Aircrew, Groundcrew and Management",
              "C. Everyone involved",
              "D. Aircrew only"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Having donated blood aircrew should:",
            "options": [
              "A. rest supine for at least 1 hour, drink plenty of fluids and not fly for 48 hours",
              "B. rest supine for about 15 - 20 minutes, drink plenty of fluids and not fly for 24 hours",
              "C. aircrew are prohibited from donating blood",
              "D. aircrew are not encouraged to give blood"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Human factors have been statistically proved to contribute approximately:",
            "options": [
              "A. 50% of aircraft accidents",
              "B. 70% of aircraft accidents",
              "C. 90% of aircraft accidents",
              "D. have not played a significant role in aircraft accidents"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The oxygen-carrying capacity of a smoker who smokes 20 to 30 cigarettes a day is reduced by approximately:",
            "options": [
              "A. 8 - 10%",
              "B. 12 - 18%",
              "C. 20 - 25%",
              "D. 0.2 - 2%"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The blood of the pulmonary vein is:",
            "options": [
              "A. rich in oxygen and lacking in CO2",
              "B. rich in oxygen and rich in CO2",
              "C. lacking in oxygen and rich in CO2",
              "D. lacking in oxygen and lacking in CO2"
            ],
            "correct": 0,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Human Performance Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Decompression sickness (DCS) is caused by:",
            "options": [
              "A. oxygen coming out of solution",
              "B. carbon dioxide coming out of solution",
              "C. nitrogen coming out of solution",
              "D. carbon monoxide coming out of solution"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Which of the following is true with respect to the cause of decompression sickness?",
            "options": [
              "A. altitudes above 18000 ft in an unpressurized aircraft",
              "B. altitudes above 5000 ft",
              "C. climbing at more than 500 ft/min to altitude greater than 18000 ft",
              "D. temperatures greater than 24�C at altitudes of over 2000 ft"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What chemical substance in tobacco causes addiction?",
            "options": [
              "A. Tar and nicotine",
              "B. Tar and carbon monoxide",
              "C. Nicotine and carbon monoxide",
              "D. Nicotine"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The contents of exhaled air compared to inhaled air will contain:",
            "options": [
              "A. Less N2",
              "B. More O2",
              "C. Less CO2",
              "D. Less O2"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following factors decrease resistance to decompression sickness?",
            "options": [
              "1. Body height 2. Scuba diving 3. Obesity 4. Age",
              "A. 1, 2 and 4",
              "B. 3 and 4",
              "C. 1, 2 and 3",
              "D. 2, 3 and 4"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Blood pressure depends on the:",
            "options": [
              "A. resistance and the efficiency of the cells",
              "B. cardiac input and the resistance of the capillaries",
              "C. cell output and the thinness of the blood",
              "D. cardiac output and the resistance of the capillaries"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Time of useful consciousness (TUC) following loss of pressurization at 35000 ft is:",
            "options": [
              "A. 3 - 4 minutes",
              "B. 5 minutes upwards",
              "C. 30 - 60 seconds",
              "D. 10 - 15 seconds"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Dalton's Law is associated with:",
            "options": [
              "A. Decompression sickness (DCS)",
              "B. bends",
              "C. creeps",
              "D. hypoxia"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Among the symptoms of hypoxia are:",
            "options": [
              "1. impaired judgment 2. fast and heavy breathing 3. impairment of vision 4. muscular impairment",
              "A. 1 & 3",
              "B. 1, 3 and 4",
              "C. 1, 2 and 4",
              "D. 1, 2, 3 and 4"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The composition of the atmosphere at 21000 ft is approximately:",
            "options": [
              "A. 78% He, 21% O2 and 1% CO",
              "B. 78% He, 21% O2 and 0.003% CO2 + traces",
              "C. 78% N, 21% O2 and 1% CO2 + traces",
              "D. 78% N, 21% O2 and 1% CO + traces"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Boyle's Law has a role to play in:",
            "options": [
              "A. hypoxia with increased altitude",
              "B. Decompression sickness",
              "C. gastrointestinal tract barotrauma",
              "D. night vision"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Which of the following actions is the most efficient to accelerate the release of Carbon Monoxide from the blood?",
            "options": [
              "A. Inhalation of pressurised oxygen",
              "B. Inhalation of a mixture of unpressurized oxygen and air",
              "C. Inhalation of pressurised carbon dioxide",
              "D. Inhalation of a mixture of unpressurized carbon dioxide and air"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "A pilot suffering from hyperventilation during final approach in poor weather can combat the effects by:",
            "options": [
              "A. going on 100% oxygen and go around",
              "B. slowing the breathing rate, breathing into a paper bag and continuing the approach",
              "C. increasing the rate of breathing and continuing the approach",
              "D. increasing the depth of breathing and going around"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the normal tidal volume?",
            "options": [
              "A. 750 ml",
              "B. 500 ml",
              "C. 150 ml",
              "D. 250 ml"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Circulation of the blood is for:",
            "options": [
              "1. transportation of oxygen to the cells of the body 2. withdrawal of the waste products from the cells 3. convey nutrients to the cells",
              "A. 1 and 2",
              "B. 2 and 3",
              "C. 1 and 3",
              "D. 1, 2 and 3"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following is correct concerning O2 and blood?",
            "options": [
              "A. Arterial blood is darker than venous blood",
              "B. Blood plasma is oxygenated at the heart",
              "C. Diffusion of oxygen from the alveoli to the blood is not dependent on the partial pressure",
              "D. Diffusion from the blood to the cells is dependent on the partial pressure of oxygen"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following symptoms marks the beginning of hyperventilation?",
            "options": [
              "A. Slow heart beat",
              "B. Cyanosis",
              "C. Dizzy feeling",
              "D. Slow rate of breath"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A few hours after landing a pilot feels pain in his/her joints. The correct action is:",
            "options": [
              "A. take exercise which will cause the pain to disappear",
              "B. take physiotherapy",
              "C. see an aviation medical specialist as soon as possible",
              "D. ignore it since is probably due to common after-effect of height"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What law governs the oxygen transfer at the alveoli?",
            "options": [
              "A. Boyle's",
              "B. Charles'",
              "C. Henry's",
              "D. Gas Diffusion Law - Fick's Law"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Carbon Monoxide:",
            "options": [
              "A. can have a severe affect on a pilot's abilities when receiving exposure for a relatively short period of time",
              "B. does not have an effect when the body becomes used to the gas over a long period of time",
              "C. has no effect on the human body",
              "D. is not toxic"
            ],
            "correct": 0,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Human Performance Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The partial pressure of carbon dioxide in the lungs is:",
            "options": [
              "A. lower than the partial pressure of CO2 in the atmosphere",
              "B. higher than the pressure of CO2 in the blood",
              "C. lower than the pressure of CO2 in the blood",
              "D. almost equal to the pressure of CO2 in the atmosphere"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The Critical Zone of hypoxia begins at:",
            "options": [
              "A. 18000 ft",
              "B. 20000 ft",
              "C. 23000 ft",
              "D. 3600 ft"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Which of the following are defined in the ICAO Standard Atmosphere?",
            "options": [
              "1. Pressure 2. Temperature 3. Density 4. Humidity",
              "A. 1, 2 & 4",
              "B. 1 & 2",
              "C. 2, 3 & 4",
              "D. 1, 2 & 3"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "In an ascent, where is the greatest pressure differential?",
            "options": [
              "A. 0 - 5000 ft",
              "B. 5000 - 10000 ft",
              "C. 10000 - 15000 ft",
              "D. 40000 - 45000 ft"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "DCS symptoms can occur:",
            "options": [
              "A. when flying from an area if high pressure to an area of low pressure in an unpressurized aircraft",
              "B. when cabin pressure surges below 18000 ft",
              "C. following loss of cabin pressure at altitudes higher than 18000 ft",
              "D. emergency descent following decompression below 10000 ft"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Under normal conditions, external respiration is a subconscious process that occurs at a rate of:",
            "options": [
              "A. 20 to 30 breaths/min, averaging 25 breaths/minute",
              "B. 30 to 40 breaths/min, averaging 35 breaths/minute",
              "C. 15 to 25 breaths/min, averaging 20 breaths/minute",
              "D. 12 to 20 breaths/min, averaging 16 breaths/minute"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following statements are correct?: Decompression sickness can be avoided by:",
            "options": [
              "1. staying below 18000 ft 2. maintaining cabin pressure below 8000 ft 3. breathing 100% oxygen 30 minutes prior to and during flight above 18000 ft 4. breathing 100% oxygen 60 minutes prior to and during flight above 18000 ft",
              "A. 1, 2 & 3",
              "B. 2, 3 & 4",
              "C. 1, 3 & 4",
              "D. 1, 2 & 4"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Hyperventilation results in:",
            "options": [
              "A. Increased pCO2 in the blood",
              "B. Decreased pCO2 in the blood",
              "C. Increased pO2 in the blood",
              "D. Decreased pO2 in the blood"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Time of useful consciousness at 25,000 feet with moderate activity and rapid decompression is approximately:",
            "options": [
              "A. 2 minutes",
              "B. 30 seconds to 5 minutes",
              "C. 2.5 minutes to 6 minutes",
              "D. 5 to 10 minutes"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "At what altitude is pressure half that at MSL:",
            "options": [
              "A. 8000 ft",
              "B. 10000 ft",
              "C. 18000 ft",
              "D. 36000 ft"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Hyperventilation can cause:",
            "options": [
              "A. too much oxygen to the brain",
              "B. spasms in the muscles and possible unconsciousness",
              "C. bluish tinge under the nails of the fingers and the lobes of the ears",
              "D. a feeling of euphoria"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "As the body ascends, the partial pressure of oxygen within the lungs:",
            "options": [
              "A. decreases at a rate of 3 times the atmospheric rate",
              "B. decreases at the same rate as that of the atmosphere",
              "C. stays the same",
              "D. increases"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The following are features of hypoxia:",
            "options": [
              "1. blue discolouration of the lips and fingernails 2. shortness of breath and dizziness 3. impaired decision making and poor coordination 4. a feeling of well being",
              "A. 2, 3 and 4 are correct",
              "B. 1, 2 and 4 are correct",
              "C. 1, 3 and 4 are correct",
              "D. 1, 2 and 3 are correct"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "On expiration there is:",
            "options": [
              "A. higher CO2 content than on intake",
              "B. more oxygen content than on intake",
              "C. less water vapour content than on intake",
              "D. the same CO2 content as on intake"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "You have been scuba diving below 10 m. When can you next fly:",
            "options": [
              "A. after 12 hours",
              "B. after 24 hours",
              "C. after 48 hours",
              "D. whenever you wish"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Concerning hypoxia, why is it more hazardous if flying solo?",
            "options": [
              "A. The effects are increased",
              "B. It is difficult to recognize the first symptoms of hypoxia for a pilot in initial training",
              "C. It is more difficult to manage the oxygen systems on your own",
              "D. There is no one to take control once the symptoms of hypoxia appear"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Which of the following statements, if any, are correct?",
            "options": [
              "1. Euphoria is a possible result of hypoxia 2. Euphoria can lead to degradation in pilot�s performance",
              "A. 1 only is correct",
              "B. 2 only is correct",
              "C. Both 1 and 2 are correct",
              "D. Neither"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Short-term memory impairment occurs at what height?",
            "options": [
              "A. 8000 ft",
              "B. 12000 ft",
              "C. 15000 ft",
              "D. 18000 ft"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "100% oxygen without pressure can be used up to:",
            "options": [
              "A. 50000 ft",
              "B. 40000 ft",
              "C. 60000 ft",
              "D. 70000 ft"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "TUC (time of useful consciousness) is dependent upon:",
            "options": [
              "1. rate of decompression 2. altitude of the occurrence 3. type of aircraft 4. activity of the pilot 5. personal health",
              "A. 1, 2 & 3",
              "B. all of the above",
              "C. all except 3",
              "D. 2, 3 & 5"
            ],
            "correct": 2,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Human Performance Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "A person suffering from glaucoma will have:",
            "options": [
              "A. cloudiness of the lens",
              "B. cloudiness of the cornea",
              "C. increased pressure of the eye",
              "D. colour blindness"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The most dangerous type of incapacitation is:",
            "options": [
              "A. acute",
              "B. rapid",
              "C. insidious",
              "D. none of the above"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is a stereotype and involuntary reaction to a stimulation?",
            "options": [
              "A. Data control",
              "B. A reflex",
              "C. Stimulation control",
              "D. Automatic stimulation"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Glaucoma is caused by:",
            "options": [
              "A. excess pressure within the eye",
              "B. a clouding of the lens",
              "C. damage to the cornea",
              "D. damage to the retina"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "While turning the aircraft the pilots moves his/her head. What effect might the pilot be exposed to:",
            "options": [
              "A. Coriolis Effect",
              "B. Somatogravic Effect",
              "C. Flicker Effect",
              "D. Oculogravic Effect"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which Law is relevant to decompression sickness?",
            "options": [
              "A. Boyle�s Law",
              "B. Henry�s Law",
              "C. The Combined Gas Law",
              "D. Dalton�s Law"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Good quality sunglasses provide:",
            "options": [
              "A. the ability to react to varying light levels automatically",
              "B. good luminance characteristics, avoidance of glare and harsh shadows, protection against UV and IR and equal absorption of colours",
              "C. for the pilot�s individual needs",
              "D. no distortion of aircraft windscreens"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "On initiating recovery from a spin, the pilot may have a strong sensation of turning:",
            "options": [
              "A. in a direction opposite to that of the spin",
              "B. in a direction the same as the spin",
              "C. slowly upwards",
              "D. quickly upwards"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Barotrauma of the middle ear is caused by differences between the pressures in the:",
            "options": [
              "A. inner ear and middle ear",
              "B. ambient air and the middle ear",
              "C. outer ear",
              "D. semicircular canals"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Night flying at 10000 ft you find that your acuity decreases. What can you do about it to improve your acuity?",
            "options": [
              "A. Use your peripheral vision",
              "B. Go onto oxygen",
              "C. Turn up the instrument lights",
              "D. Switch on or turn up the cabin heat"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What actions should a pilot take if suffering from vertigo?",
            "options": [
              "1. Check and cross-check the aircraft instruments 2. Accept and ignore illusions 3. Keep head movements to a minimum 4. Believe the aircraft instruments",
              "A. 1, 2 and 3",
              "B. 2, 3 and 4",
              "C. 1, 3 and 4",
              "D. 1, 2, 3 and 4"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The function of the retina is to:",
            "options": [
              "A. convert light images into meaningful information",
              "B. transport electrical impulses to the brain",
              "C. convert light signals into electrical impulses",
              "D. convert light signals into chemical impulses"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The metabolism of alcohol is:",
            "options": [
              "A. influenced by time",
              "B. accelerated by drinking coffee",
              "C. quicker when the body gets used to alcohol",
              "D. improved by the use of easy-to-get medication"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Vertigo can be caused by a blocked eustachian tube.",
            "options": [
              "A. True",
              "B. False"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the residual volume?",
            "options": [
              "A. 70 ml",
              "B. 500 ml",
              "C. 350 ml",
              "D. 1200 ml"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Vertigo causes the illusion when flying of:",
            "options": [
              "A. flying straight while in a spin",
              "B. climbing while turning",
              "C. a tumbling or turning sensation associated sometimes with dizziness",
              "D. descending with a decrease of speed"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Perceptual conflict between the vestibular apparatus and the visual sensory inputs:",
            "options": [
              "1. can occur when flying IMC and may be compelling 2. can cause attitude misinformation 3. may occur when taking off bank following a sustained turn 4. can occur when decelerating",
              "A. 1, 2 and 3",
              "B. 2, 3 and 4",
              "C. 1, 3 and 4",
              "D. 1, 2, 3 and 4"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The eye can adjust to:",
            "options": [
              "A. high levels of illumination in 10 minutes and darkness in 30 minutes",
              "B. high levels of illumination in 10 seconds and darkness in 30 minutes",
              "C. high levels of illumination in 30 minutes and darkness in 10 minutes",
              "D. high levels of illumination in 30 minutes and darkness in 10 seconds"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Disorientation is most likely to occur when:",
            "options": [
              "1. flying IMC 2. the pilot is distracted (using FMS for example) 3. flying from IMC to VMC 4. the pilot is unwell or fatigued",
              "A. 1, 2 and 3",
              "B. 1, 2, 3 and 4",
              "C. 1, 2 and 4",
              "D. 2, 3 & 4"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "When the visual image is focused in front of the retina the condition is:",
            "options": [
              "A. myopia",
              "B. hypermetropia",
              "C. presbycusis",
              "D. astigmatism"
            ],
            "correct": 0,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Human Performance Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the relationship between stress and fatigue?",
            "options": [
              "A. No stress and no fatigue is good",
              "B. All stress and fatigue is good",
              "C. Stress can be good, fatigue is always bad",
              "D. No stress and some fatigue is good"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Which of the following are correct?",
            "options": [
              "1. Scuba diving imposes no restriction on flying 2. Use of some medication can affect flying 3. One should drink sufficient water during flight to prevent dehydration 4. Diet does not have an effect on health",
              "A. 2 & 3",
              "B. 1, 2 & 3",
              "C. 2, 3 & 4",
              "D. 1, 2, 3 & 4"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "A person that is exposed to extreme or prolonged stress factors can perceive:",
            "options": [
              "A. distress",
              "B. eustress",
              "C. coping stress",
              "D. stressors"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Stimuli must be of a certain strength for them to be detected. This strength is known as:",
            "options": [
              "A. sensory limitation",
              "B. sensory threshold",
              "C. sensory strength",
              "D. sensory volume"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The sequence of GAS (General Adaptation Syndrome) is:",
            "options": [
              "A. alarm resistance exhaustion",
              "B. resistance exhaustion alarm",
              "C. alarm flight exhaustion",
              "D. exhaustion resistance alarm"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What will happen to the body when in situations of extreme heat?",
            "options": [
              "1. Shivering 2. Vasoconstriction of the exterior blood vessels 3. Sweating 4. Vasodilation of the exterior blood vessels",
              "A. 1, 2, 3 and 4",
              "B. 2 and 3 only",
              "C. 1 and 2 only",
              "D. 3 and 4 only"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Extreme cold may be associated with:",
            "options": [
              "A. aggression",
              "B. aggression and anxiety",
              "C. anxiety",
              "D. contentment or apathy"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Performance can be increased by:",
            "options": [
              "A. putting a student pilot under stress",
              "B. a moderate amount of stress",
              "C. no stress at all if possible",
              "D. ignoring stress as all good pilots leave stress on the ground"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If in a state of stress which is impossible to overcome, the pilot will be in a state of:",
            "options": [
              "A. eustress",
              "B. hypertension",
              "C. distress",
              "D. regression"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Should a pilot fly with a bad cold, he/she could suffer from:",
            "options": [
              "A. chokes",
              "B. bends",
              "C. sinus pain",
              "D. blurred vision"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Stressors are:",
            "options": [
              "A. external factors only",
              "B. internal factors only",
              "C. both external and internal factors",
              "D. neither external nor internal factors"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A person suffering from extreme cold will stop shivering and thereafter become colder and colder when the internal body falls to about:",
            "options": [
              "A. 20�C",
              "B. 25�C",
              "C. 30�C",
              "D. 35�C"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Tuned resonance of the body parts, distressing the individual can be caused by:",
            "options": [
              "A. acceleration along the horizontal flight path",
              "B. resonance between 150 - 250 Hz",
              "C. resonance between 16 - 18 GHz",
              "D. resonance between 1 - 100 Hz"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "According to the \"General Adaptation Syndrome\" which of the following statement(s) is/are correct?",
            "options": [
              "1. During the alarm phase adrenalin will cause a large release of glucose into the blood, a raised heartbeat and blood pressure plus an increase in the rate and depth of breathing 2. During the resistance phase the parasympathetic system releases cortisol helping in the conversion of fat into sugar 3. During the exhaustion phase the body has to be given time to eliminate the waste products which have been generated excessively",
              "A. 1 & 2 only are correct",
              "B. 2 & 3 only are correct",
              "C. 1, 2 & 3 are correct",
              "D. only 1 is correct"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Even with a small ingestion of alcohol:",
            "options": [
              "A. the brain will be stimulated thereby increasing the resistance to hypoxia",
              "B. the brain functions will be increased thereby increasing performance at high altitudes",
              "C. the pilot will remain unaffected",
              "D. the pilot's performance will be degraded"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The effects of vibration are greatest:",
            "options": [
              "A. at high altitudes",
              "B. at low altitudes",
              "C. in smooth air",
              "D. when fatigued"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Cognitive appraisal:",
            "options": [
              "A. occurs only with negative events",
              "B. is the objective evaluation of a situation and the perceived ability to cope with it",
              "C. is the subjective evaluation of a situation and the perceived ability to cope with it",
              "D. depends on the individual's arousal"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The body loses water via:",
            "options": [
              "A. the skin, lungs and kidneys",
              "B. the skin",
              "C. the skin, lungs and liver",
              "D. the skin, liver and kidneys"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "At height cockpit humidity can be between:",
            "options": [
              "A. 20 - 25 %",
              "B. 40 - 60 %",
              "C. 30 - 60%",
              "D. 5 - 15 %"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What is the relationship between stress and performance when plotted on a graph?",
            "options": [
              "A. The relationship is linear",
              "B. The relationship is exponential",
              "C. There is no relationship",
              "D. The relationship is in the shape of an inverted U"
            ],
            "correct": 3,
            "explanation": ""
          }
        ]
      }
    ]
  },
  "aircraft-general": {
    "name": "Aircraft General",
    "icon": "fas fa-cogs",
    "tests": [
      {
        "name": "Principles of Flight Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The angle of attack is the angle between:",
            "options": [
              "A. the chord line and the relative airflow.",
              "B. the longitudinal axis and the relative airflow.",
              "C. the chord line and the longitudinal axis.",
              "D. the relative airflow and the longitudinal axis."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The angle of attack at which a wing stalls is:",
            "options": [
              "A. constant for all aerofoils.",
              "B. constant for a given aerofoil at a given speed.",
              "C. constant for a given aerofoil regardless of speed.",
              "D. variable for a given aerofoil depending on speed."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The stalling angle of attack of a wing:",
            "options": [
              "A. increases with an increase in speed.",
              "B. decreases with an increase in speed.",
              "C. is constant regardless of speed.",
              "D. varies with the square of the speed."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The stalling speed of an aircraft:",
            "options": [
              "A. increases with altitude.",
              "B. decreases with altitude.",
              "C. remains constant with altitude.",
              "D. varies with the square root of altitude."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The lift coefficient:",
            "options": [
              "A. increases linearly with angle of attack.",
              "B. increases linearly with speed.",
              "C. is constant for a given angle of attack.",
              "D. varies with the square of the speed."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The drag coefficient:",
            "options": [
              "A. is constant for a given angle of attack.",
              "B. increases linearly with speed.",
              "C. varies with the square of the speed.",
              "D. decreases with increasing angle of attack."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The aspect ratio of a wing is:",
            "options": [
              "A. span divided by mean chord.",
              "B. span squared divided by area.",
              "C. area divided by span.",
              "D. mean chord divided by span."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The induced drag of a wing:",
            "options": [
              "A. increases with speed.",
              "B. decreases with speed.",
              "C. is constant with speed.",
              "D. varies with the square of the speed."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The centre of pressure of a wing:",
            "options": [
              "A. moves forward as angle of attack increases.",
              "B. moves aft as angle of attack increases.",
              "C. remains at the quarter chord point.",
              "D. remains at the centre of the wing."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The aerodynamic centre of a wing is located at:",
            "options": [
              "A. the leading edge.",
              "B. the trailing edge.",
              "C. the quarter chord point.",
              "D. the centre of pressure."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The pitching moment coefficient:",
            "options": [
              "A. is zero at the aerodynamic centre.",
              "B. varies linearly with angle of attack.",
              "C. is constant for a given wing.",
              "D. increases with speed."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The boundary layer on a wing:",
            "options": [
              "A. is thicker at the leading edge.",
              "B. is thicker at the trailing edge.",
              "C. has constant thickness.",
              "D. is thinnest at the point of maximum thickness."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Laminar flow in the boundary layer:",
            "options": [
              "A. has lower skin friction drag than turbulent flow.",
              "B. has higher skin friction drag than turbulent flow.",
              "C. has the same skin friction drag as turbulent flow.",
              "D. is always present on aerofoils."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The transition from laminar to turbulent flow:",
            "options": [
              "A. occurs at the point of minimum pressure.",
              "B. occurs at the leading edge.",
              "C. occurs at the trailing edge.",
              "D. is independent of Reynolds number."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The Reynolds number:",
            "options": [
              "A. is dimensionless.",
              "B. has units of velocity.",
              "C. has units of length.",
              "D. has units of force."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The critical Reynolds number for a wing:",
            "options": [
              "A. increases with speed.",
              "B. decreases with speed.",
              "C. is constant for a given aerofoil.",
              "D. varies with the square of the speed."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The lift curve slope for a thin aerofoil:",
            "options": [
              "A. is 2π per radian.",
              "B. is π per radian.",
              "C. is 4π per radian.",
              "D. varies with aspect ratio."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The maximum lift coefficient of a wing:",
            "options": [
              "A. increases with aspect ratio.",
              "B. decreases with aspect ratio.",
              "C. is constant for a given aerofoil.",
              "D. varies with the square of the aspect ratio."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The Oswald efficiency factor:",
            "options": [
              "A. is always less than 1.",
              "B. is always greater than 1.",
              "C. is equal to 1 for elliptical wings.",
              "D. varies with angle of attack."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The induced angle of attack:",
            "options": [
              "A. increases with speed.",
              "B. decreases with speed.",
              "C. is constant with speed.",
              "D. varies with the square of the speed."
            ],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Principles of Flight Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The downwash angle behind a wing:",
            "options": [
              "A. increases with speed.",
              "B. decreases with speed.",
              "C. is constant with speed.",
              "D. varies with the square of the speed."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The thrust required for level flight:",
            "options": [
              "A. equals the drag.",
              "B. equals the lift.",
              "C. equals the weight.",
              "D. is zero."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The power required for level flight:",
            "options": [
              "A. equals thrust times velocity.",
              "B. equals drag times velocity.",
              "C. equals lift times velocity.",
              "D. equals weight times velocity."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The minimum drag speed:",
            "options": [
              "A. occurs at maximum lift coefficient.",
              "B. occurs at minimum drag coefficient.",
              "C. is the speed for minimum thrust required.",
              "D. is the speed for maximum range."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The best angle of climb speed:",
            "options": [
              "A. is less than the minimum drag speed.",
              "B. is greater than the minimum drag speed.",
              "C. equals the minimum drag speed.",
              "D. is independent of weight."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The best rate of climb speed:",
            "options": [
              "A. is less than the minimum drag speed.",
              "B. is greater than the minimum drag speed.",
              "C. equals the minimum drag speed.",
              "D. is the speed for maximum excess power."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The absolute ceiling of an aircraft:",
            "options": [
              "A. is where rate of climb is zero.",
              "B. is where excess power is zero.",
              "C. is where thrust equals drag.",
              "D. is where lift equals weight."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The service ceiling of an aircraft:",
            "options": [
              "A. is 100 ft/min rate of climb.",
              "B. is 500 ft/min rate of climb.",
              "C. is 1000 ft/min rate of climb.",
              "D. is zero rate of climb."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The range of an aircraft in still air:",
            "options": [
              "A. is maximum at minimum drag speed.",
              "B. is maximum at best angle of climb speed.",
              "C. is maximum at best rate of climb speed.",
              "D. is independent of speed."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The endurance of an aircraft:",
            "options": [
              "A. is maximum at minimum drag speed.",
              "B. is maximum at best angle of climb speed.",
              "C. is maximum at best rate of climb speed.",
              "D. is maximum at minimum power speed."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The minimum power speed:",
            "options": [
              "A. is less than the minimum drag speed.",
              "B. is greater than the minimum drag speed.",
              "C. equals the minimum drag speed.",
              "D. is the speed for maximum endurance."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The propeller efficiency:",
            "options": [
              "A. increases with advance ratio.",
              "B. decreases with advance ratio.",
              "C. is maximum at advance ratio of 1.",
              "D. is constant."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The advance ratio of a propeller:",
            "options": [
              "A. is velocity divided by tip speed.",
              "B. is tip speed divided by velocity.",
              "C. is angular velocity times radius divided by velocity.",
              "D. is velocity divided by angular velocity times radius."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The thrust of a propeller:",
            "options": [
              "A. increases with angle of attack.",
              "B. decreases with angle of attack.",
              "C. is maximum at zero angle of attack.",
              "D. is independent of angle of attack."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The torque of a propeller:",
            "options": [
              "A. increases with angle of attack.",
              "B. decreases with angle of attack.",
              "C. is maximum at zero angle of attack.",
              "D. is independent of angle of attack."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The constant speed propeller:",
            "options": [
              "A. maintains constant RPM.",
              "B. maintains constant pitch.",
              "C. maintains constant thrust.",
              "D. maintains constant torque."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The variable pitch propeller:",
            "options": [
              "A. changes pitch to maintain RPM.",
              "B. changes RPM to maintain pitch.",
              "C. changes speed to maintain thrust.",
              "D. changes thrust to maintain speed."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The feathering propeller:",
            "options": [
              "A. reduces drag in engine failure.",
              "B. increases drag in engine failure.",
              "C. maintains thrust in engine failure.",
              "D. maintains torque in engine failure."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The jet engine thrust:",
            "options": [
              "A. increases with altitude.",
              "B. decreases with altitude.",
              "C. is constant with altitude.",
              "D. varies with the square of altitude."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The bypass ratio of a turbofan engine:",
            "options": [
              "A. is mass flow through fan divided by mass flow through core.",
              "B. is mass flow through core divided by mass flow through fan.",
              "C. is thrust from fan divided by thrust from core.",
              "D. is thrust from core divided by thrust from fan."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The specific fuel consumption of a jet engine:",
            "options": [
              "A. increases with altitude.",
              "B. decreases with altitude.",
              "C. is constant with altitude.",
              "D. varies with the square of altitude."
            ],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Principles of Flight Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The compressibility of air becomes significant at:",
            "options": [
              "A. low speeds.",
              "B. high speeds.",
              "C. all speeds.",
              "D. zero speed."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The critical Mach number:",
            "options": [
              "A. is the Mach number at which shock waves form.",
              "B. is the Mach number at which flow becomes supersonic.",
              "C. is the Mach number at which drag rises rapidly.",
              "D. is the Mach number at which lift decreases."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The Mach number is:",
            "options": [
              "A. velocity divided by speed of sound.",
              "B. speed of sound divided by velocity.",
              "C. velocity squared divided by speed of sound.",
              "D. speed of sound squared divided by velocity."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The speed of sound in air:",
            "options": [
              "A. increases with temperature.",
              "B. decreases with temperature.",
              "C. is constant.",
              "D. varies with pressure."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The shock wave on a wing:",
            "options": [
              "A. forms at the leading edge.",
              "B. forms at the trailing edge.",
              "C. forms at the point of maximum thickness.",
              "D. forms at the point of minimum pressure."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The wave drag:",
            "options": [
              "A. is present at subsonic speeds.",
              "B. is present at supersonic speeds.",
              "C. is present at all speeds.",
              "D. is zero at Mach 1."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The transonic region:",
            "options": [
              "A. is where Mach number is less than 1.",
              "B. is where Mach number is greater than 1.",
              "C. is where Mach number is near 1.",
              "D. is where Mach number is zero."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The supersonic wing:",
            "options": [
              "A. has high thickness ratio.",
              "B. has low thickness ratio.",
              "C. has sharp leading edge.",
              "D. has rounded leading edge."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The delta wing:",
            "options": [
              "A. has high aspect ratio.",
              "B. has low aspect ratio.",
              "C. has straight leading edge.",
              "D. has curved leading edge."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The swept wing:",
            "options": [
              "A. delays the formation of shock waves.",
              "B. advances the formation of shock waves.",
              "C. has no effect on shock waves.",
              "D. eliminates shock waves."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The centre of gravity of an aircraft:",
            "options": [
              "A. must be forward of the centre of pressure.",
              "B. must be aft of the centre of pressure.",
              "C. must coincide with the centre of pressure.",
              "D. has no relation to the centre of pressure."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The static margin:",
            "options": [
              "A. is the distance between CG and CP.",
              "B. is the distance between CG and aerodynamic centre.",
              "C. is the ratio of distance between CG and AC to mean chord.",
              "D. is always positive."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The neutral point:",
            "options": [
              "A. is the CG position for neutral stability.",
              "B. is the aerodynamic centre.",
              "C. is the centre of pressure.",
              "D. is the quarter chord point."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The stick-fixed stability:",
            "options": [
              "A. considers elevator deflection.",
              "B. ignores elevator deflection.",
              "C. considers aileron deflection.",
              "D. ignores control surface deflection."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The stick-free stability:",
            "options": [
              "A. considers elevator deflection.",
              "B. ignores elevator deflection.",
              "C. considers control surface float.",
              "D. ignores control surface float."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The Dutch roll:",
            "options": [
              "A. is a longitudinal oscillation.",
              "B. is a lateral-directional oscillation.",
              "C. is a combination of pitch and yaw.",
              "D. is a combination of roll and pitch."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The spiral instability:",
            "options": [
              "A. is a slowly developing divergence.",
              "B. is a rapidly oscillating motion.",
              "C. is a combination of pitch and roll.",
              "D. is a combination of yaw and roll."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The phugoid oscillation:",
            "options": [
              "A. is a long period longitudinal motion.",
              "B. is a short period longitudinal motion.",
              "C. is a lateral motion.",
              "D. is a directional motion."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The short period oscillation:",
            "options": [
              "A. is a long period motion.",
              "B. is a short period motion.",
              "C. is heavily damped.",
              "D. is lightly damped."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The control surface effectiveness:",
            "options": [
              "A. increases with speed.",
              "B. decreases with speed.",
              "C. is constant with speed.",
              "D. varies with the square of speed."
            ],
            "correct": 0,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Principles of Flight Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The elevator controls:",
            "options": [
              "A. pitch.",
              "B. roll.",
              "C. yaw.",
              "D. thrust."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The ailerons control:",
            "options": [
              "A. pitch.",
              "B. roll.",
              "C. yaw.",
              "D. thrust."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The rudder controls:",
            "options": [
              "A. pitch.",
              "B. roll.",
              "C. yaw.",
              "D. thrust."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The flaps increase:",
            "options": [
              "A. lift and drag.",
              "B. lift and reduce drag.",
              "C. drag and reduce lift.",
              "D. neither lift nor drag."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The slats increase:",
            "options": [
              "A. lift and drag.",
              "B. lift and reduce drag.",
              "C. drag and reduce lift.",
              "D. neither lift nor drag."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The spoilers increase:",
            "options": [
              "A. lift and drag.",
              "B. lift and reduce drag.",
              "C. drag and reduce lift.",
              "D. neither lift nor drag."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The trim tabs:",
            "options": [
              "A. assist in moving control surfaces.",
              "B. oppose control surface movement.",
              "C. have no effect on control surfaces.",
              "D. replace control surfaces."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The servo tabs:",
            "options": [
              "A. assist in moving control surfaces.",
              "B. oppose control surface movement.",
              "C. have no effect on control surfaces.",
              "D. replace control surfaces."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The spring tabs:",
            "options": [
              "A. assist in moving control surfaces.",
              "B. oppose control surface movement.",
              "C. have no effect on control surfaces.",
              "D. replace control surfaces."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The balance tabs:",
            "options": [
              "A. assist in moving control surfaces.",
              "B. oppose control surface movement.",
              "C. have no effect on control surfaces.",
              "D. replace control surfaces."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The artificial feel system:",
            "options": [
              "A. increases control forces.",
              "B. decreases control forces.",
              "C. maintains constant control forces.",
              "D. eliminates control forces."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The fly-by-wire system:",
            "options": [
              "A. uses mechanical linkages.",
              "B. uses electrical signals.",
              "C. uses hydraulic linkages.",
              "D. uses pneumatic linkages."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The stall warning system:",
            "options": [
              "A. activates at the stall angle.",
              "B. activates before the stall.",
              "C. activates after the stall.",
              "D. never activates."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The angle of attack indicator:",
            "options": [
              "A. shows the angle between chord and airflow.",
              "B. shows the angle between longitudinal axis and airflow.",
              "C. shows the angle between vertical and airflow.",
              "D. shows the angle between horizontal and airflow."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The Mach meter:",
            "options": [
              "A. shows velocity divided by speed of sound.",
              "B. shows speed of sound divided by velocity.",
              "C. shows velocity squared divided by speed of sound.",
              "D. shows speed of sound squared divided by velocity."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The altimeter:",
            "options": [
              "A. measures pressure altitude.",
              "B. measures density altitude.",
              "C. measures true altitude.",
              "D. measures indicated altitude."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The airspeed indicator:",
            "options": [
              "A. measures true airspeed.",
              "B. measures indicated airspeed.",
              "C. measures ground speed.",
              "D. measures Mach number."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The vertical speed indicator:",
            "options": [
              "A. measures rate of climb.",
              "B. measures rate of descent.",
              "C. measures both climb and descent.",
              "D. measures horizontal speed."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The turn coordinator:",
            "options": [
              "A. shows rate of turn.",
              "B. shows bank angle.",
              "C. shows both rate and bank.",
              "D. shows neither rate nor bank."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The attitude indicator:",
            "options": [
              "A. shows pitch and roll.",
              "B. shows yaw and pitch.",
              "C. shows roll and yaw.",
              "D. shows only pitch."
            ],
            "correct": 0,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Principles of Flight Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The gyroscope in the attitude indicator:",
            "options": [
              "A. maintains vertical orientation.",
              "B. maintains horizontal orientation.",
              "C. maintains directional orientation.",
              "D. maintains speed orientation."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The directional gyroscope:",
            "options": [
              "A. maintains vertical orientation.",
              "B. maintains horizontal orientation.",
              "C. maintains directional orientation.",
              "D. maintains speed orientation."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The pitot tube measures:",
            "options": [
              "A. static pressure.",
              "B. dynamic pressure.",
              "C. total pressure.",
              "D. differential pressure."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The static port measures:",
            "options": [
              "A. static pressure.",
              "B. dynamic pressure.",
              "C. total pressure.",
              "D. differential pressure."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The pitot-static system:",
            "options": [
              "A. measures airspeed and altitude.",
              "B. measures altitude only.",
              "C. measures airspeed only.",
              "D. measures temperature."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The aneroid barometer:",
            "options": [
              "A. uses liquid mercury.",
              "B. uses evacuated capsule.",
              "C. uses bourdon tube.",
              "D. uses manometer."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The accelerometer:",
            "options": [
              "A. measures linear acceleration.",
              "B. measures angular acceleration.",
              "C. measures velocity.",
              "D. measures displacement."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The rate gyro:",
            "options": [
              "A. measures angular velocity.",
              "B. measures linear velocity.",
              "C. measures acceleration.",
              "D. measures displacement."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The autopilot:",
            "options": [
              "A. controls pitch only.",
              "B. controls roll only.",
              "C. controls yaw only.",
              "D. controls all axes."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The flight management system:",
            "options": [
              "A. manages navigation only.",
              "B. manages flight planning only.",
              "C. manages both navigation and flight planning.",
              "D. manages engine control only."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The inertial navigation system:",
            "options": [
              "A. uses ground-based transmitters.",
              "B. uses satellite signals.",
              "C. uses inertial sensors.",
              "D. uses radio beacons."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The global positioning system:",
            "options": [
              "A. uses ground-based transmitters.",
              "B. uses satellite signals.",
              "C. uses inertial sensors.",
              "D. uses radio beacons."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The very high frequency omnidirectional range:",
            "options": [
              "A. provides bearing information.",
              "B. provides distance information.",
              "C. provides both bearing and distance.",
              "D. provides altitude information."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The distance measuring equipment:",
            "options": [
              "A. provides bearing information.",
              "B. provides distance information.",
              "C. provides both bearing and distance.",
              "D. provides altitude information."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The instrument landing system:",
            "options": [
              "A. provides lateral guidance only.",
              "B. provides vertical guidance only.",
              "C. provides both lateral and vertical guidance.",
              "D. provides distance information."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The microwave landing system:",
            "options": [
              "A. provides lateral guidance only.",
              "B. provides vertical guidance only.",
              "C. provides both lateral and vertical guidance.",
              "D. provides distance information."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The ground proximity warning system:",
            "options": [
              "A. warns of terrain ahead.",
              "B. warns of traffic ahead.",
              "C. warns of weather ahead.",
              "D. warns of engine failure."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The traffic collision avoidance system:",
            "options": [
              "A. warns of terrain ahead.",
              "B. warns of traffic ahead.",
              "C. warns of weather ahead.",
              "D. warns of engine failure."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The weather radar:",
            "options": [
              "A. detects precipitation.",
              "B. detects terrain.",
              "C. detects traffic.",
              "D. detects wind shear."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The wind shear detection system:",
            "options": [
              "A. detects precipitation.",
              "B. detects terrain.",
              "C. detects traffic.",
              "D. detects wind shear."
            ],
            "correct": 3,
            "explanation": ""
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
              "A. 5 NM from the touchdown.",
              "B. 1.5 NM from the touchdown.",
              "C. 4 NM from the touchdown.",
              "D. 2 NM from the touchdown."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The speed limit (IAS) in airspace E is:",
            "options": [
              "A. 250 kt for IFR and VFR, below FL100.",
              "B. 250 kt for IFR only, below FL195.",
              "C. 250 kt for IFR and VFR, at all altitudes.",
              "D. 250 kt for IFR only, below FL100."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What action should be taken when, during an IFR flight in VMC, you suffer a radio failure?",
            "options": [
              "A. Return to the aerodrome from which you departed.",
              "B. Continue flying in VMC and land as soon as possible.",
              "C. Maintain your assigned altitude and land at the nearest aerodrome at which there are VMC conditions.",
              "D. Continue flying at your assigned altitude and start your approach at your ETA."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Who is responsible for the safety of an ATC clearance concerning terrain clearance?",
            "options": [
              "A. The ATS reporting point when accepting the flight plan.",
              "B. The Captain.",
              "C. The Operator of the aircraft.",
              "D. ATC."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "An ATS airspace, in which IFR and VFR flights are permitted and all flights receive air traffic control service, IFR flights are separated from other IFR flights and receive traffic information concerning VFR flights and VFR flights receive traffic information concerning all other flights, is classified as:",
            "options": [
              "A. Airspace E",
              "B. Airspace B",
              "C. Airspace A",
              "D. Airspace D"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What does DER mean?",
            "options": [
              "A. distance end of route.",
              "B. departure end of runway.",
              "C. distance end of runway.",
              "D. departure end of route."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In Mode 2 Parallel Runway operations, a minimum radar separation can be provided of:",
            "options": [
              "A. 3 NM between aircraft on the same localizer course.",
              "B. 2 NM between aircraft on the same localizer course.",
              "C. 3 NM between aircraft on adjacent localizer courses.",
              "D. 5 NM between aircraft on the same localizer course."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Except in special cases, the establishment of change-over points shall be limited to route segments of:",
            "options": [
              "A. 100 NM or more.",
              "B. 75 NM or more.",
              "C. 60 NM or more.",
              "D. 50 NM or more."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "For a controlled flight before departure, a flight plan must be filed at least:",
            "options": [
              "A. 50 minutes before off-block time.",
              "B. 60 minutes before departure.",
              "C. 10 minutes before departure.",
              "D. 30 minutes before off-block time."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In an instrument approach procedure, the segment where the aircraft is lined up with the runway centre line and when the decent is commenced is called:",
            "options": [
              "A. intermediate approach segment.",
              "B. initial approach segment.",
              "C. arrival segment.",
              "D. final approach segment."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Except when cleared by an ATC unit, a VFR flight cannot enter or Leave a Control Zone when the cloud base is lower than:",
            "options": [
              "A. 1000 ft and less than 8 km visibility.",
              "B. 2000 ft and less than 5 km visibility.",
              "C. 1500 ft or less than 5 km visibility.",
              "D. 1000 ft and less than 5 km visibility."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "ICAO Annex 17 lays down the rules to establish security measures for passengers with regard to:",
            "options": [
              "A. cabin baggage, checked baggage, cargo and other goods, access control and airport design.",
              "B. cabin baggage and checked baggage.",
              "C. passenger baggage.",
              "D. cabin baggage, checked baggage, cargo and other goods and access control."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When doing a procedure turn ($45^{\\circ}/180^{\\circ}$) going outbound turned $45^{\\circ}$ off track, the time taken from the beginning of the turn for Cat A and Cat B aircraft is:",
            "options": [
              "A. 1 minute 30 seconds.",
              "B. 1 minute.",
              "C. 1 minute 15 seconds.",
              "D. 2 minutes."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "When requesting to engage the parking brake, a marshaller will give the following signal:",
            "options": [
              "A. arms repeatedly crossed over the head.",
              "B. arms placed down and crossed in front of the body moving horizontally.",
              "C. raise arm and hand with fingers extended horizontally in front of the body. Then clench fist.",
              "D. arms placed horizontally sideways with palms towards the ground beckoning downwards."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Concerning the three entries to the hold, the entry has to be flown on:",
            "options": [
              "A. heading",
              "B. track",
              "C. course",
              "D. bearing"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft, on a radar approach, should be told to consider making a missed approach when the aircraft is not visible on the radar screen for a significant period of time and when it is within:",
            "options": [
              "A. the last 2 NM of the approach.",
              "B. the last 5 NM of the approach.",
              "C. the last 4 NM of the approach.",
              "D. the last 3 NM of the approach."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Clocks and other timing equipment used by air traffic services must be checked in order to be able to give the time within plus or minus:",
            "options": [
              "A. 15 seconds of UTC.",
              "B. 10 seconds of UTC.",
              "C. 30 seconds of UTC.",
              "D. 1 minute of UTC."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "When given instructions to set a mode/code, a pilot shall:",
            "options": [
              "A. only use the word \"wilco\".",
              "B. only read back the code.",
              "C. only use the word \"roger\".",
              "D. read back mode and code."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "In order to satisfy lateral track separation between aircraft using the same fix and Dead Reckoning, the aircraft:",
            "options": [
              "A. have to fly $45^{\\circ}$ separated at a distance of 15 miles or more from the fix.",
              "B. have to fly $45^{\\circ}$ separated at a distance of 15 NM or more from the fix.",
              "C. have to fly 30� separated at a distance of 15 NM or more from the fix.",
              "D. have to fly $30^{\\circ}$ separated at a distance of 15 miles or more from the fix."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Who has the final authority as to the disposition of the aircraft?",
            "options": [
              "A. The State.",
              "B. The Operator.",
              "C. The Commander.",
              "D. The owner."
            ],
            "correct": 2,
            "explanation": ""
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
              "A. 2000 ft above the highest obstacle within 8 km of the heading.",
              "B. 1000 ft above the highest obstacle within 8 km of the estimated position of the aircraft.",
              "C. 1000 ft above the highest obstacle within 8 NM of the planned track.",
              "D. 2000 ft above the highest obstacle within 8 NM of the planned track."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "It says in the annex of the ICAO convention that the sizes of airfields are specified by codes for different runways. What is the minimum width of a runway with runway code 4?",
            "options": [
              "A. 40 m.",
              "B. 45 m.",
              "C. 50 m.",
              "D. 35 m."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A manoeuvre where a turn is made from a \"designated track\" followed by a turn in the opposite direction to enable the aircraft to fly the prescribed track is called a:",
            "options": [
              "A. base turn.",
              "B. reverse track.",
              "C. race track.",
              "D. procedure turn."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "How many red lights have to be seen by the pilot, whose aircraft on final approach follows a normal PAPI defined glide-path?",
            "options": [
              "A. 2",
              "B. none",
              "C. 3",
              "D. 1"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "If the track on an instrument departure is published, the pilot is expected to:",
            "options": [
              "A. correct for the known wind so as to maintain the published track.",
              "B. ask ATC for another heading to steer correcting for wind.",
              "C. ignore the wind and proceed with a heading equal to the track.",
              "D. ask ATC for permission to correct heading for wind."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Transition Level:",
            "options": [
              "A. will be given by NOTAM.",
              "B. is published on every approach and landing chart for every airfield.",
              "C. will be calculated by the pilot-in-command.",
              "D. will be calculated by the ATC service of an ATS unit."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The person having overall responsibility of an aircraft during flight is the:",
            "options": [
              "A. pilot-in-command.",
              "B. operator.",
              "C. ATC Controller if the aircraft is in controlled airspace.",
              "D. owner of the aircraft."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft which is not concerned with regular international flights and which makes a flight to or via a dedicated aerodrome of a member State and is temporarily free of taxes is admitted and will stay within that State without paying customs:",
            "options": [
              "A. during a period which is determined by the State.",
              "B. during a period of 24 hours.",
              "C. during a period of 12 hours.",
              "D. during a period of 48 hours."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When someone's admittance to a country is refused and he/she is brought back to the operator for transportation away from the territory of the state:",
            "options": [
              "A. the operator will not take any transportation costs from the passenger which arise from his/her inadmissibility.",
              "B. the operator is not responsible for that person, to whom the admittance to the host country is refused.",
              "C. the operator and state of the operator are both responsible for the refused person.",
              "D. the operator will not be prevented from taking any transportation costs from a person which arises out of his/her inadmissibility."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A clearway is a squared area that is established to:",
            "options": [
              "A. protect aircraft during take-off and landing.",
              "B. enable the aircraft to stop in the case of an aborted take-off.",
              "C. enable the aircraft to make a part of the initial climb to a specified altitude.",
              "D. decrease the risk of damage to aircraft which run off the end of the runway."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Close to an aerodrome that will be used for landing by aircraft, the vertical position shall be expressed as:",
            "options": [
              "A. altitude above sea level on or above transition altitude.",
              "B. flight level on or under the transition altitude.",
              "C. flight level on or under the transition level.",
              "D. altitude above sea level at or below transition altitude."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Aircraft A flies in VMC with an ATC clearance within a control area. Aircraft B without ATC clearance approaches at roughly the same height on a converging heading. Who has right of way?",
            "options": [
              "A. Aircraft A, regardless of the direction from which B approaches.",
              "B. Aircraft B, regardless of the direction from which A approaches.",
              "C. Aircraft A, if B is to the right of him.",
              "D. Aircraft B, if A is to the left of him."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Concerning aircraft registration markings, no combinations can be used if they can be mistaken for:",
            "options": [
              "A. codes which are used for identification of ICAO documents.",
              "B. letter combinations beginning with XXX.",
              "C. 3 letter combinations which are used by international code of signals.",
              "D. 5 letter combinations which are used by international code of signals."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "An aircraft flies over mountainous terrain at which a search and rescue operation is conducted to find survivors of a plane crash. The pilot sees a ground sign in the form of an \"X\". This indicates:",
            "options": [
              "A. we have found all personnel.",
              "B. engineering assistance required.",
              "C. landing impossible.",
              "D. require medical assistance."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Temporary changes of long duration in specifications for AIP supplements and information of short duration, which contains extensive text and / or graphical representation, has to be published as AIP supplements. Long duration is considered to be:",
            "options": [
              "A. 3 months or longer.",
              "B. 2 months or longer.",
              "C. 1 year or longer.",
              "D. 6 months or longer."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "A controlled flight is required to inform the concerned ATC unit when the average TAS at cruising level deviates or is expected to deviate compared to that given TAS in the Flight Plan by at least plus or minus:",
            "options": [
              "A. 10%.",
              "B. 3%.",
              "C. 5%.",
              "D. 2%."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "An aircraft is expected to overtake another aircraft if it is closing from behind in a sector of:",
            "options": [
              "A. $50^{\\circ}$ both sides of the longitudinal axis.",
              "B. $60^{\\circ}$ both sides of the longitudinal axis.",
              "C. $80^{\\circ}$ both sides of the longitudinal axis.",
              "D. $70^{\\circ}$ both sides of the longitudinal axis."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Pilots are not allowed to use the ident function on their SSR, unless:",
            "options": [
              "A. they operate outside controlled airspace.",
              "B. if asked by ATC.",
              "C. they are within controlled airspace.",
              "D. they operate a transponder with mode C."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The transition from altitude to flight level and visa versa is made:",
            "options": [
              "A. on the transition level in the climb and transition altitude in the descent.",
              "B. at the transition altitude in the climb and transition level in the descent.",
              "C. at the transition level only.",
              "D. at the transition altitude only."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "It is permitted in a particular sector, if there is a conspicuous obstacle in the visual manoeuvring area outside the final and missed approach areas, to disregard that obstacle. When using this option, the published procedure shall:",
            "options": [
              "A. circling is only permitted in VMC.",
              "B. recommended not to execute a circling approach in the entire sector in which the obstacle is situated.",
              "C. prohibit a circling approach for the concerned runway.",
              "D. forbid a circling approach in the entire sector in which the obstacle is located."
            ],
            "correct": 3,
            "explanation": ""
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
              "A. the pilot follows the published approach procedures.",
              "B. the aircraft receives radar vectors.",
              "C. the pilot has visual contact with the runway and surrounding terrain and is able to maintain visual contact.",
              "D. all of the above."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Lights on an airfield or in the vicinity can be extinguished if they can be re-lit:",
            "options": [
              "A. at least 5 minutes before the ETA of the aircraft.",
              "B. at least 15 minutes before the ETA of the aircraft.",
              "C. at least 30 minutes before the ETA of the aircraft.",
              "D. at least 60 minutes before the ETA of the aircraft."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Air Traffic Service unit consists of:",
            "options": [
              "A. Air Traffic Control Units and Flight Information Centres.",
              "B. Flight Information Centres and Air Services Reporting offices.",
              "C. Air Traffic Control Units, Flight Information Centres and Air Traffic Services Reporting offices.",
              "D. Air Services Reporting offices and Air Traffic Control Units."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A marshaller crosses his/her hands in front of the face, palms outwards and then moves the arms outwards. What does this signal indicate?",
            "options": [
              "A. Clear to move forward.",
              "B. Brakes off.",
              "C. Remove chocks.",
              "D. Clear to close all engines."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A fixed obstacle that extends above a take-off climb surface within ___ shall be marked and, if the runway is to be used at night, must be lit.",
            "options": [
              "A. 3000 m",
              "B. 3000 ft",
              "C. 5000 m",
              "D. 2 NM"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Repetitive flight plans (RPLs) cannot be used for flights other than those executed frequently on the same days of following weeks and:",
            "options": [
              "A. for at least 20 occasions or every day over a period of at least 20 consecutive days.",
              "B. for at least 20 consecutive days.",
              "C. for at least 10 occasions or every day over a period of at least 10 consecutive days.",
              "D. for at least 20 occasions."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A PAPI must consist of:",
            "options": [
              "A. a row of 4 multiple lights or paired units without transition zone, at equal distance from each other.",
              "B. two rows of 4 multiple lights or paired units without transition zone, at equal distance from each other.",
              "C. a row of 2 multiple lights or paired units without transition zone, at equal distance from each other.",
              "D. two rows of 6 multiple lights or paired units without transition zone, at equal distance from each other."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the length of the approach lighting system of a Cat II precision landing runway?",
            "options": [
              "A. 900 m.",
              "B. 600 m.",
              "C. 300 m.",
              "D. 150 m."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "According to international agreements the wind direction must be given in degrees magnetic converted with local magnetic variation from the true wind direction:",
            "options": [
              "A. before landing and taxi for take-off.",
              "B. in anticipation of the upper wind for areas North of $60^{\\circ}$ N and South of $60^{\\circ}$ S.",
              "C. when an aircraft is requested by the meteorological office or on specified points to give a PIREP.",
              "D. when the local variation is greater than $10^{\\circ}$ East or West."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft is maintaining FL150 in Class C Airspace. Another aircraft below at FL140 receives a clearance to descend to FL70. There is severe turbulence in the area. When at earliest can a clearance be expected to descend to FL140 or lower?",
            "options": [
              "A. When the other aircraft has reported to be descending through FL130.",
              "B. When the other aircraft has reported to have left FL120.",
              "C. When the other aircraft has reported to have left FL140.",
              "D. When the other aircraft has reached FL70."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The VMC minima for a VFR flight within ATS airspace class B are:",
            "options": [
              "A. 8 km visibility at or above 3050 m AMSL and clear of cloud.",
              "B. 5 NM visibility at or above 3050 m AMSL, 1500 m horizontal and 300 m vertical clear of cloud.",
              "C. 8 km visibility at or above 3050 m AMSL, 1500 m horizontal and 300 m vertical clear of cloud.",
              "D. 5 NM visibility at or above 3050 m AMSL and clear of cloud."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "When independent parallel approaches are used on parallel runways and headings (vectors) are given to intercept the ILS, the given heading must be such that the aeroplane can establish on the localizer course or the MLS final approach track in level flight over at least:",
            "options": [
              "A. 2.5 NM before the ILS glide slope or the specified MLS elevation angle is intercepted.",
              "B. 1.5 NM before the ILS glide slope or the specified MLS elevation angle is intercepted.",
              "C. 3.0 NM before the ILS glide slope or the specified MLS elevation angle is intercepted.",
              "D. 2.0 NM before the ILS glide slope or the specified MLS elevation angle is intercepted."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "When the captain cannot comply with an ATC clearance:",
            "options": [
              "A. the Captain must accept the ATC clearance, because it is based on a filed flight plan.",
              "B. he/she may request an amended clearance and, if executable, he/she will accept that clearance.",
              "C. he/she may ask for a new clearance and the appropriate ATC must grant him/ her that clearance.",
              "D. he/she may suggest a new clearance to ATC."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The minimum number of rescue and fire fighting vehicles required for a Cat 8 Aerodrome is:",
            "options": [
              "A. 3",
              "B. 4",
              "C. 5",
              "D. None of the above is correct."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Lights at the end of the runway shall be:",
            "options": [
              "A. steady unidirectional lights radiating white light in the direction of the runway.",
              "B. steady white lights with controllable intensity.",
              "C. steady omni-directional red lights with controllable intensity.",
              "D. steady unidirectional lights radiating red light in the direction of the runway."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What is required for an IFR flight in advisory airspace?",
            "options": [
              "A. No flight plan required.",
              "B. Flight plan required and PIC must notify of any changes regardless if wanting advisory service or not.",
              "C. Flight plan required but PIC need not notify of any changes.",
              "D. A flight plan is only required if advisory service is required."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The transition from IFR to VFR is done:",
            "options": [
              "A. on the Captain's initiative.",
              "B. whenever an aircraft in VMC leaves controlled airspace.",
              "C. if told by ATC.",
              "D. at the clearance limit, disregarding the weather situation."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The longitudinal separation minimum based on time between aircraft at the same FL, where there is enough coverage for navigation aids and the preceding aircraft has a higher true airspeed of 20 kt minimum is:",
            "options": [
              "A. 3 minutes.",
              "B. 15 minutes.",
              "C. 5 minutes.",
              "D. 10 minutes."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The minimum response time for the aerodrome rescue and fire fighting services to the end of each runway as well as to any other part of the movement area is:",
            "options": [
              "A. 3 minutes and not exceeding 4 minutes.",
              "B. 2 minutes and not exceeding 3 minutes.",
              "C. 2 minutes and not exceeding 4 minutes.",
              "D. 3 minutes and not exceeding 5 minutes."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the separation that must be maintained before intercepting the ILS on an independent parallel approach?",
            "options": [
              "A. 1000 ft.",
              "B. 500 ft.",
              "C. 330 ft.",
              "D. 660 ft."
            ],
            "correct": 0,
            "explanation": ""
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
              "A. an aircraft requiring a Certificate of Airworthiness.",
              "B. an aircraft with a Certificate of Airworthiness issued by the State.",
              "C. an aircraft that requires multi-pilot operation.",
              "D. an aircraft that requires additional skills training."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Fixed distance markers, when provided, shall commence:",
            "options": [
              "A. 150 metres from the threshold.",
              "B. 300 metres from the far end threshold.",
              "C. 300 metres from the threshold.",
              "D. 150 metres from the far end threshold."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the minimum width of a code 4 runway?",
            "options": [
              "A. 18 m.",
              "B. 23 m.",
              "C. 30 m.",
              "D. 45 m."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A TODA consists of:",
            "options": [
              "A. the take-off run available excluding the clearway.",
              "B. the take-off run available including the clearway.",
              "C. the take-off run available excluding the stopway.",
              "D. the take-off run available only."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Temporary changes of long duration (3 months or more) and information of short duration which contains extensive graphics and/or text are published as AIP Supplements. Check lists of these Supplements which are in force are sent to recipients at intervals of not more than:",
            "options": [
              "A. one year.",
              "B. one month.",
              "C. one week.",
              "D. 2 weeks."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The operator is responsible for the custody and care of the passengers. This responsibility shall terminate:",
            "options": [
              "A. from the moment they have been cleared through customs of the destination State.",
              "B. from the moment they step from the aircraft onto the passenger exit stairs.",
              "C. from the moment they have been admitted into the destination State.",
              "D. from the moment they step from the aircraft onto the ground of the destination State."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If an aircraft is radar vectored to intercept an ILS localizer, what is the maximum intercept angle?",
            "options": [
              "A. 45�.",
              "B. $30^{\\circ}$.",
              "C. $15^{\\circ}$.",
              "D. $20^{\\circ}$."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If no ICAO identifier has been attributed to an aerodrome, what should be entered in Box 16 of the Flight Plan?",
            "options": [
              "A. ZZZZ.",
              "B. NNNN.",
              "C. A/N.",
              "D. A/D XXX."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the width of a code letter D taxiway used by aircraft with an outer gear wheel span of more than 9 m ?",
            "options": [
              "A. 10.5 m.",
              "B. 15 m.",
              "C. 23 m.",
              "D. 18 m."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Which International Agreement relates to Penal Law?",
            "options": [
              "A. Tokyo.",
              "B. Montreal.",
              "C. Hague.",
              "D. Rome."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The continued validity of a C of A (certificate of airworthiness) of an aircraft is subject to the laws of:",
            "options": [
              "A. the State of Registration.",
              "B. the State of Registration and the State of the Operator.",
              "C. the State of the Operator.",
              "D. the State of Registry and the State of Design."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An RNP1 route designated as A342Y, indicates that the route is at or above FL200 and all turns shall be made within the allowable RNP tolerance of a tangential arc between the straight leg segments with a radius of:",
            "options": [
              "A. 10 NM for turns between $30^{\\circ}$ and $90^{\\circ}$.",
              "B. 15 NM for turns between $30^{\\circ}$ and $90^{\\circ}$.",
              "C. 22.5 NM for turns between $30^{\\circ}$ and $90^{\\circ}$.",
              "D. 30 NM for turns between $30^{\\circ}$ and $90^{\\circ}$."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "ATIS will only broadcast cloud base information when the cloud base is:",
            "options": [
              "A. 3000 ft.",
              "B. 5000 ft.",
              "C. when Cb are present.",
              "D. when the cloud base is below MSA."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Voice ATIS:",
            "options": [
              "1. cannot be broadcast on a voice ILS 2. cannot be broadcast on voice VOR 3. is broadcast only on a discreet VHF frequency 4. is broadcast on either a discreet VFH, VOR or an ILS frequency",
              "A. 1 only is correct.",
              "B. 2 only is correct.",
              "C. 4 only is correct.",
              "D. 1, 2 and 3 are correct."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Which of the following is not a valid SSR mode A squawk?",
            "options": [
              "A. A555.",
              "B. A5678.",
              "C. A2345.",
              "D. A3333."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What are the objectives of ATC Services?",
            "options": [
              "A. To prevent collisions between aircraft, to prevent collisions between aircraft on the manoeuvring area and obstructions on that area and to expedite and maintain an orderly flow of air traffic.",
              "B. To prevent collisions between controlled aircraft and to expedite and maintain an orderly flow of air traffic.",
              "C. To provide separation of aircraft and to expedite and maintain an orderly flow of air traffic.",
              "D. To provide separation of controlled aircraft and to expedite and maintain an orderly flow of air traffic."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An RNP1 route designated as A342Z, indicates that the route is at or below FL190 and all turns shall be made within the allowable RNP tolerance of a tangential arc between the straight leg segments with a radius of:",
            "options": [
              "A. 10 NM for turns between $30^{\\circ}$ and $90^{\\circ}$.",
              "B. 15 NM for turns between $30^{\\circ}$ and $90^{\\circ}$.",
              "C. 22.5 NM for turns between $30^{\\circ}$ and $90^{\\circ}$.",
              "D. 30 NM for turns between $30^{\\circ}$ and $90^{\\circ}$."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the meaning of the signal LLL from search parties?",
            "options": [
              "A. We have only found some personnel.",
              "B. We have found all personnel.",
              "C. Operation completed.",
              "D. Nothing found."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A check list of AIP Supplements is published:",
            "options": [
              "A. annually.",
              "B. monthly.",
              "C. weekly.",
              "D. every six months."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A heavy aircraft makes a missed approach on a parallel runway in the opposite direction. A light aircraft has a wake turbulence separation of 2 minutes. This wake turbulence separation will apply when the parallel runways are:",
            "options": [
              "A. more than 760 m apart.",
              "B. more than 915 m apart.",
              "C. less than 915 m apart.",
              "D. less than 760 m apart."
            ],
            "correct": 3,
            "explanation": ""
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
              "A. 60 mins of estimated off-blocks time (EOBT)",
              "B. 30 mins of estimated off-blocks time (EOBT)",
              "C. 60 mins of estimated time of ETD",
              "D. 30 mins of estimated time of ETD"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A separation minima shall be applied between a light or medium aircraft and a heavy and between a light and a medium aircraft when the heavier aircraft is making a low or missed approach and the lighter aircraft is utilizing an opposite direction runway on a parallel runway separated by:",
            "options": [
              "A. less than 915 m.",
              "B. more than 760 m.",
              "C. less than 760 m.",
              "D. more than 915 m."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "According to EASA Part-FCL, recognized instructor categories are:",
            "options": [
              "A. FI(A), TRI(A), CRI(A), IRI(A) only.",
              "B. FI(A) and CRI(A) only.",
              "C. FI(A) and IRI(A) only.",
              "D. FI(A), TRI(A), CRI(A). IRI(A), MCCI(A) and SFI(A) only."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Independent parallel approaches may be conducted to parallel runways provided that an NTZ (non transgression zone) of at least:",
            "options": [
              "A. 915 m is established between extended centre lines.",
              "B. 760 m is established between extended centre lines.",
              "C. 1035 m is established between extended centre lines.",
              "D. 610 m wide is established between extended centre lines."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "When a State renders valid a licence issued by another Contracting State, as an alternative to issuance of its own licence, the validity shall:",
            "options": [
              "A. not extend beyond 15 days after the validity of the licence.",
              "B. not extend beyond the period of validity of the licence.",
              "C. be at the discretion of the Contracting State rendering it valid.",
              "D. be at the discretion of ICAO."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "ATIS broadcasts contain cloud details whenever the:",
            "options": [
              "A. Cloud ceiling is below 5000 ft or the highest MSA (whichever is the higher)",
              "B. Cloud base is below 5000 ft or the highest MSA (whichever is the higher)",
              "C. Cloud ceiling is below 1500 ft or the highest MSA (whichever is the higher)",
              "D. Cloud base is below 1500 ft or the highest MSA (whichever is the higher)"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Contracting states shall carry out the handling, forwarding and clearance of airmail and shall comply with the documentary procedures as prescribed by:",
            "options": [
              "A. the Acts in force of the Universal Postal Union.",
              "B. the Acts in force of the General Postal Union.",
              "C. the Acts in force of the Warsaw Convention.",
              "D. the Acts in force of the International Postal Union."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "For an instrument runway, how far from the centre line of the runway is a \"runway vacated\" sign positioned?",
            "options": [
              "A. To a distance of the nearest Pattern \"A\" holding position.",
              "B. At the end of the ILS/MLS Sensitive Area.",
              "C. It depends on the Aerodrome Category.",
              "D. 85 m."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The International Civil Aviation Organization (ICAO) establishes:",
            "options": [
              "A. standards and recommended international practices for contracting member states.",
              "B. aeronautical standards adopted by all states.",
              "C. proposals for aeronautical regulations in the form of 18 annexes.",
              "D. standards and recommended practices applied without exception by all states, signatory to the Chicago convention."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An area symmetrical about the extended runway centre line and adjacent to the end of the strip, primarily intended to reduce the risk of damage to an aircraft undershooting or overrunning the runway is defined as a:",
            "options": [
              "A. clearway.",
              "B. runway strip extension.",
              "C. runway end safety area.",
              "D. altimeter operating area extension."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Where in the AIP would you find details on instrument holding procedures?",
            "options": [
              "A. GEN",
              "B. ENR",
              "C. AD",
              "D. AGA"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "According to EASA Part-FCL, an applicant for a CPL (A) who has satisfactorily followed and completed an integrated flying training course shall have completed as a pilot of aeroplanes having a certificate of airworthiness issued or accepted by an EASA Member State at least:",
            "options": [
              "A. 150 hours of flight time.",
              "B. 200 hours of flight time.",
              "C. 150 hours of flight time plus 10 hours of instrument ground time.",
              "D. 200 hours of flight time plus 10 hours of instrument ground time."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is required if a stop bar is not provided at a runway entrance and the runway is to be used with RVR of less than 550 m?",
            "options": [
              "A. Both a Pattern \"A\" and \"B\" holding position.",
              "B. High intensity taxiway centreline lights only.",
              "C. Runway guard lights.",
              "D. Both high intensity taxiway centre line lights and high intensity taxiway edge lights."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "According to Annex 7, the registration mark shall be letters, numbers or a combination of letters and numbers and shall be that assigned by:",
            "options": [
              "A. the State of Registry or Common Mark Registering Authority.",
              "B. the State of Registry only.",
              "C. the International Civil Aviation Organisation.",
              "D. the International Telecommunication Union."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When an aircraft subjected to unlawful interference has landed in a Contracting State, it shall notify by the most expeditious means the State of Registry and the State of the Operator of the landing and, in addition, shall similarly transmit all other relevant information to:",
            "options": [
              "A. each State whose citizens suffered fatalities or injuries, each State whose citizens were detained as hostages, each State whose citizens were known to be on board and ICAO.",
              "B. ICAO only.",
              "C. each State whose citizens were known to be on board only.",
              "D. ICAO and each State whose citizens were known to be on board only."
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The State of registration is:",
            "options": [
              "A. The State where the aircraft is first registered",
              "B. The State where the aircraft is currently registered",
              "C. The State where the aircraft is finally assembled",
              "D. The State of the owner of the aircraft"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A contracting state which continues to require the presentation of a cargo manifest shall, apart from the information indicated in the heading of the format of the cargo manifest, not require more than the following items:",
            "options": [
              "A. airway bill number, and the number of packages only.",
              "B. total weight and the number of packages only.",
              "C. total weight and the nature of the goods only.",
              "D. airway bill number, the number of packages and the nature of goods."
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "According to EASA Part-FCL, the privileges of the holder of an unrestricted FI(A) rating are to conduct flight instruction for the issue of a CPL(A):",
            "options": [
              "A. provided that the FI(A) has completed not less than 15 hours on the relevant type in the preceding 12 months.",
              "B. provided that the FI(A) has completed at least 500 hours of flight time as a pilot of aeroplanes including at least 200 hours of flight instruction.",
              "C. without restriction.",
              "D. provided that the FI(A) has completed 200 hours of flight instruction."
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What action should be taken if contact is lost with the runway during a circling approach?",
            "options": [
              "A. Descend to Decision Height and if still no contact with the runway, initiate a missed approach.",
              "B. Land on the instrument runway.",
              "C. Initiate a missed approach.",
              "D. Return to the FAF."
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Unaccompanied baggage carried by air shall be cleared under a procedure applicable to:",
            "options": [
              "A. accompanied baggage or under a simplified customs procedure similar to other cargo.",
              "B. cargo.",
              "C. dangerous goods.",
              "D. mail."
            ],
            "correct": 1,
            "explanation": ""
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
              "A. is zero at the magnetic equator",
              "B. cannot exceed 180°",
              "C. has a maximum value of 45° E or 45° W",
              "D. cannot exceed 90°"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "By what amount must you change your rate of descent given a 10 knot decrease in headwind on a 3° glide slope?",
            "options": [
              "A. 50 feet per minute increase",
              "B. 30 feet per minute increase",
              "C. 50 feet per minute decrease",
              "D. 30 feet per minute decrease"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The main reason that day and night, throughout the year, have different durations is due to the:",
            "options": [
              "A. Earth's rotation",
              "B. relative speed of the Sun along the ecliptic",
              "C. inclination of the ecliptic to the Equator",
              "D. gravitational effect of the Sun and the Moon on the speed of rotation of the Earth"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "X - 45NM - Y - 52NM - Z. ATA X 1435. ETA Y 1458. ETA Z 1512. ATA Y 1455. What is the revised ETA Z?",
            "options": [
              "A. 1509",
              "B. 1506",
              "C. 1503",
              "D. 1512"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A useful method of a pilot resolving, on a visual flight, any uncertainty in the aircraft's position is to maintain visual contact with the ground and:",
            "options": [
              "A. set heading towards a line feature such as a coastline, river or motorway",
              "B. fly the reverse of the heading being flown prior to becoming uncertain until a pinpoint is obtained",
              "C. fly expanding circles until a pinpoint is obtained",
              "D. fly reverse headings and associated timings until the point of departure is reached"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "A - 30NM - B - 20NM - C. ATA A 1010. ETA B 1030. ETA C 1043. ATA B 1027. What is revised ETA C?",
            "options": [
              "A. 1040",
              "B. 1043",
              "C. 1038",
              "D. 1036"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "5 hours 20 minutes and 20 seconds time difference is equivalent to which change of longitude?",
            "options": [
              "A. 81°30'",
              "B. 78°15'",
              "C. 79°10'",
              "D. 80°05'"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "On a direct Mercator chart, great circles are shown as:",
            "options": [
              "A. curves concave to the nearer pole",
              "B. straight lines",
              "C. rhumb lines",
              "D. curves concave to the nearer pole"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the definition of magnetic variation?",
            "options": [
              "A. The angle between the direction indicated by a compass and Magnetic North",
              "B. The angle between True North and Compass North",
              "C. The angle between Magnetic North and True North",
              "D. The angle between Magnetic Heading and Magnetic North"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "At the magnetic equator:",
            "options": [
              "A. dip is zero",
              "B. variation is always maximum",
              "C. deviation is zero",
              "D. the isogonal is an agonic line"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Given: Airport elevation is 1000 feet. QNH is 988 hPa What is the approximate airport pressure altitude?",
            "options": [
              "A. 320",
              "B. 1680",
              "C. -320",
              "D. 680"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "An aircraft starts at position 0410S 17822W and heads true north for 2950 NM, then turns 90 degrees right, and maintains a rhumb line track for 314 kilometres. What is its final position?",
            "options": [
              "A. 5500N 17422W",
              "B. 4500N 17422W",
              "C. 5500N 17738E",
              "D. 4500N 17738E"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Where is the Earth's magnetic field the weakest?",
            "options": [
              "A. About midway between the earth's magnetic poles",
              "B. In the region of the magnetic South Pole",
              "C. In the region of the magnetic North Pole",
              "D. On the geographic equator"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft leaves at 0900UTC on a 250 NM journey with a planned ground speed of 115 knots. After 74 NM the aircraft is 1.5 minutes behind the planned schedule. What is the revised ETA at the destination?",
            "options": [
              "A. 1100",
              "B. 1110",
              "C. 1115",
              "D. 1054"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "You are heading 080°(T) when you get a range and bearing fix from your AWR (Airborne Weather Radar) on a headland at 185 NM 30° left of the nose. What true bearing do you plot on the chart?",
            "options": [
              "A. 050 from the headland, using the headland's meridian",
              "B. 050 from the headland, using the aircraft's meridian",
              "C. 230 from the headland, using the headland's meridian",
              "D. 230 from the headland, using the aircraft's meridian"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Grivation is the combination of:",
            "options": [
              "A. variation and deviation",
              "B. deviation and the agonic value",
              "C. variation and grid convergence",
              "D. grid convergence and deviation"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "On a transverse Mercator chart, the scale factor is 0.9996 on the central meridian. At a point 3° away from the central meridian, the scale is exactly 1. What is the scale at a point 4°30' away from the central meridian?",
            "options": [
              "A. 1 / 0.9996",
              "B. 1 / 1.0000",
              "C. 1 / 1.0004",
              "D. 1 / 1.0002"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Isogrivs are lines that connect positions that have:",
            "options": [
              "A. the same grivation",
              "B. the same variation",
              "C. 0°(M)agnetic dip",
              "D. the same horizontal magnetic field strength"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which of these is a correct statement about the Earth's magnetic field?",
            "options": [
              "A. It has no effect on aircraft deviation",
              "B. The angle of dip is the angle between the vertical and the total magnetic force",
              "C. It may be temporary, transient, or permanent",
              "D. It acts as though there is a large blue magnetic pole in Northern Canada"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A Lambert's Conical conformal chart has standard parallels at 63N and 41N. What is the convergence factor?",
            "options": [
              "A. .891",
              "B. .788",
              "C. .656",
              "D. .707"
            ],
            "correct": 1,
            "explanation": ""
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
              "A. Expands as the cosine of the latitude",
              "B. Expands directly with the secant of the latitude",
              "C. Correct on the standard parallels, expands outside them, contracts within them",
              "D. Expands as the secant of the E/W great circle distance"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Ground speed is 540 knots. 72 NM to go. What is the time to go?",
            "options": [
              "A. 8 min",
              "B. 9 min",
              "C. 18 min",
              "D. 12 min"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "You are on an ILS 3-degree glide slope which passes over the runway threshold at 50 feet. Your DME range is 25 NM from the threshold. What is your height above the runway threshold elevation?",
            "options": [
              "A. 7450 feet",
              "B. 6450 feet",
              "C. 7550 feet",
              "D. 8010 feet"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "1 degree of latitude is equal to:",
            "options": [
              "A. 60 km",
              "B. 1 NM",
              "C. 111 km",
              "D. 1000 km"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the highest latitude listed below at which the sun will rise above the horizon and set every day?",
            "options": [
              "A. 68°N",
              "B. 66°N",
              "C. 62°N",
              "D. 72°N"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In which month does aphelion occur?",
            "options": [
              "A. January",
              "B. March",
              "C. July",
              "D. November"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The scale on a Lambert's conformal conic chart:",
            "options": [
              "A. is constant along a meridian of longitude",
              "B. is constant along a parallel of latitude",
              "C. varies slightly as a function of latitude and longitude",
              "D. is constant across the whole map"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A rhumb line is:",
            "options": [
              "A. the vertex of a conformal polyformic projection",
              "B. a straight line on a Lambert's conformal chart",
              "C. a line on the Earth which cuts all meridians at the same angle",
              "D. the shortest distance between two points on the Earth's surface"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "On a particular take-off, you can accept up to 10 knots tailwind component. The runway QDM is 047°, the variation is 17°E, and the forecast wind is 100°(T) / 30 knots. What is the maximum tailwind component?",
            "options": [
              "A. 18 knots",
              "B. 4 knots",
              "C. 8 knots",
              "D. 11 knots"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "An aircraft at position 60°N 005°W tracks 090°(T) for 315 km. On completion of the flight the longitude will be:",
            "options": [
              "A. 010°40'W",
              "B. 000°15'E",
              "C. 000°40'E",
              "D. 002°10'W"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "At 65 NM from a VOR you commence a descent from FL330 in order to arrive over the VOR at FL80. Your mean ground speed in the descent is 240 knots. What rate of descent is required?",
            "options": [
              "A. 1540 feet/min",
              "B. 1630 feet/min",
              "C. 1270 feet/min",
              "D. 1830 feet/min"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "On a 5% glide slope your groundspeed is 150 kt. What should be your rate of descent to maintain the glide slope?",
            "options": [
              "A. 750 feet/min",
              "B. 450 feet/min",
              "C. 900 feet/min",
              "D. 650 feet/min"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft at position 2700N 17000W travels 3000 km on a track of 180°(T), then 3000 km on a track of 090°(T), then 3000 km on a track of 000°(T), then 3000 km on a track of 270°(T). What is its final position?",
            "options": [
              "A. 2700N 17318W",
              "B. 0000N/S 17000W",
              "C. 2700N 17000W",
              "D. 2700N 14300W"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Your pressure altitude is FL55, the QNH is 998, and the SAT is +30°C. What is the density altitude?",
            "options": [
              "A. 6980 feet",
              "B. 7750 feet",
              "C. 8620 feet",
              "D. 10020 feet"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Reference Jeppesen E(LO)1, position 5211N 00706W, which of the following denotes all the symbols?",
            "options": [
              "A. Military airport, ILS, NDB",
              "B. Civil airport, VOR, ILS",
              "C. Military airport, VOR, ILS",
              "D. Civil airport, ILS, NDB"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "An aircraft at FL370 is required to commence descent at 120 NM from a VOR and to cross the facility at FL130. If the mean GS for the descent is 288 kt, the minimum rate of descent required is:",
            "options": [
              "A. 920 ft/min",
              "B. 890 ft/min",
              "C. 860 ft/min",
              "D. 960 ft/min"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "You are heading 345°(M), the variation is 20°E, and you take a radar bearing of 30° left of the nose from an island. What bearing do you plot from the island?",
            "options": [
              "A. 160°(T)",
              "B. 155°(T)",
              "C. 140°(T)",
              "D. 180°(T)"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The agonic line:",
            "options": [
              "A. is midway between the magnetic North and South poles",
              "B. follows the geographic equator",
              "C. is the shorter distance between the respective True and Magnetic North and South poles",
              "D. indicates zero variation"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The pressure alt is 29000 feet and the SAT is -55°C. What is the density altitude?",
            "options": [
              "A. 27500 feet",
              "B. 26000 feet",
              "C. 30000 feet",
              "D. 31000 feet"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "On the Jeppesen E(LO)1 chart, what are the symbols at Sligo (5354.8N 00849.1W)?",
            "options": [
              "A. VOR, NDB, DME, compulsory reporting point",
              "B. Civil airport, NDB, DME, compulsory reporting point",
              "C. Civil airport, VOR, DME, non-compulsory reporting point",
              "D. VOR, NDB, DME, non-compulsory reporting point"
            ],
            "correct": 1,
            "explanation": ""
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
              "A. 40000 NM",
              "B. 10800 NM",
              "C. 5400 NM",
              "D. 21600 NM"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Position A is at 70S 030W, position B is 70S 060E. What is the great circle track of B from A, measured at A?",
            "options": [
              "A. 132°(T)",
              "B. 048°(T)",
              "C. 090°(T)",
              "D. 228°(T)"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft is at 10°N and is flying North at 444 km/hour. After 3 hours the latitude is:",
            "options": [
              "A. 10°S",
              "B. 02°S",
              "C. 22°N",
              "D. 00°N/S"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "An aircraft's compass must be swung:",
            "options": [
              "A. if the aircraft has been in the hangar for a long time and has been moved several times",
              "B. if the aircraft has been subjected to hammering",
              "C. every maintenance inspection",
              "D. after a change of theatre of operations at the same magnetic latitude"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Track = 090°(T), TAS = 460 knots, W/V = 360°(T) / 100, Variation = 12°E, Deviation = -2. What is the compass heading and the ground speed?",
            "options": [
              "A. 079° 470 knots",
              "B. 067° 450 knots",
              "C. 068° 460 knots",
              "D. 070° 455 knots"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "An aircraft departs a point 0400N 17000W and flies 240 NM South, followed by 240 NM East, then 240 NM North, then 240 NM West. What is its final position?",
            "options": [
              "A. 0400N 17000W",
              "B. 0600S 17000W",
              "C. 0400N 170°35.9'W",
              "D. 0400N 169°01.8'W"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the weight in kilograms of 380 US Gallons at a Specific Gravity of 0.78?",
            "options": [
              "A. 1123",
              "B. 2470",
              "C. 5434",
              "D. 543"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the reason for seasonal changes in climate?",
            "options": [
              "A. Because the Earth's spin axis is inclined to the plane of its orbit round the Sun",
              "B. Because the distance between the Earth and the Sun varies over the year",
              "C. Because the Sun moves North and South across the Earth's Equator",
              "D. Because the Earth moves around the Sun"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is a line of equal grivation?",
            "options": [
              "A. An isocline",
              "B. An isogonal",
              "C. An isogriv",
              "D. An isovar"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the dip angle at the North Magnetic Pole?",
            "options": [
              "A. 0°",
              "B. 90°",
              "C. 180°",
              "D. 64°"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "You leave A to fly to B, 475 NM away, at 1000 hours. Your ETA at B is 1130. At 1040, you are 190 NM from A. What ground speed is required to arrive on time at B?",
            "options": [
              "A. 342 knots",
              "B. 330 knots",
              "C. 317 knots",
              "D. 360 knots"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the maximum possible value of Dip Angle at either Pole?",
            "options": [
              "A. 66°",
              "B. 180°",
              "C. 90°",
              "D. 45°"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Civil Twilight occurs between:",
            "options": [
              "A. sunset and 6° below the horizon",
              "B. 6° and 12° below the horizon",
              "C. 12° and 18° below the horizon",
              "D. sunrise and sunset"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Isogonal lines converge as follows:",
            "options": [
              "A. at the North Magnetic Pole",
              "B. at the North and South Magnetic and both Geographical Poles",
              "C. at the North and South Magnetic Poles",
              "D. at the Magnetic equator"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The value of magnetic variation on a chart changes with time. This is due to:",
            "options": [
              "A. movement of the magnetic poles, causing an increase",
              "B. increase in the magnetic field, causing an increase",
              "C. reduction in the compass deviation, causing a decrease",
              "D. movement of the magnetic poles, which can cause either an increase or a decrease"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following differences in latitude will give the biggest difference between the initial great circle track and the mean great circle track between two points separated by 10° change of longitude?",
            "options": [
              "A. 60N and 60S",
              "B. 60N and 60N",
              "C. 30S and 30N",
              "D. 30S and 25S"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the approximate value of the 'flattening' of the Earth?",
            "options": [
              "A. 1/1000",
              "B. 1/300",
              "C. 1/500",
              "D. 1/100"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "On a particular direct Mercator wall chart, the full length of the parallel of latitude at 53N is 133 cm long. What is the scale of the chart at 30S?",
            "options": [
              "A. 1: 30000000",
              "B. 1: 18000000",
              "C. 1: 21000000",
              "D. 1: 26000000"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What is the highest latitude on the Earth at which the Sun can be vertically overhead?",
            "options": [
              "A. 23°",
              "B. 66°",
              "C. 45°",
              "D. 90°"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft is at 5530N 03613W, where the variation is 15W. It is tuned to a VOR located at 5330N 03613W, where the variation is 12W. What VOR radial is the aircraft on?",
            "options": [
              "A. 348",
              "B. 012",
              "C. 165",
              "D. 015"
            ],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "General Navigation Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Please refer to Appendix A. What is the chart symbol for a VOR/DME?",
            "options": [
              "A. 6",
              "B. 8",
              "C. 4",
              "D. 7"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "At what latitude does the maximum difference between geodetic and geocentric latitude occur?",
            "options": [
              "A. 0°",
              "B. 45°",
              "C. 60°",
              "D. 90°"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The chart that is generally used for navigation in polar areas is based on a:",
            "options": [
              "A. Direct Mercator Projection",
              "B. Gnomonic projection",
              "C. Lambert conformal projection",
              "D. Stereographic projection"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "On a chart, meridians at 45N are shown every 10 degrees apart. This is shown on the chart by a distance of 14 cm. What is the scale?",
            "options": [
              "A. 1: 2,000,000",
              "B. 1: 4,000,000",
              "C. 1: 5,000,000",
              "D. 1: 5,600,000"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Given: Aircraft height = 2500 feet, ILS GP angle = 3°, at what approximate distance from the threshold can you expect to intercept the glide-path?",
            "options": [
              "A. 8.0 NM",
              "B. 14.5 NM",
              "C. 13.1 NM",
              "D. 7.0 NM"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft at position 0000N/S 16327W flies a track of 225°(T) for 70 NM. What is its new position?",
            "options": [
              "A. 0049N 16238W",
              "B. 0049S 16238W",
              "C. 0049N 16416W",
              "D. 0049S 16416W"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Please refer to Appendix A. What is the chart symbol for an NDB?",
            "options": [
              "A. 1",
              "B. 4",
              "C. 2",
              "D. 13"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "An aircraft is flying around the Earth eastwards along the 60N parallel of latitude at a ground speed of 360 knots. At what ground speed would another aircraft have to fly eastwards along the Equator to fly once round the Earth in the same journey time?",
            "options": [
              "A. 600 knots",
              "B. 240 knots",
              "C. 720 knots",
              "D. 120 knots"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Your position is at 5833N 17400W. You fly exactly 6 NM westwards. What is your new position?",
            "options": [
              "A. 5833N 17411.5W",
              "B. 5833N 17355W",
              "C. 5833N 17340W",
              "D. 5833N 17348.5W"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "At what times of the year does the length of the hours of daylight change most rapidly?",
            "options": [
              "A. Spring Equinox and Autumn Equinox",
              "B. Summer Solstice and Winter Solstice",
              "C. Spring Equinox and Summer Solstice",
              "D. Autumn Equinox and Winter Solstice"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An island is observed to be 15° to the left. The aircraft heading is 120°(M), variation 17°(W). The bearing (�T) from the aircraft to the island is:",
            "options": [
              "A. 268",
              "B. 302",
              "C. 088",
              "D. 122"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A Lambert conformal chart has standard parallels at 15S and 45S. What is the correct longitude scale factor compared to the scale at 30S?",
            "options": [
              "A. Scale at 10S is smaller",
              "B. Scale at 50S is larger",
              "C. Scale at 10S is larger",
              "D. Scale at 50S is smaller"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Convert 80 metres/sec into knots.",
            "options": [
              "A. 155 knots",
              "B. 55 knots",
              "C. 160 knots",
              "D. 16 knots"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The aircraft position is at 5330N 00800W. The VORs are tuned to Shannon (SHA, 5243N 00853W) and Connaught (CON, 5355N 00849W). Which radials will be indicated (SHA / CON)?",
            "options": [
              "A. 023 / 130",
              "B. 221 / 318",
              "C. 042 / 138",
              "D. 213 / 310"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If variation is East, then:",
            "options": [
              "A. true North is West of Magnetic North",
              "B. Compass North is West of Magnetic North",
              "C. True North is East of Magnetic North",
              "D. Magnetic North is West of Compass North"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the chart convergence factor on a Polar Stereographic chart?",
            "options": [
              "A. 0",
              "B. 1.0",
              "C. 0.866",
              "D. 0.5"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the effect on the Mach number and TAS in an aircraft that is climbing with constant CAS?",
            "options": [
              "A. Mach number decreases, TAS decreases",
              "B. Mach number increases, TAS remains constant",
              "C. Mach number increases, TAS increases",
              "D. Mach number remains constant, TAS increases"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Which of the following conversions from True to Compass is the correct one (True / Variation / Magnetic / Deviation / Compass)?",
            "options": [
              "A. 130 / 2W / 132 / -1 / 131",
              "B. 130 / 2E / 132 / -1 / 133",
              "C. 130 / 2W / 132 / -1 / 133",
              "D. 130 / 2E / 132 / -1 / 133"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Please refer to Appendix A. What is the chart symbol for a lighted obstacle?",
            "options": [
              "A. 6",
              "B. 8",
              "C. 9",
              "D. 12"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Please refer to Appendix A. What is the chart symbol for a lightship?",
            "options": [
              "A. 6",
              "B. 8",
              "C. 9",
              "D. 12"
            ],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "General Navigation Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Given: Magnetic heading: 060° Magnetic variation: 8°W Drift angle: 4° right What is the true track?",
            "options": [
              "A. 064°",
              "B. 056°",
              "C. 072°",
              "D. 048°"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "On a Lambert chart, the convergence factor is .78585. What is the parallel of tangency?",
            "options": [
              "A. 51°02'",
              "B. 51°36'",
              "C. 51°15'",
              "D. 51°48'"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The angle between the true great circle track and the true rhumb line track joining the following points: A (60S 165W) and B (60S 177E) at the place of departure A, is:",
            "options": [
              "A. 9°",
              "B. 15.6°",
              "C. 5.2°",
              "D. 7.8°"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "On 27 Feb at 52°S 040°E Sunrise is at 0243UTC. On the same day at 52°S 035°W the time of Sunrise is:",
            "options": [
              "A. 0743 UTC",
              "B. 0243 UTC",
              "C. 2143 UTC",
              "D. 0543 UTC"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft is cruising at FL350, Temp -50°C and is told to descend to FL80, Temp -10°C. If the IAS for the descent was 188 kt, what would be the appropriate TAS?",
            "options": [
              "A. 260 kt",
              "B. 188 kt",
              "C. 335 kt",
              "D. 224 kt"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The sensitivity of a direct reading magnetic compass is:",
            "options": [
              "A. inversely proportional to the horizontal component of the Earth's magnetic field",
              "B. inversely proportional to the vertical and horizontal components of the Earth's magnetic field",
              "C. inversely proportional to the vertical component of the Earth's magnetic field",
              "D. proportional to the horizontal component of the Earth's magnetic field"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Given: True track 180° Drift 8°R Compass Heading 195° Deviation -2° Calculate the variation.",
            "options": [
              "A. 21°W",
              "B. 25°W",
              "C. 5°W",
              "D. 9°W"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Given: True track: 192° Magnetic variation: 7°E Drift angle: 5° left Calculate the magnetic heading required to maintain the planned track.",
            "options": [
              "A. 179°",
              "B. 190°",
              "C. 180°",
              "D. 204°"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "On a Lambert's chart the constant of the cone is 0.80. A is at 53N 04W. You plan to fly to B. The initial Lambert's chart straight-line track is 070(T) and the rhumb line track from A to B is 080(T). What is the longitude of B?",
            "options": [
              "A. 021E",
              "B. 034W",
              "C. 011E",
              "D. 015E"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "At 0422 you are 185 NM from a VOR at FL370. You need to descend at a mean descent rate of 1800'/min to be at FL80 overhead the VOR. Your ground speed in the level cruise is currently 320 knots. In the descent your mean G/S will be 232 knots. What is the latest time to commence descent?",
            "options": [
              "A. 0437",
              "B. 0441",
              "C. 0445",
              "D. 0451"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "How many nautical miles are travelled in 1 minute 45 seconds at a ground speed of 135 knots?",
            "options": [
              "A. 2.36",
              "B. 3.25",
              "C. 39.0",
              "D. 3.94"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Given: True course 300° Drift 8°R Variation 10°W Deviation -4° Calculate the compass heading.",
            "options": [
              "A. 322°",
              "B. 306°",
              "C. 278°",
              "D. 294°"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "An aircraft is at FL200, the OAT is 0°C. When the actual air pressure on an airfield at MSL is placed on the subscale of the altimeter the indicated altitude is 19300 ft. What is the aircraft's True Altitude?",
            "options": [
              "A. 17300 ft",
              "B. 19300 ft",
              "C. 20000 ft",
              "D. 21300 ft"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The distance A to B is 200 NM in a straight line. You are 60 NM from A when you fix your position 4 NM to the left of track. What correction do you need to make to arrive at B?",
            "options": [
              "A. 4°",
              "B. 8°",
              "C. 12°",
              "D. 10°"
            ],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The rhumb line distance between points A (60°00'N 002°30'E) and B (60°00'N 007°30'W) is:",
            "options": [
              "A. 300 NM",
              "B. 450 NM",
              "C. 600 NM",
              "D. 150 NM"
            ],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft has to climb from FL50 -10°C to FL260 -25°C. The IAS for the climb is 180 kt and the WC is +30 kt. If the ROC is 900 ft/min, how many miles will the climb take?",
            "options": [
              "A. 96 NM",
              "B. 106 NM",
              "C. 83 NM",
              "D. 120 NM"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Given: Position A is 60N 020W, Position B is 60N 021W, and Position C is 59N 020W, what are, respectively, the distances from A to B and from A to C?",
            "options": [
              "A. 60 NM and 30 NM",
              "B. 30 NM and 60 NM",
              "C. 52 NM and 60 NM",
              "D. 60 NM and 52 NM"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the diameter of the Earth?",
            "options": [
              "A. 40000 km",
              "B. 12732 km",
              "C. 21600 km",
              "D. 6366 km"
            ],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Given: A Polar Stereographic chart whose grid is aligned with the zero meridian. Grid track 344°, longitude 115°00'W, calculate the true course.",
            "options": [
              "A. 099°",
              "B. 279°",
              "C. 049°",
              "D. 229°"
            ],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The distance A to B is 90 NM in a straight line. You are 60 NM from A when you fix your position 4 NM to the left of track. What correction do you need to make to arrive at B?",
            "options": [
              "A. 4°",
              "B. 8°",
              "C. 12°",
              "D. 10°"
            ],
            "correct": 2,
            "explanation": ""
          }
        ]
      }
    ]
  },
  "principles-of-flight": {
    "name": "Principles of Flight",
    "icon": "fas fa-wind",
    "tests": [
      {
        "name": "Principles of Flight Test 1",
        "timeLimit": 60,
        "questions": []
      }
    ]
  },
  "operational-procedures": {
    "name": "Operational Procedures",
    "icon": "fas fa-list-check",
    "tests": [
      {
        "name": "Operational Procedures Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "When refuelling is being conducted with passengers embarking or disembarking:",
            "options": ["refuelling is strictly prohibited whilst passengers are embarking/ disembarking", "all flight crew must be on board", "communications shall be maintained by ground crew and qualified crew on board", "the stairs shall be fully extended"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What must be ensured with respect to navigation equipment?",
            "options": ["The failure of one piece does not affect another", "All navigation equipment must be serviceable at the start of flight", "All equipment must conform to ICAO specifications", "If one piece of equipment fails there must be a spare available"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Supplemental oxygen is used to:",
            "options": ["provide oxygen to passengers who might require it, following decompression", "provide oxygen to passengers following decompression if the cabin altitude exceeds 10000 ft", "provide oxygen to flight crew following decompression", "augment first aid oxygen following decompression"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Who is responsible for checking the quantity and security of the cargo on board?",
            "options": ["The company's cargo technicians", "The captain", "The mechanic on board, or in his absence the co-pilot", "The operator"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Who is the operator to provide an operations manual for?",
            "options": ["Operations staff", "All company personnel", "Only for flight crew", "For the Authority"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Information concerning evacuation procedures can be found in the:",
            "options": ["OM", "AFM", "journey logbook", "OFP"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "To act as co-pilot for take-off or landing you must have:",
            "options": ["acted as PIC or co-pilot on type in the last 90 days", "acted as PIC or co-pilot on type in the last 30 days", "acted as PIC or co-pilot on type in the last 60 days", "been at the controls for landing in the same type recently"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the co-pilot currency requirement?",
            "options": ["3 flights in the last 90 days", "3 take-offs and landings in the last 60 days", "At the controls for 3 take-offs and landings within the previous 90 days", "3 take-offs and landings in the previous 90 days"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "One shall not initiate any flight made in accordance with instrument flight rules unless the available information indicates that the conditions at the aerodrome of intended destination and destination alternate (if one is required) are, at the predicted time of:",
            "options": ["take-off equal to or better than the minimum conditions required for aerodrome use", "arrival, and for a reasonable time before and after such a predicted time, equal to minimum conditions required for aerodrome use", "arrival equal to or better than the minimum conditions required for aerodrome use", "arrival better than the minimum conditions required for aerodrome use"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Where is the Minimum Equipment List?",
            "options": ["Appended to the AFM", "In the OM", "In the maintenance documents", "In the operations room"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "FDRs must keep data and parameters for at least the last:",
            "options": ["30 hours of operation", "48 hours of operation", "10 hours of operation", "the whole flight"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The period of validity for an operator's certificate is:",
            "options": ["one year renewable", "indefinite", "three years renewable", "five years renewable"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "When are flight crew allowed to leave their stations?",
            "options": ["In the performance of their duties", "At any time specified by the OM", "When having lunch", "Only when the captain allows it"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The recent experience conditions of a captain assigned to a flight on an aircraft by an operator must not be less than:",
            "options": ["6 take-offs and 6 landings as pilot in command on this type of aircraft during the last 90 days", "3 take-offs and 3 landings as pilot in command on this type of aircraft during the last 6 months", "6 take-offs and 6 landings as pilot in command on this type of aircraft during the last 6 months", "3 take-offs and 3 landings as pilot in command on this type of aircraft during the last 90 days"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The Minimum Equipment List (MEL) is established by the:",
            "options": ["airline operator", "manufacturer", "aeronautical Authority the airline operator depends on", "Civil Aviation Authority of the European states"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When are life jackets required?",
            "options": ["100 NM from land", "300 NM from land", "50 NM from land", "400 NM from land"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Aeroplanes with a take-off mass greater than 5700 kg shall be fitted with an independent automatically operated emergency power supply to operate and illuminate the artificial horizon for:",
            "options": ["15 mins", "30 mins", "60 mins", "2 hrs"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "When do you not need a destination alternate aerodrome?",
            "options": ["If there is a reasonable certainty that at the ETA at the destination aerodrome and a reasonable time before and after you can expect VMC", "If the flight time is more than 6 hours", "If the flight time is less than 1 hour", "If your operator deems the weather to be suitable for a visual landing"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "A piece of equipment on your public transport aeroplane fails while you are still parked. The reference document you use to decide on the procedure to follow is the:",
            "options": ["OM chapter \"Abnormal and Emergency procedures\"", "AFM", "OPS", "MEL"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Where is the general information and policy on fuel located?",
            "options": ["Operations Manual Part B", "Operations Manual Part A", "Aircraft Flight Manual", "Maintenance Manual"],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Operational Procedures Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "What is the requirement for the carriage of life rafts?",
            "options": ["30 mins or 120 NM whichever is less", "50 NM from land", "120 mins or 400 NM whichever is less", "60 mins flying time at the one engine out cruise speed"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Who compiles the MEL and where does it go?",
            "options": ["The manufacturer and in the AFM", "The manufacturer and in the OM", "The operator and in the AFM", "The operator and in the OM"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Following an indication of an unserviceability whilst taxiing to the holding point, what do you consult first?",
            "options": ["AFM", "Operator", "State of Registration", "MEL"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "On board a pressurized aircraft, a flight shall be undertaken only if the aircraft is provided with an oxygen reserve enabling all the crew members to be supplied with oxygen for any period of flight above a cabin altitude of:",
            "options": ["10000 ft", "11000 ft", "12000 ft", "13000 ft"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "How often should pilot proficiency checks be performed?",
            "options": ["No less than 6 months between checks", "2 checks every 13 months", "3 checks within the year with no less than 4 months between checks", "2 within a year, more than 4 months between checks"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Who is responsible for ensuring that the aeroplane is airworthy prior to flight?",
            "options": ["Operator", "State of Registration", "Captain", "State of the operator"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the requirement regarding the carriage of a CVR for aircraft registered before April 1998?",
            "options": ["Record last 30 mins of flight", "Record for the duration of the flight", "Record the last 25 hours of operation", "Record the last 48 hours of flight"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Who is to ensure safe handling of flights?",
            "options": ["The Operator", "The Authority", "The State of Registration", "The operations officer"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The crew members must use their seatbelts:",
            "options": ["only during take-off and landing", "while at their station", "from take-off to landing", "only during take-off and landing and whenever necessary by the commander in the interest of safety"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "On an NDB approach with an MDH of 360 ft and a required RVR of 1500 m and a reported met vis of 2500 m, when can you start an approach? i.e. which is most correct?",
            "options": ["When the cloud base is above the system minimum", "With any cloud base", "When the cloud base is above 36 ft", "When the cloud base report is received"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The MEL is drawn up by the:",
            "options": ["operator and may be more restrictive than the MMEL", "operator and may be less restrictive than the MMEL", "manufacturer and may be more restrictive than the MMEL", "manufacturer and may be less restrictive than the MMEL"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "On an ILS, you are told that the weather has dropped below company minima. When must you abort the approach?",
            "options": ["Start of the glide slope descent", "Before passing the outer marker or equivalent position", "Before passing the middle marker", "Before reaching decision height"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Which communications systems must be carried for IFR flights?",
            "options": ["2 independent VHF boxes or one VHF and one HF", "One VHF box", "Two independent VHF boxes", "One VHF box and one HF box"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Who provides the operations personnel with the OM and the amendments to keep it up to date?",
            "options": ["Aircraft manufacturer", "ATS authority of the State of Registry", "Aircraft operator", "Owner of aircraft"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the oxygen requirement for the crew and 100% of the passengers in an unpressurized aircraft?",
            "options": ["10000 ft", "11000 ft", "12000 ft", "13000 ft"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A modern aircraft must be provided with a flight data recorder when its certified MTOM is greater than:",
            "options": ["27000 kg", "5700 kg", "20000 kg", "14000 kg"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What skills constitute pilot proficiency checks?",
            "options": ["Simulator flying skills", "The ability to land safely", "Flying technique, emergency procedures and IFR", "The ability to conform with set procedures"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The OPS document is based on:",
            "options": ["Federal Aviation Requirements. (FAR)", "a JAA guide line", "Rules of the Air", "ICAO Annex 6"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Above what altitude are quick-donning masks required?",
            "options": ["25000 ft", "15000 ft", "10000 ft", "32000 ft"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Destination alternate for a turbojet - what is the required fuel overhead?",
            "options": ["30 minutes at cruise speed", "30 minutes at 1500 ft in standard conditions", "2 hours at 1500 ft in standard conditions", "30 minutes at endurance speed"],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Operational Procedures Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "At the alternate aerodrome, the commander of a turbojet engine aeroplane should have a fuel quantity (final reserve) sufficient for flying during:",
            "options": ["30 minutes at holding flight speed at 1500 ft", "45 minutes at holding flight speed at 1500 ft", "30 minutes at cruising speed", "45 minutes at cruising speed"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Where is permanent approval for the carriage of dangerous goods given?",
            "options": ["Certificate of airworthiness (CofA)", "Aircraft registration", "Air Operator's Certificate (AOC)", "Insurance certificate"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The Minimum Equipment List (MEL) gives the equipment which can be inoperative when undertaking a flight and the additional procedures to be observed accordingly. This list is prepared by:",
            "options": ["the operator, and it is included in the Operations Manual", "the manufacturer, and it is included in the Operations Manual", "the manufacturer, and it is included in the Aircraft Flight Manual", "the operator, and it is included in the Aircraft Flight Manual"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which documents must be carried on every flight? 1. C of A 2. C of R 3. Noise Certificate 4. AOC 5. Aircraft Radio Licence 6. Insurance Certificate",
            "options": ["1, 3, 4 & 5", "3 & 5", "3, 4 & 5", "all of the above"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "From the flight deck you observe an aeroplane in the forward left position on an opposite parallel track. What Nav light will be observed?",
            "options": ["Green", "Red", "White", "All of the above"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In determining Aerodrome Operating Minima, what of the following needs to be considered? 1. Crew composition 2. Ability to communicate/receive meteorological information 3. Significant obstacles in the missed approach area 4. Dimensions and characteristics of the runway 5. Navigation equipment in the aeroplane",
            "options": ["1, 2, 4 & 5", "1, 2 & 3", "2, 3, 4 & 5", "all of the above"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The MMEL is:",
            "options": ["compiled by the manufacturer and approved by the operator", "compiled by the manufacturer and approved by the state of design or state of the manufacturer", "compiled by the operator and approved by the state", "compiled by the operator and approved by the state of design or state of the manufacturer"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The Operations Manual must be approved by the Authority of the:",
            "options": ["country of operations", "country of operator", "country of manufacturer", "no such book is required to be approved by an authority"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "During a flight, the captain is informed that a passenger is using a portable electronic device, which is adversely affecting the aircraft's electrical avionics. The captain must:",
            "options": ["stop the passenger from using the device", "allow the device to be used at take-off and landing", "allow the device to be used from take-off to landing", "allow the device to be used for certain exceptions"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Who issues and updates the MEL?",
            "options": ["The Authority", "The designer", "The manufacturer", "The operator"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What manuals are to be carried?",
            "options": ["Operations Manual in toto", "Company instructions for all flight crew", "All those specified in the Certificate of Airworthiness", "Relevant parts of the ops manual and AFM"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A Flight Data Recorder is required in aeroplanes over 5700 kg when first issued with a C of A after 1st April 1998. It must record:",
            "options": ["the last 25 hours or the duration of the last flight, whichever is greater", "the last 25 hours", "the last 10 hours", "the duration of the last flight"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If there is unauthorized use of equipment that affects the aeroplane's system, the commander:",
            "options": ["may authorize its use for take-off and landing", "must not authorize its use", "may authorize its use for the whole flight", "may authorize its use at his discretion"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Who accepts the MEL?",
            "options": ["The country where the flight takes place", "The country of the operator", "The country of the designers", "The country of the manufacturers"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "After an accident, the operator of an aeroplane equipped with a flight recorder must keep the original recordings for a minimum period of:",
            "options": ["30 days", "90 days", "45 days", "60 days"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "How far away can a take-off alternate be for a 2-engine aeroplane?",
            "options": ["60 mins at one engine cruise speed", "60 mins at normal cruise speed", "120 mins at one engine cruise speed", "120 mins at normal cruise speed"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What are the requirements for pilot currency to act as PIC?",
            "options": ["3 take-offs and landings on an aeroplane of the same type within the last 90 days", "3 take-offs and landings on an aeroplane of the same type within the last 60 days", "3 take-offs and landings on an aeroplane of the same type or approved simulator within the last 90 days", "3 take-offs and landings on an aeroplane of the same type or approved simulator within the last 60 days"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "All aeroplanes which individual certificates of airworthiness were issued after 1 January 1990 must be fitted with a flight data recorder when their maximum certificated take-off mass is greater than:",
            "options": ["20000 kg", "27000 kg", "5700 kg", "14000 kg"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The operator shall include in the OM a MEL which shall be approved by the authority of:",
            "options": ["none, no approval is required", "the country where the aeroplane is operated", "the country where the aeroplane was manufactured", "the country of the operator"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A copy of which of the following must be carried on every flight involving Public Transport?",
            "options": ["Aircraft Technical Log", "Insurance Certificate", "AOC", "Noise Certificate"],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Operational Procedures Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Which of the following are not required to be carried on each flight?",
            "options": ["CofA", "NOTAMS and AIS briefing material", "European Health Insurance Card (EHIC) for all crew", "Third party insurance certificate"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The \"NO SMOKING\" sign must be illuminated:",
            "options": ["when oxygen is being supplied in the cabin", "in each cabin section if oxygen is being carried", "during climb and descent", "during take-off and landing"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What are the rules on the carriage of PRMs (person with reduced mobility)?",
            "options": ["Cannot impede the performance of crew duty", "Must be seated away from emergency exits", "No more than 5% of passengers may be PRMs", "They must provide their own food"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The considerations for a non-precision approach are: 1. MDH 2. Visibility 3. RVR 4. DA/DH 5. Cloud Base",
            "options": ["1, 2 & 5", "1, 2, 3 & 5", "2, 3 & 4", "2 & 4"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Which of the following is to be left on the ground?",
            "options": ["The aeroplane noise certificate", "The operations manual", "Parts of the operations manual relevant to the flight", "Operational flight plan"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Each flight is subject to a preliminary file collecting a certain amount of information. The operator will see that this file is kept on ground. It particularly contains: 1. the weather conditions for the day including the weather forecast at destination 2. one copy of the operational flight plan and, if required, the weight and balance sheet 3. copies of the relevant aircraft's technical log 4. the en route NOTAM documentation when specifically issued by the operator 5. special loads notification 6. charts The combination regrouping all the correct statements is:",
            "options": ["1, 3 & 5", "2, 3, 4 & 5", "2 & 4", "1, 2, 3, 4, 5 & 6"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What are the circumstances when a take-off alternate is required?",
            "options": ["When weather at departure is below landing minima", "When the destination aerodrome is forecast to be below landing minima", "When the weather forecast is below limits", "When operating from an aerodrome at night"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "According to OPS 1.430 (Aerodrome Operating Minima), what is the minimum RVR required for a Cat I approach?",
            "options": ["800 m", "350 m", "150 m", "550 m"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A copy of what info is to be left on the ground?",
            "options": ["Passenger manifests, notification of special passengers", "Route specific maps and charts", "NOTAMs, tech log, operational flight plan, mass & balance, special load notification", "AICs, AISs, and all company NOTAMs"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Where would a pilot find the MEL for his aeroplane?",
            "options": ["AFM", "Ops Manual part C", "Ops Manual part B", "Company Procedures Manual"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "After an incident, the FDR recordings must be kept for:",
            "options": ["30 days", "60 days", "90 days", "120 days"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "According to OPS 1.430, Airfield Operating Minima, what is the lowest MDH using ILS no glide path (LLZ only), VOR, NDB, SRA?",
            "options": ["NDB - MDH 350 ft", "VOR - MDH 250 ft", "ILS (LLZ only) - MDH 200 ft", "VOR/DME - MDH 300 ft"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Coverage of permanently illuminated white lights at the rear of the aircraft is:",
            "options": ["140�", "70�", "110�", "220�"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the requirement for the issue of an AOC?",
            "options": ["Not already hold an AOC issued by another authority", "Have a fleet of serviceable aeroplanes", "Have registered offices in all countries of operations", "Have facilities for all maintenance"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the minimum visibility for a Cat C aircraft during a circling approach?",
            "options": ["1500 m", "1600 m", "2400 m", "3600 m"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A category II precision approach (CAT II) is an approach with:",
            "options": ["a decision height of at least 100 ft", "no decision height", "a decision height of at least 200 ft", "a decision height of at least 50 ft"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "A category A aircraft can carry out an indirect (circling) approach followed by a visual manoeuvre only if the horizontal visibility is higher than or equal to:",
            "options": ["1600 m", "2400 m", "1500 m", "3600 m"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the system minimum for an NDB approach?",
            "options": ["200 ft", "250 ft", "300 ft", "350 ft"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What is the minimum RVR for a CAT IIIC approach?",
            "options": ["No minimum", "50 m", "75 m", "100 m"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When can special VFR be commenced?",
            "options": ["Visibility greater than 1500 m", "Greater than 3 km visibility", "Visibility no more than 3000 m", "Greater than 5 km visibility"],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Operational Procedures Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "An aeroplane is starting a non-precision approach with an MDH of 250 ft and minimum visibility of 800 m. ATC gives threshold, mid runway and final third RVRs. When may the approach be started?",
            "options": ["When threshold and mid-runway RVRs are greater than 800 m", "When all 3 RVRs are greater than 800 m", "When the met viz is greater than 800 m. RVR is for precision approaches only", "When threshold RVR is greater than 800 m"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What is the Cat IIIB RVR minimum?",
            "options": ["50 m", "100 m", "200 m", "250 m"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the minimum horizontal visibility for a Cat D aircraft on a circling approach?",
            "options": ["1500 m", "1600 m", "2400 m", "3600 m"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A category I precision approach (CAT I) is an approach which may be carried out with an RVR/Visibility of not less than:",
            "options": ["800 m", "550 m", "350 m", "500 m"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "OPS 1.465 (VFR operating minima), establishes that, the operator shall ensure about VFR flights, that:",
            "options": ["for conducted VFR flights in airspace F, vertical distance from clouds is 250 m at least", "Special VFR flights are not commenced when visibility is less than 3 km", "for conducted VFR flights in airspace B, horizontal distance from clouds is 1000 m at least", "for conducted VFR flights in airspace E, flight visibility at and above 3050 m (10000 ft) is 5 km at least (clear of cloud)"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is Vat?",
            "options": ["Vso x 1.3", "Vs1g x 1.3", "The lesser of Vso or Vs1g", "Vso x 1.23"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The Cat I minimum decision height is:",
            "options": ["no decision height", "50 ft", "100 ft", "200 ft"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "When establishing an instrument approach procedure, 5 aircraft categories according to their speed at the threshold (Vat) are established. This speed is equal to the stalling speed in landing configuration multiplied by:",
            "options": ["1.1", "1.23", "1.15", "1.3"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "For VFR flight (in a cat C aircraft) what is the minimum horizontal visibility below 10000 ft?",
            "options": ["8 km", "5 km", "1500 m", "300 m"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The information to be considered for a non-precision approach is: 1. horizontal visibility 2. ceiling 3. minimum descent altitude 4. decision altitude",
            "options": ["1, 2 & 4", "1 & 3", "1 & 4", "1, 2 & 3"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What is the minimum crew rest period before flight?",
            "options": ["12 hours when operating away from home base", "13 hours, reducing by 30 minutes for every sector after the 3rd sector in a day", "10 hours when operating from home base", "12 hours when operating from home base"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Who could be nominated as Senior Cabin Crew?",
            "options": ["Any flight crew", "Any cabin crew over the age of 18", "Cabin crew with more than one year experience", "Cabin crew as long as they are not qualified on more than 3 types or variants"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "According to OPS 1.430 (Aerodrome Operating Minima) a Category IIIA approach has a Decision Height of less than 100 ft and a minimum RVR (Runway Visual Range) of:",
            "options": ["175 m", "250 m", "300 m", "200 m"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Aircraft are categorized according to their threshold speeds, multiplied by a factor. What aircraft category corresponds to a range of speeds 141 kt - 165 kt?",
            "options": ["Aeroplane category B", "Aeroplane category E", "Aeroplane category D", "Aeroplane category C"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What are the rules regarding OPCs?",
            "options": ["Can be completed in the simulator, but no passengers to be carried", "Can be completed in the aircraft but only if the aircraft is certified by the Authority as a suitable substitute for the simulator", "Can be completed in the simulator but only if the simulator is certified by the Authority", "Can be completed in conjunction with a line check"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What are the threshold speeds defining a Cat B aircraft?",
            "options": ["< 91 kt", "91 - 120 kt", "121 - 140 kt", "141 - 165 kt"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What are the limits on crew duty?",
            "options": ["190 hours in a year, 60 duty hours in any seven consecutive days", "900 block hours in a year, 60 block hours in any consecutive 7 days", "900 block hours in a year, 100 block hours in any consecutive 28 days", "190 block hours in any consecutive 7 days, 900 block hours in any consecutive 28 days"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the take-off RVR limit for a Cat A aeroplane, when high intensity centre line lights and edge lights are on and the crew is IFR qualified and approved?",
            "options": ["150 m if threshold RVR is available", "150 m", "200 m", "250 m"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "When is MDH referenced to the threshold as opposed to the aerodrome elevation?",
            "options": ["The threshold is more than 2 m above the ARP", "The threshold is less than 2 m above the ARP", "The threshold is less than 2 m below the ARP", "The threshold is more than 2 m below the ARP"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What is DH used for?",
            "options": ["Visual manoeuvre to land", "Precision approaches", "Non-precision approaches", "Circling approaches"],
            "correct": 1,
            "explanation": ""
          }
        ]
      }
    ]
  },
  "aon-aviation": {
    "name": "AON Aviation Knowledge",
    "icon": "fas fa-graduation-cap",
    "tests": [
      {
        "name": "AON Aviation Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Which of the following statements regarding an electric circuit is correct?",
            "options": ["an electric current is only able to flow in an open circuit", "the magnitude of the current is proportional to the resistance", "lower diameter wires are able to carry a higher current", "too high a current may lead to the circuit overheating"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The purpose of an ignition switch is to:",
            "options": ["connect the battery to the magneto", "control the primary circuit of the magneto", "connect the contact breaker and condenser in series with the primary coil", "connect the secondary coil to the distributor"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Which of the following are all aerodynamic balances?",
            "options": ["Inset hinge, mass balance and spring tab.", "Horn balance, balance tab and internal balance.", "Horn balance, inset hinge and mass balance.", "Internal balance, anti-balance tab and servo tab."],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Propeller blade angle is:",
            "options": ["the angle between the relative airflow and the chord line", "dependent upon RPM and TAS", "the angle between the blade chord and the plane of rotation", "the difference between effective pitch and geometric pitch"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The skin of a modern pressurised aircraft:",
            "options": ["is made up of light alloy steel sheets built on the monocoque principle", "houses the crew and the payload", "is a primary load bearing structure carrying much of the loads", "provides aerodynamic lift and prevents corrosion by keeping out adverse weather"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What does TEM stand for in the context of Human Performance?",
            "options": ["Threat and Error Management", "Trusted Equipment Mechanic", "Time Limited Evacuation Medical", "Tango, Echo, Mike"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the shortest distance between two points on the Earth's globe called:",
            "options": ["Lambodrome", "Great circle", "Airway", "Rhumb Line"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Leaving ground effect at a given angle of attack the:",
            "options": ["Induced drag decreases.", "effective angle of attack decreases.", "lift will remain constant", "nose tends to pitch down."],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A turbo-supercharger impeller is driven by:",
            "options": ["excess torque from the reduction gearbox", "diversion of exhaust gases by the waste gate using energy that would otherwise be wasted", "a ram air turbine", "a connection through a gearbox connected to the crank shaft"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The weight of an aeroplane, which is in level non accelerated flight, is said to act:",
            "options": ["vertically through the datum point", "vertically through the centre of pressure", "vertically through the centre of gravity", "always along the vertical axis of the aeroplane"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "During a climb a blocked static pressure supply line causes the ASI to:",
            "options": ["over-indicate then under-indicate", "over-indicate", "under-indicate", "be unaffected"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Flutter may be caused by a:",
            "options": ["low airspeed aerodynamic stall,", "distortion by bending and torsion of the structure causing increasing vibration in the resonance frequency.", "high airspeed aerodynamic wing stall.", "roll control reversal."],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "With regards to the Maximum Zero Fuel Weight (MZFW):",
            "options": ["It is lower than the Maximum Take-Off Weight by the weight of a payload.", "It is the maximum weight that an aircraft can be loaded to without useable fuel.", "It is important as exceeding the MZFW may mean that there is insufficient lift to get the aircraft airborne.", "Is more relevant to aircraft with fuselage fuel tanks."],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the effect on Mach No and TAS when climbing at a constant CAS?",
            "options": ["Mach No increases, TAS is constant", "Both increase", "Mach No is constant, TAS increases", "Both decrease"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What is the purpose of trim tabs?",
            "options": ["to reduce control effectiveness", "to reduce stick forces during manoeuvres", "to increase control effectiveness", "to reduce stick forces to zero"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The minimum separation between VHF frequencies in Europe is:",
            "options": ["25kHZ", "25MHZ", "8.33MHZ", "8.33kHZ"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What can be said about the height of the Tropopause in the Northern Hemisphere?",
            "options": ["It increases from south to north", "It decreases from south to north", "It remains constant throughout the year", "It remains constant from north to south"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The ILS Localiser operates in the following frequency band:",
            "options": ["108.0 - 112.0 kHz", "328.6-335.4 MHZ", "108.0-112.0 MHZ", "328.6-335.4 kHz"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the correct phrase for a pilot to use to advise ATC of being ready to take-off?",
            "options": ["Request takeoff.", "Request departure.", "Ready for departure.", "Ready for take-off."],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The result of Empty Field Myopia is:",
            "options": ["astigmatism", "a build-up of pressure within the eye", "focusing is limited to between 1 and 2 meters", "a tendency to suffer from cataracts in the long term"],
            "correct": 2,
            "explanation": ""
          }
        ]
      },
      {
        "name": "AON Aviation Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The result of empty field myopia is:",
            "options": ["Focusing is limited to between 1 and 2 meters", "A tendency to suffer from cataracts in the long term", "Astigmatism", "A build-up of pressure with the eye"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft is approaching a DME Beacon at 40000 ft, and slant range is 15 NM. What is the ground distance to the nearest NM?",
            "options": ["12 NM", "13 NM", "16 NM", "15 NM"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "To achieve the maximum range over the ground with a headwind, a turbojet should fly:",
            "options": ["At a speed faster than 1,32 VMD", "At a speed where the GS to drag ratio is greatest", "At a speed where the GS to PREQ ratio is greatest", "At a speed slower than 1,32 VMD"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When selecting a fuse for an aircraft electrical circuit, the governing factor is:",
            "options": ["the energy of the circuit", "the power requirement of the circuit", "the resistance of the circuit", "the voltage of the circuit"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A logarithmic scale is fitted to the vertical speed indicator in order to:",
            "options": ["make the instrument more sensitive.", "make lower values of vertical speed easier to read", "Reduce pressure error.", "Reduce manoeuvre error."],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In relation to persons with Reduced Mobility (PRM's):",
            "options": ["The commander may be notified when PRM's are carried", "The commander must be notified when PRM's are carried", "There is no requirement to notify the commander when PRM's are carried", "PRM's must be seated adjacent to emergency exits"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Which of the following statements is true?",
            "options": ["Super-alloys are used because of their excellent corrosion resistance", "Titanium alloy is used in aircraft construction because of its good wear and high temperature tolerance", "Steel is used in aircraft because it is strong and heavy but has poor corrosion resistance", "Aluminium alloys are used in aircraft construction because they are light, easily machined and have good wear resistance"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A pilot, trying to pick up a fallen object from the cockpit floor during a right turn, experiences:",
            "options": ["Coriolis illusion/effect", "Pressure vertigo", "Autokinetic illusion", "Barotrauma"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which of the following statements is true?",
            "options": ["By increasing the flap setting in severe turbulence at constant speed the stall speed will be reduced and the risk for exceeding the structural limits will be decreased.", "Flap extension in severe turbulence at constant airspeed moves the centre of pressure aft, which increases the structural limitation margins.", "Flight in severe turbulence may lead to a stall and/or structural limitations being exceeded.", "Flap extension in severe turbulence at constant speed increases both the stall speed and the structural limitation margins."],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Which of the following statements regarding an electric circuit is correct?",
            "options": ["Lower diameter wires are able to carry a higher current", "An electric current is only able to flow in an open circuit", "Too high a current may lead to the circuit overheating", "The magnitude of the current is proportional to the resistance"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The oil in an oleo-pneumatic strut:",
            "options": ["Support the weight of the aircraft", "Limits the speed of extension and compression of the strut", "Limits the speed of compression of the strut", "Lubricates the piston within the cylinder"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The inbound track to the navigation aid serving a hold is $250^{\\circ}$, your aircraft heading is $002^{\\circ}$ What is the correct sector to join the hold?",
            "options": ["Sector 2 (offset)", "Sector 1 (parallel) or sector 3 (direct)", "Sector 2 (offset) or sector 3 (direct)", "Sector 1 (parallel)"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following statements is correct?",
            "options": ["modern batteries are more stable and have virtually eliminated the risk of a thermal runaway occurring", "batteries are not sensitive to damage because of their solid construction and sealed casing", "the risk of a battery fire is reduced during charging as the charging current will be cut off if a fire is detected", "batteries are considered dangerous goods if transported due to the risk of thermal runaway and the substances inside"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The balance arm is:",
            "options": ["The distance from the CG to the CP", "The distance from the datum to the CG", "The distance from the CG to the static margin", "The distance from the datum to the CP"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In relation to Persons with Reduced Mobility (PRM's):",
            "options": ["PRM's must be seated adjacent to emergency exits.", "The commander must be notified when PRM's are carried.", "There is no requirement to notify the commander when PRM's are carried.", "The commander may be notified when PRM's are carried."],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A hot busbar is one that:",
            "options": ["is permanently connected to the battery", "supplies galley power", "carries all me non-essential loads", "is connected to the battery in an emergency"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Following an indication of unserviceability of an air conditioning pack whilst on stand, what do you consult?",
            "options": ["The configuration deviation list", "OPS Manual Part A", "The Minimum Equipment List (MEL)", "The Quick Reference Handbook (QRH)"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Following an indication of unserviceability of an air conditioning pack whilst on stand, what do you consult first?",
            "options": ["The Configuration Deviation List.", "The Quick Reference Handbook (QRH).", "The Minimum Equipment List (MEL).", "Ops Manual Part A"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If an extra load is loaded into an aircraft the stall speed is likely to:",
            "options": ["Change depending on whether the load was placed FWD or AFT of the C of G", "Stay the same", "Decrease", "Increase"],
            "correct": 3,
            "explanation": ""
          }
        ]
      },
      {
        "name": "AON Aviation Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The ILS Outer Marker is identified by:",
            "options": ["A white cockpit light and a modulating frequency of 400 Hz", "A blue cockpit light and a modulating frequency of 400 Hz", "An amber cockpit light and a modulating frequency of 1300 Hz", "A blue cockpit light and a modulating frequency of 3000 Hz"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Power is:",
            "options": ["The rate at which charge is transferred", "Expressed in Joules", "The rate at which a component uses energy", "A measure of the energy being used by a component"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The phrase &quot;all stations&quot; is used to transmit to:",
            "options": ["All stations named in the following message", "All stations except those named in the following message", "A broadcast to all stations on frequency", "Aircraft requesting a radio check"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "With regards to the Maximum Zero Fuel Weight (MZFW):",
            "options": ["It is the maximum weight that an aircraft can be loaded to without useable fuel", "It is lower than the Maximum Take-Off Weight by the weight of a payload", "Is more relevant to aircraft with fuselage fuel tanks", "It is important as exceeding the MZFW may mean that there is insufficient lift to get the aircraft airborne"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What does TEM stand for in the context of Human Performance?",
            "options": ["Threat and Error Management", "Trusted Equipment Mechanic", "Tango, Echo, Mike", "Time Limited Evacuation Medical"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When are lifejackets required?",
            "options": ["100 NM from land", "400 NM from land", "300 NM from land", "50 NM from land"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following statements is true?",
            "options": ["Steel is used in aircraft because it is strong and heavy but has poor corrosion resistance", "Super-alloys are used because of their excellent corrosion resistance", "Titanium alloy is used in aircraft construction because of its good wear and high temperature tolerance", "Aluminium alloys are used in aircraft construction because they are light, easily machined and have good wear resistance"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "You are flying IFR in VMC and experience a complete radio failure. What action should you take?",
            "options": ["Continue as per last ATC clearance for 20 minutes after which revert to your filed flight plan. Squawk 7500 and land as close as possible to your EAT/ETA. Report arrival to ATC after landing", "Continue as per last ATC clearance for 30 minutes after which revert to your filed flight plan. Squawk 7600 and land as close as possible to your EAT/ETA. Report arrival to ATC after landing", "Continue as per last ATC clearance for 20 minutes after which revert to your filed flight plan. Squawk 0000 and land as close as possible to your EAT/ETA. Report arrival to ATC after landing", "Continue VMC and land at the nearest aerodrome squawking 7600. Report arrival to ATC after landing"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A turbo-supercharger impeller is driven by:",
            "options": ["Diversion of exhaust gases by the waste gate using energy that would otherwise be wasted", "Excess torque from the reduction gearbox", "A ram air turbine", "A connection through a gearbox connected to the crankshaft"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "If you are flying IFR to a destination with no alternate, when must the weather forecast be good for you to continue?",
            "options": ["1 hour before to 1 hour after ETA", "2 hours before to 2 hours after ETA", "3 hours before to 1 hour after ETA", "3 hours before to 3 hours after ETA"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What are the meteorological prerequisites, at low level, for thunderstorms formed by lifting processes, over land?",
            "options": ["Low temperatures, low humidity", "High temperature, high humidity", "High air pressure (&gt;1013 hPa), high temperatures", "Subsidence, inversion"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "At high altitude, the stall speed (IAS):",
            "options": ["Decreases", "Increases", "Decreases until the tropopause", "Remains the same"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What distance does the DME display:",
            "options": ["Line of sight distance in feet", "Line of slight distance in NM", "Slant range in NM", "Slant range in SM"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What speed limitation in the hold for class A & B aircraft below 14000 ft?",
            "options": ["170 kt", "240 kt", "230 kt", "280 kt"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A logarithmic scale is fitted to the vertical speed indicator in order to:",
            "options": ["Make lower values of vertical speed easier to read", "Make the instrument more sensitive", "Reduce pressure error", "Reduce manoeuvre error"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An increase in wing loading will:",
            "options": ["Decrease the take-off speeds", "Increase CL Max", "Decrease the minimum gliding angle", "Increase the stall speed"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A DME & VOR are co-located and a morse ident is detected 4 times in 30 secs. Which of the following statements is true?",
            "options": ["VOR callsign once every 30 secs and lower in pitch than the DME ident", "DME callsign 3 times every 30 secs and higher in pitch than the VOR ident", "DME callsign once every 30 secs and higher in pitch than the VOR ident", "VOR callsign once every 30 secs and higher in pitch than the DME ident"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "ELR is $1^{\\circ}C/100m:$",
            "options": ["Absolute instability", "Conditional stability", "Neutral when dry", "Absolute stability"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "When selecting a fuse for an aircraft electrical circuit, the governing factor is:",
            "options": ["The voltage of the circuit", "The resistance of the circuit", "The energy of the circuit", "The power requirement of the circuit"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "An under-inflated tyre on a dry runway:",
            "options": ["Will cause the tyre temperature to decrease", "Increases viscous aquaplaning speed", "Increases wear on the shoulder", "Increases wear on the crown"],
            "correct": 2,
            "explanation": ""
          }
        ]
      },
      {
        "name": "AON Aviation Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The purpose of an ignition switch is to:",
            "options": ["connect the battery to the magneto", "control the primary circuit of the magneto", "connect the contact breaker and condenser in series with the primary coil", "connect the secondary coil to the distributor"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "An aeroplane is head-on with a glider. Who has right of way?",
            "options": ["The aeroplane", "The glider", "Both", "Neither"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Two 12v 40 Ah batteries connected in parallel will produce?",
            "options": ["12v 80Ah", "24v 80Ah", "12v 160Ah", "12v 40Ah"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The skin of a modern pressurized aircraft:",
            "options": ["Provides aerodynamic lift and prevents corrosion by keeping out adverse weather", "Is a primary load bearing structure carrying much of the loads", "Is made up of light alloy steel sheets built on the monocoque principle", "Houses the crew and the payload"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Loads must be adequately secured in order to?",
            "options": ["Avoid any C of G movement during flight", "Prevent excessive &quot;G&quot; loading during the landing flare", "Avoid unplanned C of G movement and aeroplane damage", "allow steep turns"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If you are flying at FL300 in an air mass that is 15�C warmer than a standard atmosphere, what is the outside temperature likely to be?",
            "options": ["-60�C", "-45�C", "-30�C", "-15�C"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "What is the frequency range of the airband?",
            "options": ["118.0 - 137.0 MHz", "1080 - 717.975 MHz", "30 - 300 MHz", "108.0 - 137.0 MHz"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "To achieve the maximum range over the ground with a headwind, a turbojet should fly?",
            "options": ["at a speed slower than 1.32VMD", "at a speed faster than 1.32VMD", "at a speed where the GS to PREQ ratio is greatest", "at a speed where the GS to drag ratio is greatest"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "You are flying IFR in VMC and experience a complete radio failure. What action should you take?",
            "options": ["Continue as per last ATC clearance for 20 minutes after which revert to your filed flight plan. Squawk 7500 and land as close as possible to your EAT/ETA. Report arrival to ATC after landing", "Continue as per last ATC clearance for 30 minutes after which revert to your filed flight plan. Squawk 7600 and land as close as possible to your EAT/ETA. Report arrival to ATC after landing", "Continue as per last ATC clearance for 20 minutes after which revert to your filed flight plan. Squawk 0000 and land as close as possible to your EAT/ETA. Report arrival to ATC after landing", "Continue VMC and land at the nearest aerodrome squawking 7600. Report arrival to ATC after landing"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "When selecting a fuse for an aircraft electrical circuit, what is the governing factor?",
            "options": ["the voltage of the circuit", "the power requirement of the circuit", "the resistance of the circuit", "the energy of the circuit"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The ILS Localizer operates in which frequency band?",
            "options": ["328.6 - 335.4 MHz", "108.0 - 112.0 MHz", "328.6 - 335.4 kHz", "108.0 - 112.0 kHz"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "At high altitude, the stall speed (IAS)?",
            "options": ["Decreases", "Increases", "Decreases until the tropopause", "Remains the same"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Compared with stalling airspeed (Vs) in a given configuration, the airspeed at which the stick shaker will be triggered is?",
            "options": ["1.30Vs", "1.12Vs", "1.20Vs", "Greater than Vs"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Which of the following are all aerodynamic balances?",
            "options": ["Inset hinge, mass balance and spring tab.", "Horn balance, balance tab and internal balance.", "Horn balance, inset hinge and mass balance.", "Internal balance, anti-balance tab and servo tab."],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What distance does the DME display?",
            "options": ["Slant range in SM", "Slant range in NM", "Line of sight distance in feet", "Line of slight distance in NM"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "If an aircraft climbs in the Standard Atmosphere below the Tropopause, at a Constant TAS the Mach Number will?",
            "options": ["Depend on the rate of change of density with altitude", "Decrease because the local speed of sound is decreasing", "Increase because the local speed of sound is increasing", "Increase because the local speed of sound is decreasing"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "During which stage are downdraughts predominant in a thunderstorm cell?",
            "options": ["Mature stage", "Cumulus stage", "Cumulus stage and mature stage", "Dissipating stage"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The rigidity of a gyro is improved by?",
            "options": ["increasing the rpm and concentrating the mass at the hub of the rotor", "decreasing the rpm and concentrating the mass on the periphery of the rotor", "increasing the rpm and concentrating the mass on the periphery of the rotor", "decreasing the rpm and concentrating the mass at the hub of the rotor"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Which VDF bearing is accurate within 5 degrees?",
            "options": ["Class D", "Class C", "Class B", "Class A"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Readability 1 means that the transmission is?",
            "options": ["Loud and clear", "Barely readable", "Unreadable", "Perfectly readable"],
            "correct": 2,
            "explanation": ""
          }
        ]
      },
      {
        "name": "AON Aviation Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Which phraseology shall a pilot use if he/she receives an instruction from ATC which he/she cannot carry out?",
            "options": ["UNABLE", "NEGATIVE INSTRUCTION", "UNABLE TO FOLLOW", "DISREGARD"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An aircraft passes overhead a DME station at 12000 ft above the station. At that time the DME reading will be?",
            "options": ["FLAG/OFF, the aircraft is within the cone of silence.", "Approximately 2 nm.", "Fluctuating and not significant.", "0 nm."],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The phrase &quot;take-off&quot; is used by a pilot:",
            "options": ["Never. It is used only by a ground station", "Only to acknowledge take-off clearance", "Only to request immediate clearance", "After the aircraft is airborne"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A pilot approaching an upslope runway:",
            "options": ["may feel that he is higher than actual. This illusion may cause him to land short of the runway", "may feel that he is lower than actual. This illusion may cause him to land further down the runway than intended", "may feel that he is lower than actual. This illusion may cause him to fly a steeper than normal approach path", "establishes a slower than normal approach speed with the risk of stalling out"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which of the statements is true concerning squall lines?",
            "options": ["For severe squall lines a TAF is issued", "For severe squall lines a SIGMET is issued", "Severe squall lines always move from northwest to southeast", "Severe squall lines only occur in the tropics"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "When are lifejackets required?",
            "options": ["300nm from land", "400nm from land", "100nm from land", "50nm from land"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Main and nose wheel bays are:",
            "options": ["Pressurised", "Unpressurised", "Conditioned", "Different, with the mains being unpressurised and the nose pressurised"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Identify runway remaining lighting on centerline lighting systems.",
            "options": ["Alternate red and white lights from 3,000 feet to 1,000 feet, then red lights to the end.", "Alternate red and white lights from 3,000 feet to the end of the runway", "Amber lights from 3,000 feet to 1,000 feet, then red lights to the end", "Red lights for the last 1,000 feet"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the main advantage of VHF over HF communications?",
            "options": ["VHF has longer range than HF at night time", "VHF has longer range than HF", "VHF range is only restricted by the curvature of the earth", "VHF is less affected by atmospheric noise and electrical equipment"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What action is required by the pilot of an aircraft station if he/she is unable to establish radio contact with an aeronautical station?",
            "options": ["Squawk mode A code 7500", "Divert to the alternate airport", "Try to establish communication with other aircraft or aeronautical stations", "Land at the nearest aerodrome appropriate to the route of flight"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The rate of climb is approximately equal to?",
            "options": ["The still air gradient multiplied by the TAS", "The angle of climb multiplied by the TAS", "The still air gradient divided by the TAS", "The angle of climb divided by the TAS"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The purpose of the primary stops in a control system is?",
            "options": ["To set the range of movement of the control surface", "To limit control movement to one direction only", "To adjust the sensitivity of the controls", "To hold the controls in the desired position"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Ailerons control which motion?",
            "options": ["The aileron control is moved to the left and the right aileron moves down and the left one up", "The aileron control is moved to the left and the right aileron moves up and the left down", "The aileron control is moved to the right and the right elevator goes up and the left one down", "The aileron control is moved to the right, the right aileron goes up and the left one down"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The phrase &quot;say again&quot; means?",
            "options": ["Say the word &quot;again&quot;", "Repeat the last section of the message", "Repeat the entire message", "Send all your messages twice"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The best L/D ratio of an aircraft in a given configuration is a value that:",
            "options": ["Varies with Indicated Air Speed", "Varies depending upon the weight being carried", "Varies with air density", "Remains constant regardless of Indicated Air Speed changes"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "How do you know you are in an over taking position with regards to another aircraft at night?",
            "options": ["You will see a white and a red light", "You will see a white and a green light", "You will see a white light", "You will not see the anti-collision light"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Stringers are used in aircraft fuselage construction:",
            "options": ["To withstand bending and compressive loads", "To withstand tensile and bending loads", "To withstand compressive and shear loads", "To withstand bending and shear loads"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "If temperature remains constant with an increase in altitude there is:",
            "options": ["An inversion", "An inversion aloft", "Uniform lapse rate", "An isothermal layer"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "If an aeroplane lands below its Max Structural Landing Mass, but above its Performance Limited Landing Mass for the arrival airfield:",
            "options": ["It might not have sufficient runway length to stop safely", "Tire temperature limits could be exceeded", "It will increase structural fatigue", "Physical damage might be suffered as a result of the extra mass"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "If an extra load is loaded into an aircraft the stall speed is likely to?",
            "options": ["Decrease", "Stay the same", "Change depending on whether the load was placed FWD or AFT of the C of G", "Increase"],
            "correct": 3,
            "explanation": ""
          }
        ]
      },
      {
        "name": "AON Aviation Test 6",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The fuel index:",
            "options": ["Is used to calculate the correct position of the CG due to different locations of the fuel tanks", "Is a standard value given by EASA and can be used for different types of aircraft", "Is only used for aeroplanes with wing tip tanks", "Is the difference between the zero fuel mass index and the DOI"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "When the met observer reports the amount of cloud present at a station, it will be given as:",
            "options": ["Clear, scattered, broken or overcast", "The amount of cloud, in quarters of the sky covered, using the term oktas", "The amount of cloud, in eighths of the sky covered, using the term oktas", "The amount of cloud, in quarters of the sky covered, using the term oktas"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "An accumulator in a hydraulic system will:",
            "options": ["Store fluid under pressure", "Dampen pressure fluctuations", "Allow for thermal expansion", "All of the above"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "You are heading 050�(M) and ATC gives you a radar vector to 030�(M). After 7 mins ATC tells you to resume your own navigation. What should you do?",
            "options": ["Return to you current flight plan route", "Continue on a heading of 050 for 30 minutes", "Continue on a heading 050 for 15 minutes", "Continue on a heading 050 for 7 minutes"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What approximate rate of descent is required in order to maintain a 3 degree glide path at a groundspeed of 120 kt?",
            "options": ["600 ft/min", "950 ft/min", "550 ft/min", "800 ft/min"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "See the figure below. You receive this ATC clearance &quot;.....CLEARED TO THE ABC VORTAC. HOLD SOUTH ON THE ONE EIGHT ZERO RADIAL...&quot; What is the recommended procedure to enter the holding pattern?",
            "options": ["Teardrop only", "Direct only", "Parallel only", "Parallel or teardrop"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "After experiencing two-way radio communications failure en route, when should a pilot begin the descent for the instrument approach?",
            "options": ["Upon arrival at any initial approach fix for the instrument approach procedure but not before the flight plan ETA as amended by ATC", "Upon arrival at the holding fix depicted on the instrument approach procedure at the corrected ETA, plus or minus 3 minutes", "At the primary initial approach fix for the instrument approach procedure at the ETA shown on the flight plan or the EFC time, whichever is later", "Upon arrival at the holding fix depicted on the instrument approach procedure at the corrected ETA, plus or minus 3 minutes"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which of the following sequences might be encountered when flying into a microburst?",
            "options": ["Increased headwind, followed by down-draught, followed by increased tailwind on the approach, or following take-off.", "Increased headwind, followed by down-draught, followed by increased tailwind on the approach.", "Increased headwind, followed by down-draught, followed by increased tailwind on take off.", "Increased tailwind, followed by down-draught, followed by increased headwind on the take-off."],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the approximate height of the tropopause during summer over Southern England?",
            "options": ["46000 ft", "36000 ft", "26000 ft", "56000 ft"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is the height AGL of the lowest cloud depicted in the TAF below? TAF EGBB 110700Z 110918 16008KT 9999 SCT015 BKN020 TEMPO 0912 17015G25KT 6000 SHRA BKN015CB BECMG 1215 21008KT SCT025 BECMG 1518 18005KT CAVOK",
            "options": ["150 ft", "2000 ft", "2500 ft", "1500 ft"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "In a fuel system, the oil to fuel heat exchanger allows:",
            "options": ["Fuel cooling so as to prevent vapor creation likely to unprime nozzles", "Fuel heating as required whenever fuel filter clogging is detected", "Automatic fuel heating by the engine oil so as to prevent icing in fuel filter", "Jet engine oil cooling through thermal exchange with fuel flowing from tanks"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "What effect would a light crosswind have on the wingtip vortices generated by a large aeroplane that has just taken off:",
            "options": ["The downwind vortex will tend to remain on the runway longer than the upwind vortex.", "A crosswind will rapidly dissipate the strength of both vortices.", "A crosswind will move both vortices clear of the runway.", "The upwind vortex will tend to remain on the runway longer than the downwind vortex."],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The signal from pilot to the signalman (marshaller) which means &quot;brakes applied&quot; is:",
            "options": ["Fist clenched in front of the face then fingers extended", "Arms extended horizontally sideways, palms facing downwards", "Arms down and crossed in front of the body", "Arms crossed above the head"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The main purpose of leading edge flaps/slats is:",
            "options": ["To give a more cambered section for high-speed flight", "To increase wing camber, and prevent separation of the airflow when trailing edge flaps are lowered", "To increase the wing area for take-off and landing", "To act as an airbrake for rapid deceleration"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In an aeroplane utilising a constant frequency AC power supply, DC power is obtained from a:",
            "options": ["3 phase current transformer unit", "Static inverter", "Rotary converter", "Transformer Rectifier Unit"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The actual zero fuel weight is:",
            "options": ["The aircraft basic operation weight + payload. And must not exceed the maximum design zero fuel weight", "The aircraft basic operation weight + payload. And must not exceed the maximum design take off weight", "The aircraft basic operating weight + trip fuel", "The maximum landing weight plus the trip fuel"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The Cat I minimum decision height is:",
            "options": ["200 feet", "100 feet", "50 feet", "No decision height"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What is correct about Fly-by / Fly-over waypoints and turns?",
            "options": ["A fly-by waypoint is a waypoint which requires turn anticipation to allow tangential interception of the next segment of a route or procedure", "A turn via a fly-over waypoint is always shorter than a turn via a fly-by waypoint", "A fly-by waypoint is a waypoint at which a turn is initiated in order to join the next segment of a route or procedure", "A fly-over waypoint is a waypoint which requires turn anticipation to allow tangential interception of the next segment of a route or procedure"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "According to ICAO Doc 8168, the Transition Level:",
            "options": ["Shall be the lowest flight level available for use above the transition altitude that has been established", "Is published in the approach chart(s) concerned", "Shall normally be a specified altitude AMSL in the vicinity of an aerodrome", "Shall be the highest available flight level below the transition altitude that has been established"],
            "correct": 0,
            "explanation": ""
          }
        ]
      },
      {
        "name": "AON Aviation Test 7",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The vertical position of an aircraft at or below the transition altitude will be reported:",
            "options": ["According to pilot's choice", "As height", "As flight level", "As altitude"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A particular instrument departure procedure requires a minimum climb rate of 210 feet per NM to 8,000 feet. If you climb with a ground speed of 140 knots, what is the rate of climb required in feet per minute?",
            "options": ["210", "450", "490", "210"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Rudder controls:",
            "options": ["Yaw", "Pitch", "Turn", "Roll"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "On a localiser the modulations are at 150 Hz and 90 Hz. Which of the following statements is correct?",
            "options": ["The 90 Hz modulation predominates to the right of the centre line", "The 150 Hz modulation predominates to the right of the centre line", "If the 150 Hz modulations predominates, the CDI needle moves left", "When both modulations are received, the aeroplane will be on the centre line"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The contents of Aeronautical Information Publication (AIP) are:",
            "options": ["GEN, ENR, RAC, AD", "GEN, AGA, COM, RAC, ENR, FAL", "GEN, AGA, COM, RAC, FAL, SAR, MET, MAP", "GEN, ENR (en-route) and AD (aerodromes)"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "When climbing at a constant mach number below the tropopause through an inversion:",
            "options": ["The CAS will decrease and the TAS will increase", "The CAS will increase and the TAS will decrease", "The CAS and TAS will both increase", "The CAS and TAS will both decrease"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "To which aircraft position(s) does HSI presentation &quot;D&quot; correspond?",
            "options": ["1 only", "2 only", "8 only", "10 only"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "To which aircraft position(s) does HSI presentation &quot;B&quot; correspond?",
            "options": ["5 only", "12 only", "13 only", "5 and 13"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The Operating Mass:",
            "options": ["Is the maximum zero fuel mass less the traffic load", "Is the landing mass minus the traffic load", "Is the take-off mass minus the basic empty mass and crew mass", "Is the take-off mass minus the traffic load"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "Entering a holding pattern at FL110 with a jet aircraft, which will be the maximum speed?",
            "options": ["230 kts TAS", "240 kts IAS", "240 kts TAS", "230 kts IAS"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "To which aircraft position(s) does HSI presentation &quot;E&quot; correspond?",
            "options": ["3 only", "8 only", "10 only", "3 and 8"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "To which aircraft position(s) does HSI presentation &quot;A&quot; correspond?",
            "options": ["9 and 6", "9 only", "6 only", "9 and 6"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which aeroplane behaviour will be corrected by a yaw damper?",
            "options": ["Spiral dive", "Dutch roll", "Buffeting", "Tuck under"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "What type of precipitation would you expect at an active unstable cold front?",
            "options": ["Light to moderate continuous rain", "Showers associated with thunderstorms", "Drizzle", "Freezing rain"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In cruise flight, an aft centre of gravity location will:",
            "options": ["Increase longitudinal static stability", "Not influence longitudinal static stability", "Decrease longitudinal static stability", "Not change the static curve of stability into longitudinal"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The sweepback on a wing will:",
            "options": ["Cause the stall to occur at lower angles of attack", "Reduce the possibility for the wing tip to stall", "Increase the possibility of a wing tip stall", "Have no effect on the stall characteristics"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "See the figure below. You receive this ATC clearance &quot;.....CLEARED TO THE ABC VORTAC. HOLD WEST ON THE TWO SEVEN ZERO RADIAL...&quot; What is the recommended procedure to enter the holding pattern?",
            "options": ["Parallel or teardrop", "Parallel only", "Direct only", "Parallel or teardrop"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "To which aircraft position(s) does HSI presentation &quot;C&quot; correspond?",
            "options": ["5 only", "12 only", "13 only", "5 and 13"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The Cat I minimum decision height is:",
            "options": ["200 feet", "100 feet", "50 feet", "No decision height"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "A pilot making an approach sees 3 red lights and 1 white light on the wingbar of a PAPI. This means that:",
            "options": ["He is above the approach slope", "He is on the centre line axis", "He is below the approach slope", "He is on the prescribed glide slope"],
            "correct": 2,
            "explanation": ""
          }
        ]
      }
    ]
  },
  "radio-navigation": {
    "name": "Radio Navigation",
    "icon": "fas fa-satellite-dish",
    "tests": [
      {
        "name": "Radio Navigation Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "An aircraft flies from a VOR at 61N 013W to 58N 013W. The variation at the beacon is 13W and the variation at the aircraft is 5W. What radial is the aircraft on?",
            "options": ["013", "005", "193", "187"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Determine which of the following statements concerning atmospheric ionization are correct: 1. The highest levels of ionization will be experienced in low latitudes 2. Ionization levels increase linearly with increasing altitude 3. The lowest levels of ionization occur about midnight 4. The E-layer is higher by night than by day because the ionization levels are lower at night",
            "options": ["statements 1, 2 and 3 are correct", "statements 1, 3 and 4 are correct", "statements 2 and 4 are correct", "statements 1 and 4 are correct"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The accuracy of VDF Class A bearing is:",
            "options": ["+/- 10�", "+/- 5�", "+/- 2�", "+/- 1�"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The Doppler effect is used in some navigation systems to determine .........., it causes a .......... in frequency of a radio transmission if the transmitter and receiver are moving ......... ",
            "options": ["position, change, towards each other", "relative motion, decrease, apart", "the distance, increase, at the same speed", "relative motion, increase, apart"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The accuracy of ADF by day and excluding compass error is:",
            "options": ["+/-1�", "+/-2�", "+/-5�", "+/-10�"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The principal propagation path employed in an NDB/ADF system is:",
            "options": ["sky wave", "surface wave", "direct wave", "ducted wave"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "When converting VOR and ADF bearings to true, the variation at the �� should be used for VOR and at the �� for ADF",
            "options": ["aircraft aircraft", "aircraft station", "station aircraft", "station station"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The maximum range an ATC facility at 1369 ft AMSL can provide a service to an aircraft at FL350 is:",
            "options": ["276 NM", "200 NM", "224 NM", "238 NM"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "ADF quadrantal error is caused by:",
            "options": ["static build-up on the airframe and St. Elmo�s Fire", "the aircraft�s major electrical axis, the fuselage, reflecting and re-radiating the incoming NDB transmissions", "station interference and/or night effect", "NDB signals speeding up and bending as they cross from a land to water propagation path"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Which wavelength corresponds to a frequency of 5035 MHz?",
            "options": ["5.96 mm", "5.96 cm", "5.96 m", "59.6 cm"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "An NDB has emission designator N0NA1A this will require the use of the BFO for:",
            "options": ["tuning", "identification", "identification and monitoring", "tuning, identification and monitoring"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The pilot of an aircraft flying at FL240 is 250 NM from a VOR at 16 ft AMSL which he selects. He receives no signal from the VOR. This is because:",
            "options": ["the VOR is unserviceable", "the range of VOR is limited to 200 NM", "the aircraft is beyond line of sight range", "there are abnormal atmospheric conditions"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Coastal refraction error is maximum when the NDB signal crosses the coast at:",
            "options": ["a coastal beacon at an acute angle", "an inland beacon at an acute angle", "a coastal beacon perpendicular to the coast", "an inland beacon perpendicular to the coast"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The ADF error which will cause the needle to �hunt� (i.e. oscillate around the correct bearing) is:",
            "options": ["night effect", "CB static", "station interference", "coastal refraction"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The Doppler effect is:",
            "options": ["the change in frequency caused by the movement of a transmitter and receiver", "the change in frequency caused by the movement of a receiver", "the change in frequency caused by the movement of a transmitter", "the change in frequency caused by the relative movement between a transmitter and receiver"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A class B VDF bearing will have an accuracy of:",
            "options": ["� 2�", "� 10�", "� 5�", "� 1�"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The VDF term meaning �true bearing from the station� is:",
            "options": ["QDM", "QUJ", "QDR", "QTE"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The phase difference measured at the aircraft from a VOR is 235�. The bearing of the beacon from the aircraft is:",
            "options": ["055�", "235�", "145�", "325�"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An error applicable to VDF would be:",
            "options": ["synchronous transmission", "scalloping", "selective availability", "garbling"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The principle of operation of VOR is:",
            "options": ["bearing by lobe comparison", "bearing by frequency comparison", "bearing by searchlight principle", "bearing by phase comparison"],
            "correct": 3,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Radio Navigation Test 2",
        "timeLimit": 60,
        "questions": [
          {
            "question": "When flying downwind abeam the upwind end of the runway the indications from the ILS on the CDI will be:",
            "options": ["in the correct sense for the localizer and no glide path signal", "erratic on both localizer and glide path", "erratic on the localizer and in the correct sense on the glide path", "no localizer signal and in the correct sense for glide path"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "MLS has 200 channels available in the frequency band:",
            "options": ["108 � 112 MHz", "329 � 335 MHz", "960 � 1215 MHz", "5031 � 5090 MHz"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The time interval between the transmission of a pulse and receipt of the echo from a target is 925.5 microseconds. The range of the target is:",
            "options": ["37.5 NM", "75 NM", "150 NM", "300 NM"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The best resolution will be obtained from:",
            "options": ["a narrow beam width and narrow pulse width", "a wide beam width and narrow pulse width", "a narrow beam width and wide pulse width", "a wide beam width and wide pulse width"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The SSR code to select when the aircraft is being unlawfully interfered with is:",
            "options": ["7600", "7700", "7500", "7400"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "A precision approach runway CAT II is an instrument runway served by ILS and visual aids intended for operations down to:",
            "options": ["a RVR of 550 meters and a DH of not less than 200 ft", "a RVR of 200 meters and a DH of not less than 100 ft", "a RVR of 250 meters and a DH of not less than 200 ft", "a RVR of 300-450 meters and a DH of not less than 100 ft"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The type of radar which has no minimum range restriction is:",
            "options": ["primary CW radar", "primary pulsed radar", "secondary CW radar", "secondary pulsed radar"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "An advantage of a slotted antenna (planar array) over a parabolic reflector are:",
            "options": ["side lobes removed", "360� scan without any rotation requirement", "less power required", "high gain"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Refer to Appendix A, diagram B. What are the indications on the VOR/ILS display?",
            "options": ["030, TO, Fly Right", "030, TO, Fly Left", "210, FROM Fly Right", "210, FROM, Fly Left"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Flying an ILS approach the equipment senses that the 90 Hz modulation predominates on both the localizer and the glide path. The indications the pilot will see are:",
            "options": ["fly left and fly up", "fly left and fly down", "fly right and fly up", "fly right and fly down"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "On a colour AWR display, the heaviest precipitation will be displayed in:",
            "options": ["amber", "red", "yellow", "blue"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The coverage of the approach azimuth and elevation of a MLS is:",
            "options": ["+/-20� to 40 NM", "+/-20� to 20 NM", "+/-40� to 40 NM", "+/-40� to 20 NM"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "A radar transmitting on 600 MHz has a PRF of 300 pps and an aerial rotation rate of 5 rpm. This radar will be:",
            "options": ["an area surveillance radar", "an aerodrome surface movement radar", "an aerodrome surveillance radar", "a terminal area radar"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The AWR operating frequency is:",
            "options": ["9375 MHz", "9375 GHz", "937.5 MHz", "93.75 GHz"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "On an ILS approach, using a 3� glide path, the height of an aircraft, ground speed 160 kt, at 3.5 NM from touchdown should be:",
            "options": ["800 ft", "1050 ft", "900 ft", "1500 ft"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The AWR frequency is selected because it gives:",
            "options": ["good returns from water droplets", "good returns from turbulence", "good penetration of cloud", "good returns from water vapour"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The azimuth coverage of a 3� glide path is:",
            "options": ["+/-35� to 17 NM", "+/-10� to 25 NM", "+/-8� to 10 NM", "+/-10� to 8 NM"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The maximum theoretical range of a radar is determined by:",
            "options": ["power", "PW", "beamwidth", "PRF"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "In SSR the aircraft replies on .............. MHz and the ground station interrogates on ................. MHz",
            "options": ["1030 1090", "1090 1030", "1030 1030", "1090 1090"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A full MLS system comprises a DME and:",
            "options": ["4 elements multiplexing on 2 frequencies", "4 elements multiplexing on one frequency", "2 elements using 2 frequencies", "2 elements multiplexing on one frequency"],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Radio Navigation Test 3",
        "timeLimit": 60,
        "questions": [
          {
            "question": "If the signal from an SV is lost during an aircraft manoeuvre:",
            "options": ["the receiver will select another SV with no loss in accuracy", "the receiver will go into a DR mode with no loss of accuracy", "the receiver will compensate by using the last calculated altitude to maintain positional accuracy", "the receiver position will degrade regardless of the action taken"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The navigation database in an FMC:",
            "options": ["can be modified by the flight crew to meet the route requirements", "can be modified every 28 days", "can only be read by the flight crew", "cannot be accessed by the flight crew"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If the receiver almanac becomes corrupted it will download the almanac from the constellation. This download will take:",
            "options": ["15 minutes", "2.5 minutes", "12.5 minutes", "5 minutes"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The optimum position for a DME aerial on an aircraft is:",
            "options": ["in the nose cone to give maximum forward range", "as close to the fore/aft centre line as possible", "on top of the fuselage close to the wings", "close to each wing tip to compensate for manoeuvre errors"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The most accurate external reference position will be provided by:",
            "options": ["VOR/DME", "Twin DME", "Twin VOR", "Suitable combination of VOR and DME"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "A DME recognizes replies to its own interrogating pulses because:",
            "options": ["each pulse pair has its own unique modulation which is replicated by the transponder", "the PRF of the interrogating pulses is jittered", "each aircraft has a different time interval within the pulses pairs which is replicated by the transponder", "the transponder uses a selective reply system to respond to the aircraft interrogation pulses"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The RNAV function of the FMC produces a position which:",
            "options": ["combines the short term accuracy of the external reference with the long term accuracy of the IRS", "produces a long term accuracy from the short term accuracy of the external references", "combines the long term accuracy of the external reference with the short term accuracy of the IRS", "relies solely on the IRS position"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If the identification of a VOR is FKL and the paired DME identification is FKZ, then:",
            "options": ["the transmitters are co-located", "the beacons are between 600 m and 6 NM apart", "the transmitters are within 600 m", "the transmitters are in excess of 6 NM apart"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The NAVSTAR/GPS operational constellation comprises:",
            "options": ["21 satellites in 6 orbits", "24 satellites in 6 orbits", "24 satellites in 3 orbits", "30 satellites in 6 orbits"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The model of the earth used for GPS is:",
            "options": ["WGS90", "PZ84", "PZ90", "WGS84"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "EGNOS provides a WAAS by determining the errors in ................ and broadcasting these errors to receivers using ................",
            "options": ["X, Y & Z coordinates geostationary satellites", "X, Y & Z coordinates pseudolites", "SV range geostationary satellites", "SV range pseudolites"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "If the aircraft DME interrogates a ground transponder on a frequency of 1199 MHz, it will receive replies on:",
            "options": ["1199 MHz", "1073 MHz", "1262 MHz", "1136 MHz"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The purpose of the PRN codes in NAVSTAR/GPS is to:",
            "options": ["identify the satellites", "synchronize the receiver clocks with the SV clocks", "pass navigation and system data to the receiver", "all of the above"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The provision of RAIM requires a minimum of ................ SVs",
            "options": ["3", "4", "5", "6"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Refer to Appendix A, diagram E. What is the track from BANTU to ZAPPO?",
            "options": ["360�(M)", "130�(M)", "360�(T)", "130�(T)"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The principle error in GNSS is:",
            "options": ["ionospheric propagation", "GDOP", "receiver clock error", "SV ephemeris error"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The number of SVs required to produce a 3D fix is:",
            "options": ["3", "4", "5", "6"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Refer to Appendix A. Which diagram shows the MAP display?",
            "options": ["Diagram A", "Diagram B", "Diagram C", "Diagram D"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The DME in an aircraft at FL630 measures a slant range of 16 NM from a ground station at 1225 ft AMSL. The plan range is:",
            "options": ["12.5 NM", "19 NM", "16 NM", "10.5 NM"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The altitude read-out at the ground station from a mode C response will give the aircraft altitude within:",
            "options": ["300 ft", "100 ft", "500 ft", "50 ft"],
            "correct": 1,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Radio Navigation Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Refer to Appendix A, diagram C. What is the symbol designated DFC which is coloured cyan?",
            "options": ["an in-use VORTAC", "an available VORTAC", "an in-use NDB", "an available NDB"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The middle marker is usually located at a range of ................., with an audio frequency of ................ and illuminates the ................. light.",
            "options": ["4-6 NM 1300 Hz white", "1 km 400 Hz white", "1 km 1300 Hz amber", "1 km 400 Hz amber"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The main advantage of a continuous wave radar over a pulsed radar is:",
            "options": ["more complex equipment but better resolution and accuracy", "removes the minimum range restriction", "smaller more compact equipment", "permits measurement of Doppler in addition to improved range and bearing"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "For a conventional VOR a phase difference of 090� would be achieved by flying............... from the beacon:",
            "options": ["west", "north", "east", "south"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The ILS glide slope transmitter generates false glide slope signals:",
            "options": ["above the true glide slope", "below the true glide slope", "either side of the localizer", "outside the coverage area"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "At a range of 200 NM from a VOR, if there is an error of 1�, how far off the centre line is the aircraft?",
            "options": ["3.5 NM", "1.75 NM", "7 NM", "1 NM"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The coverage of the ILS glide slope with respect to the localizer centre line is:",
            "options": ["+/-10� to 8 NM", "+/-10� to 25 NM", "+/-8� to 10 NM", "+/-35� to 17 NM"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Refer to appendix A, diagram F. What is the required track?",
            "options": ["165�", "173�", "157�", "130�"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The principle of operation of the ILS localizer transmitter is that it transmits two overlapping lobes on:",
            "options": ["different frequencies with different phases", "the same frequency with different phases", "the same frequency with different amplitude modulations", "different frequencies with different amplitude modulations"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The amplitude modulation of the ILS outer marker is ............... and it illuminates the................light in the cockpit.",
            "options": ["400 Hz blue", "1300 Hz amber", "400 Hz amber", "1300 Hz blue"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which of the following systems use pulse technique? 1. secondary surveillance radar 2. airborne weather radar 3. distance measuring equipment 4. primary radar",
            "options": ["all the above", "2 and 4 only", "2 only", "1 and 3 only"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "On an ILS approach you receive more of the 90 Hz modulation than the 150 Hz modulation. The action you should take is:",
            "options": ["fly left and up", "fly left and down", "fly right and up", "fly right and down"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "In which frequency band does ILS operate?",
            "options": ["UHF/VHF", "VHF", "SHF", "VLF"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Distance on MLS is measured by:",
            "options": ["measuring the time taken for the primary radar pulse to travel from the MLS transmitter to the aircraft receiver", "measuring the time taken for the secondary radar pulse to travel from the MLS transmitter to the aircraft receiver", "phase comparison between the azimuth and elevation beams", "co-located DME"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The coverage of MLS is ............... either side of the centre line to a distance of...............",
            "options": ["40� 40 NM", "40� 20 NM", "20� 20 NM", "20� 40 NM"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "In which band does the ILS glide path operate?",
            "options": ["metric", "centimetric", "decimetric", "hectometric"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "Refer to Appendix A, diagram A. What is the deviation from the required track?",
            "options": ["3 NM left", "3 NM right", "8� left", "8� right"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The definition of a radar display will be best with:",
            "options": ["narrow beamwidth and narrow pulsewidth", "narrow beamwidth and wide pulsewidth", "wide beamwidth and narrow pulsewidth", "wide beamwidth and wide pulsewidth"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Primary radar operates on the principle of:",
            "options": ["transponder interrogation", "pulse technique", "phase comparison", "continuous wave emission"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The best radar for measuring very short ranges is:",
            "options": ["a continuous wave primary radar", "a pulsed secondary radar", "a pulsed primary radar", "a continuous wave secondary radar"],
            "correct": 0,
            "explanation": ""
          }
        ]
      },
      {
        "name": "Radio Navigation Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "NAVSTAR GPS receiver clock error is removed by:",
            "options": ["regular auto-synchronization with the satellite clocks", "adjusting the pseudo-ranges to determine the error", "synchronization with the satellite clocks on initialization", "having an appropriate atomic time standard within the receiver"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The main advantage of a slotted scanner is:",
            "options": ["reduces side lobes and directs more energy into the main beam", "removes the need for azimuth slaving", "side lobe suppression", "can produce simultaneous map and weather information"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The advantages of SSR mode S are:",
            "options": ["improved resolution, TCAS", "data link, reduced voice communications", "TCAS, no RT communications", "better resolution, selective interrogation"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The DME IDENT signal consists of a Morse code transmission every:",
            "options": ["30-40 seconds at a pitch of 1350 Hz", "30-40 seconds at a pitch of 1020 Hz", "10-15 seconds at a pitch of 1350 Hz", "10-15 seconds at a pitch of 1020 Hz"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The positioning of a GNSS aerial on an aircraft is:",
            "options": ["in the fin", "on the fuselage as close as possible to the receiver", "on top of the fuselage close to the centre of gravity", "under the fuselage"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The use of the AWR on the ground is:",
            "options": ["not permitted", "permitted provided reduced power is used", "permitted provided special precautions are taken to safeguard personnel and equipment", "only permitted to assist movement in low visibility conditions"],
            "correct": 2,
            "explanation": ""
          },
          {
            "question": "The airborne weather radar (AWR) cannot detect:",
            "options": ["snow", "moderate rain", "dry hail", "wet hail"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "What are the ground components of MLS?",
            "options": ["Separate azimuth and elevation antennae with DME", "Separate azimuth and elevation antennae with middle and outer markers", "Combined azimuth and elevation antennae with DME", "Combined azimuth and elevation antennae with middle and outer markers"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Area navigation is:",
            "options": ["one which enables the aircraft to navigate on any desired flight path within the coverage of appropriate ground based navigation aids or within the specified limits of self-contained on-board systems or a combination of the two", "one which enables the aircraft to navigate on any desired flight path within the coverage of appropriate ground based navigation aids or within the specified limits of self-contained on-board systems but not a combination of the two", "one which enables the aircraft to navigate on any desired flight path within the coverage of appropriate ground based navigation aids only", "one which enables the aircraft to navigate on any desired flight path within the specified limits of self-contained on-board systems"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Which is the most suitable radar for measuring short ranges?",
            "options": ["Millimetric pulse", "Continuous wave primary", "Centimetric pulse", "Continuous wave secondary"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The PRN codes are used to:",
            "options": ["determine the time taken for the signal to reach the receiver", "differentiate between signals from different satellites", "pass navigation information to the receiver", "pass clock correction data to the receiver"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Refer to Appendix A, diagram D. What is the track deviation?",
            "options": ["0.8 NM left", "0.8 NM right", "8 NM left", "8 NM right"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The SSR ground transceiver interrogates on ................ and receives responses on ................",
            "options": ["1030 MHz 1030 MHz", "1030 MHz 1090 MHz", "1090 MHz 1030 MHz", "1090 MHz 1090 MHz"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The accuracy of SSR mode C altitude as displayed to the air traffic controller is:",
            "options": ["+/-25 ft", "+/-50 ft", "+/-75 ft", "+/-100 ft"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "Concerning NAVSTAR/GPS orbits, which of the following statements is correct?",
            "options": ["The inclination of the orbits is 55� with an orbital period of 12 hours", "The inclination of the orbits is 55� with an orbital period of 24 hours", "The orbits are geostationary to provide global coverage", "The orbits are inclined at 65� with an orbital period of 11 hours 15 minutes"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "Why is a secondary radar display free from weather clutter?",
            "options": ["The frequencies are too low to detect water droplets", "The frequencies are too high to detect water droplets", "Moving target indication cancels out weather returns", "Weather returns are filtered out because they do not originate from transponders"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The frequency used for airborne weather radar is:",
            "options": ["9375 MHz", "937.5 MHz", "93.75 GHz", "9375 GHz"],
            "correct": 0,
            "explanation": ""
          },
          {
            "question": "The vertical position provided by SSR mode C is referenced to:",
            "options": ["QNH unless QFE is in use", "1013.25 hPa", "QNH", "WGS84 datum"],
            "correct": 1,
            "explanation": ""
          },
          {
            "question": "The EHSI is showing 5� fly right with a TO indication. The aircraft heading is 280�(M) and the required track is 270�. The radial is:",
            "options": ["275", "265", "085", "095"],
            "correct": 3,
            "explanation": ""
          },
          {
            "question": "The contents of the navigation and systems message from NAVSTAR/GPS SVs include:",
            "options": ["satellite clock error, almanac data, ionospheric propagation information", "satellite clock error, almanac data, satellite position error", "position accuracy verification, satellite clock time and clock error", "ionospheric propagation information, X, Y & Z coordinates and corrections, satellite clock time and error"],
            "correct": 0,
            "explanation": ""
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
        "name": "Flight Planning Test 1",
        "timeLimit": 60,
        "questions": [
          { "question": "Refer to CAP 697 MRJT Figure 4.4. Given: Aircraft mass 43000 kg, Destination airfield elevation = 3500 ft, Alternate airfield elevation = 10 ft, ISA conditions. What is the final reserve?", "options": ["2110 kg", "1025 kg", "1038 kg", "1055 kg"], "correct": 3 },
          { "question": "Refer to CAP 697 MRJT Fig 4.3.2b. Given: 5000 kg fuel available, Cruise at FL210, 50 kt headwind, Landing weight 45000 kg. How far could you fly?", "options": ["600 NGM", "750 NGM", "500 NGM", "670 NGM"], "correct": 0 },
          { "question": "Refer to ED-6. The radio navigation aid at N4854.8 E00920.4 is:", "options": ["a VOR/DME call sign LBU frequency 109.20 kHz", "a Tacan call sign LBU channel number 109.20", "a VOR/TAC call sign LBU frequency 109.20 MHz", "a VOR/DME call sign LBU frequency 109.20 MHz"], "correct": 3 },
          { "question": "In the Jeppesen route manual, the reporting points on the airways are indicated by:", "options": ["true course/track", "magnetic course/track", "true heading", "magnetic heading"], "correct": 1 },
          { "question": "Given: Track 185°(T), Variation 9° east, Heading 182°(M). Which is the lowest suitable ICAO IFR cruising level?", "options": ["FL280", "FL310", "FL290", "FL270"], "correct": 3, "explanation": "Magnetic Track = 185 - 9 = 176°. Westerly track = Even levels. Lowest suitable is FL270" },
          { "question": "Refer to CAP 697 MRJT Figure 4.3.1b. Given: Trip Distance 1000 NM, Nil wind, FL290. For a temperature increase of 30°C the approximate change in trip time is:", "options": ["10%", "-5%", "-10%", "7%"], "correct": 1 },
          { "question": "Information on Search and Rescue (SAR) procedures may be obtained:", "options": ["from NOTAMs", "from the latest AIC", "from the Aeronautical Information Publication", "by RT communication with the FIR within which the aircraft is operating"], "correct": 2 },
          { "question": "Refer to ED-6. The track and distance between Friedrichschafen (EDNY) and Stuttgart (EDDS) are:", "options": ["350°(M) 62.5 km", "345°(M) 65 NM", "349°(M) 62.5 NM", "351°(M) 116 km"], "correct": 2 },
          { "question": "The air distance and time to climb is 197 NAM and 33 min respectively. What is the required ground distance with a 40 kt headwind component?", "options": ["222 NGM", "184 NGM", "157 NGM", "175 NGM"], "correct": 3, "explanation": "Ground Distance = Air Distance - (Wind Component * Time) => 197 - (40 * 33/60) = 197 - 22 = 175 NGM" },
          { "question": "Refer to CAP 697 MRJT Figure 4.5.4. An aircraft with an estimated landing weight of 55000 kg plans a descent from FL310 through turbulence, the mean wind component in the descent is 45 kt headwind. The fuel and ground distance are:", "options": ["280 kg 82 NGM", "270 kg 107 NGM", "270 kg 79 NGM", "275 kg 117 NGM"], "correct": 2 },
          { "question": "Refer to CAP 697 MEP Figure 3.4. An aircraft is flying at a High Speed Cruise at a pressure altitude of 12000 ft, temperature ISA +15°C. The TAS is:", "options": ["189 kt", "186 kt", "183 kt", "182 kt"], "correct": 1 },
          { "question": "On a Jeppesen chart the figures \"FL80 2700a\" are displayed below an airway. What does the \"FL80\" indicate?", "options": ["The route MORA (a safety altitude)", "Minimum en route altitude", "Maximum authorized altitude", "The base of the airway"], "correct": 1 },
          { "question": "Refer to CAP 697 MRJT Figure 4.1. If an aircraft's cruise weight is 50000 kg the Optimum Altitude for a 0.78 Mach flight is:", "options": ["35500 ft pressure altitude", "36200 ft pressure altitude", "35500 ft altitude", "FL360"], "correct": 0 },
          { "question": "Refer to CAP 697 SEP Figure 2.1. Given: Airfield elevation 6000 ft, OAT 15°C, Initial Weight 3525 lb, Cruise altitude 14000 ft, OAT -13°C, Wind component 60 kt tail. The time, fuel and nautical ground miles to TOC are:", "options": ["16 min 5 gal 31 NGM", "15 min 6 gal 18 NGM", "17 min 7 gal 46 NGM", "16 min 5 gal 52 NGM"], "correct": 3 },
          { "question": "Reference CAP 697 MRJT Figure 4.5.3.2. Given: Brake Release Mass 62800 kg, Fuel to TOC 1400 kg, 0.74 Mach, Cruise at FL310, ISA -10°C, Wind component 50 kt head, Mass at first reporting point after TOC 59500 kg. The planned ground distance TOC to the first reporting point is:", "options": ["356 NM", "314 NM", "277 NM", "280 NM"], "correct": 2 },
          { "question": "An aircraft is airborne from an airfield, elevation 1560 ft AMSL, on a QNH of 986 mb/hPa. On its track of 269°(M) there is a mountain 12090 ft AMSL. To clear this obstacle by a minimum of 2000 ft its correct ICAO VFR Flight level is: (1 mb/hPa = 30 ft).", "options": ["FL145", "FL155", "FL160", "FL165"], "correct": 3, "explanation": "Pressure difference = 1013 - 986 = 27 hPa. Altitude correction = 27 * 30 = 810 ft. Required altitude = 12090 + 2000 + 810 = 14900 ft. Mag track 269 = Westbound = Even + 500. Lowest VFR level above 14900 is FL165" },
          { "question": "Reference CAP 697 MRJT Figure 4.5.1. Given: Climb to FL350, ISA+6°C, MSL airfield, Brake Release Weight 57500 kg. The time, fuel, TAS and distance covered are:", "options": ["22 min 1625 kg 395 kt 114 NAM", "20 min 1625 kg 395 kt 117 NAM", "20 min 1630 kg 395 kt 100 NAM", "21 min 1675 kg 398 kt 133 NAM"], "correct": 1 },
          { "question": "Refer to CAP 697 MEP Figure 3.5. The endurance \"With 45 Min. Reserve at 45% Power\" for an Economy Cruise at 13000 ft is:", "options": ["4 h 25 min", "4 h 04 min", "4 h 57 min", "6 h 18 min"], "correct": 0 },
          { "question": "Refer to CAP 697 SEP Figure 2.2. Given: Pressure Altitude 10000 ft, OAT -15°C, Power 23 inHg @ 2300rpm. The fuel flow and KIAS are:", "options": ["67.3 PPH 140 kt", "67.3 GPH 157 kt", "11.4 GPH 139 kt", "66.2 GPH 137 kt"], "correct": 0 },
          { "question": "Refer to CAP 697 SIMPLIFIED LRC (use Figures 4.5.3.1 & 4.3.1B). Given : Distance 997 NGM, Tailwind component 160 kt, Landing weight 45000 kg, Cruise weight 56000 kg, FL370, ISA 0°C. The fuel required and trip time are:", "options": ["11200 kg 4 h 09 min", "5300 kg 1 h 09 min", "4200 kg 1 h 51 min", "5000 k g 2 h 00 min"], "correct": 2 }
        ]
      },
      {
        "name": "Flight Planning Test 2",
        "timeLimit": 60,
        "questions": [
          { "question": "A flight from BIRMINGHAM (EGBB) to DUBLIN (EIDW) has an EOBT of 09:30 UTC, actual airborne time of 09:50, expected trip time of 1 hour, estimated flying time to SHANNON FIR (EISN) boundary of 55 minutes. How should you complete item 18 of the ICAO flight plan regarding your estimate for the FIR boundary?", "options": ["EET/EIDW1045", "EET/EISN1025", "EET/EISN0055", "EET/EISN0060"], "correct": 2, "explanation": "EET entry should be the estimated time from takeoff to the FIR boundary" },
          { "question": "Refer to Jeppesen E(LO)5. What is the lowest continuous flight level you should maintain along B45 when flying from Czempin/CZE (N52 07 E01643) to Chociwel/CHO (N5328 E01521)?", "options": ["FL60", "FL70", "FL180", "FL80"], "correct": 3 },
          { "question": "You are cruising at FL250 and need to be at FL50 10 NM before a VOR/DME. Your rate of descent is 1250 ft/min and your GS in the descent 250 kt. At what distance from the VOR do you start the descent?", "options": ["77 NM", "67 NM", "87 NM", "57 NM"], "correct": 1 },
          { "question": "Refer to ED-6. The track and distance between Stuttgart (EDDS) N4841.4 E00913.3 and Munchen (EDDM) N4821.3 E01147.1 are:", "options": ["279°(M) 85 NM", "099°(M) 114 NM", "099°(M) 85 NM", "099°(M) 59 NM"], "correct": 2 },
          { "question": "Reference CAP 697 MRJT Figure 4.5.3.1. Given: Pressure altitude 33000 ft, LRC, OAT -61°C, Cruise time 29 min, Zero wind, Initial gross weight 54100 kg. The fuel required is:", "options": ["1093 kg", "1107 kg", "1100 kg", "1207 kg"], "correct": 0 },
          { "question": "Refer to Jeppesen MUNICH 10-2B. When approaching Munich via TANGO with a westerly surface wind, the route and track miles to the IAF are expected to be:", "options": ["AALEN - WLD - ROKIL - MBG 90 NM", "AALEN - WLD - ROKIL 51 NM", "AALEN - WLD - ROKIL - MBG 124 NM", "WLD-ROKIL 10 NM"], "correct": 0 },
          { "question": "Refer CAP 697 MRJT Fig 4.7.2. Given: ETOPS approval for 120 minutes, Weight at diversion 50000 kg, Long Range Cruise. Your diversion airfield should be within:", "options": ["742 NM", "379 NM", "768 NM", "1101 NM"], "correct": 0 },
          { "question": "Refer CAP 697 MRJT Figure 4.3.2c. Given: Mach 0.74 cruise, Trip fuel available 17000 kg, FL280, Estimated landing mass 52000 kg, Trip distance 2500 NGM. What is the maximum wind component?", "options": ["Zero", "25 kt head", "25 kt tail", "60 kt head"], "correct": 1 },
          { "question": "You plan to fly from A to B at a TAS of 230 kt, a GS of 255 kt and an initial cruising pressure altitude of 15000 ft. How should you complete item 15 of the ICAO Flight Plan?", "options": ["K0230 F150", "N0230 F150", "N0255 S1500", "N0230 FL150"], "correct": 1, "explanation": "N indicates knots, followed by TAS. F indicates flight level based on standard pressure" },
          { "question": "A normal commercial IFR flight has an estimated EOBT of 1540 UTC with the estimated take-off time as 1555 UTC. What is the latest time for filing the ICAO flight plan?", "options": ["1510 UTC", "1455 UTC", "1525 UTC", "1440 UTC"], "correct": 3, "explanation": "Flight plan must be filed at least 60 minutes before EOBT" },
          { "question": "Refer to Jeppesen AMSTERDAM Schiphol SID 10-3. Which of the following statements is true regarding an ANDIK departure from RWY 19L?", "options": ["Contact Schipol Departure on 119.05 MHz when passing 2000 ft and report altitude", "The distance to ANDIK is 42 NM from SPL VOR", "Climb straight ahead till SPL 7DME", "Maximum IAS 250 kt till turning left at SPL 3.1DME"], "correct": 0 },
          { "question": "Refer to Jeppesen Polar High Altitude Chart 5AT(HI). What is the Grid track from Stornoway (N58 W006) to Kulusuk (N6530 W03710)?", "options": ["318°", "298°", "138°", "118°"], "correct": 0 },
          { "question": "Given: GS OUT = 178, GS HOME = 249, Distance A to B = 450 NM, Endurance 3 hours. What is the distance to the Point of Safe Return from A?", "options": ["204 NM", "311 NM", "415 NM", "262 NM"], "correct": 1, "explanation": "Time to PSR = Endurance * GS_HOME / (GS_OUT + GS_HOME) = 3 * 249 / (178 + 249) = 747 / 427 ≈ 1.75 hrs. Distance = Time * GS_OUT = 1.75 * 178 ≈ 311 NM" },
          { "question": "Given: A to B Distance 2050 NM, Safe Endurance 6 hours, GS OUT = 480 kt, GS ON = 450 kt, GS HOME = 380 kt. Calculate the distance and time to the Point of Equal Time from A.", "options": ["1272 NM 2 h 39 min", "906 NM 1 h 53 min", "1111 NM 2 h 19 min", "939 NM 1 h 57 min"], "correct": 3 },
          { "question": "Refer CAP 697 MRJT Figure 4.3.6. Flight from Paris to London with Manchester being the alternate. Given: London - Manchester 160 NM, Mean track 350°(T), W/V 250/30°(T), Estimated landing mass at alternate 50000 kg. What is the fuel and time to alternate?", "options": ["1200 kg 20 min", "1600 kg 36 min", "1450 kg 32 min", "1300 kg 28 min"], "correct": 2 },
          { "question": "You are required to uplift 40 US gallons of AVGAS with SG of 0.72. How many litres and kilograms is this?", "options": ["109 l 151 kg", "182 l 131 kg", "182 l 289 kg", "151 l 109 kg"], "correct": 3, "explanation": "40 US Gal * 3.785 L/Gal ≈ 151.4 L. Mass = Volume * Density = 151.4 L * 0.72 kg/L ≈ 109 kg" },
          { "question": "A flight is due to operate between London and Glasgow on a Repetitive Flight Plan (RPL). Prior to departure Glasgow is closed due to heavy snow. The operator intends to operate this flight to Edinburgh instead. The correct action regarding flight plans is:", "options": ["this cannot be done, go back to airport hotel", "operations should inform the London ATC Unit at least 10 minutes before departure", "cancel the RPL and file a standard ICAO flight plan to Edinburgh", "take-off for Glasgow and divert along route"], "correct": 2 },
          { "question": "Refer CAP 697 MRJT Fig 4.3.1. Given: FL370 @ LRC, ISA +20°C, Distance 800 NGM, 50 kt headwind, Landing weight 50000 kg. What is the trip fuel and flight time?", "options": ["5600 kg 2 h 17 min", "4600 kg 1 h 57 min", "5000 kg 2 h 07 min", "5200 kg 2 h 11 min"], "correct": 0 },
          { "question": "A current flight plan is:", "options": ["the filed flight plan with amendments and clearances included", "the filed flight plan without any changes", "flight plan with correct time of departure", "one that is stored via repetitive flight plan procedures"], "correct": 0 },
          { "question": "Reference CAP 697 MRJT Figure 4.3.6. Given: Time to alternate 54 min, Landing weight 55000 kg, Wind component 50 kt tail. The alternate fuel and nautical ground mile distance are:", "options": ["2500 kg 320 NGM", "1500 kg 175 NGM", "2350 kg 355 NGM", "2200 kg 350 NGM"], "correct": 2 }
        ]
      },
      {
        "name": "Flight Planning Test 3",
        "timeLimit": 60,
        "questions": [
          { "question": "Given: Total endurance 5 h, Reserves required 1 h, GS On 250 kt, GS Out 280 kt, GS Home 320 kt. What is the time and distance to the PSR from \"A\"?", "options": ["2 h 40 min 747 NM", "2 h 15 min 629 NM", "2 h 08 min 597 NM", "1 h 52 min 523 NM"], "correct": 2, "explanation": "Safe Endurance = 5 - 1 = 4 hrs. Time to PSR = Safe Endurance * GS_HOME / (GS_OUT + GS_HOME) = 4 * 320 / (280 + 320) = 1280 / 600 ≈ 2.133 hrs ≈ 2 hr 08 min. Distance = Time * GS_OUT = 2.133 * 280 ≈ 597 NM" },
          { "question": "Reference E(HI)5 CAA for examinations From Mende-Nasimbals (N4436.4 E00309.7) to Gaillac (N4357.3 E00149.5) via UG5. Which of these levels is the lowest available?", "options": ["290", "310", "330", "350"], "correct": 0 },
          { "question": "Where may details of temporary Danger and Restricted Airspace be found?", "options": ["SIGMETs", "Aeronautical Information Circulars (AIC)", "NOTAM and Aeronautical Information Publication (AIP)", "ATCC"], "correct": 2 },
          { "question": "Refer to Training Manual, Amsterdam page 10-9X. What is the minimum channel spacing for VHF COMMS above FL245?", "options": ["25 kHz", "12.5 kHz", "8.33 kHz", "50 kHz"], "correct": 2 },
          { "question": "In which document would you find information on known short-term unserviceability of VOR, TACAN, and NDB?", "options": ["NOTAM", "Aeronautical Information Publication (AIP)", "SIGMET", "ATCC"], "correct": 0 },
          { "question": "Given: TAS 400 kt, Distance from A to B 2000 NM. A 40 kt headwind is forecast from A to B, what is the distance and time to the PET from \"A\"?", "options": ["1100 NM 3 h 03 min", "1100 NM 2 h 30 min", "900 NM 2 h 30 min", "1000 NM 2 h 47 min"], "correct": 0, "explanation": "GS_OUT = 400 - 40 = 360 kt. GS_HOME = 400 + 40 = 440 kt. PET Distance = (Total Distance * GS_HOME) / (GS_OUT + GS_HOME) = (2000 * 440) / (360 + 440) = 880000 / 800 = 1100 NM. Time = Distance / GS_OUT = 1100 / 360 ≈ 3.055 hrs ≈ 3 hr 03 min" },
          { "question": "When completing an IFR flight plan the \"Total Elapsed Time\" in item 16 is from:", "options": ["take-off to overhead the destination airport", "from first taxiing under own power until the IAF for destination airport", "take-off to the IAF for the destination airport", "take-off until landing at the destination airport"], "correct": 2 },
          { "question": "Reference E(HI)4 (CAA FOR EXAMS) GIBSO (N5045.1 W00230.3). A flight is planned along UA2 from Strumble (N5205.5 W00502.5) to MID (N5304.8 W00726.0). Which statement is correct?", "options": ["UA2 is advisory route only", "Lowest available FL is 250", "Maximum authorized FL is 450", "FL310"], "correct": 1 },
          { "question": "Given: Total endurance 300 min, Required reserves 45 min, TAS 140 kt, Course 050°, W/V 270°/30. What is the time and distance to the PSR from \"A\"?", "options": ["148 min 401 NM", "125 min 338 NM", "90 min 242 NM", "106 min 287 NM"], "correct": 3 },
          { "question": "An aircraft is carrying Maritime Survival Equipment. The correct entry at item 19 is:", "options": ["cross out indicators P, D and J, tick M", "circle indicator M", "tick indicator M", "cross out indicators P, D and J"], "correct": 3, "explanation": "Standard procedure is to cross out survival equipment not carried" },
          { "question": "Refer to Jeppesen E(LO)1 What type of radio navigation aid is located at Perth (N5626 W00322)?", "options": ["VOR on 110.4 MHz and NDB on 394 kHz", "TACAN on 110.4 kHz", "VOR on 110.4 MHz", "VOR/DME on 110.4 MHz"], "correct": 2 },
          { "question": "Given: Distance from A to B 3200 NM, GS On 480 kt, GS Home 520 kt. What is the distance and time to the PET from \"A\"?", "options": ["1664 NM 3 h 12 min", "1600 NM 3 h 20 min", "1664 NM 3 h 28 min", "1536 NM 3 h 12 min"], "correct": 2, "explanation": "PET Distance = (Total Dist * GS_HOME) / (GS_ON + GS_HOME) = (3200 * 520) / (480 + 520) = 1664000 / 1000 = 1664 NM. Time = Distance / GS_ON = 1664 / 480 ≈ 3.467 hrs ≈ 3 hr 28 min" },
          { "question": "Reference E(HI)4 (CAA FOR EXAMS) What is the total distance and mean true course between Abbeville (N5008.1E00151.3) and Biggin (N5119.8 E00002.2) on UA20?", "options": ["100 NM 321°(T)", "162 NM 313°(T)", "162 NM 316°(T)", "100 NM 316°(T)"], "correct": 3 },
          { "question": "Given: TAS 165 kt, W/V 090°/35, A to B 1620 NM, Course 035°. What is the distance and time to the PET from \"A\"?", "options": ["903 NM 6 h 04 min", "810 NM 5 h 42 min", "708 NM 5 h", "912 NM 6 h 26 min"], "correct": 3 },
          { "question": "An aircraft has been planned to fly via a significant point based upon the TIR VORDME, QDM120 at range of 95 NM. The correct entry for the ICAO flight plan is:", "options": ["TIR300095", "TIR120095", "TIR30095", "300095TIR"], "correct": 0, "explanation": "Waypoint defined by radial/distance uses Radial (True) then Distance. QDM 120 = Radial 300 True" },
          { "question": "Given: Distance from A to B 1200 NM, GS On 230 kt, GS Home 170 kt. What is the distance and time to the PET from \"A\"?", "options": ["600 NM 2 h 37 min", "510 NM 2 h 13 min", "690 NM 3 h", "510 NM 3 h"], "correct": 1, "explanation": "PET Distance = (1200 * 170) / (230 + 170) = 204000 / 400 = 510 NM. Time = 510 / 230 ≈ 2.217 hrs ≈ 2 hr 13 min" },
          { "question": "Details of temporary danger areas are published:", "options": ["in AICs", "on the appropriate chart", "by VOLMET", "in NOTAMs"], "correct": 3 },
          { "question": "Given: DOM 33510 kg, Traffic load 7600 kg, Taxi fuel 250 kg, Trip Fuel 2500 kg, Contingency fuel 125 kg, Final reserve fuel 983 kg, Alternate fuel 1100 kg. What is the estimated landing mass at the destination?", "options": ["43318 kg", "45818 kg", "42218 kg", "43193 kg"], "correct": 0, "explanation": "ZFW = DOM + Traffic Load = 33510 + 7600 = 41110 kg. Ramp Fuel = Trip + Contingency + Reserve + Alternate + Taxi = 2500 + 125 + 983 + 1100 + 250 = 4958 kg. TOM = ZFW + Ramp Fuel - Taxi Fuel = 41110 + 4958 - 250 = 45818 kg. Landing Mass = TOM - Trip Fuel = 45818 - 2500 = 43318 kg" },
          { "question": "At a fuel Relative Density of 0.80 an aircraft turbine engine burns 220 litres per hour. If Relative Density is 0.75 what is the fuel burn?", "options": ["235 L/h", "206 L/h", "220 L/h", "176 L/h"], "correct": 0, "explanation": "Fuel burn is typically measured by mass flow rate, which remains constant for a given power setting. Mass flow = Volume flow * Density. So, Mass Flow = 220 L/h * 0.80 kg/L = 176 kg/h. New Volume Flow = Mass Flow / New Density = 176 kg/h / 0.75 kg/L ≈ 234.7 L/h" },
          { "question": "Given: Total endurance 7 h 40 min, Safe endurance 6 h, GS Out 230 kt, GS Home 170 kt. What is the time and distance to the PSR from \"A\"?", "options": ["2 h 33 min 587 NM", "3 h 15 min 750 NM", "3 h 27 min 794 NM", "2 h 33 min 434 NM"], "correct": 0, "explanation": "Time to PSR = Safe Endurance * GS_HOME / (GS_OUT + GS_HOME) = 6 * 170 / (230 + 170) = 1020 / 400 = 2.55 hrs = 2 hr 33 min. Distance = Time * GS_OUT = 2.55 * 230 = 586.5 NM" }
        ]
      },
      {
        "name": "Flight Planning Test 4",
        "timeLimit": 60,
        "questions": [
          { "question": "What is Decision Point Procedure? It is a procedure to reduce the amount of fuel carried on a flight by:", "options": ["reducing contingency fuel from 10% to 5% of trip fuel", "reducing contingency fuel to only that required from Decision Point to destination", "reducing trip fuel to only that required from Decision Aerodrome to destination", "reducing contingency fuel to below that required from Decision Point to destination"], "correct": 1 },
          { "question": "Given: Dry Op Mass = 33510 kg, Traffic Load = 7600 kg, Final reserve fuel = 983 kg, Alternate fuel = 1100 kg, Contingency fuel = 102 kg. The estimated landing mass at the alternate should be:", "options": ["42312 kg", "42093 kg", "42210 kg", "42195 kg"], "correct": 3 },
          { "question": "Under what circumstances may an Aircraft Operator (AO) submit flight plans covering shorter stages of the flight?", "options": ["Never, flight plans must always cover the entire flight", "Always, it improves the workload for ATC", "When communication between aircraft and ATC is poor", "When communication between aircraft and the AO is poor"], "correct": 2 },
          { "question": "If a pilot lands at an aerodrome other than the destination specified in the flight plan, he must:", "options": ["ensure that all ATSUs which were addressees on the flight plan are notified of his landing", "ensure that the ATSU at the original destination is informed within 60 minutes", "ensure that the ATSU at the original destination is informed within 30 minutes", "report to ATC to apologize"], "correct": 2 },
          { "question": "Use Jeppesen chart 5AT(HI) and the following route: A (N8500.0 W16000.0) to B (N8000.0 W16400.0) to C (N7500.0 W16450.0). The boundary along latitude N75 indicates:", "options": ["an Upper Information Region", "an Air Defence Identification Zone", "an international boundary", "a QNH boundary"], "correct": 1 },
          { "question": "Given: Turbojet a/c, Taxi fuel 600 kg, Fuel flow cruise 10000 kg/h, Fuel flow hold 8000 kg/h, Alternate fuel 10200 kg, Flight time 6 hours, Visibility at destination is forecast to be 800m. What is the minimum ramp fuel?", "options": ["79400 kg", "75400 kg", "83800 kg", "70800 kg"], "correct": 2 },
          { "question": "On a Jeppesen chart, the marking FL230 indicates:", "options": ["The airspace below FL230 is uncontrolled", "The airspace is uncontrolled inclusive of FL230 and below", "The airspace is controlled from ground level up to FL230", "The airspace is controlled from FL220 inclusive and above"], "correct": 0 },
          { "question": "Use Jeppesen chart 5AT(HI) and the following route: A (N8500.0 W16000.0) to B (N8000.0 W16400.0) to C (N7500.0 W16450.0). The total distance is:", "options": ["302 NM", "602 km", "605 NM", "602 NM"], "correct": 3 },
          { "question": "In the event of a delay in excess of ........ of ....... for a controlled flight, or a delay of ......... for an uncontrolled flight for which a flight plan has been submitted, the flight plan should be amended or a new flight plan submitted and the old plan cancelled, whichever is appropriate.", "options": ["30 minutes, Estimated Off-block Time, 3 hours", "30 minutes, planned take off time, 1 hour", "60 minutes, planned take off time, 3 hours", "30 minutes, EOBT, 1 hour"], "correct": 3 },
          { "question": "What are the reasons for the format of the ICAO flight plan?", "options": ["To standardize flight plan formats internationally", "To allow automated processing of flight plans", "Both A & B", "To suit the requirements of the Chicago convention"], "correct": 2 },
          { "question": "Normally, flight plans should be filed on the ground at least .... before clearance to start up is requested. Exceptionally, when it is not possible to meet this requirement, operators should ............... and never .......", "options": ["30 minutes, give as much notice as possible, less than 60 minutes", "60 minutes, give as much notice as possible, less than 30 minutes", "3 hours, cancel the flight, cause such trouble again", "3 hours, give as much notice as possible, 30 minutes"], "correct": 1 },
          { "question": "Given: DOM 33510 kg, Traffic load 7600 kg, Trip fuel 2040 kg, Final reserve 983 kg, Alternate fuel 1100 kg, Contingency 5% of trip fuel. Which of the following is correct?", "options": ["Est. landing mass at destination 43193 kg", "Est. landing mass at destination 43295 kg", "Est. take-off mass 43295 kg", "Est. take-off mass 45233 kg"], "correct": 1, "explanation": "ZFW = 33510 + 7600 = 41110 kg. Contingency = 0.05 * 2040 = 102 kg. Takeoff Fuel = Trip + Contingency + Reserve + Alternate = 2040 + 102 + 983 + 1100 = 4225 kg. TOM = ZFW + Takeoff Fuel = 41110 + 4225 = 45335 kg. Landing Mass = TOM - Trip = 45335 - 2040 = 43295 kg" },
          { "question": "Which sections of a CA48 are not normally transmitted to other ATSUs? i Addressees ii Items 3 to 18 - the main body of the FPL iii Item 19 - Supplementary Information", "options": ["i and iii", "ii and iii", "i and ii", "i, ii and iii"], "correct": 0 },
          { "question": "What is contingency fuel?", "options": ["Fuel for engine start and taxi", "Fuel to cover deviations from the planned operation", "Fuel for holding at the destination", "Fuel for diversion to an alternate"], "correct": 1 },
          { "question": "What is the purpose of Decision Point Procedure?", "options": ["Carry minimum fuel to increase Traffic Load", "Increase safety of the flight", "Reduce landing mass to avoid stressing the aircraft", "Reduce contingency fuel to below that required from Decision Point to destination"], "correct": 0 },
          { "question": "Refer to Jeppesen Manual - VFR Section Aberdeen 10-IV What frequency is the Aberdeen ATSU on?", "options": ["114.30 MHz", "126.25 MHz", "119.87 MHz", "135.17 MHz"], "correct": 3 },
          { "question": "Use Jeppesen chart 5AT(HI) and the following route: A (N8500.0 W16000.0) to B (N8000.0 W16400.0) to C (N7500.0 W16450.0). The highest Grid MORA for the route is:", "options": ["1000 ft", "1600 ft", "160 ft", "1600 m"], "correct": 1 },
          { "question": "Use Jeppesen chart 5AT(HI) and the following route: A (N8500.0 W16000.0) to B (N8000.0 W16400.0) to C (N7500.0 W16450.0). The grid track from N7000.0 W16630.0 to N7456.8 W14100.0 is:", "options": ["212°", "032°", "056°", "043°"], "correct": 0 },
          { "question": "Flight plans for flights affected by Air Traffic Flow Management (ATFM) rules, and in areas such as the North Atlantic, must be filed at least ....... before EOBT.", "options": ["3 hours", "1 hour", "30 minutes", "Never less than 10 minutes"], "correct": 0 },
          { "question": "Use Jeppesen chart 5AT(HI) and the following route: A (N8500.0 W16000.0) to B (N8000.0 W16400.0) to C (N7500.0 W16450.0). The constant track direction from A to B is:", "options": ["168°(G)", "148°(M)", "348°(G)", "186°(T)"], "correct": 2 }
        ]
      },
      {
        "name": "Flight Planning Test 5",
        "timeLimit": 60,
        "questions": [
          { "question": "A filed flight plan is:", "options": ["the flight plan as filed with an ATS unit by the pilot or a designated representative, without any subsequent changes", "the flight plan, including changes, if any, brought about by subsequent clearances", "the flight plan, including changes, if any, cleared prior to take-off", "the flight plan, including changes, if any, cleared prior to the aircraft's present position"], "correct": 0 },
          { "question": "Refer to CAP 697 SEP1 Fig 2.4. Given: Aeroplane mass at start up 3663 lb, Fuel load (density 6 lb/gal) 74 gal, Take-off altitude sea level, Headwind 40 kt, Cruise altitude 8000 ft, Power setting full throttle 2300 rpm, OAT 20°C, Lean of peak. Calculate the range.", "options": ["633 NM", "844 NM", "730 NM", "547.5 NM"], "correct": 0 },
          { "question": "Refer to Jeppesen Manual - VFR Section Athinai 29-1. What is the location identifier for MEGARA aerodrome?", "options": ["LGMG", "LGMR", "267/22 NM", "086/32 NM"], "correct": 0 },
          { "question": "Refer to CAP 697 MRJT1 fig 4.5.3.1. Given: LRC, FL330, Temp -63°C, Mass 54100 kg, Time 28.5 min. Find the fuel consumed.", "options": ["1207 kg", "1191 kg", "1092 kg", "1107 kg"], "correct": 2 },
          { "question": "Refer to Jeppesen Manual - VFR Section Aberdeen 10-IV. What is the max ground elevation within the CTR?", "options": ["1733 ft", "1733 m", "2105 ft", "1245 ft"], "correct": 0 },
          { "question": "Refer to Jeppesen Manual - VFR Section Athinai 29-1. What are the call sign and frequency for start-up?", "options": ["ATIS 123.40 MHz", "Approach 119.10 MHz", "Ground 121.70 MHz", "Tower 118.10 MHz"], "correct": 2 },
          { "question": "Refer to CAP 697 MRJT1 fig 4.5.3.1. Given: Long Range Cruise at FL350, OAT -45°C, Gross mass at the beginning of the leg 40000 kg, Gross mass at the end of the leg 39000 kg. Find: True airspeed (TAS) and cruise distance (NAM) for a twin-jet aeroplane.", "options": ["TAS 433 kt, 227 NAM", "TAS 423 kt, 227 NAM", "TAS 433 kt, 1163 NAM", "TAS 423 kt, 936 NAM"], "correct": 0 },
          { "question": "Refer to Jeppesen Manual ED-6. Give the frequency of ZURICH VOLMET.", "options": ["127.2 MHz", "127.2 kHz", "128.525 MHz", "118.1 MHz"], "correct": 0 },
          { "question": "Refer to CAP 697 SEP1, Fig 2.1. Given: FL75, OAT +5°C, During climb, Average headwind component 20 kt, Take-off from MSL with initial mass of 3650 lb. Find time and fuel to climb.", "options": ["11 min, 3.6 US.gal", "7 min, 2.6 US.gal", "9 min, 2.7 US.gal", "9 min, 3.3 US.gal"], "correct": 3 },
          { "question": "Refer to CAP 697 MRJT1 fig 4.5.3.1. Given: FL330, COAT -63°C, Weight 50500 kg. What is the TAS?", "options": ["411 kt", "433 kt", "421 kt", "423 kt"], "correct": 2 },
          { "question": "Refer to Jeppesen Manual - VFR Section Aberdeen. What is the maximum wing span of an aircraft using the eastern apron and taxiway?", "options": ["20 ft", "20 m", "23 m", "10 m"], "correct": 1 },
          { "question": "Refer to CAP 697 MRJT1, fig 4.5.1. Planning an IFR flight from Paris (Charles de Gaulle) to London (Heathrow) for the twin-jet aeroplane. Given: Estimated take-off mass 52000 kg, Airport elevation 387 ft, FL280, W/V 280/40 kt, ISA deviation -10°C, Average true course 340. Find the time to top of climb.", "options": ["3 min", "11 min", "12 min", "15 min"], "correct": 1 },
          { "question": "Refer to Jeppesen Manual ED-6. The GRENCHEN LSZG aerodrome (N4711 E00725) has a tower frequency of 120.10MHz. The \"(V)\" after the frequency indicates:", "options": ["available on request", "only to be used during daylight", "available for VFR flight only", "VDF available"], "correct": 3 },
          { "question": "ATC must be informed of changes which occur to the flight plan speed and ETA. Many nations stipulate their own limits but PANS-RAC require changes of ..... in TAS and/or ..... in ETA to be notified.", "options": ["+/- 5% / +/- 3 minutes", "+/- 10% / +/- 5 minutes", "+/- 3 kt / +/- 3 minutes", "+/- 3 kt 3 minutes"], "correct": 0 },
          { "question": "Refer to Jeppesen Manual ED-6. Flying VFR from VILLINGEN (N4758 E00831) to FREUDENSTADT (N4828 E00824), determine the distance.", "options": ["54 NM", "29 km", "29 NM", "33 NM"], "correct": 2 },
          { "question": "Refer to CAP 697 SEP1, Fig 2.1. Given: Aerodrome elevation 2500 ft, OAT +10°C, Initial weight 3500 lb, Climb to FL140, OAT -5°C. What are the climb time, fuel, NAM?", "options": ["22 min, 6.5 US.gal, 46 NAM", "24 min, 7.5 US.gal, 50 NAM", "2 min, 1.0 US.gal, 4 NAM", "26 min, 8.5 US.gal, 54 NAM"], "correct": 0 },
          { "question": "Refer to CAP 697 MRJT1, fig 4.5.1. Given: Brake release mass 57500 kg, Temperature ISA - 10°C, Headwind component 16 kt, Initial FL280. Find: still air distance (NAM) and ground distance for the climb.", "options": ["67 NAM / 71 NM", "59 NAM / 62 NM", "62 NAM / 59 NM", "71 NAM / 67 NM"], "correct": 2 },
          { "question": "Refer to CAP 697 SEP1, Fig 2.2.3. Given: FL75, OAT +10°C, Lean mixture, 2300 rpm. Find the fuel flow in gallons per hour (GPH) and TAS.", "options": ["11.6 GPH 160 kt", "68.5 GPH 160 kt", "71.1 GPH 143 kt", "11.6 GPH 143 kt"], "correct": 0 },
          { "question": "Refer to Jeppesen Manual ED-6. Flying VFR from PEITING (4748N 01055.5E) to IMMENSTADT (4733.5N 01013.0E), determine the magnetic course.", "options": ["077", "243", "257", "063"], "correct": 1 },
          { "question": "Refer to Jeppesen Manual ED-6. Give the frequency of the GRENCHEN VOR at N4711 E00725.", "options": ["108.65 MHz", "326 kHz", "channel 23", "120.1 MHz"], "correct": 0 }
        ]
      }
    ]
  }
};

// Attach to window for browser usage
if (typeof window !== "undefined") {
  window.testData = testData;
}

// Export for use in modules (Node/CommonJS)
if (typeof module !== "undefined" && module.exports) {
  module.exports = testData;
}
