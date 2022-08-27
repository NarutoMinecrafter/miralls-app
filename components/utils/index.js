

export function intFromString(str) {
    return parseInt(str.replace(/\D/g, ''))
}

export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function numberToReadableStr(number) {
    if (number < 1000) {
        return number.toString()

    } else if (number < 10000) {
        k = number / 1000
        n = number % 1000
        if (950 > n && n > 100) {
            return k.toFixed(1) + 'K' // 7.5K
        } else {
            return k.toFixed(0) + 'K' // 7K
        }

    } else if (number < 1000000) {
        k = number / 1000
        return k.toFixed(0) + 'K' // 567K

    } else if (number < 10000000) {
        k = number / 1000000
        n = number % 1000000
        if (950000 > n && n > 100000) {
            return k.toFixed(1) + 'M' // 7.5M
        } else {
            return k.toFixed(0) + 'M' // 7M
        }

    } else { //if (number < 100000000)
        k = number / 1000000
        return k.toFixed(0) + 'M' // 113M
    }
}