// /*
// const unsigned char GM = 0x00; /*Body module*/
// const unsigned char SHD = 0x08; /*Sunroof Control*/
// const unsigned char CDC = 0x18; /*CD Changer*/
// const unsigned char FUH = 0x28; /*Radio controlled clock*/
// const unsigned char CCM = 0x30; /*Check control module*/
// const unsigned char GT = 0x3B; /*Graphics driver (in navigation system)*/
// const unsigned char DIA = 0x3F; /*Diagnostic*/
// const unsigned char FBZV = 0x40; /*Remote control central locking*/
// const unsigned char GTF = 0x43; /*Graphics driver for rear screen (in navigation system)*/
// const unsigned char EWS = 0x44; /*Immobiliser*/
// const unsigned char CID = 0x46; /*Central information display (flip-up LCD screen)*/
// const unsigned char MFL = 0x50; /*Multi function steering wheel*/
// const unsigned char MM0 = 0x51; /*Mirror memory*/
// const unsigned char IHK = 0x5B; /*Integrated heating and air conditioning*/
// const unsigned char PDC = 0x60; /*Park distance control*/
// const unsigned char ONL = 0x67; /*unknown*/
// const unsigned char RAD = 0x68; /*Radio*/
// const unsigned char DSP = 0x6A; /*Digital signal processing audio amplifier*/
// const unsigned char SM0 = 0x72; /*Seat memory*/
// const unsigned char SDRS = 0x73; /*Sirius Radio*/
// const unsigned char CDCD = 0x76; /*CD changer, DIN size.*/
// const unsigned char NAVE = 0x7F; /*Navigation (Europe)*/
// const unsigned char IKE = 0x80; /*Instrument cluster electronics*/
// const unsigned char MM1 = 0x9B; /*Mirror memory*/
// const unsigned char MM2 = 0x9C; /*Mirror memory*/
// const unsigned char FMID = 0xA0; /*Rear multi-info-display*/
// const unsigned char ABM = 0xA4; /*Air bag module*/
// const unsigned char KAM = 0xA8; /*unknown*/
// const unsigned char ASP = 0xAC; /*unknown*/
// const unsigned char SES = 0xB0; /*Speed recognition system*/
// const unsigned char NAVJ = 0xBB; /*Navigation (Japan)*/
// const unsigned char GLO = 0xBF; /*Global, broadcast address*/
// const unsigned char MID = 0xC0; /*Multi-info display*/
// const unsigned char TEL = 0xC8; /*Telephone*/
// const unsigned char TCU = 0xCA; /*unknown (BMW Assist?)*/
// const unsigned char LCM = 0xD0; /*Light control module*/
// const unsigned char GTHL = 0xDA; /*unknown*/
// const unsigned char IRIS = 0xE0; /*Integrated radio information system*/
// const unsigned char ANZV = 0xE7; /*Front display*/
// const unsigned char RLS = 0xE8; /*Rain/Light Sensor*/
// const unsigned char TV = 0xED; /*Television*/
// const unsigned char BMBT = 0xF0; /*On-board monitor operating part*/
// const unsigned char CSU = 0xF5; /*unknown*/
// const unsigned char LOC = 0xFF; /*Local*/
// */

export const KNOWN_DEVICES = {
    BODY_MODULE: 0x00,
    "SunroofControl": 0x08,
    CD_CHANGER: 0x18,
    "RadioControlledClock": 0x28,
    CHECK_CONTROL_MODULE: 0x30,
    GRAPHICS_NAVIGATION_DRIVER: 0x3B,
    DIAGNOSTIC: 0x3F,
    "RemoteControlCentralLocking": 0x40,
    "GraphicsDriverRearScreen": 0x43,
    "Immobiliser": 0x44,
    "CentralInformationDisplay": 0x46,
    "MultiFunctionSteeringWheel": 0x50,
    "MirrorMemory": 0x51,
    "IntegratedHeatingAndAirConditioning": 0x5B,
    PARK_DISTANCE_CONTROL: 0x60,
    RADIO: 0x68,
    "DigitalSignalProcessingAudioAmplifier": 0x6A,
    "SeatMemory": 0x72,
    "SiriusRadio": 0x73,
    CD_CHANGER_DIN: 0x76,
    "NavigationEurope": 0x7F,
    "InstrumentClusterElectronics": 0x80,
    "MirrorMemorySecond": 0x9B,
    "MirrorMemoryThird": 0x9C,
    "RearMultiInfoDisplay": 0xA0,
    "AirBagModule": 0xA4,
    "SpeedRecognitionSystem": 0xB0,
    "NavigationJapan": 0xBB,
    GLOBAL_BROADCAST: 0xBF,
    "MultiInfoDisplay": 0xC0,
    TELEPHONE: 0xC8,
    "Assist": 0xCA,
    LIGHT_CONTROL_MODULE: 0xD0,
    "SeatMemorySecond": 0xDA,
    "IntegratedRadioInformationSystem": 0xE0,
    DISPLAYS_MULTICAST: 0xE7,
    RAIN_LIGHT_SENSOR: 0xE8,
    TELEVISION: 0xED,
    ON_BOARD_MONITOR: 0xF0,
    BROADCAST: 0xFF
} as const;

export type KNOWN_DEVICE = typeof KNOWN_DEVICES[keyof typeof KNOWN_DEVICES];

export type DEVICE = KNOWN_DEVICE | number;