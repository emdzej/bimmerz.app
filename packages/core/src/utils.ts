
export function splice<T>(data: T[], start: number, deleteCount: number, ...items: T[]) {
    // we collect the splice array here
    let resultArray = []
    let stop = data.length

    // this function copies array to the this array. Since we cannot directly re-assign the this array.
    function copy(source: T[], self: T[]) {
        for (let index = 0; index < source.length; index++) {
            self[index] = source[index]
        }
        self.length = source.length
    }

    // if start is a negative number
    if (start < 0) {
        // we add the negative start index to the array length to get the positive index
        start = start + data.length
    }

    // if deleteCount is defined
    if (deleteCount) {
        // we add it to start. This gives us the index we will stop in the data array.
        stop = start + deleteCount

        // if deleteCount is negative, we splice no array
        if (deleteCount < 0)
            stop = 0
    }

    // we loop cut the array
    for (let i = start; i < stop; i++) {
        const elem = data[i]
        resultArray.push(elem)
    }

    // if deleteCount is defined but items is empty
    if (deleteCount && items.length <= 0) {
        let deleteArr = []
        // we get elements before the start index and after the stop index, these elements. We use the 'copy' function to set them to 'this' array
        for (let i = 0; i < data.length; i++) {
            let elem = data[i]
            if (i === start) {
                i = stop-1
            } else {
                deleteArr.push(elem)
            }
        }
        // we set the elements collected in the deleteArr array to this this array. Direct assignment 'this = deleteArr' would throw error
        copy(deleteArr, data)
    }

    // if there is something in the items array
    if (items.length > 0) {
        let gatherArr: T[] = [];
        // we get the elements before start index and elements after the stop index, then we push the elements in items array in between them.
        for (let i = 0; i < data.length; i++) {
            let elem = data[i]
            if (i === start) {
                // cannot use concat or .. operators here due to  this being used in DeviceScript
                items.forEach(item => gatherArr.push(item));                
                i = stop-1
            } else {
                gatherArr.push(elem)
            }
        }
        copy(gatherArr, data)
    }
    // we return the spliced elements
    return resultArray
}

export function checkBit<T = number>(value: number, position: number): T{
    return ((value & (1 << position)) >> position) as T;
}

export function clearBit(value: number, position: number): number {
    return ((value) & ~!(1 << position));
}

export function setBit(value: number, position: number): number {
    return value | (1 << position);
}

export function getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);    
}

export function stringToArray(data: string): number[] {
    return Array.from(data).map((char) => char.charCodeAt(0));	
}

// // Convert hex to ASCII
// function h2a(data) {
// 	data    = data.toString();
// 	let str = '';

// 	for (let i = 0; i < data.length; i += 2) { str += String.fromCharCode(parseInt(data.substr(i, 2), 16)); }

// 	return str;
// }

// // Convert hex to string
// function h2s(data) {
// 	data = Buffer.from(data);

// 	if (data[0] === 0x1A) data = data.slice(3); // Check control message
// 	if (data[0] === 0x21) data = data.slice(4); // MID menu text
// 	if (data[0] === 0x23) data = data.slice(4); // IKE text
// 	if (data[0] === 0x24) data = data.slice(3); // OBC text

// 	// IKE text suffix
// 	if (data[data.length - 1] === 0x04) data = data.slice(0, -1);

// 	// Format
// 	data = data.toString();
// 	data = data.replace(/�/g, '°');
// 	data = data.replace(/ {2}/g, ' ');

// 	data = data.trim();
// 	return data;
// }

export function numberToHex(data: number, length = 2) {	
	return data.toString(16).toUpperCase().padStart(length, '0');	
}

export function arrayToHex(data: number[], separator = ' ') {
    return data.map((byte) => numberToHex(byte)).join(separator);	
}

export function hexToNumber(data: string) {
    return parseInt(data, 16);
}

export function hexToArray(data: string, separator: string = " ") {
    // convert a hex string to an array of numbers
    // e.g. '01 02 03 FF' -> [1, 2, 3, 255 ]
    return data.split(separator).map((byte) => hexToNumber(byte));
}

export function stringToArgv(string: string): string[] {
	const groupsRegex = /[^\s"']+|(?:"|'){2,}|"(?!")([^"]*)"|'(?!')([^']*)'|"|'/g;

	const matches: string[] = [];

	let match;

	while ((match = groupsRegex.exec(string))) {
		if (match[2]) {
			// Single quoted group
			matches.push(match[2]);
		} else if (match[1]) {
			// Double quoted group
			matches.push(match[1]);
		} else {
			// No quote group present
			matches.push(match[0]);
		}
	}

	return matches;
}

export function hasValue(target: any, value: any) {
    return Object.values(target).includes(value);
}

export function hasKey(target: any, key: string) {
    return Object.keys(target).includes(key);
}

export function parseMember<T extends { [key: string]: number }>(value: string, target: T): T[keyof T] | undefined {
    if (hasKey(target, value)) {
        return target[value as keyof T];
    } else if (hasKey(target, value.toUpperCase())) {
        return target[value.toUpperCase() as keyof T];
    } else if (hasKey(target, value.toLowerCase())) {
        return target[value.toLowerCase() as keyof T];
    } else if (hasValue(target, parseInt(value))) {
        return parseInt(value) as T[keyof T];
    }
    return undefined;
}

export function calculateCrc(buffer: Buffer, offset: number, length: number): number {
    let crc = 0x00;
    for (let i = offset; i < offset + length; i++) {
        crc ^= buffer[i];     
    }
    return crc;
}