export type PDCSensorsStatus = {
    active: boolean;
    frontLeft?: number;
    frontCenterLeft?: number;
    frontCenterRight?: number;
    frontRight?: number;
    rearLeft?: number;
    rearCenterLeft?: number;
    rearCenterRight?: number;
    rearRight?: number;
}

export type PDCDiagnosticCommands = {
    TURN_ON: 0x80,
    TURN_OFF: 0x40,
}