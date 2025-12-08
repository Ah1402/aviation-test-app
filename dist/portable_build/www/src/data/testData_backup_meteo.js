// Aviation Test Data - COMPREHENSIVE Question Database  
// Extracted from multiple aviation test sources including:
// - Aircraft General Knowledge, Air Law, AON Aviation, Instrumentation
// - Performance, General Navigation, Operational Procedures, Human Performance
// - Meteorology, Mass & Balance
// Total Questions: 450+ across 12 categories
// Updated: November 3, 2025

const testData = {
  "instrumentation": {
    "name": "Instrumentation",
    "icon": "fas fa-gauge",
    "tests": [
      {
        "name": "Instrumentation Tests - Complete Set",
        "timeLimit": 120,
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
            "explanation": "EGT (Exhaust Gas Temperature) is measured using thermocouples that generate EMF proportional to temperature."
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
            "explanation": "Both needle and ball left indicates a left turn with excessive bank angle."
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
            "explanation": "Needle left shows left turn, ball right shows insufficient bank for the turn rate."
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
            "explanation": "Bank angle ≈ TAS/10 + 7. For 120 kt: 120/10 + 7 = 19°"
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
            "explanation": "Fail-active systems are also called fail-operational, continuing to function after a failure."
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
            "explanation": "Density altitude is the ISA altitude where the current air density would be found."
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
            "explanation": "Radio altimeters operate in the SHF band for accurate height measurement."
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
            "explanation": "Synchronization prevents sudden attitude changes when disconnecting autopilot."
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
            "explanation": "Typical radio altimeter range is up to 2450-2500 ft with minimum indication around 50 ft."
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
            "explanation": "Radio altimeters are aircraft-based systems measuring height above ground."
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
        "name": "Aircraft General Knowledge - Complete Set",
        "timeLimit": 120,
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
            "explanation": "An artificial feel unit is connected in series with primary controls to provide proper feedback to the pilot."
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
            "explanation": "The impulse coupling retards the spark timing during engine start to ensure proper ignition at low RPM."
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
            "explanation": "Modern airliners use synthetic hydraulic fluid for better performance and temperature resistance."
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
            "explanation": "A magneto is turned off by grounding the primary circuit, which prevents voltage buildup."
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
            "explanation": "Modern airliners use pressure refueling where fuel is pumped in by the fuel truck."
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
            "explanation": "Firewire detection systems use sensors with positive coefficient of capacitance and negative coefficient of resistance."
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
            "explanation": "In a bootstrap system, air first passes through the primary heat exchanger, then the compressor, and finally the secondary heat exchanger."
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
            "explanation": "Booster pumps are centrifugal type operating at low pressure to supply fuel to the high-pressure engine pumps."
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
            "explanation": "Baffle check valves prevent fuel from moving to the wingtips during maneuvers, ensuring continuous fuel supply to the pumps."
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
            "explanation": "Foam extinguishers are suitable for propane fires as they can suppress the fire and cool the area."
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
            "explanation": "Twin jet aircraft use pressure refuelling for faster and more efficient fuel loading."
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
            "explanation": "The VTO unit automatically closes the fuelling valve when the tank reaches its specified fuel level."
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
            "explanation": "EGT (Exhaust Gas Temperature) is measured at the HP turbine outlet to monitor engine performance and prevent overheating."
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
            "explanation": "Ion detectors are specifically designed to detect smoke particles in the air."
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
            "explanation": "Load shedding is the process of reducing overall electrical loads on the system during abnormal conditions."
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
            "explanation": "Engine Pressure Ratio (EPR) is the ratio of exhaust pressure to compressor inlet pressure."
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
            "explanation": "The feeder box ensures a constant supply of fuel to the pumps, preventing cavitation."
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
        "name": "Air Law - Complete Set",
        "timeLimit": 120,
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
            "explanation": "Aircraft must be instructed to go around if no landing clearance is received by 2 NM from touchdown."
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
            "explanation": "Class E airspace has a 250 knot speed limit below FL100 for both IFR and VFR flights."
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
            "explanation": "During IFR flight in VMC with radio failure, continue in VMC and land as soon as practical."
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
            "explanation": "The pilot-in-command (Captain) is always responsible for terrain clearance regardless of ATC clearances."
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
            "explanation": "This describes Class D airspace characteristics - controlled airspace with specific separation services."
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
            "explanation": "DER stands for Departure End of Runway, used in obstacle clearance calculations."
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
            "explanation": "Flight plans for controlled flights must be filed at least 60 minutes before departure."
          },
          {
            "question": "In an instrument approach procedure, the segment where the aircraft is lined up with the runway centre line and when the decent is commenced is called:",
            "options": [
              "intermediate approach segment",
              "initial approach segment",
              "arrival segment",
              "final approach segment"
            ],
            "correct": 3,
            "explanation": "The final approach segment is where the aircraft aligns with runway centerline and begins descent."
          },
          {
            "question": "When doing a procedure turn (45°/180°) going outbound turned 45° off track, the time taken from the beginning of the turn for Cat A and Cat B aircraft is:",
            "options": [
              "1 minute 30 seconds",
              "1 minute",
              "1 minute 15 seconds",
              "2 minutes"
            ],
            "correct": 1,
            "explanation": "Standard procedure turn timing is 1 minute outbound for Category A and B aircraft."
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
            "explanation": "The pilot-in-command has ultimate responsibility for the aircraft during all phases of flight."
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
            "explanation": "On a normal PAPI glidepath, pilots should see 2 red and 2 white lights."
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
            "explanation": "The aircraft commander (pilot-in-command) has final authority over aircraft operations."
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
        "name": "AON Aviation - Complete Set",
        "timeLimit": 120,
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
            "explanation": "Excessive current causes overheating due to I²R losses, which can damage circuits and cause fires."
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
            "explanation": "The ignition switch controls the primary circuit of the magneto to turn ignition on/off."
          },
          {
            "question": "Which of the following are all aerodynamic balances?",
            "options": [
              "Inset hinge, mass balance and spring tab",
              "Horn balance, balance tab and internal balance",
              "Horn balance, inset hinge and mass balance",
              "Internal balance, anti-balance tab and servo tab"
            ],
            "correct": 1,
            "explanation": "Horn balance, balance tab, and internal balance are all aerodynamic methods to reduce control forces."
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
            "explanation": "Blade angle is measured between the blade chord line and the plane of propeller rotation."
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
            "explanation": "In modern aircraft, the pressurized skin acts as a primary structural element carrying flight and pressure loads."
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
            "explanation": "TEM stands for Threat and Error Management, a key concept in aviation human factors and safety."
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
            "explanation": "A great circle represents the shortest distance between two points on a sphere."
          },
          {
            "question": "Leaving ground effect at a given angle of attack the:",
            "options": [
              "Induced drag decreases",
              "effective angle of attack decreases",
              "lift will remain constant",
              "nose tends to pitch down"
            ],
            "correct": 1,
            "explanation": "Leaving ground effect reduces the effective angle of attack, requiring pilot compensation."
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
            "explanation": "Turbochargers use exhaust gas energy through a wastegate to drive the compressor impeller."
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
            "explanation": "Aircraft weight always acts vertically downward through the center of gravity."
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
            "explanation": "Blocked static port during climb causes ASI to under-read as static pressure remains high."
          },
          {
            "question": "Flutter may be caused by a:",
            "options": [
              "low airspeed aerodynamic stall",
              "distortion by bending and torsion of the structure causing increasing vibration in the resonance frequency",
              "high airspeed aerodynamic wing stall",
              "roll control reversal"
            ],
            "correct": 1,
            "explanation": "Flutter occurs when aerodynamic forces cause structural bending and torsion at resonant frequencies."
          },
          {
            "question": "With regards to the Maximum Zero Fuel Weight (MZFW):",
            "options": [
              "It is lower than the Maximum Take-Off Weight by the weight of a payload",
              "It is the maximum weight that an aircraft can be loaded to without useable fuel",
              "It is important as exceeding the MZFW may mean that there is insufficient lift to get the aircraft airborne",
              "Is more relevant to aircraft with fuselage fuel tanks"
            ],
            "correct": 1,
            "explanation": "MZFW is the maximum structural weight limit before adding fuel, protecting wing root from excessive bending loads."
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
            "explanation": "At constant CAS during climb, both Mach number and TAS increase due to decreasing air density."
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
            "explanation": "Trim tabs are designed to reduce control stick forces to zero for hands-off flight."
          },
          {
            "question": "The result of Empty Field Myopia is:",
            "options": [
              "astigmatism",
              "a build-up of pressure within the eye",
              "focusing is limited to between 1 and 2 meters",
              "a tendency to suffer from cataracts in the long term"
            ],
            "correct": 2,
            "explanation": "Empty field myopia causes the eye to focus at 1-2 meters when no visual references are available."
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
            "question": "To find true course when magnetic variation is 10°E:",
            "options": [
              "Add 10° to magnetic course",
              "Subtract 10° from magnetic course",
              "Magnetic course equals true course",
              "Add 5° to magnetic course"
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
            "explanation": "Time = Distance ÷ Speed = 40 NM ÷ 120 kts = 0.33 hours = 20 minutes."
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
            "question": "Given: Track 185°(T), Variation 9° east, Heading 182°(M). Which is the lowest suitable ICAO IFR cruising level?",
            "options": [
              "FL280",
              "FL310",
              "FL290",
              "FL270"
            ],
            "correct": 3,
            "explanation": "Magnetic Track = 185 - 9 = 176°. Westerly track (180-359°) uses even flight levels. Lowest suitable is FL270."
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
            "explanation": "Ground Distance = Air Distance - (Wind Component × Time) = 197 - (40 × 33/60) = 197 - 22 = 175 NGM."
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
              "140°",
              "70°",
              "110°",
              "220°"
            ],
            "correct": 0,
            "explanation": "Tail navigation light covers 140° (70° left and 70° right of tail centerline)."
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
            "explanation": "Climb Gradient ≈ (Thrust - Drag) / Weight. Assuming Thrust-Drag is constant, Gradient is inversely proportional to Weight. New Weight ≈ Old Weight * (Old Gradient / New Gradient) = 110000 * (2.6 / 2.4) ≈ 119167 kg."
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
            "explanation": "LDR must be ≤ 60% of LDA. Therefore LDA / 1.67 gives the LDR. (LDA * 0.6 = LDR, so LDA = LDR / 0.6 = LDR * 1.67)."
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
            "explanation": "Fuel flow for endurance (holding) is proportional to weight. FF2 ≈ FF1 * (W2 / W1) = 4300 * (115000 / 130000) ≈ 3804 kg/hr."
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
            "explanation": "Height gained = 0.10 * 10000 m = 1000 m. Total height = 1000 m + 50 ft (≈15 m) = 1015 m. Clearance = 1015 - 900 = 115 m."
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
            "question": "An aircraft may use either 5° or 15° flap setting for take-off. The effect of selecting the 5° setting as compared to the 15° setting is:",
            "options": [
              "take-off distance and take-off climb gradient will both increase",
              "take-off distance and take-off climb gradient will both decrease",
              "take-off distance will increase and take-off climb gradient will decrease",
              "take-off distance will decrease and take-off climb gradient will increase"
            ],
            "correct": 0,
            "explanation": "Lower flap (5°) requires longer takeoff distance but provides better climb gradient due to reduced drag."
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
              "15° angle of bank up to 400 ft",
              "15° angle of bank below 1000 ft",
              "20° angle of bank up to 400 ft",
              "25° angle of bank up to 400 ft"
            ],
            "correct": 0,
            "explanation": "Regulations limit bank angle to 15° below 400 ft for obstacle clearance calculations (no turns below 50ft)."
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
              "temperature varies by more than 10°C from ISA",
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
            "explanation": "Landing Distance Required must be ≤ 60% of Landing Distance Available (LDR = LDA * 0.60)."
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
            "explanation": "Climbing at constant TAS: temperature decreases → LSS decreases. Mach = TAS / LSS → Mach increases."
          },
          {
            "question": "At MSL, in ISA conditions Climb gradient = 6%. What would the climb gradient be if: Pressure altitude 1000 ft, Temperature 17°C, Engine anti-ice on, Wing anti-ice on (- 0.2% engine anti-ice, - 0.1% wing anti-ice, 0.2% per 1000 ft pressure altitude, 0.1 % per 1°C ISA deviation)",
            "options": [
              "5.1%",
              "6.3%",
              "3.8%",
              "5.5%"
            ],
            "correct": 0,
            "explanation": "ISA @ 1000ft = 13°C. Dev = +4°C. Changes: -0.2(Eng AI) -0.1(Wing AI) -0.2(Alt) -0.4(Temp) = -0.9%. Result: 6 - 0.9 = 5.1%."
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
  },
  "general-navigation": {
    "name": "General Navigation",
    "icon": "fas fa-compass",
    "tests": [
      {
        "name": "Test 1",
        "timeLimit": 60,
        "questions": [
          {
            "question": "The value of variation:",
            "options": [
              "is zero at the magnetic equator",
              "cannot exceed 180°",
              "has a maximum value of 45° E or 45° W",
              "cannot exceed 90°"
            ],
            "correct": 1,
            "explanation": "Magnetic variation can theoretically approach 180° at magnetic poles, though practical navigation limits apply."
          },
          {
            "question": "By what amount must you change your rate of descent given a 10 knot decrease in headwind on a 3° glide slope?",
            "options": [
              "50 feet per minute increase",
              "30 feet per minute increase",
              "50 feet per minute decrease",
              "30 feet per minute decrease"
            ],
            "correct": 0,
            "explanation": "Decrease in headwind increases groundspeed. To maintain the glide path, rate of descent must increase. RoD ≈ GS × 5. 10 kt GS increase ≈ 50 ft/min RoD increase."
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
            "explanation": "The 23.5° tilt of Earth's axis (ecliptic inclination) causes seasonal variation in day/night duration."
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
            "explanation": "Actual GS X-Y = 45 NM / 20 min = 135 kt. Time Y-Z = 52 NM / 135 kt ≈ 23 min. Revised ETA Z = 1455 + 23 min = 1518. Using proportional method: revised ETA Z = 1506."
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
            "explanation": "Flying towards a prominent line feature provides the quickest and most reliable method to establish position."
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
            "explanation": "Actual GS A-B = 30 NM / 17 min ≈ 106 kt. Time B-C = 20 NM / 106 kt ≈ 11 min. Revised ETA C = 1027 + 11 min = 1038."
          },
          {
            "question": "5 hours 20 minutes and 20 seconds time difference is equivalent to which change of longitude?",
            "options": [
              "81°30'",
              "78°15'",
              "79°10'",
              "80°05'"
            ],
            "correct": 3,
            "explanation": "5h = 5 × 15° = 75°. 20m = 20/4 = 5°. 20s = 20/4 = 5'. Total = 75° + 5° + 5' = 80°05'."
          },
          {
            "question": "On a direct Mercator chart, great circles are shown as:",
            "options": [
              "curves concave to the nearer pole",
              "straight lines",
              "rhumb lines",
              "curves concave to the nearer pole"
            ],
            "correct": 0,
            "explanation": "On Mercator projections, great circles appear as curves bending toward the nearest pole."
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
            "explanation": "Magnetic variation is the angular difference between Magnetic North and True North at any location."
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
            "explanation": "At the magnetic equator, magnetic dip (inclination) is zero - the magnetic field is horizontal."
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
            "explanation": "Pressure difference from ISA = 1013 - 988 = 25 hPa. Altitude correction ≈ 25 × 30 ft/hPa = 750 ft. Pressure Alt ≈ 1000 + 750 = 1750 ft."
          },
          {
            "question": "An aircraft starts at position 0410S 17822W and heads true north for 2950 NM, then turns 90 degrees right, and maintains a rhumb line track for 314 kilometres. What is its final position?",
            "options": [
              "5500N 17422W",
              "4500N 17422W",
              "5500N 17738E",
              "4500N 17738E"
            ],
            "correct": 1,
            "explanation": "2950 NM North = 49.17° ≈ 49°10'. New Lat = 45°00'N. Turn right (East) for 314 km ≈ 170 NM. ChLong = 170 / cos(45°) ≈ 240' = 4°00'. New Long = 178°22'W - 4°00' = 174°22'W."
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
            "explanation": "Earth's magnetic field is weakest at the magnetic equator, midway between the magnetic poles."
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
            "explanation": "Actual GS = 74 NM / 40.1 min ≈ 110.7 kt. Remaining dist = 176 NM. Time remaining ≈ 1 hr 35 min. Revised ETA = 0940 + 1:35 = 1115."
          },
          {
            "question": "You are heading 080°(T) when you get a range and bearing fix from your AWR (Airborne Weather Radar) on a headland at 185 NM 30° left of the nose. What true bearing do you plot on the chart?",
            "options": [
              "050 from the headland, using the headland's meridian",
              "050 from the headland, using the aircraft's meridian",
              "230 from the headland, using the headland's meridian",
              "230 from the headland, using the aircraft's meridian"
            ],
            "correct": 3,
            "explanation": "Bearing TO headland = 080 - 30 = 050°(T). Bearing FROM headland = 050 + 180 = 230°(T). Plot using aircraft meridian."
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
            "explanation": "Grivation combines magnetic variation and grid convergence for navigation on grid charts."
          },
          {
            "question": "On a transverse Mercator chart, the scale factor is 0.9996 on the central meridian. At a point 3° away from the central meridian, the scale is exactly 1. What is the scale at a point 4°30' away from the central meridian?",
            "options": [
              "1 / 0.9996",
              "1 / 1.0000",
              "1 / 1.0004",
              "1 / 1.0002"
            ],
            "correct": 2,
            "explanation": "Scale expands away from the central meridian on a Transverse Mercator. At 4°30', scale factor is approximately 1.0004."
          },
          {
            "question": "Isogrivs are lines that connect positions that have:",
            "options": [
              "the same grivation",
              "the same variation",
              "0°(M)agnetic dip",
              "the same horizontal magnetic field strength"
            ],
            "correct": 0,
            "explanation": "Isogrivs connect points of equal grivation (combination of variation and grid convergence)."
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
            "explanation": "Earth's magnetic field acts as if there's a blue (south-seeking) magnetic pole in Northern Canada."
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
            "explanation": "Convergence Factor (n) = sin(mean latitude) = sin((63+41)/2) = sin(52°) ≈ 0.788."
          }
        ]
      },
      {
        "name": "Test 2",
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
            "explanation": "On a Mercator chart, scale expands with the secant of latitude as you move away from the equator."
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
            "explanation": "Time = Distance / Speed = 72 NM / 540 kt = 0.1333 hr × 60 = 8 min."
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
            "explanation": "Height = (3° × 25 × 6000) / 60 = 7500 ft. Add threshold crossing height: 7500 + 50 = 7550 ft."
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
            "explanation": "Earth Circumference ≈ 40000 km. 40000 km / 360° ≈ 111 km/°."
          },
          {
            "question": "What is the highest latitude listed below at which the sun will rise above the horizon and set every day?",
            "options": [
              "68°N",
              "66°N",
              "62°N",
              "72°N"
            ],
            "correct": 1,
            "explanation": "The Arctic/Antarctic circles are at approx. 66.5°. Beyond this latitude, there are periods of 24hr daylight or darkness."
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
            "explanation": "On a Lambert's chart, scale is constant along any parallel of latitude."
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
            "explanation": "A rhumb line is a line of constant bearing that crosses all meridians at the same angle."
          },
          {
            "question": "On a particular take-off, you can accept up to 10 knots tailwind component. The runway QDM is 047°, the variation is 17°E, and the forecast wind is 100°(T) / 30 knots. What is the maximum tailwind component?",
            "options": [
              "18 knots",
              "4 knots",
              "8 knots",
              "11 knots"
            ],
            "correct": 3,
            "explanation": "Runway QDM 047°(M) = 030°(T) with 17°W variation. Wind angle = 100-30 = 70°. Tailwind = 30×cos(70°) ≈ 10.3 kts."
          },
          {
            "question": "An aircraft at position 60°N 005°W tracks 090°(T) for 315 km. On completion of the flight the longitude will be:",
            "options": [
              "010°40'W",
              "000°15'E",
              "000°40'E",
              "002°10'W"
            ],
            "correct": 2,
            "explanation": "315 km ≈ 170 NM. ChLong = Dep / cos(60) = 170 / 0.5 = 340' = 5°40'. New Long = 005°W + 5°40'E = 000°40'E."
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
            "explanation": "Altitude to lose = 25000 ft. Time = 65 NM / 240 kt ≈ 16.25 min. RoD = 25000 / 16.25 ≈ 1538 ft/min."
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
            "explanation": "150 kt = 15190 ft/min forward. RoD = 0.05 × 15190 ≈ 759.5 ft/min."
          },
          {
            "question": "An aircraft at position 2700N 17000W travels 3000 km on a track of 180°(T), then 3000 km on a track of 090°(T), then 3000 km on a track of 000°(T), then 3000 km on a track of 270°(T). What is its final position?",
            "options": [
              "2700N 17318W",
              "0000N/S 17000W",
              "2700N 17000W",
              "2700N 14300W"
            ],
            "correct": 0,
            "explanation": "Due to changing cos(Lat), the East and West legs cover different degrees of longitude. Aircraft ends up West of start."
          },
          {
            "question": "Your pressure altitude is FL55, the QNH is 998, and the SAT is +30°(C). What is the density altitude?",
            "options": [
              "6980 feet",
              "7750 feet",
              "8620 feet",
              "10020 feet"
            ],
            "correct": 2,
            "explanation": "Pressure Alt = 5050 ft. ISA Dev = +25.1°C. Density Alt = 5050 + (120 × 25.1) ≈ 8062 ft."
          },
          {
            "question": "Reference Jeppesen E(LO)1, position 5211N 00706W, which of the following denotes all the symbols?",
            "options": [
              "Military airport, ILS, NDB",
              "Civil airport, VOR, ILS",
              "Military airport, VOR, ILS",
              "Civil airport, ILS, NDB"
            ],
            "correct": 3,
            "explanation": "Chart symbols indicate civil airport with ILS and NDB facilities."
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
            "explanation": "Altitude to lose = 24000 ft. Time = 120 NM / 288 kt = 25 min. RoD = 24000 ft / 25 min = 960 ft/min."
          },
          {
            "question": "You are heading 345°(M), the variation is 20°E, and you take a radar bearing of 30° left of the nose from an island. What bearing do you plot from the island?",
            "options": [
              "160°(T)",
              "155°(T)",
              "140°(T)",
              "180°(T)"
            ],
            "correct": 1,
            "explanation": "Mag Brg TO = 345 - 30 = 315°(M). True Brg TO = 315 + 20 = 335°(T). True Brg FROM = 335 - 180 = 155°(T)."
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
            "explanation": "The agonic line connects all points where magnetic variation is zero."
          },
          {
            "question": "The pressure alt is 29000 feet and the SAT is -55°(C). What is the density altitude?",
            "options": [
              "27500 feet",
              "26000 feet",
              "30000 feet",
              "31000 feet"
            ],
            "correct": 0,
            "explanation": "ISA Temp at 29000ft = -43°C. ISA Dev = -12°C. Density Alt = 29000 + (120 × -12) = 27560 ft."
          },
          {
            "question": "On the Jeppesen E(LO)1 chart, what are the symbols at Sligo (5354.8N 00849.1W)?",
            "options": [
              "VOR, NDB, DME, compulsory reporting point",
              "Civil airport, NDB, DME, compulsory reporting point",
              "Civil airport, VOR, DME, non-compulsory reporting point",
              "VOR, NDB, DME, non-compulsory reporting point"
            ],
            "correct": 1,
            "explanation": "Sligo chart symbols show civil airport with NDB, DME, and compulsory reporting point."
          }
        ]
      },
      {
        "name": "Test 3",
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
            "explanation": "360 degrees × 60 NM/degree = 21600 NM."
          },
          {
            "question": "Position A is at 70S 030W, position B is 70S 060E. What is the great circle track of B from A, measured at A?",
            "options": [
              "132°(T)",
              "048°(T)",
              "090°(T)",
              "228°(T)"
            ],
            "correct": 0,
            "explanation": "Both points on same latitude in Southern Hemisphere. Great circle track initially south of rhumb line (090°T)."
          },
          {
            "question": "An aircraft is at 10°N and is flying North at 444 km/hour. After 3 hours the latitude is:",
            "options": [
              "10°S",
              "02°S",
              "22°N",
              "00°N/S"
            ],
            "correct": 2,
            "explanation": "444 km/hr ≈ 240 kt. Distance = 720 NM. Change = 12°. New Lat = 10°N + 12° = 22°N."
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
            "explanation": "Hammering can affect aircraft magnetism, requiring compass swing to check deviation."
          },
          {
            "question": "Track = 090°(T), TAS = 460 knots, W/V = 360°(T) / 100, Variation = 12°E, Deviation = -2. What is the compass heading and the ground speed?",
            "options": [
              "079° 470 knots",
              "067° 450 knots",
              "068° 460 knots",
              "070° 455 knots"
            ],
            "correct": 1,
            "explanation": "WCA ≈ -12°. True Hdg = 078°(T). Mag Hdg = 066°(M). Comp Hdg = 068°(C). GS ≈ 450 kt."
          },
          {
            "question": "An aircraft departs a point 0400N 17000W and flies 240 NM South, followed by 240 NM East, then 240 NM North, then 240 NM West. What is its final position?",
            "options": [
              "0400N 17000W",
              "0600S 17000W",
              "0400N 170°35.9'W",
              "0400N 169°01.8'W"
            ],
            "correct": 2,
            "explanation": "Due to different cos(Lat) values, East/West legs cover different longitude changes. Final position is West of start."
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
            "explanation": "Volume = 380 × 3.785 L ≈ 1438.3 L. Mass = 1438.3 × 0.78 ≈ 1121.9 kg."
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
            "explanation": "The 23.5° tilt of Earth's axis causes seasonal variations in climate."
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
              "0°",
              "90°",
              "180°",
              "64°"
            ],
            "correct": 1,
            "explanation": "At the magnetic poles, the dip angle is 90° (vertical)."
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
            "explanation": "Remaining distance = 285 NM. Time remaining = 50 min. Required GS = 285 / 0.833 ≈ 342 kt."
          },
          {
            "question": "What is the maximum possible value of Dip Angle at either Pole?",
            "options": [
              "66°",
              "180°",
              "90°",
              "45°"
            ],
            "correct": 2,
            "explanation": "Maximum dip angle at the poles is 90° (vertical magnetic field)."
          },
          {
            "question": "Civil Twilight occurs between:",
            "options": [
              "sunset and 6° below the horizon",
              "6° and 12° below the horizon",
              "12° and 18° below the horizon",
              "sunrise and sunset"
            ],
            "correct": 0,
            "explanation": "Civil twilight is the period from sunset until the sun is 6° below the horizon."
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
            "explanation": "Isogonal lines (lines of equal magnetic variation) converge at all four poles."
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
            "explanation": "Magnetic poles move over time, causing variation to increase or decrease depending on location."
          },
          {
            "question": "Which of the following differences in latitude will give the biggest difference in the initial great circle track and the mean great circle track between two points separated by 10° change of longitude?",
            "options": [
              "60N and 60S",
              "60N and 60N",
              "30S and 30N",
              "30S and 25S"
            ],
            "correct": 1,
            "explanation": "Conversion angle is greatest at higher latitudes. Same high latitude (60N and 60N) gives maximum difference."
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
            "explanation": "Earth's flattening factor f = (a-b)/a ≈ 1/298.257 ≈ 1/300."
          },
          {
            "question": "On a particular direct Mercator wall chart, the full length of the parallel of latitude at 53N is 133 cm long. What is the scale of the chart at 30S?",
            "options": [
              "1: 30000000",
              "1: 18000000",
              "1: 21000000",
              "1: 26000000"
            ],
            "correct": 3,
            "explanation": "Scale at 30S = Scale at Eq × sec(30) ≈ 1 / 260,600,000."
          },
          {
            "question": "What is the highest latitude on the Earth at which the Sun can be vertically overhead?",
            "options": [
              "23.5°",
              "66.5°",
              "45°",
              "90°"
            ],
            "correct": 0,
            "explanation": "The sun can be directly overhead only within the Tropics (±23.5°)."
          },
          {
            "question": "An aircraft is at 5530N 03613W, where the variation is 15W. It is tuned to a VOR located at 5330N 03613W, where the variation is 12W. What VOR radial is the aircraft on?",
            "options": [
              "348",
              "012",
              "165",
              "015"
            ],
            "correct": 1,
            "explanation": "Aircraft is directly North of VOR. True bearing = 000°(T). Radial = 000 + 12W = 012°(M)."
          }
        ]
      },
      {
        "name": "Test 4",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Please refer to Appendix A. What is the chart symbol for a VOR/DME?",
            "options": [
              "6",
              "8",
              "4",
              "7"
            ],
            "correct": 3,
            "explanation": "VOR/DME is represented by symbol 7 in standard aeronautical chart legends."
          },
          {
            "question": "At what latitude does the maximum difference between geodetic and geocentric latitude occur?",
            "options": [
              "0°",
              "45°",
              "60°",
              "90°"
            ],
            "correct": 1,
            "explanation": "Maximum difference between geodetic and geocentric latitude occurs at 45°."
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
            "explanation": "Polar Stereographic projection is used for polar navigation as it maintains accuracy at high latitudes."
          },
          {
            "question": "On a chart, meridians at 45N are shown every 10 degrees apart. This is shown on the chart by a distance of 14 cm. What is the scale?",
            "options": [
              "1: 2,000,000",
              "1: 4,000,000",
              "1: 5,000,000",
              "1: 5,600,000"
            ],
            "correct": 3,
            "explanation": "Earth distance = 424 NM ≈ 785648 m. Chart = 0.14 m. Scale = 0.14 / 785648 ≈ 1 / 5,611,771."
          },
          {
            "question": "Given: Aircraft height = 2500 feet, ILS GP angle = 3°, at what approximate distance from the threshold can you expect to intercept the glide-path?",
            "options": [
              "8.0 NM",
              "14.5 NM",
              "13.1 NM",
              "7.0 NM"
            ],
            "correct": 0,
            "explanation": "Using 1 in 60 rule: Distance = Height / (Angle × 100) = 2500 / 300 ≈ 8.3 NM."
          },
          {
            "question": "An aircraft at position 0000N/S 16327W flies a track of 225°(T) for 70 NM. What is its new position?",
            "options": [
              "0049N 16238W",
              "0049S 16238W",
              "0049N 16416W",
              "0049S 16416W"
            ],
            "correct": 3,
            "explanation": "Track 225° = SW. Change Lat ≈ -49.5'. Departure ≈ -49.5 NM. New position = 00°49.5'S 164°16.5'W."
          },
          {
            "question": "Please refer to Appendix A. What is the chart symbol for an NDB?",
            "options": [
              "1",
              "4",
              "2",
              "13"
            ],
            "correct": 2,
            "explanation": "NDB is represented by symbol 2 in standard aeronautical chart legends."
          },
          {
            "question": "An aircraft is flying around the Earth eastwards along the 60N parallel of latitude at a ground speed of 360 knots. At what ground speed would another aircraft have to fly eastwards along the Equator to fly once round the Earth in the same journey time?",
            "options": [
              "600 knots",
              "240 knots",
              "720 knots",
              "120 knots"
            ],
            "correct": 2,
            "explanation": "Speed at Eq = Speed at 60N / cos(60) = 360 / 0.5 = 720 kt."
          },
          {
            "question": "Your position is 5833N 17400W. You fly exactly 6 NM westwards. What is your new position?",
            "options": [
              "5833N 17411.5W",
              "5833N 17355W",
              "5833N 17340W",
              "5833N 17348.5W"
            ],
            "correct": 0,
            "explanation": "ChLong = Dep / cos(Lat) = 6 / cos(58°33') ≈ 11.5'. New Long = 174°00'W + 11.5' = 174°11.5'W."
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
            "explanation": "Daylight hours change most rapidly at the equinoxes (spring and autumn)."
          },
          {
            "question": "An island is observed to be 15° to the left. The aircraft heading is 120°(M), variation 17°(W). The bearing (°T) from the aircraft to the island is:",
            "options": [
              "268",
              "302",
              "088",
              "122"
            ],
            "correct": 2,
            "explanation": "Mag Bearing TO = 120 - 15 = 105°(M). True Bearing TO = 105 - 17W = 088°(T)."
          },
          {
            "question": "A Lambert conformal chart has standard parallels at 15S and 45S. What is the correct longitude scale factor compared to the scale at 30S?",
            "options": [
              "Scale at 10S is smaller",
              "Scale at 50S is larger",
              "Scale at 10S is larger",
              "Scale at 50S is smaller"
            ],
            "correct": 0,
            "explanation": "Scale contracts between standard parallels. At 10S (outside), scale is smaller than at 30S."
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
            "explanation": "1 kt ≈ 0.5144 m/s. 80 m/s / 0.5144 ≈ 155.5 kt."
          },
          {
            "question": "The aircraft position is at 5330N 00800W. The VORs are tuned to Shannon (SHA, 5243N 00853W) and Connaught (CON, 5355N 00849W). Which radials will be indicated (SHA / CON)?",
            "options": [
              "023 / 130",
              "221 / 318",
              "042 / 138",
              "213 / 310"
            ],
            "correct": 2,
            "explanation": "Bearing FROM SHA to aircraft ≈ 042°. Bearing FROM CON to aircraft ≈ 138°."
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
            "explanation": "Variation East, Magnetic Least. True North is West of Magnetic North."
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
            "explanation": "On a Polar Stereographic chart, convergence = change longitude, so convergence factor = 1."
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
            "explanation": "With constant CAS while climbing, both Mach number and TAS increase."
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
            "explanation": "True(130) + Var W(2) = Mag(132). Mag(132) + Dev W(-1) = Comp(133)."
          },
          {
            "question": "Please refer to Appendix A. What is the chart symbol for a lighted obstacle?",
            "options": [
              "6",
              "8",
              "9",
              "12"
            ],
            "correct": 2,
            "explanation": "Lighted obstacle is represented by symbol 9 in standard aeronautical chart legends."
          },
          {
            "question": "Please refer to Appendix A. What is the chart symbol for a lightship?",
            "options": [
              "6",
              "8",
              "9",
              "12"
            ],
            "correct": 1,
            "explanation": "Lightship is represented by symbol 8 in standard aeronautical chart legends."
          }
        ]
      },
      {
        "name": "Test 5",
        "timeLimit": 60,
        "questions": [
          {
            "question": "Given the following: Magnetic heading: 060° Magnetic variation: 8°W Drift angle: 4° right What is the true track?",
            "options": [
              "064°",
              "056°",
              "072°",
              "048°"
            ],
            "correct": 1,
            "explanation": "Mag Hdg = 060°. True Hdg = 060 - 8W = 052°(T). True Track = True Hdg + Drift R = 052 + 4 = 056°(T)."
          },
          {
            "question": "On a Lambert chart, the convergence factor is .78585. What is the parallel of tangency?",
            "options": [
              "51°02'",
              "51°36'",
              "51°15'",
              "51°48'"
            ],
            "correct": 3,
            "explanation": "For tangent Lambert, n = sin(Lat). Lat = arcsin(0.78585) ≈ 51.79° ≈ 51°48'."
          },
          {
            "question": "The angle between the true great circle track and the true rhumb line track joining the following points: A (60S 165W) and B (60S 177E) at the place of departure A, is:",
            "options": [
              "9°",
              "15.6°",
              "5.2°",
              "7.8°"
            ],
            "correct": 3,
            "explanation": "Conversion Angle = 0.5 × ChLong × sin(Mean Lat) ≈ 0.5 × 18 × sin(60) ≈ 7.8°."
          },
          {
            "question": "On 27 Feb at 52°S 040°E Sunrise is at 0243UTC. On the same day at 52°S 035°W the time of Sunrise is:",
            "options": [
              "0743 UTC",
              "0243 UTC",
              "2143 UTC",
              "0543 UTC"
            ],
            "correct": 0,
            "explanation": "Longitude difference = 75°. Time difference = 5 hours. Sunrise at 035W = 0243 + 5 hrs = 0743 UTC."
          },
          {
            "question": "An aircraft is cruising at FL350, Temp -50°C and is told to descend to FL80, Temp -10°C. If the IAS for the descent was 188 kt, what would be the appropriate TAS?",
            "options": [
              "260 kt",
              "188 kt",
              "335 kt",
              "224 kt"
            ],
            "correct": 0,
            "explanation": "Average TAS for 188 IAS at mid-descent altitude (approx FL215) is approximately 260 kt."
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
            "explanation": "Compass sensitivity is proportional to the horizontal component of Earth's magnetic field."
          },
          {
            "question": "Given: True track 180° Drift 8°R Compass Heading 195° Deviation -2° Calculate the variation.",
            "options": [
              "21°W",
              "25°W",
              "5°W",
              "9°W"
            ],
            "correct": 0,
            "explanation": "True Hdg = 180 - 8 = 172°(T). Mag Hdg = 195 - (-2) = 193°(M). Variation = 172 - 193 = -21 = 21°W."
          },
          {
            "question": "Given the following: True track: 192° Magnetic variation: 7°E Drift angle: 5° left Calculate the magnetic heading required to maintain the planned track.",
            "options": [
              "179°",
              "190°",
              "180°",
              "204°"
            ],
            "correct": 1,
            "explanation": "True Hdg = True Track + Drift L = 192 + 5 = 197°(T). Mag Hdg = 197 - 7E = 190°(M)."
          },
          {
            "question": "On a Lambert's chart the constant of the cone is 0.80. A is at 53N 04W. You plan to fly to B. The initial Lambert's chart straight-line track is 070(T) and the rhumb line track from A to B is 080(T). What is the longitude of B?",
            "options": [
              "021E",
              "034W",
              "011E",
              "015E"
            ],
            "correct": 0,
            "explanation": "Convergence = ChLong × n. Initial Difference = 10°. ChLong = 20 / 0.80 = 25°. Long B = 004W + 25°E = 021E."
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
            "explanation": "Time required = 29000 / 1800 ≈ 16.1 min. Distance = 62.4 NM. ToD = 122.6 NM. Time to ToD ≈ 23 min. 0422 + 23 = 0445."
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
            "explanation": "Time = 1.75 min. Speed = 2.25 NM/min. Distance = 2.25 × 1.75 ≈ 3.94 NM."
          },
          {
            "question": "Given: True course 300° Drift 8°R Variation 10°W Deviation -4° Calculate the compass heading.",
            "options": [
              "322°",
              "306°",
              "278°",
              "294°"
            ],
            "correct": 1,
            "explanation": "True Hdg = 300°. Mag Hdg = 300 + 10W = 310°(M). Comp Hdg = 310 + (-4W) = 306°(C)."
          },
          {
            "question": "An aircraft is flying at FL200, the OAT is 0°C. When the actual air pressure on an airfield at MSL is placed on the subscale of the altimeter the indicated altitude is 19300 ft. What is the aircraft's True Altitude?",
            "options": [
              "17300 ft",
              "19300 ft",
              "20000 ft",
              "21300 ft"
            ],
            "correct": 3,
            "explanation": "ISA Dev = +25°C. True Alt ≈ 19300 + (25 × 4 × 19.3) = 19300 + 1930 = 21230 ft."
          },
          {
            "question": "The distance between two waypoints is 200 NM. To calculate compass heading the pilot used 2°E magnetic variation instead of 2°W. Assuming that the forecast W/V applied, what will the off track distance be at the second waypoint?",
            "options": [
              "14 NM",
              "7 NM",
              "0 NM",
              "21 NM"
            ],
            "correct": 0,
            "explanation": "Total error = 4°. Off track dist = (4 × 200) / 60 ≈ 13.3 NM."
          },
          {
            "question": "The rhumb line distance between points A (60°00'N 002°30'E) and B (60°00'N 007°30'W) is:",
            "options": [
              "300 NM",
              "450 NM",
              "600 NM",
              "150 NM"
            ],
            "correct": 0,
            "explanation": "ChLong = 10°. Distance = (10 × 60) × cos(60) = 600 × 0.5 = 300 NM."
          },
          {
            "question": "An aircraft has to climb from FL50 -10°C to FL260 -25°C. The IAS for the climb is 180 kt and the WC is +30 kt. If the ROC is 900 ft/min, how many miles will the climb take?",
            "options": [
              "96 NM",
              "106 NM",
              "83 NM",
              "120 NM"
            ],
            "correct": 1,
            "explanation": "Time = 21000 / 900 ≈ 23.3 min. Avg GS ≈ 280 kt. Distance ≈ 108 NM."
          },
          {
            "question": "Given: Position A is 60N 020W, Position B is 60N 021W, and Position C is 59N 020W, what are, respectively, the distances from A to B and from A to C?",
            "options": [
              "60 NM and 30 NM",
              "30 NM and 60 NM",
              "52 NM and 60 NM",
              "60 NM and 52 NM"
            ],
            "correct": 1,
            "explanation": "A to B: 60 × cos(60) = 30 NM. A to C: 1° latitude = 60 NM."
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
            "explanation": "Diameter = Circumference / π ≈ 40000 / 3.14159 ≈ 12732 km."
          },
          {
            "question": "Given: A Polar Stereographic chart whose grid is aligned with the zero meridian. Grid track 344°, longitude 115°00'W, calculate the true course. (Assume N hemisphere).",
            "options": [
              "099°",
              "279°",
              "049°",
              "229°"
            ],
            "correct": 3,
            "explanation": "Grid Convergence = Longitude West. True Track = 344° - 115° = 229°(T)."
          },
          {
            "question": "The distance A to B is 90 NM in a straight line. You are 60 NM from A when you fix your position 4 NM to the left of track. What correction do you need to make to arrive at B?",
            "options": [
              "4°",
              "8°",
              "12°",
              "10°"
            ],
            "correct": 2,
            "explanation": "Angle off = 4°. Correction to regain = 8°. Total correction = 4° + 8° = 12° to the right."
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
        "name": "Human Performance - Complete Set",
        "timeLimit": 120,
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
            "explanation": "Carbon monoxide from smoking has 200+ times greater affinity for hemoglobin than oxygen, reducing oxygen transport."
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
            "question": "Who is responsible for Air Safety?",
            "options": [
              "Aircrew and Groundcrew",
              "Aircrew, Groundcrew and Management",
              "Everyone involved",
              "Aircrew only"
            ],
            "correct": 2,
            "explanation": "Aviation safety is everyone's responsibility - pilots, maintenance, ATC, management, and support personnel."
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
        "name": "Meteorology - Complete Set",
        "timeLimit": 120,
        "questions": [
          {
            "question": "What is the primary cause of thunderstorm formation?",
            "options": [
              "Temperature inversion",
              "Convective lifting and instability",
              "High pressure systems",
              "Stable atmospheric conditions"
            ],
            "correct": 1,
            "explanation": "Thunderstorms form when convective lifting combines with atmospheric instability to create strong updrafts."
          },
          {
            "question": "What type of weather is associated with a cold front?",
            "options": [
              "Gradual temperature decrease, steady precipitation",
              "Sudden temperature drop, thunderstorms, heavy precipitation",
              "Temperature increase, clearing skies",
              "No significant weather changes"
            ],
            "correct": 1,
            "explanation": "Cold fronts typically bring sudden temperature drops, thunderstorms, and heavy but brief precipitation."
          },
          {
            "question": "Which cloud type is associated with severe turbulence?",
            "options": [
              "Cirrus",
              "Stratus", 
              "Cumulonimbus",
              "Altostratus"
            ],
            "correct": 2,
            "explanation": "Cumulonimbus clouds contain severe turbulence, icing, lightning, and strong up/downdrafts."
          },
          {
            "question": "At what temperature does jet fuel typically freeze?",
            "options": [
              "0°C",
              "-40°C",
              "-50°C",
              "-60°C"
            ],
            "correct": 2,
            "explanation": "Jet fuel typically freezes around -50°C, which is why fuel heating systems are used at high altitudes."
          },
          {
            "question": "What is wind shear?",
            "options": [
              "Constant wind direction change",
              "Sudden change in wind speed and/or direction over a short distance",
              "High altitude winds only",
              "Circular wind patterns"
            ],
            "correct": 1,
            "explanation": "Wind shear is a sudden change in wind speed and/or direction over a short distance, dangerous for aircraft."
          },
          {
            "question": "Which weather phenomenon is most dangerous during takeoff and landing?",
            "options": [
              "Light rain",
              "Microburst",
              "Gentle crosswinds",
              "High clouds"
            ],
            "correct": 1,
            "explanation": "Microbursts create severe downdrafts and wind shear, extremely dangerous during takeoff/landing phases."
          },
          {
            "question": "What causes icing on aircraft?",
            "options": [
              "Flying through supercooled water droplets",
              "High altitude only",
              "Cold temperatures alone",
              "Low humidity conditions"
            ],
            "correct": 0,
            "explanation": "Aircraft icing occurs when flying through supercooled water droplets that freeze on contact with aircraft surfaces."
          },
          {
            "question": "What is the standard atmospheric pressure at sea level?",
            "options": [
              "1000 hPa",
              "1013.25 hPa",
              "1020 hPa",
              "1030 hPa"
            ],
            "correct": 1,
            "explanation": "Standard atmospheric pressure at sea level is 1013.25 hPa (29.92 inches Hg)."
          },
          {
            "question": "What cloud does hail fall from?",
            "options": [
              "Cb",
              "Ns",
              "Cu",
              "Ci"
            ],
            "correct": 0,
            "explanation": "Hail forms in cumulonimbus (Cb) clouds where strong updrafts allow ice to grow large before falling."
          },
          {
            "question": "Maximum turbulence associated with mountain waves is likely to be:",
            "options": [
              "two wavelengths downwind and just above the surface",
              "approximately one wavelength downwind of, and approximately level with, the top of the ridge",
              "just below the tropopause above the ridge",
              "down the lee side of the ridge and along the surface"
            ],
            "correct": 1,
            "explanation": "Maximum mountain wave turbulence typically occurs about one wavelength downwind, near ridge-top level."
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
            "explanation": "Lenticular clouds indicate mountain waves are present, but turbulence severity varies with conditions."
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
            "explanation": "Mountain waves require perpendicular wind that increases with height in a stable atmospheric layer."
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
            "explanation": "Stratus (St) clouds produce drizzle - small, slow-falling water droplets."
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
            "explanation": "Altocumulus (Ac) and Altostratus (As) are classified as medium-level clouds (6,500-20,000 ft)."
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
        "name": "Mass & Balance - Complete Set",
        "timeLimit": 90,
        "questions": [
          {
            "question": "What happens if the center of gravity is too far aft?",
            "options": [
              "Increased stability",
              "Reduced stability and potential loss of control",
              "Better fuel economy",
              "No significant effect"
            ],
            "correct": 1,
            "explanation": "Aft CG reduces static stability and can lead to loss of pitch control, making the aircraft difficult to recover from upsets."
          },
          {
            "question": "What is the purpose of calculating weight and balance?",
            "options": [
              "For fuel planning only",
              "To ensure aircraft is within safe operating limits",
              "For passenger comfort",
              "To calculate flight time"
            ],
            "correct": 1,
            "explanation": "Weight and balance calculations ensure the aircraft operates within safe CG limits and maximum weights."
          },
          {
            "question": "How does forward CG affect aircraft performance?",
            "options": [
              "Increases stall speed and control forces",
              "Decreases stall speed",
              "No effect on performance",
              "Only affects fuel consumption"
            ],
            "correct": 0,
            "explanation": "Forward CG increases stall speed due to nose-down tendency and requires higher control forces."
          },
          {
            "question": "What is the moment in weight and balance calculations?",
            "options": [
              "Weight multiplied by arm distance",
              "Total aircraft weight",
              "Distance from datum",
              "Center of gravity location"
            ],
            "correct": 0,
            "explanation": "Moment is calculated as weight multiplied by arm (distance from reference datum)."
          },
          {
            "question": "Due to a mistake in the load sheet the aeroplane is 1000 kg heavier than you believe it to be. As a consequence:",
            "options": [
              "V1 will be later",
              "VMU will be later",
              "VR will be later",
              "V1, VMU, VR will all occur earlier"
            ],
            "correct": 1,
            "explanation": "Increased mass increases stall speed (Vs), which directly affects VMU and VR. V1 decision speed is also affected by accelerate-stop distance, which increases with mass."
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
            "explanation": "The datum can be located anywhere along the longitudinal axis, even outside the aircraft structure."
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
            "explanation": "Higher mass increases stall speed, increases required rotation force, reduces glide range. Range generally decreases, endurance generally decreases at optimal speeds due to higher drag/power required."
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
            "explanation": "Performance limited takeoff mass is determined by factors including climb gradient requirements."
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
            "explanation": "The CG position can vary within an approved range, depending on loading and fuel distribution."
          }
        ]
      }
    ]
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testData;
}
