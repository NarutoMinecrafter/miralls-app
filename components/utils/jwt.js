import JWT from 'expo-jwt';
import * as SecureStore from 'expo-secure-store';


export async function getTokens() {
    const tokens = await SecureStore.getItemAsync('jwt')
    return JSON.parse(tokens)
}

export async function setTokens(access_token, refresh_token) {
    await SecureStore.setItemAsync('jwt', JSON.stringify({
        'access': access_token,
        'refresh': refresh_token
    }))
    // console.log('Tokens saved!')
}

export async function deleteTokens() {
    await SecureStore.deleteItemAsync('jwt')
    // console.log('Tokens deleted')
}

export function isTokenExpired(token) {
    try {
        return JWT.decode(token, null, { timeSkew: 30 }).exp < (Date.now() / 1000)
    } catch {
        return true
    }
}