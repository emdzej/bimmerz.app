
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
