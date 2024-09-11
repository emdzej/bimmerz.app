import { DEVICE, IBusMessage, KNOWN_DEVICES } from "@bimmerz/bus";
import { KNOWN_COMMANDS } from "../../types";

export function buildDiagnosticRequest(payload: number[], target: DEVICE) {
    const message: IBusMessage = {
        source: KNOWN_DEVICES.DIA,
        destination: target,
        payload
    }
    return message;
}

export function buildIOStatusRequest(target: DEVICE) {
    const payload = [
        KNOWN_COMMANDS.GET_IO_STATUS
    ];
    return buildDiagnosticRequest(payload, target);
}

export function buildIdentityRequest(target: DEVICE) {
    const payload = [
        KNOWN_COMMANDS.REQUEST_IDENTITY
    ];
    return buildDiagnosticRequest(payload, target);
}

export function buildTerminateDiagnostic(target: DEVICE): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.TERMINATE_DIAGNOSTIC
    ];
    return buildDiagnosticRequest(payload, target);
}

export function readCodingData(target: DEVICE, block: number, offset: number, length: number): IBusMessage {
    const payload = [
        KNOWN_COMMANDS.READ_CODING_DATA,
        block,
        offset,
        length
    ];
    return buildDiagnosticRequest(payload, target);
}

/*
2024-09-10 20:38:46.715	3F 08 ED 06 03 00 00 00 02 DD	DIA	VID	Read memory	Block 03, Offset 00, Length 00 Data="02
2024-09-10 20:38:46.730	ED 05 3F A0 1C 10 7B	VID	DIA	Diagnostic command acknowledged	Data="1C 10"    [  ]
2024-09-10 20:38:46.777	F0 03 68 01 9A	BMBT	RAD	Device status request	
2024-09-10 20:38:46.793	68 05 BF 02 00 03 D3	RAD	GLO	Device status ready	
2024-09-10 20:38:47.074	3F 0A ED 07 03 00 00 00 02 1F 08 C9	DIA	VID	Write memory	Data="03 00 00 00 02 1F 08"    [       ]
2024-09-10 20:38:47.090	ED 05 3F A0 1F 08 60	VID	DIA	Diagnostic command acknowledged	Data="1F 08"    [  ]
2024-09-10 20:38:47.496	3F 03 ED 00 D1	DIA	VID	Read identity	
2024-09-10 20:38:47.512	ED 0F 3F A0 86 94 52 98 02 02 05 13 27 04 09 12 8B	VID	DIA	Diagnostic command acknowledged	Data="86 94 52 98 02 02 05 13 27 04 09 12"    [†”R    '   ]
2024-09-10 20:38:47.746	3F 08 ED 06 03 00 00 00 02 DD	DIA	VID	Read memory	Block 03, Offset 00, Length 00 Data="02
2024-09-10 20:38:47.762	ED 05 3F A0 1F 08 60	VID	DIA	Diagnostic command acknowledged	Data="1F 08"    [  ]
*/