radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 44) {
        tirette = 1
    }
})
function StopMotors () {
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    servos.P2.run(0)
    servos.P2.stop()
}
input.onButtonPressed(Button.A, function () {
    enabledetection = 0
    GOGOGO()
    untilV53L1X()
    StopMotors()
    butiner()
    enabledetection = 0
})
function butiner () {
    servos.P2.run(30)
}
function GOGOGO () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 100)
    basic.pause(1000)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 220)
    basic.pause(2500)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(100)
    if (color == 2) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 0)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        basic.pause(1000)
    } else {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 0)
        basic.pause(1000)
    }
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Backward, 40)
    basic.pause(2000)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(1500)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "BLUE") {
        color = 2
    }
    if (receivedString == "YELLOW") {
        color = 1
    }
})
input.onButtonPressed(Button.B, function () {
    VL53L1X.init()
    VL53L1X.setMeasurementTimingBudget(50000)
    VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
    untilV53L1X()
})
function untilV53L1X () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
    while (true) {
        serial.writeValue("dist", VL53L1X.readSingle())
        if (VL53L1X.readSingle() >= 60) {
            StopMotors()
            break;
        }
    }
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
    basic.pause(1000)
    StopMotors()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    StopMotors()
    servos.P1.setAngle(90)
})
let color = 0
let tirette = 0
let enabledetection = 0
maqueenPlusV2.I2CInit()
serial.redirectToUSB()
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
VL53L1X.setMeasurementTimingBudget(50000)
servos.P2.run(0)
let readpin = 0
let dist = 0
let countdetection = 0
enabledetection = 0
radio.setGroup(169)
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
tirette = 0
color = 0
basic.forever(function () {
    while (tirette == 0) {
        serial.writeValue("dist", VL53L1X.readSingle())
        if (color == 1) {
            basic.clearScreen()
            basic.showIcon(IconNames.Skull)
        }
        if (color == 2) {
            basic.clearScreen()
            basic.showIcon(IconNames.Diamond)
        }
        if (color == 0) {
            basic.clearScreen()
            led.plotBarGraph(
            VL53L1X.readSingle(),
            400,
            false
            )
        }
        basic.pause(100)
    }
    basic.clearScreen()
    basic.showIcon(IconNames.Angry)
    basic.pause(85000)
    enabledetection = 0
    GOGOGO()
    untilV53L1X()
    StopMotors()
    enabledetection = 0
    butiner()
    tirette = 0
    color = 0
})
control.inBackground(function () {
    while (false) {
        led.plotBarGraph(
        VL53L1X.readSingle(),
        200,
        true
        )
    }
})
