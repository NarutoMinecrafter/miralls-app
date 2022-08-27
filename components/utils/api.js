import { API } from '../../constants';
import { getTokens, isTokenExpired, setTokens } from './jwt';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import _ from '../i18n';


export const APIRequest = {
    get: async (endpoint, params, authorized) => {
        return request(endpoint, {
            method: 'GET',
            headers: await getHeaders(authorized),
        }, params)
    },
    post: async (endpoint, body, authorized) => {
        return request(endpoint, {
            method: 'POST',
            headers: await getHeaders(authorized),
            body: JSON.stringify(body)
        })
    },
    put: async (endpoint, body, authorized) => {
        return request(endpoint, {
            method: 'PUT',
            headers: await getHeaders(authorized),
            body: JSON.stringify(body)
        })
    },
    delete: async (endpoint, authorized) => {
        return request(endpoint, {
            method: 'DELETE',
            headers: await getHeaders(authorized),
        })
    }
}

async function request(endpoint, requestOptions, params) {
    var url = new URL(API.URL + endpoint)
    if (params) {
        for (let k in params) {
            url.searchParams.append(k, params[k])
        }
    }
    return fetch(url, requestOptions)
        .then(async (response) => {
            const json = await response.json()

            const t = _('Error')
            json.error_text ? console.log(json.error_text) : null

            // Необработанное исключение
            if (response.status == 500) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: t.Title,
                    textBody: t.SERVER_ERROR
                })
                return null
            }

            // От 1000 - ошибки валидации и т.д.
            // Меньше - стандартные ошибки (HTTP)
            else if (json.error_code != null && json.error_code < 1000) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: t.Title,
                    textBody: t[json.error_text]
                })
                return null
            }

            return json
        })
        .catch((error) => {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: _('ServerError').Title,
                textBody: _('ServerError').TextBody
            })
            console.error(error)
        });
}

async function getHeaders(authorized = true) {
    headers = API.Headers
    if (authorized) {
        headers['Authorization'] = 'Bearer ' + await getAccessToken()
    }
    return headers
}

export async function getAccessToken() {
    const tokens = await getTokens()

    // No tokens - login needed
    if (!tokens) {
        console.log('No tokens')
        return null
    }

    // Access Token expired
    if (isTokenExpired(tokens['access'])) {
        console.log('Access token expired')

        // Refresh Token expired - login needed
        if (isTokenExpired(tokens['refresh'])) {
            console.log('Refresh token expired')
            return null
        }
        // Getting new token pair
        else {
            const new_tokens = await APIRequest.post(
                'token/refresh/',
                {
                    'refresh': tokens.refresh
                },
                false
            )
            console.log('New access token:', new_tokens.access)
            await setTokens(new_tokens.access, tokens.refresh)
            tokens = new_tokens
        }
    }

    // Return access token
    return tokens.access
}

