"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVehicleID = generateVehicleID;
function generateVehicleID() {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
    return `FMS-EN-${randomNumber}`;
}
