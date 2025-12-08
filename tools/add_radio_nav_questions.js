const fs = require('fs');
const path = require('path');

// Radio Navigation questions organized by test
const radioNavTests = [
  {
    name: "Radio Navigation Test 1",
    timeLimit: 60,
    questions: [
      {
        question: "An aircraft flies from a VOR at 61N 013W to 58N 013W. The variation at the beacon is 13W and the variation at the aircraft is 5W. What radial is the aircraft on?",
        options: ["013", "005", "193", "187"],
        correct: 2,
        explanation: "Calculation: Aircraft is South of the VOR (same longitude). True bearing FROM VOR to Aircraft is 180°(T). Radial = Magnetic Bearing FROM VOR. Use Variation at VOR: Radial = 180°(T) + 13°W = 193°(M)."
      },
      {
        question: "Determine which of the following statements concerning atmospheric ionization are correct: 1. The highest levels of ionization will be experienced in low latitudes 2. Ionization levels increase linearly with increasing altitude 3. The lowest levels of ionization occur about midnight 4. The E-layer is higher by night than by day because the ionization levels are lower at night",
        options: ["statements 1, 2 and 3 are correct", "statements 1, 3 and 4 are correct", "statements 2 and 4 are correct", "statements 1 and 4 are correct"],
        correct: 3,
        explanation: "Ionization is highest during the day due to solar radiation, and generally higher at higher altitudes, but not linearly. The E-layer does tend to be higher/weaker at night. Low latitudes near the equator experience high ionization. Statement 1 is true, Statement 4 is true."
      },
      {
        question: "The accuracy of VDF Class A bearing is:",
        options: ["+/- 10°", "+/- 5°", "+/- 2°", "+/- 1°"],
        correct: 2,
        explanation: "VDF Class A has an accuracy of ±2°"
      },
      {
        question: "The Doppler effect is used in some navigation systems to determine .........., it causes a .......... in frequency of a radio transmission if the transmitter and receiver are moving .......",
        options: ["position, change, towards each other", "relative motion, decrease, apart", "the distance, increase, at the same speed", "relative motion, increase, apart"],
        correct: 0,
        explanation: "Doppler effect determines position by detecting frequency changes when transmitter and receiver move towards each other or apart"
      },
      {
        question: "The accuracy of ADF by day and excluding compass error is:",
        options: ["+/-1°", "+/-2°", "+/-5°", "+/-10°"],
        correct: 2,
        explanation: "ADF accuracy by day is typically ±5°"
      },
      {
        question: "The principal propagation path employed in an NDB/ADF system is:",
        options: ["sky wave", "surface wave", "direct wave", "ducted wave"],
        correct: 1,
        explanation: "NDB/ADF primarily uses surface wave propagation"
      },
      {
        question: "When converting VOR and ADF bearings to true, the variation at the …… should be used for VOR and at the …… for ADF",
        options: ["aircraft aircraft", "aircraft station", "station aircraft", "station station"],
        correct: 2,
        explanation: "Use variation at the station for VOR, at the aircraft for ADF"
      },
      {
        question: "The maximum range an ATC facility at 1369 ft AMSL can provide a service to an aircraft at FL350 is:",
        options: ["276 NM", "200 NM", "224 NM", "238 NM"],
        correct: 0,
        explanation: "Calculation: Range (NM) ≈ 1.23 * (sqrt(H1_ft) + sqrt(H2_ft)). Range ≈ 1.23 * (sqrt(1369) + sqrt(35000)) ≈ 1.23 * (37 + 187) ≈ 1.23 * 224 ≈ 275.5 NM"
      },
      {
        question: "ADF quadrantal error is caused by:",
        options: ["static build-up on the airframe and St. Elmo's Fire", "the aircraft's major electrical axis, the fuselage, reflecting and re-radiating the incoming NDB transmissions", "station interference and/or night effect", "NDB signals speeding up and bending as they cross from a land to water propagation path"],
        correct: 1,
        explanation: "Quadrantal error is caused by the aircraft fuselage reflecting and re-radiating NDB signals"
      },
      {
        question: "Which wavelength corresponds to a frequency of 5035 MHz?",
        options: ["5.96 mm", "5.96 cm", "5.96 m", "59.6 cm"],
        correct: 1,
        explanation: "Calculation: Wavelength = Speed of Light / Frequency = (3 * 10^8 m/s) / (5035 * 10^6 Hz) ≈ 0.0596 m = 5.96 cm"
      },
      {
        question: "An NDB has emission designator N0NA1A this will require the use of the BFO for:",
        options: ["tuning", "identification", "identification and monitoring", "tuning, identification and monitoring"],
        correct: 3,
        explanation: "N0N A1A indicates unmodulated carrier wave with Morse code keying - requires BFO to hear the tone for tuning, identification and monitoring"
      },
      {
        question: "The pilot of an aircraft flying at FL240 is 250 NM from a VOR at 16 ft AMSL which he selects. He receives no signal from the VOR. This is because:",
        options: ["the VOR is unserviceable", "the range of VOR is limited to 200 NM", "the aircraft is beyond line of sight range", "there are abnormal atmospheric conditions"],
        correct: 2,
        explanation: "Calculation: Max Range ≈ 1.23 * (sqrt(24000) + sqrt(16)) ≈ 1.23 * (155 + 4) ≈ 1.23 * 159 ≈ 195 NM. 250 NM is beyond line of sight range"
      },
      {
        question: "Coastal refraction error is maximum when the NDB signal crosses the coast at:",
        options: ["a coastal beacon at an acute angle", "an inland beacon at an acute angle", "a coastal beacon perpendicular to the coast", "an inland beacon perpendicular to the coast"],
        correct: 1,
        explanation: "Coastal refraction is maximum for inland beacons when signals cross the coast at acute angles"
      },
      {
        question: "The ADF error which will cause the needle to 'hunt' (i.e. oscillate around the correct bearing) is:",
        options: ["night effect", "CB static", "station interference", "coastal refraction"],
        correct: 0,
        explanation: "Night effect causes the ADF needle to hunt or oscillate"
      },
      {
        question: "The Doppler effect is:",
        options: ["the change in frequency caused by the movement of a transmitter and receiver", "the change in frequency caused by the movement of a receiver", "the change in frequency caused by the movement of a transmitter", "the change in frequency caused by the relative movement between a transmitter and receiver"],
        correct: 3,
        explanation: "Doppler effect is the frequency change due to relative movement between transmitter and receiver"
      },
      {
        question: "A class B VDF bearing will have an accuracy of:",
        options: ["± 2°", "± 10°", "± 5°", "± 1°"],
        correct: 2,
        explanation: "VDF Class B has an accuracy of ±5°"
      },
      {
        question: "The VDF term meaning 'true bearing from the station' is:",
        options: ["QDM", "QUJ", "QDR", "QTE"],
        correct: 2,
        explanation: "QDR is the true bearing from the station"
      },
      {
        question: "The phase difference measured at the aircraft from a VOR is 235°. The bearing of the beacon from the aircraft is:",
        options: ["055°", "235°", "145°", "325°"],
        correct: 0,
        explanation: "Phase difference = Radial (magnetic bearing FROM beacon). Radial = 235°. Bearing TO beacon = 235 - 180 = 055°"
      },
      {
        question: "An error applicable to VDF would be:",
        options: ["synchronous transmission", "scalloping", "selective availability", "garbling"],
        correct: 3,
        explanation: "Garbling is an error that can occur with VDF systems"
      },
      {
        question: "The principle of operation of VOR is:",
        options: ["bearing by lobe comparison", "bearing by frequency comparison", "bearing by searchlight principle", "bearing by phase comparison"],
        correct: 3,
        explanation: "VOR operates on the principle of bearing by phase comparison"
      }
    ]
  },
  {
    name: "Radio Navigation Test 2",
    timeLimit: 60,
    questions: [
      {
        question: "When flying downwind abeam the upwind end of the runway the indications from the ILS on the CDI will be:",
        options: ["in the correct sense for the localizer and no glide path signal", "erratic on both localizer and glide path", "erratic on the localizer and in the correct sense on the glide path", "no localizer signal and in the correct sense for glide path"],
        correct: 1,
        explanation: "When flying downwind abeam the upwind end, both localizer and glide path signals will be erratic"
      },
      {
        question: "MLS has 200 channels available in the frequency band:",
        options: ["108 – 112 MHz", "329 – 335 MHz", "960 – 1215 MHz", "5031 – 5090 MHz"],
        correct: 3,
        explanation: "MLS operates in the 5031-5090 MHz frequency band with 200 channels"
      },
      {
        question: "The time interval between the transmission of a pulse and receipt of the echo from a target is 925.5 microseconds. The range of the target is:",
        options: ["37.5 NM", "75 NM", "150 NM", "300 NM"],
        correct: 1,
        explanation: "Calculation: Radar mile = 12.34 microseconds/NM (round trip). Range = Time / 12.34 = 925.5 / 12.34 ≈ 75 NM"
      },
      {
        question: "The best resolution will be obtained from:",
        options: ["a narrow beam width and narrow pulse width", "a wide beam width and narrow pulse width", "a narrow beam width and wide pulse width", "a wide beam width and wide pulse width"],
        correct: 0,
        explanation: "Best resolution requires both narrow beam width and narrow pulse width"
      },
      {
        question: "The SSR code to select when the aircraft is being unlawfully interfered with is:",
        options: ["7600", "7700", "7500", "7400"],
        correct: 2,
        explanation: "7500 is the squawk code for unlawful interference (hijacking)"
      },
      {
        question: "A precision approach runway CAT II is an instrument runway served by ILS and visual aids intended for operations down to:",
        options: ["a RVR of 550 meters and a DH of not less than 200 ft", "a RVR of 200 meters and a DH of not less than 100 ft", "a RVR of 250 meters and a DH of not less than 200 ft", "a RVR of 300-450 meters and a DH of not less than 100 ft"],
        correct: 3,
        explanation: "CAT II requires RVR 300-450 meters and DH not less than 100 ft"
      },
      {
        question: "The type of radar which has no minimum range restriction is:",
        options: ["primary CW radar", "primary pulsed radar", "secondary CW radar", "secondary pulsed radar"],
        correct: 0,
        explanation: "Continuous Wave (CW) primary radar has no minimum range restriction"
      },
      {
        question: "An advantage of a slotted antenna (planar array) over a parabolic reflector are:",
        options: ["side lobes removed", "360° scan without any rotation requirement", "less power required", "high gain"],
        correct: 1,
        explanation: "Slotted antenna provides 360° scan without physical rotation"
      },
      {
        question: "Refer to Appendix A, diagram B. What are the indications on the VOR/ILS display?",
        options: ["030, TO, Fly Right", "030, TO, Fly Left", "210, FROM Fly Right", "210, FROM, Fly Left"],
        correct: 0,
        explanation: "Based on standard VOR indication patterns"
      },
      {
        question: "Flying an ILS approach the equipment senses that the 90 Hz modulation predominates on both the localizer and the glide path. The indications the pilot will see are:",
        options: ["fly left and fly up", "fly left and fly down", "fly right and fly up", "fly right and fly down"],
        correct: 3,
        explanation: "90Hz predominates = Fly Right (Localizer) and Fly Down (Glide Path)"
      },
      {
        question: "On a colour AWR display, the heaviest precipitation will be displayed in:",
        options: ["amber", "red", "yellow", "blue"],
        correct: 1,
        explanation: "Red indicates the heaviest precipitation on AWR displays"
      },
      {
        question: "The coverage of the approach azimuth and elevation of a MLS is:",
        options: ["+/-20° to 40 NM", "+/-20° to 20 NM", "+/-40° to 40 NM", "+/-40° to 20 NM"],
        correct: 2,
        explanation: "MLS provides ±40° coverage to 40 NM"
      },
      {
        question: "A radar transmitting on 600 MHz has a PRF of 300 pps and an aerial rotation rate of 5 rpm. This radar will be:",
        options: ["an area surveillance radar", "an aerodrome surface movement radar", "an aerodrome surveillance radar", "a terminal area radar"],
        correct: 0,
        explanation: "These parameters indicate an area surveillance radar"
      },
      {
        question: "The AWR operating frequency is:",
        options: ["9375 MHz", "9375 GHz", "937.5 MHz", "93.75 GHz"],
        correct: 0,
        explanation: "Airborne Weather Radar operates at 9375 MHz"
      },
      {
        question: "On an ILS approach, using a 3° glide path, the height of an aircraft, ground speed 160 kt, at 3.5 NM from touchdown should be:",
        options: ["800 ft", "1050 ft", "900 ft", "1500 ft"],
        correct: 1,
        explanation: "Calculation: Height ≈ Distance (NM) * Angle * 100 ≈ 3.5 * 3 * 100 ≈ 1050 ft"
      },
      {
        question: "The AWR frequency is selected because it gives:",
        options: ["good returns from water droplets", "good returns from turbulence", "good penetration of cloud", "good returns from water vapour"],
        correct: 0,
        explanation: "AWR frequency provides good returns from water droplets in precipitation"
      },
      {
        question: "The azimuth coverage of a 3° glide path is:",
        options: ["+/-35° to 17 NM", "+/-10° to 25 NM", "+/-8° to 10 NM", "+/-10° to 8 NM"],
        correct: 3,
        explanation: "Glide path azimuth coverage is ±10° to 8 NM"
      },
      {
        question: "The maximum theoretical range of a radar is determined by:",
        options: ["power", "PW", "beamwidth", "PRF"],
        correct: 3,
        explanation: "PRF (Pulse Repetition Frequency) determines maximum theoretical range"
      },
      {
        question: "In SSR the aircraft replies on .............. MHz and the ground station interrogates on ................. MHz",
        options: ["1030 1090", "1090 1030", "1030 1030", "1090 1090"],
        correct: 1,
        explanation: "Aircraft replies on 1090 MHz, ground interrogates on 1030 MHz"
      },
      {
        question: "A full MLS system comprises a DME and:",
        options: ["4 elements multiplexing on 2 frequencies", "4 elements multiplexing on one frequency", "2 elements using 2 frequencies", "2 elements multiplexing on one frequency"],
        correct: 1,
        explanation: "MLS has 4 elements (azimuth, elevation, back-azimuth, DME) multiplexing on one frequency"
      }
    ]
  },
  {
    name: "Radio Navigation Test 3",
    timeLimit: 60,
    questions: [
      {
        question: "If the signal from an SV is lost during an aircraft manoeuvre:",
        options: ["the receiver will select another SV with no loss in accuracy", "the receiver will go into a DR mode with no loss of accuracy", "the receiver will compensate by using the last calculated altitude to maintain positional accuracy", "the receiver position will degrade regardless of the action taken"],
        correct: 3,
        explanation: "Loss of SV signal will degrade position accuracy"
      },
      {
        question: "The navigation database in an FMC:",
        options: ["can be modified by the flight crew to meet the route requirements", "can be modified every 28 days", "can only be read by the flight crew", "cannot be accessed by the flight crew"],
        correct: 2,
        explanation: "Navigation database can only be read by flight crew, not modified"
      },
      {
        question: "If the receiver almanac becomes corrupted it will download the almanac from the constellation. This download will take:",
        options: ["15 minutes", "2.5 minutes", "12.5 minutes", "5 minutes"],
        correct: 2,
        explanation: "Full almanac download takes approximately 12.5 minutes"
      },
      {
        question: "The optimum position for a DME aerial on an aircraft is:",
        options: ["in the nose cone to give maximum forward range", "as close to the fore/aft centre line as possible", "on top of the fuselage close to the wings", "close to each wing tip to compensate for manoeuvre errors"],
        correct: 2,
        explanation: "DME antenna is best positioned on top of fuselage near wings"
      },
      {
        question: "The most accurate external reference position will be provided by:",
        options: ["VOR/DME", "Twin DME", "Twin VOR", "Suitable combination of VOR and DME"],
        correct: 1,
        explanation: "Twin DME (DME/DME) provides the most accurate position"
      },
      {
        question: "A DME recognizes replies to its own interrogating pulses because:",
        options: ["each pulse pair has its own unique modulation which is replicated by the transponder", "the PRF of the interrogating pulses is jittered", "each aircraft has a different time interval within the pulses pairs which is replicated by the transponder", "the transponder uses a selective reply system to respond to the aircraft interrogation pulses"],
        correct: 1,
        explanation: "DME uses jittered PRF to recognize its own replies"
      },
      {
        question: "The RNAV function of the FMC produces a position which:",
        options: ["combines the short term accuracy of the external reference with the long term accuracy of the IRS", "produces a long term accuracy from the short term accuracy of the external references", "combines the long term accuracy of the external reference with the short term accuracy of the IRS", "relies solely on the IRS position"],
        correct: 2,
        explanation: "RNAV combines long-term accuracy of external refs with short-term accuracy of IRS"
      },
      {
        question: "If the identification of a VOR is FKL and the paired DME identification is FKZ, then:",
        options: ["the transmitters are co-located", "the beacons are between 600 m and 6 NM apart", "the transmitters are within 600 m", "the transmitters are in excess of 6 NM apart"],
        correct: 3,
        explanation: "Different last letters indicate transmitters are more than 6 NM apart"
      },
      {
        question: "The NAVSTAR/GPS operational constellation comprises:",
        options: ["21 satellites in 6 orbits", "24 satellites in 6 orbits", "24 satellites in 3 orbits", "30 satellites in 6 orbits"],
        correct: 1,
        explanation: "GPS constellation has 24 satellites in 6 orbital planes"
      },
      {
        question: "The model of the earth used for GPS is:",
        options: ["WGS90", "PZ84", "PZ90", "WGS84"],
        correct: 3,
        explanation: "GPS uses the WGS84 (World Geodetic System 1984) earth model"
      },
      {
        question: "EGNOS provides a WAAS by determining the errors in ................ and broadcasting these errors to receivers using ................",
        options: ["X, Y & Z coordinates geostationary satellites", "X, Y & Z coordinates pseudolites", "SV range geostationary satellites", "SV range pseudolites"],
        correct: 2,
        explanation: "EGNOS determines SV range errors and broadcasts via geostationary satellites"
      },
      {
        question: "If the aircraft DME interrogates a ground transponder on a frequency of 1199 MHz, it will receive replies on:",
        options: ["1199 MHz", "1073 MHz", "1262 MHz", "1136 MHz"],
        correct: 3,
        explanation: "DME uses paired frequencies separated by 63 MHz. 1199 MHz is high band, reply is 1199 - 63 = 1136 MHz"
      },
      {
        question: "The purpose of the PRN codes in NAVSTAR/GPS is to:",
        options: ["identify the satellites", "synchronize the receiver clocks with the SV clocks", "pass navigation and system data to the receiver", "all of the above"],
        correct: 3,
        explanation: "PRN codes serve all these purposes: identification, synchronization, and data transmission"
      },
      {
        question: "The provision of RAIM requires a minimum of ................ SVs",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation: "RAIM (Receiver Autonomous Integrity Monitoring) requires minimum 5 satellites"
      },
      {
        question: "Refer to Appendix A, diagram E. What is the track from BANTU to ZAPPO?",
        options: ["360°(M)", "130°(M)", "360°(T)", "130°(T)"],
        correct: 1,
        explanation: "Based on navigation chart diagram"
      },
      {
        question: "The principle error in GNSS is:",
        options: ["ionospheric propagation", "GDOP", "receiver clock error", "SV ephemeris error"],
        correct: 2,
        explanation: "Receiver clock error is the principal error in GNSS"
      },
      {
        question: "The number of SVs required to produce a 3D fix is:",
        options: ["3", "4", "5", "6"],
        correct: 1,
        explanation: "4 satellites are required for a 3D position fix (3 for position, 1 for time)"
      },
      {
        question: "Refer to Appendix A. Which diagram shows the MAP display?",
        options: ["Diagram A", "Diagram B", "Diagram C", "Diagram D"],
        correct: 2,
        explanation: "Based on standard navigation display formats"
      },
      {
        question: "The DME in an aircraft at FL630 measures a slant range of 16 NM from a ground station at 1225 ft AMSL. The plan range is:",
        options: ["12.5 NM", "19 NM", "16 NM", "10.5 NM"],
        correct: 0,
        explanation: "Calculation: Height difference ≈ 10.17 NM. Plan Range = sqrt(16² - 10.17²) = sqrt(152.6) ≈ 12.35 NM"
      },
      {
        question: "The altitude read-out at the ground station from a mode C response will give the aircraft altitude within:",
        options: ["300 ft", "100 ft", "500 ft", "50 ft"],
        correct: 1,
        explanation: "Mode C altitude reporting has 100 ft resolution"
      }
    ]
  },
  {
    name: "Radio Navigation Test 4",
    timeLimit: 60,
    questions: [
      {
        question: "Refer to Appendix A, diagram C. What is the symbol designated DFC which is coloured cyan?",
        options: ["an in-use VORTAC", "an available VORTAC", "an in-use NDB", "an available NDB"],
        correct: 1,
        explanation: "Cyan color indicates available VORTAC"
      },
      {
        question: "The middle marker is usually located at a range of ................., with an audio frequency of ................ and illuminates the ................. light.",
        options: ["4-6 NM 1300 Hz white", "1 km 400 Hz white", "1 km 1300 Hz amber", "1 km 400 Hz amber"],
        correct: 2,
        explanation: "Middle marker: 1 km range, 1300 Hz tone, amber light"
      },
      {
        question: "The main advantage of a continuous wave radar over a pulsed radar is:",
        options: ["more complex equipment but better resolution and accuracy", "removes the minimum range restriction", "smaller more compact equipment", "permits measurement of Doppler in addition to improved range and bearing"],
        correct: 1,
        explanation: "CW radar has no minimum range restriction unlike pulsed radar"
      },
      {
        question: "For a conventional VOR a phase difference of 090° would be achieved by flying............... from the beacon:",
        options: ["west", "north", "east", "south"],
        correct: 2,
        explanation: "Phase difference equals the magnetic radial FROM the beacon. 090° = East"
      },
      {
        question: "The ILS glide slope transmitter generates false glide slope signals:",
        options: ["above the true glide slope", "below the true glide slope", "either side of the localizer", "outside the coverage area"],
        correct: 0,
        explanation: "False glide slopes appear above the true glide slope"
      },
      {
        question: "At a range of 200 NM from a VOR, if there is an error of 1°, how far off the centre line is the aircraft?",
        options: ["3.5 NM", "1.75 NM", "7 NM", "1 NM"],
        correct: 0,
        explanation: "Calculation: Distance off ≈ (Angle Error * Distance) / 60 = (1 * 200) / 60 ≈ 3.33 NM"
      },
      {
        question: "The coverage of the ILS glide slope with respect to the localizer centre line is:",
        options: ["+/-10° to 8 NM", "+/-10° to 25 NM", "+/-8° to 10 NM", "+/-35° to 17 NM"],
        correct: 0,
        explanation: "Glide slope coverage is ±10° to 8 NM"
      },
      {
        question: "Refer to appendix A, diagram F. What is the required track?",
        options: ["165°", "173°", "157°", "130°"],
        correct: 1,
        explanation: "Based on navigation chart diagram"
      },
      {
        question: "The principle of operation of the ILS localizer transmitter is that it transmits two overlapping lobes on:",
        options: ["different frequencies with different phases", "the same frequency with different phases", "the same frequency with different amplitude modulations", "different frequencies with different amplitude modulations"],
        correct: 2,
        explanation: "ILS localizer uses same frequency with different amplitude modulations (90Hz and 150Hz)"
      },
      {
        question: "The amplitude modulation of the ILS outer marker is ............... and it illuminates the................light in the cockpit.",
        options: ["400 Hz blue", "1300 Hz amber", "400 Hz amber", "1300 Hz blue"],
        correct: 0,
        explanation: "Outer marker: 400 Hz tone, blue light"
      },
      {
        question: "Which of the following systems use pulse technique? 1. secondary surveillance radar 2. airborne weather radar 3. distance measuring equipment 4. primary radar",
        options: ["all the above", "2 and 4 only", "2 only", "1 and 3 only"],
        correct: 0,
        explanation: "All listed systems use pulse technique"
      },
      {
        question: "On an ILS approach you receive more of the 90 Hz modulation than the 150 Hz modulation. The action you should take is:",
        options: ["fly left and up", "fly left and down", "fly right and up", "fly right and down"],
        correct: 3,
        explanation: "90Hz predominates = Fly Right (Localizer) and Fly Down (Glide Path)"
      },
      {
        question: "In which frequency band does ILS operate?",
        options: ["UHF/VHF", "VHF", "SHF", "VLF"],
        correct: 0,
        explanation: "ILS uses VHF for localizer and UHF for glide slope"
      },
      {
        question: "Distance on MLS is measured by:",
        options: ["measuring the time taken for the primary radar pulse to travel from the MLS transmitter to the aircraft receiver", "measuring the time taken for the secondary radar pulse to travel from the MLS transmitter to the aircraft receiver", "phase comparison between the azimuth and elevation beams", "co-located DME"],
        correct: 3,
        explanation: "MLS distance is measured by co-located DME equipment"
      },
      {
        question: "The coverage of MLS is ............... either side of the centre line to a distance of...............",
        options: ["40° 40 NM", "40° 20 NM", "20° 20 NM", "20° 40 NM"],
        correct: 0,
        explanation: "MLS coverage is ±40° to 40 NM"
      },
      {
        question: "In which band does the ILS glide path operate?",
        options: ["metric", "centimetric", "decimetric", "hectometric"],
        correct: 2,
        explanation: "ILS glide path operates in UHF band which corresponds to decimetric wavelengths"
      },
      {
        question: "Refer to Appendix A, diagram A. What is the deviation from the required track?",
        options: ["3 NM left", "3 NM right", "8° left", "8° right"],
        correct: 2,
        explanation: "Based on navigation display diagram"
      },
      {
        question: "The definition of a radar display will be best with:",
        options: ["narrow beamwidth and narrow pulsewidth", "narrow beamwidth and wide pulsewidth", "wide beamwidth and narrow pulsewidth", "wide beamwidth and wide pulsewidth"],
        correct: 0,
        explanation: "Best definition requires narrow beamwidth and narrow pulsewidth"
      },
      {
        question: "Primary radar operates on the principle of:",
        options: ["transponder interrogation", "pulse technique", "phase comparison", "continuous wave emission"],
        correct: 1,
        explanation: "Primary radar uses pulse technique"
      },
      {
        question: "The best radar for measuring very short ranges is:",
        options: ["a continuous wave primary radar", "a pulsed secondary radar", "a pulsed primary radar", "a continuous wave secondary radar"],
        correct: 0,
        explanation: "CW primary radar is best for very short ranges (no minimum range)"
      }
    ]
  },
  {
    name: "Radio Navigation Test 5",
    timeLimit: 60,
    questions: [
      {
        question: "NAVSTAR GPS receiver clock error is removed by:",
        options: ["regular auto-synchronization with the satellite clocks", "adjusting the pseudo-ranges to determine the error", "synchronization with the satellite clocks on initialization", "having an appropriate atomic time standard within the receiver"],
        correct: 1,
        explanation: "GPS receiver clock error is removed by adjusting pseudo-ranges"
      },
      {
        question: "The main advantage of a slotted scanner is:",
        options: ["reduces side lobes and directs more energy into the main beam", "removes the need for azimuth slaving", "side lobe suppression", "can produce simultaneous map and weather information"],
        correct: 0,
        explanation: "Slotted scanner reduces side lobes and concentrates energy in main beam"
      },
      {
        question: "The advantages of SSR mode S are:",
        options: ["improved resolution, TCAS", "data link, reduced voice communications", "TCAS, no RT communications", "better resolution, selective interrogation"],
        correct: 3,
        explanation: "Mode S provides better resolution and selective interrogation capability"
      },
      {
        question: "The DME IDENT signal consists of a Morse code transmission every:",
        options: ["30-40 seconds at a pitch of 1350 Hz", "30-40 seconds at a pitch of 1020 Hz", "10-15 seconds at a pitch of 1350 Hz", "10-15 seconds at a pitch of 1020 Hz"],
        correct: 0,
        explanation: "DME identification is transmitted every 30-40 seconds at 1350 Hz"
      },
      {
        question: "The positioning of a GNSS aerial on an aircraft is:",
        options: ["in the fin", "on the fuselage as close as possible to the receiver", "on top of the fuselage close to the centre of gravity", "under the fuselage"],
        correct: 2,
        explanation: "GNSS antenna is best positioned on top of fuselage near center of gravity"
      },
      {
        question: "The use of the AWR on the ground is:",
        options: ["not permitted", "permitted provided reduced power is used", "permitted provided special precautions are taken to safeguard personnel and equipment", "only permitted to assist movement in low visibility conditions"],
        correct: 2,
        explanation: "AWR use on ground requires special precautions for safety"
      },
      {
        question: "The airborne weather radar (AWR) cannot detect:",
        options: ["snow", "moderate rain", "dry hail", "wet hail"],
        correct: 0,
        explanation: "AWR has difficulty detecting dry snow due to poor reflectivity"
      },
      {
        question: "What are the ground components of MLS?",
        options: ["Separate azimuth and elevation antennae with DME", "Separate azimuth and elevation antennae with middle and outer markers", "Combined azimuth and elevation antennae with DME", "Combined azimuth and elevation antennae with middle and outer markers"],
        correct: 0,
        explanation: "MLS has separate azimuth and elevation antennas with DME"
      },
      {
        question: "Area navigation is:",
        options: ["one which enables the aircraft to navigate on any desired flight path within the coverage of appropriate ground based navigation aids or within the specified limits of self-contained on-board systems or a combination of the two", "one which enables the aircraft to navigate on any desired flight path within the coverage of appropriate ground based navigation aids or within the specified limits of self-contained on-board systems but not a combination of the two", "one which enables the aircraft to navigate on any desired flight path within the coverage of appropriate ground based navigation aids only", "one which enables the aircraft to navigate on any desired flight path within the specified limits of self-contained on-board systems"],
        correct: 0,
        explanation: "RNAV allows navigation using ground aids, self-contained systems, or combination"
      },
      {
        question: "Which is the most suitable radar for measuring short ranges?",
        options: ["Millimetric pulse", "Continuous wave primary", "Centimetric pulse", "Continuous wave secondary"],
        correct: 1,
        explanation: "CW primary radar is most suitable for short ranges"
      },
      {
        question: "The PRN codes are used to:",
        options: ["determine the time taken for the signal to reach the receiver", "differentiate between signals from different satellites", "pass navigation information to the receiver", "pass clock correction data to the receiver"],
        correct: 1,
        explanation: "PRN codes primarily differentiate between satellite signals"
      },
      {
        question: "Refer to Appendix A, diagram D. What is the track deviation?",
        options: ["0.8 NM left", "0.8 NM right", "8 NM left", "8 NM right"],
        correct: 0,
        explanation: "Based on navigation display diagram"
      },
      {
        question: "The SSR ground transceiver interrogates on ................ and receives responses on ................",
        options: ["1030 MHz 1030 MHz", "1030 MHz 1090 MHz", "1090 MHz 1030 MHz", "1090 MHz 1090 MHz"],
        correct: 1,
        explanation: "Ground interrogates on 1030 MHz, receives on 1090 MHz"
      },
      {
        question: "The accuracy of SSR mode C altitude as displayed to the air traffic controller is:",
        options: ["+/-25 ft", "+/-50 ft", "+/-75 ft", "+/-100 ft"],
        correct: 3,
        explanation: "Mode C altitude accuracy displayed is ±100 ft"
      },
      {
        question: "Concerning NAVSTAR/GPS orbits, which of the following statements is correct?",
        options: ["The inclination of the orbits is 55° with an orbital period of 12 hours", "The inclination of the orbits is 55° with an orbital period of 24 hours", "The orbits are geostationary to provide global coverage", "The orbits are inclined at 65° with an orbital period of 11 hours 15 minutes"],
        correct: 0,
        explanation: "GPS satellites orbit at 55° inclination with 12-hour period"
      },
      {
        question: "Why is a secondary radar display free from weather clutter?",
        options: ["The frequencies are too low to detect water droplets", "The frequencies are too high to detect water droplets", "Moving target indication cancels out weather returns", "Weather returns are filtered out because they do not originate from transponders"],
        correct: 3,
        explanation: "Secondary radar only shows transponder replies, not weather echoes"
      },
      {
        question: "The frequency used for airborne weather radar is:",
        options: ["9375 MHz", "937.5 MHz", "93.75 GHz", "9375 GHz"],
        correct: 0,
        explanation: "AWR operates at 9375 MHz"
      },
      {
        question: "The vertical position provided by SSR mode C is referenced to:",
        options: ["QNH unless QFE is in use", "1013.25 hPa", "QNH", "WGS84 datum"],
        correct: 1,
        explanation: "Mode C altitude is referenced to standard pressure (1013.25 hPa)"
      },
      {
        question: "The EHSI is showing 5° fly right with a TO indication. The aircraft heading is 280°(M) and the required track is 270°. The radial is:",
        options: ["275", "265", "085", "095"],
        correct: 3,
        explanation: "Fly right 5° means current bearing TO = 270+5=275°. Radial FROM = 275-180=095°"
      },
      {
        question: "The contents of the navigation and systems message from NAVSTAR/GPS SVs include:",
        options: ["satellite clock error, almanac data, ionospheric propagation information", "satellite clock error, almanac data, satellite position error", "position accuracy verification, satellite clock time and clock error", "ionospheric propagation information, X, Y & Z coordinates and corrections, satellite clock time and error"],
        correct: 0,
        explanation: "GPS navigation message includes clock error, almanac, and ionospheric data"
      }
    ]
  }
];

