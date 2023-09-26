//% color="#00AA00" icon="\uf192" weight=80
namespace Gorillacell {
    // Define variables to store pin numbers for LED control and output
    let ledControl: DigitalPin;
    let analogVoltage: AnalogPin;

    //% block="Initialize Air Quality Sensor:|ADC Pin %outPin|Control Pin %ledPin"
    //% blockId=gorillacell_air_quality_init
    //% subcategory="air quality"
    export function initializeAirQualitySensor(outPin: AnalogPin, ledPin: DigitalPin): void {
        // Store the provided pin numbers in variables
        analogVoltage = outPin;
        ledControl = ledPin;

        // Initialize the air quality sensor here (e.g., set up any required configurations)
        // This might involve configuring the sensor via I2C or other communication methods
    }

    //% block="Read Fine Dust"
    //% blockId=gorillacell_air_quality_read_fine_dust
    //% subcategory="air quality"
    export function readFineDust(): number {
        // Step 1: Set the LED control pin
        pins.digitalWritePin(ledControl, 1);

        // Step 2: Wait for 300 microseconds
        control.waitMicros(300);

        // Step 3: Read the analog value of analogVoltage pin
        let measuredVoltage = pins.analogReadPin(analogVoltage);

        // Step 4: Clear the LED control pin
        pins.digitalWritePin(ledControl, 0);

        return measuredVoltage; // Return the measured voltage
    }
}
