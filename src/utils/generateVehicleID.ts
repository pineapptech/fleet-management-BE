export function generateVehicleID() {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
    return `FMS-EN-${randomNumber}`;
}

export function generateRandom(prefix: string) {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
    return `${prefix}-${randomNumber}`;
}