// Load existing testData
const testDataPath = path.join(__dirname, '../src/data/testData.js');
let testDataContent = fs.readFileSync(testDataPath, 'utf-8');

// Extract the testData object
const match = testDataContent.match(/const testData = ({[\s\S]+});?\s*(?:if|module\.exports)/);
if (!match) {
  console.error('❌ Could not parse testData.js');
  process.exit(1);
}

const testData = eval('(' + match[1] + ')');

// Add new tests to radio-navigation category
if (!testData['radio-navigation']) {
  console.error('❌ Radio navigation category not found');
  process.exit(1);
}

// Add all new tests
radioNavTests.forEach(test => {
  testData['radio-navigation'].tests.push(test);
});

// Count total questions
let totalAdded = 0;
radioNavTests.forEach(test => {
  totalAdded += test.questions.length;
});

// Write back to testData.js
const newTestDataStr = JSON.stringify(testData, null, 2);
const newContent = testDataContent.replace(
  /const testData = {[\s\S]+?};?\s*(?=if|module\.exports)/,
  `const testData = ${newTestDataStr};\n\n`
);

fs.writeFileSync(testDataPath, newContent);

console.log(`\n✅ Successfully added ${totalAdded} Radio Navigation questions across 5 new tests`);
console.log(`📊 Radio Navigation now has ${testData['radio-navigation'].tests.length} tests total`);

// Count all questions now
let grandTotal = 0;
Object.keys(testData).forEach(catKey => {
  testData[catKey].tests.forEach(test => {
    grandTotal += test.questions.length;
  });
});

console.log(`📊 Total questions in database: ${grandTotal}`);
