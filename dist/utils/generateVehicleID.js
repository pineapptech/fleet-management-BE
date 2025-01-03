"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVehicleID = generateVehicleID;
exports.generateRandom = generateRandom;
function generateVehicleID() {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
    return `FMS-EN-${randomNumber}`;
}
function generateRandom(prefix) {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
    return `${prefix}-${randomNumber}`;
}
