import { jsPDF } from "jspdf";
import moment from "moment";
import flightplanImg from "@/assets/flight_plan.jpg";

const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
};

export default function (
  date,
  identification,
  flightRules,
  flightType,
  number,
  aircraftType,
  wakeTurbulence,
  equipment,
  depAerodrome,
  time,
  cruisingSpeed,
  cruisingSpeedType,
  cruisingLevel,
  cruisingLevelType,
  route,
  arrAerodrome,
  totalFlightTime,
  altnAerodrome,
  secondAltnAerodrome,
  otherInformation,
  endurance,
  personsOnBoard,
  emergencyEquipment,
  numberOfDinghies,
  dinghiesCapacity,
  dinghiesCover,
  aircraftColor,
  remarks,
  pilotInCommand,
  signature
) {
  const doc = new jsPDF();

  doc.setProperties({
    title: `FlightPlan_${moment(date).format(
      "DDMMY"
    )}_${time}_${depAerodrome.toUpperCase()}_${arrAerodrome.toUpperCase()}.pdf`,
  });
  doc.viewerPreferences({ DisplayDocTitle: true });

  doc.setFont("courier", "normal", 700);
  doc.setFontSize(11);

  // Background
  doc.addImage(flightplanImg, "JPEG", 0, 0, 210, 297);

  // Identification
  doc.setCharSpace(3.3);
  doc.text(identification.replace("-", ""), 61, 72.5);

  // Flight rules
  doc.setCharSpace(1);
  doc.text(flightRules, 138, 72);

  // Flight Type
  doc.setCharSpace(1);
  doc.text(flightType, 183, 72);

  // Number
  doc.setCharSpace(3.3);
  doc.text(number, 11.5, 84);

  // Aircraft type
  doc.setCharSpace(3.3);
  doc.text(aircraftType, 50, 84);

  // Wake turbulence cat
  doc.setCharSpace(1);
  doc.text(wakeTurbulence, 116, 84);

  // Equipment
  equipment = equipment.replace(/\s/g, "").split("/");

  doc.setCharSpace(0);
  doc.text(equipment[0], 156, 83.5);
  doc.text(equipment[1], 182.5, 83.5);

  // Departure aerodrome
  doc.setCharSpace(3.3);
  doc.text(depAerodrome.toUpperCase(), 28.5, 95);

  // Time
  doc.setCharSpace(3.3);
  doc.text(pad(time, 4), 78, 95);

  // Cruising speed
  doc.setCharSpace(3.3);
  doc.text(`${cruisingSpeedType}${cruisingSpeed}`, 11.5, 106);

  // Cruising level
  doc.setCharSpace(3.3);
  doc.text(`${cruisingLevelType}${cruisingLevel}`, 44.5, 106);

  // Route
  let routeLines = doc.splitTextToSize(route.toUpperCase(), 130);
  doc.setCharSpace(0);
  doc.setLineHeightFactor(1.4);
  doc.text(routeLines, 78, 106);

  // Arrival aerodrome
  doc.setCharSpace(3.3);
  doc.text(arrAerodrome.toUpperCase(), 28.5, 143.5);

  // Total flight time
  doc.setCharSpace(3.3);
  doc.text(pad(totalFlightTime, 4), 77.5, 143);

  // Alternative
  doc.setCharSpace(3.3);
  doc.text(altnAerodrome.toUpperCase(), 121.5, 142.5);

  // Second alternative
  doc.setCharSpace(3.3);
  doc.text(secondAltnAerodrome.toUpperCase(), 166, 142.5);

  // Other information
  let DOF = "";

  if (moment(date).format("YYMMDD") !== moment().format("YYMMDD")) {
    DOF = `DOF/${moment(date).format("YYMMDD")}`;
  }

  let otherInformationLines = doc.splitTextToSize(`${DOF} ${otherInformation.toUpperCase()}`, 190);
  doc.setCharSpace(0);
  doc.setLineHeightFactor(1.4);
  doc.text(otherInformationLines, 12, 154);

  // Endurance
  doc.setCharSpace(3.3);
  doc.text(endurance, 22.5, 194);

  // Persons on board
  doc.setCharSpace(0);
  doc.text(personsOnBoard, 73.5, 194);

  // Emergency equipment
  doc.setCharSpace(0);
  doc.setFont("arial");
  doc.setFontSize(20);

  if (!emergencyEquipment.uhfRadio) doc.text("X", 147.5, 194.5);
  if (!emergencyEquipment.vhfRadio) doc.text("X", 164.5, 194.5);
  if (!emergencyEquipment.eltRadio) doc.text("X", 181, 194.5);

  if (
    !emergencyEquipment.polar &&
    !emergencyEquipment.desert &&
    !emergencyEquipment.maritime &&
    !emergencyEquipment.jungle
  ) {
    doc.text("X", 21.5, 211.5);
  } else {
    if (!emergencyEquipment.polar) doc.text("X", 37, 211.5);
    if (!emergencyEquipment.desert) doc.text("X", 53.5, 211.5);
    if (!emergencyEquipment.maritime) doc.text("X", 70, 211.5);
    if (!emergencyEquipment.jungle) doc.text("X", 87, 211.5);
  }

  if (
    !emergencyEquipment.lightJackets &&
    !emergencyEquipment.fluoresJackets &&
    !emergencyEquipment.uhfJackets &&
    !emergencyEquipment.vhfJackets
  ) {
    doc.text("X", 113.5, 211.5);
  } else {
    if (!emergencyEquipment.lightJackets) doc.text("X", 131, 211.5);
    if (!emergencyEquipment.fluoresJackets) doc.text("X", 147.5, 211.5);
    if (!emergencyEquipment.uhfJackets) doc.text("X", 164.5, 211.5);
    if (!emergencyEquipment.vhfJackets) doc.text("X", 181, 211.5);
  }

  doc.setFont("courier", "normal", 700);
  doc.setFontSize(11);

  // Number of dinghies
  if (numberOfDinghies > 0) {
    doc.setCharSpace(0);
    doc.text(numberOfDinghies, 22.5, 226);
  } else {
    doc.setCharSpace(0);
    doc.setFont("arial");
    doc.setFontSize(20);
    doc.text("X", 13.5, 227);
    doc.text("X", 60, 227);
  }

  doc.setCharSpace(0);
  doc.setFont("courier", "normal", 700);
  doc.setFontSize(11);

  // Dinghies capacity
  doc.setCharSpace(0);
  doc.text(dinghiesCapacity, 38.5, 226);

  // Dinghies cover
  doc.setCharSpace(0);
  doc.text(dinghiesCover.toUpperCase(), 71.5, 226);

  // Aircraft color and marks
  doc.setCharSpace(0);
  doc.text(aircraftColor.toUpperCase(), 22.5, 236);

  // Remarks
  if (remarks.length > 2) {
    doc.setCharSpace(0);
    doc.text(remarks.toUpperCase(), 22.5, 247.5);
  } else {
    doc.setCharSpace(0);
    doc.setFont("arial");
    doc.setFontSize(20);
    doc.text("X", 13, 249);
  }

  // Pilot in command
  doc.setCharSpace(0);
  doc.setFont("courier", "normal", 700);
  doc.setFontSize(11);
  doc.text(pilotInCommand.toUpperCase(), 22.5, 257.5);

  // Signature
  doc.addImage(signature, "JPEG", 119, 263, 31.2, 15.6);

  window.open(doc.output("bloburl"), "_blank");
}
