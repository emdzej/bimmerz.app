import { DEVICE } from "@bimmerz/bus";


export const LIGHT_RAIN_SENSOR_STATUSES = {
    UNKNOWN: 0x00,
    TWILIGHT: 0x01,
    DARKNESS: 0x02,
    RAIN: 0x04,
    TUNNEL: 0x08,
    BASEMENT_GARAGE: 0x10
} as const;

export type LIGHT_RAIN_SENSOR_STATUS = typeof LIGHT_RAIN_SENSOR_STATUSES[keyof typeof LIGHT_RAIN_SENSOR_STATUSES];

export const LIGHTS_REQUIRED_STATUSES = {
    NOT_REQUIRED: 0x00,
    REQUIRED: 0x01
} as const;

export type LIGHTS_REQUIRED_STATUS = typeof LIGHTS_REQUIRED_STATUSES[keyof typeof LIGHTS_REQUIRED_STATUSES];

export type RainLightSensorStatus = {
    intensity: number;
    lightsRequired: LIGHTS_REQUIRED_STATUS;
    status: LIGHT_RAIN_SENSOR_STATUS;
}


/*
																									
															D1 = Discrete, "Reason" for light on/off										
Message examples															Only bits 0-4 are used										
From	Length	Dest	D0	D1	D2	CHK	Meaning								D1	BIT								Meaning	
RLS	-	LCM	Databyte			XOR	-								HEX	7	6	5	4	3	2	1	0	-	
E8	05	D0	59	11	01	X	Intensity = 1, Lights = on, Reason = Twilight								01	x	x	x	x	x	x	x	1	Twilight	
E8	05	D0	59	21	02	X	Intensity = 2, Lights = on, Reason = Darkness								02	x	x	x	x	x	x	1	x	Darkness	
E8	05	D0	59	31	04	X	Intensity = 3, Lights = on, Reason = Rain								04	x	x	x	x	x	1	x	x	Rain	
E8	05	D0	59	41	08	X	Intensity = 4, Lights = on, Reason = Tunnel								08	x	x	x	x	1	x	x	x	Tunnel	
E8	05	D0	59	50	00	X	Intensity = 5, Lights = off, Reason = N/A								10	x	x	x	1	x	x	x	x	Basement_garage	
E8	05	D0	59	60	00	X	Intensity = 6, Lights = off, Reason = N/A																		
															D2 = Light Intensity & Discrete for lights on/of										
															First nibble = Light intensity, higher is brighter										
															D2	BIT								Meaning	
															HEX	7	6	5	4	3	2	1	0	-	
															11	0	0	0	1	x	x	x	1	Intensity 1, Lights on	
															21	0	0	1	0	x	x	x	1	Intensity 2, Lights on	
															31	0	0	1	1	x	x	x	1	Intensity 3, Lights on	
															41	0	1	0	0	x	x	x	1	Intensity 4, Lights on	
															50	1	0	0	1	x	x	x	0	Intensity 5, Lights off	
*/