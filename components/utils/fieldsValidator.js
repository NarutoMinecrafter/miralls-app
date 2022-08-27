
export function isUsernameOrPhoneNumberValid(username) {
    return isUsernameValid(username) | isPhoneNumberValid(username)
}

export function isUsernameValid(username) {
    return /^[A-Za-z0-9_\.]{4,32}$/.test(username)
}

export function isPasswordValid(password) {
    return true // TODO
    // return /^[A-Za-zА-Яа-яёЁ0-9_\-\!#*@\.]{8,32}$/.test(password)
}

export function doPasswordsMatch(password, passwordAgain) {
    return password == passwordAgain
}

export function isPhoneNumberValid(phoneNumber) {
    return phoneNumber.length >= 11 && phoneNumber.length <= 15
}

export function isCodeValid(code) {
    return code.length == 4
}