//% color="#00AA00" icon="\uf192" weight=80
namespace Gorillacell {
    //% block="Scan I2C Bus"
    //% blockId=gorillacell_helper_scan_i2c
    //% subcategory="helper"
    export function scanI2C(): number {
        let k = true
        let addr = 0x20
        let d1 = 0, d2 = 0
        while (k && (addr < 0x28)) {
            pins.i2cWriteNumber(addr, -1, NumberFormat.Int32LE)
            d1 = pins.i2cReadNumber(addr, NumberFormat.Int8LE) % 16
            pins.i2cWriteNumber(addr, 0, NumberFormat.Int16LE)
            d2 = pins.i2cReadNumber(addr, NumberFormat.Int8LE)
            if ((d1 == 7) && (d2 == 0)) k = false
            else addr += 1
        }
        if (!k) return addr

        addr = 0x38
        while (k && (addr < 0x40)) {
            pins.i2cWriteNumber(addr, -1, NumberFormat.Int32LE)
            d1 = pins.i2cReadNumber(addr, NumberFormat.Int8LE) % 16
            pins.i2cWriteNumber(addr, 0, NumberFormat.Int16LE)
            d2 = pins.i2cReadNumber(addr, NumberFormat.Int8LE)
            if ((d1 == 7) && (d2 == 0)) k = false
            else addr += 1
        }
        if (!k) return addr
        else return 0
    }

    //% block="List I2C Devices"
    //% blockId=gorillacell_helper_list_i2c
    //% subcategory="helper"
    export function listI2C(): number[] {
        let deviceAddresses: number[] = [];
        let addr = 0x03; // Starting address (you can change this to the desired starting address)

        while (addr <= 0x7F) { // I2C addresses are 7-bit (0x00 to 0x7F)
            if (pins.i2cWriteNumber(addr, -1, NumberFormat.Int32LE, false)) {
                // If writing to the address succeeds, it means a device is present.
                deviceAddresses.push(addr);
                serial.writeLine("" + addr);
            }
            addr++;
        }

        return deviceAddresses;
    }

    //% block="Check I2C Devices"
    //% blockId=gorillacell_helper_check_i2c
    //% subcategory="helper"
    export function checkI2C(): number[] {
        let deviceAddresses: number[] = [];
        let maxAddress = 0x7F; // Maximum I2C address (7-bit)

        for (let addr = 0x03; addr <= maxAddress; addr++) {
            if (i2cDeviceExists(addr)) {
                deviceAddresses.push(addr);
            }
        }

        return deviceAddresses;
    }

    function i2cDeviceExists(addr: number): boolean {
        pins.i2cWriteNumber(addr, 0, NumberFormat.Int8LE, false);

        // Check for an ACK (acknowledgment) from the device
        return pins.i2cReadNumber(addr, NumberFormat.Int8LE, false) === 0;
    }
}